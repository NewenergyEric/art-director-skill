# Presentation acceptance — 2026-10-10 spatial poster and readability

The new default page is `docs/showcase.html`: white framing, navy and teal from the FDE reference, a variable Noto Sans SC font, and a poster hook that overlaps original artwork. The 380 / 820 weight contrast, skew and slight rotation make typography part of the image. Three depth planes, a foreground project file and continuous perspective movement replace page-cut transitions. The original clear walkthrough remains at `docs/landing.html`.

| New spatial media | Chinese | English |
|---|---|---|
| README loop | 3,890,343 bytes | 3,689,617 bytes |
| 18-second film | 2,418,922 bytes | 2,420,479 bytes |

The GIF has 120 frames, 800 × 450 resolution, 20 fps, and a six-second periodic orbit. PNG frames and a lossless intermediate prevent H.264 compression noise being carried into the GIF; 64 colours and gifsicle optimization keep it below 4 MiB. The web film is 1280 × 720 / 30 fps H.264 with faststart and stays below 5 MiB. The live website uses three WebP images totalling 244,340 bytes, with transform animation instead of an autoplay video download.

`spatial-loop.json` records encoded GIF endpoint measurements: the loop seam's mean RGB change is about 3.2 / 255, compared with about 2.2 / 255 between adjacent endpoint frames. These are byte-level continuity observations, not a perceptual smoothness score. Frame rate and file size do not guarantee performance on every device.

The live stage supports manual pause/resume, reduced motion, Save-Data, hidden-document and offscreen guards. Its film has native controls and `preload="none"`. Chinese and English representative frames were inspected. Browser checks confirmed the new 18-second film plays, scrolling away pauses the stage, pause/resume works, the page has no horizontal overflow at 1280 and 390 px, images load, and no console errors were observed. The current browser run did not emulate reduced motion or Save-Data; their guards were inspected in source.

## Retained readable presentation


Floating explanations were too small and the visual-language and template sequences moved too quickly to read. The same storyboard now uses larger panels, larger sans-serif type and longer holds. The README embeds one spatial preview per language; the full introduction and four focused clips use on-demand native video playback.

| Published Chinese media | Before this follow-up | Current |
|---|---|---|
| Readable preview | 239,009 bytes; 640 × 360; 6 seconds; 20 fps GIF | 1,110,997 bytes; 1100 × 618; 12 seconds; 20 fps GIF |
| Full film | 3,771,003 bytes; 960 × 540; 30 seconds; 30 fps MP4 | 9,768,954 bytes; 1100 × 618; 70 seconds; 30 fps MP4 |
| Web short preview | 124,156 bytes; 1280 × 720; 6 seconds; 30 fps MP4 | 231,108 bytes; 1280 × 720; 12 seconds; 30 fps MP4 |

The larger output deliberately spends more bytes on legibility. The README GIF remains below 2 MiB and the full film below 10 MiB. The original pre-optimisation README hero was 16,976,488 bytes. Encoded frame rates and byte budgets do not prove smooth playback on every device or network.

The short preview advances every four seconds. The full film provides approximately four seconds per visual language and three seconds per production template. Preview titles increased from 20 to 34 px in Chinese, explanations from 16 to 25 px, with a wider floating panel. Larger task briefs, card families and review labels keep the original content. Captions and sound cues follow the revised timing.

The site has a fullscreen preview action with native controls while expanded, explicit Escape handling, and ordinary play/pause controls. Focused clips use two desktop columns and one phone column. Versioned media URLs avoid cached six-second previews appearing beside updated twelve-second copy.

## Verification

- `python evals/presentation/check.py --probe --out evals/presentation/check.json`: 203/203 media, checksum, faststart, codec, resolution, frame-rate, duration, caption timing and local-link checks.
- `node evals/director-workflow-v0.5/demo-check.cjs` with the existing ephemeral private audit policy: 89/89 page-function and public-path checks.
- Core suite: 108 tests completed locally; two host-dependent checks skipped. CI installs Pillow and checks Windows / Linux with Python 3.10 / 3.12.
- Both director-led example packs validated as candidate drafts; the mother Skill archive built and passed CRC verification.
- Remotion compiled all 17 compositions. Chinese and English representative frames inspected for typography and overlap. CI also renders a frame from each presentation style to catch runtime component failures.
- Browser checks: updated preview reports 12 seconds, full film 70 seconds, visual-language clip 16 seconds; fullscreen entry and Escape restore the normal preview; starting a clip pauses the full film; desktop and phone layouts have no horizontal overflow. No console errors observed in this pass.

Reduced-motion, Save-Data and hidden-document guards remain checked in source. These settings were not toggled during the browser pass; no physical-device dropped-frame or network-throughput measurement is claimed.

Design rationale: [DESIGN.md](../../docs/DESIGN.md). Public projects remain candidate examples. Technical validation does not confer visual approval or establish real team productivity gains.
