/* Tidekeeper 0.5: deterministic merge, staged delivery, supply, and save rules. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.TidekeeperCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const T = globalThis.GameLocale?.text || ((source, ...values) => source.replace(/\{(\d+)\}/g, (_, i) => values[i]));
  const VERSION = 2, COLS = 5, SIZE = 25;
  const STAGE_KEYS = ['dock', 'tower', 'lens', 'fuel'];
  const PHASES = ['intro', 'dock', 'repairing_dock', 'tower', 'repairing_tower', 'lens', 'installing_lens', 'fuel', 'lighting', 'beacon', 'arriving', 'reward', 'complete'];
  const DURATIONS = { repairing_dock: 2800, repairing_tower: 2800, installing_lens: 2200, lighting: 3200, arriving: 5200 };
  const ITEMS = {
    w1: { name: T("修缮木板"), image: 'wood-l1.png', next: 'w2', level: 1, family: 'wood', value: 1 },
    w2: { name: T("整捆木料"), image: 'wood-l2.png', next: null, level: 2, family: 'wood', value: 2 },
    l1: { name: T("口袋油灯"), image: 'lamp-l1.png', next: 'l2', level: 1, family: 'lamp', value: 1 },
    l2: { name: T("手提风灯"), image: 'lamp-l2.png', next: 'l3', level: 2, family: 'lamp', value: 2 },
    l3: { name: T("圆镜探照灯"), image: 'lamp-l3.png', next: 'l4', level: 3, family: 'lamp', value: 4 },
    l4: { name: T("归航灯组"), image: 'lamp-l4.png', next: null, level: 4, family: 'lamp', value: 8 },
    n1: { name: T("散装铁钉"), image: 'art/expansion/nails-1.png', next: 'n2', level: 1, family: 'nails', value: 1 },
    n2: { name: T("五金盒"), image: 'art/expansion/nails-2.png', next: null, level: 2, family: 'nails', value: 2 },
    r1: { name: T("旧麻绳"), image: 'art/expansion/rope-1.png', next: 'r2', level: 1, family: 'rope', value: 1 },
    r2: { name: T("滑轮索具"), image: 'art/expansion/rope-2.png', next: null, level: 2, family: 'rope', value: 2 },
    t1: { name: T("小修理锤"), image: 'art/expansion/tool-1.png', next: 't2', level: 1, family: 'tool', value: 1 },
    t2: { name: T("安装工具包"), image: 'art/expansion/tool-2.png', next: null, level: 2, family: 'tool', value: 2 },
    g1: { name: T("透镜玻璃"), image: 'art/expansion/glass-1.png', next: 'g2', level: 1, family: 'glass', value: 1 },
    g2: { name: T("聚光透镜"), image: 'art/expansion/glass-2.png', next: null, level: 2, family: 'glass', value: 2 },
    o1: { name: T("一瓶灯油"), image: 'art/expansion/oil-1.png', next: 'o2', level: 1, family: 'oil', value: 1 },
    o2: { name: T("一壶灯油"), image: 'art/expansion/oil-2.png', next: null, level: 2, family: 'oil', value: 2 },
    producer: { name: T("港湾补给箱"), image: 'producer.png', next: null },
    locked: { name: T("缠网的旧货箱"), image: 'locked.png', next: null }
  };
  const FAMILIES = {
    wood: { name: T("木材"), items: ['w1', 'w2'], use: T("更换栈桥木板，修补灯塔结构。"), stages: ['dock', 'tower'] },
    rope: { name: T("绳索"), items: ['r1', 'r2'], use: T("加固栈桥的缆绳与连接处。"), stages: ['dock'] },
    nails: { name: T("五金"), items: ['n1', 'n2'], use: T("把灯塔的新木料固定牢靠。"), stages: ['tower'] },
    tool: { name: T("工具"), items: ['t1', 't2'], use: T("为塔身修缮与透镜安装分别配发工具。"), stages: ['tower', 'lens'] },
    glass: { name: T("玻璃"), items: ['g1', 'g2'], use: T("为灯室装上完整的聚光透镜。"), stages: ['lens'] },
    oil: { name: T("灯油"), items: ['o1', 'o2'], use: T("注满灯室油箱，点亮归航灯火。"), stages: ['fuel'] },
    lamp: { name: T("灯具"), items: ['l1', 'l2', 'l3', 'l4'], use: T("合成四级灯组，安入灯塔灯室。"), stages: ['fuel'] }
  };
  const CURRENCIES = { coins: { name: T("贝壳金币"), image: 'art/expansion/coin-pile.png' }, tokens: { name: T("航运券"), image: 'art/expansion/shipping-token.png' } };
  const STAGES = {
    dock: { name: T("修好栈桥"), chapter: T("第一章"), person: T("奈莉"), requirements: [{ item: 'w2', need: 2 }, { item: 'r2', need: 1 }], reward: 25, tokens: 1, event: 'repairing_dock', next: 'tower', verb: T("修好栈桥") },
    tower: { name: T("修复灯塔结构"), chapter: T("第二章"), person: T("阿澜"), requirements: [{ item: 'w2', need: 1 }, { item: 'n2', need: 1 }, { item: 't2', need: 1 }], reward: 35, tokens: 1, event: 'repairing_tower', next: 'lens', verb: T("修复塔身") },
    lens: { name: T("安装聚光透镜"), chapter: T("第三章"), person: T("阿澜"), requirements: [{ item: 'g2', need: 2 }, { item: 't2', need: 1 }], reward: 40, tokens: 1, event: 'installing_lens', next: 'fuel', verb: T("安装透镜") },
    fuel: { name: T("点亮归航灯塔"), chapter: T("第四章"), person: T("阿澜"), requirements: [{ item: 'o2', need: 1 }, { item: 'l4', need: 1 }], reward: 50, tokens: 0, event: 'lighting', next: 'beacon', verb: T("注油点灯") }
  };
  const EVENT_STAGE = Object.fromEntries(STAGE_KEYS.map(key => [STAGES[key].event, key]));
  const isBoardPhase = state => Object.prototype.hasOwnProperty.call(STAGES, state.phase);
  const stageFor = state => state.phase === 'intro' ? 'dock' : isBoardPhase(state) ? state.phase : EVENT_STAGE[state.phase] || null;
  const count = (state, item) => state.board.filter(value => value === item).length;
  const familyValue = (state, family) => state.board.reduce((sum, value) => sum + (ITEMS[value]?.family === family ? ITEMS[value].value : 0), 0);
  const canMerge = (a, b) => !!a && a === b && !!ITEMS[a]?.next;
  const cloneDelivered = delivered => Object.fromEntries(STAGE_KEYS.map(key => [key, { ...delivered[key] }]));
  const copy = state => ({ ...state, board: [...state.board], completed: [...state.completed], delivered: cloneDelivered(state.delivered) });
  const snapshot = state => ({ board: [...state.board], merges: state.merges, generated: state.generated, tokens: state.tokens, tokensSpent: state.tokensSpent });
  const notice = (state, text) => ({ state, event: { type: 'notice', text } });
  function createState(phase = 'intro') {
    const board = Array(SIZE).fill(null);
    board[1] = 'w1'; board[3] = 'w1'; board[6] = 'r1'; board[8] = 'r1'; board[17] = 'producer';
    for (let i = 20; i < SIZE; i++) board[i] = 'locked';
    return { version: VERSION, phase, board, selected: null, coins: 0, tokens: 2, tokensSpent: 0,
      completed: [], delivered: Object.fromEntries(STAGE_KEYS.map(key => [key, Object.fromEntries(STAGES[key].requirements.map(req => [req.item, 0]))])),
      merges: 0, generated: 0, phaseTime: 0, elapsed: 0, undo: null };
  }
  function requirements(state) {
    const stage = stageFor(state);
    return stage ? STAGES[stage].requirements.map(req => ({ ...req, submitted: state.delivered[stage][req.item], available: count(state, req.item) })) : [];
  }
  const orderReady = state => isBoardPhase(state) && requirements(state).every(req => req.submitted === req.need);
  function supplyOptions(state) {
    if (!isBoardPhase(state)) return [];
    return requirements(state).map(req => {
      const family = ITEMS[req.item].family;
      const missing = Math.max(0, (req.need - req.submitted) * ITEMS[req.item].value - familyValue(state, family));
      return { family, item: FAMILIES[family].items[0], missing, pairAvailable: missing >= 2 && state.tokens > 0 };
    });
  }
  function supply(state, family, pair = false) {
    if (!isBoardPhase(state)) return { state, event: null };
    const candidates = supplyOptions(state).filter(option => option.missing > 0);
    const option = family ? candidates.find(candidate => candidate.family === family) : candidates[state.generated % Math.max(1, candidates.length)];
    if (!option) return notice(state, T("这一批材料已经齐了，合好后交付吧。"));
    if (pair && state.tokens < 1) return notice(state, T("没有航运券了，仍然可以免费取材料。"));
    if (pair && option.missing < 2) return notice(state, T("只差一件材料，免费取出就好。"));
    const amount = pair ? 2 : 1;
    const slots = state.board.map((item, index) => item === null ? index : -1).filter(index => index >= 0).slice(0, amount);
    if (slots.length !== amount) return notice(state, T("先合成一对，腾出空位。"));
    const next = copy(state); next.undo = snapshot(state);
    slots.forEach(slot => { next.board[slot] = option.item; });
    next.selected = null; next.generated += amount;
    if (pair) { next.tokens--; next.tokensSpent++; }
    return { state: next, event: { type: 'supply', to: slots[0], slots, item: option.item, pair } };
  }
  function cell(state, index, source) {
    if (!isBoardPhase(state) || !Number.isInteger(index) || index < 0 || index >= SIZE) return { state, event: null };
    const value = state.board[index];
    if (value === 'locked') return notice(state, T("修好栈桥后，这排货箱就能打开。"));
    if (value === 'producer') return supply(state);
    const selected = Number.isInteger(source) ? source : state.selected;
    if (selected === index) return { state: { ...state, selected: null }, event: null };
    const from = Number.isInteger(selected) && selected >= 0 && selected < SIZE ? state.board[selected] : null;
    if (from && from !== 'locked' && from !== 'producer') {
      if (value === null) {
        const next = copy(state); next.undo = snapshot(state);
        next.board[index] = from; next.board[selected] = null; next.selected = null;
        return { state: next, event: { type: 'move', from: selected, to: index, item: from } };
      }
      if (canMerge(from, value)) {
        const next = copy(state); next.undo = snapshot(state);
        next.board[index] = ITEMS[value].next; next.board[selected] = null; next.selected = index; next.merges++;
        return { state: next, event: { type: 'merge', from: selected, to: index, before: value, item: next.board[index] } };
      }
      return { state: { ...state, selected: value ? index : null }, event: { type: 'notice', text: from === value ? T("这件已经做好，可以交付了。") : T("选择两件相同的物品。") } };
    }
    return { state: { ...state, selected: value ? index : null }, event: null };
  }
  function seedNextStage(state) {
    const options = supplyOptions(state);
    for (const option of options) {
      for (let unit = 0; unit < Math.min(2, option.missing); unit++) {
        const slot = state.board.indexOf(null);
        if (slot < 0) break;
        state.board[slot] = option.item;
      }
    }
  }
  function finishPhase(state) {
    const stage = EVENT_STAGE[state.phase];
    const next = copy(state); next.phaseTime = 0; next.selected = null; next.undo = null;
    if (stage) {
      const config = STAGES[stage];
      if (!next.completed.includes(stage)) { next.completed.push(stage); next.coins += config.reward; next.tokens += config.tokens; }
      next.phase = config.next;
      if (stage === 'dock') next.board = next.board.map(item => item === 'locked' ? null : item);
      if (isBoardPhase(next)) seedNextStage(next);
      return { state: next, event: { type: 'stage-complete', stage, coins: config.reward, tokens: config.tokens } };
    }
    if (state.phase === 'arriving') { next.phase = 'reward'; return { state: next, event: { type: 'arrived' } }; }
    return { state, event: null };
  }
  function act(state, action, value) {
    if (action === 'restart') return { state: createState('dock'), event: { type: 'start' } };
    if (action === 'start' && state.phase === 'intro') return { state: { ...state, phase: 'dock' }, event: { type: 'start' } };
    if (action === 'cell') return cell(state, Number(value));
    if (action === 'drag') return cell(state, Number(value?.to), Number(value?.from));
    if (action === 'supply') return supply(state, value);
    if (action === 'supply-pair') return supply(state, value, true);
    if (action === 'clear') return { state: { ...state, selected: null }, event: null };
    if (action === 'undo' && isBoardPhase(state) && state.undo) return { state: { ...state, ...state.undo, board: [...state.undo.board], undo: null, selected: null }, event: { type: 'undo' } };
    if (action === 'submit' && isBoardPhase(state)) {
      const req = requirements(state).find(requirement => requirement.item === value);
      if (!req || req.submitted >= req.need || req.available < 1) return { state, event: null };
      const next = copy(state); next.board[next.board.indexOf(value)] = null; next.delivered[state.phase][value]++;
      next.selected = null; next.undo = null;
      return { state: next, event: { type: 'submitted', stage: state.phase, item: value, ready: orderReady(next) } };
    }
    if (action === 'build' && isBoardPhase(state)) {
      if (!orderReady(state)) return notice(state, T("先把这张订单的材料交齐。"));
      return { state: { ...state, phase: STAGES[state.phase].event, phaseTime: 0, selected: null, undo: null }, event: { type: 'build', stage: state.phase } };
    }
    if (action === 'beckon' && state.phase === 'beacon') return { state: { ...state, phase: 'arriving', phaseTime: 0 }, event: { type: 'beckon' } };
    if (action === 'claim' && state.phase === 'reward') return { state: { ...state, phase: 'complete', coins: state.coins + 75 }, event: { type: 'win' } };
    if (action === 'finish' && DURATIONS[state.phase]) return finishPhase(state);
    return { state, event: null };
  }
  function step(state, delta) {
    const dt = Number.isFinite(delta) ? Math.max(0, Math.min(60000, delta)) : 0;
    if (!dt || state.phase === 'intro' || state.phase === 'complete') return { state, event: null };
    const next = { ...state, elapsed: state.elapsed + dt };
    if (!DURATIONS[state.phase]) return { state: next, event: null };
    next.phaseTime += dt;
    return next.phaseTime >= DURATIONS[state.phase] ? finishPhase(next) : { state: next, event: null };
  }
  function validBoard(board) {
    return Array.isArray(board) && board.length === SIZE && board.every(value => value === null || Object.prototype.hasOwnProperty.call(ITEMS, value)) && board.filter(value => value === 'producer').length === 1;
  }
  function restore(raw) {
    try {
      const input = typeof raw === 'string' ? JSON.parse(raw) : raw;
      if (!input || input.version !== VERSION || !PHASES.includes(input.phase) || !validBoard(input.board)) return null;
      const stage = stageFor(input), currentIndex = stage ? STAGE_KEYS.indexOf(stage) : STAGE_KEYS.length;
      const expectedCompleted = STAGE_KEYS.slice(0, currentIndex);
      if (JSON.stringify(input.completed) !== JSON.stringify(expectedCompleted)) return null;
      const delivered = {};
      for (let index = 0; index < STAGE_KEYS.length; index++) {
        const key = STAGE_KEYS[index]; delivered[key] = {};
        for (const req of STAGES[key].requirements) {
          const value = input.delivered?.[key]?.[req.item];
          if (!Number.isInteger(value) || value < 0 || value > req.need) return null;
          if ((index < currentIndex || key === stage && EVENT_STAGE[input.phase]) && value !== req.need) return null;
          if (index > currentIndex && value !== 0) return null;
          delivered[key][req.item] = value;
        }
      }
      const active = isBoardPhase(input) || input.phase === 'intro';
      for (const family of Object.keys(FAMILIES)) {
        const req = active ? STAGES[stage].requirements.find(entry => ITEMS[entry.item].family === family) : null;
        const budget = req ? (req.need - delivered[stage][req.item]) * ITEMS[req.item].value : 0;
        if (familyValue(input, family) > budget) return null;
      }
      const locked = ['intro', 'dock', 'repairing_dock'].includes(input.phase);
      if (input.board.filter(value => value === 'locked').length !== (locked ? 5 : 0)) return null;
      if (locked && !input.board.slice(20).every(value => value === 'locked')) return null;
      const earnedTokens = 2 + expectedCompleted.reduce((sum, key) => sum + STAGES[key].tokens, 0);
      if (!Number.isInteger(input.tokensSpent) || input.tokensSpent < 0 || input.tokensSpent > earnedTokens) return null;
      return {
        version: VERSION, phase: input.phase, board: [...input.board], selected: null, completed: expectedCompleted, delivered,
        coins: expectedCompleted.reduce((sum, key) => sum + STAGES[key].reward, 0) + (input.phase === 'complete' ? 75 : 0),
        tokens: earnedTokens - input.tokensSpent, tokensSpent: input.tokensSpent,
        merges: Math.max(0, Math.min(9999, Math.floor(Number(input.merges) || 0))),
        generated: Math.max(0, Math.min(9999, Math.floor(Number(input.generated) || 0))),
        phaseTime: Math.max(0, Math.min(DURATIONS[input.phase] || 0, Number(input.phaseTime) || 0)),
        elapsed: Math.max(0, Math.min(86400000, Number(input.elapsed) || 0)), undo: null
      };
    } catch (_) { return null; }
  }
  const serialize = state => JSON.stringify({ ...state, selected: null, undo: null });
  function nextPair(state) {
    const stage = stageFor(state);
    if (!stage) return null;
    for (const req of STAGES[stage].requirements) {
      const family = FAMILIES[ITEMS[req.item].family];
      for (const item of [...family.items].reverse()) {
        if (!ITEMS[item].next) continue;
        const first = state.board.indexOf(item), second = state.board.indexOf(item, first + 1);
        if (first >= 0 && second >= 0) return [first, second];
      }
    }
    return null;
  }
  return { VERSION, COLS, SIZE, PHASES, DURATIONS, ITEMS, FAMILIES, CURRENCIES, STAGES, STAGE_KEYS, EVENT_STAGE, createState, isBoardPhase, stageFor, count, familyValue, requirements, orderReady, supplyOptions, canMerge, act, step, restore, serialize, nextPair };
});
