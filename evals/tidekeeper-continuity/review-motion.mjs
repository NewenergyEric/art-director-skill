import fs from 'node:fs/promises';import path from 'node:path';
import {here,base,launch,monitor,saveJSON} from './browser-helpers.mjs';
const tag=process.env.REVIEW_TAG||'pilot-01',out=path.join(here,tag);await fs.mkdir(out,{recursive:true});
const browser=await launch(),errors=[];const context=await browser.newContext({viewport:{width:1440,height:850},recordVideo:{dir:out,size:{width:1440,height:850}}});
const page=await context.newPage();monitor(page,errors);
await page.goto(base.replace('play.html','motion-review.html'));await page.evaluate(()=>reviewReady);
await page.click('#restart');await page.waitForFunction(()=>sequenceReachedEnd,null,{timeout:20000});await page.screenshot({path:path.join(out,'continuous-end.png')});
const samples=[];
for(const t of [0,330,530,760,1200,1450,1550,1800,2050,2300,2600,2800,3000,3200,4199,4200]){
const state=await page.evaluate(t=>inspectAt(t),t);samples.push(state);
for(const id of ['repair','ignition','beckon']){const data=await page.evaluate(id=>document.getElementById(id).toDataURL('image/png'),id);await fs.writeFile(path.join(out,`${id}-${t}.png`),Buffer.from(data.split(',')[1],'base64'))}
}
await saveJSON(tag+'.json',{status:errors.length?'failed':'captured',normalRAFRecorded:true,normalSequenceMs:11200,runtimeSha256:await (await import('./browser-helpers.mjs')).fingerprints(),exactInspectionTimes:samples,errors,scope:'Actual 1x sequential reviewer playback repair 2.8s, ignition 3.2s, beckon 5.2s; followed by deterministic parallel intermediate-pose inspection. Not new painted frames.'});
const video=await page.video().path();await context.close();await fs.copyFile(video,path.join(out,'continuous-actions.webm'));await browser.close();console.log('Captured '+tag+' '+samples.length+' intermediate phases; errors '+errors.length);
