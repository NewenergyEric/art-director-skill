# Presentation acceptance — 2026-10-10

The README now embeds one short preview per language. The full introduction and all four focused clips remain available on the site using native video controls. This reduces first-load work instead of requiring visitors to decode several long GIFs at once.

| Published Chinese media | Previous | Current |
|---|---|---|
| README hero | 16,976,488 bytes; 30 seconds; 8 fps GIF | 239,009 bytes; 6 seconds; 20 fps GIF |
| Full film | 11,131,632 bytes; 30 seconds; 30 fps MP4 | 3,771,003 bytes; 30 seconds; 30 fps MP4 |
| Web short preview | — | 124,156 bytes; 6 seconds; 30 fps MP4 |

The short preview is a distinct overview, not a shortened replacement for the full film. The full film keeps the visual-language sequences, seven production templates, four team lanes and review flow. Lower file size does not by itself prove smooth playback on every device or network.

## Verification

- `python evals/presentation/check.py --probe --out evals/presentation/check.json`: 129/129 media budget, checksum, MP4 faststart, codec, frame-rate, duration and local-link checks.
- `node evals/director-workflow-v0.5/demo-check.cjs` with the existing ephemeral private audit policy: 89/89 page-function and public-path checks.
- Core suite: 108 tests completed locally; two image-decoding checks skipped without optional Pillow. CI installs Pillow and checks Windows / Linux with Python 3.10 / 3.12.
- Both director-led example packs validated, and the mother Skill archive built and passed CRC verification.
- Remotion compiled and listed all 13 compositions, including both short previews.
- Chinese and English contact sheets inspected for typography and overlap.
- Actual browser checks at 1280 × 900 and 390 × 844: responsive layout, no horizontal overflow, preview pause/resume, preview pause offscreen, component-family switching, full-film playback, and playing a clip pauses the full film. No browser console errors were observed in this pass.

Reduced-motion, Save-Data and hidden-document guards were checked in source. These user settings were not toggled in the browser; no physical-device dropped-frame or network-throughput measurement is claimed.

The design rationale lives in [DESIGN.md](../../docs/DESIGN.md). Candidate examples remain labelled as demonstrations; no real customer outcome or productivity gain is asserted.
