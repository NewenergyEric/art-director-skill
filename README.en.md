<p align="right"><a href="README.md">中文</a> · <strong>English</strong></p>

<p align="center">
  <a href="https://github.com/NewenergyEric/art-director-skill/actions/workflows/ci.yml"><img alt="Validate skill" src="https://github.com/NewenergyEric/art-director-skill/actions/workflows/ci.yml/badge.svg"></a>
  <a href="https://github.com/NewenergyEric/art-director-skill/actions/workflows/codeql.yml"><img alt="CodeQL" src="https://github.com/NewenergyEric/art-director-skill/actions/workflows/codeql.yml/badge.svg"></a>
  <a href="https://github.com/NewenergyEric/art-director-skill/releases/tag/v0.5.1"><img alt="Release v0.5.1" src="https://img.shields.io/badge/release-v0.5.1-225d4b.svg"></a>
  <a href="LICENSE"><img alt="MIT License" src="https://img.shields.io/badge/license-MIT-151715.svg"></a>
  <img alt="Python 3.10+" src="https://img.shields.io/badge/Python-3.10%2B-3272b8.svg">
</p>

# Art Director · a visual production system for directors and teams

> ## Let the art director establish the system, then let the whole team work from it.

Art Director is an installable Agent Skill. It guides an art or design director from existing work, references, notes, and project goals to a professional project position, visual language, category and component families, representative exemplars, first-piece gates, delivery requirements, and version policy. It then packages those decisions so teammates, vendors, and other agents can apply them directly.

Outfit changes, pose changes, and single-image tasks remain useful member examples. The default product flow is broader: **director setup → exemplar calibration → project package → team production → batch review → specification update.**

<p align="center">
  <a href="https://newenergyeric.github.io/art-director-skill/"><strong>Open the director workbench</strong></a>
  · <a href="SKILL.md">Read the Skill</a>
  · <a href="https://github.com/NewenergyEric/art-director-skill/releases/tag/v0.5.1">Download v0.5.1</a>
</p>

## Two roles, one production chain

| Art or design director | Teammate or vendor |
|---|---|
| Turns scattered material into a concrete draft for review | Receives a project package without needing the director's chat history |
| Defines the shared language, categories, component families, fixed parts, and variables | Requests character, environment, UI, product, or composition work in natural language |
| Chooses representative exemplars and first pieces that resolve risk | Gets the current version, category, family, identity, and references bound automatically |
| Defines source-file, export, composition, channel, and acceptance requirements | Delivers the asset, editable source, composition result, and review evidence |
| Decides whether better results justify a new baseline | Starts new work from the active version while existing tasks stay frozen |

```text
Existing material and professional judgement
  → project position / shared visual language
  → categories, components, and asset families
  → representative exemplars / first pieces / composition calibration
  → portable rules, references, guides, and tools
  → version-bound team production and delivery
  → batch checks, targeted rework, and proposal review
  → the director publishes the next baseline
```

## How a director starts

After installation, give the agent the material you already have and say:

> Use `$art-director`. I do not have a complete specification yet. First turn the existing work, references, and notes into a concrete draft I can review. Then guide me through project positioning, visual language, component and asset-family requirements, allowed variation, representative exemplars, and acceptance rules. Finally package the result for the team.

The Skill produces useful content before asking the remaining decision questions. It keeps observed facts, confirmed director decisions, agent proposals, and genuinely open issues separate instead of handing the director an empty questionnaire.

The resulting package derives five human-readable guides from one source:

| Guide | What the team gets from it |
|---|---|
| Index | Current version, rules, references, exemplars, entrypoints, and open issues |
| Positioning | Audience, use context, visual objective, and production scope |
| Design system | Shared language, categories, families, identities, fixed parts, and variables |
| Delivery and review | First pieces, editable sources, exports, compositions, and channel checks |
| Reference guide | What each source is for, what it must not contribute, and what is approved |

## How the team calls it

Each project package carries its own `SKILL.md`, structured specification, readable guides, approved references, runtime tools, and content fingerprints. A teammate gives the package to their agent and describes the work:

> Create a first piece for this project's HUD button family in normal, pressed, and disabled states. Reuse the director's rules and references, and prepare actual-size and composition checks.

Or:

> Use this campaign's product, graphic, typography, and UI components to make a landscape banner and a portrait poster. Preserve product and information identity, reflow for each channel, and deliver editable sources plus composition evidence.

The agent binds the task to a fixed project version and family, then prepares its production brief, references, handoff requirements, and explicit checks. Wrong versions, family mismatches, missing files, and unchecked claims stay visible. A passing single asset still needs a final composition review.

