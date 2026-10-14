# V2 production integration

Candidate 0.4.0, no human approval. Three production agents worked against frozen 0.3.0 and verified a compatible 0.3.1 migration; their generations remain correctly attributed to those source versions. This integration keeps the same palette, scale, lighting and material rules.

Runtime includes 28 world/item/UI assets, 40 generated weapon direction/state cells and six static weapon pieces, 24 generated enemy cells, 11 generated keeper rig parts and 12 baked keeper frames, plus new map/title. Each art family has its own source/crop/anchor/behavior metadata. Repeated bell playback steps are not new art.

All supplied gameplay resources have concrete uses. Runtime art and editable source are bundled here; original raw generations, failed drafts, exact prompts, scripts and video remain in the complete case folder at examples/duskwood-watch/evidence/v2. This compact play pack does not claim those omitted records are bundled.

Browser validation completed four nights with 100 kills and 12 life, 0 errors. A no-build run reached defeat and restart; real UI build/upgrade, light armor, refuel, inventory, pause/help and fullscreen were exercised. Normal-speed live capture ran for about31 seconds at1600x1000; full results are in the complete case. Seven directions were first seen; the final balance test exercised all eight weapon directions.

Limitations: only aim/release mechanical states, subtle rootguard gait, keeper is a profile rig with horizontal mirroring rather than full direction turns, nearest-frame subframe foot quantization about3.63px at122px cell height. No human director approval, no claim to commercial completeness.

Typography: generated four-character title; all dynamic UI text Noto Sans SC. Noto Serif SC is only in preserved V1 and is not a V2 runtime dependency.
