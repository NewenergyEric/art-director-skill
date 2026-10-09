import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export type ArtDirectorFilmProps = {
  language: 'zh' | 'en';
};

const C = {
  canvas: '#f3f0e8',
  paper: '#fffdfa',
  ink: '#151515',
  muted: '#706e68',
  line: 'rgba(21,21,21,.16)',
  yellow: '#f4cb45',
  red: '#f04d32',
  mint: '#34ad98',
  blue: '#4066e8',
};

const words = {
  zh: {
    intro: {
      eyebrow: 'FOR GAME ART TEAMS',
      line: '把总监和团队已经做对的事，留在项目里。',
      small: '给游戏美术团队的项目记忆',
    },
    family: {
      step: '01 / 一套方向，不只一张图',
      title: '同一个项目里，角色、场景、棋子和特效得像一家人。',
      note: '复杂世界观要守住气质。轻量漫画风要扛得住成批生产。',
      groups: ['角色 / 场景', '棋子 / 道具', 'UI / 动效', '状态 / 变体'],
    },
    team: {
      step: '02 / 团队开始生产',
      title: '总监定方向。团队各自开工。',
      note: '每个人拿到自己的任务，也拿到同一份项目判断。',
      phases: ['定方向', '写任务', '看一批', '留版本'],
      lanes: ['角色 / 场景', '棋子 / 道具', 'UI / 动效', '外包 / 批量'],
      aside: ['同一份', '项目记忆'],
      asideNote: '换人、换 Agent，也从已经确认的地方继续。',
    },
    rules: {
      step: '03 / 把“感觉”说清楚',
      title: '“不对”到底是哪儿不对？',
      layers: [
        ['画风', '不像这个项目'],
        ['身份', '角色或道具认不出来'],
        ['本次', '这次要做什么没说清'],
        ['规格', '尺寸、透明、格式不对'],
      ],
      note: '分开记录，修改才不会串线。',
    },
    close: {
      step: '04 / PROJECT MEMORY',
      title: ['做过的判断，', '留给下一轮。'],
      note: '总监定方向，团队接着做。换人、换 Agent、换一轮，也不用重新猜。',
      files: ['STYLE.md', 'SKILL.md', 'style-pack.json'],
    },
  },
  en: {
    intro: {
      eyebrow: 'FOR GAME ART TEAMS',
      line: "Keep the team's good decisions inside the project.",
      small: 'Project memory for game-art teams',
    },
    family: {
      step: '01 / ONE DIRECTION, MORE THAN ONE IMAGE',
      title: 'Characters, worlds, tiles, and effects should feel like they belong together.',
      note: 'A complex world needs a consistent mood. A simple comic style has to survive production at scale.',
      groups: ['CHARACTER / WORLD', 'TILES / PROPS', 'UI / MOTION', 'STATES / VARIANTS'],
    },
    team: {
      step: '02 / THE TEAM STARTS MAKING',
      title: 'The director sets the direction. The team gets to work.',
      note: 'Each person gets a focused brief and the same project judgement.',
      phases: ['DIRECTION', 'BRIEF', 'BATCH REVIEW', 'SAVE VERSION'],
      lanes: ['CHARACTER / WORLD', 'TILES / PROPS', 'UI / MOTION', 'OUTSOURCE / BATCH'],
      aside: ['ONE SHARED', 'PROJECT MEMORY'],
      asideNote: 'A new person or agent starts from what the team already approved.',
    },
    rules: {
      step: '03 / SAY WHAT FEELS WRONG',
      title: 'What, exactly, is wrong?',
      layers: [
        ['STYLE', 'It does not look like this project'],
        ['IDENTITY', 'The character or prop is no longer recognizable'],
        ['TASK', 'The change for this round is unclear'],
        ['SPEC', 'Size, alpha, or format is wrong'],
      ],
      note: 'Keep these decisions separate so one fix does not rewrite the whole project.',
    },
    close: {
      step: '04 / PROJECT MEMORY',
      title: ['Keep the decisions.', 'Start the next round from there.'],
      note: 'The director sets direction. The team keeps moving. New person, new agent, new round: no need to guess again.',
      files: ['STYLE.md', 'SKILL.md', 'style-pack.json'],
    },
  },
} as const;

