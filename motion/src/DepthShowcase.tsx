import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame} from 'remotion';
import {FieldFonts, fieldFont} from './RenderFonts';

export const DEPTH_FRAMES = 720;
type Language = 'zh' | 'en';
const C = {navy: '#001f3f', teal: '#007d86', mint: '#92e4da', paper: '#f5f9fb', muted: '#b2cbd7'};
const clamp = (n: number) => Math.max(0, Math.min(1, n));
const ease = (n: number) => {const t = clamp(n); return t * t * (3 - 2 * t);};
const progress = (frame: number, start: number, duration = 22) => ease((frame - start) / duration);
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const tr = (language: Language, zh: string, en: string) => language === 'zh' ? zh : en;
const shadow = '0 22px 64px #0007, 0 1px 0 #ffffff38 inset';

// Reading intervals are still; shared objects travel when their role changes.
const beats = [0, 120, 252, 372, 516, 630, DEPTH_FRAMES];
const headings = {
  zh: [['从你手上的', '资料开始。'], ['把风格说到', '能执行。'], ['打成一个包，', '交给整个团队。'], ['说出任务，', '沿用同一版。'], ['查出偏差，', '带着依据改。']],
  en: [['Start with', 'what you have.'], ['Make the style', 'actionable.'], ['One project pack.', 'The whole team.'], ['Describe the task.', 'Use the same rules.'], ['Find the drift.', 'Fix it with context.']],
};

function Beat({frame, index, children}: {frame: number; index: number; children: React.ReactNode}) {
  const enter = index === 0 ? 1 : progress(frame, beats[index] - 15, 25);
  const leave = index === 5 ? 0 : progress(frame, beats[index + 1] - 15, 25);
  if (enter === 0 || leave === 1) return null;
  return <AbsoluteFill style={{zIndex: 2, opacity: enter * (1 - leave), transform: `translateY(${(1 - enter) * 34 - leave * 24}px)`}}>{children}</AbsoluteFill>;
}

function Heading({index, language}: {index: number; language: Language}) {
  const lines = headings[language][index];
  const centered = index === 2;
  return <div style={{position: 'absolute', left: centered ? 70 : 56, top: 108, zIndex: 5, width: centered ? 1140 : 710, textAlign: centered ? 'center' : 'left'}}>
    <div style={{fontSize: 18, color: C.mint, letterSpacing: 2, marginBottom: 18}}>{['01 / COLLECT', '02 / DEFINE', '03 / SHARE', '04 / CREATE', '05 / REVIEW'][index]}</div>
    <div style={{fontSize: language === 'zh' ? (centered ? 66 : 73) : 62, fontWeight: 420, lineHeight: 1.13, letterSpacing: -3, transform: 'rotate(-2deg) skewX(-4deg)', transformOrigin: centered ? 'center' : 'left'}}>
      {lines[0]}<br/><strong style={{fontWeight: 820, color: C.mint}}>{lines[1]}</strong>
    </div>
  </div>;
}

function Label({children, dark = false}: {children: React.ReactNode; dark?: boolean}) {
  return <div style={{fontSize: 17, letterSpacing: 1, color: dark ? C.teal : C.mint, fontWeight: 650}}>{children}</div>;
}

