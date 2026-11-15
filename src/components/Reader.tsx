import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Bookmark, Check, CheckCheck, Copy, Download, Printer, Type } from 'lucide-react';
import { Markdown } from './Markdown';
import { assetUrl, course, formatDate, lessonUrl } from '../lib/course';
import type { ContentItem, Lesson } from '../types';
import type { ProgressStore } from '../lib/useProgress';
import { brand } from '../config';

export function Reader({ item, store }: { item: ContentItem; store: ProgressStore }) {
  const lesson = item.type === 'lesson' ? item as Lesson : null;
  const chapter = lesson ? course.modules.find(m=>m.id===lesson.module) : null;
  const currentIndex = lesson ? course.lessons.findIndex(l=>l.id===lesson.id) : -1;
  const previous = currentIndex > 0 ? course.lessons[currentIndex - 1] : null;
  const next = currentIndex >= 0 ? course.lessons[currentIndex + 1] : null;
  const complete = store.progress.completed.includes(item.id);
  const saved = store.progress.saved.includes(item.id);
  const [large, setLarge] = useState(false);
  const [notice, setNotice] = useState('');
  useEffect(() => { if (lesson) store.visit(lesson.id); }, [lesson?.id, store.visit]);
  useEffect(() => { if (!notice) return; const timer = setTimeout(()=>setNotice(''), 2600); return ()=>clearTimeout(timer); }, [notice]);
  async function share() {
    try { await navigator.clipboard.writeText(window.location.href); setNotice('Lesson link copied.'); }
    catch { setNotice('Copy the link from your browser’s address bar.'); }
  }
  return <div className={`reader-page ${large ? 'reading-large' : ''}`}>
    <div className="reader-topline no-print"><a className="text-link" href={lesson ? '#/roadmap' : '#/resources'}><ArrowLeft size={15}/>{lesson ? 'The learning path' : 'The resource library'}</a><span className="edition">SOURCE SNAPSHOT · {formatDate(item.updated)}</span></div>
    <div className="reader-layout">
      <article className="lesson-article">
        <header className="lesson-heading">
          <div className="eyebrow">{lesson ? `CHAPTER ${chapter?.number} / LESSON ${String(lesson.sequence).padStart(2,'0')}` : 'FROM THE READING ROOM'}</div>
          <h1>{item.title}</h1><p className="reader-summary">{item.summary}</p>
          <div className="reader-meta">{lesson && <><span>{lesson.minutes} min reading & practice</span><span className="dot"/><span>{lesson.level}</span><span className="dot"/></>}<span>By {brand.author}</span></div>
          <div className="reader-actions no-print">
            {lesson && <button className={`small-button ${saved ? 'is-saved' : ''}`} aria-pressed={saved} onClick={()=>store.toggleSave(item.id)}><Bookmark size={15} fill={saved ? 'currentColor' : 'none'}/>{saved ? 'Saved' : 'Save lesson'}</button>}
            <button className="small-button" onClick={share}><Copy size={15}/>Copy link</button>
            <button className="small-button" onClick={()=>setLarge(!large)} aria-pressed={large} aria-label="Larger reading text"><Type size={16}/><span className="desktop-only">Text size</span></button>
            <a className="icon-button" href={assetUrl(item.download)} download aria-label="Download Markdown"><Download size={17}/></a>
            <button className="icon-button" onClick={()=>window.print()} aria-label="Print lesson or save as PDF"><Printer size={17}/></button>
          </div>
        </header>
        {lesson && <div className="outcomes"><span className="eyebrow">BY THE END OF THIS LESSON</span><ul>{lesson.objectives.map(o=><li key={o}><Check size={16}/>{o}</li>)}</ul></div>}
        <div className="prose"><Markdown item={item}/></div>
        {lesson && <section className="lesson-workspace no-print" aria-labelledby="notes-title"><div className="section-kicker">MAKE IT YOURS</div><h2 id="notes-title">A note to your future self.</h2><label htmlFor="lesson-notes">What did you try? What worked? What would you check next?</label><textarea id="lesson-notes" value={store.progress.notes[item.id] || ''} onChange={e=>store.note(item.id,e.target.value)} maxLength={10000} placeholder="Keep your observations here…" rows={5}/><p className="tiny muted">{store.available ? 'Saved in this browser. Your notes stay on this device.' : 'Browser storage is unavailable. Copy your notes before leaving.'}</p><button className={complete ? 'button completed-button' : 'button button-dark'} onClick={()=>store.toggleComplete(item.id)} aria-pressed={complete}>{complete ? <CheckCheck size={18}/> : <Check size={18}/>} {complete ? 'Lesson complete — undo' : 'Mark lesson complete'}</button></section>}
        {lesson && <nav className="lesson-pagination no-print" aria-label="Lesson navigation">{previous ? <a href={lessonUrl(previous.id)}><ArrowLeft size={19}/><span><small>PREVIOUS LESSON</small>{previous.title}</span></a> : <a href="#/roadmap"><ArrowLeft size={19}/><span><small>BACK TO</small>The learning path</span></a>}{next ? <a href={lessonUrl(next.id)}><span><small>UP NEXT</small>{next.title}</span><ArrowRight size={19}/></a> : <a href="#/roadmap"><span><small>KEEP GOING</small>Review your learning path</span><ArrowRight size={19}/></a>}</nav>}
      </article>
      <aside className="article-toc no-print"><div className="eyebrow">ON THIS PAGE</div><nav aria-label="Table of contents">{item.headings.filter(h=>h.level===2).map(h=><a key={h.id} href={`#section-${h.id}`} onClick={e=>{e.preventDefault();document.getElementById(`section-${h.id}`)?.scrollIntoView({behavior:'smooth',block:'start'});}}>{h.title}</a>)}</nav><div className="toc-note"><span className="little-star">✳</span><p>Read a little.<br/>Try something.<br/>Keep what works.</p></div>{lesson && <span className={`reading-status ${complete ? 'done' : ''}`}>{complete ? <Check size={13}/> : <span className="status-circle"/>}{complete ? 'Completed' : 'In progress'}</span>}</aside>
    </div><div className="toast" role="status">{notice}</div>
  </div>;
}
