import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame} from 'remotion';
import {FieldFonts, fieldFont} from './RenderFonts';
import {TidekeeperUI} from './TidekeeperUI';
import {ProductionFrame} from './TidekeeperProduction';

type Lang = 'zh' | 'en';
const say = (l: Lang, zh: string, en: string) => l === 'zh' ? zh : en;
const ease = (x: number) => {x = Math.max(0, Math.min(1, x)); return x * x * (3 - 2 * x);};
const enter = (f: number, start = 0, span = 18) => ease((f - start) / span);
const stages = [0, 105, 195, 285, 435, 660, 720];
const art = (name: string) => staticFile('tidekeeper-production/' + name);

function Cutout({name, style = {}}: {name: string; style?: React.CSSProperties}) {
  return <Img src={art(name)} style={{position: 'absolute', objectFit: 'contain', filter: 'drop-shadow(0 12px 6px #082d4255)', ...style}}/>;
}

// Display lettering stays editable: outline, extruded shadow and painted fill
// form one reusable treatment. Body copy never inherits this treatment.
export function GameTitle({lines, width = 1000, size = 96, style = {}, white = false}: {lines: string[]; width?: number; size?: number; style?: React.CSSProperties; white?: boolean}) {
  return <div style={{position: 'absolute', width, textAlign: 'center', fontFamily: fieldFont, fontWeight: 900, fontSize: size, lineHeight: 1.13, letterSpacing: -size * .045, transform: 'rotate(-3deg) skewX(-5deg)', ...style}}>
    {lines.map((line, i) => <div key={line} style={{position: 'relative', whiteSpace: 'nowrap', transform: `rotate(${i % 2 ? 1.2 : -1}deg)`}}>
      <span aria-hidden style={{position: 'absolute', inset: 0, WebkitTextStroke: `${Math.max(7, size * .12)}px #124957`, color: '#124957', textShadow: '0 8px 0 #083444, 0 13px 12px #082d4260'}}>{line}</span>
      <span aria-hidden style={{position: 'absolute', inset: 0, WebkitTextStroke: `${Math.max(3, size * .052)}px #fff8d9`, color: '#fff8d9'}}>{line}</span>
      <span style={{position: 'relative', color: white ? '#fffbea' : '#ffd35f', textShadow: white ? '0 2px 0 #bdded8' : '0 2px 0 #e89a32'}}>{line}</span>
    </div>)}
  </div>;
}

function Plaque({children, style = {}, width = 600}: {children: React.ReactNode; style?: React.CSSProperties; width?: number}) {
  return <div style={{position: 'absolute', width, height: width * .4, ...style}}>
    <Img src={staticFile('tidekeeper-campaign/title-plaque.png')} style={{width: '100%', height: '100%'}}/>
    <div style={{position: 'absolute', left: '12%', right: '12%', top: '47%', textAlign: 'center', fontSize: width * .046, fontWeight: 900, color: '#fff8db', textShadow: '0 3px 0 #064b61', whiteSpace: 'nowrap'}}>{children}</div>
  </div>;
}

function Backdrop({night = false, frame = 0}: {night?: boolean; frame?: number}) {
  return <><Img src={night ? art('workshop-night.jpg') : staticFile('tidekeeper/workshop-after.jpg')} style={{position: 'absolute', inset: -15, width: 1310, height: 750, objectFit: 'cover', objectPosition: night ? '50% 34%' : '50% 50%'}}/><AbsoluteFill style={{background: 'linear-gradient(180deg,#08384844,transparent 38%,#07566944)'}}/></>;
}

function Caption({children, style = {}}: {children: React.ReactNode; style?: React.CSSProperties}) {
  return <div style={{position: 'absolute', color: '#fff9df', fontSize: 25, fontWeight: 850, textShadow: '0 2px 2px #103d4c, 1px 0 2px #103d4c, -1px 0 2px #103d4c', ...style}}>{children}</div>;
}

