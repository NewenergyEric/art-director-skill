# Motion showcase

The README film is a 30-second bilingual Remotion composition. It uses one continuous production board as the hero element rather than a stack of independent slides.

## Preview

```sh
npm install
npm run motion:studio
```

Available compositions:

- `ArtDirectorZH` / `ArtDirectorEN` — 30-second master films
- `SocialPreview` — 1280 × 640 repository social preview
- `StyleDirectionsZH` / `StyleDirectionsEN` — pseudo-3D items, comic brief, traditional cards, and painterly card family
- `TemplateSwitchZH` / `TemplateSwitchEN` — character, item, UI, skill/VFX, match, puzzle, and tabletop templates
- `TeamPipelineZH` / `TeamPipelineEN` — four production lanes from brief to batch
- `ReviewLensZH` / `ReviewLensEN` — style, identity, task, and specification review

## Render release media

```sh
npm run motion:render
```

`scripts/render_motion_assets.py` renders Remotion MP4s, adds a locally generated original sound bed, derives bandwidth-conscious palette GIFs and four focused proof clips, and updates the reduced-motion stills. It requires Python 3.10+, FFmpeg, Node.js 20+, and npm.

Set `REMOTION_BROWSER_EXECUTABLE` when Chrome or Edge is installed outside its default location. No network call is made by the film or its render script after dependencies and Remotion's browser runtime are installed.
