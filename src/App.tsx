import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, BookOpen, Bookmark, Check, ChevronDown, ChevronRight, Code2, Compass, Download, FileText, GraduationCap, Menu, Search, Sparkles, Workflow, X, RotateCcw, Clock, ExternalLink } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { brand } from './config';
import { course, assetUrl, lessonUrl, resourceUrl, formatDate } from './lib/course';
import { parseRoute, searchContent } from './lib/content-utils.mjs';
import { useProgress } from './lib/useProgress';
import type { ProgressStore } from './lib/useProgress';
import type { Chapter, Lesson, Resource } from './types';
import { Reader } from './components/Reader';

const icons: Record<string,LucideIcon> = { compass: Compass, search: Search, code: Code2, workflow: Workflow, sparkles: Sparkles, graduation: GraduationCap };
function useMobile() {
  const [mobile,setMobile]=useState(()=>window.matchMedia('(max-width:960px)').matches);
  useEffect(()=>{const query=window.matchMedia('(max-width:960px)');const update=()=>setMobile(query.matches);query.addEventListener('change',update);return()=>query.removeEventListener('change',update);},[]);
  return mobile;
}
function useRoute() {
  const [route,setRoute] = useState(()=>parseRoute(window.location.hash));
  useEffect(()=>{const update=()=>setRoute(parseRoute(window.location.hash));window.addEventListener('hashchange',update);return()=>window.removeEventListener('hashchange',update);},[]);
  return route;
}
function ProgressLine({ value, total }: { value: number; total: number }) {
  return <progress max={total} value={value} aria-label={`${value} of ${total} lessons complete`}/>;
}

function Sidebar({ store, route, open, close, mobile }: { store: ProgressStore; route: {kind:string;id:string}; open: boolean; close:()=>void; mobile:boolean }) {
  const current = course.lessons.find(l=>l.id===route.id);
  const [expanded,setExpanded] = useState(current?.module || 'foundations');
  useEffect(()=>{if(current) setExpanded(current.module);},[current?.module]);
  const percentage = Math.round(store.progress.completed.length/course.lessons.length*100);
  return <><button className={`sidebar-backdrop ${open?'visible':''}`} aria-label="Close course navigation" onClick={close} tabIndex={open?0:-1}/><aside className={`sidebar ${open?'is-open':''}`} aria-label="Course navigation" inert={mobile&&!open}>
    <a className="wordmark" href="#/" onClick={close}><span className="brand-mark">{brand.initials}<i/></span><span>{brand.name}<small>WITH {brand.author.toUpperCase()}</small></span></a>
    <button className="mobile-nav-close icon-button" aria-label="Close navigation" onClick={close}><X size={19}/></button>
    <div className="sidebar-body">
      <div className="side-label">YOUR LEARNING SPACE</div>
      <nav className="primary-nav" aria-label="Main navigation">
        <a href="#/" className={route.kind==='home'?'active':''} onClick={close}><Compass size={18}/>Overview<span className="nav-active-dot"/></a>
        <a href="#/roadmap" className={route.kind==='roadmap'||route.kind==='learn'?'active':''} onClick={close}><Workflow size={18}/>Learning path</a>
        <a href="#/resources" className={route.kind==='resources'?'active':''} onClick={close}><BookOpen size={18}/>Resource library</a>
        <a href="#/saved" className={route.kind==='saved'?'active':''} onClick={close}><Bookmark size={18}/>Saved lessons{store.progress.saved.length>0&&<span className="nav-count">{store.progress.saved.length}</span>}</a>
      </nav>
      <div className="side-label chapter-label">THE CHAPTERS <span>{course.modules[0]?.number} — {course.modules.at(-1)?.number}</span></div>
      <div className="chapter-navigation">{course.modules.map(chapter=>{
        const chapterLessons=course.lessons.filter(l=>l.module===chapter.id);
        const chapterDone=chapterLessons.every(l=>store.progress.completed.includes(l.id));
        return <div key={chapter.id} className={`side-chapter ${expanded===chapter.id?'expanded':''}`}><button onClick={()=>setExpanded(expanded===chapter.id?'':chapter.id)} aria-expanded={expanded===chapter.id}><span className={`chapter-index ${chapterDone?'chapter-done':''}`}>{chapterDone?<Check size={12}/>:chapter.number}</span><span>{chapter.shortTitle}</span><ChevronDown size={13}/></button>{expanded===chapter.id&&<div className="side-lessons">{chapterLessons.map(lesson=><a key={lesson.id} href={lessonUrl(lesson.id)} className={route.id===lesson.id?'current':''} onClick={close}><span className={store.progress.completed.includes(lesson.id)?'side-lesson-dot checked':'side-lesson-dot'}>{store.progress.completed.includes(lesson.id)&&<Check size={8}/>}</span><span>{lesson.title}</span></a>)}</div>}</div>;
      })}</div>
    </div>
    <div className="sidebar-bottom"><div className="progress-caption"><span>Your progress</span><strong>{percentage}%</strong></div><ProgressLine value={store.progress.completed.length} total={course.lessons.length}/><p>{store.progress.completed.length} of {course.lessons.length} lessons complete</p><a href="#/about" onClick={close}><span className="author-avatar">{brand.initials}</span><span>A note from {brand.author}<small>Why this library exists</small></span><ArrowUpRight size={15}/></a></div>
  </aside></>;
}

