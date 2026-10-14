// Localization is display-only: exercise the same repair run in both editions.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const root = new URL('../../', import.meta.url);
const read = path => fs.readFileSync(new URL(path, root), 'utf8');
const chinese = /[\u3400-\u9fff]/;
function load(language, folder, file) {
  const context = vm.createContext({document: {documentElement: {lang: language}}});
  context.window = context;
  for (const path of ['docs/assets/game-locale.js', `docs/assets/${folder}/locale-en.js`, `docs/assets/${folder}/${file}`]) {
    vm.runInContext(read(path), context, {timeout: 2000});
  }
  return context;
}
for (const [folder, scripts] of [
  ['tidekeeper-playable', ['game-core.js', 'game.js']],
  ['duskwood-watch', ['game-v2-config.js', 'game-v2.js']]
]) {
  let dictionary;
  vm.runInNewContext(read(`docs/assets/${folder}/locale-en.js`), {GameLocale: {register: d => { dictionary = d; }}});
  for (const [key, value] of Object.entries(dictionary)) {
    assert.ok(!chinese.test(value), `English message still has Chinese: ${key}`);
    assert.deepEqual([...key.matchAll(/\{\d+\}/g)].map(m => m[0]).sort(),
      [...value.matchAll(/\{\d+\}/g)].map(m => m[0]).sort(), `Placeholders changed: ${key}`);
  }
  let count = 0;
  for (const file of scripts) {
    const source = read(`docs/assets/${folder}/${file}`);
    const unwrapped = source.replace(/\bT\(("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, (_, literal) => {
      const key = vm.runInNewContext(literal);
      assert.ok(Object.hasOwn(dictionary, key), `Missing English copy: ${file}: ${key}`);
      count++;
      return 'T("translated"';
    });
    assert.ok(!chinese.test(unwrapped), `Unlocalized text remains in ${file}`);
    new vm.Script(source, {filename: file});
  }
  assert.ok(count > 50);
  console.log(`PASS: ${folder}: ${count} localized text references, complete English copy and matching placeholders.`);
}

const en = load('en', 'tidekeeper-playable', 'game-core.js');
const zh = load('zh-CN', 'tidekeeper-playable', 'game-core.js');
assert.equal(en.TidekeeperCore.ITEMS.w1.name, 'Wood plank');
assert.equal(zh.TidekeeperCore.ITEMS.w1.name, '修缮木板');
const normalized = value => JSON.parse(JSON.stringify(value));
let enState = en.TidekeeperCore.createState(), zhState = zh.TidekeeperCore.createState();
function action(type, value) {
  const a = en.TidekeeperCore.act(enState, type, value);
  const b = zh.TidekeeperCore.act(zhState, type, value);
  enState = a.state; zhState = b.state;
  assert.deepEqual(normalized(enState), normalized(zhState), `Locale changed game state: ${type}`);
  if (a.event?.text) assert.ok(!chinese.test(a.event.text), `Chinese notice: ${a.event.text}`);
}
action('start'); action('cell', 20); // Locked-crate notice.
for (const stage of en.TidekeeperCore.STAGE_KEYS) {
  assert.equal(enState.phase, stage);
  let moves = 0;
  while (!en.TidekeeperCore.orderReady(enState)) {
    assert.ok(++moves < 150, 'A chapter must remain completable');
    const ready = en.TidekeeperCore.requirements(enState).find(r => r.available && r.submitted < r.need);
    if (ready) action('submit', ready.item);
    else {
      const pair = en.TidekeeperCore.nextPair(enState);
      if (pair) action('drag', {from: pair[0], to: pair[1]});
      else action('supply');
    }
    const saved = en.TidekeeperCore.serialize(enState);
    assert.deepEqual(normalized(en.TidekeeperCore.restore(saved)), normalized(zh.TidekeeperCore.restore(saved)), 'Save must work in either language');
  }
  action('build'); action('finish');
}
action('beckon'); action('finish'); action('claim');
assert.equal(enState.phase, 'complete');
assert.equal(enState.coins, 225);

const duskEn = load('en', 'duskwood-watch', 'game-v2-config.js');
const duskZh = load('zh-CN', 'duskwood-watch', 'game-v2-config.js');
const numericContract = config => JSON.stringify(config, (key, value) => {
  if (['name', 'description'].includes(key)) return undefined;
  if (key === 'items') return value.map(item => item.slice(0, 2));
  return value;
});
assert.equal(numericContract(duskEn.DUSK_V2), numericContract(duskZh.DUSK_V2));
assert.equal(duskEn.DUSK_V2.towers.ballista.name, 'Branch bow');
assert.equal(duskZh.DUSK_V2.towers.ballista.name, '枝弩');
assert.equal(duskEn.GameLocale.text('第 {0} 日 · 备战与巡林', 2), 'Day 2 · Explore and prepare');
assert.equal(duskZh.GameLocale.text('第 {0} 日 · 备战与巡林', 2), '第 2 日 · 备战与巡林');

// Run the Canvas renderer against a recording context, without a browser or network.
// This catches runtime errors and untranslated drawn text in intro/help/build/night.
async function checkDuskRenderer(context) {
  const drawn = [], elements = {};
  const noop = () => {};
  const paint = new Proxy({
    measureText: text => ({width: String(text).length * 9}),
    fillText: text => drawn.push(String(text)),
    createLinearGradient: () => ({addColorStop: noop}),
    createRadialGradient: () => ({addColorStop: noop})
  }, {get: (target, key) => key in target ? target[key] : noop});
  const canvas = () => ({getContext: () => paint, addEventListener: noop, style: {}, focus: noop});
  for (const id of ['game', 'loading', 'status', 'start-accessible', 'night-accessible', 'help-accessible']) {
    elements[id] = id === 'game' ? canvas() : {remove: noop};
  }
  Object.assign(context.document, {
    querySelector: selector => elements[selector.slice(1)],
    createElement: canvas, fonts: {load: () => Promise.resolve()}
  });
  context.addEventListener = noop;
  context.requestAnimationFrame = noop;
  context.console = console;
  context.fetch = async path => ({json: async () => JSON.parse(read(`docs/assets/duskwood-watch/${path}`))});
  context.Image = class {
    set src(path) {
      const bytes = fs.readFileSync(new URL(`docs/assets/duskwood-watch/${path}`, root));
      this.width = bytes.readUInt32BE(16); this.height = bytes.readUInt32BE(20);
      this.onload();
    }
  };
  vm.runInContext(read('docs/assets/duskwood-watch/game-v2.js'), context, {timeout: 2000});
  await context.DuskGame.ready;
  assert.ok(context.DuskGame.state().ready);
  elements['help-accessible'].onclick();
  elements['help-accessible'].onclick();
  context.DuskGame.start();
  assert.ok(context.DuskGame.build('p1', 'ballista'));
  assert.ok(context.DuskGame.upgrade('p1'));
  context.DuskGame.ability('flare');
  context.DuskGame.nextNight();
  context.advanceTime(3000);
  return drawn;
}
const drawnEn = await checkDuskRenderer(duskEn);
const drawnZh = await checkDuskRenderer(duskZh);
assert.ok(drawnEn.includes('DUSKWOOD'), 'English title must replace the Chinese title sprite');
assert.ok(drawnEn.some(text => text.includes('Night 1')));
assert.ok(drawnEn.every(text => !chinese.test(text)), 'English canvas rendered Chinese text');
assert.ok(drawnZh.some(text => chinese.test(text)), 'Original Chinese rendering remains available');

for (const path of [
  'docs/assets/tidekeeper-playable/play.en.html',
  'docs/assets/duskwood-watch/index.en.html',
  'docs/assets/duskwood-watch/play.en.html'
]) {
  assert.match(read(path), /<html lang="en">/);
  assert.ok(!chinese.test(read(path)), `English HTML has Chinese copy: ${path}`);
}
const duskCase = read('docs/assets/duskwood-watch/index.en.html');
assert.match(duskCase, /class="consistency-board"/);
assert.match(duskCase, /SAME PROJECT PACK/);
assert.match(duskCase, /href="play\.en\.html"/);
for (const asset of ['combat-en.png', 'assets/keeper-base.png', 'assets/enemy.png', 'assets/v2/world/lamp-on.png', 'assets/v2/weapons/ballista-base.png']) {
  assert.ok(duskCase.includes(asset), `Duskwood case is missing ${asset}`);
  assert.ok(fs.existsSync(new URL(`docs/assets/duskwood-watch/${asset}`, root)), `Duskwood case asset does not exist: ${asset}`);
}
assert.ok(read('docs/assets/duskwood-watch/play.en.html').includes('combat-en.png'), 'English loading poster must use the English gameplay capture');
console.log('PASS: four repair chapters, notices, rewards, cross-language saves, unchanged Duskwood world data, bilingual Canvas rendering and English entry points.');
