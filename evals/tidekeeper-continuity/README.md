# Tidekeeper continuous-action checks

Run from the repository root with Node.js and Playwright/Chromium available:

```sh
node evals/tidekeeper-continuity/check-browser.mjs
node evals/tidekeeper-continuity/check-continuity.mjs
node evals/tidekeeper-continuity/check-normal-speed.mjs
TIDEKEEPER_LANGUAGE=en node evals/tidekeeper-continuity/check-normal-speed.mjs
node evals/tidekeeper-continuity/review-motion.mjs
```

PowerShell uses `$env:TIDEKEEPER_LANGUAGE = 'en'` for the English run. Optional `TIDEKEEPER_PLAYWRIGHT` and `TIDEKEEPER_BROWSER` variables select an existing Playwright module and Chromium executable. `TIDEKEEPER_ROOT` can point to a relocated checkout, and `TIDEKEEPER_QA_OUT` selects a fresh output directory. Default output is the ignored `dist/tidekeeper-continuity-check/`; source evidence is not overwritten.

The browser matrix and raster checks use deterministic stepping for diagnosis. The normal-speed scripts play a fresh game through ordinary controls with native elapsed time and no injected resources, skips or accelerated clock. The motion reviewer first records the complete native-speed 11.2-second sequence, then captures diagnostic poses. Inspect the actual playback and images: coordinates, counts and fixed-region equality do not certify anatomy or natural movement.

Published original evidence and source hashes are linked from [the case review](../../docs/TIDEKEEPER-CONTINUITY.en.md).
