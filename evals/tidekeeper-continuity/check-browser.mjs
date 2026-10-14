// Deterministic interaction/geometry checks; separate from the full 1x recordings.
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { here, base, launch, read, advance, finishOrder, nextPair, monitor, fingerprints, saveJSON } from './browser-helpers.mjs';
const browser = await launch(), errors = [], checks = [], geometry = [], captures = [];
const out = path.join(here, 'browser'); await fs.mkdir(out, { recursive: true });
const check = (name, value) => { assert.ok(value, name); checks.push(name); };
const shot = async (page, name) => { await page.screenshot({ path: path.join(out, name + '.png'), fullPage: true }); captures.push('browser/' + name + '.png'); };
const specs = [
  { name: 'desktop-zh', language: 'zh', viewport: { width: 1440, height: 1000 } },
  { name: 'desktop-en', language: 'en', viewport: { width: 1440, height: 900 } },
  { name: 'portrait-zh', language: 'zh', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true },
  { name: 'portrait-en', language: 'en', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true },
  { name: 'landscape-zh', language: 'zh', viewport: { width: 844, height: 390 }, isMobile: true, hasTouch: true },
  { name: 'landscape-en', language: 'en', viewport: { width: 844, height: 390 }, isMobile: true, hasTouch: true },
  { name: 'reduced-en', language: 'en', viewport: { width: 390, height: 844 }, reducedMotion: 'reduce', isMobile: true, hasTouch: true }
];
async function dragPair(page,pair,touch) {
  const first = page.locator(`[data-cell="${pair[0]}"]`), last = page.locator(`[data-cell="${pair[1]}"]`);
  await first.scrollIntoViewIfNeeded(); await last.scrollIntoViewIfNeeded();
  const a = await first.boundingBox(), b = await last.boundingBox();
  const start = {x:a.x+a.width/2,y:a.y+a.height/2}, end = {x:b.x+b.width/2,y:b.y+b.height/2};
  if(touch) {
    const session = await page.context().newCDPSession(page);
    await session.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{...start,id:1}]});
    for(let i=1;i<=8;i++) await session.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:start.x+(end.x-start.x)*i/8,y:start.y+(end.y-start.y)*i/8,id:1}]});
    await session.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]}); await session.detach();
  } else {
    await page.mouse.move(start.x,start.y); await page.mouse.down(); await page.mouse.move(end.x,end.y,{steps:8}); await page.mouse.up();
  }
  await page.clock.runFor(400);
}
async function bounds(page, name) {
  const data = await page.evaluate(() => {
    const s = JSON.parse(window.render_game_to_text());
    const rect = element => { const r = element?.getBoundingClientRect(); return r ? { x:r.x,y:r.y,width:r.width,height:r.height,bottom:r.bottom,right:r.right } : null; };
    const visible = element => !!element && element.getClientRects().length && getComputedStyle(element).visibility !== 'hidden';
    return { viewport: [innerWidth,innerHeight], scrollWidth: document.documentElement.scrollWidth, phase: s.phase,
      action:s.action, canvas:rect(document.querySelector('#scene')), workbenchVisible:visible(document.querySelector('#workbench')),
      cell:rect(document.querySelector('.cell')), controls:rect(document.querySelector('#scene-controls')),
      clippedText:[...document.querySelectorAll('.action-button,.scene-button,.stage-label,.chapter-title')].filter(visible)
        .filter(e => e.scrollWidth > e.clientWidth + 2).map(e => e.textContent),
      untranslated: document.documentElement.lang.startsWith('en') ? [...document.querySelectorAll('button,h1,h2,h3,p,strong,small')].filter(visible)
        .map(e=>e.textContent).filter(t=>/[\u3400-\u9fff]/.test(t)) : [] };
  });
  geometry.push({ name, ...data });
  check(name + ' no page-width overflow', data.scrollWidth <= data.viewport[0]);
  check(name + ' action/button labels fit', !data.clippedText.length);
  check(name + ' English gameplay has no untranslated visible copy', !data.untranslated.length);
  if (data.workbenchVisible) check(name + ' touch cells remain >=44px', data.cell.width >= 44);
  const inset = data.action?.inset;
  if (inset) {
    check(name + ' action inset is inside viewport', inset.x >= 0 && inset.y >= 0 && inset.x + inset.width <= data.viewport[0] + 1 && inset.y + inset.height <= data.viewport[1] + 1);
    check(name + ' lamp fixture is inside inset', inset.fixture.x >= inset.x && inset.fixture.x <= inset.x + inset.width && inset.fixture.y >= inset.y && inset.fixture.y <= inset.y + inset.height);
  }
}
let page;
try {
  for (const spec of specs) {
    const { name,language,...options } = spec;
    const context = await browser.newContext({ deviceScaleFactor: 1, ...options });
    page = await context.newPage(); page.setDefaultTimeout(15000); monitor(page,errors);
    await page.goto(language === 'en' ? base.replace(/play(?:\.en)?\.html/, 'play.en.html') : base, { timeout:30000 });
    await page.evaluate(() => window.tidekeeperReady); await page.evaluate(() => document.fonts.ready);
    check(name + ' all assets ready', (await read(page)).ready && !(await read(page)).assetErrors.length);
    await page.clock.install({ time: new Date('2026-10-14T02:00:00Z') });
    await page.clock.pauseAt(new Date('2026-10-14T02:01:00Z'));
    await bounds(page,name+'-intro'); await shot(page,name+'-intro');
    await page.click('#start-button'); await page.clock.runFor(400);
    const before = await read(page), pair = nextPair(before);
    await page.click(`[data-cell="${pair[0]}"]`); await page.click(`[data-cell="${pair[1]}"]`);
    check(name + ' ordinary pair merges', (await read(page)).merges === 1);
    await page.click('#undo-button'); check(name + ' undo restores board', (await read(page)).merges === 0);
    await dragPair(page,pair,!!options.hasTouch); check(name+' pointer/touch drag maps to visible cells', (await read(page)).merges === 1);
    await page.click('#undo-button'); check(name+' drag undo restores resources', (await read(page)).merges === 0);
    await page.click('#catalog-button'); check(name + ' catalogue has seven functional families', await page.locator('.catalog-family').count() === 7);
    check(name + ' catalogue has sixteen item levels', await page.locator('.catalog-chain>div').count() === 16);
    await shot(page,name+'-catalog'); await page.keyboard.press('Escape');
    await bounds(page,name+'-board'); await shot(page,name+'-board');
    for (const [stage,busy,next] of [['dock','repairing_dock','tower'],['tower','repairing_tower','lens'],['lens','installing_lens','fuel'],['fuel','lighting','beacon']]) {
      await finishOrder(page,{touch:!!options.hasTouch});
      await page.locator('[data-action="build"]')[options.hasTouch ? 'tap' : 'click']();
      if (options.reducedMotion === 'reduce') {
        check(name+' '+stage+' reduced motion reaches endpoint', (await read(page)).phase === next); continue;
      }
      check(name+' '+stage+' starts action', (await read(page)).phase === busy);
      if (stage === 'fuel') check(name+' light does not precede contact', !(await read(page)).sceneBeaconVisible);
      await page.clock.runFor(320);
      // A real UI modal pauses both animation and reward progression.
      if (name === 'desktop-zh') {
        await page.click('#help-button'); const paused = await read(page); await advance(page,450);
        check(name+' '+stage+' help pauses action clock', (await read(page)).phaseTime === paused.phaseTime);
        check(name+' '+stage+' help pauses reward', (await read(page)).coins === paused.coins);
        await page.keyboard.press('Escape');
        await page.reload(); await page.evaluate(() => window.tidekeeperReady); await page.evaluate(() => document.fonts.ready);
        const restored = await read(page);
        check(name+' '+stage+' reload resumes same construction', restored.phase === busy && Math.abs(restored.phaseTime-paused.phaseTime) <= 100);
        check(name+' '+stage+' reload does not duplicate reward', restored.coins === paused.coins);
      }
      await advance(page,['dock','tower'].includes(stage)?260:620); await bounds(page,name+'-'+stage+'-action'); await shot(page,name+'-'+stage+'-action');
      const action = (await read(page)).action;
      check(name+' '+stage+' has six timed phases', action?.frameCount >= 6 && action.index >= 0);
      if(stage === 'fuel') {
        await advance(page,1200); check(name+' wick contact activates world beacon', (await read(page)).sceneBeaconVisible);
        await shot(page,name+'-ignition-contact');
      }
      if (name === 'portrait-en' && stage === 'lens') {
        await page.setViewportSize({width:844,height:390}); await page.clock.runFor(120);
        await bounds(page,name+'-rotated-during-lens'); await shot(page,name+'-rotated-during-lens');
        await page.setViewportSize({width:390,height:844}); await page.clock.runFor(120);
      }
      await advance(page,10000); check(name+' '+stage+' completes once', (await read(page)).phase === next);
      await page.clock.runFor(600); await shot(page,name+'-after-'+stage);
    }
    const waitingPose = (await read(page)).characterPose;
    check(name+' beacon holds first empty-hand beckon pose', waitingPose?.name === 'beckon' && waitingPose.index === 0 && waitingPose.held);
    await page.click('[data-action="beckon"]');
    if (options.reducedMotion !== 'reduce') {
      await advance(page,900); await bounds(page,name+'-beckon'); await shot(page,name+'-beckon');
      check(name+' beckon has timed phases', (await read(page)).action?.frameCount >= 6);
      await advance(page,10000);
    }
    check(name+' boat reaches reward', (await read(page)).phase === 'reward');
    const settledPose = (await read(page)).characterPose;
    check(name+' arrival holds final beckon pose', settledPose?.name === 'beckon' && settledPose.index === 5 && settledPose.held);
    check(name+' beckon retains its standing ground', JSON.stringify(waitingPose.box) === JSON.stringify(settledPose.box) && JSON.stringify(waitingPose.groundLocal) === JSON.stringify(settledPose.groundLocal));
    await page.clock.runFor(600); await bounds(page,name+'-arrival'); await shot(page,name+'-arrival');
    await page.click('[data-action="claim"]'); check(name+' full game rewards once', (await read(page)).coins === 225);
    check(name+' full game completes', (await read(page)).phase === 'complete');
    await page.reload(); await page.evaluate(()=>window.tidekeeperReady);
    check(name+' completed save resumes without duplicate reward', (await read(page)).coins === 225 && (await read(page)).phase === 'complete');
    if (await page.locator('#overlay').isVisible()) await page.keyboard.press('Escape');
    await page.click('#help-button'); await page.click('[data-action="ask-restart"]'); await page.click('#overlay [data-action="restart"]');
    const restarted = await read(page);
    check(name+' restart clears completed resources/actions', restarted.coins === 0 && !restarted.completed.length && ['intro','dock'].includes(restarted.phase));
    await advance(page,10000); check(name+' no stale action after restart', (await read(page)).coins === 0);
    await context.close(); console.log('PASS '+name);
  }
  check('zero runtime/network/console errors', !errors.length);
  await saveJSON('browser-verification.json',{status:'passed',date:new Date().toISOString(),version:'0.6.2-candidate',
    scope:'Deterministic time stepping with legal controls, browser mobile emulation; not the separate 1x gameplay evidence or physical-device approval.',
    runtimeSha256:await fingerprints(),checks,geometry,captures,errors});
  console.log(JSON.stringify({status:'passed',checks:checks.length,captures:captures.length}));
} catch(e) {
  if(page) await shot(page,'failure').catch(()=>{});
  await saveJSON('browser-failure.json',{status:'failed',date:new Date().toISOString(),error:String(e),checks,geometry,errors});
  throw e;
} finally { await browser.close(); }
