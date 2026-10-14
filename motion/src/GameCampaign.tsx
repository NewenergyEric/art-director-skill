import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame} from 'remotion';
import {FieldFonts, fieldFont, displayFont} from './RenderFonts';
import {TidekeeperUI} from './TidekeeperUI';
import {ProductionFrame} from './TidekeeperProduction';

type Lang = 'zh' | 'en';
const say = (l: Lang, zh: string, en: string) => l === 'zh' ? zh : en;
const ease = (x: number) => {x = Math.max(0, Math.min(1, x)); return x * x * (3 - 2 * x);};
const enter = (f: number, start = 0, span = 18) => ease((f - start) / span);
export const campaignChapters = [0, 105, 210, 315, 435, 630, 720];
const art = (name: string) => staticFile('tidekeeper-production/' + name);

function Cutout({name, style = {}}: {name: string; style?: React.CSSProperties}) {
  return <Img src={art(name)} style={{position: 'absolute', objectFit: 'contain', filter: 'drop-shadow(0 10px 5px #082d4233)', ...style}}/>;
}

// One editable text layer. A restrained shadow preserves the drawn forms of
// each language instead of applying one outline/italic treatment to all text.
export function GameTitle({lines, language = 'en', width = 1000, size = 90, style = {}, ink = false}: {lines: string[]; language?: Lang; width?: number; size?: number; style?: React.CSSProperties; ink?: boolean}) {
  return <div style={{position: 'absolute', width, fontFamily: displayFont(language), fontWeight: language === 'en' ? 400 : 500, fontSize: size, lineHeight: 1.06, letterSpacing: language === 'en' ? -size * .035 : -size * .025, color: ink ? '#173f48' : '#fff3ce', textShadow: ink ? 'none' : '0 3px 0 #204d52, 0 6px 12px #092d4866', ...style}}>
    {lines.map(line => <div key={line} style={{whiteSpace: 'nowrap'}}>{line}</div>)}
  </div>;
}

function Backdrop({night = false, shade = false}: {night?: boolean; shade?: boolean}) {
  return <><Img src={night ? art('workshop-night.jpg') : staticFile('tidekeeper/workshop-after.jpg')} style={{position: 'absolute', inset: 0, width: 1280, height: 720, objectFit: 'cover', objectPosition: night ? '50% 34%' : '50% 50%'}}/>
    <AbsoluteFill style={{background: shade ? 'linear-gradient(90deg,#082f45b8,transparent 77%)' : 'linear-gradient(180deg,#08384833,transparent 43%,#07566933)'}}/>
  </>;
}

function Label({children, style = {}}: {children: React.ReactNode; style?: React.CSSProperties}) {
  return <div style={{position: 'absolute', color: '#fff6dc', fontSize: 24, fontWeight: 600, textShadow: '0 2px 4px #103d4c', ...style}}>{children}</div>;
}

function Direction({f, l}: {f: number; l: Lang}) {
  return <><Backdrop shade/>
    <Label style={{left: 62, top: 39, fontSize: 17, letterSpacing: 3}}>ART DIRECTOR</Label>
    <GameTitle lines={l === 'zh' ? ['确立画风'] : ['Define', 'the style.']} language={l} width={665} size={l === 'zh' ? 108 : 112} style={{left: 57, top: l === 'zh' ? 132 : 98}}/>
    <Cutout name="character-base.png" style={{right: 2, bottom: -91, width: 398, height: 720}}/>
    <Cutout name="lamp-l1.png" style={{left: 60, bottom: 57, width: 198, height: 198}}/>
    <Cutout name="lamp-l2.png" style={{left: 244, bottom: 43, width: 234, height: 234}}/>
    <Cutout name="lamp-l4.png" style={{left: 463, bottom: 18, width: 290, height: 290}}/>
    <div style={{position: 'absolute', left: 67, bottom: 298, display: 'flex', gap: 13}}>{['#ffd464','#256b80','#ef9273','#fff0c7'].map(color => <div key={color} style={{width: 24, height: 24, background: color, borderRadius: '48% 52% 43% 57%', border: '2px solid #fff5d9aa'}}/>)}</div>
  </>;
}