## Install

```sh
npx skills add https://github.com/NewenergyEric/art-director-skill
```

The mother Skill ZIP is also available from the [v0.5.1 release](https://github.com/NewenergyEric/art-director-skill/releases/tag/v0.5.1). Core tools require Python 3.10+ and use only the standard library. Pillow is optional for image dimensions and transparency checks. Remotion is only used for repository media.

## Runnable public examples

| Entry | What it demonstrates |
|---|---|
| [Director workbench](https://newenergyeric.github.io/art-director-skill/) | The full path from source material and positioning through families, exemplars, team use, and iteration |
| [Harbor Studio](examples/harbor-studio-draft/guides/00-index.md) | Eight game-production families, exemplar planning, tasks, and member handoff |
| [Weekend Drinks](examples/campaign-studio-draft/guides/00-index.md) | One specification across product, graphics, typography, UI, and channel compositions |
| [Member task example](https://newenergyeric.github.io/art-director-skill/docs/member-workbench.html) | Scoped single-asset work, exploration, frozen versions, and composition calls |
| [Team production film](https://newenergyeric.github.io/art-director-skill/docs/team-production.html) | Parallel character, environment, tile, prop, UI, motion, and vendor lanes |
| [Call flow](https://newenergyeric.github.io/art-director-skill/docs/call-flow.html) | The files, tools, and decision boundary behind every stage |

All examples are original candidate fixtures. A direction board is not presented as an approved exemplar, and its pixel dimensions do not become a production specification.

## Package and tools

```text
project-art-direction/
├── SKILL.md               # entrypoint for the team's agent
├── style-pack.json        # single source of truth
├── STYLE.md               # readable project specification
├── guides/                # position, design system, delivery, and references
├── references/            # project material approved for sharing
├── scripts/               # build, task, version, and batch tools
├── agents/                # agent UI metadata
└── manifest.json          # file list and content fingerprints
```

Agents operate the commands; designers do not need to author JSON or memorize a CLI:

```sh
python scripts/style_pack.py validate examples/harbor-studio-draft
python scripts/style_pack.py render examples/harbor-studio-draft
python scripts/style_pack.py build examples/harbor-studio-draft --out NEW_PACK
python scripts/project_runtime.py init --pack NEW_PACK --out MEMBER_WORKSPACE --allow-draft
python scripts/team_batch.py check BATCH_JSON --pack NEW_PACK --out NEW_REPORT_JSON
```

Builds, archives, and task snapshots refuse destructive overwrites. A production release requires real approval evidence, required exemplars, and critical specifications. Candidate packages can support exploration and onboarding without granting production approval.

## Validation status

- 108 deterministic tests cover the source of truth, cross-references, family and component binding, version freezing, relocation, batch delivery, path boundaries, fingerprints, and overwrite refusal.
- GitHub Actions runs Python 3.10 and 3.12 on Windows and Linux, with separate Remotion and CodeQL jobs.
- Two complete examples derive ten guides and start six member tasks from independently unpacked packages; 30 workflow assertions pass.
- An independent agent used one original direction board to create a position, eight families, 22 candidate rules, five exemplar plans, and a handoff package.

[Read the v0.5 acceptance record](evals/director-workflow-v0.5/acceptance.md) · [Read the implementation note](docs/director-workflow-v0.5.md) · [View current CI](https://github.com/NewenergyEric/art-director-skill/actions)

Structural and tool checks establish the workflow contract. They do not replace real art-quality review, Photoshop or Figma editing, engine or channel integration, accountable approval, or human-team efficiency studies.

## Security and boundaries

Project-package tools run locally, read no credentials, send no telemetry, and do not upload project material. They do not treat a typed approver name as authorization, judge aesthetic quality automatically, or declare concept art production-ready based on appearance alone.

[Read the security statement](SECURITY.md) · [Report a vulnerability privately](https://github.com/NewenergyEric/art-director-skill/security/advisories/new) · [MIT License](LICENSE)

## Repository layout

```text
├── SKILL.md              # mother Skill entrypoint
├── references/           # director, member, review, and team methods
├── templates/            # direction, task, batch, delivery, and change records
├── scripts/              # pack, runtime, batch, and pilot tools
├── examples/             # original project drafts and member workspaces
├── tests/                # deterministic behavior tests
├── evals/                # public validation evidence
├── docs/                 # interactive workbench, call flow, and implementation notes
├── motion/               # Remotion source
└── assets/readme/        # README media
```

Built by Eric and Agents.
