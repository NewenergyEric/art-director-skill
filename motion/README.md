# Motion showcase

The presentation has a six-second continuous spatial README preview and an 18-second bilingual spatial film, alongside the retained twelve-second readable preview and 70-second walkthrough. The full film retains the continuous production board, seven templates and four team lanes. GitHub embeds only the short preview; the site plays the full film and focused clips as 30 fps H.264 videos.

## Preview

```sh
npm install
npm run motion:studio
```

Available compositions:

- `QuickPreviewZH` / `QuickPreviewEN` — twelve-second overview with long reading holds
- `DepthShowcaseZH` / `DepthShowcaseEN` — 18-second spatial poster film
- `DepthPreviewZH` / `DepthPreviewEN` — six-second complete periodic orbit
- `ArtDirectorZH` / `ArtDirectorEN` — 70-second master films
- `SocialPreview` — 1280 × 640 repository social preview
- `StyleDirectionsZH` / `StyleDirectionsEN` — pseudo-3D items, comic brief, traditional cards, and painterly card family
- `TemplateSwitchZH` / `TemplateSwitchEN` — character, item, UI, skill/VFX, match, puzzle, and tabletop templates
- `TeamPipelineZH` / `TeamPipelineEN` — four production lanes from brief to batch
- `ReviewLensZH` / `ReviewLensEN` — style, identity, task, and specification review

## Render release media

```sh
npm run motion:render
```

`scripts/render_motion_assets.py` renders Remotion MP4s, adds an original sound bed, derives a 1100 px / 20 fps preview GIF and four focused clips, and updates posters, reduced-motion stills and the checksum manifest. It requires Python 3.10+, FFmpeg, Node.js 20+, and npm. The web film and focused clips are 1100 × 618 at 30 fps; the short web preview is 1280 × 720 at 30 fps. Run `python evals/presentation/check.py --probe` to verify media sizes, codecs, frame rates and local links.

The spatial compositions load the bundled OFL variable Noto Sans SC font (`motion/public/fonts/field-sans.woff2`), shared with the website. The poster combines 380 and 820 weights, a skew, and text overlapping artwork. Run `python scripts/render_depth_showcase.py` to regenerate both languages, GIFs, posters and compressed web boards. All 17 compositions are listed by `npm run motion:check`.

The retained walkthrough uses Microsoft YaHei / SimHei. On Windows, optional render-only YaHei subsets are loaded explicitly from ignored `motion/public/render-fonts/yahei-regular.ttf` and `yahei-bold.ttf`. Generate them from locally licensed system fonts; never commit these font files. Without those subsets, rendering uses the installed sans-serif stack. Web pages use a separate OFL-licensed Noto Sans SC fallback in `docs/assets/fonts/`.

Set `REMOTION_BROWSER_EXECUTABLE` when Chrome or Edge is installed outside its default location. No network call is made by the film or its render script after dependencies and Remotion's browser runtime are installed.