function Pack({f, l}: {f: number; l: Lang}) {
  return <AbsoluteFill style={{background: '#e8debc'}}>
    <Img src={art('workshop-after-portrait.jpg')} style={{position: 'absolute', right: -38, top: -117, width: 613, height: 1090, objectFit: 'cover', transform: 'rotate(6deg)', boxShadow: '-20px 10px 40px #28495533'}}/>
    <div style={{position: 'absolute', left: -48, top: -45, width: 816, height: 838, background: '#f8edd1', transform: 'rotate(-3deg)', boxShadow: '12px 0 28px #28495530'}}/>
    <GameTitle lines={l === 'zh' ? ['共享规范'] : ['Share the', 'art direction.']} language={l} ink width={760} size={l === 'zh' ? 106 : 89} style={{left: 60, top: 63}}/>
    <div style={{position: 'absolute', left: 62, top: 304, width: 650, borderTop: '2px solid #48757866', paddingTop: 16, color: '#487578', fontSize: 16, letterSpacing: 2}}>TIDEKEEPER / PROJECT PACK</div>
    <Cutout name="character-base.png" style={{left: 40, top: 369, width: 178, height: 311}}/>
    <Cutout name="lamp-l2.png" style={{left: 224, top: 428, width: 171, height: 171}}/>
    <Cutout name="lamp-l4.png" style={{left: 387, top: 396, width: 220, height: 220}}/>
    <div style={{position: 'absolute', left: 221, top: 367, display: 'flex', gap: 10}}>{['#ffd464','#256b80','#ef9273','#fff0c7'].map(color => <div key={color} style={{width: 51, height: 17, background: color, borderRadius: '40% 5% 35% 6%', transform: 'rotate(-3deg)'}}/>)}</div>
    <div style={{position: 'absolute', left: 235, top: 633, color: '#315d60', fontSize: 24}}>{say(l, '样板 · 边界 · 交付要求', 'Samples · Rules · Deliverables')}</div>
    <Cutout name="producer.png" style={{right: 28, bottom: 28, width: 302, height: 302, transform: `translateY(${18 * (1 - enter(f))}px)`}}/>
  </AbsoluteFill>;
}

function Members({f, l}: {f: number; l: Lang}) {
  return <><Backdrop shade/>
    <GameTitle lines={l === 'zh' ? ['分工制作'] : ['Create as', 'a team.']} language={l} width={550} size={l === 'zh' ? 105 : 98} style={{left: 57, top: 64}}/>
    <Cutout name="character-base.png" style={{left: 26, top: 334, width: 174, height: 330}}/>
    <Cutout name="character-wave.png" style={{left: 184, top: 291, width: 207, height: 374}}/>
    {[1,2,3,4].map((n,i) => <Cutout key={n} name={`lamp-l${n}.png`} style={{left: 388 + i % 2 * 151, top: 338 + Math.floor(i / 2) * 131, width: 167, height: 167, opacity: enter(f, 2 + i * 5, 12)}}/>)}
    <div style={{position: 'absolute', left: 930, top: 36, width: 390, height: 844, transform: 'rotate(2deg) scale(.72)', transformOrigin: 'top left', boxShadow: '0 12px 30px #12394d66', border: '6px solid #f8ecc8', borderRadius: 31, overflow: 'hidden'}}><TidekeeperUI stage="ready" language={l}/></div>
    <Label style={{left: 62, top: 664, fontSize: 21}}>{say(l, '角色', 'Characters')}</Label>
    <Label style={{left: 458, top: 661, fontSize: 21}}>{say(l, '物品', 'Objects')}</Label>
    <Label style={{left: 722, top: 231, fontSize: 24}}>{say(l, '场景', 'Scenes')}</Label>
    <Label style={{left: 1061, top: 670, fontSize: 24}}>UI</Label>
  </>;
}

