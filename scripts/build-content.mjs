import fs from 'node:fs';
import path from 'node:path';
import { readCourse } from './content-lib.mjs';
import { buildBook } from './build-book.mjs';

const root = process.cwd();
const content = readCourse(root);
if (!process.argv.includes('--check')) {
  fs.mkdirSync(path.join(root, 'src/generated'), { recursive: true });
  fs.writeFileSync(path.join(root, 'src/generated/content.json'), JSON.stringify(content));
  for (const folder of ['lessons', 'resources']) {
    const destination = path.join(root, 'public/content', folder);
    fs.rmSync(destination, { recursive: true, force: true });
    fs.mkdirSync(destination, { recursive: true });
    for (const filename of fs.readdirSync(path.join(root, 'content', folder)).filter(f => f.endsWith('.md'))) fs.copyFileSync(path.join(root, 'content', folder, filename), path.join(destination, filename));
  }
  buildBook(content, root);
}
console.log(`Content verified: ${content.modules.length} chapters, ${content.lessons.length} lessons, ${content.resources.length} resources.`);
