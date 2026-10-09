import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';

export type ArtDirectorFilmProps = {
  language: 'zh' | 'en';
  startFrame?: number;
};

type Language = ArtDirectorFilmProps['language'];

const C = {
  black: '#080908',
  ink: '#151715',
  paper: '#f2eee3',
  orange: '#eb5a2e',
  blue: '#3272b8',
  sage: '#829b73',
  yellow: '#e8bf4d',
  line: 'rgba(242,238,227,.22)',
  darkLine: 'rgba(21,23,21,.18)',
};

const sans = 'Arial, Microsoft YaHei, Noto Sans CJK SC, sans-serif';
const display = 'Arial Black, Arial, Microsoft YaHei, sans-serif';
const serif = 'Georgia, Noto Serif CJK SC, Songti SC, serif';

const copy = {
  zh: {
    opening: ['一套方向，', '要带得动整支团队。'],
    openingNote: '给美术总监、设计负责人和每一位共同交付的人',
    boardTitle: '不只是一张好看的图。',
    boardBody: '角色、界面、道具和技能，各有任务，也共用同一套判断。',
    templates: ['角色', '道具', '界面', '技能 / 动效', '消除 / 关卡', '解谜 / 线索', '桌游 / 组件'],
    templateMeta: [
      ['轮廓与身份', '表情 · 动作 · 比例'],
      ['家族与变体', '等级 · 状态 · 尺度'],
      ['组件与状态', '层级 · 多语言 · 平台'],
      ['节奏与反馈', '起手 · 命中 · 消散'],
      ['棋子与关卡', '障碍 · 增益 · 连锁 · 状态'],
      ['线索与机关', '发现 · 组合 · 提示 · 解锁'],
      ['版图与组件', '卡牌 · 棋子 · 计分 · 玩家状态'],
    ],
    switchTitle: '一套项目判断，编译成不同的制作任务。',
    styleEyebrow: '同一套方法，不限定一种画风',
    styleTitle: ['伪 3D 物品家族', '美漫任务简报', '国风卡牌家族', '绘制收藏卡牌'],
    styleMeta: [
      '从造型、材质、尺度到状态变化，物品各不相同，却明显属于同一个世界。',
      '底图、角色、线索、界面和交付规格被写进同一份可以直接开工的任务书。',
      '角色、地图、纹样与卡牌共用一套笔触、留白、色阶和边框语法。',
      '角色、遗物、界面与特效经过同一轮首件评审，再扩成完整资产家族。',
    ],
    styleNames: ['PSEUDO 3D', 'AMERICAN COMIC', 'TRADITIONAL', 'PAINTERLY CARDS'],
    briefLabels: ['画风', '身份', '本次任务', '技术规格'],
    briefValues: ['硬边墨线 / 旧报纸色', '调查员与线索世界', '交付完整任务简报', '横版画面 / UI 四态'],
    styleStatus: ['同一家族 · 5 件物品', '底图 → 任务书 → 交付', '共享基线 · 卡牌 04', '首件通过 · 家族展开'],
    systemLine: '项目基线 → 分工任务书 → 资产家族 / 模板 → 评审 / 版本',
    laneTitle: '先看一小批。确认了，再把产量放大。',
    laneNote: '每条产线拿到自己的任务，也从同一个版本开始。',
    lanes: ['角色 / 场景', 'UI / HUD', '道具 / 物品', '技能 / VFX'],
    stages: ['任务', '首件', '评审', '批量'],
    reviewTitle: '“感觉不对”，要落到可以修改的地方。',
    reviewWords: ['画风', '身份', '本次任务', '技术规格'],
    reviewNotes: ['像不像这个项目', '还是不是这个角色', '这一轮改什么', '能不能进生产'],
    close: ['总监改过的地方，', '下一轮不用再猜。'],
    closeNote: '把 know-how 留在项目里，让团队从已经确认的地方继续。',
    footer: 'ART DIRECTOR · TEAM MEMORY FOR VISUAL PRODUCTION',
  },
  en: {
    opening: ['One direction', 'has to move an entire team.'],
    openingNote: 'For art directors, design leads, and everyone who ships the work',
    boardTitle: 'More than one good-looking image.',
    boardBody: 'Characters, UI, items, and skills each get a focused brief—and the same project judgement.',
    templates: ['CHARACTER', 'ITEMS', 'UI SYSTEM', 'SKILL / VFX', 'MATCH / LEVEL', 'PUZZLE / CLUES', 'BOARD / PIECES'],
    templateMeta: [
      ['Silhouette & identity', 'Expression · action · scale'],
      ['Family & variants', 'Rarity · state · scale'],
      ['Components & states', 'Hierarchy · locale · platform'],
      ['Timing & feedback', 'Anticipation · hit · decay'],
      ['Tiles & level states', 'Blocker · booster · cascade · state'],
      ['Clues & mechanisms', 'Discover · combine · hint · unlock'],
      ['Board & components', 'Cards · pieces · score · player state'],
    ],
    switchTitle: 'One project judgement, compiled into focused production briefs.',
    styleEyebrow: 'ONE METHOD. MANY VISUAL LANGUAGES.',
    styleTitle: ['Pseudo-3D item family', 'American-comic task brief', 'Traditional card family', 'Painterly collectible cards'],
    styleMeta: [
      'Form, material, scale, and states vary while every object still belongs to the same world.',
      'Source art, character, clues, UI states, and delivery specs become one brief the team can build from.',
      'Character, map, motifs, and cards share one system for brushwork, space, value, and framing.',
      'Character, relic, interface, and VFX pass the same first-piece review before the family expands.',
    ],
    styleNames: ['PSEUDO 3D', 'AMERICAN COMIC', 'TRADITIONAL', 'PAINTERLY CARDS'],
    briefLabels: ['STYLE', 'IDENTITY', 'TASK', 'SPEC'],
    briefValues: ['Hard ink / newsprint palette', 'Investigator & clue world', 'Deliver a complete task brief', 'Landscape art / four UI states'],
    styleStatus: ['ONE FAMILY · 5 ITEMS', 'SOURCE → BRIEF → OUTPUT', 'SHARED BASELINE · CARD 04', 'FIRST PIECE PASSED · FAMILY'],
    systemLine: 'PROJECT BASELINE → DISCIPLINE BRIEF → ASSET FAMILY / TEMPLATE → REVIEW / VERSION',
    laneTitle: 'Review a small batch. Align. Then scale.',
    laneNote: 'Each production lane gets its own task and starts from the same version.',
    lanes: ['CHARACTER / WORLD', 'UI / HUD', 'PROPS / ITEMS', 'SKILL / VFX'],
    stages: ['BRIEF', 'FIRST', 'REVIEW', 'BATCH'],
    reviewTitle: '“It feels wrong” has to become something the team can fix.',
    reviewWords: ['STYLE', 'IDENTITY', 'TASK', 'SPEC'],
    reviewNotes: ['Does it belong here?', 'Is it still recognisable?', 'What changes this round?', 'Can it enter production?'],
    close: ['What the director corrected once', 'should stay corrected.'],
    closeNote: 'Keep the know-how inside the project, so the team starts from what is already confirmed.',
    footer: 'ART DIRECTOR · TEAM MEMORY FOR VISUAL PRODUCTION',
  },
} as const;

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const p = (frame: number, from: number, to: number) => clamp((frame - from) / (to - from));
const easeOut = (value: number) => 1 - Math.pow(1 - clamp(value), 3);
const easeInOut = (value: number) => {
  const x = clamp(value);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};
