# Art Director — public presentation

## Purpose

Help an art director recognise the value in five seconds, inspect an example, and open the working project flow. Lead with the judgement they already have: “Why does this one look right?”

The repository is a portable Skill, not an image generator. Keep the director-led path prominent: material → spec → exemplar → project package → member task → review.

## Reference and adaptation

Reviewed [Refero's Figma style reference](https://styles.refero.design/style/5fd3b3b4-02ab-456a-87aa-e4395636b671) and its DESIGN.md panel on 2026-10-10. Adopt a gallery-like page with generous space, a clear type hierarchy, and restrained interface colour. Adapt these principles to Art Director's own warm paper, charcoal, sage and terracotta palette. The layout, copy and tokens below are project-specific; no brand assets or proprietary font files are copied.

## Tokens

| Role | Value |
|---|---|
| Canvas | `#f6f5f0` |
| Surface | `#ffffff` |
| Ink | `#242620` |
| Secondary text | `#686c62` |
| Divider | `#dcded4` |
| Action / emphasis | `#c34e2c` |
| Quiet highlight | `#e7eddd` |
| Dark section | `#232a24` |
| Type | Microsoft YaHei, PingFang SC, SimHei, self-hosted Noto Sans SC, sans-serif |
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
- Use charcoal headlines with 500–600 weight; no serif headings. English and Chinese share the same visual hierarchy.
- GitHub controls its own typography and sanitises CSS. Express hierarchy there through concise Markdown, spacing and rendered media; do not promise a custom font for GitHub's native text.
- Self-host an OFL-licensed Noto Sans SC subset as the web fallback, with `font-display: swap`. Keep the license beside it and rebuild after changing visible Chinese copy. No external font request is needed.

## Motion and loading

- GitHub: one 6-second, 20 fps preview GIF, stored with a relative repository URL. Budget: 2 MiB per language. Full introductions and focused clips link to the site.
- Web: H.264 MP4 at 30 fps with `faststart`; same-origin files, not Release redirect URLs. Full film budget: 5 MiB per language. Preview budget: 1 MiB.
- Full film and focused videos use `preload="none"`, posters, controls and inline playback. Only one video plays at a time.
- Autoplay only the muted short preview while visible. Pause out of view or when the page is hidden. Respect reduced motion and Save-Data. A manual play/pause action remains available.
- Motion is driven by Remotion frames. Use long reading holds and restrained easing. Avoid animated noise; it consumes bytes without explaining the workflow.
- On Windows, local YaHei subsets can be prepared for rendering under ignored `motion/public/render-fonts/`. Never commit or redistribute proprietary font files. Rendered pixels are the published output.

## Claims and examples

Public project packs are original candidate demonstrations. An illustrated UI comparison is explicitly a manually constructed explanation, not a measured AI generation experiment. Keep tool tests distinct from visual approval and team productivity. Publish a real showcase only with consent and inspectable evidence; don't invent reduced rework counts or tested platform support.

## Review before publishing

Inspect representative Chinese and English frames; check line wraps after every font or copy change. Check desktop and mobile layout, keyboard controls, reduced motion, local links and video playback. Record byte sizes and frame rates from the generated files, and keep a checksum manifest for the shipped media.