function BookIllustration() {
  return <div className="hero-art" aria-hidden="true"><span className="art-coordinate top">A FIELD GUIDE, NOT A FEED.</span><div className="book-shadow"/><div className="book-page back-page"/><div className="book-cover"><div className="book-top">FIELDNOTES / VOL. 01<span>✳</span></div><div className="book-title">A little<br/>curiosity.<br/><em>A lot of<br/>possibility.</em></div><div className="book-rule"/><div className="book-bottom"><span>LEARN AI<br/>BY DOING.</span><span className="book-arrow">↗</span></div><div className="book-ribbon"/></div><span className="art-coordinate bottom">OPEN. EXPLORE. MAKE SOMETHING.</span><span className="art-cross one">+</span><span className="art-cross two">+</span><div className="edition-stamp"><span>EST.</span><strong>2026</strong><span>STAY CURIOUS</span></div></div>;
}

function ChapterCard({ chapter, store }: { chapter:Chapter;store:ProgressStore }) {
  const Icon=icons[chapter.icon] || Compass;
  const lessons=course.lessons.filter(l=>l.module===chapter.id);
  const done=lessons.filter(l=>store.progress.completed.includes(l.id)).length;
  return <a href={`#/roadmap/${chapter.id}`} className={`chapter-card tone-${chapter.color}`}><div className="chapter-card-top"><span className="chapter-symbol"><Icon size={21} strokeWidth={1.5}/></span><span className="card-chapter-number">{chapter.number}</span></div><h3>{chapter.shortTitle}</h3><p>{chapter.description}</p><div className="chapter-card-bottom"><span>{lessons.length} lessons{done>0?` · ${done} complete`:''}</span><ArrowUpRight size={18}/></div></a>;
}

