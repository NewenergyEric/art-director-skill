# The 24-second workflow film

The Chinese and English GIFs and MP4s show the same complete journey: collect materials → define rules and calibrate samples → share a project pack → create a task → review and revise. The website is one introduction at `docs/landing.html`; work happens in the user's agent.

```sh
npm install
npm run motion:studio
npm run motion:render
```

Compositions: `DepthShowcaseZH` / `DepthShowcaseEN` and compatibility aliases `DepthPreviewZH` / `DepthPreviewEN` are all 720 frames at 30 fps. `SocialPreview` is a 1280 × 640 still. The preview aliases no longer shorten the story.

`scripts/render_depth_showcase.py` renders one lossless master per language, then derives a 1280 × 720 H.264 film and an 800 × 450 GIF. The master is 24 seconds in both formats. Stable reading intervals reduce GIF size; transitions retain 20 fps. The GIF uses 96 colors, no dithering and `gifsicle -O3 --lossy=20`, with a 6 MiB budget. MP4 uses CRF 24, 30 fps and faststart, under 5 MiB. Posters show the closing claim. Film chapters and captions live beside the player.

Requires Python 3.10+, Node.js 20+, FFmpeg and gifsicle. These are presentation dependencies, not Skill runtime dependencies. Install the optional optimizer with `npm install --prefix motion/out/gif-tools --no-audit --no-fund gifsicle@7.0.1`, or use `--gifsicle PATH`. Set `REMOTION_BROWSER_EXECUTABLE` if installed Chrome/Edge is outside a default location.

The OFL variable Noto Sans SC font is shared by the site and film. Run `python scripts/prepare_web_font.py SOURCE_TTF` after copy changes. It updates both copies. `--skip-render` re-encodes existing masters; `--social-only` refreshes the social image. Validate with `python evals/presentation/check.py --probe`.

Chinese is the default for the README, introduction player, captions and social preview. `docs/landing.en.html` preserves the complete English alternative; `docs/landing.zh.html` remains a compatibility copy of the default Chinese page. Changing the default does not change the verified 24-second films; regenerate `SocialPreview` with `--social-only` when its language or copy changes.
