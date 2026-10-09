import React from 'react';
import {Composition} from 'remotion';
import {ArtDirectorFilm, type ArtDirectorFilmProps} from './ArtDirectorFilm';

const shared = {
  component: ArtDirectorFilm,
  durationInFrames: 420,
  fps: 30,
  width: 1280,
  height: 720,
} as const;

export const RemotionRoot: React.FC = () => (
  <>
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
  </>
);
