<p align="right"><a href="README.md">中文</a> · <strong>English</strong></p>

<p align="center">
  <a href="https://github.com/NewenergyEric/art-director-skill/actions/workflows/ci.yml"><img alt="Validate skill" src="https://github.com/NewenergyEric/art-director-skill/actions/workflows/ci.yml/badge.svg"></a>
  <a href="https://github.com/NewenergyEric/art-director-skill/actions/workflows/codeql.yml"><img alt="CodeQL" src="https://github.com/NewenergyEric/art-director-skill/actions/workflows/codeql.yml/badge.svg"></a>
  <a href="LICENSE"><img alt="MIT License" src="https://img.shields.io/badge/license-MIT-151715.svg"></a>
  <img alt="Python 3.10+" src="https://img.shields.io/badge/Python-3.10%2B-3272b8.svg">
</p>

<picture>
  <source media="(prefers-reduced-motion: reduce)" srcset="assets/readme/art-director-still-en.png">
  <img src="https://github.com/NewenergyEric/art-director-skill/releases/download/v0.2.0/art-director-hero-en.gif" width="100%" alt="A 30-second film of an art director and team moving through asset families, production templates, batch lanes, and review inside one project system.">
</picture>

<p align="center"><sub>▲ 30-second bilingual Remotion film · one continuous canvas, seven production templates, four team lanes · <a href="https://github.com/NewenergyEric/art-director-skill/releases/download/v0.2.0/art-director-hero-en.mp4">download the scored MP4</a></sub></p>

# Art Director

> ## One direction has to move an entire team.

A visual project with several contributors always moves many things at once. In games, that means characters, worlds, tiles, props, UI, skills, and effects. In commerce and brand work, it means key art, product elements, price components, campaign posters, and channel-specific sizes. The hard part is rarely making one more image. It is making sure everyone knows **what must stay, what may change, and what this round is actually meant to fix.**

Art Director keeps those decisions inside the project. The director still decides what looks right and what belongs. Each discipline gets a brief made for its production lane. An agent starts from the version the team has already confirmed instead of returning to a vague prompt.

It is an installable Agent Skill backed by working local tools: extract direction from references and review notes, prove it on a small batch, scale it through the team, and deliver a portable project Skill that can be verified and updated.

`Codex` · `Claude Code` · `Cursor` · other Agent Skills-compatible tools

## It manages a production line, not one image

| What happens on a team | What Art Director keeps | What the next round can do |
|---|---|---|
| A director says, “It feels wrong” | Style, identity, task, and technical specification as separate decisions | Fix the right layer without rewriting unrelated rules |
| Character, UI, item, and skill work run together | A focused brief for each asset family, all pinned to one project version | Different disciplines do different work without drifting apart |
| A casual or live-ops game needs many states and variants | Asset families, state matrices, first-piece gates, and sample records | Review a representative batch before multiplying output |
| A teammate, vendor, or agent takes over | Evidence-backed `STYLE.md`, `SKILL.md`, task cards, and version diffs | Continue from confirmed judgement instead of hearsay |
| The direction changes | The old version, reason, scope, and decision record | See exactly what changed—and what did not |

---

## One method, many visual languages

Pseudo-3D, American comics, traditional painting, and collectible-card art use very different rules for form, material, line, space, and information density. Art Director does not press the same adjectives onto every image. It compiles one project judgement for each discipline: an item designer gets an asset family, character and environment artists get identity boundaries, UI gets components and states, and every maker gets the current task and delivery specification.

<p align="center"><img src="https://github.com/NewenergyEric/art-director-skill/releases/download/v0.2.0/style-directions-en.gif" width="100%" alt="A continuous switch across a pseudo-3D item family, an American-comic task brief, a traditional card family, and a painterly collectible-card system."></p>

The visual language can change while the working path stays legible: **project baseline → discipline brief → asset family or template → first-piece review → batch and version.** Games are the repository's most complete example. The same structure also applies to multi-person UI systems, e-commerce campaigns, promotional posters, social templates, and multi-size channel delivery.

## Seven production systems, one project judgement

Characters, items, UI, skills/VFX, plus match, puzzle, and tabletop systems need different task structures. Art Director compiles each production template from the same project baseline instead of forcing everything into one long prompt.

<p align="center"><img src="https://github.com/NewenergyEric/art-director-skill/releases/download/v0.2.0/template-switch-en.gif" width="100%" alt="A continuous switch across character, item, UI, skill, match, puzzle and tabletop production templates."></p>

Each rule defines its scope, strength, allowed variation, evidence, and verification method. Character identity does not leak into global style; a single pose request does not silently become a rule for the entire team.

## Review a small batch, then scale

The expensive failure in volume production is copying a wrong interpretation dozens of times. A new asset family or state starts with a representative piece. Once it holds, character/world, UI/HUD, props/items, and skill/VFX lanes can move from the same version.

<p align="center"><img src="https://github.com/NewenergyEric/art-director-skill/releases/download/v0.2.0/team-pipeline-en.gif" width="100%" alt="Four production lanes moving from brief through first piece and review into batch production."></p>

Each batch records its scope, family, states, specification, first piece, sampled checks, and rework reason. A one-off error stays local. A family-wide problem goes back to the representative piece. Only shared changes across families propose a new project baseline.

## Turn “it feels wrong” into something the team can fix

A review separates four questions: Does it belong to this project? Is the character or item still recognisable? What changes in this round? Can the file enter production?

<p align="center"><img src="https://github.com/NewenergyEric/art-director-skill/releases/download/v0.2.0/review-lens-en.gif" width="100%" alt="A review lens moving through style, identity, current task and technical specification."></p>

