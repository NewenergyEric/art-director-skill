# Motion showcase

The presentation has one canonical visual system: a six-second continuous README preview, an 18-second bilingual spatial film, and a repository social preview. GitHub embeds the short loop; the site plays the 18-second H.264 film.

## Preview

```sh
npm install
npm run motion:studio
```

Available compositions:

- `DepthShowcaseZH` / `DepthShowcaseEN` — 18-second spatial poster film
- `DepthPreviewZH` / `DepthPreviewEN` — six-second complete periodic orbit
- `SocialPreview` — 1280 × 640 repository social preview

## Render release media

```sh
npm run motion:render
```

`scripts/render_depth_showcase.py` renders both languages, derives the 800 px / 20 fps GIFs, renders the social preview, updates posters and compressed web boards, and rewrites the checksum manifest. It requires Python 3.10+, FFmpeg, Node.js 20+, npm, and gifsicle. Run `python evals/presentation/check.py --probe` to verify media sizes, codecs, frame rates and local links.

The spatial compositions load the bundled OFL variable Noto Sans SC font (`motion/public/fonts/field-sans.woff2`), shared with the website. The poster combines 380 and 820 weights, a skew, and text overlapping artwork. Run `python scripts/render_depth_showcase.py` to regenerate both languages, GIFs, posters, social preview and compressed web boards. Five current compositions are listed by `npm run motion:check`.

Set `REMOTION_BROWSER_EXECUTABLE` when Chrome or Edge is installed outside its default location. No network call is made by the film or its render script after dependencies and Remotion's browser runtime are installed.

## Spatial GIF optimization

Install the optional rendering tool with `npm install --prefix motion/out/gif-tools --no-audit --no-fund gifsicle@7.0.1`, or supply an existing binary with `--gifsicle PATH`. No optimizer binary or its code is shipped with the Skill. [Gifsicle](https://github.com/kohler/gifsicle) is used only to produce the GIF output.

The six-second preview renders PNG frames to a lossless intermediate, then uses a global 64-colour palette, no dithering, 800 px width, 20 fps, and `gifsicle -O3 --lossy=120`. The orbit has smaller camera movement than the full film; its hook remains fixed. The output must stay under 4 MiB. Re-encode existing intermediates with `python scripts/render_depth_showcase.py --skip-render`; rerender only the previews with `--preview-only`; refresh only the repository cover with `--social-only`. The web film retains its clean 1280 × 720 / 30 fps H.264 output.
