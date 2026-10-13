# The 24-second workflow film

The English and Chinese films follow one workflow: define the style → share the art direction → make components as a team → review them in context → check scene and action consistency. The closing claim appears once. The website is one introduction at `docs/landing.html`; work happens in the user's agent.

```sh
npm install
npm run motion:studio
npm run motion:render
```

Compositions: `DepthShowcaseZH` / `DepthShowcaseEN` and compatibility aliases `DepthPreviewZH` / `DepthPreviewEN` are all 720 frames at 30 fps. `SocialPreview` is a 1280 × 640 still; `GameArtProof` is a 1280 × 720 light/dark and 64 / 96 px compositing check. The preview aliases no longer shorten the story.

`scripts/render_depth_showcase.py` renders one lossless master per language, then derives a 1280 × 720 H.264 film and an 800 × 450 GIF. The master is 24 seconds in both formats. Stable reading intervals reduce GIF size; transitions retain 20 fps. The GIF uses 128 colors, no dithering and `gifsicle -O3`, with a 6 MiB budget. MP4 uses CRF 24, 30 fps and faststart, under 5 MiB. Posters show the closing claim. Film chapters and captions live beside the player.

Requires Python 3.10+, Node.js 20+, FFmpeg and gifsicle. These are presentation dependencies, not Skill runtime dependencies. Install the optional optimizer with `npm install --prefix motion/out/gif-tools --no-audit --no-fund gifsicle@7.0.1`, or use `--gifsicle PATH`. Set `REMOTION_BROWSER_EXECUTABLE` if installed Chrome/Edge is outside a default location.

The display lettering uses Bree Serif for English and Harbor Brush Display (a renamed LXGW WenKai subset) for Chinese. Their warm, drawn shapes match the harbor setting; neither gets synthetic italic or the former heavy outline. Body/UI copy uses the shared Noto Sans SC subset. Font sources and OFL notices are in `motion/public/fonts/`. Run `python scripts/prepare_web_font.py SOURCE_TTF` after body-copy changes. `--skip-render` re-encodes existing masters; `--social-only` refreshes the social image. Validate with `python evals/presentation/check.py --probe`.

## Design handoff — 2026-10-13

This revision uses the current [Art Director Skill](../SKILL.md), [public presentation rules](../references/public-presentation.md) and [public design direction](../docs/DESIGN.md) as one shared baseline. The imagegen and illustrated-intro production Skills supplied the generation and motion workflow. The film carries the director's samples, rules and component relationships; it does not introduce a second project style. The current font treatment is specific to Tidekeeper.

| Text role | Current treatment at 1280 × 720 | Observed fit |
|---|---|---|
| English display | Bree Serif Regular 400, 70–112 px | Broad, rounded forms echo the game's soft volumes. A restrained shadow keeps the letterforms clear over artwork. |
| Chinese display | Harbor Brush Display Medium 500, 72–108 px | Open handwritten forms give the short headlines a drawn character. It is used at display size, without thin Song-style strokes or a document-like body setting. |
| Supporting labels and UI | Noto Sans SC; category labels 21–24 px, closing support 28 px | Stable sans-serif forms keep component labels and game controls readable. Game UI keeps its own scale hierarchy. |

Opening, component, context, action and closing frames were reviewed in both languages. The component shot retains the complete UI inside the safe area; the action shot uses one character in the scene. Different compositions preserve the shared artwork, material cues and type roles without repeating a title-card layout. Font choice is an observed fit for this example, not a rule for future game genres.

English is the default for the README, introduction player and social preview. `docs/landing.en.html` is the explicit English URL; `docs/landing.zh.html` preserves the Chinese version. Regenerate both films when shared copy, typography or composition changes.

The repair sequence is a six-drawing sprite animation, exposed for 8/7/3/3/6/12 frames at 30 fps. Preparation, anticipation, strike, contact, rebound and recovery differ in arm, wrist, head and torso pose. `RepairAction` crops the untouched 3 × 2 atlas in code; it does not present repeated translation of one image as multiple drawings. The atlas and exact generation prompts are in `docs/assets/tidekeeper-campaign/`. This candidate marketing animation is separate from the frozen production pack and is not a claim of skeletal animation or human art-director approval.

The current original art lives in `motion/public/cases/` and has matching distribution files in `docs/assets/cases/`. Prompts, source hashes, draft rules and measured checks are linked from `docs/CASE-STUDIES.md`. The film uses real generated iterations and an illustrative board; it is not a recording of a production game or a live agent. Render masters go to ignored `motion/out/visual-memory-20261013/`.