function InContext({f, l}: {f: number; l: Lang}) {
  const stage = f < 47 ? 'missing' : f < 92 ? 'ready' : 'done';
  const contact = enter(f, 22, 16), merge = enter(f, 41, 9);
  const settle = f < 57 ? 1 + .16 * Math.sin(Math.PI * enter(f, 43, 14)) : 1;
  return <><Backdrop shade/>
    <div style={{position: 'absolute', left: 852, top: -45, width: 390, height: 844, transform: 'rotate(3deg) scale(.94)', transformOrigin: 'top center', boxShadow: '0 15px 30px #12394d66', border: '7px solid #fff1c9', borderRadius: 35, overflow: 'hidden'}}><TidekeeperUI stage={stage} language={l}/></div>
    <GameTitle lines={l === 'zh' ? ['组合检查'] : ['Review', 'in context.']} language={l} width={790} size={l === 'zh' ? 108 : 100} style={{left: 58, top: 65}}/>
    <Cutout name="lamp-l3.png" style={{left: 62 + 114 * contact, top: 380 - 13 * Math.sin(contact * Math.PI), width: 217, height: 217, opacity: 1 - merge, transform: `rotate(${-12 + 15 * contact}deg) scale(${1 - .08 * contact},${1 + .06 * contact})`}}/>
    <Cutout name="lamp-l3.png" style={{left: 388 - 107 * contact, top: 380 - 8 * Math.sin(contact * Math.PI), width: 217, height: 217, opacity: 1 - merge, transform: `rotate(${12 - 15 * contact}deg)`}}/>
    <Cutout name="lamp-l4.png" style={{left: 170, top: 327, width: 340, height: 340, opacity: merge, transform: `scale(${settle})`}}/>
    {f >= 41 && f < 68 && Array.from({length: 6},(_,n) => <div key={n} style={{position: 'absolute', left: 332 + Math.cos(n * Math.PI / 3) * (58 + (f - 41) * 4), top: 492 + Math.sin(n * Math.PI / 3) * (58 + (f - 41) * 4), width: 10, height: 10, borderRadius: '50%', background: '#ffefaf', opacity: 1 - enter(f,45,23)}}/>)}
  </>;
}

// Six distinct drawings with action-specific exposures. The image is cropped
// at cell boundaries in the renderer; its original pixels stay unchanged.
export function RepairAction({frame, size = 480, style = {}}: {frame: number; size?: number; style?: React.CSSProperties}) {
  const cycle = ((frame % 39) + 39) % 39;
  const pose = cycle < 8 ? 0 : cycle < 15 ? 1 : cycle < 18 ? 2 : cycle < 21 ? 3 : cycle < 27 ? 4 : 5;
  const x = pose % 3, y = Math.floor(pose / 3);
  // Measured nail-shaft anchors register the plank and planted feet across
  // drawings. Top-row viewports include 18 px of empty gutter below the cell.
  const anchors = [[334.3,451.5],[341.6,451.5],[321,449.7],[335.2,436.4],[341.5,436.4],[314,436.6]];
  const dx = (anchors[0][0] - anchors[pose][0]) / 512 * size;
  const dy = (anchors[0][1] - anchors[pose][1]) / 512 * size;
  return <div style={{position: 'absolute', width: size, height: size * 1.063, ...style}}>
    <div style={{position: 'absolute', left: dx, top: dy, width: size, height: size * (y ? 1 : 530 / 512), overflow: 'hidden'}}>
      <Img src={staticFile('tidekeeper-campaign/repair-six-poses.png')} style={{position: 'absolute', width: size * 3, height: size * 2, maxWidth: 'none', left: -x * size, top: -y * size}}/>
    </div>
  </div>;
}