function Opening({f, l, closing = false}: {f: number; l: Lang; closing?: boolean}) {
  return <><Backdrop frame={f}/><div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 38% 35%,#ffed9e22,transparent 65%)'}}/>
    <GameTitle lines={[say(l, '一个团队/项目，', 'One team,'), say(l, '一份视觉记忆。', 'one visual memory.')]} width={l === 'zh' ? 950 : 1020} size={l === 'zh' ? 106 : 90} style={{left: 25, top: 88}}/>
    <Cutout name="character-wave.png" style={{right: -20, bottom: -66, width: 396, height: 638, transform: `translateY(${26 * (1 - enter(f))}px) rotate(2deg)`}}/>
    <Cutout name="producer.png" style={{left: -37, bottom: -40, width: 256, height: 256, transform: 'rotate(-12deg)'}}/>
    <Cutout name="lamp-l3.png" style={{left: 179, bottom: 82, width: 190, height: 190, transform: 'rotate(-9deg)'}}/>
    <Cutout name="lamp-l4.png" style={{left: 353, bottom: 56, width: 249, height: 249, transform: 'rotate(8deg)'}}/>
    <Plaque width={l === 'zh' ? 630 : 710} style={{left: 225, bottom: -22}}>{say(l, closing ? '装好 Skill · 在 Agent 里开始' : '把主美的判断，带到每次交付', closing ? 'INSTALL · START IN YOUR AGENT' : 'YOUR DIRECTION. EVERY DELIVERY.')}</Plaque>
  </>;
}

function Direction({f, l}: {f: number; l: Lang}) {
  return <><Backdrop frame={f}/><AbsoluteFill style={{background: 'linear-gradient(90deg,#0a5a7244,transparent 70%)'}}/>
    <GameTitle lines={[say(l, '把画风', 'Make your style'), say(l, '定下来！', 'repeatable!')]} size={l === 'zh' ? 111 : 83} width={650} style={{right: 28, top: 46}}/>
    <Cutout name="character-base.png" style={{left: 51, top: 23, width: 374, height: 624, transform: `translateX(${-30 * (1 - enter(f))}px)`}}/>
    <div style={{position: 'absolute', left: 463, top: 332, width: 628, height: 272, borderRadius: '52% 45% 34% 38%', background: 'radial-gradient(ellipse,#fff8d999,#ffcd6255 53%,transparent 70%)'}}/>
    <Cutout name="lamp-l1.png" style={{left: 466, top: 338, width: 210, height: 210, transform: 'rotate(-8deg)'}}/>
    <Cutout name="lamp-l2.png" style={{left: 655, top: 315, width: 236, height: 236}}/>
    <Cutout name="lamp-l4.png" style={{left: 875, top: 291, width: 275, height: 275, transform: 'rotate(8deg)'}}/>
    <Caption style={{left: 104, top: 586}}>{say(l, '同一张脸', 'ONE IDENTITY')}</Caption>
    <Caption style={{left: 621, top: 553}}>{say(l, '同一束光 · 同一套材质', 'ONE LIGHT · ONE MATERIAL LANGUAGE')}</Caption>
    <Plaque width={665} style={{left: 366, bottom: -30}}>{say(l, '主美的样板，成为团队的依据', 'DIRECTOR SAMPLES → TEAM BASELINE')}</Plaque>
  </>;
}

