import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame} from 'remotion';
import {FieldFonts, fieldFont} from './RenderFonts';

export const DEPTH_FRAMES = 540;
export const DepthShowcase: React.FC<{language: 'zh' | 'en'; localFonts?: boolean; preview?: boolean}> = ({language, preview = false}) => {
  const frame = useCurrentFrame();
  const angle = frame / (preview ? 180 : DEPTH_FRAMES) * Math.PI * 2;
  const orbit = Math.sin(angle), breathe = Math.cos(angle);
  const phase = preview ? 0 : Math.min(2, Math.floor(frame / 180));
  const cards = [
    {file: 'styles/traditional-board.png', x: 955, y: 100, w: 300, h: 390, z: -210, rotate: 15, label: 'WORLD / 03', crop: '18% 30%'},
    {file: 'styles/comic-board.png', x: 830, y: 320, w: 390, h: 260, z: -100, rotate: 8, label: 'LANGUAGE / 02', crop: '60% 35%'},
    {file: 'studio/asset-system-board.png', x: 625, y: 105, w: 350, h: 470, z: 85, rotate: -9, label: 'VISUAL MEMORY / 01', crop: '8% 20%'},
  ];
  const labels = language === 'zh'
    ? ['从你认可的作品开始。', '让判断成为共同的规范。', '把项目交给下一位成员。']
    : ['Start with work you believe in.', 'Make your judgement a shared system.', 'Give the next teammate a clear starting point.'];
  return <AbsoluteFill style={{background: '#001f3f', color: '#ffffff', fontFamily: fieldFont, overflow: 'hidden'}}>
    <FieldFonts />
    <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 72% 33%, #07555e 0%, transparent 48%), radial-gradient(ellipse at 90% 88%, #173f5c 0%, transparent 43%)'}} />
    <div style={{position: 'absolute', left: 420, top: -260, width: 560, height: 1050, opacity: .18, background: 'linear-gradient(100deg, transparent 25%, #74c6cc 49%, transparent 64%)', transform: `rotate(${18 + (preview ? 0 : orbit * 4)}deg)`}} />
    <div style={{position: 'absolute', left: 1100, top: 55, width: 420, height: 600, opacity: .10, filter: 'blur(5px)', transform: `translate(${(preview ? 0 : orbit * 18)}px, ${(preview ? 0 : breathe * 12)}px) rotate(18deg)`}}><Img src={staticFile('studio/production-wall.png')} style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>
    <svg width="1280" height="720" style={{position: 'absolute', inset: 0, opacity: .26}}>
      {[0, 1, 2].map(i => <ellipse key={i} cx={900 + (preview ? 0 : orbit * 15)} cy={584 + i * 18} rx={395 + i * 60} ry={78 + i * 20} fill="none" stroke="#a0ced5" strokeWidth=".7" transform={`rotate(-9 900 584)`} />)}
      <path d="M 470 584 C 740 605, 720 210, 1210 150" fill="none" stroke="#60bfc7" strokeDasharray="3 18" strokeDashoffset={-angle * 21 / (Math.PI * 2)} />
    </svg>
    <div style={{position: 'absolute', inset: 0, perspective: 1700, transformStyle: 'preserve-3d'}}>
      <div style={{position: 'absolute', inset: 0, transformStyle: 'preserve-3d', transformOrigin: '82% 45%', transform: `rotateY(${-9 + orbit * (preview ? 3 : 11)}deg) rotateX(${5 + breathe * (preview ? 1 : 3)}deg) translateX(${orbit * (preview ? 6 : 26)}px) translateZ(${breathe * (preview ? 5 : 25)}px)`}}>
        {cards.map((card, i) => <div key={card.file} style={{position: 'absolute', left: card.x, top: card.y, width: card.w, height: card.h, padding: 9, background: '#f8fafc', borderRadius: 14, border: '1px solid #ffffff', boxShadow: '18px 28px 65px rgba(0,0,0,.55), inset 0 0 0 1px rgba(255,255,255,.3)', transform: `translateZ(${card.z}px) translateY(${Math.sin(angle + i * 1.7) * (preview ? 3 : 8 + i * 4)}px) rotateZ(${card.rotate + Math.sin(angle + i) * (preview ? .5 : 2)}deg)`, transformStyle: 'preserve-3d'}}>
          <div style={{width: '100%', height: 'calc(100% - 43px)', overflow: 'hidden', borderRadius: 8}}><Img src={staticFile(card.file)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: card.crop, transform: `scale(${1.03 + (preview ? 0 : Math.sin(angle + i) * .015)})`}} /></div>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 43, color: '#001f3f', fontSize: 12, fontWeight: 500, letterSpacing: 1.2}}><span>{card.label}</span><span style={{color: '#007d86'}}>●</span></div>
        </div>)}
        <div style={{position: 'absolute', left: 816, top: 555, width: 344, padding: '21px 25px', borderRadius: 16, border: '1px solid #90a29b', background: 'linear-gradient(135deg, #006e78, #003b55)', boxShadow: '0 24px 60px rgba(0,0,0,.5)', transform: `translateZ(140px) translateY(${breathe * 9}px) rotateZ(3deg)`, fontSize: 23, fontWeight: 500}}>
          <div style={{fontSize: 10, letterSpacing: 2, color: '#b2d8d9', marginBottom: 10}}>ONE VERSION · SHARED DIRECTION</div>
          STYLE.md <span style={{color: '#80d3ce'}}>↗</span> SKILL.md
        </div>
        <div style={{position: 'absolute', left: 1025, top: 78, padding: '14px 21px', background: '#d3eeec', color: '#001f3f', borderRadius: 30, fontSize: 16, fontWeight: 500, transform: `translateZ(170px) translateY(${orbit * 7}px) rotateZ(7deg)`}}>SPEC → TEAM</div>
      </div>
    </div>
    <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #001f3f 0%, rgba(0,31,63,.96) 28%, rgba(0,31,63,.55) 43%, transparent 58%)'}} />
    <div style={{position: 'absolute', left: 55, top: 48, fontSize: 14, fontWeight: 500, letterSpacing: 2.5}}>ART DIRECTOR <span style={{color: '#80d3ce'}}>●</span></div>
    <div style={{position: 'absolute', left: 55, top: 128, width: 800}}>
      <div style={{fontSize: 12, color: '#bad4df', letterSpacing: 2.5, marginBottom: 33}}>ONE TEAM. ONE VISUAL MEMORY.</div>
      <div style={{transform: 'rotate(-3deg) skewX(-6deg)', transformOrigin: '0 50%', lineHeight: 1.12, letterSpacing: language === 'zh' ? -6 : -4}}>
        <div style={{fontSize: language === 'zh' ? 91 : 80, fontWeight: 380}}>{language === 'zh' ? '把判断，' : 'Your vision.'}</div>
        <div style={{fontSize: language === 'zh' ? 164 : 94, fontWeight: 820, marginTop: 12, whiteSpace: 'nowrap', color: '#92e4da', textShadow: '0 5px 24px rgba(0,31,63,.32)'}}>{language === 'zh' ? <>交给<span style={{WebkitTextStroke: '1px #c0fff4'}}>团队</span></> : 'Their direction.'}</div>
      </div>
      <p style={{fontSize: 23, lineHeight: 1.7, color: '#c2d7e3', width: 460, marginTop: 28}}>{language === 'zh' ? '主美建立专业规范，团队与 AI 从同一个项目版本继续创作。' : 'Turn art direction into a shared project system your team can build from.'}</p>
    </div>
    <div style={{position: 'absolute', left: 55, bottom: 51, width: 610}}>
      <div style={{display: 'flex', gap: 29, marginBottom: 18, fontSize: 12, letterSpacing: 1}}>{(language === 'zh' ? ['01 建立规范', '02 校准样板', '03 项目交接'] : ['01 DIRECTION', '02 EXEMPLARS', '03 HANDOFF']).map((label, i) => <span key={label} style={{color: phase === i ? '#80d3ce' : '#8faebc'}}>{label}</span>)}</div>
      <div style={{fontSize: language === 'zh' ? 26 : 23, fontWeight: 500}}>{labels[phase]}</div>
    </div>
    <div style={{position: 'absolute', right: 44, bottom: 25, fontSize: 10, color: '#b9ccd9', letterSpacing: 1}}>ORIGINAL CANDIDATE ART · CONTINUOUS SPATIAL STUDY</div>
  </AbsoluteFill>;
};