const edge = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

const reveal = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], edge);

const sceneOpacity = (frame: number, start: number, end: number, feather = 16) =>
  reveal(frame, start, start + feather) * (1 - reveal(frame, end - feather, end));

const sans = 'Arial, Microsoft YaHei, Noto Sans CJK SC, sans-serif';
const display = 'Arial Black, Arial, Microsoft YaHei, sans-serif';

const Grid: React.FC = () => (
  <AbsoluteFill
    style={{
      backgroundColor: C.canvas,
      backgroundImage:
        'linear-gradient(rgba(21,21,21,.065) 1px, transparent 1px), linear-gradient(90deg, rgba(21,21,21,.065) 1px, transparent 1px)',
      backgroundSize: '32px 32px',
    }}
  />
);

const Texture: React.FC = () => (
  <AbsoluteFill
    style={{
      pointerEvents: 'none',
      opacity: 0.045,
      mixBlendMode: 'multiply',
      backgroundImage:
        'repeating-radial-gradient(circle at 27% 19%, rgba(40,30,20,.7) 0 .45px, transparent .6px 3px)',
      backgroundSize: '8px 8px',
    }}
  />
);

const Meta: React.FC<{children: React.ReactNode}> = ({children}) => (
  <div style={{fontFamily: sans, fontSize: 11, fontWeight: 800, letterSpacing: 2.4, color: C.muted}}>
    {children}
  </div>
);

const PaperImage: React.FC<{
  src: string;
  left: number;
  top: number;
  width: number;
  height: number;
  progress: number;
  objectPosition?: string;
  rotate?: number;
}> = ({src, left, top, width, height, progress, objectPosition = '50% 50%', rotate = 0}) => (
  <div
    style={{
      position: 'absolute',
      left,
      top,
      width,
      height,
      padding: 9,
      border: `1px solid ${C.line}`,
      background: C.paper,
      boxShadow: '0 20px 50px rgba(30,24,15,.12)',
      transform: `translateY(${interpolate(progress, [0, 1], [42, 0])}px) rotate(${rotate}deg)`,
      opacity: progress,
      overflow: 'hidden',
    }}
  >
    <Img
      src={src}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition,
        transform: `scale(${interpolate(progress, [0, 1], [1.08, 1])})`,
      }}
    />
  </div>
);

