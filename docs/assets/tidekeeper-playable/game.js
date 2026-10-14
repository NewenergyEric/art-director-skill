(function () {
  'use strict';
  const T = globalThis.GameLocale?.text || ((source, ...values) => source.replace(/\{(\d+)\}/g, (_, i) => values[i]));
  const C = window.TidekeeperCore;
  if (!C) return;
  const ART = '../tidekeeper-production/';
  const NEW = 'art/expansion/';
  const SAVE_KEY = 'tidekeeper-lighthouse-v050';
  const PREF_KEY = 'tidekeeper-first-light-sound';
  const $ = id => document.getElementById(id);
  const game = $('game'), board = $('board'), canvas = $('scene');
  const ctx = canvas.getContext('2d');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const images = new Map();
  const assetErrors = [];
  // Each chapter has its own preview camera. Scene art and measured anchors can
  // be tuned without changing gameplay or cropping the tower room out of view.
  const SCENE_LAYOUT = {
    cameras: { dock: { mobileTop: 550, desktopTop: 160 }, tower: { mobileTop: 0, desktopTop: 0 }, lens: { mobileTop: 0, desktopTop: 0 }, fuel: { mobileTop: 0, desktopTop: 0 } },
    lampRoom: [615, 235], standingGround: [498, 864],
    dockRigging: { box: [300.5, 826.3, 116, 116], hook: [366, 849], hookLocal: [289, 100] },
    boatStart: [-410, 1370], boatEnd: [80, 1035], boatSize: [370, 246.67]
  };
  // Static narrative poses, not animation frames. Alpha bounds and both sole anchors
  // were measured from the original PNGs with Pillow at alpha > 32 (2026-10-13).
  // Each visible silhouette is 280 world pixels tall; the lowest sole lands at y=864.
  const STATIC_POSES = {
    'character-base.png': { size: [768, 1152], alphaBounds: [209, 107, 565, 1039], ground: [381.101, 1038], feet: [[255.927, 1038, 81], [506.276, 1021, 77]] },
    'character-signal.png': { size: [640, 960], alphaBounds: [138, 56, 571, 927], ground: [329.172, 926], feet: [[182.930, 926, 77], [475.414, 907, 77]] },
    'character-wave.png': { size: [768, 1152], alphaBounds: [213, 184, 542, 975], ground: [384.687, 974], feet: [[278.620, 974, 72], [490.753, 960, 70]] }
  };
  let state = loadSave() || C.createState();
  let soundEnabled = loadPreference();
  let audioContext = null;
  let dialog = null;
  let lastFocus = null;
  let focusedCell = 1;
  let pointer = null;
  let suppressClickUntil = 0;
  let toastUntil = 0;
  let hintUntil = 0;
  let hintPair = null;
  let presentationTime = 0;
  let lastFrame = performance.now();
  let savedAt = 0;
  let manualUntil = 0;
  let actionGeometry = null;
  let ready = false;
  let cssWidth = 0, cssHeight = 0;
  let fxTimers = [];

  function loadSave() {
    try { return C.restore(localStorage.getItem(SAVE_KEY)); } catch (_) { return null; }
  }
  function loadPreference() {
    try { return localStorage.getItem(PREF_KEY) !== 'off'; } catch (_) { return true; }
  }
  function save() {
    try { localStorage.setItem(SAVE_KEY, C.serialize(state)); } catch (_) { /* The game remains playable in a private or full store. */ }
  }
  function preload(src) {
    if (images.has(src)) return Promise.resolve(images.get(src));
    const image = new Image();
    images.set(src, image);
    image.decoding = 'async';
    return new Promise(resolve => {
      image.onload = () => resolve(image);
      image.onerror = () => { assetErrors.push(src); resolve(null); };
      image.src = src;
    });
  }
  const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const itemSource = id => C.ITEMS[id].image.includes('/') ? C.ITEMS[id].image : ART + C.ITEMS[id].image;
  const itemImage = (id, className = '', alt = '') => `<img class="${className}" src="${itemSource(id)}" alt="${escapeHtml(alt)}" draggable="false">`;
  const currencyImage = (kind, className = '') => `<img class="${className}" src="${C.CURRENCIES[kind].image}" alt="${C.CURRENCIES[kind].name}">`;
  const isBusy = () => !!C.DURATIONS[state.phase];
  const isFocusedScene = () => state.phase !== 'intro' && !C.isBoardPhase(state);
  const isRepairing = () => state.phase === 'repairing_dock' || state.phase === 'repairing_tower';

  const ACTION_PHASES = { repairing_dock: 'repair', repairing_tower: 'repair', installing_lens: 'lens', lighting: 'ignition', arriving: 'beckon' };
  function animationData(name = 'repair') {
    const manifest = window.TIDEKEEPER_ANIMATION;
    const animation = manifest?.actions?.[name] || manifest?.animations?.[name] || manifest?.[name] || (name === 'repair' && manifest?.frames ? manifest : null);
    return animation?.frames?.length ? animation : null;
  }
  function frameSource(frame) { return typeof frame === 'string' ? frame : frame.src || frame.path || frame.image; }
  function frameDuration(frame, animation) { return Math.max(25, Number(frame?.duration ?? frame?.durationMs ?? animation.frameDuration ?? animation.frameDurationMs) || 120); }
  function actionTimeline(name) {
    const animation = animationData(name);
    if (!animation) return { animation: null, frames: [], events: [], cycle: 0, duration: 0, loops: 0 };
    let cycle = 0;
    const frames = animation.frames.map((frame, index) => {
      const entry = { frame, index, start: cycle, duration: frameDuration(frame, animation) };
      cycle += entry.duration;
      return entry;
    });
    const loops = Math.max(1, Math.floor(animation.loops || 1));
    const events = [];
    const sourceEvents = [...(animation.events || [])];
    frames.forEach(({ frame, index, start }) => {
      const names = [frame.event, ...(frame.events || []), frame.impact ? 'impact' : null].filter(Boolean);
      if (name === 'repair' && !names.length && (animation.contactFrames || [animation.contactFrame]).includes(index)) names.push('impact');
      names.forEach(event => sourceEvents.push(typeof event === 'string' ? { name: event, time: start, frame: index } : { ...event, time: event.time ?? start, frame: index }));
    });
    for (let loop = 0; loop < loops; loop++) sourceEvents.forEach(event => {
      const at = Number(event.time ?? event.at ?? frames[event.frame ?? event.frameIndex]?.start);
      if (Number.isFinite(at)) events.push({ ...event, name: event.name || event.type, time: loop * cycle + at, loop });
    });
    return { animation, frames, events: events.filter((event, index, all) => all.findIndex(other => other.name === event.name && other.time === event.time) === index).sort((a, b) => a.time - b.time), cycle, duration: cycle * loops, loops };
  }
  function actionFrame(name, time) {
    const timeline = actionTimeline(name), animation = timeline.animation;
    if (!animation) return { name, src: name === 'repair' ? ART + 'character-repair.png' : ART + 'character-base.png', index: -1, frameCount: 0, phase: 'unavailable', elapsed: Math.max(0, time), duration: 0, eventTimes: [], box: [385, 540, 225, 337.5], sinceHit: -1, contact: [498, 849] };
    const elapsed = Math.max(0, Number(time) || 0);
    const animationTime = Math.min(elapsed, timeline.duration - .01);
    const loopTime = animationTime % timeline.cycle, loop = Math.floor(animationTime / timeline.cycle);
    const entry = timeline.frames.find(frame => loopTime < frame.start + frame.duration) || timeline.frames.at(-1);
    const frame = entry.frame;
    const box = frame.displayBox || animation.displayBox || animation.box || [385, 540, 225, 337.5];
    const frameSize = animation.frameSize || [400, 600];
    const contactLocal = frame.contactLocal || animation.contactLocal;
    const contact = frame.contactWorld || animation.contactWorld || animation.contact || (contactLocal ? [box[0] + contactLocal[0] * box[2] / frameSize[0], box[1] + contactLocal[1] * box[3] / frameSize[1]] : [498, 849]);
    const impact = timeline.events.filter(event => event.name === 'impact' && event.time <= elapsed).at(-1);
    return { name, frameKind: animation.rig ? "continuous timing keys" : "painted poses", paintedSourceFrames: animation.paintedSourceFrames || timeline.frames.length, rigPose: animation.rig ? window.TidekeeperMotion.pose(name, time) : null, src: frameSource(frame), index: entry.index, frameCount: timeline.frames.length, phase: frame.phase || String(entry.index + 1), elapsed, duration: timeline.duration, cycleDuration: timeline.cycle, loop, loops: timeline.loops, box, frameSize, contact, contactLocal, groundLocal: animation.groundLocal, display: animation.display, eventTimes: timeline.events, sinceHit: impact ? elapsed - impact.time : -1 };
  }
  const repairFrame = time => actionFrame('repair', time);
  function beckonPose() {
    if (!['beacon', 'arriving', 'reward', 'complete'].includes(state.phase) || !animationData('beckon')) return null;
    const time = state.phase === 'beacon' ? 0 : state.phase === 'arriving' ? state.phaseTime : actionTimeline('beckon').duration;
    return actionFrame('beckon', time);
  }
  function actionEventTime(name, event, fallback) {
    return actionTimeline(name).events.find(entry => entry.name === event)?.time ?? fallback;
  }
  function beaconVisible() {
    return ['beacon', 'arriving', 'reward', 'complete'].includes(state.phase) || state.phase === 'lighting' && state.phaseTime >= actionEventTime('ignition', 'ignite', 2200);
  }
  function playActionEvents(phase, from, to) {
    const name = ACTION_PHASES[phase];
    if (!name) return;
    actionTimeline(name).events.filter(event => event.time > from && event.time <= to).forEach(event => {
      if (event.name === 'impact') sound('wood');
      else if (event.name === 'ignite') sound('lit');
      else if (event.name === 'seat' || event.name === 'latch') sound('supply');
    });
  }

  function sound(name) {
    if (!soundEnabled || !audioContext) return;
    const ac = audioContext;
    if (ac.state === 'suspended') ac.resume().catch(() => {});
    const now = ac.currentTime;
    const note = (frequency, duration, start, volume = .027, type = 'sine') => {
      const osc = ac.createOscillator(), gain = ac.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(frequency, now + start);
      gain.gain.setValueAtTime(0, now + start);
      gain.gain.linearRampToValueAtTime(volume, now + start + .009);
      gain.gain.exponentialRampToValueAtTime(.0001, now + start + duration);
      osc.connect(gain); gain.connect(ac.destination);
      osc.start(now + start); osc.stop(now + start + duration + .015);
    };
    if (name === 'merge') { note(523.25, .15, 0); note(783.99, .26, .065, .023); }
    else if (name === 'wood') { note(190, .085, 0, .035, 'triangle'); note(110, .065, .025, .025, 'triangle'); }
    else if (name === 'supply') note(392, .17, 0, .02);
    else if (name === 'win' || name === 'lit') [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => note(f, .54, i * .105, .022));
    else if (name === 'arrived') [261.63, 392, 523.25].forEach((f, i) => note(f, .7, i * .13, .02, 'triangle'));
    else if (name === 'start') note(523.25, .25, 0, .018);
  }
  function unlockAudio() {
    if (!soundEnabled) return;
    if (!audioContext) {
      const Audio = window.AudioContext || window.webkitAudioContext;
      if (Audio) { try { audioContext = new Audio(); } catch (_) { return; } }
    }
    if (audioContext?.state === 'suspended') audioContext.resume().catch(() => {});
  }
  function renderSound() {
    $('sound-button').innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5Z"/>${soundEnabled ? '<path d="M15 8a6 6 0 0 1 0 8M18 5a10 10 0 0 1 0 14"/>' : '<path d="m16 9 5 6m0-6-5 6"/>'}</svg>`;
    $('sound-button').setAttribute('aria-label', soundEnabled ? T("关闭声音") : T("打开声音"));
    $('sound-button').setAttribute('aria-pressed', String(soundEnabled));
  }

  function tell(message, duration = 2600) {
    $('toast').textContent = message;
    $('toast').classList.add('visible');
    toastUntil = presentationTime + duration;
  }
  function dispatch(action, value) {
    const result = C.act(state, action, value);
    if (result.state === state && !result.event) return;
    const old = state;
    state = result.state;
    if (old.phase !== state.phase) {
      clearEffects();
      actionGeometry = null;
      if (isBusy()) {
        toastUntil = 0;
        $('toast').classList.remove('visible');
        $('toast').textContent = '';
      }
      if (isFocusedScene()) {
        hintPair = null;
        cancelDrag();
      }
    }
    renderUI();
    save();
    handleEvent(result.event);
    if (reducedMotion && isBusy()) dispatch('finish');
    drawScene();
  }
  function handleEvent(event) {
    if (!event) return;
    if (event.type === 'notice') { tell(event.text); return; }
    if (event.type === 'merge') {
      sound(event.before === 'w1' ? 'wood' : 'merge');
      mergeEffect(event);
    }
    if (event.type === 'move') {
      const target = board.querySelector(`[data-cell="${event.to}"]`);
      target?.classList.add('supply-pop');
    }
    if (event.type === 'supply') {
      sound('supply');
      (event.slots || [event.to]).forEach(slot => board.querySelector(`[data-cell="${slot}"]`)?.classList.add('supply-pop'));
    }
    if (event.type === 'submitted') { sound('supply'); if (event.ready) tell(T("材料交齐了，可以开工。"), 1800); }
    if (event.type === 'stage-complete') { sound('merge'); if (event.stage !== 'fuel') tell(T("{0} · +{1} 金币", C.STAGES[event.stage].name, event.coins), 2200); }
    if (event.type === 'arrived' || event.type === 'start') sound(event.type);
    if (event.type === 'win') { sound('win'); showDialog('win'); }
    if (event.type === 'start') { hideDialog(); $('board').querySelector('[data-cell="1"]')?.focus({ preventScroll: true }); }
  }

  function renderOrder() {
    const stage = C.stageFor(state);
    if (!stage || isFocusedScene()) { $('order').replaceChildren(); return; }
    const config = C.STAGES[stage], active = C.isBoardPhase(state);
    $('order').innerHTML = `<div class="order-summary"><span class="order-person">${config.person}${T("的订单")}</span><h1>${config.name}</h1><span class="stage-count">${C.STAGE_KEYS.indexOf(stage) + 1}/4</span></div><div class="requirements">${C.requirements(state).map(req => {
      const done = req.submitted === req.need, can = active && !done && req.available > 0;
      return `<button class="requirement ${done ? 'delivered' : can ? 'available' : ''}" data-action="submit" data-item="${req.item}" ${can ? '' : 'disabled'} aria-label="${C.ITEMS[req.item].name}${T("，已交付")}${req.submitted}/${req.need}${can ? T("，点击交付一件") : ''}">${itemImage(req.item)}<span class="requirement-copy"><strong>${C.ITEMS[req.item].name}</strong><span>${req.submitted}/${req.need} <em>${done ? T("已交齐") : can ? req.item === 't2' ? T("配发工具") : T("交付") : T("待合成")}</em></span></span></button>`;
    }).join('')}</div><div class="order-bottom"><span class="order-reward">${currencyImage('coins')}+${config.reward}${config.tokens ? `${currencyImage('tokens')}+${config.tokens}` : ''}</span><button class="action-button" data-action="build" ${C.orderReady(state) ? '' : 'disabled'}>${config.verb}</button></div>`;
  }

  function renderBoard() {
    const previousFocus = document.activeElement?.dataset?.cell;
    const selected = state.selected === null ? null : state.board[state.selected];
    const interactive = C.isBoardPhase(state);
    board.classList.toggle('inactive', !interactive);
    board.innerHTML = state.board.map((value, index) => {
      const info = C.ITEMS[value];
      const isSelected = state.selected === index;
      const matches = selected && selected === value && index !== state.selected && info?.next;
      const order = C.requirements(state).some(req => req.item === value && req.submitted < req.need);
      const classes = ['cell', value === 'locked' ? 'locked' : '', value === 'producer' ? 'producer' : '', isSelected ? 'selected' : '', matches ? 'match' : '', hintPair?.includes(index) && hintUntil > presentationTime ? 'hint' : ''].filter(Boolean).join(' ');
      return `<button class="${classes}" data-cell="${index}" tabindex="${index === focusedCell ? 0 : -1}" ${value === 'locked' || !interactive ? 'disabled' : ''} aria-label="${T("第")}${Math.floor(index / 5) + 1}${T("行第")}${index % 5 + 1}${T("格，")}${info?.name || T("空位")}${info?.level ? T("，{0}级", info.level) : ''}${order ? T("，订单需要") : ''}" aria-pressed="${isSelected}">${value ? itemImage(value) : ''}${info?.level ? `<span class="level" aria-hidden="true">${info.level}</span>` : ''}${value === 'producer' ? '<span class="producer-plus" aria-hidden="true">+</span>' : ''}${order ? '<span class="order-check" aria-hidden="true">✓</span>' : ''}</button>`;
    }).join('');
    if (previousFocus !== undefined && interactive) board.querySelector(`[data-cell="${previousFocus}"]`)?.focus({ preventScroll: true });
    $('undo-button').disabled = !state.undo || !interactive;
    $('hint-button').disabled = !interactive;
    $('supply-button').disabled = !interactive;
  }
  function renderInfo() {
    const selected = state.selected === null ? null : state.board[state.selected];
    const req = C.requirements(state).find(entry => entry.submitted < entry.need);
    const familyId = C.ITEMS[selected]?.family || (req ? C.ITEMS[req.item].family : 'wood');
    const item = selected || C.FAMILIES[familyId].items[0];
    const info = C.ITEMS[item];
    const max = !info.next && !!info.family;
    const description = max ? item === 't2' ? T("配发给这次施工，下一次另备一包。") : T("做好了，点击上方材料交付。") : item === 'producer' ? T("轻点取一件，补给页可用航运券。") : T("点击两件相同物品，或拖到一起合成。");
    const chain = C.FAMILIES[familyId].items;
    $('item-info').innerHTML = `${itemImage(item, 'info-image')}<div class="info-copy"><strong>${info.name}</strong><p>${description}</p></div><div class="chain" aria-label="${C.FAMILIES[familyId].name}${T("合成链")}">${chain.map((value, i) => (i ? '<span>›</span>' : '') + itemImage(value, value === selected ? 'current' : '')).join('')}</div>`;
  }
  function renderSceneCopy() {
    const phase = state.phase;
    const stage = C.stageFor(state), config = stage ? C.STAGES[stage] : null;
    const chapters = config ? [config.chapter, config.name] : [T("归航"), ['reward', 'complete'].includes(phase) ? T("欢迎回家") : T("等待归航")];
    $('chapter-label').textContent = chapters[0]; $('chapter-name').textContent = chapters[1];
    const captions = {
      intro: [T("让旧灯塔重新亮起来。"), ''], dock: [T("先把栈桥修牢。"), T("新木板和缆绳，缺一不可。")],
      repairing_dock: ['', ''], tower: [T("灯室的木架，需要修补。"), T("备好木料、铁钉和安装工具。")], repairing_tower: ['', ''],
      lens: [T("透镜，把灯火送得更远。"), T("磨好的玻璃，要稳稳装入灯室。")], installing_lens: ['', ''],
      fuel: [T("油箱满了，夜路才有光。"), T("将灯油与四级灯组送进灯室。")],
      lighting: ['', ''], beacon: [T("让船看见这束光。"), T("海雾里，船长正在寻找码头。")],
      arriving: [T("顺着灯光，回家。"), ''], reward: [T("欢迎回家。"), T("船长带来了新木料和灯油。")],
      complete: [T("灯塔重新亮起来了。"), T("栈桥、灯塔和第一艘归船。")]
    }[phase];
    $('scene-caption').innerHTML = `<h2>${captions[0]}</h2>${captions[1] ? `<p class="secondary-caption">${captions[1]}</p>` : ''}`;
    const controls = $('scene-controls');
    const busyLabel = { repairing_dock: T("更换木板 · 系牢缆绳"), repairing_tower: T("补好木架 · 固定栏杆"), installing_lens: T("安装聚光透镜"), lighting: T("注入灯油 · 点亮灯室"), arriving: T("缓缓靠岸") }[phase];
    if (C.DURATIONS[phase]) controls.innerHTML = `<div class="scene-status">${busyLabel}</div><div class="progress" role="progressbar" aria-label="${busyLabel}${T("进度")}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><span></span></div><button class="skip" data-action="finish">${T("略过")}</button>`;
    else if (phase === 'beacon') controls.innerHTML = `<button class="scene-button" data-action="beckon">${T("招呼归船")} <span aria-hidden="true">→</span></button>`;
    else if (phase === 'reward') controls.innerHTML = `<button class="scene-button" data-action="claim">${currencyImage('coins')}${T("领取归航礼物 +75")}</button>`;
    else if (phase === 'complete') controls.innerHTML = `<button class="scene-button" data-action="restart">${T("再玩一次")}</button>`;
    else controls.innerHTML = '';
    $('scene-caption').hidden = controls.childElementCount > 0;
    canvas.setAttribute('aria-label', `${chapters[1]}：${captions[0]}`);
  }
  function renderUI() {
    const active = document.activeElement;
    const focusRegion = $('order').contains(active) ? 'order' : $('scene-controls').contains(active) ? 'scene-controls' : null;
    const focusAction = active?.dataset?.action, focusItem = active?.dataset?.item;
    $('coins').textContent = String(state.coins);
    $('tokens').textContent = String(state.tokens);
    game.classList.toggle('scene-focused', isFocusedScene());
    game.dataset.phase = state.phase;
    renderOrder(); renderBoard(); renderInfo(); renderSceneCopy();
    updateProgress();
    if (focusRegion && !dialog) {
      const selector = `[data-action="${focusAction}"]${focusItem ? `[data-item="${focusItem}"]` : ''}:not(:disabled)`;
      const next = $(focusRegion).querySelector(selector) || $('order').querySelector('button:not(:disabled)') || $('scene-controls').querySelector('button:not(:disabled)') || board.querySelector('[tabindex="0"]:not(:disabled)');
      next?.focus({ preventScroll: true });
    }
  }
  function updateProgress() {
    const progress = $('scene-controls').querySelector('.progress');
    if (!progress) return;
    const value = Math.min(100, state.phaseTime / C.DURATIONS[state.phase] * 100);
    progress.firstElementChild.style.width = `${value}%`;
    progress.setAttribute('aria-valuenow', String(Math.round(value)));
  }

  function clearEffects() {
    fxTimers.forEach(clearTimeout); fxTimers = [];
    $('board-effects').replaceChildren();
  }
  function mergeEffect(event) {
    if (reducedMotion) return;
    const from = board.querySelector(`[data-cell="${event.from}"]`), to = board.querySelector(`[data-cell="${event.to}"]`);
    if (!from || !to) return;
    const area = $('board-effects'), bounds = area.getBoundingClientRect(), a = from.getBoundingClientRect(), b = to.getBoundingClientRect();
    const flight = document.createElement('img');
    flight.src = itemSource(event.before);
    flight.className = 'merge-flight';
    Object.assign(flight.style, { left: `${a.left - bounds.left + 4}px`, top: `${a.top - bounds.top + 4}px`, width: `${a.width - 8}px`, height: `${a.height - 8}px` });
    flight.style.setProperty('--dx', `${b.left - a.left}px`); flight.style.setProperty('--dy', `${b.top - a.top}px`);
    area.append(flight); to.classList.add('pop');
    const x = b.left - bounds.left + b.width / 2, y = b.top - bounds.top + b.height / 2;
    fxTimers.push(setTimeout(() => {
      const ring = document.createElement('i'); ring.className = 'merge-ring'; ring.style.left = `${x}px`; ring.style.top = `${y}px`; area.append(ring);
      for (let i = 0; i < 7; i++) {
        const spark = document.createElement('i'); spark.className = 'merge-spark'; spark.style.left = `${x}px`; spark.style.top = `${y}px`;
        spark.style.setProperty('--dx', `${Math.cos(i * 2.4) * (28 + i * 3)}px`); spark.style.setProperty('--dy', `${Math.sin(i * 2.4) * (28 + i * 3)}px`);
        area.append(spark); fxTimers.push(setTimeout(() => spark.remove(), 550));
      }
      fxTimers.push(setTimeout(() => ring.remove(), 500));
    }, 140));
    fxTimers.push(setTimeout(() => flight.remove(), 250));
  }

  function getImage(src) { const image = images.get(src); return image?.complete && image.naturalWidth > 0 ? image : null; }
  const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
  const smooth = v => { const t = clamp(v); return t * t * (3 - 2 * t); };
  function drawImage(src, box, alpha = 1, flip = false) {
    const image = getImage(src);
    if (!image || alpha <= 0) return;
    ctx.save(); ctx.globalAlpha = alpha;
    if (flip) { ctx.translate(box[0] + box[2], box[1]); ctx.scale(-1, 1); ctx.drawImage(image, 0, 0, box[2], box[3]); }
    else ctx.drawImage(image, ...box);
    ctx.restore();
  }
  function ellipse(x, y, rx, ry, color, opacity = 1) {
    ctx.save(); ctx.globalAlpha = opacity; ctx.fillStyle = color; ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
  }
  function glow(x, y, radius, opacity) {
    ctx.save(); ctx.globalAlpha = opacity; const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, '#ffecaecc'); gradient.addColorStop(.34, '#f8c46359'); gradient.addColorStop(1, '#f8c46300');
    ctx.fillStyle = gradient; ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2); ctx.restore();
  }
  function staticPosePlacement(file) {
    const pose = STATIC_POSES[file];
    const scale = 280 / (pose.alphaBounds[3] - pose.alphaBounds[1]);
    const ground = SCENE_LAYOUT.standingGround;
    const box = [ground[0] - pose.ground[0] * scale, ground[1] - pose.ground[1] * scale, pose.size[0] * scale, pose.size[1] * scale];
    return { box, feet: pose.feet.map(foot => [box[0] + foot[0] * scale, box[1] + foot[1] * scale, foot[2] * scale]) };
  }
  function drawStaticPose(file, lit) {
    const placement = staticPosePlacement(file);
    // Separate sole shadows follow the measured foot contact positions of each pose.
    for (const [x, y, width] of placement.feet) ellipse(x, y + 1, width * .66, 4, '#334c45', lit ? .27 : .18);
    drawImage(ART + file, placement.box);
  }
  function drawActionPose(name, time, frame, box) {
    if (!animationData(name)?.rig || !window.TidekeeperMotion.draw(ctx, name, time, box)) drawImage(frame.src, box);
  }
  function drawActionInset(name, time, view) {
    const animation = animationData(name);
    if (!animation) return;
    const frame = actionFrame(name, time);
    // The inset is a narrative lamp-room close-up, never a map-scale actor.
    // Its screen-space box stays fixed while the harbor changes layout.
    const landscape = view.width > view.height * 1.35;
    const panelTop = landscape ? 78 : 82;
    const maxHeight = Math.max(160, view.height - panelTop - (landscape ? 18 : 150));
    const width = Math.max(84, Math.min(name === "ignition" ? 246 : 218, view.width * (landscape ? .28 : name === "ignition" ? .60 : .47), (maxHeight - 30) * frame.frameSize[0] / frame.frameSize[1]));
    const height = (width - 8) * frame.frameSize[1] / frame.frameSize[0] + 28, x = 14, y = panelTop;
    const inner = [x + 4, y + 24, width - 8, height - 28];
    const toScreen = point => [view.left / view.ratio + point[0] * view.scale / view.ratio, (point[1] - view.top) * view.scale / view.ratio];
    const lamp = toScreen(SCENE_LAYOUT.lampRoom);
    const target = toScreen(name === 'repair' ? frame.contact : name === 'beckon' ? SCENE_LAYOUT.standingGround : SCENE_LAYOUT.lampRoom);
    const local = frame.contactLocal || [310, 300];
    const fixture = [inner[0] + local[0] * inner[2] / frame.frameSize[0], inner[1] + local[1] * inner[3] / frame.frameSize[1]];
    const origin = canvas.getBoundingClientRect();
    actionGeometry = { x: origin.left + x, y: origin.top + y, width, height, fixture: { x: origin.left + fixture[0], y: origin.top + fixture[1] }, worldLamp: { x: origin.left + lamp[0], y: origin.top + lamp[1] }, worldTarget: { x: origin.left + target[0], y: origin.top + target[1] } };
    ctx.save(); ctx.setTransform(view.ratio, 0, 0, view.ratio, 0, 0);
    ctx.strokeStyle = '#f8e4a8'; ctx.lineWidth = 1.5; ctx.globalAlpha = .85;
    ctx.beginPath(); ctx.moveTo(x + width, y + 28); ctx.lineTo(target[0] - 5, target[1] + 5); ctx.stroke();
    ctx.beginPath(); ctx.arc(target[0], target[1], 5, 0, Math.PI * 2); ctx.stroke();
    ctx.globalAlpha = 1; ctx.fillStyle = '#fff0cfed'; ctx.strokeStyle = '#b68451'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(x, y, width, height, 13); ctx.fill(); ctx.stroke();
    const title = name === 'repair' ? (state.phase === 'repairing_tower' ? T('修复塔身') : T('修好栈桥')) : name === 'beckon' ? T('招呼归船') : T('灯室');
    ctx.fillStyle = '#466b5b'; ctx.font = '700 12px TideSans, sans-serif'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText(title, x + 12, y + 13, width - 24);
    ctx.save(); ctx.beginPath(); ctx.roundRect(...inner, 8); ctx.clip();
    drawActionPose(name, time, frame, inner);
    if (name === 'repair' && frame.sinceHit >= 0 && frame.sinceHit < 225) {
      const p = frame.sinceHit / 225;
      for (let i = 0; i < 5; i++) ellipse(fixture[0] + Math.cos(i * 2.4) * p * 13, fixture[1] - p * (7 + i * 2), 1 + p * 2, 1 + p, i % 2 ? '#dbbc88' : '#e5bb78', .62 * (1 - p));
    }
    const ignite = actionEventTime('ignition', 'ignite', 2200);
    if (name === 'ignition' && time >= ignite) {
      const p = clamp((time - ignite) / 220), size = (animation.effectRadius || 16) * inner[2] / frame.frameSize[0];
      glow(fixture[0], fixture[1], Math.max(20, size * 5), .35 * p);
    }
    ctx.restore(); ctx.restore();
  }
  function drawScene() {
    if (!ctx || !ready) return;
    const bounds = canvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    if (cssWidth !== bounds.width || cssHeight !== bounds.height || canvas.width !== Math.round(bounds.width * ratio)) {
      cssWidth = bounds.width; cssHeight = bounds.height;
      canvas.width = Math.max(1, Math.round(cssWidth * ratio)); canvas.height = Math.max(1, Math.round(cssHeight * ratio));
    }
    const landscape = isFocusedScene() && bounds.width > bounds.height * 1.35;
    const scale = (landscape ? Math.min : Math.max)(canvas.width / 900, canvas.height / 1600);
    const viewHeight = canvas.height / scale, left = (canvas.width - 900 * scale) * (landscape ? .54 : .5);
    const camera = SCENE_LAYOUT.cameras[C.stageFor(state) || 'fuel'];
    const requestedTop = isFocusedScene() ? 0 : innerWidth < 800 ? camera.mobileTop : camera.desktopTop;
    const top = clamp(requestedTop, 0, Math.max(0, 1600 - viewHeight));
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = '#277d83'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(scale, 0, 0, scale, left, -top * scale);
    const phase = state.phase, time = state.phaseTime;
    const returningPose = beckonPose();
    const lit = beaconVisible();
    const igniteAt = actionEventTime('ignition', 'ignite', 2200);
    const night = phase === 'lighting' ? smooth((time - igniteAt) / Math.max(1, C.DURATIONS.lighting - igniteAt)) : lit ? 1 : 0;
    const sceneFiles = {
      intro: 'scene-dock-broken.jpg', dock: 'scene-dock-broken.jpg', repairing_dock: 'scene-dock-broken.jpg',
      tower: 'scene-tower-broken.jpg', repairing_tower: 'scene-tower-broken.jpg',
      lens: 'scene-tower-repaired.jpg', installing_lens: 'scene-tower-repaired.jpg',
      fuel: 'scene-lens-installed.jpg', lighting: 'scene-lens-installed.jpg',
      beacon: 'scene-night-lit.jpg', arriving: 'scene-night-lit.jpg', reward: 'scene-night-lit.jpg', complete: 'scene-night-lit.jpg'
    };
    drawImage(NEW + sceneFiles[phase], [0, 0, 900, 1600]);
    const targetScene = { repairing_dock: 'scene-tower-broken.jpg', repairing_tower: 'scene-tower-repaired.jpg', installing_lens: 'scene-lens-installed.jpg', lighting: 'scene-night-lit.jpg' }[phase];
    const installAt = actionEventTime('lens', 'release', actionEventTime('lens', 'seat', 1500));
    const targetAlpha = phase === 'lighting' ? night : phase === 'installing_lens' ? smooth((time - installAt) / Math.max(1, C.DURATIONS.installing_lens - installAt)) : smooth((time / C.DURATIONS[phase] - .75) / .25);
    if (targetScene) drawImage(NEW + targetScene, [0, 0, 900, 1600], targetAlpha);

    const riggingAlpha = state.completed.includes('dock') ? 1 : phase === 'repairing_dock' ? smooth((time / C.DURATIONS[phase] - .62) / .38) : 0;
    if (riggingAlpha > 0) {
      const rig = SCENE_LAYOUT.dockRigging;
      // The hook rests on the post's rope collar; this is installed order material.
      ellipse(rig.hook[0] + 1, rig.hook[1] + 40, 17, 24, '#334c45', .16 * riggingAlpha);
      ctx.save(); ctx.filter = night ? `brightness(${1 - night * .2}) saturate(.9)` : 'none';
      drawImage(NEW + 'rope-2.png', rig.box, riggingAlpha); ctx.restore();
    }

    if (isRepairing()) {
      const frame = repairFrame(time);
      const box = frame.box;
      const ground = frame.groundLocal || [200, 573];
      ellipse(box[0] + ground[0] * box[2] / (frame.frameSize?.[0] || 400), box[1] + ground[1] * box[3] / (frame.frameSize?.[1] || 600), box[2] * .3, 9, '#394644', .18);
      drawActionPose("repair", time, frame, box);
      drawImage(ART + 'wood-l2.png', [625, 850, 108, 108], .96);
      if (frame.sinceHit >= 0 && frame.sinceHit < 225) {
        const p = frame.sinceHit / 225;
        for (let i = 0; i < 5; i++) ellipse(frame.contact[0] + Math.cos(i * 2.4) * p * 31, frame.contact[1] - p * (16 + i * 3), 3 + p * 6, 2 + p * 3, i % 2 ? '#dbbc88' : '#f6dfad', .62 * (1 - p));
      }
    } else if (returningPose) {
      const frame = returningPose;
      if (frame.groundLocal) ellipse(frame.box[0] + frame.groundLocal[0] * frame.box[2] / frame.frameSize[0], frame.box[1] + frame.groundLocal[1] * frame.box[3] / frame.frameSize[1], frame.box[2] * .27, 6, '#334c45', .27);
      drawActionPose("beckon", frame.elapsed, frame, frame.box);
    } else if (phase !== 'intro' && !['installing_lens', 'lighting'].includes(phase)) {
      const signaling = ['beacon', 'arriving', 'reward'].includes(phase);
      const actor = phase === 'complete' ? 'character-wave.png' : signaling ? 'character-signal.png' : 'character-base.png';
      drawStaticPose(actor, lit);
    }

    // The light belongs to the repaired tower room. No lamp is placed on a pier post.
    if (lit) {
      glow(SCENE_LAYOUT.lampRoom[0], SCENE_LAYOUT.lampRoom[1], 115, .36 * night);
    }
    if (phase === 'arriving' || phase === 'reward' || phase === 'complete') {
      // The offstage approach belongs to the sea, not the landscape UI margins.
      ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 900, 1600); ctx.clip();
      const t = phase === 'arriving' ? smooth(time / C.DURATIONS.arriving) : 1;
      const x = SCENE_LAYOUT.boatStart[0] + (SCENE_LAYOUT.boatEnd[0] - SCENE_LAYOUT.boatStart[0]) * t;
      const y = SCENE_LAYOUT.boatStart[1] + (SCENE_LAYOUT.boatEnd[1] - SCENE_LAYOUT.boatStart[1]) * t;
      ctx.save(); ctx.strokeStyle = '#d2e8ca'; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.globalAlpha = phase === 'arriving' ? .48 : .17;
      ctx.beginPath(); ctx.moveTo(x + 40, y + 173); ctx.quadraticCurveTo(x + 173, y + 227, x + 351, y + 172); ctx.stroke();
      ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + 24, y + 189); ctx.quadraticCurveTo(x + 159, y + 250, x + 326, y + 201); ctx.stroke(); ctx.restore();
      ellipse(x + 204, y + 178, 154, 25, '#164e64', .14);
      drawImage(ART + 'supply-boat.png', [x, y, ...SCENE_LAYOUT.boatSize], 1, true);
      ctx.restore();
    }
    if (lit && !reducedMotion) {
      ctx.save(); ctx.strokeStyle = '#c6e3c6'; ctx.lineCap = 'round'; ctx.lineWidth = 2.5;
      for (let i = 0; i < 6; i++) {
        ctx.globalAlpha = (.07 + .05 * Math.sin(presentationTime / 1200 + i)) * night;
        const x = 36 + i * 134, y = 1258 + i % 3 * 57;
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 18 + i % 2 * 15, y); ctx.stroke();
      }
      ctx.restore();
    }
    actionGeometry = null;
    if (phase === 'installing_lens' || phase === 'lighting' || landscape && ACTION_PHASES[phase]) drawActionInset(ACTION_PHASES[phase], time, { width: bounds.width, height: bounds.height, ratio, scale, left, top });
  }

  function showDialog(kind) {
    if (!dialog) lastFocus = document.activeElement;
    dialog = kind;
    game.inert = true;
    const overlay = $('overlay');
    overlay.hidden = false; document.body.classList.add('modal-open');
    if (kind === 'intro') {
      overlay.innerHTML = `<section class="dialog intro-dialog" role="dialog" aria-modal="true" aria-labelledby="intro-title"><div class="intro-scene"><img class="intro-harbor" src="${NEW}scene-dock-broken.jpg" alt="${T("旧灯塔与待修的栈桥")}"><img class="intro-person" src="${ART}character-base.png" alt="${T("灯匠阿澜")}"><span class="intro-brand">${T("潮灯小镇")}</span></div><div class="intro-body"><span class="intro-kicker">${T("一座灯塔的归来")}</span><h1 id="intro-title">${T("重燃灯塔")}</h1><p>${T("从一块木板，到灯室里的第一束光。")}<br>${T("和阿澜一起，迎接归船。")}</p><div class="intro-actions"><button class="action-button" id="start-button" data-action="start">${T("一起开工")} <span aria-hidden="true">→</span></button><span class="intro-controls">${T("点击或拖动")}<br>${T("合成相同物品")}</span></div></div></section>`;
    } else if (kind === 'help') {
      overlay.innerHTML = `<section class="dialog" role="dialog" aria-modal="true" aria-labelledby="help-title"><button class="dialog-close" data-action="close-dialog" aria-label="${T("关闭")}">×</button><h2 id="help-title">${T("灯匠的小手册")}</h2><ul class="help-steps"><li>${itemImage('w1')}<span><strong>${T("合成")}</strong><br>${T("先选一件，再点相同物品。也可以拖到一起。")}</span></li><li>${itemImage('producer')}<span><strong>${T("补给")}</strong><br>${T("点补给箱免费取材料，航运券可一次取一对。")}</span></li><li>${itemImage('g2')}<span><strong>${T("施工")}</strong><br>${T("材料逐件交付，交齐后开始本章施工。")}</span></li></ul><p class="help-keyboard">${T("方向键移动选择 · 回车或空格操作")}<br>${T("Esc 取消选择 · F 全屏")}</p><div class="dialog-footer"><button class="action-button" data-action="close-dialog">${T("继续开工")}</button><button class="secondary-button" data-action="ask-restart">${T("重新开始")}</button></div></section>`;
    } else if (kind === 'restart') {
      overlay.innerHTML = `<section class="dialog" role="dialog" aria-modal="true" aria-labelledby="restart-title"><h2 id="restart-title">${T("重新开工？")}</h2><p>${T("这次会从旧栈桥重新开始。")}</p><div class="dialog-footer"><button class="action-button" data-action="restart">${T("重新开始")}</button><button class="secondary-button" data-action="close-dialog">${T("继续这一局")}</button></div></section>`;
    } else if (kind === 'win') {
      overlay.innerHTML = `<section class="dialog win-dialog" role="dialog" aria-modal="true" aria-labelledby="win-title">${itemImage('l4', 'win-emblem')}<span class="intro-kicker">${T("四章修缮 · 完成")}</span><h2 id="win-title">${T("灯塔重新亮起来了。")}</h2><p>${T("栈桥稳了，透镜映着灯火。")}<br>${T("第一艘归船，今夜靠岸。")}</p><div class="win-reward">${currencyImage('coins')}${T("归航礼物 +75")}</div><div class="win-stat">${T("完成 ")}${state.merges}${T(" 次合成 · 七类材料齐备")}</div><div class="win-actions"><button class="action-button" data-action="close-dialog">${T("看看港湾")}</button><button class="secondary-button" data-action="restart">${T("再玩一次")}</button></div></section>`;
    } else if (kind === 'catalog') {
      const stage = C.stageFor(state);
      overlay.innerHTML = `<section class="dialog catalog-dialog" role="dialog" aria-modal="true" aria-labelledby="catalog-title"><button class="dialog-close" data-action="close-dialog" aria-label="${T("关闭图鉴")}">×</button><span class="intro-kicker">${T("港湾手册")}</span><h2 id="catalog-title">${T("材料图鉴")}</h2><div class="catalog-grid">${Object.entries(C.FAMILIES).map(([family, data]) => `<article class="catalog-family" data-family="${family}"><div class="catalog-family-title"><h3>${data.name}</h3>${data.stages.includes(stage) ? `<span>${T("本章需要")}</span>` : ''}</div><div class="catalog-chain">${data.items.map((item, index) => `${index ? '<span class="chain-arrow" aria-hidden="true">›</span>' : ''}<div>${itemImage(item, '', C.ITEMS[item].name)}<strong>${C.ITEMS[item].name}</strong><small>${T("{0}级", C.ITEMS[item].level)}</small></div>`).join('')}</div><p>${data.use}</p></article>`).join('')}</div><div class="catalog-currencies"><div>${currencyImage('coins')}<span><strong>${T("贝壳金币")}</strong>${T("完成施工与归航获得")}</span></div><div>${currencyImage('tokens')}<span><strong>${T("航运券")}</strong>${T("在补给处一次取一对材料")}</span></div></div><button class="action-button" data-action="close-dialog">${T("收好图鉴")}</button></section>`;
    } else if (kind === 'supply') {
      overlay.innerHTML = `<section class="dialog supply-dialog" role="dialog" aria-modal="true" aria-labelledby="supply-title"><button class="dialog-close" data-action="close-dialog" aria-label="${T("关闭补给")}">×</button><span class="intro-kicker">${T("港湾补给")}</span><h2 id="supply-title">${T("这次需要什么？")}</h2><div class="supply-wallet">${currencyImage('tokens')}<strong>${state.tokens}</strong><span>${T("航运券")}</span></div><div class="supply-list">${C.supplyOptions(state).map(option => `<article class="supply-option" data-family="${option.family}">${itemImage(option.item)}<div class="supply-copy"><strong>${C.ITEMS[option.item].name}</strong><span>${option.missing ? T("还可取 {0} 件", option.missing) : T("已备齐")}</span></div><div class="supply-actions"><button class="action-button" data-action="supply" data-family="${option.family}" ${option.missing > 0 ? '' : 'disabled'}>${T("免费取一件")}</button><button class="pair-button" data-action="supply-pair" data-family="${option.family}" ${option.pairAvailable ? '' : 'disabled'}>${currencyImage('tokens')}1 · ${T("取一对")}</button></div></article>`).join('')}</div><button class="secondary-button" data-action="close-dialog">${T("回到工作台")}</button></section>`;
    } else if (kind === 'load-error') {
      overlay.innerHTML = `<section class="dialog" role="alertdialog" aria-modal="true" aria-labelledby="load-title"><h2 id="load-title">${T("港湾还没有载入")}</h2><p>${T("有几件行李还没到，刷新后再试一次。")}</p><button class="action-button" data-action="reload">${T("重新载入")}</button></section>`;
    }
    requestAnimationFrame(() => overlay.querySelector('.action-button,button')?.focus({ preventScroll: true }));
  }
  function hideDialog() {
    game.inert = false;
    dialog = null; $('overlay').hidden = true; $('overlay').replaceChildren(); document.body.classList.remove('modal-open');
    if (lastFocus?.isConnected) lastFocus.focus({ preventScroll: true });
    lastFocus = null;
  }
  function perform(action, value) {
    unlockAudio();
    if (action === 'close-dialog') { hideDialog(); return; }
    if (action === 'ask-restart') { showDialog('restart'); return; }
    if (action === 'reload') { location.reload(); return; }
    if ((action === 'supply' || action === 'supply-pair') && dialog === 'supply') hideDialog();
    if (action === 'restart') { clearEffects(); hideDialog(); }
    dispatch(action, value);
  }

  function hint() {
    if (!C.isBoardPhase(state)) return;
    if (C.orderReady(state)) {
      $('order').querySelector('.action-button')?.focus({ preventScroll: true });
      tell(T("材料交齐了，开始施工吧。")); return;
    }
    const available = C.requirements(state).find(req => req.available > 0 && req.submitted < req.need);
    if (available) { $('order').querySelector(`[data-item="${available.item}"]`)?.focus({ preventScroll: true }); tell(T("这件材料可以交付了。")); return; }
    hintPair = C.nextPair(state);
    hintUntil = presentationTime + 2900;
    if (hintPair) { renderBoard(); tell(T("这两件可以合成。"), 2100); }
    else { board.querySelector('.producer')?.classList.add('hint'); tell(T("点补给箱，取出当前需要的材料。")); }
  }
  function cancelDrag() {
    if (pointer) {
      try { board.releasePointerCapture(pointer.id); } catch (_) { /* Capture may already have ended. */ }
    }
    pointer = null; $('drag-ghost').hidden = true;
    board.querySelectorAll('.drag-source,.drop-target').forEach(node => node.classList.remove('drag-source', 'drop-target'));
  }
  board.addEventListener('pointerdown', event => {
    if (dialog || !C.isBoardPhase(state) || event.button !== 0) return;
    const target = event.target.closest('[data-cell]');
    if (!target || target.disabled) return;
    const index = Number(target.dataset.cell), value = state.board[index];
    if (!value || value === 'producer' || value === 'locked') return;
    pointer = { id: event.pointerId, index, x: event.clientX, y: event.clientY, dragging: false };
  });
  board.addEventListener('pointermove', event => {
    if (!pointer || event.pointerId !== pointer.id) return;
    if (!pointer.dragging && Math.hypot(event.clientX - pointer.x, event.clientY - pointer.y) > 7) {
      pointer.dragging = true;
      board.setPointerCapture(event.pointerId);
      const ghost = $('drag-ghost'); ghost.innerHTML = itemImage(state.board[pointer.index]); ghost.hidden = false;
      board.querySelector(`[data-cell="${pointer.index}"]`)?.classList.add('drag-source');
    }
    if (!pointer.dragging) return;
    event.preventDefault();
    $('drag-ghost').style.transform = `translate(${event.clientX - 36}px,${event.clientY - 42}px)`;
    board.querySelectorAll('.drop-target').forEach(node => node.classList.remove('drop-target'));
    const target = document.elementFromPoint(event.clientX, event.clientY)?.closest('[data-cell]');
    if (target && !target.disabled && Number(target.dataset.cell) !== pointer.index && state.board[Number(target.dataset.cell)] !== 'producer') target.classList.add('drop-target');
  });
  board.addEventListener('pointerup', event => {
    if (!pointer || event.pointerId !== pointer.id) return;
    const held = pointer;
    const target = document.elementFromPoint(event.clientX, event.clientY)?.closest('[data-cell]');
    cancelDrag();
    if (held.dragging) {
      suppressClickUntil = performance.now() + 350;
      if (target && !target.disabled && state.board[Number(target.dataset.cell)] !== 'producer') perform('drag', { from: held.index, to: Number(target.dataset.cell) });
    }
  });
  board.addEventListener('pointercancel', cancelDrag);
  document.addEventListener('pointerup', event => { if (pointer && !board.contains(event.target)) cancelDrag(); });
  board.addEventListener('lostpointercapture', event => {
    // Touch begins with implicit capture on the cell. Transferring it to the
    // board emits a bubbled loss from that cell, which must not cancel the drag.
    if (event.target === board && pointer?.dragging && event.pointerId === pointer.id) cancelDrag();
  });
  board.addEventListener('focusin', event => {
    const cell = event.target.closest('[data-cell]');
    if (!cell) return;
    focusedCell = Number(cell.dataset.cell);
    board.querySelectorAll('[data-cell]').forEach(node => { node.tabIndex = node === cell ? 0 : -1; });
  });
  document.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button || button.disabled) return;
    if (button.dataset.cell !== undefined) {
      if (performance.now() < suppressClickUntil) return;
      perform('cell', button.dataset.cell);
    } else if (button.dataset.action) perform(button.dataset.action, button.dataset.item || button.dataset.family);
  });
  $('sound-button').addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    try { localStorage.setItem(PREF_KEY, soundEnabled ? 'on' : 'off'); } catch (_) { /* Optional preference. */ }
    renderSound(); if (soundEnabled) { unlockAudio(); sound('supply'); }
  });
  $('help-button').addEventListener('click', () => showDialog('help'));
  $('catalog-button').addEventListener('click', () => showDialog('catalog'));
  $('supply-button').addEventListener('click', () => { if (C.isBoardPhase(state)) showDialog('supply'); });
  $('hint-button').addEventListener('click', hint);
  $('undo-button').addEventListener('click', () => perform('undo'));
  $('overlay').addEventListener('click', event => { if (event.target === $('overlay') && !['intro', 'load-error'].includes(dialog)) hideDialog(); });
  document.addEventListener('keydown', event => {
    if (event.key.toLowerCase() === 'f' && !event.ctrlKey && !event.metaKey && !event.altKey && !event.repeat) {
      event.preventDefault();
      if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
      else document.documentElement.requestFullscreen?.().catch(() => tell(T("这个窗口暂时不能进入全屏。")));
      return;
    }
    if (event.key === 'Escape') {
      cancelDrag();
      if (dialog && !['intro', 'load-error'].includes(dialog)) hideDialog();
      else if (!dialog) dispatch('clear');
      return;
    }
    if (dialog) {
      if (event.key === 'Tab') {
        const buttons = [...$('overlay').querySelectorAll('button:not(:disabled)')];
        const first = buttons[0], last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
      return;
    }
    const current = document.activeElement?.dataset?.cell;
    if (current === undefined || !C.isBoardPhase(state)) return;
    const offsets = { ArrowUp: -5, ArrowDown: 5, ArrowLeft: -1, ArrowRight: 1 };
    if (!Object.prototype.hasOwnProperty.call(offsets, event.key)) return;
    event.preventDefault();
    const index = Number(current), delta = offsets[event.key];
    let target = index + delta;
    if ((delta === 1 || delta === -1) && Math.floor(target / 5) !== Math.floor(index / 5)) return;
    while (target >= 0 && target < 25) {
      const button = board.querySelector(`[data-cell="${target}"]`);
      if (button && !button.disabled) { button.focus({ preventScroll: true }); break; }
      target += delta;
    }
  });

  function update(dt) {
    presentationTime += dt;
    if (toastUntil && presentationTime >= toastUntil) { $('toast').classList.remove('visible'); toastUntil = 0; }
    if (hintPair && presentationTime >= hintUntil) { hintPair = null; board.querySelectorAll('.hint').forEach(node => node.classList.remove('hint')); }
    if (dialog || !ready) return;
    const oldPhase = state.phase, oldTime = state.phaseTime;
    const result = C.step(state, dt);
    state = result.state;
    playActionEvents(oldPhase, oldTime, state.phase === oldPhase ? state.phaseTime : C.DURATIONS[oldPhase] || 0);
    if (state.phase !== oldPhase) { renderUI(); save(); handleEvent(result.event); }
    else if (isBusy()) updateProgress();
    if (isBusy() && presentationTime - savedAt > 700) { save(); savedAt = presentationTime; }
  }
  function frame(now) {
    const dt = Math.min(100, Math.max(0, now - lastFrame)); lastFrame = now;
    if (now >= manualUntil && !document.hidden) update(dt);
    drawScene();
    requestAnimationFrame(frame);
  }
  window.advanceTime = milliseconds => {
    const duration = Math.max(0, Math.min(120000, Number(milliseconds) || 0));
    const steps = Math.max(1, Math.ceil(duration / (1000 / 60)));
    for (let i = 0; i < steps; i++) update(duration / steps);
    manualUntil = performance.now() + 70; lastFrame = performance.now(); drawScene();
    return window.render_game_to_text();
  };
  window.render_game_to_text = () => JSON.stringify({
    title: T("潮灯小镇 · 重燃灯塔"), version: C.VERSION, buildVersion: '0.6.2-candidate', phase: state.phase, dialog, ready,
    coordinates: 'Board row/column indices start at 0; viewport x grows right, y grows down. Scene art is 900×1600.',
    coins: state.coins, tokens: state.tokens, tokensSpent: state.tokensSpent, merges: state.merges, selected: state.selected,
    completed: state.completed, order: C.stageFor(state) ? { stage: C.stageFor(state), requirements: C.requirements(state), ready: C.orderReady(state) } : null,
    supply: C.supplyOptions(state), catalogFamilies: Object.keys(C.FAMILIES),
    board: state.board.map((item, index) => {
      const rect = board.querySelector(`[data-cell="${index}"]`)?.getBoundingClientRect();
      return { index, row: Math.floor(index / 5), col: index % 5, item, x: rect ? Math.round(rect.left + rect.width / 2) : null, y: rect ? Math.round(rect.top + rect.height / 2) : null };
    }),
    phaseTime: Math.round(state.phaseTime), duration: C.DURATIONS[state.phase] || 0,
    repairFrame: isRepairing() ? repairFrame(state.phaseTime).index : null,
    action: ACTION_PHASES[state.phase] ? { ...actionFrame(ACTION_PHASES[state.phase], state.phaseTime), inset: actionGeometry } : null,
    characterPose: beckonPose() ? { name: 'beckon', index: beckonPose().index, src: beckonPose().src, held: state.phase !== 'arriving', box: beckonPose().box, groundLocal: beckonPose().groundLocal } : null,
    sceneBeaconVisible: beaconVisible(),
    beaconLocation: 'tower-lantern-room', lampRoom: SCENE_LAYOUT.lampRoom,
    riggingMounted: state.completed.includes('dock'), riggingHook: SCENE_LAYOUT.dockRigging.hook,
    sound: soundEnabled, reducedMotion, assetErrors
  });
  window.Tidekeeper = { getState: () => JSON.parse(C.serialize(state)), getAnimationFrame: () => repairFrame(state.phaseTime), getActionFrame: (name, time) => actionFrame(name, time), getActionGeometry: () => actionGeometry ? JSON.parse(JSON.stringify(actionGeometry)) : null, getStaticPosePlacement: staticPosePlacement, sceneLayout: SCENE_LAYOUT };
  window.addEventListener('pagehide', save);
  window.addEventListener('beforeunload', save);
  document.addEventListener('visibilitychange', () => { if (document.hidden) { save(); cancelDrag(); } lastFrame = performance.now(); });
  window.addEventListener('blur', cancelDrag);
  window.addEventListener('resize', drawScene);
  window.addEventListener('fullscreenchange', drawScene);
  if (window.ResizeObserver) new ResizeObserver(drawScene).observe($('workbench').previousElementSibling);

  renderSound(); renderUI();
  const files = ['character-base.png', 'character-wave.png', 'character-signal.png', 'character-repair.png', 'supply-boat.png', 'neri.png'].map(file => ART + file);
  const sceneFiles = ['scene-dock-broken.jpg', 'scene-tower-broken.jpg', 'scene-tower-repaired.jpg', 'scene-lens-installed.jpg', 'scene-night-lit.jpg'].map(file => NEW + file);
  const itemFiles = Object.keys(C.ITEMS).map(itemSource);
  const currencyFiles = Object.values(C.CURRENCIES).map(currency => currency.image);
  const extraFrames = ['repair', 'lens', 'ignition', 'beckon'].flatMap(name => animationData(name)?.frames.map(frameSource).filter(Boolean) || []);
  window.tidekeeperReady = Promise.all([window.TidekeeperMotion.ready, ...[...new Set([...files, ...sceneFiles, ...itemFiles, ...currencyFiles, ...extraFrames])].map(preload)]).then(() => {
    if (assetErrors.length) { showDialog('load-error'); return false; }
    ready = true; drawScene();
    if (state.phase === 'intro') showDialog('intro');
    else if (state.phase === 'complete') showDialog('win');
    else if (reducedMotion && isBusy()) dispatch('finish');
    return true;
  });
  requestAnimationFrame(frame);
})();
