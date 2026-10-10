# Presentation acceptance — 2026-10-10 readability follow-up

Floating explanations were too small and the visual-language and template sequences moved too quickly to read. The same storyboard now uses larger panels, larger sans-serif type and longer holds. The README still embeds only one short preview per language; the full introduction and four focused clips use on-demand native video playback.

| Published Chinese media | Before this follow-up | Current |
|---|---|---|
| README preview | 239,009 bytes; 640 × 360; 6 seconds; 20 fps GIF | 1,110,997 bytes; 1100 × 618; 12 seconds; 20 fps GIF |
| Full film | 3,771,003 bytes; 960 × 540; 30 seconds; 30 fps MP4 | 9,768,954 bytes; 1100 × 618; 70 seconds; 30 fps MP4 |
| Web short preview | 124,156 bytes; 1280 × 720; 6 seconds; 30 fps MP4 | 231,108 bytes; 1280 × 720; 12 seconds; 30 fps MP4 |

The larger output deliberately spends more bytes on legibility. The README GIF remains below 2 MiB and the full film below 10 MiB. The original pre-optimisation README hero was 16,976,488 bytes. Encoded frame rates and byte budgets do not prove smooth playback on every device or network.

The short preview advances every four seconds. The full film provides approximately four seconds per visual language and three seconds per production template. Preview titles increased from 20 to 34 px in Chinese, explanations from 16 to 25 px, with a wider floating panel. Larger task briefs, card families and review labels keep the original content. Captions and sound cues follow the revised timing.

The site has a fullscreen preview action with native controls while expanded, explicit Escape handling, and ordinary play/pause controls. Focused clips use two desktop columns and one phone column. Versioned media URLs avoid cached six-second previews appearing beside updated twelve-second copy.

## Verification

- `python evals/presentation/check.py --probe --out evals/presentation/check.json`: 152/152 media, checksum, faststart, codec, resolution, frame-rate, duration, caption timing and local-link checks.
- `node evals/director-workflow-v0.5/demo-check.cjs` with the existing ephemeral private audit policy: 89/89 page-function and public-path checks.
- Core suite: 108 tests completed locally; two host-dependent checks skipped. CI installs Pillow and checks Windows / Linux with Python 3.10 / 3.12.
- Both director-led example packs validated as candidate drafts; the mother Skill archive built and passed CRC verification.
- Remotion compiled all 13 compositions. Chinese and English representative frames inspected for typography and overlap. CI also renders one frame to catch runtime component failures.
- Browser checks: updated preview reports 12 seconds, full film 70 seconds, visual-language clip 16 seconds; fullscreen entry and Escape restore the normal preview; starting a clip pauses the full film; desktop and phone layouts have no horizontal overflow. No console errors observed in this pass.

Reduced-motion, Save-Data and hidden-document guards remain checked in source. These settings were not toggled during the browser pass; no physical-device dropped-frame or network-throughput measurement is claimed.

Design rationale: [DESIGN.md](../../docs/DESIGN.md). Public projects remain candidate examples. Technical validation does not confer visual approval or establish real team productivity gains.
