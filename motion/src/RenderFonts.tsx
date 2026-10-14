import React, {useEffect, useState} from 'react';
import {cancelRender, continueRender, delayRender, staticFile} from 'remotion';

export const uiFont = '"AD YaHei", "Microsoft YaHei", "PingFang SC", SimHei, "Noto Sans CJK SC", sans-serif';

// Local render-only fonts. System font files are never distributed with the Skill.
export const RenderFonts: React.FC<{enabled?: boolean}> = ({enabled = false}) => {
  const [handle] = useState(() => enabled ? delayRender('Load the local YaHei render fonts') : null);
  useEffect(() => {
    if (handle === null) return;
    const regular = new FontFace('AD YaHei', `url("${staticFile('render-fonts/yahei-regular.ttf')}")`, {weight: '400'});
    const bold = new FontFace('AD YaHei', `url("${staticFile('render-fonts/yahei-bold.ttf')}")`, {weight: '600 900'});
    Promise.all([regular.load(), bold.load()]).then(fonts => {
      fonts.forEach(font => document.fonts.add(font));
      continueRender(handle);
    }).catch(error => cancelRender(new Error(`Unable to load YaHei for the render: ${error}`)));
  }, [handle]);
  return null;
};

export const fieldFont = '"AD Field", "Noto Sans SC", sans-serif';
export const displayFont = (language: 'en' | 'zh') => language === 'en'
  ? '"Bree Serif", Georgia, serif'
  : '"Harbor Brush Display", "AD Field", sans-serif';
export const FieldFonts: React.FC = () => {
  const [handle] = useState(() => delayRender('Load the OFL variable presentation font'));
  useEffect(() => {
    const faces = [
      new FontFace('AD Field', `url("${staticFile('fonts/field-sans.woff2')}")`, {weight: '100 900'}),
      new FontFace('Bree Serif', `url("${staticFile('fonts/BreeSerif-Regular.ttf')}")`, {weight: '400'}),
      new FontFace('Harbor Brush Display', `url("${staticFile('fonts/harbor-brush.woff2')}")`, {weight: '500'}),
    ];
    Promise.all(faces.map(face => face.load())).then(fonts => {
      fonts.forEach(font => document.fonts.add(font));
      continueRender(handle);
    }).catch(error => cancelRender(new Error(`Unable to load the presentation font: ${error}`)));
  }, [handle]);
  return null;
};
