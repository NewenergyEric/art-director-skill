import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createProductionState as start,productionAct as act,productionMarkup,sceneMarkup} from '../../examples/tidekeeper-production/references/scene-player.js';
const recipe=JSON.parse(fs.readFileSync(new URL('../../examples/tidekeeper-production/references/scene-recipes.json',import.meta.url),'utf8'));
let s=start();const original=structuredClone(s);
assert.equal(act(s,'light').phase,'ruined');assert.equal(act(s,'sail').phase,'ruined');assert.equal(act(s,'claim').coins,120);
s=act(s,'repair');assert.equal(s.phase,'repairing');assert.equal(s.coins,145);assert.deepEqual(original,start());
assert.equal(act(s,'repair').coins,145,'repair order pays once');
assert.equal(act(s,'sail').phase,'repairing');assert.match(sceneMarkup(s,recipe,'',650),/character-repair.png/);
s=act(s,'finish');assert.equal(s.phase,'day');assert.equal(act(s,'light').phase,'day','lamp is required');
s=act(act(s,'cell',5),'cell',12);s=act(s,'deliver');assert.equal(s.phase,'lighting');assert.equal(s.coins,175);assert.ok(!s.board.includes(4));
assert.match(sceneMarkup(s,recipe,'',1400),/day-underlay/);
s=act(s,'finish');assert.equal(s.phase,'dusk');s=act(s,'sail');assert.equal(s.phase,'arriving');
const beginning=sceneMarkup(s,recipe,'',0),end=sceneMarkup(s,recipe,'',3800);assert.notEqual(beginning,end,'boat travels');const boat=recipe.scenes.find(x=>x.id==='arrival').layers.find(x=>x.id==='boat');assert.ok(end.includes(`left:${boat.box[0]}px;top:${boat.box[1]}px`),'arrival position comes from recipe');
s=act(s,'finish');assert.equal(s.phase,'complete');s=act(s,'claim');assert.equal(s.coins,225);assert.equal(act(s,'claim').coins,225,'arrival reward pays once');
assert.match(productionMarkup({...s,map:true},recipe),/欢迎回家/);assert.deepEqual(act(s,'reset'),start());
let alternate=act(act(start(),'cell',5),'cell',12);alternate=act(alternate,'deliver');assert.equal(alternate.phase,'ruined','early lamp cannot skip repair');alternate=act(act(alternate,'repair'),'finish');assert.equal(act(alternate,'light').phase,'lighting');
for(const action of ['repair','light','sail']){let running=action==='repair'?act(start(),action):action==='light'?act(alternate,action):act(act(act(alternate,'light'),'finish'),'sail');assert.deepEqual(act(running,'reset'),start(),'reset cancels '+action);}
for(const scene of recipe.scenes){assert.ok(scene.layers.length);for(const layer of scene.layers){const a=recipe.assets[layer.asset];assert.ok(a);assert.ok(fs.existsSync(new URL('../../examples/tidekeeper-production/'+a.path,import.meta.url)));}}
console.log('PASS: gated repair/light/arrival, inventory, both order sequences, one-time reward, reset, frame progression and recipe files.');
