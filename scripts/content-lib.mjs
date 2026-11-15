import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { headings, plainText } from '../src/lib/content-utils.mjs';

export function readCourse(root = process.cwd()) {
  const course = JSON.parse(fs.readFileSync(path.join(root, 'content/course.json'), 'utf8'));
  const moduleIds = new Set(course.modules.map(m => m.id));
  if (moduleIds.size !== course.modules.length) throw new Error('Duplicate chapter ID.');
  const load = (folder, type) => fs.readdirSync(path.join(root, 'content', folder)).filter(f => f.endsWith('.md')).sort().map(filename => {
    const source = fs.readFileSync(path.join(root, 'content', folder, filename), 'utf8');
    const { data, content } = matter(source);
    if (data.status === 'draft') return null;
    if (data.status !== 'published') throw new Error(`${filename}: status must be published or draft.`);
    for (const key of ['id', 'title', 'summary', 'updated']) if (!data[key] || typeof data[key] !== 'string') throw new Error(`${filename}: ${key} must be a non-empty quoted string.`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(data.updated) || Number.isNaN(Date.parse(data.updated))) throw new Error(`${filename}: invalid updated date.`);
    if (!/^[a-z0-9][a-z0-9-]*$/.test(data.id)) throw new Error(`${filename}: ID must use lowercase letters, numbers and hyphens.`);
    if (type === 'lesson') {
      if (!moduleIds.has(data.module)) throw new Error(`${filename}: unknown chapter ${data.module}`);
      if (!Number.isInteger(data.order) || data.order < 1) throw new Error(`${filename}: order must be a positive integer.`);
      if (!Number.isInteger(data.minutes) || data.minutes < 1) throw new Error(`${filename}: minutes must be a positive integer.`);
      if (!Array.isArray(data.objectives) || !data.objectives.length || data.objectives.some(o=>typeof o !== 'string' || !o.trim())) throw new Error(`${filename}: add non-empty learning objectives.`);
      if (!['Beginner','Intermediate','Advanced'].includes(data.level)) throw new Error(`${filename}: invalid level.`);
      for (const section of ['The idea', 'Try it', 'Check your work', 'Teach it']) if (!content.includes(`## ${section}`)) throw new Error(`${filename}: missing section '${section}'.`);
    } else if (!['Guide', 'Practice', 'Teaching', 'Reference', 'Template'].includes(data.category)) throw new Error(`${filename}: invalid resource category.`);
    const body = content.trim().replace(/^#\s+[^\n]+\n+/, '');
    if (body.length < 150) throw new Error(`${filename}: content is too short.`);
    if ((body.match(/^```/gm) || []).length % 2) throw new Error(`${filename}: unbalanced code fences.`);
    return { ...data, type, filename, body, headings: headings(body), searchText: plainText(body), download: `content/${folder}/${filename}` };
  }).filter(Boolean);
  const chapterOrder = new Map(course.modules.map((module,index)=>[module.id,index]));
  const lessons = load('lessons', 'lesson')
    .sort((a,b)=>chapterOrder.get(a.module)-chapterOrder.get(b.module)||a.order-b.order)
    .map((lesson,index)=>({...lesson,sequence:index+1}));
  const resources = load('resources', 'resource');
  const ids = [...lessons, ...resources].map(i => i.id);
  if (new Set(ids).size !== ids.length) throw new Error('Content IDs must be unique across lessons and resources.');
  if (new Set(lessons.map(l => l.order)).size !== lessons.length) throw new Error('Lesson order values must be unique.');
  for (const module of course.modules) if (!lessons.some(l => l.module === module.id)) throw new Error(`Chapter ${module.id} has no lessons.`);
  for (const item of [...lessons, ...resources]) {
    for (const match of item.body.matchAll(/\]\(#\/(learn|resources)\/([^\s)]+)\)/g)) {
      if (!ids.includes(match[2])) throw new Error(`${item.filename}: unknown internal link ${match[2]}`);
    }
  }
  return { ...course, lessons, resources };
}
