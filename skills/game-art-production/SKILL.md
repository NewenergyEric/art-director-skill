---
name: game-art-production
description: Continue game-art production from a director's project pack. Assign and create related characters, environments, props, UI and animation, review them in context, and export optional Compositor scenes without inventing another visual style.
---

# Game Art Production

Use the direction established in the project pack to make consistent components, whoever creates them. `art-director` establishes and revises the shared judgment; this Skill applies it to production and assembly. A received project pack is sufficient to start. If direction is missing, resolve that gap before making a batch; do not inherit Tidekeeper's look by default.

Read the pack's `SKILL.md`, `style-pack.json`, manifest and current task. Verify the files and pin its version, fingerprint and manifest hash. Work in the user's language. The agent handles records and tools; designers should not need to fill JSON before creating art.

## Continue the work

1. Establish the player action, intended feeling and actual display context. Split the work into necessary assets, states and assemblies. Richness comes from meaningful relationships and behavior, not a count of decorative objects.
2. Assign each asset to a person or agent and identify its upstream first article, shared rules, identity references, permitted changes and destination composition. Designate who assembles the result. Record these in the task brief or existing batch record; assignment is not completion. Reuse verified unchanged outputs, and keep missing, rejected or obsolete inputs visible.
3. Actually attach relevant images to generation or editing tools. Save the prompt, tool, inputs and returned files. Check a representative result before extending its family. The scripts provide deterministic checks and exports; they do not call a model or certify aesthetics.
4. Compose at the intended scale. Review shape language, edges, material, lighting and type together with character contact, contrast, layering and UI priority. A matching palette alone is insufficient. Typography should belong to the pictured world while gameplay text remains readable. Remove repeated copy that the artwork already communicates.
5. For movement, choose an appropriate method and inspect actual playback. A short action may use 6–20 distinct drawn/generated poses or deformation frames, a rig, or generated animation when a suitable tool exists. This range is a production option, not a frame-count gate for every effect. Repeating one displaced image does not provide the missing poses. Follow [assembly and animation review](references/assembly-review.md).
6. Return recurring direction gaps to a candidate revision of the project pack; keep single-asset fixes in their tasks. Use `--allow-candidate` for candidate handoffs without turning a technical pass into director approval. Existing user authorization remains valid.

## Delivery paths

**Standard production:** project pack → representative asset → related assets → actual composition and playback → review and delivery. Use the available tools and target engine; Compositor is optional.

**Layered editing:** export the same scene recipe to `.comp` after asset production. Read [Compositor support](references/compositor.md). It is a layered editing destination, not a generation service, game engine or animation renderer. Windows can export and inspect the format. Record native acceptance only after opening, inspecting and saving on a supported Mac.

`scripts/production.py` requires Python 3.10+. `check`, `tasks` and `verify` use the standard library; PNG conversion and Compositor export require Pillow. Outputs must use new directories, preserving members' working files.

```text
python scripts/production.py check PLAN.json --pack RECEIVED_PACK --allow-candidate
python scripts/production.py tasks PLAN.json --pack RECEIVED_PACK --out NEW_TASKS
python scripts/production.py build PLAN.json --pack RECEIVED_PACK --out NEW_DELIVERY --allow-candidate
python scripts/production.py verify NEW_DELIVERY
```

Use the [production contract](references/production-contract.md) for plan fields and recovery. Report what was made, the shared direction used, actual observations, file entry points and unresolved work. Keep candidate art, technical validation, self-review, director decisions and native or engine acceptance distinct.
