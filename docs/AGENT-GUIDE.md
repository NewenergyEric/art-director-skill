# Agent guide · art-director

English · [中文](AGENT-GUIDE.zh.md)

## Entry and reading order

Read the root `SKILL.md`, then select `references/director-workflow.md`, `references/member-workflow.md`, `references/review.md` or `references/pack-contract.md` for the current work. For a specific project, read its `PROJECT.md`, `style-pack.json` and version fingerprint. Some detailed reference methods and fictional project fixtures retain their original Chinese; the public introduction and guides are English-first, with complete Chinese reading editions available. Respond in the user’s requested language.

## Director workflow

1. Inspect available materials. Distinguish facts, confirmed decisions, agent proposals and unknowns.
2. Define positioning, visual language, asset categories, component families, entity identity, fixed requirements, variables and counterexamples.
3. Select representative samples and first articles that resolve real uncertainty. Preserve approval evidence and acceptance methods.
4. Generate and check a project pack with `validate`, `render`, `build` and `verify`. Use `--release` for the confirmed production baseline.
5. Hand over the complete pack. Start versioned tasks in a workspace, then record technical checks, visual judgments and unchecked items.
6. Separate individual revisions from shared-rule changes. Shared changes need a diff, a new pack and preserved prior versions.

## Member workflow

Pin the project version, categories, component family, entities and use. Separate identity from this task’s permitted changes. Prepare the brief, reference roles, output specifications and acceptance checks. Deliver source files, exports, in-context compositions and evidence appropriate to the actual stage.

## Failure paths

- Incomplete materials: organize what exists and identify consequential gaps; empty templates are not a completed project.
- Conflicting references: identify their roles and conflicts and present the director with a decision; do not silently blend them.
- Failed first article: stop scaling the batch, record the cause, revise the input, rule or tool, and check again.
- Version or fingerprint mismatch: stop the affected task and render/verify again or restore the correct snapshot.
- No image access: limit conclusions to structure and technical checks; do not claim visual review.
- Request to bypass approval or overwrite a published pack: preserve the baseline and prepare a change proposal in a new output directory.

## Delivery contract

State the goal, reused version, outputs, stage, evidence, unchecked items and next action. The pack must carry its own rules, reference provenance, tool requirements and version data; it must not depend on development-machine paths or the original chat.

## Keep the evidence honest

A dress-up demo is only one member task. Image dimensions are not automatically delivery specifications. An `approved` field is not proof of authorization. Never invent prices, copy or brand information. A polished concept is not automatically an engine-ready asset.

## Related roles

Use [the four-role workflow](WORKFLOW.md) when the user needs market evidence, competitor analysis or production assessment. Hand over the question, evidence/version, decisions, constraints, work scope, owner and acceptance requirements. The map describes responsibilities, not a built-in automatic multi-agent dispatcher.