const Intro: React.FC<{language: 'zh' | 'en'}> = ({language}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const c = words[language].intro;
  const opacity = sceneOpacity(frame, 0, 104, 16);
  const enter = spring({frame: frame - 5, fps, config: {damping: 20, stiffness: 95, mass: 1.05}});
  const imageA = reveal(frame, 17, 37);

  return (
    <AbsoluteFill style={{opacity, overflow: 'hidden'}}>
      <Grid />
      <div style={{position: 'absolute', left: 58, top: 42, right: 58, display: 'flex', justifyContent: 'space-between'}}>
        <Meta>AD / 00</Meta>
        <Meta>{c.eyebrow}</Meta>
      </div>
      <div style={{position: 'absolute', left: 58, top: 78, width: 1164, height: 1, background: C.ink}} />
      <div
        style={{
          position: 'absolute',
          left: 58,
          top: 122,
          fontFamily: display,
          fontSize: 104,
          fontWeight: 900,
          lineHeight: 0.78,
          letterSpacing: -7,
          color: C.ink,
          opacity: enter,
          transform: `translateX(${interpolate(enter, [0, 1], [-45, 0])}px)`,
        }}
      >
        <div style={{fontFamily: 'Georgia, Times New Roman, serif', fontStyle: 'italic', fontWeight: 700, letterSpacing: -5}}>ART</div>
        <div style={{position: 'relative', zIndex: 2}}>DIRECTOR</div>
      </div>
      <div style={{position: 'absolute', left: 58, top: 325, width: interpolate(reveal(frame, 19, 39), [0, 1], [0, 335]), height: 28, background: C.yellow}} />
      <div style={{position: 'absolute', left: 59, top: 397, width: 590}}>
        <div style={{fontFamily: sans, fontSize: language === 'zh' ? 27 : 24, fontWeight: 800, lineHeight: 1.4, color: C.ink}}>{c.line}</div>
        <div style={{marginTop: 18, display: 'flex', alignItems: 'center', gap: 14}}>
          <div style={{width: 44, height: 4, background: C.red}} />
          <Meta>{c.small}</Meta>
        </div>
      </div>
      <PaperImage src={staticFile('studio/team-review.png')} left={690} top={111} width={518} height={470} progress={imageA} objectPosition="55% 50%" rotate={1.1} />
      <div style={{position: 'absolute', left: 664, top: 96, width: 52, height: 52, borderRadius: 99, background: C.red, opacity: reveal(frame, 35, 45)}} />
      <div style={{position: 'absolute', left: 1000, top: 564, width: 198, height: 28, background: C.yellow, transform: 'rotate(1.1deg)', opacity: imageA}} />
      <div style={{position: 'absolute', left: 1021, top: 571, fontFamily: sans, fontSize: 9, fontWeight: 800, letterSpacing: 1.5, color: C.ink, opacity: imageA}}>TEAM REVIEW / 01</div>
      <div style={{position: 'absolute', left: 58, bottom: 34}}><Meta>ART-DIRECTOR / PROJECT MEMORY / 0.1</Meta></div>
      <Texture />
    </AbsoluteFill>
  );
};

const AssetFamily: React.FC<{language: 'zh' | 'en'}> = ({language}) => {
  const frame = useCurrentFrame();
  const c = words[language].family;
  const local = frame - 82;
  const opacity = sceneOpacity(frame, 82, 214, 18);
  const main = reveal(local, 8, 28);
  const side = reveal(local, 22, 42);
  const text = reveal(local, 35, 55);

  return (
    <AbsoluteFill style={{opacity, overflow: 'hidden'}}>
      <Grid />
      <div style={{position: 'absolute', left: 52, top: 36}}><Meta>{c.step}</Meta></div>
      <div style={{position: 'absolute', right: 54, top: 30, fontFamily: display, fontSize: 54, letterSpacing: -3, color: C.ink}}>01</div>
      <div style={{position: 'absolute', left: 52, right: 52, top: 78, height: 1, background: C.ink}} />
      <PaperImage src={staticFile('maple-corner/style-board.png')} left={52} top={105} width={750} height={501} progress={main} objectPosition="43% 50%" />
      <PaperImage src={staticFile('maple-corner/asset-family.png')} left={823} top={105} width={405} height={501} progress={side} objectPosition="50% 50%" />
      <div
        style={{
          position: 'absolute',
          left: 76,
          top: 126,
          width: language === 'zh' ? 620 : 670,
          padding: '15px 18px 18px',
          background: 'rgba(255,253,250,.91)',
          borderLeft: `5px solid ${C.yellow}`,
          opacity: text,
          transform: `translateY(${interpolate(text, [0, 1], [18, 0])}px)`,
        }}
      >
        <div style={{fontFamily: display, fontSize: language === 'zh' ? 34 : 30, lineHeight: 1.17, letterSpacing: language === 'zh' ? -1.2 : -1.4, color: C.ink}}>{c.title}</div>
        <div style={{marginTop: 12, fontFamily: sans, fontSize: 14, lineHeight: 1.55, color: C.muted}}>{c.note}</div>
      </div>
      <div style={{position: 'absolute', left: 52, right: 52, bottom: 42, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: `1px solid ${C.ink}`, opacity: reveal(local, 66, 84)}}>
        {c.groups.map((group, index) => (
          <div key={group} style={{padding: '12px 10px 0', borderLeft: index === 0 ? 'none' : `1px solid ${C.line}`, fontFamily: sans, fontSize: 11, fontWeight: 800, letterSpacing: 1.3, color: index === 2 ? C.red : C.ink}}>{group}</div>
        ))}
      </div>
      <Texture />
    </AbsoluteFill>
  );
};

