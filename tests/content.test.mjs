import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { readCourse } from '../scripts/content-lib.mjs';
import { cleanProgress, headings, parseRoute, searchContent } from '../src/lib/content-utils.mjs';

test('course has a complete learning path and all lesson objective sections',()=>{
  const course=readCourse();
  assert.ok(course.modules.length>=6);
  assert.ok(course.lessons.length>=30);
  assert.ok(course.resources.length>=6);
  for(const lesson of course.lessons){
    assert.ok(lesson.headings.some(h=>h.title==='Try it'));
    assert.ok(lesson.headings.some(h=>h.title==='Check your work'));
    assert.ok(lesson.objectives.length>=2);
  }
});
test('all direct practice download links resolve to included files',()=>{
  const course=readCourse();
  for(const item of [...course.lessons,...course.resources])for(const match of item.body.matchAll(/\]\((downloads\/[^)#]+)(?:#[^)]*)?\)/g))assert.ok(fs.existsSync(path.join(process.cwd(),'public',match[1])),`${item.id}: ${match[1]}`);
});
test('published lessons, resources and downloadable readings use a public-reader voice',()=>{
  const course=readCourse();
  const readings=[...course.lessons,...course.resources].map(item=>({name:item.id,text:item.body}));
  const directory=path.join(process.cwd(),'public/downloads/learning-kit');
  for(const name of fs.readdirSync(directory,{recursive:true}).filter(name=>name.endsWith('.md'))){
    readings.push({name:`learning-kit/${name}`,text:fs.readFileSync(path.join(directory,name),'utf8')});
  }
  const privateReference=/\b(?:you (?:mentioned|asked|said|requested|described|named|brought up)|as (?:you|we) (?:discussed|requested)|our (?:chat|conversation)|your (?:chats?|message|original question)|this chat|prepared for Youssef|for your teaching goal|your word could mean|how I would evaluate it for you|while you were away)\b/i;
  for(const reading of readings)assert.doesNotMatch(reading.text,privateReference,reading.name);
});
test('the model overview explains familiar assistants and keeps API access distinct',()=>{
  const lesson=readCourse().lessons.find(item=>item.id==='05-the-model-landscape');
  assert.ok(lesson.headings.some(heading=>heading.title==="ChatGPT and OpenAI's GPT models"));
  assert.ok(lesson.headings.some(heading=>heading.title==="Claude and Anthropic's model families"));
  assert.ok(lesson.headings.some(heading=>heading.title==="Gemini and Google's model families"));
  assert.match(lesson.body,/not a universal ChatGPT model-picker list/);
  assert.match(lesson.body,/https:\/\/platform\.claude\.com\/docs\/en\/models\/overview/);
});
test('search finds body-only model names and uses all query terms',()=>{
  const course=readCourse();
  const items=[...course.lessons,...course.resources];
  assert.ok(searchContent(items,'Hydrogen').some(i=>i.id==='05-the-model-landscape'));
  assert.ok(searchContent(items,'Carbon pricing').length>0);
  assert.deepEqual(searchContent(items,'unfindable-xyz-123'),[]);
  assert.deepEqual(searchContent(items,'   '),[]);
});
test('malformed or obsolete progress cannot create invalid saved records',()=>{
  assert.deepEqual(cleanProgress(null,['a']),{completed:[],saved:[],notes:{},lastLesson:null});
  const result=cleanProgress({completed:['a','a','gone',17],saved:'invalid',notes:{a:'hello',gone:'private'},lastLesson:'gone'},['a']);
  assert.deepEqual(result,{completed:['a'],saved:[],notes:{a:'hello'},lastLesson:null});
});
test('route parser supports static-host deep links and rejects malformed routes',()=>{
  assert.equal(parseRoute('#/learn/01-example').id,'01-example');
  assert.equal(parseRoute('#/roadmap/research').id,'research');
  assert.equal(parseRoute('#/%E0%A4%A').kind,'not-found');
  assert.equal(parseRoute('#/learn/a/extra').kind,'not-found');
  assert.equal(parseRoute('#/').kind,'home');
});
test('table of contents ignores headings inside code and keeps duplicate IDs unique',()=>{
  const result=headings('## A heading\n```\n## Not a heading\n```\n## A heading\n### Details');
  assert.deepEqual(result.map(h=>h.id),['a-heading','a-heading-1','details']);
});
test('new-lesson command creates a draft excluded from the published course',()=>{
  const temporary=fs.mkdtempSync(path.join(os.tmpdir(),'fieldnotes-content-'));
  try {
    fs.cpSync('content',path.join(temporary,'content'),{recursive:true});
    const result=spawnSync(process.execPath,[fileURLToPath(new URL('../scripts/new-lesson.mjs',import.meta.url)),'--title','Temporary lesson','--module','research'],{cwd:temporary,encoding:'utf8'});
    assert.equal(result.status,0,result.stderr);
    const drafts=fs.readdirSync(path.join(temporary,'content/lessons')).filter(name=>name.endsWith('-temporary-lesson.md'));
    assert.equal(drafts.length,1);
    assert.equal(readCourse(temporary).lessons.length,readCourse().lessons.length);
    const draftPath=path.join(temporary,'content/lessons',drafts[0]);
    fs.writeFileSync(draftPath,fs.readFileSync(draftPath,'utf8').replace('status: "draft"','status: "published"'));
    const published=readCourse(temporary);
    const index=published.lessons.findIndex(l=>l.title==='Temporary lesson');
    assert.equal(published.lessons[index].module,'research');
    assert.equal(published.lessons[index+1].module,'building');
    assert.deepEqual(published.lessons.map(l=>l.sequence),published.lessons.map((_,i)=>i+1));
  } finally {fs.rmSync(temporary,{recursive:true,force:true});}
});
