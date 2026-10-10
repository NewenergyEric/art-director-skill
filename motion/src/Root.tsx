import React from 'react';
import {Composition} from 'remotion';
import {ArtDirectorFilm, ArtDirectorSocialPreview, type ArtDirectorFilmProps} from './ArtDirectorFilm';
import {QuickPreview} from './QuickPreview';
import timeline from './timeline.json';

const shared = {
  component: ArtDirectorFilm,
  durationInFrames: timeline.masterFrames,
  fps: 30,
  width: 1280,
  height: 720,
} as const;

const clips = timeline.clips;

export const RemotionRoot: React.FC = () => (
  <>
    {(['zh', 'en'] as const).map(language => <Composition
      key={language}
      id={language === 'zh' ? 'QuickPreviewZH' : 'QuickPreviewEN'}
      component={QuickPreview}
      durationInFrames={timeline.previewFrames}
      fps={30}
      width={1280}
      height={720}
      defaultProps={{language}}
    />)}
    <Composition<ArtDirectorFilmProps>
      id="ArtDirectorZH"
      {...shared}
      defaultProps={{language: 'zh'}}
    />
    <Composition<ArtDirectorFilmProps>
      id="ArtDirectorEN"
      {...shared}
      defaultProps={{language: 'en'}}
    />
    <Composition
      id="SocialPreview"
      component={ArtDirectorSocialPreview}
      durationInFrames={1}
      fps={30}
      width={1280}
      height={640}
    />
    {clips.flatMap((clip) => [
      <Composition<ArtDirectorFilmProps>
        key={`${clip.name}ZH`}
        id={`${clip.name}ZH`}
        component={ArtDirectorFilm}
        durationInFrames={clip.duration}
        fps={30}
        width={1280}
        height={720}
        defaultProps={{language: 'zh', startFrame: clip.from}}
      />,
      <Composition<ArtDirectorFilmProps>
        key={`${clip.name}EN`}
        id={`${clip.name}EN`}
        component={ArtDirectorFilm}
        durationInFrames={clip.duration}
        fps={30}
        width={1280}
        height={720}
        defaultProps={{language: 'en', startFrame: clip.from}}
      />,
    ])}
  </>
);
