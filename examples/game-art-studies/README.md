# Original game-art studies / 原创游戏美术案例

[中文案例与检查](../../docs/CASE-STUDIES.md) · [English cases and checks](../../docs/CASE-STUDIES.en.md)

All artwork was generated for fictional studies on 2026-10-13 using the built-in image generation tool. Third-party artwork is not bundled. The tool did not expose a model version or random seed; prompts alone do not guarantee identical regeneration.

- `prompts/`: complete generation and targeted revision prompts. See the case guide for the actual image-reference relationships.
- `assets.json`: distribution paths, dimensions, byte counts, source/output SHA-256, candidate status and alpha checks.
- `verification.json`: executed project-pack checks and their outcomes, separate from visual approval.
- [`../tidekeeper-draft/`](../tidekeeper-draft/): portable draft rules and actual image references. It contains no art-director approval.
- [`../../docs/assets/cases/`](../../docs/assets/cases/): optimized presentation images and independent transparent PNGs.
- [`../../motion/src/DepthShowcase.tsx`](../../motion/src/DepthShowcase.tsx): film and `GameArtProof` composite source.

Distribution-only processing uses FFmpeg. Scene images are resized to 1440 × 810 JPEG. Icon source canvases are preserved, resized to 384 × 384, then centered on transparent 512 × 512 RGBA canvases to ensure at least 64 px of clear outer margin:

```sh
ffmpeg -i INPUT.png -vf "format=rgba,scale=384:384:flags=lanczos,pad=512:512:64:64:color=black@0" -pix_fmt rgba -compression_level 9 OUTPUT.png
```

This does not repair or erase internal low-alpha pixels. The light/dark proof supports visual inspection; production edge, anchor and device acceptance remain open. All approved/reference distinctions continue to follow the pack's source of truth.
