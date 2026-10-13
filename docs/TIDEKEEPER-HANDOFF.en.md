[中文](TIDEKEEPER-HANDOFF.md) · [Introduction](https://newenergyeric.github.io/art-director-skill/docs/landing.en.html)

# Tidekeeper: carrying one visual memory into the next delivery

**Character, environment and item continuity held up. Complete delivery also needed UI artwork, states and viewport requirements.** The gaps found in the first handoff now feed the candidate project pack and the parent Skill.

![Actual continuation assets and editable Chinese game UI](assets/tidekeeper/overview.png)

This is one agent's relocated-directory handoff self-test with original candidates. It is not an independent team trial, a human director's approval, an engine integration or a shipped game.

## The director's baseline

The project is a casual merge game about repairing a coastal workshop. Characters serve orders/dialogue; environments serve the map; items must read on a board. Promotional composition does not define every asset category.

The shared language uses chunky forms, broad soft highlights, sea green, warm wood, coral and gold. Global language, category/family rules, entity identity and task changes are separate. Alan's hair belongs to Alan; the lamp family's materials must also reach new L3/L4 tasks.

The [frozen 0.2.0 candidate ZIP](assets/tidekeeper/tidekeeper-0.2.0-candidate.zip) contains identity and scene samples, L1/L2, a producer, editable UI, font, five guides and bundled tools. Its fingerprint is `9f24ba82a726248c5d26f9f8c17f218f4c96a29d4fcb4cbef1a83b7283e3cb63`.

## Five actual continuation tasks

The archive was extracted into a fresh directory. Bundled tools created a workspace and five tasks. Four image continuations used the received reference images; the UI reused the received source.

| Task | New work | Preserved evidence |
|---|---|---|
| TK-CHAR-WAVE | Alan smiles and waves | Face, chunky hair, cape, overalls, pouch |
| TK-SCENE-RESTORE | Repair deck, open front shutters, light the lamp | Building, camera, door/window layout |
| TK-CHAIN-L3 | Round searchlight with U bracket | Family view, materials and lighting |
| TK-CHAIN-L4 | Short coastal beacon | Family language with a distinct silhouette |
| TK-UI-ORDER | L4 order and missing/ready/delivered states | Editable source and bundled dependencies |

<p><img src="assets/tidekeeper/character-base.png" width="27%" alt="Alan baseline"><img src="assets/tidekeeper/character-wave.png" width="27%" alt="New wave pose"></p>

![Workshop before](assets/tidekeeper/workshop-before.jpg)
![Actual same-camera restoration](assets/tidekeeper/workshop-after.jpg)

## What failed and changed

The initial UI felt like sparse information cards. It lacked game-specific resource art, content and button expression. The revision adds Neri, shell coins, energy, two repair items and locked crates. Characters stand behind order counters; editable text, numbers, beveled buttons and board states share the game's visual language.

<p><img src="assets/tidekeeper/ui-flat-v020.png" width="30%" alt="Sparse first UI"> → <img src="assets/tidekeeper/ui-ready.png" width="30%" alt="UI with actual game artwork and state"></p>

The landscape map also lost important windows when covered into a portrait viewport. A separate portrait adaptation preserves the building and defines safe areas. The restored portrait was adapted first, then edited into the corresponding unrestored state.

<p><img src="assets/tidekeeper/ui-crop-failure.png" width="30%" alt="Failed landscape crop"> → <img src="assets/tidekeeper/ui-map.png" width="30%" alt="Corrected portrait composition"></p>

These additions belong to **candidate 0.2.1**. The initial pack and tasks remain frozen. A fresh UI recheck uses the new version; the history does not claim first-pass success.

## Evidence and limits

[Try the Chinese prototype](https://newenergyeric.github.io/art-director-skill/docs/assets/tidekeeper/member-ui.html): merge the searchlights in cells 6 and 13, deliver both orders, then visit the town.

Browser interaction confirmed: missing items disable delivery; two L3s yield L4; orders consume inventory; coins move from 120 to 150 to 175; repair delivery reduces locked cells from 14 to 7; both orders are required for the restored map. The same source also supports production, moving items and pointer dragging.

Logic checks cover equal/unequal merges, empty moves, full board, exhausted energy, duplicate delivery, locks and text escaping. Portable-pack checks cover build, archive, extraction, bundled-only task startup, draft release refusal and modified-dependency rejection.

![Small-size and alpha composition checks](assets/tidekeeper/small-size-proof.png)

Visual self-review compared character identity, scene structure, 46/64/96 px item silhouettes, light/dark alpha composition, UI states and long copy. Real-device readability/touch use, player recognition, human art direction, engine import/layers, rigging and long-term game balance remain unverified. The generation tool did not expose a model version or seed.

The Skill now includes [cross-category handoff](../references/cross-category-handoff.md), a production-review method carried inside generated packs, explicit UI artwork/state requirements, crop safety and clearer separation of family rules from entity identity.

[Candidate 0.2.1 ZIP](assets/tidekeeper/tidekeeper-0.2.1-candidate.zip) · [Initial member deliveries](assets/tidekeeper/member-deliveries-0.2.0.zip) · [Project source](../examples/tidekeeper-handoff/style-pack.json) · [Actual prompts](../examples/tidekeeper-handoff/references/generation-prompts.md) · [Verification](../evals/tidekeeper-handoff/verification.json) · [Production records](assets/tidekeeper/production-records.json) · [Reproduce checks](../evals/tidekeeper-handoff/reproduce.py)

Genre observations used the official [Gossip Harbor store page](https://play.google.com/store/apps/details?id=com.mergegames.gossipharbor) and the user's screenshot. Competitor artwork was neither published as ours nor submitted as a generation input.
