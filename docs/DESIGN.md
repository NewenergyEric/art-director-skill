# Art Director — public presentation

## Purpose

Help an art director recognise the value in five seconds, inspect an example, and open the working project flow. Lead with the judgement they already have: “Why does this one look right?”

The repository is a portable Skill, not an image generator. Keep the director-led path prominent: material → spec → exemplar → project package → member task → review.

## Reference and adaptation

Reviewed [FDE](https://fde.aielsen.com/zh/), [Refero](https://styles.refero.design), [Motion Sites](https://motionsites.org), and [React Bits Tilted Card](https://reactbits.dev/components/tilted-card) on 2026-10-10. FDE uses white, navy `#001F3F`, teal `#007D86`, and a variable Field Sans face whose metadata identifies Noto Sans SC. Use our own OFL-licensed Noto Sans SC subset, with restrained text weights and the same palette; no FDE font file or brand asset is redistributed.

The new spatial presentation adapts the references' depth, perspective and continuous movement using original code and original candidate artwork. No React Bits implementation is copied or imported. Reference screenshots supplied by the user inform typography placement only: do not reproduce their people, brands or imagery.

The central hook is “把判断，交给团队” / “Your vision. Their direction.” Type is part of the poster: a light first line, a heavy teal second line, a slight skew and rotation, and deliberate overlap with the artwork. Keep the supporting copy upright and readable. A larger headline alone is insufficient: type and image must share the same composition.

## Tokens

| Role | Value |
|---|---|
| Canvas | `#ffffff` |
| Surface | `#ffffff` |
| Ink | `#001f3f` |
| Secondary text | `#526978` |
| Divider | `#dce7ec` |
| Action / emphasis | `#007d86` |
| Quiet highlight | `#e5f2f1` |
| Dark section | `#001f3f` |
| Type | Self-hosted variable Noto Sans SC first; system sans-serif fallback |
| Content width | 1240 px including gutters |
| Desktop / mobile gutter | 42 / 22 px |
| Section spacing | 64–96 px desktop; 42–58 px mobile |
| Image / panel radius | 16–18 px |
| Input / thumbnail radius | 8–10 px |
| Primary action radius | 50 px |

## Composition

- One headline, one main action and one visual per first screen. Put installation within reach.
- Use 37–56 px headings on desktop and 30–42 px on phones; 15–16 px body, 1.8–1.95 line height. Workbench data labels may be smaller, but readable body text is at least 12 px.
- Let original artwork supply the colour. Keep UI surfaces quiet. Reserve a dark band for the three-step handoff story.
- Use flat sections and fine dividers. Avoid surrounding every paragraph with a box.
- Use 460–500 weight for section headings, 380 for the poster lead, and 820 for its hook. Chinese and English share the same hierarchy, with line lengths checked separately.
- GitHub controls its own typography and sanitises CSS. Express hierarchy there through concise Markdown, spacing and rendered media; do not promise a custom font for GitHub's native text.
- Self-host an OFL-licensed Noto Sans SC subset as the primary web font, with `font-display: swap`. Keep the license beside it and rebuild after changing visible Chinese copy. No external font request is needed.

## Motion and loading

- GitHub: one six-second spatial GIF at 960 px / 20 fps, using a complete periodic orbit and a stable hook. Budget: 4 MiB per language. A static poster is supplied for reduced motion. The retained readable preview is 12 seconds, 1100 px / 20 fps, under 2 MiB; it is available in the clear walkthrough.
- Web: H.264 MP4 at 30 fps with `faststart`; same-origin files, not Release redirect URLs. Full film budget: 10 MiB per language. Preview budget: 1 MiB.
- Full film and focused videos use `preload="none"`, posters, controls and inline playback. Only one video plays at a time.
- Autoplay only the muted short preview while visible. Pause out of view or when the page is hidden. Respect reduced motion and Save-Data. A manual play/pause action remains available.
- Rendered motion is driven by Remotion frames. The new 18-second film uses continuous perspective movement, three depth planes, light, a background production wall, and a foreground project file. The six-second orbit closes exactly; captions stay constant in that preview. No page-cut deck transitions. Budget: 5 MiB for the 1280 × 720 / 30 fps film.
- The live web stage uses transform animations over three compressed WebP boards, with subtle pointer tilt. Pause controls, reduced motion, Save-Data, visibility and offscreen guards apply. No canvas framework or copied component dependency is required.
- The full introduction lasts 70 seconds: approximately four seconds per visual language and three seconds per production template. Larger floating panels use 30–42 px titles and 21–25 px explanations on the 1280 × 720 canvas. The short preview has a fullscreen button and native playback controls; focused clips use two desktop columns and one phone column.
- Keep film, clip, caption and sound-cue timing derived from `motion/src/timeline.json`. Add a version query when replacing published media so cached six-second previews cannot appear beside twelve-second copy.
- On Windows, local YaHei subsets can be prepared for rendering under ignored `motion/public/render-fonts/`. Never commit or redistribute proprietary font files. Rendered pixels are the published output.

## Claims and examples

Public project packs are original candidate demonstrations. An illustrated UI comparison is explicitly a manually constructed explanation, not a measured AI generation experiment. Keep tool tests distinct from visual approval and team productivity. Publish a real showcase only with consent and inspectable evidence; don't invent reduced rework counts or tested platform support.

## Review before publishing

Inspect representative Chinese and English frames; check line wraps after every font or copy change. Check desktop and mobile layout, keyboard controls, reduced motion, local links and video playback. Record byte sizes and frame rates from the generated files, and keep a checksum manifest for the shipped media.
