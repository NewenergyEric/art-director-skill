import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { pathToFileURL, fileURLToPath } from 'node:url';
import http from 'node:http';
const scripts = path.dirname(fileURLToPath(import.meta.url));
export const root = process.env.TIDEKEEPER_ROOT || path.resolve(scripts, '../..');
export const here = path.resolve(process.env.TIDEKEEPER_QA_OUT || path.join(root, 'dist/tidekeeper-continuity-check'));
await fs.mkdir(here, { recursive: true });
export const runtime = path.join(root, 'docs/assets/tidekeeper-playable');
// Serve inside the same approved Node process as Chromium: the restricted shell's
// listener cannot reliably be reached by the desktop browser on this Windows host.
const mime = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css',
  '.png':'image/png','.jpg':'image/jpeg','.woff2':'font/woff2','.json':'application/json','.webm':'video/webm'};
const server = http.createServer(async (req,res) => {
  try {
    const relative = decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/^\/+/, '');
    const target = path.resolve(root,relative);
    if (!target.startsWith(path.resolve(root)+path.sep)) {res.writeHead(403).end(); return;}
    const data = await fs.readFile(target);
    res.writeHead(200,{'Content-Type':mime[path.extname(target)] || 'application/octet-stream','Cache-Control':'no-store'}).end(data);
  } catch {res.writeHead(404).end('Not found');}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve)); server.unref();
export const base = process.env.TIDEKEEPER_URL || `http://127.0.0.1:${server.address().port}/docs/assets/tidekeeper-playable/play.html`;
export const { chromium } = await import(process.env.TIDEKEEPER_PLAYWRIGHT ? pathToFileURL(process.env.TIDEKEEPER_PLAYWRIGHT).href : 'playwright');
export const launch = () => chromium.launch({ headless: true, ...(process.env.TIDEKEEPER_BROWSER ? { executablePath: process.env.TIDEKEEPER_BROWSER } : {}) });
export const read = page => page.evaluate(() => JSON.parse(window.render_game_to_text()));
export const advance = (page, ms) => page.evaluate(ms => window.advanceTime(ms), ms);
export const fingerprints = async () => Object.fromEntries(await Promise.all(['play.html', 'play.en.html', 'locale-en.js', 'game.js', 'game-core.js', 'game.css', 'animation-manifest.js', 'continuous-motion.js', 'tide-sans.woff2'].map(async file => [file, createHash('sha256').update(await fs.readFile(path.join(runtime, file))).digest('hex')])));
export function monitor(page, errors) {
  page.on('pageerror', e => errors.push({ type: 'page', message: String(e) }));
  page.on('console', m => { if (m.type() === 'error') errors.push({ type: 'console', message: m.text() }); });
  page.on('response', r => { if (r.status() >= 400) errors.push({ type: 'http', status: r.status(), url: r.url() }); });
}
export function nextPair(s) {
  for (const item of ['l3','l2','w1','r1','n1','t1','g1','o1','l1']) {
    const cells = s.board.filter(c => c.item === item);
    if (cells.length > 1) return cells.slice(0, 2).map(c => c.index);
  }
  return null;
}
export async function finishOrder(page, { touch = false, delay = 0, seen, deliveries } = {}) {
  const click = async selector => { await page.locator(selector)[touch ? 'tap' : 'click'](); if (delay) await page.waitForTimeout(delay); };
  for (let guard = 0; guard < 90; guard++) {
    const s = await read(page);
    s.board.forEach(c => { if (c.item && !['producer', 'locked'].includes(c.item)) seen?.add(c.item); });
    if (s.order?.ready) return s;
    const ready = s.order.requirements.find(r => r.available > 0 && r.submitted < r.need);
    if (ready) {
      deliveries?.push({ stage: s.phase, item: ready.item, coinsBefore: s.coins });
      await click(`[data-action="submit"][data-item="${ready.item}"]`);
      assert.equal((await read(page)).coins, s.coins, 'Submitting a material must not prepay a stage reward');
    } else {
      const pair = nextPair(s);
      if (pair) {
        if (s.selected !== null) await page.keyboard.press('Escape');
        await click(`[data-cell="${pair[0]}"]`); await click(`[data-cell="${pair[1]}"]`);
      } else await click(`[data-cell="${s.board.find(c => c.item === 'producer').index}"]`);
    }
  }
  throw Error('Could not complete order with ordinary controls');
}
export async function saveJSON(file, value) { await fs.writeFile(path.join(here, file), JSON.stringify(value, null, 2) + '\n'); }