const windowOpacity = (frame: number, from: number, to: number, feather = 24) =>
  p(frame, from, from + feather) * (1 - p(frame, to - feather, to));

const Grain: React.FC<{opacity?: number}> = ({opacity = 0.085}) => (
  <AbsoluteFill
    style={{
      pointerEvents: 'none',
      opacity,
      mixBlendMode: 'soft-light',
      backgroundImage:
        'repeating-radial-gradient(circle at 19% 23%, rgba(255,255,255,.8) 0 .55px, transparent .7px 3.2px)',
      backgroundSize: '9px 9px',
    }}
  />
);

const Rail: React.FC<{frame: number; language: Language}> = ({frame, language}) => (
  <>
    <div
      style={{
        position: 'absolute',
        left: 36,
        right: 36,
        top: 25,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: sans,
        fontSize: 10,
        fontWeight: 800,
        letterSpacing: 2.2,
        color: C.paper,
        zIndex: 30,
      }}
    >
      <div>ART DIRECTOR<span style={{color: C.orange}}> ●</span></div>
      <div style={{opacity: 0.52}}>{language === 'zh' ? '团队判断 / 项目记忆' : 'TEAM JUDGEMENT / PROJECT MEMORY'}</div>
      <div>{String(Math.min(30, Math.floor(frame / 30))).padStart(2, '0')} / 30</div>
    </div>
    <div style={{position: 'absolute', left: 36, right: 36, top: 51, height: 1, background: C.line, zIndex: 30}}>
      <div style={{height: 2, width: `${clamp(frame / 899) * 100}%`, background: C.orange}} />
    </div>
  </>
);

const Opening: React.FC<{frame: number; language: Language}> = ({frame, language}) => {
  const c = copy[language];
  const opacity = 1 - p(frame, 188, 226);
  const imageIn = easeOut(p(frame, 18, 92));
  const wordsIn = easeOut(p(frame, 40, 112));
  const drift = interpolate(p(frame, 0, 220), [0, 1], [0, -38]);

  return (
    <AbsoluteFill style={{opacity, overflow: 'hidden', background: C.black}}>
      <div
        style={{
          position: 'absolute',
          left: 552,
          top: 78,
          width: 670,
          height: 578,
          clipPath: `inset(${interpolate(imageIn, [0, 1], [48, 0])}% 0 0 0)`,
          overflow: 'hidden',
          background: C.ink,
        }}
      >
        <Img
          src={staticFile('studio/team-review.png')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: '58% 50%',
            filter: 'saturate(.82) contrast(1.03)',
            transform: `scale(${interpolate(imageIn, [0, 1], [1.16, 1.04])}) translateX(${drift}px)`,
          }}
        />
        <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(8,9,8,.36), transparent 55%)'}} />
        <div style={{position: 'absolute', right: -18, bottom: -40, fontFamily: display, fontSize: 154, lineHeight: 0.8, letterSpacing: -10, color: 'rgba(255,253,247,.15)'}}>TEAM</div>
      </div>

      <div style={{position: 'absolute', left: 54, top: 112, width: 620, opacity: wordsIn}}>
        <div style={{fontFamily: serif, fontSize: language === 'zh' ? 66 : 63, lineHeight: 0.98, color: C.paper, letterSpacing: -3.5}}>
          {c.opening.map((line, index) => (
            <div
              key={line}
              style={{
                transform: `translateY(${interpolate(easeOut(p(frame, 38 + index * 13, 90 + index * 13)), [0, 1], [45, 0])}px)`,
                opacity: easeOut(p(frame, 38 + index * 13, 90 + index * 13)),
                fontStyle: index === 0 && language === 'en' ? 'italic' : 'normal',
              }}
            >
              {line}
            </div>
          ))}
        </div>
        <div style={{width: interpolate(easeOut(p(frame, 92, 138)), [0, 1], [0, 176]), height: 9, background: C.orange, marginTop: 34}} />
        <div style={{marginTop: 24, width: 420, fontFamily: sans, fontSize: language === 'zh' ? 16 : 14, lineHeight: 1.55, color: 'rgba(242,238,227,.66)'}}>{c.openingNote}</div>
      </div>

      <div style={{position: 'absolute', left: 54, bottom: 42, fontFamily: display, fontSize: 92, letterSpacing: -6, color: 'rgba(242,238,227,.055)', whiteSpace: 'nowrap'}}>MANY HANDS / ONE DIRECTION</div>
      <Grain />
    </AbsoluteFill>
  );
};