function LivingWorld({f, l}: {f: number; l: Lang}) {
  const phase = f < 78 ? 'repairing' : f < 94 ? 'day' : f < 128 ? 'lighting' : f < 184 ? 'arriving' : 'complete';
  const time = f < 78 ? 0 : f < 94 ? 2600 : f < 128 ? Math.min(1,(f - 94) / 18) * 2800 : f < 184 ? (f - 128) / 56 * 3800 : 3800;
  const pullback = enter(f,78,18), scale = 1.42 - .55 * pullback;
  const cycle = f % 39, impact = cycle >= 18 && cycle < 24;
  return <><Backdrop night={f >= 94} shade/>
    <div className="campaign-scene" style={{position: 'absolute', width: 900, height: 1600, left: 350 * pullback, top: -560 + 245 * pullback, transform: `scale(${scale})`, transformOrigin: 'top left', maskImage: pullback ? 'linear-gradient(90deg,transparent,#000 10%,#000 95%,transparent)' : undefined}}>
      {f < 78 && <style>{'.campaign-scene [data-layer="alan"],.campaign-scene .tp-fx{visibility:hidden}'}</style>}
      <ProductionFrame phase={phase} time={time}/>
      {f < 78 && <RepairAction frame={f} size={310} style={{left: 350, top: 540}}/>}
      {f < 78 && impact && [0,1,2].map(n => <div key={n} style={{position:'absolute',left:550+(n-1)*(cycle-17)*2,top:806-(cycle-18)*2-n*3,width:5,height:4,borderRadius:'50%',background:'#dec99a',opacity:1-(cycle-18)/6}}/>)}
    </div>
    <GameTitle lines={l === 'zh' ? ['场景与动作，', '风格一致。'] : ['One coherent', 'world.']} language={l} width={590} size={l === 'zh' ? 72 : 70} style={{left: 48, top: 45}}/>
  </>;
}

function Closing({l}: {l: Lang}) {
  return <><Backdrop night shade/>
    <GameTitle lines={l === 'zh' ? ['一个团队/项目，', '一份视觉记忆。'] : ['One team,', 'one visual memory.']} language={l} size={l === 'zh' ? 96 : 92} width={1100} style={{left: 58, top: 139}}/>
    <Cutout name="lamp-l4.png" style={{right: -10, bottom: -72, width: 383, height: 383}}/>
    <Label style={{left: 64, top: 437, fontSize: 28}}>{say(l, '为团队与 Agent 共享美术规范。', 'Shared art direction for your team and agents.')}</Label>
    <Label style={{left: 65, bottom: 68, fontSize: 20, letterSpacing: 1.4}}>ART DIRECTOR SKILL</Label>
  </>;
}

function Chapter({index, frame, children}: {index: number; frame: number; children: React.ReactNode}) {
  const opacity = (index ? enter(frame, campaignChapters[index] - 2, 4) : 1) * (index === 5 ? 1 : 1 - enter(frame, campaignChapters[index + 1] - 2, 4));
  return opacity > 0 ? <AbsoluteFill style={{opacity, overflow: 'hidden'}}>{children}</AbsoluteFill> : null;
}

export function GameCampaign({language = 'en'}: {language?: Lang; preview?: boolean}) {
  const f = useCurrentFrame();
  return <AbsoluteFill style={{fontFamily: fieldFont, background: '#1c8c9b'}}><FieldFonts/>
    <Chapter index={0} frame={f}><Direction f={f} l={language}/></Chapter>
    <Chapter index={1} frame={f}><Pack f={f - 105} l={language}/></Chapter>
    <Chapter index={2} frame={f}><Members f={f - 210} l={language}/></Chapter>
    <Chapter index={3} frame={f}><InContext f={f - 315} l={language}/></Chapter>
    <Chapter index={4} frame={f}><LivingWorld f={f - 435} l={language}/></Chapter>
    <Chapter index={5} frame={f}><Closing l={language}/></Chapter>
  </AbsoluteFill>;
}

export function CampaignCover() {return <AbsoluteFill style={{fontFamily: fieldFont, overflow: 'hidden'}}><FieldFonts/><Closing l="en"/></AbsoluteFill>;}

export function CampaignGallery() {
  return <AbsoluteFill style={{fontFamily: fieldFont, background: '#126d82', overflow: 'hidden'}}><FieldFonts/>
    {['repairing','lighting','complete'].map((phase, i) => <div key={phase} style={{position: 'absolute', left: i * 426 - 10, top: -15, width: 459, height: 765, overflow: 'hidden', borderRight: '6px solid #f6e9c6', transform: `rotate(${i === 1 ? 2 : -2}deg)`}}>
      <div style={{position: 'absolute', width: 900, height: 1600, left: -20, top: -72, transform: 'scale(.54)', transformOrigin: 'top left'}}><ProductionFrame phase={phase} time={phase === 'lighting' ? 2800 : 1500}/></div>
      <GameTitle lines={[["Repair"],["Relight"],["Return"]][i]} size={66} width={440} style={{left: 27, top: 49}}/>
    </div>)}
  </AbsoluteFill>;
}