function Home({store}:{store:ProgressStore}) {
  const next = course.lessons.find(l=>l.id===store.progress.lastLesson&&!store.progress.completed.includes(l.id)) || course.lessons.find(l=>!store.progress.completed.includes(l.id)) || course.lessons[0];
  const hasStarted=Boolean(store.progress.lastLesson || store.progress.completed.length);
  const chapter=course.modules.find(m=>m.id===next.module)!;
  const allDone=store.progress.completed.length===course.lessons.length;
  return <div className="home-page page-enter">
    <section className="hero"><div className="hero-copy"><div className="eyebrow"><span className="accent-line"/> A PRACTICAL GUIDE TO AI</div><h1>Less noise.<br/><em>More know-how.</em></h1><p>Go from “where do I start?” to “I made this.”<br className="wide-break"/> Clear lessons, hands-on experiments, and a path<br className="wide-break"/> that makes sense. At your own pace.</p><div className="hero-actions"><a className="button button-dark" href={lessonUrl(next.id)}>{hasStarted?'Continue learning':'Start learning'}<ArrowUpRight size={18}/></a><a className="text-link" href="#/roadmap">Explore the roadmap<ArrowRight size={16}/></a></div><div className="hero-author"><span className="mini-author">{brand.initials}</span><span>A learning library by <strong>{brand.author}</strong></span><span className="author-separator"/><span>Free to explore</span></div></div><BookIllustration/></section>
    <section className="course-stats" aria-label="Course at a glance"><div><strong>{String(course.modules.length).padStart(2,'0')}</strong><span>thoughtful chapters</span></div><div><strong>{course.lessons.length}</strong><span>practical lessons</span></div><div><Sparkles size={23} strokeWidth={1.3}/><span>Learn by doing</span></div><div><Compass size={23} strokeWidth={1.3}/><span>No experience needed</span></div></section>
    <section className="next-lesson"><div className="next-icon"><BookOpen size={24} strokeWidth={1.4}/></div><div><div className="eyebrow">{allDone?'A GOOD TIME TO REVISIT':hasStarted?'PICK UP WHERE YOU LEFT OFF':'YOUR FIRST CHAPTER STARTS HERE'}</div><h2>{next.title}</h2><p>Chapter {chapter.number}<span>·</span>{next.minutes} min<span>·</span>{next.level}</p></div><a href={lessonUrl(next.id)} className="circle-button" aria-label={`${hasStarted?'Continue':'Start'} ${next.title}`}><ArrowRight size={22}/></a></section>
    <section className="chapters-section"><div className="section-heading"><div><div className="section-kicker">THE LEARNING PATH</div><h2>A little structure.<br className="mobile-only"/> A lot to discover.</h2></div><a className="text-link" href="#/roadmap">View the full path<ArrowUpRight size={16}/></a></div><div className="chapter-grid">{course.modules.map(chapter=><ChapterCard key={chapter.id} chapter={chapter} store={store}/>)}</div></section>
    <section className="reading-room"><div><div className="eyebrow">THE READING ROOM</div><h2>Good notes.<br/><em>Worth keeping.</em></h2><p>Go deeper, try an exercise, or take the whole library with you.</p><a href={assetUrl('downloads/ai-reboot-learning-kit.zip')} download className="download-link"><Download size={15}/>Download the practice kit</a></div><div className="reading-room-links">{['course-guide','practice-labs','teaching-playbook'].map((id,i)=>{const r=course.resources.find(r=>r.id===id)!;return <a href={resourceUrl(r.id)} key={id}><span className="reading-room-number">0{i+1}</span><span><strong>{r.title}</strong><small>{r.category} · Open & explore</small></span><ArrowUpRight size={20}/></a>;})}</div></section>
    <div className="home-closing"><span className="little-star">✳</span><p>You don’t need to learn everything at once.<br/><strong>Just take the next useful step.</strong></p></div>
  </div>;
}

function Roadmap({store,selected}:{store:ProgressStore;selected:string}) {
  const chapters=selected?course.modules.filter(m=>m.id===selected):course.modules;
  return <div className="standard-page page-enter"><PageIntro eyebrow="YOUR PATH, AT YOUR PACE" title={<>From curious<br/>to <em>capable.</em></>} description={`${course.modules.length} chapters. One clear direction. Start at the beginning, or find the next thing you want to try.`}/><div className="filter-tabs" aria-label="Filter chapters"><a href="#/roadmap" className={!selected?'selected':''}>The full path</a>{course.modules.map(m=><a key={m.id} href={`#/roadmap/${m.id}`} className={selected===m.id?'selected':''}>{m.number}<span>{m.shortTitle}</span></a>)}</div><div className="roadmap-list">{chapters.map(chapter=>{
    const Icon=icons[chapter.icon]||Compass;
    const lessons=course.lessons.filter(l=>l.module===chapter.id);
    const count=lessons.filter(l=>store.progress.completed.includes(l.id)).length;
    return <section className="roadmap-chapter" key={chapter.id}><header><span className={`roadmap-chapter-icon tone-${chapter.color}`}><Icon size={23} strokeWidth={1.5}/></span><div><div className="eyebrow">CHAPTER {chapter.number}</div><h2>{chapter.title}</h2><p>{chapter.description}</p></div><span className="chapter-completion">{count}/{lessons.length}<small>COMPLETE</small></span></header><div className="roadmap-lessons">{lessons.map(lesson=>{const done=store.progress.completed.includes(lesson.id);return <a href={lessonUrl(lesson.id)} key={lesson.id} className={`lesson-row ${done?'is-complete':''}`}><span className={`lesson-row-index ${done?'done':''}`}>{done?<Check size={15}/>:String(lesson.sequence).padStart(2,'0')}</span><span className="lesson-row-copy"><strong>{lesson.title}</strong><span>{lesson.summary}</span></span><span className="lesson-duration"><Clock size={13}/>{lesson.minutes} min</span><ChevronRight size={17}/></a>;})}</div><div className="chapter-outcome"><Check size={14}/><span>YOU’LL BE ABLE TO</span><p>{chapter.outcome}</p></div></section>;
  })}</div></div>;
}