const BoardReveal: React.FC<{frame: number; language: Language}> = ({frame, language}) => {
  const c = copy[language];
  const opacity = windowOpacity(frame, 165, 330, 30);
  const enter = easeInOut(p(frame, 162, 230));
  const camera = easeInOut(p(frame, 220, 326));
  const left = interpolate(enter, [0, 1], [530, 74]);
  const top = interpolate(enter, [0, 1], [105, 82]);
  const width = interpolate(enter, [0, 1], [650, 1132]);
  const height = interpolate(enter, [0, 1], [550, 574]);

  return (
    <AbsoluteFill style={{opacity, overflow: 'hidden', background: C.black}}>
      <div style={{position: 'absolute', left, top, width, height, overflow: 'hidden', background: C.paper}}>
        <Img
          src={staticFile('studio/production-wall.png')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: `scale(${interpolate(camera, [0, 1], [1.12, 1.03])}) translate(${interpolate(camera, [0, 1], [0, -22])}px, ${interpolate(camera, [0, 1], [0, 8])}px)`,
            filter: 'saturate(.9) contrast(1.03)',
          }}
        />
        <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,9,8,.04), rgba(8,9,8,.2))'}} />
      </div>

      <div style={{position: 'absolute', left: 74, top: 95, width: language === 'zh' ? 530 : 610, padding: '24px 28px 27px', background: 'rgba(8,9,8,.88)', backdropFilter: 'blur(12px)', color: C.paper, opacity: easeOut(p(frame, 230, 280)), transform: `translateY(${interpolate(easeOut(p(frame, 230, 280)), [0, 1], [24, 0])}px)`}}>
        <div style={{fontFamily: display, fontSize: language === 'zh' ? 36 : 32, lineHeight: 1.05, letterSpacing: -1.8}}>{c.boardTitle}</div>
        <div style={{marginTop: 13, fontFamily: sans, fontSize: language === 'zh' ? 15 : 14, lineHeight: 1.55, color: 'rgba(242,238,227,.7)'}}>{c.boardBody}</div>
      </div>

      <div style={{position: 'absolute', left: 88, bottom: 23, fontFamily: display, fontSize: 103, lineHeight: 0.82, letterSpacing: -7, whiteSpace: 'nowrap', color: 'rgba(242,238,227,.17)', mixBlendMode: 'screen', transform: `translateX(${interpolate(camera, [0, 1], [70, -30])}px)`}}>ONE DIRECTION / MANY ASSETS</div>
      <Grain />
    </AbsoluteFill>
  );
};

const styleBoards = [
  'styles/pseudo-3d-board.png',
  'styles/comic-board.png',
  'styles/traditional-board.png',
  'styles/painterly-card-board.png',
] as const;

const FloatingItem: React.FC<{
  index: number;
  left: number;
  top: number;
  size: number;
  rotate: number;
  progress: number;
}> = ({index, left, top, size, rotate, progress}) => {
  const lift = Math.sin(progress * Math.PI * 2 + index * 0.82) * 10;
  return (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        width: size,
        height: size * 1.32,
        overflow: 'hidden',
        filter: 'drop-shadow(0 20px 19px rgba(0,0,0,.42))',
        transform: `translateY(${lift}px) rotate(${rotate}deg)`,
      }}
    >
      <Img
        src={staticFile('styles/pseudo-3d-items.png')}
        style={{
          position: 'absolute',
          width: size * 5,
          height: size * 1.8,
          maxWidth: 'none',
          left: -index * size,
          top: -size * 0.2,
          objectFit: 'fill',
        }}
      />
    </div>
  );
};

const ArtCard: React.FC<{
  src: string;
  objectPosition: string;
  left: number;
  top: number;
  rotate: number;
  label: string;
  progress: number;
  dark?: boolean;
}> = ({src, objectPosition, left, top, rotate, label, progress, dark = false}) => (
  <div
    style={{
      position: 'absolute',
      left,
      top,
      width: 178,
      height: 250,
      padding: 9,
      background: dark ? '#14191d' : '#eee5d2',
      border: `1px solid ${dark ? 'rgba(255,255,255,.3)' : 'rgba(21,23,21,.28)'}`,
      boxShadow: '18px 24px 36px rgba(0,0,0,.38)',
      transform: `translateY(${Math.sin(progress * Math.PI * 2 + left) * 7}px) rotate(${rotate}deg)`,
    }}
  >
    <div style={{height: 196, overflow: 'hidden', background: C.ink}}>
      <Img src={staticFile(src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition}} />
    </div>
    <div style={{marginTop: 10, display: 'flex', justifyContent: 'space-between', fontFamily: sans, fontSize: 8, fontWeight: 800, letterSpacing: 1.15, color: dark ? C.paper : C.ink}}>
      <span>{label}</span><span style={{color: C.orange}}>●</span>
    </div>
  </div>
);