const positions = [
  {x: 765, y: 128, w: 416, h: 424, r: 8},
  {x: 880, y: 162, w: 282, h: 393, r: 9},
  {x: 490, y: 356, w: 300, h: 182, r: -4},
  {x: 930, y: 110, w: 255, h: 174, r: 5},
  {x: 1000, y: 172, w: 186, h: 138, r: 7},
  {x: 808, y: 115, w: 362, h: 450, r: 8},
];
function SharedArtwork({frame, language}: {frame: number; language: Language}) {
  let pos = positions[0];
  for (let i = 1; i < positions.length; i++) {
    const t = progress(frame, beats[i] - 18, 32);
    pos = {x: mix(pos.x, positions[i].x, t), y: mix(pos.y, positions[i].y, t), w: mix(pos.w, positions[i].w, t), h: mix(pos.h, positions[i].h, t), r: mix(pos.r, positions[i].r, t)};
  }
  const vanish = progress(frame, 272, 16) * (1 - progress(frame, 360, 18));
  return <div style={{position: 'absolute', left: pos.x, top: pos.y, width: pos.w, height: pos.h, padding: 10, background: C.paper, borderRadius: 12, transform: `perspective(1300px) rotateY(-8deg) rotate(${pos.r}deg)`, boxShadow: shadow, opacity: 1 - vanish, zIndex: 1}}>
    <div style={{height: 'calc(100% - 32px)', overflow: 'hidden', borderRadius: 5}}><Img src={staticFile('studio/asset-system-board.png')} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '15% 20%'}}/></div>
    <div style={{fontSize: 15, color: C.navy, paddingTop: 9, display: 'flex', justifyContent: 'space-between'}}><span>{tr(language, '项目参考 · 原创候选', 'PROJECT REFERENCE')}</span><span style={{color: C.teal}}>●</span></div>
  </div>;
}

function InputBeat({frame, language}: {frame: number; language: Language}) {
  const intake = progress(frame, 12, 25);
  return <>
    <Heading index={0} language={language}/>
    <div style={{position: 'absolute', left: 60, top: 348, width: 585, padding: '23px 28px', border: '1px solid #92e4da60', background: '#06344d', borderRadius: 12, boxShadow: shadow, transform: `translateX(${(1 - intake) * -26}px)`, opacity: intake}}>
      <Label>{tr(language, '你对 Agent 说', 'YOU → YOUR AGENT')}</Label>
      <p style={{fontSize: 30, margin: '13px 0 0', lineHeight: 1.5}}>{tr(language, '“用这些参考，建立项目规范。”', '“Turn these references into our project’s art direction.”')}</p>
    </div>
    {[tr(language, '已有作品', 'Your work'), tr(language, '喜欢的参考', 'References'), tr(language, '主美的批注', 'Director’s notes')].map((text, i) => {
      const t = progress(frame, 5 + i * 8, 24);
      return <div key={text} style={{position: 'absolute', left: 692 + i * 168, top: 554 + (i % 2) * 17, padding: '14px 23px', borderRadius: 6, background: i === 2 ? C.mint : C.paper, color: C.navy, fontSize: 22, boxShadow: shadow, transform: `translateY(${(1 - t) * 66}px) rotate(${i * 4 - 7}deg)`, opacity: t}}>{text}</div>;
    })}
    <div style={{position: 'absolute', left: 61, top: 550, width: 580, fontSize: 25, lineHeight: 1.45, color: C.muted}}>{tr(language, '资料不完整，也能先整理出初稿。', 'Start with a draft, even with incomplete inputs.')}</div>
  </>;
}