const TeamBoard: React.FC<{language: 'zh' | 'en'}> = ({language}) => {
  const frame = useCurrentFrame();
  const c = words[language].team;
  const local = frame - 190;
  const opacity = sceneOpacity(frame, 190, 316, 18);
  const intro = reveal(local, 7, 28);
  const phaseCenters = [238, 420, 602, 784];

  return (
    <AbsoluteFill style={{opacity, overflow: 'hidden'}}>
      <Grid />
      <div style={{position: 'absolute', left: 52, top: 34}}><Meta>{c.step}</Meta></div>
      <div style={{position: 'absolute', right: 52, top: 30, fontFamily: display, fontSize: 54, letterSpacing: -3, color: C.ink}}>02</div>
      <div style={{position: 'absolute', left: 52, right: 52, top: 78, height: 1, background: C.ink}} />
      <div style={{position: 'absolute', left: 52, top: 105, width: 864}}>
        <div style={{fontFamily: display, fontSize: language === 'zh' ? 42 : 37, letterSpacing: -1.8, lineHeight: 1.1, color: C.ink, opacity: intro, transform: `translateX(${interpolate(intro, [0, 1], [-25, 0])}px)`}}>{c.title}</div>
        <div style={{marginTop: 12, fontFamily: sans, fontSize: 15, color: C.muted, opacity: intro}}>{c.note}</div>
      </div>
      <div style={{position: 'absolute', left: 52, top: 220, width: 864}}>
        <div style={{position: 'absolute', left: 154, right: 0, top: 17, height: 1, background: C.line}} />
        {c.phases.map((phase, index) => (
          <div key={phase} style={{position: 'absolute', left: phaseCenters[index], top: 0, transform: 'translateX(-50%)', fontFamily: sans, fontWeight: 800, fontSize: language === 'zh' ? 12 : 10, letterSpacing: 1.2, color: index === 3 ? C.red : C.muted}}>{phase}</div>
        ))}
        {c.lanes.map((lane, laneIndex) => {
          const y = 54 + laneIndex * 77;
          const p = reveal(local, 28 + laneIndex * 7, 78 + laneIndex * 7);
          const color = [C.mint, C.blue, C.red, C.yellow][laneIndex];
          return (
            <div key={lane} style={{position: 'absolute', left: 0, top: y, width: 864, height: 58, borderBottom: `1px solid ${C.line}`, opacity: reveal(local, 19 + laneIndex * 5, 36 + laneIndex * 5)}}>
              <div style={{position: 'absolute', left: 0, top: 20, width: 136, fontFamily: sans, fontSize: language === 'zh' ? 13 : 10, fontWeight: 800, letterSpacing: 1, color: C.ink}}>{lane}</div>
              <div style={{position: 'absolute', left: 154, top: 25, width: 685, height: 2, background: 'rgba(21,21,21,.13)'}} />
              <div style={{position: 'absolute', left: 154, top: 21, width: interpolate(p, [0, 1], [0, 685]), height: 10, background: color}} />
              {phaseCenters.map((x, point) => {
                const threshold = [0.16, 0.42, 0.68, 0.92][point];
                const active = reveal(p, threshold - 0.08, threshold);
                return <div key={x} style={{position: 'absolute', left: x - 7, top: 19, width: 14, height: 14, borderRadius: 99, background: active > 0.5 ? C.ink : C.paper, border: `2px solid ${C.ink}`, transform: `scale(${interpolate(active, [0, 1], [.72, 1])})`}} />;
              })}
            </div>
          );
        })}
      </div>
      <div style={{position: 'absolute', right: 52, top: 105, width: 270, height: 520, border: `1px solid ${C.ink}`, background: C.yellow, padding: '28px 25px', opacity: reveal(local, 42, 62)}}>
        <div style={{fontFamily: display, fontSize: language === 'zh' ? 43 : 38, lineHeight: .98, letterSpacing: -2.2, color: C.ink}}>
          <div>{c.aside[0]}</div>
          <div>{c.aside[1]}</div>
        </div>
        <div style={{marginTop: 20, width: 56, height: 5, background: C.red}} />
        <div style={{marginTop: 24, fontFamily: sans, fontSize: language === 'zh' ? 14 : 13, lineHeight: 1.6, color: C.ink}}>{c.asideNote}</div>
        <div style={{position: 'absolute', left: 22, right: 22, bottom: 22, height: 176, overflow: 'hidden', border: `1px solid ${C.ink}`, background: C.paper}}>
          <Img src={staticFile('studio/team-review.png')} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '67% 57%', transform: `scale(${interpolate(local, [40, 126], [1.05, 1.14], edge)})`}} />
        </div>
      </div>
      <Texture />
    </AbsoluteFill>
  );
};

