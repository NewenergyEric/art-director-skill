import React from 'react';
import {RenderFonts, uiFont} from './RenderFonts';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import timeline from './timeline.json';

const font = uiFont;
const text = {
  zh: {title: ['为什么这张图', '看起来就是对的？'], sub: '把主美的判断，变成团队能执行的规范。', labels: ['01  主美建立规范', '02  样板校准方向', '03  项目包交给团队'], notes: ['参考用途 · 组件家族 · 固定项与变量', '先验证代表首件，再展开制作', '同一版本 · 独立任务 · 评审回流'], footer: '一个团队，一份视觉记忆。'},
  en: {title: ['Why does this one', 'look right?'], sub: 'Turn judgement into a spec your whole team can use.', labels: ['01  Build the spec', '02  Calibrate exemplars', '03  Share the project skill'], notes: ['References · families · fixed rules & variables', 'Review a representative first piece before scaling', 'One version · focused tasks · review feedback'], footer: 'One team. One visual memory.'},
};

export const QuickPreview: React.FC<{language: 'zh' | 'en'; localFonts?: boolean}> = ({language, localFonts = false}) => {
  const frame = useCurrentFrame();
  const c = text[language];
  // Three calm, readable holds. Only the indicator and entry offset move.
  const active = Math.min(2, Math.floor(frame / timeline.previewStepFrames));
  const enter = interpolate(frame % timeline.previewStepFrames, [0, 20], [0, 1], {extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{background: '#f6f5f0', color: '#20221f', fontFamily: font, overflow: 'hidden'}}>
    <RenderFonts enabled={localFonts} />
    <div style={{position: 'absolute', left: 64, top: 46, fontSize: 16, letterSpacing: 2, fontWeight: 700}}>ART DIRECTOR <span style={{color: '#cc5632'}}>●</span></div>
    <div style={{position: 'absolute', right: 64, top: 48, fontSize: 13, color: '#65685f'}}>SPEC → EXEMPLAR → TEAM</div>
    <div style={{position: 'absolute', left: 64, top: 147, width: 533}}>
      <div style={{fontSize: language === 'zh' ? 53 : 48, lineHeight: 1.22, letterSpacing: -1, fontWeight: 600}}>{c.title.map(line => <div key={line}>{line}</div>)}</div>
      <div style={{marginTop: 24, fontSize: language === 'zh' ? 21 : 20, lineHeight: 1.6, maxWidth: 460, color: '#65685f'}}>{c.sub}</div>
      <div style={{marginTop: 46, borderTop: '1px solid #d5d8cf', paddingTop: 22}}>
        {c.labels.map((label, i) => <div key={label} style={{padding: '13px 0', display: 'flex', gap: 18, alignItems: 'center', opacity: active === i ? 1 : .38}}>
          <span style={{width: 8, height: 8, borderRadius: 8, background: active === i ? '#cc5632' : '#a5aaa0'}} />
          <span style={{fontSize: 22, fontWeight: active === i ? 600 : 400}}>{label}</span>
        </div>)}
      </div>
    </div>
    <div style={{position: 'absolute', left: 642, right: 55, top: 112, height: 432, borderRadius: 18, overflow: 'hidden', background: '#e6e7de'}}>
      <Img src={staticFile('studio/asset-system-board.png')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      <div style={{position: 'absolute', left: 20, top: 20, padding: '8px 13px', borderRadius: 30, background: '#fff', color: '#545a50', fontSize: 12}}>ART DIRECTION / ORIGINAL DEMO</div>
    </div>
    <div style={{position: 'absolute', left: 628, right: 42, top: 466, minHeight: 172, padding: '27px 30px', background: '#fff', borderRadius: 16, boxShadow: '0 14px 40px rgba(20,25,18,.09)', transform: `translateY(${(1-enter)*6}px)`}}>
      <div style={{fontSize: language === 'zh' ? 34 : 30, fontWeight: 600, lineHeight: 1.3}}>{c.labels[active]}</div>
      <div style={{marginTop: 16, fontSize: 25, lineHeight: 1.5, color: '#51564c'}}>{c.notes[active]}</div>
    </div>
    <div style={{position: 'absolute', left: 64, bottom: 37, fontSize: 14, color: '#65685f'}}>{c.footer}</div>
    <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 3, background: '#ddd'}}><div style={{height: '100%', width: `${frame / (timeline.previewFrames - 1) * 100}%`, background: '#cc5632'}} /></div>
  </AbsoluteFill>;
};