function DefineBeat({frame, language}: {frame: number; language: Language}) {
  const p = progress(frame, 127, 30), confirm = progress(frame, 207, 18);
  return <>
    <Heading index={1} language={language}/>
    <div style={{position: 'absolute', left: 641, top: 176, width: 466, padding: '29px 33px', color: C.navy, background: C.paper, borderRadius: 12, boxShadow: shadow, zIndex: 3, transform: `perspective(1500px) rotateY(${mix(-12, -3, p)}deg) rotate(${mix(-6, -2, p)}deg) translateY(${(1 - p) * 40}px)`}}>
      <Label dark>{tr(language, '设计规范 / UI 组件', 'DESIGN RULES / UI')}</Label>
      <div style={{fontSize: 38, fontWeight: 800, margin: '15px 0 22px'}}>{tr(language, '每种状态，都有依据', 'Every state, defined')}</div>
      {[
        [tr(language, '固定', 'KEEP'), tr(language, '配色 · 轮廓 · 光源', 'Palette · shape · lighting')],
        [tr(language, '变化', 'VARY'), tr(language, '默认 · 按下 · 禁用', 'Default · pressed · disabled')],
        [tr(language, '验收', 'CHECK'), tr(language, '实际尺寸 · 放回界面', 'Actual size · in context')],
      ].map(([label, text], i) => <div key={label} style={{display: 'flex', gap: 22, padding: '16px 0', borderTop: '1px solid #bfcfd4', opacity: progress(frame, 140 + i * 12, 17)}}><span style={{fontSize: 18, color: C.teal, width: 52, flexShrink: 0, paddingTop: 3}}>{label}</span><span style={{fontSize: 25}}>{text}</span></div>)}
      <div style={{position: 'absolute', right: -20, bottom: -31, color: C.paper, background: C.teal, fontSize: language === 'zh' ? 24 : 19, fontWeight: 650, padding: '15px 23px', borderRadius: 6, boxShadow: shadow, opacity: confirm, transform: `scale(${mix(1.3, 1, confirm)}) rotate(-7deg)`}}>{tr(language, '主美看样板，再确认', 'DIRECTOR REVIEWS THE SAMPLE')}</div>
    </div>
    <div style={{position: 'absolute', left: 60, top: 374, width: 485, fontSize: 29, lineHeight: 1.7, color: C.muted}}>{tr(language, 'Agent 整理要求与样板，\n主美逐步校准。', 'Your agent organizes the rules.\nThe director reviews samples.').split('\n').map(t => <div key={t}>{t}</div>)}</div>
    <div style={{position: 'absolute', left: 60, top: 529, display: 'flex', gap: 9}}>{[C.teal, '#ef7e36', '#609ccb', '#aeb6a0', C.paper].map((c, i) => <div key={c} style={{width: 49, height: 49, borderRadius: i === 0 ? '50%' : 6, background: c, transform: `translateY(${(1 - progress(frame, 156 + i * 5, 20)) * 16}px)`, opacity: progress(frame, 156 + i * 5, 20)}}/>)}</div>
  </>;
}

function ShareBeat({frame, language}: {frame: number; language: Language}) {
  const fold = progress(frame, 254, 33), send = progress(frame, 294, 31);
  return <>
    <Heading index={2} language={language}/>
    <svg width="1280" height="720" style={{position: 'absolute', inset: 0}}>{[-1, 1].map(side => <path key={side} d={`M 640 422 C ${640 + side * 160} 360, ${640 + side * 210} 488, ${640 + side * 365} 448`} stroke={C.mint} strokeWidth="2" fill="none" strokeDasharray="600" strokeDashoffset={600 * (1 - send)} opacity=".7"/>)}</svg>
    {[0, 1, 2].map(i => <div key={i} style={{position: 'absolute', left: mix(405 + i * 84, 478 + i * 8, fold), top: mix(335 + i * 13, 325 + i * 6, fold), width: 304, height: 219, background: i === 2 ? C.teal : '#cadfdf', borderRadius: 13, border: '1px solid #92e4da', boxShadow: shadow, transform: `perspective(1500px) rotateY(${mix(-12, 12, fold)}deg) rotate(${mix(-9 + i * 8, -4, fold)}deg)`, color: C.paper, padding: '24px 28px', zIndex: i + 1}}>
      {i === 2 && <><Label>PROJECT SKILL / v1.0</Label><div style={{fontSize: 36, fontWeight: 800, marginTop: 15}}>SKILL.md</div><div style={{fontSize: 24, lineHeight: 1.5, marginTop: 19}}>{tr(language, '规范 + 样板 + 交付要求', 'Rules + samples + delivery specs')}</div></>}
    </div>)}
    {[-1, 1].map((side, i) => <div key={side} style={{position: 'absolute', left: side === -1 ? 93 : 891, top: 382, width: 265, padding: '26px 20px', border: '1px solid #a4e6e45e', borderRadius: 12, background: '#0a3b52', opacity: send, transform: `translateX(${side * (1 - send) * -75}px) rotate(${side * 5}deg)`, textAlign: 'center'}}><div style={{fontSize: 28, fontWeight: 700}}>{tr(language, i === 0 ? '团队成员' : '外包伙伴', i === 0 ? 'Teammates' : 'External partners')}</div><div style={{fontSize: 20, color: C.mint, marginTop: 14}}>PROJECT v1.0</div></div>)}
    <div style={{position: 'absolute', top: 609, left: 0, width: '100%', textAlign: 'center', fontSize: 26, color: C.muted, opacity: send}}>{tr(language, '装进各自的 Agent，不用重讲一遍。', 'Load it in their agents. Keep the context.')}</div>
  </>;
}

