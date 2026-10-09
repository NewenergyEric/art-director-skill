# Game-art production research

This note records the production patterns used to shape Art Director's workflow and README film. It is not a list of visual styles to copy. The sources are first-party engine documentation, and the repository's examples remain original and fictional.

## What production teams actually have to coordinate

| Production pattern | Evidence from official tooling | Implication for Art Director |
|---|---|---|
| One project contains many asset types made in different tools | Unreal separates externally authored meshes, animation, textures, and sounds from editor-authored levels, materials, particles, and other assets in its [content workflow](https://dev.epicgames.com/documentation/unreal-engine/working-with-content-in-unreal-engine). | A shared direction must compile into category-specific tasks. One universal prompt is not enough. |
| An import pipeline is a stack of repeatable operations | Unreal Interchange defines configurable pipeline stacks that can vary by asset type and be scripted in C++, Blueprint, or Python in [Importing Assets Using Interchange](https://dev.epicgames.com/documentation/unreal-engine/importing-assets-using-interchange-in-unreal-engine). | Keep project judgement stable, then adapt the task, checks, and export requirements for character, UI, item, skill/VFX, and environment lanes. |
| Stable metadata makes assets traceable across a team | Unreal asset metadata can store author, intended use, and workflow state such as in progress, done, or approved in [Asset Metadata](https://dev.epicgames.com/documentation/en-us/unreal-engine/asset-metadata-in-unreal-engine). Unity assigns stable IDs and keeps import settings in `.meta` files in its [Asset workflow](https://docs.unity3d.com/es/current/Manual/AssetWorkflow.html). | Each task and batch needs stable IDs, a source project version, status, evidence, and a reason for approval or rejection. |
| Validation has to work on one asset and on a whole project | Unreal's [Data Validation](https://dev.epicgames.com/documentation/en-us/unreal-engine/data-validation-in-unreal-engine) supports asset, dependency, folder, project, and CI validation with custom rule sets. | Technical checks must scale from a first piece to a batch, while remaining separate from visual approval. |
| UI is a system of shared components and state variants | Unreal Common UI uses shared style data assets, action tables, input-specific assets, and animated switchers in its [Common UI quickstart](https://dev.epicgames.com/documentation/en-us/unreal-engine/common-ui-quickstart-guide-for-unreal-engine). | UI briefs need component families, normal/pressed/disabled states, platform variants, long-text cases, and navigation context. |
| 2D and UI assets are produced and delivered as grouped families | Unity's [Sprite Atlas](https://docs.unity3d.com/es/current/Manual/class-SpriteAtlas.html) consolidates many textures, while its [UI graphic preparation guide](https://docs.unity3d.com/cn/6000.0/Manual/best-practice-guides/ui-toolkit-for-advanced-unity-developers/graphic-and-font-assets-preparation.html) describes presets, lossless transparent graphics, atlasing, and platform variants. | A visual review must check the family together and at actual play scale, not only admire isolated full-resolution art. |
| VFX are built from reusable systems, emitters, and modules | Unreal's [Niagara overview](https://dev.epicgames.com/documentation/en-us/unreal-engine/overview-of-niagara-effects-for-unreal-engine) describes systems made from emitters and reusable modules whose data accumulates through a stack. | Skill/VFX direction needs timing phases, reusable components, and state continuity—not a single “make it more dynamic” note. |
| A production pipeline connects specialists and a steady content stream | Epic's [production pipeline overview](https://dev.epicgames.com/documentation/en-us/unreal-engine/setting-up-your-production-pipeline-in-unreal-engine) ties asset management, naming, version control, automation, and collaboration together. | The art director's decisions must survive handoffs among leads, artists, technical artists, vendors, and agents. |

## Asset families represented in the showcase

The v0.2 film uses seven templates because they expose different production risks:

1. **Character** — turnaround, silhouette, face, expression, action, and recognisability.
2. **Items** — family language, rarity, wear, state, scale, and inventory readability.
3. **UI system** — component hierarchy, interaction state, platform/input variant, and localisation.
4. **Skill / VFX** — anticipation, action, hit, decay, frame rhythm, and reusable effect modules.
5. **Match / level** — same-screen distinction, blockers, boosters, cascade/clear states, and board-scale readability.
6. **Puzzle / clues** — clues, mechanisms, hotspots, hint escalation, spoiler boundaries, and discovered/locked states.
7. **Tabletop / pieces** — board, cards, tokens, turns, scoring, print scale, and player distinction through colour plus shape.

The motion system then places four active production lanes—character/world, UI/HUD, props/items, and skill/VFX—through the same sequence: brief, first piece, review, batch. That sequence reflects the repository's existing evidence model rather than claiming to reproduce an engine pipeline.

## What was deliberately excluded

- Customer artwork, customer names, and private project decisions.
- A single fantasy concept image standing in for an industrial game-art workflow.
- Invented productivity percentages or claims that visual consistency has already been proven on a live team.
- Engine-ready claims based only on how an image looks.
- External visual assets with unclear reuse rights.

The production and style boards used in the motion film were created specifically for this repository. They cover contemporary casual-game work plus pseudo-3D, American-comic, traditional, and painterly-card production systems.
