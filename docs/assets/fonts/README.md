# Public presentation font

`noto-sans-sc-subset.woff2` is a variable subset of Noto Sans SC from the [Google Fonts repository](https://github.com/google/fonts/tree/main/ofl/notosanssc), under the included SIL Open Font License 1.1.

The site and film use the same self-hosted font bytes. Microsoft YaHei and PingFang SC are system fallbacks. `font-display: swap` keeps text readable while the local font loads; no runtime font service is used.

After visible copy changes, run `python scripts/prepare_web_font.py SOURCE_TTF` to rebuild both web and film subsets. This optional presentation tool needs `fonttools[woff]`; the core Skill does not.