function PageIntro({eyebrow,title,description}:{eyebrow:string;title:React.ReactNode;description:string}) {
  return <header className="page-intro"><div className="eyebrow"><span className="accent-line"/>{eyebrow}</div><h1>{title}</h1><p>{description}</p></header>;
}

function Resources() {
  const [category,setCategory]=useState('All resources');
  const filtered=course.resources.filter(r=>category==='All resources'||r.category===category);
  return <div className="standard-page page-enter"><PageIntro eyebrow="THE RESOURCE LIBRARY" title={<>A little more<br/>to <em>work with.</em></>} description="Longer reads, practical exercises, and templates for your next experiment. Everything here belongs to the same learning path."/><div className="resource-download-banner"><BookOpen size={25} strokeWidth={1.4}/><div><strong>Your learning, offline.</strong><span>Open the complete course book and print or save it as a PDF.</span></div><a className="button button-outline" href={assetUrl('course-book.html')} target="_blank" rel="noreferrer">Open course book<ArrowUpRight size={16}/></a></div><div className="filter-tabs" aria-label="Filter resources">{['All resources','Guide','Practice','Teaching','Reference','Template'].map(c=><button onClick={()=>setCategory(c)} key={c} className={category===c?'selected':''}>{c==='Guide'?'Guides':c==='Template'?'Templates':c}</button>)}</div><div className="resource-grid">{filtered.map(resource=><ResourceCard key={resource.id} resource={resource}/>)}</div><section className="practice-files"><div><div className="section-kicker">READY FOR YOUR NEXT EXPERIMENT</div><h2>Small files. Real practice.</h2><p>Fictional data you can use to test a method and check the answer.</p></div><div className="practice-file-links">{[['Orders dataset','orders.csv'],['Support tickets','tickets.csv'],['Contact-cleaning inputs','contacts.csv'],['Conflicting source documents','source-pack.md'],['Image, voice & video briefs','media-briefs.md']].map(([title,path])=><a key={path} href={assetUrl(`downloads/learning-kit/practice-inputs/${path}`)} download><FileText size={16}/><span>{title}</span><Download size={15}/></a>)}</div></section><p className="snapshot-note">Research snapshot: {formatDate(course.researchSnapshot)}. Exercises are designed for you to run; the library does not claim completed comparisons of every tool.</p></div>;
}
function ResourceCard({resource}:{resource:Resource}) {
  return <article className="resource-card"><div className="resource-card-top"><FileText size={23} strokeWidth={1.3}/><span className="resource-category">{resource.category}</span></div><h2><a href={resourceUrl(resource.id)}>{resource.title}</a></h2><p>{resource.summary}</p><div className="resource-card-actions"><a className="text-link" href={resourceUrl(resource.id)}>Read resource<ArrowUpRight size={15}/></a><a className="icon-button" href={assetUrl(resource.download)} download aria-label={`Download ${resource.title}`}><Download size={17}/></a></div></article>;
}

function Saved({store}:{store:ProgressStore}) {
  const lessons=course.lessons.filter(l=>store.progress.saved.includes(l.id));
  return <div className="standard-page page-enter"><PageIntro eyebrow="YOUR PERSONAL SHELF" title={<>Keep the<br/><em>good bits.</em></>} description="A place for the lessons you want to come back to. Your saved list stays in this browser."/>{lessons.length?<div className="saved-list">{lessons.map(lesson=><div key={lesson.id} className="saved-row"><Bookmark size={20} fill="currentColor"/><a href={lessonUrl(lesson.id)}><span className="eyebrow">LESSON {String(lesson.sequence).padStart(2,'0')}</span><h2>{lesson.title}</h2><p>{lesson.summary}</p></a><button className="icon-button" onClick={()=>store.toggleSave(lesson.id)} aria-label={`Remove ${lesson.title} from saved lessons`}><X size={18}/></button></div>)}</div>:<div className="empty-state"><span className="empty-symbol"><Bookmark size={32} strokeWidth={1.2}/></span><h2>Your shelf is ready.</h2><p>Use “Save lesson” while reading to keep something here.</p><a href="#/roadmap" className="button button-dark">Find your next lesson<ArrowRight size={17}/></a></div>}</div>;
}