function Members({f, l}: {f: number; l: Lang}) {
  return <><Backdrop frame={f}/>
    <GameTitle lines={[say(l, '换个人做，世界不换。', 'New hands. The same world.')]} size={l === 'zh' ? 84 : 73} width={1190} style={{left: 45, top: 63}}/>
    <Cutout name="character-base.png" style={{left: -47, top: 198, width: 293, height: 496, transform: 'rotate(-3deg)'}}/>
    <Cutout name="character-wave.png" style={{right: -22, top: 170, width: 311, height: 527, transform: 'rotate(3deg)'}}/>
    <div style={{position: 'absolute', left: 220, top: 307, width: 830, height: 208, border: '9px solid #f7d68b', borderRadius: 42, background: '#21898ddb', boxShadow: 'inset 0 5px 0 #093c5377,0 10px 0 #13505b', transform: 'rotate(-3deg)'}}/>
    {[1, 2, 3, 4].map((n, i) => <React.Fragment key={n}><Cutout name={`lamp-l${n}.png`} style={{left: 222 + i * 197, top: 271 - i * 7, width: 220, height: 220, transform: `translateY(${(1 - enter(f, i * 5, 15)) * 55}px)`}}/><Caption style={{left: 306 + i * 197, top: 479 - i * 7, fontSize: 27}}>L{n}</Caption></React.Fragment>)}
    <Plaque width={665} style={{left: 305, bottom: -20}}>{say(l, '接过项目包，继续做新素材', 'TAKE THE PACK. KEEP CREATING.')}</Plaque>
  </>;
}

function InGame({f, l}: {f: number; l: Lang}) {
  const stage = f < 43 ? 'missing' : f < 85 ? 'ready' : 'done';
  return <><Backdrop frame={f}/><AbsoluteFill style={{background: 'linear-gradient(90deg,#0c6f8477,transparent 70%)'}}/>
    <div style={{position: 'absolute', left: 780, top: -63, width: 390, height: 844, transform: 'rotate(6deg) scale(.96)', transformOrigin: 'top center', boxShadow: '0 18px 0 #166675,0 26px 45px #063a5377', border: '9px solid #fff1c9', borderRadius: 35, overflow: 'hidden'}}><TidekeeperUI stage={stage}/></div>
    <GameTitle lines={[say(l, '合得上，', 'Fits together.'), say(l, '才用得上！', 'Plays together!')]} size={l === 'zh' ? 110 : 85} width={740} style={{left: 12, top: 61}}/>
    <Cutout name="lamp-l3.png" style={{left: 44 + 116 * enter(f, 15, 26), top: 370, width: 221, height: 221, opacity: 1 - enter(f, 38, 8), transform: 'rotate(-12deg)'}}/>
    <Cutout name="lamp-l3.png" style={{left: 344 - 90 * enter(f, 15, 26), top: 370, width: 221, height: 221, opacity: 1 - enter(f, 38, 8), transform: 'rotate(12deg)'}}/>
    <Cutout name="lamp-l4.png" style={{left: 150, top: 322, width: 335, height: 335, opacity: enter(f, 40, 9), transform: `scale(${.78 + .22 * enter(f, 40, 13)})`}}/>
    {stage === 'done' && [0, 1, 2].map(n => <Cutout key={n} name="coin.png" style={{left: 492 + n * 56, top: 479 - n * 68 - 80 * enter(f, 85, 26), width: 87, height: 87, opacity: 1 - enter(f, 121, 18), transform: `rotate(${n * 19 - 15}deg)`}}/>)}
    <Plaque width={665} style={{left: 5, bottom: -25}}>{say(l, stage === 'done' ? '订单交付，修缮开始！' : '合成 → 交付 → 修复', stage === 'done' ? 'ORDER DELIVERED. TIME TO REBUILD!' : 'MERGE → DELIVER → RESTORE')}</Plaque>
  </>;
}

