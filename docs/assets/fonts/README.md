# Public font fallback

`noto-sans-sc-subset.woff2` is a subset of Noto Sans SC from the [Google Fonts repository](https://github.com/google/fonts/tree/main/ofl/notosanssc), licensed under the SIL Open Font License 1.1. The original license is included in `OFL.txt`.

The site prefers Microsoft YaHei or SimHei where available. This self-hosted sans-serif fallback keeps Chinese text out of browser serif fallbacks on systems without those fonts. It is served locally with `font-display: swap`; no Google Fonts runtime request is made.

Rebuild after changing visible Chinese copy with `python scripts/prepare_web_font.py SOURCE_TTF`. This optional presentation tool needs `fonttools[woff]`; the core Skill does not.