function About({store}:{store:ProgressStore}) {
  const [confirm,setConfirm]=useState(false);
  const [resetNotice,setResetNotice]=useState(false);
  return <div className="standard-page about-page page-enter"><PageIntro eyebrow={`A NOTE FROM ${brand.author.toUpperCase()}`} title={<>Made for<br/>the <em>curious.</em></>} description="AI moves quickly. Learning it should still feel clear, practical, and human."/><div className="about-content"><div className="about-pullquote">Understand it.<br/>Try it.<br/><em>Make it yours.</em></div><div className="about-copy"><h2>A library, not a race.</h2><p>{brand.name} is a learning space by {brand.author}, built around a simple idea: understanding comes from doing something useful and checking the result.</p><p>The course begins with the foundations, then moves through research, building, agents, creative work, and teaching. Every lesson connects an explanation to an experiment and a way to evaluate it.</p><p>You can follow the whole path or return when you have a specific question. Take your time. Keep notes. Build a method you can explain to someone else.</p>{[brand.website,brand.instagram,brand.github].some(Boolean)&&<div className="author-links">{[['Website',brand.website],['Instagram',brand.instagram],['GitHub',brand.github]].filter(([,url])=>url).map(([title,url])=><a href={url} key={title} target="_blank" rel="noreferrer">{title}<ExternalLink size={14}/></a>)}</div>}</div></div><div className="about-details"><section><span className="eyebrow">A NOTE ON THE MATERIAL</span><h2>Evidence before confidence.</h2><p>The research snapshot is {formatDate(course.researchSnapshot)}. The course was organized on {formatDate(course.edition)}. Product facts link to their sources and should be checked again before making a current recommendation. The labs are proposed experiments, with known answers where appropriate.</p></section><section><span className="eyebrow">YOUR LEARNING SPACE</span><h2>Private to this browser.</h2><p>Progress, saved lessons, and notes are stored on this device. There is no account or cross-device sync. Clearing browser storage removes them.</p>{confirm?<div className="reset-confirm"><p>Reset completed lessons, bookmarks, and notes in this browser?</p><button className="small-button" onClick={()=>{store.reset();setConfirm(false);setResetNotice(true);}}>Yes, reset my learning data</button><button className="text-button" onClick={()=>setConfirm(false)}>Keep my data</button></div>:<button className="text-link reset-link" onClick={()=>setConfirm(true)}><RotateCcw size={14}/>Reset my local progress</button>}<p role="status" className="tiny">{resetNotice?'Your local learning data has been reset.':''}</p></section></div></div>;
}

function SearchDialog({open,setOpen}:{open:boolean;setOpen:(v:boolean)=>void}) {
  const ref=useRef<HTMLDialogElement>(null);
  const input=useRef<HTMLInputElement>(null);
  const [query,setQuery]=useState('');
  useEffect(()=>{if(open){setQuery('');ref.current?.showModal();input.current?.focus();}else if(ref.current?.open)ref.current.close();},[open]);
  const results=searchContent([...course.lessons,...course.resources],query);
  const display=query.trim()?results.slice(0,12):course.lessons.slice(0,4);
  return <dialog ref={ref} className="search-dialog" onClose={()=>setOpen(false)} onClick={event=>{if(event.target===ref.current){const rect=ref.current.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)setOpen(false);}}} aria-labelledby="search-title"><div className="search-dialog-header"><Search size={21}/><label className="sr-only" id="search-title" htmlFor="library-search">Search the learning library</label><input ref={input} id="library-search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="What are you curious about?" autoComplete="off"/><button className="icon-button" aria-label="Close search" onClick={()=>setOpen(false)}><X size={18}/></button></div><div className="search-results"><p className="search-results-label" role="status">{query.trim()?`${results.length} result${results.length===1?'':'s'}${results.length>12?' · showing the first 12':''}`:'GOOD PLACES TO START'}</p>{display.length?display.map((item:Lesson|Resource)=><a key={item.id} href={item.type==='lesson'?lessonUrl(item.id):resourceUrl(item.id)} onClick={()=>setOpen(false)}><span className="search-result-icon">{item.type==='lesson'?<BookOpen size={19}/>:<FileText size={19}/>}</span><span><strong>{item.title}</strong><small>{item.type==='lesson'?`Lesson ${String(item.sequence).padStart(2,'0')}`:item.category} · {item.summary}</small></span><ArrowUpRight size={16}/></a>):<div className="search-empty"><p>No notes on that yet.</p><span>Try “agents”, “images”, “Carbon”, or “research”.</span></div>}</div><div className="search-dialog-footer"><span>Search lessons, guides, and experiments</span><span><kbd>esc</kbd> to close</span></div></dialog>;
}

function NotFound() {return <div className="standard-page empty-state"><span className="eyebrow">A SMALL DETOUR</span><h1>This page isn’t in the notes.</h1><p>Find your place again in the learning path.</p><a href="#/roadmap" className="button button-dark">Back to the course<ArrowRight size={17}/></a></div>;}