const RuleBands: React.FC<{language: 'zh' | 'en'}> = ({language}) => {
  const frame = useCurrentFrame();
  const c = words[language].rules;
  const local = frame - 292;
  const opacity = sceneOpacity(frame, 292, 368, 14);

  return (
    <AbsoluteFill style={{opacity, overflow: 'hidden', background: C.yellow}}>
      <div style={{position: 'absolute', left: 52, top: 34}}><Meta>{c.step}</Meta></div>
      <div style={{position: 'absolute', right: 52, top: 30, fontFamily: display, fontSize: 54, letterSpacing: -3, color: C.ink}}>03</div>
      <div style={{position: 'absolute', left: 52, right: 52, top: 78, height: 1, background: C.ink}} />
      <div style={{position: 'absolute', left: 52, top: 103, fontFamily: display, fontSize: language === 'zh' ? 46 : 43, fontWeight: 900, letterSpacing: -2.1, color: C.ink}}>{c.title}</div>
      <div style={{position: 'absolute', left: 52, top: 183, width: 1176}}>
        {c.layers.map((layer, index) => {
          const p = reveal(local, 12 + index * 8, 31 + index * 8);
          const isDark = index === 1 || index === 3;
          return (
            <div
              key={layer[0]}
              style={{
                height: 91,
                display: 'grid',
                gridTemplateColumns: '220px 1fr 58px',
                alignItems: 'center',
                padding: '0 22px',
                borderTop: `1px solid ${C.ink}`,
                background: isDark ? C.ink : 'rgba(255,253,250,.74)',
                color: isDark ? C.paper : C.ink,
                clipPath: `inset(0 ${interpolate(p, [0, 1], [100, 0])}% 0 0)`,
              }}
            >
              <div style={{fontFamily: display, fontSize: language === 'zh' ? 25 : 21, letterSpacing: -0.7}}>{layer[0]}</div>
              <div style={{fontFamily: sans, fontSize: language === 'zh' ? 20 : 17, fontWeight: 700}}>{layer[1]}</div>
              <div style={{fontFamily: sans, fontSize: 11, letterSpacing: 2, textAlign: 'right', opacity: .55}}>0{index + 1}</div>
            </div>
          );
        })}
        <div style={{height: 1, background: C.ink}} />
      </div>
      <div style={{position: 'absolute', left: 52, bottom: 35, display: 'flex', alignItems: 'center', gap: 14, opacity: reveal(local, 46, 60)}}>
        <div style={{width: 44, height: 4, background: C.red}} />
        <div style={{fontFamily: sans, fontSize: 14, fontWeight: 700, color: C.ink}}>{c.note}</div>
      </div>
      <Texture />
    </AbsoluteFill>
  );
};

