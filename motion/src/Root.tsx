import React from 'react';
import {Composition} from 'remotion';
import {DepthShowcase, DepthSocialPreview, DEPTH_FRAMES} from './DepthShowcase';

export const RemotionRoot: React.FC = () => (
  <>
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