function LivingWorld({f, l}: {f: number; l: Lang}) {
  const phase = f < 60 ? 'repairing' : f < 120 ? 'lighting' : f < 210 ? 'arriving' : 'complete';
  const time = f < 60 ? f / 60 * 2600 : f < 120 ? (f - 60) / 60 * 2800 : f < 210 ? (f - 120) / 90 * 3800 : 3800;
  const night = f >= 60;
  return <><Backdrop night={night} frame={f}/>
    <div style={{position: 'absolute', width: 900, height: 1600, left: 509, top: -292, transform: 'scale(.8)', transformOrigin: 'top left', maskImage: 'linear-gradient(90deg,transparent,#000 12%,#000 90%,transparent)'}}><ProductionFrame phase={phase} time={time}/></div>
    <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(90deg,#063e5466,transparent 62%)'}}/>
    <GameTitle lines={l === 'zh' ? (f < 60 ? ['修好栈桥，', '故事继续！'] : f < 120 ? ['点一盏灯，', '等你回家。'] : ['让小镇', '活起来！']) : (f < 60 ? ['Rebuild.', 'A new chapter!'] : f < 120 ? ['Light the way.', 'Welcome home.'] : ['Bring your', 'world to life!'])} width={740} size={l === 'zh' ? 106 : 82} style={{left: 0, top: 50}}/>
    <Cutout name={f < 60 ? 'character-repair.png' : 'character-signal.png'} style={{left: -13, bottom: -66, width: 355, height: 533, transform: 'rotate(-4deg)'}}/>
    <Plaque width={550} style={{left: -10, bottom: -12}}>{say(l, '每次交付，都接得上', 'ONE WORLD. EVERY DELIVERY.')}</Plaque>
  </>;
}

function Chapter({index, frame, children}: {index: number; frame: number; children: React.ReactNode}) {
  const opacity = (index ? enter(frame, stages[index] - 4, 8) : 1) * (index === 5 ? 1 : 1 - enter(frame, stages[index + 1] - 4, 8));
  return opacity > 0 ? <AbsoluteFill style={{opacity, overflow: 'hidden'}}>{children}</AbsoluteFill> : null;
}

export function GameCampaign({language = 'zh'}: {language?: Lang; preview?: boolean}) {
  const f = useCurrentFrame();
  return <AbsoluteFill style={{fontFamily: fieldFont, background: '#1c8c9b'}}><FieldFonts/>
    <Chapter index={0} frame={f}><Opening f={f} l={language}/></Chapter>
    <Chapter index={1} frame={f}><Direction f={f - 105} l={language}/></Chapter>
    <Chapter index={2} frame={f}><Members f={f - 195} l={language}/></Chapter>
    <Chapter index={3} frame={f}><InGame f={f - 285} l={language}/></Chapter>
    <Chapter index={4} frame={f}><LivingWorld f={f - 435} l={language}/></Chapter>
    <Chapter index={5} frame={f}><Opening f={f - 660} l={language} closing/></Chapter>
    <Caption style={{top: 15, left: 24, fontSize: 16, letterSpacing: 1}}>ART DIRECTOR <span style={{fontSize: 12}}> / TIDEKEEPER</span></Caption>
    <div style={{position: 'absolute', left: 0, bottom: 0, width: (f + 1) / 720 * 100 + '%', height: 4, background: '#ffc758'}}/>
  </AbsoluteFill>;
}

export function CampaignCover() {return <AbsoluteFill style={{fontFamily: fieldFont, overflow: 'hidden'}}><FieldFonts/><Opening f={90} l="zh" closing/></AbsoluteFill>;}

export function CampaignGallery() {
  return <AbsoluteFill style={{fontFamily: fieldFont, background: '#126d82', overflow: 'hidden'}}><FieldFonts/>
    {[['repairing', '修好栈桥'], ['lighting', '点亮灯房'], ['complete', '欢迎归航']].map(([phase, label], i) => <div key={phase} style={{position: 'absolute', left: i * 426 - 10, top: -15, width: 459, height: 765, overflow: 'hidden', borderRight: '8px solid #fff0bb', transform: `rotate(${i === 1 ? 2 : -2}deg)`}}>
      <div style={{position: 'absolute', width: 900, height: 1600, left: -20, top: -72, transform: 'scale(.54)', transformOrigin: 'top left'}}><ProductionFrame phase={phase} time={phase === 'lighting' ? 2800 : 1500}/></div>
      <GameTitle lines={[label]} width={459} size={67} style={{left: 0, top: 66}}/>
      <Plaque width={444} style={{left: 0, bottom: -11}}>{['材料有用，修复看得见','昼夜变化，画风不变','动作与效果，接住故事'][i]}</Plaque>
    </div>)}
    <Caption style={{left: 28, top: 14, fontSize: 14}}>潮灯小镇 / 原创候选组合</Caption>
  </AbsoluteFill>;
}