Art judgement, technical checks, and unchecked items keep separate states. Passing a dimension check is not visual approval. A strong concept image is not automatically engine-ready.

---

## Install

```sh
npx skills add https://github.com/NewenergyEric/art-director-skill
```

The core CLI needs Python 3.10+ and uses only the standard library. Pillow is optional for reading image dimensions and alpha pixels. The Remotion showcase needs Node.js 20+ and FFmpeg; neither is required for everyday Skill use.

Then ask:

> Use `$art-director`. Start with the references and latest review notes the project has already confirmed. Keep style, character or prop identity, this round's task, and technical specifications separate. Show me the smallest representative batch that will expose mistakes, then build focused packs for character, UI, item, and skill production after it is aligned.

[Open the call flow](https://newenergyeric.github.io/art-director-skill/) · [Read the Skill entrypoint](SKILL.md) · [Explore the fictional sample pack](examples/moss-harbor-draft)

## Run a complete example in five minutes

The repository includes a fictional “Moss Harbor” draft. It intentionally leaves references missing, rules proposed, and tools unverified so the workflow can show how it behaves when evidence is incomplete.

```sh
python scripts/style_pack.py validate examples/moss-harbor-draft

python scripts/style_pack.py brief examples/moss-harbor-draft \
  --category character \
  --entity lin \
  --task "Lin crouches on the pier to repair a lamp"
```

Start your own project pack:

```sh
cp templates/style-pack.template.json my-project/style-pack.json
python scripts/style_pack.py render my-project
python scripts/style_pack.py build my-project --out dist/my-project-0.1.0
python scripts/style_pack.py verify dist/my-project-0.1.0
```

In Windows PowerShell, replace `cp` with `Copy-Item`. Add `--release` to `validate` and `build` when publishing a confirmed baseline. The release check stops and names the missing evidence when confirmation, references, or files are incomplete.

## What is inside a project pack

```text
project-art-style/
├── style-pack.json   # single source of truth
├── STYLE.md          # human-readable project direction
├── SKILL.md          # entrypoint for a new session or agent
├── manifest.json     # file inventory and content fingerprints
├── references/       # references and evidence approved for sharing
├── scripts/          # in-pack verification and briefing tools
└── agents/           # agent UI metadata
```

A pack can be copied, archived, and verified. A teammate does not need the director's original chat history to see the current version, scope, confirmed decisions, open questions, and task.

## Two local tools

### `style_pack.py` · project-pack lifecycle

`validate`, `render`, `brief`, `build`, `verify`, `archive`, and `diff` cover the path from working copy to a fixed release snapshot. The CLI refuses to overwrite builds and archives, and checks path traversal, symlinks, case collisions, unexpected files, and content fingerprints.

### `pilot.py` · real-material and pilot evidence

`intake` inventories source material, `check-image` reads dimensions and alpha from actual files, and `summarize` keeps agent simulations separate from human-team records. It does not generate images or treat technical success as art approval.

## What has been verified

- A deterministic Python 3.10 / 3.12 test matrix on Windows and Linux.
- Data structure, cross-references, path boundaries, symlinks, case collisions, overwrite refusal, relocation, and content fingerprints.
- Behavioral cases for no-tool fallback, reviewing from a project pack alone, and turning vague intent into a discussion draft.
- All ten bilingual motion compositions and the social preview compile; the master film and four visual systems were reviewed at 14 representative frames.
- A nine-dimension Darwin audit and paired before/after review across three representative tasks; see the [audit report](docs/darwin-audit-v0.2.md).

Full evidence is in the [validation report](docs/validation-report.md), [round-one pilot preparation](docs/round-01-report.md), and [expert review](docs/expert-review-v0.2.md). Passing structural checks proves the pack contract, not real-project style consistency, engine readiness, or team efficiency.

## Security and data flow

The project-pack tools run locally. They make no remote API request, read no key, and send no telemetry. The repository declares its network surface, subprocesses, write operations, and deletion boundaries, and runs CodeQL and Dependabot.

[Read the full security statement](SECURITY.md) · [Report a vulnerability privately](https://github.com/NewenergyEric/art-director-skill/security/advisories/new)

## Current boundaries

- No bundled image model, LoRA, engine plug-in, or paid generation service.
- No approval inferred from filenames, prompts, or a typed approver name.
- No automatic taste judgement; the system makes decisions evidenced, scoped, and reusable.
- No concept image declared engine-ready on appearance alone.
- No aggregate score allowed to hide an identity error, technical failure, or unchecked item.

## Repository structure

```text
├── SKILL.md              # mother Skill entrypoint
├── agents/               # agent UI metadata
├── references/           # methods loaded by task
├── templates/            # pack, task, and review records
├── scripts/              # pack, pilot, and media tools
├── examples/             # fictional sample project
├── tests/                # deterministic tests
├── evals/                # behavioral and audit tasks
├── motion/               # Remotion source and original visual assets
├── docs/                 # protocols, research, and validation reports
└── assets/readme/        # reduced-motion stills and social preview
```

## Research basis

The method follows patterns found in real game-content pipelines: per-asset presets, stable metadata, modular UI/VFX, batch validation, version control, and first-piece gates. The [game-art production research](docs/game-production-research.md) links the official sources.

## License

[MIT](LICENSE) — use, modify, distribute, and include it in commercial work while retaining the copyright and license notice.

Made by Eric with Agents. The repository holds a method the team can keep using—and the project judgement it should not have to rediscover.