function GameButton({state, corrected = true, compact = false}: {state: number; corrected?: boolean; compact?: boolean}) {
  const colors = ['#ec8b43', '#be6228', corrected ? '#b7bbb7' : '#ee8d45'];
  return <div style={{height: compact ? 62 : 79, minWidth: compact ? 145 : 183, borderRadius: 18, border: `3px solid ${state === 2 && corrected ? '#828d8c' : '#8d4922'}`, background: `linear-gradient(${colors[state]}, ${state === 1 ? '#a84e1d' : colors[state]})`, color: state === 2 && corrected ? '#637473' : '#fff8e9', boxShadow: `inset 0 4px 0 #ffffff65, 0 ${state === 1 ? 2 : 7}px 0 ${state === 2 && corrected ? '#7e8987' : '#783d21'}`, fontSize: compact ? 26 : 32, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: state === 1 ? 'translateY(5px)' : undefined}}>GO</div>;
}

function CreateBeat({frame, language}: {frame: number; language: Language}) {
  return <>
    <Heading index={3} language={language}/>
    <div style={{position: 'absolute', left: 61, top: 351, width: 524, fontSize: 31, lineHeight: 1.5, padding: '21px 25px', background: '#0a3b52', border: '1px solid #92e4da70', borderRadius: 12, boxShadow: shadow}}><Label>{tr(language, '成员对 Agent 说', 'TEAMMATE → AGENT')}</Label><div style={{marginTop: 12}}>{tr(language, '“按项目规则，做按钮三态。”', '“Make the three button states using our project rules.”')}</div></div>
    <div style={{position: 'absolute', left: 64, top: 547, width: 525, fontSize: 25, lineHeight: 1.4, color: C.muted}}>{tr(language, '规则、参考、版本，自动接到任务里。', 'Rules, references and version travel with the task.')}</div>
  </>;
}

function ReviewBeat({frame, language}: {frame: number; language: Language}) {
  return <>
    <Heading index={4} language={language}/>
    <div style={{position: 'absolute', left: 60, top: 362, width: 491, fontSize: 29, lineHeight: 1.75, color: C.muted}}>{tr(language, '按规则逐项检查，\n把返工说清楚。', 'Check against the rules.\nMake the revision specific.').split('\n').map(t => <div key={t}>{t}</div>)}</div>
    <div style={{position: 'absolute', left: 62, top: 529, width: 525, fontSize: 25, color: C.mint, opacity: progress(frame, 584, 16)}}>{tr(language, '共性问题，交主美更新规范。', 'Shared issues go back to the director.')}</div>
  </>;
}