const StyleDirections: React.FC<{frame: number; language: Language}> = ({frame, language}) => {
  const c = copy[language];
  const opacity = windowOpacity(frame, 298, 488, 20);
  const local = frame - 308;
  const sceneTime = Math.max(0, Math.min(167, local));
  const active = Math.min(3, Math.floor(sceneTime / 42));
  const segment = sceneTime - active * 42;
  const crossfade = easeInOut(p(segment, 0, 11));
  const previous = Math.max(0, active - 1);
  const detailIn = easeOut(p(segment, 4, 17));
  const drift = p(sceneTime, 0, 167);
  const floatProgress = frame / 94;

  return (
    <AbsoluteFill style={{opacity, overflow: 'hidden', background: C.black}}>
      <div style={{position: 'absolute', left: 365, top: 69, right: 0, bottom: 0, overflow: 'hidden'}}>
        <Img
          src={staticFile(styleBoards[previous])}
          style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: active === 1 ? '48% 50%' : '50% 50%', opacity: 1 - crossfade, filter: 'saturate(.83) contrast(1.04)', transform: `scale(${interpolate(drift, [0, 1], [1.08, 1.02])})`}}
        />
        <Img
          src={staticFile(styleBoards[active])}
          style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: active === 1 ? '48% 50%' : '50% 50%', opacity: crossfade, filter: 'saturate(.83) contrast(1.04)', transform: `scale(${interpolate(drift, [0, 1], [1.08, 1.02])})`}}
        />
        <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(8,9,8,.98) 0%, rgba(8,9,8,.58) 24%, rgba(8,9,8,.04) 69%, rgba(8,9,8,.18) 100%)'}} />
      </div>

      <div style={{position: 'absolute', left: 48, top: 88, width: 435, zIndex: 8}}>
        <div style={{fontFamily: sans, fontSize: 10, fontWeight: 800, letterSpacing: 2.2, color: C.orange}}>{c.styleEyebrow}</div>
        <div style={{marginTop: 20, fontFamily: serif, fontSize: language === 'zh' ? 46 : 42, lineHeight: 0.98, letterSpacing: -2.2, color: C.paper, opacity: detailIn, transform: `translateY(${interpolate(detailIn, [0, 1], [20, 0])}px)`}}>{c.styleTitle[active]}</div>
        <div style={{marginTop: 19, width: 286, fontFamily: sans, fontSize: language === 'zh' ? 14 : 13, lineHeight: 1.56, color: 'rgba(242,238,227,.66)', opacity: detailIn}}>{c.styleMeta[active]}</div>
        <div style={{marginTop: 27, display: 'inline-flex', alignItems: 'center', gap: 9, padding: '9px 11px', background: active === 2 ? '#d9caa9' : C.orange, color: C.black, fontFamily: sans, fontSize: 9, fontWeight: 800, letterSpacing: 1.2}}><span>●</span>{c.styleStatus[active]}</div>
      </div>

      <div style={{position: 'absolute', left: 43, bottom: 100, fontFamily: display, fontSize: 72, lineHeight: 0.82, letterSpacing: -4.5, color: 'rgba(242,238,227,.075)', whiteSpace: 'nowrap', zIndex: 2}}>{c.styleNames[active]}</div>

      {active === 0 && (
        <div style={{position: 'absolute', inset: 0, opacity: detailIn, zIndex: 9}}>
          {[0, 1, 2, 3, 4].map((index) => (
            <FloatingItem
              key={index}
              index={index}
              left={[555, 690, 840, 986, 1102][index]}
              top={[160, 333, 142, 345, 184][index]}
              size={[155, 145, 160, 155, 134][index]}
              rotate={[-8, 5, -3, 7, -5][index]}
              progress={floatProgress}
            />
          ))}
        </div>
      )}

      {active === 1 && (
        <div style={{position: 'absolute', right: 57, top: 112, width: 458, padding: '24px 26px 22px', background: 'rgba(242,238,227,.96)', color: C.ink, transform: `translateX(${interpolate(detailIn, [0, 1], [58, 0])}px) rotate(-1.2deg)`, opacity: detailIn, zIndex: 10, boxShadow: '18px 24px 0 rgba(8,9,8,.28)'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `3px solid ${C.ink}`, paddingBottom: 12}}>
            <div style={{fontFamily: display, fontSize: 22, letterSpacing: -0.7}}>TASK BRIEF / 014</div>
            <div style={{fontFamily: sans, fontSize: 8, fontWeight: 800, letterSpacing: 1.4, color: C.orange}}>READY FOR FIRST PIECE</div>
          </div>
          {c.briefLabels.map((label, index) => (
            <div key={label} style={{display: 'grid', gridTemplateColumns: '108px 1fr', gap: 12, padding: '12px 0', borderBottom: `1px solid ${C.darkLine}`}}>
              <div style={{fontFamily: sans, fontSize: 9, fontWeight: 800, letterSpacing: 1.4, color: C.orange}}>{label}</div>
              <div style={{fontFamily: sans, fontSize: language === 'zh' ? 12 : 11, lineHeight: 1.35, fontWeight: 700}}>{c.briefValues[index]}</div>
            </div>
          ))}
          <div style={{marginTop: 17, display: 'flex', gap: 7}}>{['SOURCE ART', 'RULES', 'OUTPUT'].map((label, index) => <div key={label} style={{padding: '8px 9px', background: index === 2 ? C.orange : C.ink, color: index === 2 ? C.black : C.paper, fontFamily: sans, fontSize: 8, fontWeight: 800, letterSpacing: 1.1}}>{label}</div>)}</div>
        </div>
      )}

      {active === 2 && (
        <div style={{position: 'absolute', inset: 0, opacity: detailIn, zIndex: 9}}>
          <ArtCard src={styleBoards[2]} objectPosition="9% 76%" left={650} top={151} rotate={-6} label="山川 / 01" progress={floatProgress} />
          <ArtCard src={styleBoards[2]} objectPosition="28% 76%" left={827} top={278} rotate={2.5} label="行旅 / 02" progress={floatProgress} />
          <ArtCard src={styleBoards[2]} objectPosition="55% 76%" left={1007} top={137} rotate={7} label="草木 / 03" progress={floatProgress} />
        </div>
      )}

      {active === 3 && (
        <div style={{position: 'absolute', inset: 0, opacity: detailIn, zIndex: 9}}>
          <ArtCard src={styleBoards[3]} objectPosition="8% 59%" left={631} top={171} rotate={-5} label="WORLD / 01" progress={floatProgress} dark />
          <ArtCard src={styleBoards[3]} objectPosition="24% 59%" left={816} top={298} rotate={2} label="RELIC / 02" progress={floatProgress} dark />
          <ArtCard src={styleBoards[3]} objectPosition="40% 59%" left={1003} top={154} rotate={6} label="STATE / 03" progress={floatProgress} dark />
          <div style={{position: 'absolute', right: 61, top: 520, padding: '11px 14px', background: C.orange, color: C.black, fontFamily: sans, fontSize: 9, fontWeight: 800, letterSpacing: 1.35}}>REVIEWED FAMILY / V02</div>
        </div>
      )}

      <div style={{position: 'absolute', left: 48, right: 48, bottom: 55, paddingTop: 13, borderTop: `1px solid ${C.line}`, fontFamily: sans, fontSize: language === 'zh' ? 10 : 9, fontWeight: 800, letterSpacing: 1.5, color: 'rgba(242,238,227,.68)', zIndex: 20}}>{c.systemLine}</div>
      <Grain opacity={0.08} />
    </AbsoluteFill>
  );
};

