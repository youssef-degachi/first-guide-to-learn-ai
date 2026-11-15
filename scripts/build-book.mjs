import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Marked } from 'marked';
import { readCourse } from './content-lib.mjs';

const escape = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safeHref = value => /^(https?:\/\/|#)/i.test(value) || /^[a-z0-9_./-]+(?:[?#][^\s"'<>]*)?$/i.test(value) ? value : '#';
const marked = new Marked({ gfm: true, renderer: { html: token => escape(token.text) }, walkTokens(token) { if (token.type === 'link' || token.type === 'image') token.href = safeHref(token.href); } });

export function buildBook(course, root = process.cwd()) {
  const brand = JSON.parse(fs.readFileSync(path.join(root, 'content/site.json'), 'utf8'));
  const toc = course.modules.map(module => `<li><strong>${escape(module.number)} · ${escape(module.title)}</strong><ol>${course.lessons.filter(l => l.module === module.id).map(l => `<li><a href="#${l.id}">${escape(l.title)}</a></li>`).join('')}</ol></li>`).join('');
  let body = '';
  for (const module of course.modules) {
    body += `<section class="chapter"><p class="eyebrow">CHAPTER ${escape(module.number)}</p><h1>${escape(module.title)}</h1><p>${escape(module.description)}</p></section>`;
    for (const lesson of course.lessons.filter(l => l.module === module.id)) {
      const markdown = lesson.body.replace(/\]\(#\/(learn|resources)\/([^)]+)\)/g, (_, type, id) => `](${type === 'learn' ? '#'+id : 'index.html#/resources/'+id})`);
      body += `<article id="${lesson.id}"><p class="eyebrow">LESSON ${String(lesson.sequence).padStart(2,'0')} · ${lesson.minutes} MINUTES · SOURCE SNAPSHOT ${escape(lesson.updated)}</p><h1>${escape(lesson.title)}</h1><p class="summary">${escape(lesson.summary)}</p><aside><strong>Learning outcomes</strong><ul>${lesson.objectives.map(o=>`<li>${escape(o)}</li>`).join('')}</ul></aside>${marked.parse(markdown)}</article>`;
    }
  }
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escape(brand.name)} — Course book</title><style>
  :root{color-scheme:light}*{box-sizing:border-box}body{font:16px/1.75 Georgia,serif;color:#252b26;background:#ebece6;margin:0}.toolbar{font:14px/1.5 sans-serif;background:#25372c;color:#fff;padding:16px 24px;display:flex;gap:20px;align-items:center;justify-content:center}.toolbar a{color:#fff}button{cursor:pointer;border:0;border-radius:6px;background:#f7f5ed;padding:10px 18px;color:#25372c}main{max-width:850px;margin:36px auto;background:#fff;padding:70px;box-shadow:0 6px 40px #0001}.cover{padding:80px 0 120px;min-height:75vh}.eyebrow{font:11px/1.6 sans-serif;letter-spacing:.14em;color:#9b4c30}h1{font-size:38px;line-height:1.15;font-weight:500;letter-spacing:-.025em}.cover h1{font-size:72px}h2{font-size:26px;line-height:1.2;margin-top:38px}h3{font-size:20px}a{color:#9b4c30;overflow-wrap:anywhere}aside{padding:18px 24px;border-left:3px solid #c15a38;background:#f6f5ee}article{break-before:page;padding-top:30px;margin-top:70px}.chapter{break-before:page;padding:120px 0}.summary{font-size:19px;color:#656b62}pre{white-space:pre-wrap;overflow-wrap:anywhere;font:12px/1.6 monospace;padding:18px;background:#f2f3ed;border:1px solid #e3e5db}code{font-size:.85em}table{border-collapse:collapse;width:100%;font:12px/1.5 sans-serif}th,td{padding:9px;border:1px solid #d6d9ce;text-align:left;overflow-wrap:anywhere}blockquote{border-left:2px solid #b7c0b0;margin-left:0;padding-left:20px;color:#5d6759}.toc>ol>li{margin:24px 0}.toc ol ol{padding-left:24px}img{max-width:100%}footer{font:11px sans-serif;color:#7d8377;border-top:1px solid #ddd;padding-top:20px;margin-top:60px}.chapter h1{font-size:54px}
  @page{size:A4;margin:18mm 16mm 20mm}@media print{body{background:#fff;font-size:11pt}.toolbar{display:none}main{padding:0;margin:0;max-width:none;box-shadow:none}.cover{min-height:220mm;padding-top:45mm}.cover h1{font-size:60pt}article{margin:0;padding:0}.chapter{padding:65mm 0}h1,h2,h3{break-after:avoid}pre,aside,blockquote{break-inside:avoid}thead{display:table-header-group}tr{break-inside:avoid}a{color:inherit;text-decoration:underline}*{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
  @media(max-width:700px){main{padding:28px;margin:0}.cover h1{font-size:50px}.toolbar{flex-wrap:wrap}}
  </style></head><body><div class="toolbar"><span>The same lessons, ready for your bookshelf.</span><button onclick="window.print()">Print / Save as PDF</button><a href="index.html#/">Back to the library</a></div><main><section class="cover"><p class="eyebrow">${escape(brand.name)} / BY ${escape(brand.author)}</p><h1>Learn AI.<br>Make it yours.</h1><p class="summary">${escape(course.description)}</p><p>${course.modules.length} chapters · ${course.lessons.length} lessons · Practice at every step</p><p>Research snapshot: ${escape(course.researchSnapshot)}<br>Course edition: ${escape(course.edition)}</p><p>Product facts reflect the dated source material. The labs are exercises, not claims of completed model benchmarks.</p></section><section class="toc"><h1>Your learning path</h1><ol>${toc}</ol></section>${body}<footer>${escape(brand.name)} · ${escape(brand.author)} · Sources are linked within each lesson. Created By <a href="https://deerflow.tech" target="_blank" rel="noreferrer">Deerflow</a></footer></main></body></html>`;
  fs.mkdirSync(path.join(root, 'public'), { recursive: true });
  fs.writeFileSync(path.join(root, 'public/course-book.html'), html);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const course = readCourse();
  buildBook(course);
  console.log('Printable course built at public/course-book.html.');
}
