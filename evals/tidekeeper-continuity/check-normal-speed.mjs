// A separate, real-time playthrough. No advanceTime, clock mocks, skip, or state/resource writes.
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { here, base, launch, read, finishOrder, monitor, fingerprints, saveJSON } from './browser-helpers.mjs';
const language = process.env.TIDEKEEPER_LANGUAGE || 'zh';
const url = language === 'en' ? base.replace(/play(?:\.en)?\.html/, 'play.en.html') : base;
const out = path.join(here, `final-normal-speed-${language}`);
await fs.mkdir(out, { recursive: true });
const browser = await launch(), errors = [], seen = new Set(), deliveries = [];
const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1,
  isMobile: true, hasTouch: true, recordVideo: { dir: out, size: { width: 390, height: 844 } } });
const page = await context.newPage(); monitor(page, errors); page.setDefaultTimeout(15000);
const tap = async selector => { await page.locator(selector).tap(); await page.waitForTimeout(180); };
const runtimeSha256 = await fingerprints();
try {
  await page.goto(url, { timeout: 30000 });
  await page.evaluate(() => window.tidekeeperReady); await page.evaluate(() => document.fonts.ready);
  assert.equal((await read(page)).phase, 'intro', 'Fresh browser context starts without saved progress');
  await page.evaluate(() => {
    window.__playback = []; window.__start = performance.now(); let previous = '';
    window.__timer = setInterval(() => {
      const s = JSON.parse(window.render_game_to_text());
      const action = s.action || null;
      const key = JSON.stringify([s.phase, action?.name, action?.index, s.repairFrame, s.sceneBeaconVisible]);
      if (key !== previous) {
        previous = key;
        window.__playback.push({ wallMs: performance.now() - window.__start, phase: s.phase,
          phaseTime: s.phaseTime, repairFrame: s.repairFrame, action, beacon: s.sceneBeaconVisible });
      }
    }, 16);
  });
  await tap('#start-button');
  await tap('#catalog-button'); await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(out, 'catalog.png') });
  await tap('.catalog-dialog [data-action="close-dialog"]:last-child');
  for (const [stage, busy, next] of [['dock','repairing_dock','tower'], ['tower','repairing_tower','lens'],
    ['lens','installing_lens','fuel'], ['fuel','lighting','beacon']]) {
    assert.equal((await read(page)).phase, stage);
    await finishOrder(page, { touch: true, delay: 180, seen, deliveries });
    await page.locator('[data-action="build"]').tap();
    await page.waitForTimeout(stage === 'fuel' ? 1650 : 1000);
    assert.equal((await read(page)).phase, busy);
    await page.screenshot({ path: path.join(out, `action-${stage}.png`) });
    if(stage === 'fuel') { await page.waitForTimeout(550); await page.screenshot({path:path.join(out,'action-ignition-recovery.png')}); }
    await page.waitForFunction(next => JSON.parse(window.render_game_to_text()).phase === next, next, { timeout: 12000 });
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(out, `after-${stage}.png`) });
    console.log(`Played ${stage} at normal speed (${language})`);
  }
  await page.locator('[data-action="beckon"]').tap(); await page.waitForTimeout(900);
  await page.screenshot({ path: path.join(out, 'action-beckon.png') });
  await page.waitForFunction(() => JSON.parse(window.render_game_to_text()).phase === 'reward', null, { timeout: 12000 });
  await page.screenshot({ path: path.join(out, 'boat-docked.png') }); await tap('[data-action="claim"]');
  await page.waitForTimeout(600); await page.screenshot({ path: path.join(out, 'complete.png') });
  const final = await read(page);
  const recording = await page.evaluate(() => { clearInterval(window.__timer); return { timeline: window.__playback, elapsedMs: performance.now() - window.__start, dpr: devicePixelRatio }; });
  assert.equal(final.phase, 'complete'); assert.equal(final.coins, 225); assert.equal(final.merges, 17);
  assert.equal(final.tokensSpent, 0); assert.equal(seen.size, 16); assert.deepEqual(errors, []); assert.deepEqual(final.assetErrors, []);
  const durations = {}, actionCoverage = {};
  for (const [from, to, expected] of [['repairing_dock','tower',2800], ['repairing_tower','lens',2800],
    ['installing_lens','fuel',2200], ['lighting','beacon',3200], ['arriving','reward',5200]]) {
    const samples = recording.timeline.filter(t => t.phase === from);
    const first = samples[0], next = recording.timeline.find(t => t.phase === to);
    assert.ok(first && next, `${from} transition observed`);
    const observed = next.wallMs - first.wallMs;
    assert.ok(observed >= expected - 100 && observed < expected + 1800, `${from} duration ${observed}`);
    durations[from] = { expectedMs: expected, observedMs: Math.round(observed) };
    const indices = [...new Set(samples.map(t => t.action?.index).filter(i => i !== undefined && i >= 0))];
    const count = samples.find(t => t.action?.frameCount)?.action.frameCount;
    assert.ok(count >= 6, `${from} uses at least six timed phases`);
    assert.equal(indices.length, count, `${from} all timed phases observed in actual playback`);
    actionCoverage[from] = { frameCount: count, observedIndices: indices };
  }
  assert.deepEqual(await fingerprints(), runtimeSha256, 'Runtime did not change during recording');
  const source = await page.video().path(); await context.close();
  const video = path.join(out, 'full-playthrough.webm'); await fs.copyFile(source, video); await fs.unlink(source);
  await saveJSON(`final-normal-speed-${language}.json`, { status: 'passed', date: new Date().toISOString(), version: '0.6.2-candidate',
    language, runtimeSha256, mode: 'Ordinary touch controls, fresh save, real requestAnimationFrame; no skip, clock override, injected state or resources.',
    viewport: [390,844], deviceScaleFactor: recording.dpr, actualPhone: false, elapsedMs: Math.round(recording.elapsedMs),
    final: { phase: final.phase, coins: final.coins, merges: final.merges, tokensSpent: final.tokensSpent },
    durations, actionCoverage, seenItems: [...seen].sort(), deliveries, timeline: recording.timeline, errors,
    video: path.relative(here, video).replaceAll('\\','/') });
  console.log(JSON.stringify({ status: 'passed', language, elapsedMs: Math.round(recording.elapsedMs), actionCoverage, errors }));
} catch (e) {
  await page.screenshot({ path: path.join(out, 'failure.png') }).catch(() => {});
  await saveJSON(`final-normal-speed-${language}-failure.json`, { date: new Date().toISOString(), status: 'failed', error: String(e), errors, runtimeSha256 });
  throw e;
} finally { await browser.close(); }