const Closing: React.FC<{language: 'zh' | 'en'}> = ({language}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const c = words[language].close;
  const local = frame - 346;
  const opacity = reveal(frame, 346, 364);
  const enter = spring({frame: local - 8, fps, config: {damping: 22, stiffness: 86}});

  return (
    <AbsoluteFill style={{opacity, overflow: 'hidden'}}>
      <Grid />
      <div style={{position: 'absolute', left: 58, top: 42}}><Meta>{c.step}</Meta></div>
      <div style={{position: 'absolute', right: 58, top: 42}}><Meta>ART DIRECTOR / 0.1</Meta></div>
      <div style={{position: 'absolute', left: 58, right: 58, top: 78, height: 1, background: C.ink}} />
      <div style={{position: 'absolute', left: 58, top: 138, width: language === 'zh' ? 760 : 820, opacity: enter, transform: `translateY(${interpolate(enter, [0, 1], [34, 0])}px)`}}>
        <div style={{fontFamily: display, fontSize: language === 'zh' ? 66 : 57, lineHeight: 1.04, fontWeight: 900, letterSpacing: language === 'zh' ? -3.4 : -3.1, color: C.ink}}>
          <div>{c.title[0]}</div>
          <div>{c.title[1]}</div>
        </div>
        <div style={{marginTop: 24, width: 118, height: 9, background: C.yellow}} />
        <div style={{marginTop: 24, maxWidth: 710, fontFamily: sans, fontSize: language === 'zh' ? 18 : 16, lineHeight: 1.65, color: C.muted}}>{c.note}</div>
      </div>
      <div style={{position: 'absolute', right: 69, top: 129, width: 328, height: 390}}>
        {c.files.map((file, index) => {
          const p = reveal(local, 23 + index * 8, 43 + index * 8);
          return (
            <div
              key={file}
              style={{
                position: 'absolute',
                left: 16 + index * 18,
                top: 38 + index * 78,
                width: 278,
                height: 142,
                background: index === 1 ? C.ink : C.paper,
                color: index === 1 ? C.paper : C.ink,
                border: `1px solid ${C.ink}`,
                boxShadow: '8px 11px 0 rgba(21,21,21,.1)',
                transform: `translateX(${interpolate(p, [0, 1], [55, 0])}px) rotate(${[-3, 2, -1][index]}deg)`,
                opacity: p,
                padding: '22px 20px',
              }}
            >
              <div style={{width: 52, height: 8, background: index === 1 ? C.red : C.yellow}} />
              <div style={{marginTop: 34, fontFamily: sans, fontSize: 19, fontWeight: 800}}>{file}</div>
              <div style={{marginTop: 8, fontFamily: sans, fontSize: 9, letterSpacing: 1.7, opacity: .56}}>PROJECT MEMORY</div>
            </div>
          );
        })}
      </div>
      <div style={{position: 'absolute', left: 58, right: 58, bottom: 44, borderTop: `1px solid ${C.ink}`, paddingTop: 17, display: 'flex', justifyContent: 'space-between'}}>
        <div style={{fontFamily: display, fontSize: 17, letterSpacing: -0.4, color: C.ink}}>ART DIRECTOR<span style={{color: C.red}}>●</span></div>
        <Meta>MAKE THE TEAM'S JUDGEMENT LAST</Meta>
      </div>
      <Texture />
    </AbsoluteFill>
  );
};

export const ArtDirectorFilm: React.FC<ArtDirectorFilmProps> = ({language}) => (
  <AbsoluteFill style={{background: C.canvas}}>
    <Intro language={language} />
    <AssetFamily language={language} />
    <TeamBoard language={language} />
    <RuleBands language={language} />
    <Closing language={language} />
  </AbsoluteFill>
);