// The production card becomes the review card. The disabled button stays the
// same object while the camera focus moves to it, then its state is corrected.
function TaskSurface({frame, language}: {frame: number; language: Language}) {
  const enter = progress(frame, 387, 24), leave = progress(frame, 618, 25);
  if (frame < 387 || frame > 643) return null;
  const focus = progress(frame, 502, 38), fix = progress(frame, 563, 25);
  return <div style={{position: 'absolute', zIndex: 4, left: mix(664, 657, focus), top: mix(313, 266, focus), width: 552, height: 303, padding: '24px 26px', color: C.navy, background: C.paper, borderRadius: 13, boxShadow: shadow, opacity: enter * (1 - leave), transform: `perspective(1500px) rotateY(${mix(-10, -3, enter)}deg) rotate(-2deg) translateY(${leave * -30}px)`, overflow: 'hidden'}}>
    <div style={{position: 'absolute', left: 26, top: 24, opacity: 1 - focus}}><Label dark>{tr(language, '本次制作 / UI 按钮', 'TASK / UI BUTTONS')}</Label></div>
    <div style={{position: 'absolute', left: 26, top: 24, opacity: focus}}><Label dark>{tr(language, '对照规范 / 禁用态', 'CHECK AGAINST THE RULE / DISABLED')}</Label></div>
    <span style={{position: 'absolute', right: 26, top: 24, color: C.teal, fontSize: 18, opacity: 1 - focus}}>v1.0</span>
    {[0, 1, 2].map(i => {
      const shown = progress(frame, 413 + i * 15, 20);
      const x = i === 2 ? mix(368, 30, focus) : 26 + i * 171 - focus * 420;
      return <div key={i} style={{position: 'absolute', left: x, top: 85 + (1 - shown) * 26, opacity: shown * (i === 2 ? 1 : 1 - focus), width: 145, transform: `scale(${i === 2 ? mix(1, 1.23, focus) : 1})`, transformOrigin: 'left top'}}>
        <div style={{opacity: i === 2 ? 1 - fix : 1}}><GameButton state={i} corrected={false} compact/></div>
        {i === 2 && <div style={{position: 'absolute', left: 0, right: 0, top: 0, opacity: fix}}><GameButton state={2} compact/></div>}
        <div style={{textAlign: 'center', fontSize: 20, marginTop: 22, opacity: 1 - focus}}>{language === 'zh' ? ['默认', '按下', '禁用'][i] : ['Default', 'Pressed', 'Disabled'][i]}</div>
        {i === 2 && <div style={{position: 'absolute', inset: '-9px -9px auto', height: 87, border: '2px solid #cf703a', borderRadius: 23, opacity: progress(frame, 477, 15) * (1 - fix)}}/>}
      </div>;
    })}
    <div style={{position: 'absolute', left: 260, top: 86, right: 24, opacity: focus, fontSize: 25, lineHeight: 1.45}}>{tr(language, '降低饱和度，\n拉开状态差异。', 'Lower saturation.\nMake the state distinct.').split('\n').map(t => <div key={t}>{t}</div>)}</div>
    <div style={{position: 'absolute', left: 26, right: 26, top: 221, borderTop: '1px solid #bccdd4', paddingTop: 20, fontSize: 21}}>
      <div style={{color: C.teal, opacity: 1 - focus}}>{tr(language, '沿用配色、轮廓与光源 · 首件待评审', 'Shared palette, shape and lighting · draft')}</div>
      <div style={{position: 'absolute', top: 20, opacity: focus}}>{tr(language, '问题 → 修改依据 → 复查', 'Issue → rule → recheck')}</div>
    </div>
  </div>;
}

function Closing({language, social = false}: {language: Language; social?: boolean}) {
  return <>
    <div style={{position: 'absolute', left: 56, top: social ? 126 : 158, zIndex: 5}}>
      <div style={{fontSize: 17, color: C.muted, letterSpacing: 2, marginBottom: 36}}>ONE TEAM, ONE VISUAL MEMORY.</div>
      <div style={{transform: 'rotate(-3deg) skewX(-5deg)', transformOrigin: 'left', letterSpacing: -4, lineHeight: 1.12}}><div style={{fontSize: language === 'zh' ? 64 : 71, fontWeight: 400}}>{tr(language, '一个团队/项目，', 'One team,')}</div><div style={{fontSize: language === 'zh' ? 108 : 82, fontWeight: 830, color: C.mint, marginTop: 13}}>{tr(language, '一份视觉记忆。', 'one visual memory.')}</div></div>
      <div style={{marginTop: 44, fontSize: 30, color: C.paper}}>{tr(language, '让每一次交付，都有共同依据。', 'A shared foundation for every delivery.')}</div>
      <div style={{marginTop: 36, fontSize: 25, color: C.mint}}>{tr(language, '装上 Skill，在你的 Agent 里开始。', 'Install the Skill. Start in your agent.')}</div>
    </div>
    <div style={{position: 'absolute', left: social ? 846 : 858, top: social ? 458 : 499, width: social ? 364 : 310, padding: social ? '17px 23px' : '20px 25px', background: C.teal, border: '1px solid #92e4da', borderRadius: 12, boxShadow: shadow, transform: 'rotate(4deg)', zIndex: 4}}><Label>ONE VERSION / EVERY DELIVERY</Label><div style={{fontSize: social ? 24 : 29, fontWeight: 750, marginTop: 12}}>STYLE.md → SKILL.md</div></div>
  </>;
}

