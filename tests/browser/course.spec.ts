import {test,expect} from '@playwright/test';
import {readCourse} from '../../scripts/content-lib.mjs';
const content=readCourse();

test('learner can read, save, take notes, complete and resume after reload',async({page})=>{
  await page.goto('/');
  await page.getByRole('link',{name:'Start learning',exact:true}).click();
  await expect(page.getByRole('heading',{name:'Models, apps, and agents',level:1})).toBeVisible();
  await page.getByRole('button',{name:'Save lesson',exact:true}).click();
  await page.getByLabel('What did you try? What worked? What would you check next?').fill('I checked the distinction between the model and its tools.');
  await page.getByRole('button',{name:'Mark lesson complete',exact:true}).click();
  await page.reload();
  await expect(page.getByRole('button',{name:'Saved',exact:true})).toBeVisible();
  await expect(page.getByRole('button',{name:'Lesson complete — undo'})).toBeVisible();
  await expect(page.getByRole('textbox',{name:'What did you try? What worked? What would you check next?'})).toHaveValue('I checked the distinction between the model and its tools.');
  await page.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name:/Saved lessons/}).click();
  await expect(page.locator('.saved-row')).toHaveCount(1);
  await page.locator('.wordmark').click();
  await expect(page.locator('.next-lesson h2')).toHaveText('Write a better task brief');
});
test('search opens from keyboard and finds model names within lesson content',async({page})=>{
  await page.goto('/');
  await page.keyboard.press('/');
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('textbox',{name:'Search the learning library'}).fill('Hydrogen');
  await page.getByRole('dialog').getByRole('link',{name:/Navigate the model landscape/}).click();
  await expect(page.getByRole('heading',{name:'Navigate the model landscape',level:1})).toBeVisible();
  await expect(page.getByRole('heading',{name:"ChatGPT and OpenAI's GPT models",exact:true})).toBeVisible();
  await expect(page.getByRole('heading',{name:"Claude and Anthropic's model families",exact:true})).toBeVisible();
  await expect(page.getByRole('heading',{name:"Gemini and Google's model families",exact:true})).toBeVisible();
  await expect(page.locator('.prose')).not.toContainText('you mentioned');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await page.keyboard.press('Control+k');
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
});
test('roadmap chapter filters show the correct lessons',async({page})=>{
  await page.goto('/#/roadmap');
  await expect(page.locator('.lesson-row')).toHaveCount(content.lessons.length);
  await page.locator('.filter-tabs').getByRole('link',{name:/02/}).click();
  await expect(page.locator('.lesson-row')).toHaveCount(content.lessons.filter(l=>l.module==='research').length);
  await expect(page.locator('.roadmap-chapter h2')).toHaveText('Find answers you can trust');
});
test('expanded model overview remains readable on desktop and phone',async({page})=>{
  await page.goto('/#/learn/05-the-model-landscape');
  await page.evaluate(()=>document.fonts.ready);
  await page.screenshot({path:'test-results/models-desktop.png',animations:'disabled'});
  await page.setViewportSize({width:390,height:844});
  await page.getByRole('heading',{name:"Claude and Anthropic's model families",exact:true}).scrollIntoViewIfNeeded();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.screenshot({path:'test-results/models-mobile.png',animations:'disabled'});
});
test('resources filter, download and printable book work',async({page})=>{
  await page.goto('/#/resources');
  await expect(page.locator('.resource-card')).toHaveCount(content.resources.length);
  await page.getByRole('button',{name:'Templates',exact:true}).click();
  await expect(page.locator('.resource-card')).toHaveCount(content.resources.filter(r=>r.category==='Template').length);
  const download=page.waitForEvent('download');
  await page.getByRole('link',{name:'Download Your experiment log',exact:true}).click();
  expect((await download).suggestedFilename()).toBe('experiment-log.md');
  const popupPromise=page.waitForEvent('popup');
  await page.getByRole('link',{name:'Open course book',exact:true}).click();
  const popup=await popupPromise;
  await expect(popup.locator('article')).toHaveCount(content.lessons.length);
  await expect(popup.getByRole('button',{name:'Print / Save as PDF'})).toBeVisible();
});
test('mobile navigation and reading fit the screen',async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await page.goto('/');
  await page.getByRole('button',{name:'Open course navigation'}).click();
  await expect(page.locator('.sidebar')).toHaveClass(/is-open/);
  await expect(page.getByRole('button',{name:'Close navigation',exact:true})).toBeFocused();
  await page.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name:'Learning path',exact:true}).click();
  await expect(page.locator('.sidebar')).not.toHaveClass(/is-open/);
  await page.locator('.lesson-row').first().click();
  await expect(page.getByRole('heading',{name:'Models, apps, and agents',level:1})).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
});
test('overview and graph lesson avoid document overflow at responsive boundaries',async({page})=>{
  for(const width of [320,520,600,768,960,1024,1280]){
    await page.setViewportSize({width,height:900});
    await page.goto('/');
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`overview at ${width}`).toBe(true);
    await page.goto('/#/learn/19-graphs-and-protocols');
    await expect(page.locator('.prose img')).toBeVisible();
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`reader at ${width}`).toBe(true);
  }
});
test('invalid storage and unknown URLs recover without an app crash',async({page})=>{
  await page.addInitScript(()=>localStorage.setItem('ai-fieldnotes-progress-v1','{broken-json'));
  await page.goto('/#/learn/does-not-exist');
  await expect(page.getByRole('heading',{name:'This page isn’t in the notes.'})).toBeVisible();
  await page.getByRole('link',{name:'Back to the course'}).click();
  await expect(page.locator('.lesson-row')).toHaveCount(content.lessons.length);
});
test('all lessons render and local content contains no broken resource references',async({page})=>{
  const errors:string[]=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.goto('/#/roadmap');
  const hrefs=await page.locator('.lesson-row').evaluateAll(nodes=>nodes.map(node=>node.getAttribute('href')!));
  for(const href of hrefs){
    await page.goto('/'+href);
    await expect(page.locator('.lesson-heading h1')).toBeVisible();
    await expect(page.locator('.prose h2').filter({hasText:'Check your work'}).last()).toBeVisible();
  }
  expect(errors).toEqual([]);
});
test('desktop and mobile overview screenshots',async({page})=>{
  await page.goto('/');
  await page.evaluate(()=>document.fonts.ready);
  await page.screenshot({path:'test-results/overview-desktop.png',fullPage:true,animations:'disabled'});
  await page.setViewportSize({width:390,height:844});
  await page.screenshot({path:'test-results/overview-mobile.png',fullPage:true,animations:'disabled'});
});
test('blocked browser storage leaves reading usable and reports the limitation',async({page})=>{
  await page.addInitScript(()=>Object.defineProperty(window,'localStorage',{get(){throw new Error('Storage blocked for test');}}));
  await page.goto('/#/learn/01-models-apps-and-agents');
  await expect(page.getByRole('heading',{name:'Models, apps, and agents',level:1})).toBeVisible();
  await expect(page.locator('.storage-notice')).toBeVisible();
  await page.getByRole('button',{name:'Mark lesson complete',exact:true}).click();
  await expect(page.getByRole('button',{name:'Lesson complete — undo'})).toBeVisible();
});
test('local reset clears notes, bookmarks and completion',async({page})=>{
  await page.addInitScript(()=>localStorage.setItem('ai-fieldnotes-progress-v1',JSON.stringify({completed:['01-models-apps-and-agents'],saved:['01-models-apps-and-agents'],notes:{'01-models-apps-and-agents':'A note'},lastLesson:'01-models-apps-and-agents'})));
  await page.goto('/#/about');
  await page.getByRole('button',{name:'Reset my local progress'}).click();
  await page.getByRole('button',{name:'Yes, reset my learning data'}).click();
  expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('ai-fieldnotes-progress-v1')!))).toEqual({completed:[],saved:[],notes:{},lastLesson:null});
});