export function App() {
  const route=useRoute();
  const store=useProgress();
  const [searchOpen,setSearchOpen]=useState(false);
  const [mobileOpen,setMobileOpen]=useState(false);
  const mobile=useMobile();
  const wasMobileOpen=useRef(false);
  const main=useRef<HTMLElement>(null);
  useEffect(()=>{window.scrollTo({top:0});setMobileOpen(false);main.current?.focus({preventScroll:true});},[route.kind,route.id]);
  useEffect(()=>{const key=(event:KeyboardEvent)=>{const target=event.target as HTMLElement;const editing=['INPUT','TEXTAREA','SELECT'].includes(target.tagName)||target.isContentEditable;if((event.key==='/'&&!editing)||((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k')){event.preventDefault();setSearchOpen(true);}if(event.key==='Escape')setMobileOpen(false);};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key);},[]);
  useEffect(()=>{document.body.classList.toggle('nav-open',mobileOpen);return()=>document.body.classList.remove('nav-open');},[mobileOpen]);
  useEffect(()=>{if(!mobile)setMobileOpen(false);},[mobile]);
  useEffect(()=>{if(mobileOpen)document.querySelector<HTMLButtonElement>('.mobile-nav-close')?.focus();else if(wasMobileOpen.current)document.querySelector<HTMLButtonElement>('.menu-toggle')?.focus();wasMobileOpen.current=mobileOpen;},[mobileOpen]);
  const lesson=route.kind==='learn'?course.lessons.find(l=>l.id===route.id):undefined;
  const resource=route.kind==='resources'&&route.id?course.resources.find(r=>r.id===route.id):undefined;
  useEffect(()=>{document.title=`${lesson?.title||resource?.title||brand.name} — Learn with ${brand.author}`;},[lesson?.title,resource?.title]);
  const invalidChapter=route.kind==='roadmap'&&route.id&&!course.modules.some(m=>m.id===route.id);
  let page;
  if(lesson||resource)page=<Reader key={(lesson||resource)!.id} item={(lesson||resource)!} store={store}/>;
  else if(route.kind==='home')page=<Home store={store}/>;
  else if(route.kind==='roadmap'&&!invalidChapter)page=<Roadmap store={store} selected={route.id}/>;
  else if(route.kind==='resources'&&!route.id)page=<Resources/>;
  else if(route.kind==='saved')page=<Saved store={store}/>;
  else if(route.kind==='about')page=<About store={store}/>;
  else page=<NotFound/>;
  return <><a className="skip-link" href="#main-content" onClick={e=>{e.preventDefault();main.current?.focus();}}>Skip to content</a><Sidebar store={store} route={route} open={mobileOpen} close={()=>setMobileOpen(false)} mobile={mobile}/><div className="app-shell" inert={mobile&&mobileOpen}><header className="topbar no-print"><div className="topbar-left"><button className="icon-button menu-toggle" onClick={()=>setMobileOpen(true)} aria-label="Open course navigation" aria-expanded={mobileOpen}><Menu size={22}/></button><span className="topbar-label">A SPACE TO LEARN. A REASON TO TRY.</span><a href="#/" className="mobile-wordmark">{brand.name}</a></div><div className="topbar-right"><button className="search-trigger" onClick={()=>setSearchOpen(true)} aria-label="Search the library"><Search size={16}/><span>Search the library</span><kbd>/</kbd></button><span className="topbar-divider"/><a className="topbar-book" href={assetUrl('course-book.html')} target="_blank" rel="noreferrer">Course book<ArrowUpRight size={15}/></a><span className="topbar-author" aria-label={`By ${brand.author}`}>{brand.initials}</span></div></header>{!store.available&&<div className="storage-notice" role="status">Your browser is blocking local storage. You can keep reading, but progress and notes will not survive a reload.</div>}<div className="print-brand">{brand.name} · {brand.author}</div><main ref={main} id="main-content" tabIndex={-1}>{page}</main><footer className="site-footer no-print"><span>{brand.name}<span className="footer-dot">·</span>Made to be useful.</span><div><a href="#/about">About the library</a><a href="https://deerflow.tech" target="_blank" rel="noopener noreferrer" className="creator-signature">Created By Deerflow<ArrowUpRight size={10}/></a></div></footer></div><SearchDialog open={searchOpen} setOpen={setSearchOpen}/></>;
}
