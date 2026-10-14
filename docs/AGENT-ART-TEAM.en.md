[中文](AGENT-ART-TEAM.zh.md) · [Introduction](landing.html#cases)

# Two playable tests of the art handoff

These are original candidate game slices made with Art Director and its production companion. Each project has its own visual direction. The shared method connects that direction to assigned assets, real production and checks in the game.

## Tidekeeper — relight the lighthouse

[Play · Chinese UI](assets/tidekeeper-playable/play.html) · [Download the 0.5.0 runtime](assets/tidekeeper-playable/tidekeeper-lighthouse-0.5.0.zip)

Merge seven item families into orders that repair the dock and lighthouse timberwork, install the lens, add oil and light the tower. Welcome the supply boat and collect the final reward. The 0.5.0 candidate supports saving, undo, restart and reduced motion; free supplies are enough to finish.

The expansion continues the 0.3.0 visual baseline. The lighthouse is an explicit task change, developed through edits of the same first scene. New props have individual generation records; rejected scene edits that moved the dock posts remain in the source record. The existing eight repair poses serve the two carpentry stages. Installation, lighting and greeting still use static poses; this release adds no new character animation.

The creator checked the actual board, orders and catalog at desktop and simulated mobile sizes, plus materials, saving, supply vouchers and reward timing. A normal-speed four-chapter playthrough used no time injection, skips or state changes. The frozen ZIP was also extracted and run separately. These are Windows Chromium and simulated-touch checks, not real iOS/Android, Mac or engine acceptance.

Small differences remain in foliage, glass and highlights between scene states, and fingers, clothing and boards drift slightly across repair frames. The opening phone view prioritizes the dock; the full tower becomes visible during construction focus and the second chapter. There is no long-term economy or coin shop.

[Prop generation](assets/tidekeeper-playable/art/expansion/generation-props.md) · [Scene edits and rejected drafts](assets/tidekeeper-playable/art/expansion/generation-scenes.md) · [Font source and coverage](assets/tidekeeper-playable/font-source.md) · [Lighthouse state comparison](assets/tidekeeper-playable/lighthouse-states.png)

<details>
<summary><strong>Earlier 0.4.0 first-light candidate</strong></summary>

[Download the frozen 0.4.0 runtime](assets/tidekeeper-playable/tidekeeper-first-light-0.4.0.zip)

The first-light sequence merged timber, fulfilled an order, repaired the dock, made a lamp, lit the harbor and welcomed the supply boat. Its frozen ZIP preserves that earlier runtime; the live play link now opens 0.5.0.

The director/integration agent used the existing Tidekeeper 0.3.0 draft. Specialists handled gameplay, production review and typography. That runtime preserved 18 existing images, added eight repair poses and extended the same licensed UI font to cover its copy. The fifth pose drives impact effects from the same action timeline. The original 0.3.0 project pack and runtime remain unchanged.

The creator recorded 30 browser checks, a normal-speed playthrough and a separate extracted-package run. Checks covered touch, keyboard, drag, save/reload, skipping actions and awarding the final 105 coins once. Initial repository tests had eight subprocess timeouts; those eight passed on a targeted rerun with the original timeout limits. This is separate from the mother Skill's current CI.

The published 0.4.0 ZIP has SHA-256 `036bbfd1134d3833e2d7195a200e0bac3875b3d39234f8d2cefd44141ca0498d`. Its contents were checked against the imported runtime; the 18 reused images match the parent repository byte for byte.

[Actual generation and revision](assets/tidekeeper-playable/art/generation-record.md) · [Earlier production evidence](TIDEKEEPER-PRODUCTION.en.md)

</details>

## Duskwood Watch — explore and defend

[Play · Chinese UI](assets/duskwood-watch/index.html) · [Download the project pack](assets/duskwood-watch/project-pack.zip)

Carry a lantern through a hand-painted forest and defend one map across four nights. Gather supplies, refuel lamps, build and upgrade defenses, and use items. Movable light breaks dark armor and changes attack speed under lamps, so illumination is part of the rules as well as the art.

Three production agents shared the frozen 0.3.0 pack: weapons; world, items and UI; and character motion. The lead handled the map, title, gameplay, lighting, integration and review. A recorded compatible migration to 0.3.1 precedes the final 0.4.0 draft. Generation records retain their source versions. This was collaboration with shared context, not a blind handoff test.

The generated title lettering has a hand-carved look; all dynamic UI text uses locally bundled Noto Sans SC. Fixed weapon bases are separate from aiming and release frames. The keeper's gait follows distance travelled, with the lantern and staff attached to the arm rig. Enemy motion uses distinct wing, body and root-limb sequences.

The creator completed all four nights and checked real clicks for building and upgrades, light/dark armor, items, refuelling, defeat/restart, pause/help and fullscreen. A relocated package was verified and run separately. The normal-speed video starts from prepared situations and is not an uninterrupted victory recording.

The keeper uses a profile rig rather than full directional turns; mirroring changes the screen-side placement of props, and small foot-contact steps remain between frames. The rootguard's gait is restrained, and weapons have aim/release states without a full reload transition. There is no save system or phone-specific interface. The project remains a draft with no human art-director approval.

The compact project ZIP includes the rules, runtime art and editable source. Full raw generations, failed drafts, prompts and scripts remain in the separate case handoff; selected records are linked here. The earlier 0.2.1 pack and production batches remain historical versions.

[Production record](assets/duskwood-watch/production-record.md) · [Integration review](assets/duskwood-watch/integration-review.md) · [Recorded migration](assets/duskwood-watch/evidence/v2/actors/pack-migration.json) · [Title and UI typography](assets/duskwood-watch/evidence/v2/typography/receipt.json) · [Normal-speed excerpt](assets/duskwood-watch/gameplay.mp4)

[Frozen package hashes and import checks](assets/sample-imports.json) cover the published Tidekeeper 0.5.0 and Duskwood Watch 0.4.0 archives.

## What came back into the Skills

| Observed problem | Change to the shared method or tool |
|---|---|
| An animation task could lose its character identity | Pair the character/entity brief with the motion brief from the same pack. |
| Generated sprites crossed nominal grid lines; idle and walk changed scale | Measure real crops, keep one scale, register roots/contact points, then check the state transition. |
| Impact effects and completed objects appeared at the wrong time | Share frame timing and contact events; separate material submission, action completion and reward. |
| New UI copy lost glyphs or looked unrelated to the scene | Check actual text coverage and typography in the game, including disabled and completed states. |
| Members wrote assets to different roots | Assign the Skill, pack fingerprint, working directory and one output root with each task. |
| Windows misclassified relative output paths | Fix path resolution in pack and release tools, with regression tests for external output and protected pack contents. |

Original generation, failed attempts and candidate status remain in the handoffs. File checks and agent reviews do not constitute human art-direction approval. Real devices, production engines and long-term game balance remain outside these browser trials. The public 24-second film has its own six-pose repair study; those frames are not counted as Tidekeeper's eight-pose runtime delivery.