export const DepthShowcase: React.FC<{language: Language; preview?: boolean}> = ({language}) => {
  const frame = useCurrentFrame();
  const phase = Math.min(5, beats.findIndex((end, i) => i > 0 && frame < end) - 1);
  return <AbsoluteFill style={{background: C.navy, color: '#fff', fontFamily: fieldFont, overflow: 'hidden', boxSizing: 'border-box'}}>
    <FieldFonts/>
    <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 35%, #07505d 0%, transparent 57%)'}}/>
    <svg width="1280" height="720" style={{position: 'absolute', inset: 0, opacity: .2}}><ellipse cx="970" cy="532" rx="430" ry="100" fill="none" stroke="#92e4da" strokeWidth="1" transform="rotate(-9 970 532)"/><ellipse cx="970" cy="532" rx="498" ry="132" fill="none" stroke="#92e4da" strokeWidth=".7" transform="rotate(-9 970 532)"/></svg>
    <div style={{position: 'absolute', left: 56, right: 56, top: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 17, letterSpacing: 2}}><span>ART DIRECTOR <span style={{color: C.mint}}>●</span></span><span style={{fontSize: 15, color: C.muted}}>{tr(language, '在你的 Agent 里完成', 'WORK IN YOUR AGENT')}</span></div>
    <SharedArtwork frame={frame} language={language}/><TaskSurface frame={frame} language={language}/>
    <Beat frame={frame} index={0}><InputBeat frame={frame} language={language}/></Beat><Beat frame={frame} index={1}><DefineBeat frame={frame} language={language}/></Beat><Beat frame={frame} index={2}><ShareBeat frame={frame} language={language}/></Beat><Beat frame={frame} index={3}><CreateBeat frame={frame} language={language}/></Beat><Beat frame={frame} index={4}><ReviewBeat frame={frame} language={language}/></Beat><Beat frame={frame} index={5}><Closing language={language}/></Beat>
    <div style={{position: 'absolute', left: 56, right: 56, bottom: 30, display: 'flex', alignItems: 'center', gap: 25, fontSize: 17, color: C.muted}}>{(language === 'zh' ? ['资料', '规范与样板', '项目包', '成员制作', '检查与返修'] : ['Inputs', 'Rules & samples', 'Project pack', 'Team task', 'Review & revise']).map((label, i) => <span key={label} style={{color: phase === i ? C.mint : C.muted, fontWeight: phase === i ? 800 : 400}}>{label}{i < 4 ? '  →' : ''}</span>)}<span style={{marginLeft: 'auto', fontSize: 13}}>{tr(language, '流程示意 · 原创候选素材', 'ILLUSTRATED FLOW · CANDIDATE ART')}</span></div>
    <div style={{position: 'absolute', bottom: 0, height: 3, width: `${frame / (DEPTH_FRAMES - 1) * 100}%`, background: C.mint}}/>
  </AbsoluteFill>;
};

export const DepthSocialPreview: React.FC = () => <AbsoluteFill style={{background: C.navy, color: '#fff', fontFamily: fieldFont, overflow: 'hidden'}}><FieldFonts/><div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 35%, #07505d 0%, transparent 57%)'}}/><div style={{position: 'absolute', left: 56, top: 33, fontSize: 18, letterSpacing: 3}}>ART DIRECTOR <span style={{color: C.mint}}>●</span></div><SharedArtwork frame={680} language="zh"/><Closing language="zh" social/></AbsoluteFill>;