const cropPositions = [
  {src: 'studio/asset-system-board.png', scale: 1.23, x: 42, y: 48},
  {src: 'studio/asset-system-board.png', scale: 1.31, x: -316, y: 45},
  {src: 'studio/asset-system-board.png', scale: 1.38, x: -673, y: 42},
  {src: 'studio/asset-system-board.png', scale: 1.3, x: 42, y: -294},
  {src: 'studio/genre-systems-board.png', scale: 2, x: 5, y: -176},
  {src: 'studio/genre-systems-board.png', scale: 2, x: -675, y: -176},
  {src: 'studio/genre-systems-board.png', scale: 2, x: -1350, y: -176},
];

const TemplateSwitcher: React.FC<{frame: number; language: Language}> = ({frame, language}) => {
  const c = copy[language];
  const opacity = windowOpacity(frame, 474, 648, 22);
  const local = frame - 484;
  const active = Math.max(0, Math.min(6, Math.floor(Math.max(0, local) / 22)));
  const segment = ((local % 22) + 22) % 22;
  const crossfade = easeInOut(p(segment, 0, 9));
  const current = cropPositions[active];
  const previous = cropPositions[Math.max(0, active - 1)];
  const drift = interpolate(p(segment, 0, 22), [0, 1], [0, -9]);

  return (
    <AbsoluteFill style={{opacity, overflow: 'hidden', background: C.black}}>
      <div style={{position: 'absolute', left: 48, top: 84, width: 250, bottom: 54, borderTop: `1px solid ${C.line}`}}>
        <div style={{paddingTop: 18, fontFamily: sans, fontSize: 10, fontWeight: 800, letterSpacing: 2.1, color: 'rgba(242,238,227,.5)'}}>PRODUCTION TEMPLATES / 07</div>
        <div style={{marginTop: 26}}>
          {c.templates.map((label, index) => {
            const isActive = index === active;
            return (
              <div key={label} style={{position: 'relative', height: 64, padding: '11px 12px 9px 24px', borderTop: `1px solid ${C.line}`, color: isActive ? C.black : C.paper, background: isActive ? C.orange : 'transparent'}}>
                <div style={{position: 'absolute', left: 0, top: 13, fontFamily: sans, fontSize: 9, opacity: isActive ? 0.6 : 0.35}}>0{index + 1}</div>
                <div style={{fontFamily: display, fontSize: language === 'zh' ? 16 : 13, letterSpacing: -0.4}}>{label}</div>
                <div style={{marginTop: 5, fontFamily: sans, fontSize: 8, opacity: isActive ? 0.65 : 0.4}}>{c.templateMeta[index][0]}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{position: 'absolute', left: 326, top: 84, right: 48, bottom: 54, overflow: 'hidden', background: C.paper}}>
        <Img src={staticFile(previous.src)} style={{position: 'absolute', left: previous.x + drift, top: previous.y, width: 1130, height: 636, objectFit: 'cover', transform: `scale(${previous.scale})`, transformOrigin: '0 0', filter: 'saturate(.88) contrast(1.04)', opacity: 1 - crossfade}} />
        <Img src={staticFile(current.src)} style={{position: 'absolute', left: current.x + drift, top: current.y, width: 1130, height: 636, objectFit: 'cover', transform: `scale(${current.scale})`, transformOrigin: '0 0', filter: 'saturate(.88) contrast(1.04)', opacity: crossfade}} />
        <div style={{position: 'absolute', inset: 0, boxShadow: 'inset 0 0 0 1px rgba(21,23,21,.2)'}} />
        <div style={{position: 'absolute', left: 20, top: 18, padding: '9px 12px', background: 'rgba(8,9,8,.82)', color: C.paper, fontFamily: sans, fontSize: 9, fontWeight: 800, letterSpacing: 1.5}}>{c.templates[active]} · 0{active + 1}</div>
        <div style={{position: 'absolute', right: 18, top: 18, display: 'flex', gap: 6}}>
          {[C.orange, C.blue, C.sage].map((color) => <div key={color} style={{width: 8, height: 8, borderRadius: 9, background: color}} />)}
        </div>
        <div style={{position: 'absolute', left: 20, right: 20, bottom: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
          <div style={{padding: '14px 16px', maxWidth: 430, background: 'rgba(242,238,227,.92)', color: C.ink}}>
            <div style={{fontFamily: display, fontSize: language === 'zh' ? 22 : 18, letterSpacing: -0.8}}>{c.templateMeta[active][0]}</div>
            <div style={{marginTop: 7, fontFamily: sans, fontSize: 11, color: 'rgba(21,23,21,.62)'}}>{c.templateMeta[active][1]}</div>
          </div>
          <div style={{fontFamily: sans, fontSize: 9, fontWeight: 800, letterSpacing: 1.2, color: C.paper, background: C.ink, padding: '9px 11px'}}>DRAFT → REVIEW</div>
        </div>
      </div>

      <div style={{position: 'absolute', left: 311, bottom: -3, fontFamily: display, fontSize: 66, letterSpacing: -4, color: 'rgba(242,238,227,.09)', whiteSpace: 'nowrap', pointerEvents: 'none'}}>{c.switchTitle}</div>
      <Grain opacity={0.07} />
    </AbsoluteFill>
  );
};

const TeamPipeline: React.FC<{frame: number; language: Language}> = ({frame, language}) => {
  const c = copy[language];
  const opacity = windowOpacity(frame, 626, 778, 22);
  const local = frame - 636;
  const boardShift = easeInOut(p(frame, 626, 676));

  return (
    <AbsoluteFill style={{opacity, overflow: 'hidden', background: C.paper}}>
      <div style={{position: 'absolute', left: 0, top: 0, width: 390, bottom: 0, overflow: 'hidden'}}>
        <Img src={staticFile('studio/production-wall.png')} style={{height: '100%', width: 720, objectFit: 'cover', objectPosition: '24% 50%', transform: `translateX(${interpolate(boardShift, [0, 1], [130, -92])}px) scale(1.08)`, filter: 'grayscale(.35) saturate(.75) contrast(1.04)'}} />
        <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(8,9,8,.05), rgba(8,9,8,.54))'}} />
        <div style={{position: 'absolute', left: 28, right: 28, bottom: 44, fontFamily: display, fontSize: 58, lineHeight: 0.86, letterSpacing: -4.5, color: 'rgba(255,253,247,.78)'}}>ONE<br/>SYSTEM<br/><span style={{color: C.orange}}>MANY<br/>HANDS</span></div>
      </div>

      <div style={{position: 'absolute', left: 420, top: 92, right: 46}}>
        <div style={{fontFamily: serif, fontSize: language === 'zh' ? 39 : 36, lineHeight: 1.03, letterSpacing: -1.8, color: C.ink, maxWidth: 780}}>{c.laneTitle}</div>
        <div style={{marginTop: 13, fontFamily: sans, fontSize: 13, color: 'rgba(21,23,21,.56)'}}>{c.laneNote}</div>

        <div style={{marginTop: 34, display: 'grid', gridTemplateColumns: '150px repeat(4, 1fr)', alignItems: 'end'}}>
          <div />
          {c.stages.map((stage, index) => <div key={stage} style={{paddingBottom: 9, fontFamily: sans, fontSize: 9, fontWeight: 800, letterSpacing: 1.6, color: index === 3 ? C.orange : 'rgba(21,23,21,.45)'}}>{stage}</div>)}
        </div>

        {c.lanes.map((lane, laneIndex) => {
          const laneProgress = easeOut(p(local, 16 + laneIndex * 12, 118 + laneIndex * 12));
          const color = [C.orange, C.blue, C.sage, C.yellow][laneIndex];
          return (
            <div key={lane} style={{height: 88, display: 'grid', gridTemplateColumns: '150px 1fr', alignItems: 'center', borderTop: `1px solid ${C.darkLine}`}}>
              <div style={{fontFamily: display, fontSize: language === 'zh' ? 14 : 11, color: C.ink}}>{lane}</div>
              <div style={{position: 'relative', height: 48}}>
                <div style={{position: 'absolute', left: 0, right: 0, top: 23, height: 1, background: C.darkLine}} />
                <div style={{position: 'absolute', left: 0, top: 20, height: 7, width: `${laneProgress * 100}%`, background: color}} />
                {[0, 1, 2, 3].map((stage, index) => {
                  const threshold = [0.03, 0.31, 0.62, 0.92][index];
                  const reached = p(laneProgress, threshold - 0.08, threshold);
                  return <div key={stage} style={{position: 'absolute', left: `${index * 33.333}%`, top: 13, width: 22, height: 22, borderRadius: 20, border: `2px solid ${C.ink}`, background: reached > 0.98 ? color : C.paper, transform: `scale(${interpolate(reached, [0, 1], [.72, 1])})`}} />;
                })}
                <div style={{position: 'absolute', left: `calc(${laneProgress * 100}% - 3px)`, top: 4, width: 1, height: 39, background: C.ink}} />
              </div>
            </div>
          );
        })}
      </div>
      <div style={{position: 'absolute', left: 420, right: 46, bottom: 44, height: 1, background: C.darkLine}} />
      <Grain opacity={0.045} />
    </AbsoluteFill>
  );
};

const ReviewLens: React.FC<{frame: number; language: Language}> = ({frame, language}) => {
  const c = copy[language];
  const opacity = windowOpacity(frame, 752, 862, 20);
  const local = frame - 756;
  const active = Math.max(0, Math.min(3, Math.floor(local / 24)));
  const lensX = [25, 45, 65, 81][active];
  const lensY = [31, 47, 64, 76][active];

  return (
    <AbsoluteFill style={{opacity, overflow: 'hidden', background: C.black}}>
      <div style={{position: 'absolute', left: 48, top: 80, right: 48, bottom: 48, overflow: 'hidden'}}>
        <Img src={staticFile('studio/asset-system-board.png')} style={{width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(.66) brightness(.62) contrast(1.12)', transform: `scale(${interpolate(p(local, 0, 132), [0, 1], [1.05, 1.14])})`}} />
        <div style={{position: 'absolute', inset: 0, background: 'rgba(8,9,8,.25)'}} />
        <div style={{position: 'absolute', left: `${lensX}%`, top: `${lensY}%`, width: 152, height: 152, marginLeft: -76, marginTop: -76, borderRadius: 999, border: `3px solid ${C.orange}`, boxShadow: '0 0 0 999px rgba(8,9,8,.28), inset 0 0 0 1px rgba(255,255,255,.5)'}}>
          <div style={{position: 'absolute', left: '50%', top: -30, width: 1, height: 212, background: 'rgba(235,90,46,.62)'}} />
          <div style={{position: 'absolute', top: '50%', left: -30, width: 212, height: 1, background: 'rgba(235,90,46,.62)'}} />
        </div>
      </div>

      <div style={{position: 'absolute', left: 74, top: 103, width: language === 'zh' ? 560 : 680, padding: '20px 22px', background: 'rgba(8,9,8,.86)', backdropFilter: 'blur(10px)'}}>
        <div style={{fontFamily: serif, fontSize: language === 'zh' ? 31 : 27, lineHeight: 1.1, color: C.paper, letterSpacing: -1.1}}>{c.reviewTitle}</div>
      </div>

      <div style={{position: 'absolute', left: 74, right: 74, bottom: 72, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: '1px solid rgba(242,238,227,.38)'}}>
        {c.reviewWords.map((word, index) => (
          <div key={word} style={{minHeight: 88, padding: '14px 12px', borderLeft: index === 0 ? 'none' : `1px solid ${C.line}`, color: C.paper, background: index === active ? 'rgba(235,90,46,.88)' : 'rgba(8,9,8,.72)'}}>
            <div style={{fontFamily: display, fontSize: language === 'zh' ? 20 : 17, letterSpacing: -0.5}}>{word}</div>
            <div style={{marginTop: 9, fontFamily: sans, fontSize: language === 'zh' ? 11 : 10, lineHeight: 1.35, color: index === active ? C.black : 'rgba(242,238,227,.55)'}}>{c.reviewNotes[index]}</div>
          </div>
        ))}
      </div>

      <div style={{position: 'absolute', left: 40, bottom: 8, fontFamily: display, fontSize: 94, letterSpacing: -6, color: 'rgba(242,238,227,.08)', whiteSpace: 'nowrap'}}>STYLE / IDENTITY / TASK / SPEC</div>
      <Grain />
    </AbsoluteFill>
  );
};

const Closing: React.FC<{frame: number; language: Language}> = ({frame, language}) => {
  const c = copy[language];
  const opacity = p(frame, 832, 858);
  const local = frame - 834;
  const enter = easeOut(p(local, 8, 58));

  return (
    <AbsoluteFill style={{opacity, overflow: 'hidden', background: C.black}}>
      <div style={{position: 'absolute', left: 48, top: 80, width: 470, height: 566, overflow: 'hidden'}}>
        <Img src={staticFile('studio/production-wall.png')} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '49% 50%', filter: 'saturate(.74) contrast(1.06)', transform: `scale(${interpolate(p(local, 0, 96), [0, 1], [1.12, 1.04])})`}} />
        <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 55%, rgba(8,9,8,.72))'}} />
        <div style={{position: 'absolute', left: 18, bottom: 18, fontFamily: sans, fontSize: 9, fontWeight: 800, letterSpacing: 1.7, color: C.paper}}>PROJECT MEMORY / VERSION 02</div>
      </div>

      <div style={{position: 'absolute', left: 568, top: 120, right: 55, opacity: enter, transform: `translateY(${interpolate(enter, [0, 1], [36, 0])}px)`}}>
        <div style={{fontFamily: serif, fontSize: language === 'zh' ? 49 : 42, lineHeight: 1.05, letterSpacing: -2.2, color: C.paper}}>{c.close.map((line) => <div key={line}>{line}</div>)}</div>
        <div style={{marginTop: 27, width: interpolate(enter, [0, 1], [0, 154]), height: 8, background: C.orange}} />
        <div style={{marginTop: 24, maxWidth: 610, fontFamily: sans, fontSize: language === 'zh' ? 15 : 14, lineHeight: 1.6, color: 'rgba(242,238,227,.62)'}}>{c.closeNote}</div>
      </div>

      <div style={{position: 'absolute', left: 568, right: 55, top: 408, height: 174}}>
        {['STYLE.md', 'SKILL.md', 'style-pack.json'].map((file, index) => {
          const cardIn = easeOut(p(local, 36 + index * 10, 72 + index * 10));
          return (
            <div key={file} style={{position: 'absolute', left: index * 155, top: index * 9, width: 210, height: 126, padding: '18px 17px', background: index === 1 ? C.orange : C.paper, color: C.ink, border: `1px solid ${index === 1 ? C.orange : C.paper}`, transform: `translateX(${interpolate(cardIn, [0, 1], [48, 0])}px) rotate(${[-2.4, 1.5, -1][index]}deg)`, opacity: cardIn, boxShadow: '10px 14px 0 rgba(0,0,0,.22)'}}>
              <div style={{width: 38, height: 5, background: index === 1 ? C.black : C.orange}} />
              <div style={{marginTop: 36, fontFamily: sans, fontSize: 16, fontWeight: 800}}>{file}</div>
              <div style={{marginTop: 8, fontFamily: sans, fontSize: 8, letterSpacing: 1.3, opacity: 0.52}}>VERSIONED / PORTABLE / REVIEWABLE</div>
            </div>
          );
        })}
      </div>

      <div style={{position: 'absolute', left: 548, bottom: -13, fontFamily: display, fontSize: 105, letterSpacing: -7, color: 'rgba(242,238,227,.055)', whiteSpace: 'nowrap'}}>KEEP THE KNOW-HOW</div>
      <Grain />
    </AbsoluteFill>
  );
};

export const ArtDirectorFilm: React.FC<ArtDirectorFilmProps> = ({language, startFrame = 0}) => {
  const frame = useCurrentFrame() + startFrame;
  return (
    <AbsoluteFill style={{background: C.black}}>
      {frame < 228 && <Opening frame={frame} language={language} />}
      {frame >= 145 && frame < 340 && <BoardReveal frame={frame} language={language} />}
      {frame >= 282 && frame < 502 && <StyleDirections frame={frame} language={language} />}
      {frame >= 458 && frame < 662 && <TemplateSwitcher frame={frame} language={language} />}
      {frame >= 610 && frame < 792 && <TeamPipeline frame={frame} language={language} />}
      {frame >= 738 && frame < 872 && <ReviewLens frame={frame} language={language} />}
      {frame >= 816 && <Closing frame={frame} language={language} />}
      <Rail frame={frame} language={language} />
      <div style={{position: 'absolute', left: 36, bottom: 22, fontFamily: sans, fontSize: 8, fontWeight: 800, letterSpacing: 1.7, color: 'rgba(242,238,227,.34)', zIndex: 40}}>{copy[language].footer}</div>
    </AbsoluteFill>
  );
};

export const ArtDirectorSocialPreview: React.FC = () => (
  <AbsoluteFill style={{background: C.black, color: C.paper, overflow: 'hidden'}}>
    <div style={{position: 'absolute', left: 42, right: 42, top: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: sans, fontSize: 10, fontWeight: 800, letterSpacing: 2.2}}>
      <span>ART DIRECTOR <span style={{color: C.orange}}>●</span></span>
      <span style={{color: 'rgba(242,238,227,.48)'}}>TEAM JUDGEMENT / PROJECT MEMORY</span>
      <span>V 0.2</span>
    </div>
    <div style={{position: 'absolute', left: 42, right: 42, top: 54, height: 1, background: C.line}} />

    <div style={{position: 'absolute', left: 48, top: 102, width: 590}}>
      <div style={{fontFamily: serif, fontSize: 65, lineHeight: .95, letterSpacing: -3.4}}>One direction<br/>has to move<br/>an entire team.</div>
      <div style={{marginTop: 28, width: 175, height: 9, background: C.orange}} />
      <div style={{marginTop: 23, width: 480, fontFamily: sans, fontSize: 15, lineHeight: 1.55, color: 'rgba(242,238,227,.67)'}}>Turn an art director’s judgement into focused briefs, asset families, first-piece gates, and a version the whole team can keep using.</div>
    </div>

    <div style={{position: 'absolute', left: 676, top: 86, width: 554, height: 468, overflow: 'hidden', background: C.ink}}>
      <Img src={staticFile('studio/team-review.png')} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '58% 48%', filter: 'saturate(.82) contrast(1.04)'}} />
      <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 56%, rgba(8,9,8,.76))'}} />
      <div style={{position: 'absolute', left: 18, right: 18, bottom: 18, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6}}>
        {['BASELINE', 'BRIEF', 'FAMILY', 'VERSION'].map((label, index) => <div key={label} style={{padding: '9px 7px', background: index === 0 ? C.orange : 'rgba(8,9,8,.78)', color: index === 0 ? C.black : C.paper, fontFamily: sans, fontSize: 8, fontWeight: 800, letterSpacing: 1.1, textAlign: 'center'}}>{label}</div>)}
      </div>
    </div>

    <div style={{position: 'absolute', left: 48, bottom: 42, display: 'flex', gap: 8}}>
      {['GAMES', 'UI SYSTEMS', 'CAMPAIGNS', 'POSTERS'].map((label, index) => <div key={label} style={{padding: '8px 10px', border: `1px solid ${index === 0 ? C.orange : C.line}`, color: index === 0 ? C.orange : 'rgba(242,238,227,.58)', fontFamily: sans, fontSize: 8, fontWeight: 800, letterSpacing: 1.2}}>{label}</div>)}
    </div>
    <div style={{position: 'absolute', left: 43, bottom: -28, fontFamily: display, fontSize: 96, letterSpacing: -6, color: 'rgba(242,238,227,.045)', whiteSpace: 'nowrap'}}>BUILD THE STANDARD / KEEP THE KNOW-HOW</div>
    <div style={{position: 'absolute', right: 590, top: 74, width: 62, height: 62, borderRadius: 99, background: C.orange}} />
    <Grain opacity={0.08} />
  </AbsoluteFill>
);
