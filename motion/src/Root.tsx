import React from 'react';
import {Composition} from 'remotion';
import {DepthShowcase, DepthSocialPreview, GameArtProof, TidekeeperOverview, DEPTH_FRAMES} from './DepthShowcase';
import {TidekeeperUI} from './TidekeeperUI';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="TidekeeperOverview" component={TidekeeperOverview} durationInFrames={1} fps={30} width={1280} height={800}/>
    {(['director','missing','ready','done','map'] as const).map(stage=><Composition key={stage} id={`Tidekeeper-${stage}`} component={TidekeeperUI} defaultProps={{stage}} durationInFrames={1} fps={30} width={390} height={844}/>)}
    <Composition id="GameArtProof" component={GameArtProof} durationInFrames={1} fps={30} width={1280} height={720}/>
    {(['zh', 'en'] as const).map(language => <Composition
      key={`depth-preview-${language}`}
      id={language === 'zh' ? 'DepthPreviewZH' : 'DepthPreviewEN'}
      component={DepthShowcase}
      durationInFrames={DEPTH_FRAMES}
      fps={30}
      width={1280}
      height={720}
      defaultProps={{language, preview: true}}
    />)}
    {(['zh', 'en'] as const).map(language => <Composition
      key={`depth-${language}`}
      id={language === 'zh' ? 'DepthShowcaseZH' : 'DepthShowcaseEN'}
      component={DepthShowcase}
      durationInFrames={DEPTH_FRAMES}
      fps={30}
      width={1280}
      height={720}
      defaultProps={{language}}
    />)}
    <Composition
      id="SocialPreview"
      component={DepthSocialPreview}
      durationInFrames={1}
      fps={30}
      width={1280}
      height={640}
    />
  </>
);
