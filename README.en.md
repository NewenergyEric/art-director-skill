<p align="right"><a href="README.md">中文</a> · <strong>English</strong></p>

# Art Director

### One team, one visual memory.

**Less re-explaining for the director. Shared context for the team.**

Turn scattered references, design rules and review notes into a project-specific Skill. The director builds the rules with an agent; teammates load the project pack into their own agents and continue from there. Characters, environments, UI, products and campaigns share the same foundation. Solo creators can wear both hats, keeping decisions consistent across sessions and deliveries.

<a href="https://newenergyeric.github.io/art-director-skill/docs/landing.en.html#film"><picture>
  <source media="(prefers-reduced-motion: reduce)" srcset="assets/readme/depth-preview-en.jpg?v=agent-first-20261010">
  <img src="assets/readme/depth-preview-en.gif?v=agent-first-20261010" width="100%" alt="24-second workflow: organize references, define rules and samples, share a project pack, create from those rules, review and revise.">
</picture></a>

<p align="center"><sub>A complete collaboration in 24 seconds · <a href="https://newenergyeric.github.io/art-director-skill/docs/landing.en.html#film">Watch the film</a> · <a href="docs/assets/motion/depth-showcase-en.mp4">Download English MP4</a></sub></p>

## Install, then ask

Install in an Agent Skills-compatible tool, such as Codex, Claude Code or Cursor:

```sh
npx skills add https://github.com/NewenergyEric/art-director-skill
```

Work in your agent. Put your materials in a folder it can read, then describe what you need.

### I’m the director. Help me establish the rules.

> Use `$art-director`. Here are our existing designs, references and notes. Draft our art direction, then help me define the character, environment and UI requirements. Prepare representative samples for me to review, and package the result for the team.

**You get:** a substantive draft, decisions that need your input, and a shareable project pack. Incomplete inputs are enough to start. The agent organizes what exists and asks about the gaps that matter next.

Revise it as you would with a colleague: “Make the buttons feel thicker; lower the saturation of the disabled state.” Or: “Keep these character proportions; clothing can vary.” The agent records those decisions and keeps the guides and pack in sync.

### I’m a teammate. Help me design within the rules.

Give your agent the **complete project pack** from the director, then say:

> Read this project pack. Create the default, pressed and disabled button states using its UI rules. Show me a first sample, explain which rules you used, and list anything still needing a check.

**You get:** a production task with its project version, relevant rules and references, followed by the sample and check record. Continue with “Check these states inside the main screen” without explaining the whole style again.

The agent creates or edits through the tools available in your environment. This Skill carries the rules into that work; it does not include an image model or design application.

### I have a result. Help me review and revise it.

> Check these assets against the project rules. List the inconsistencies, their basis and specific fixes. Correct this button first, then check related components for the same issue.

**You get:** an actionable revision list that distinguishes visual issues, technical issues and unchecked items. Changes affecting the whole project go back to the director before a new version is published.

## What it connects

| Where you are | What the Skill helps you do |
|---|---|
| Many references, no coherent spec | Organize project goals, visual language and asset or component requirements |
| Different interpretations of the same brief | Calibrate with representative samples and real compositions; record decisions |
| A teammate or vendor is joining | Share a pack containing rules, samples, references and delivery requirements |
| Several people are producing at once | Keep each task on a clear version, with fixed elements and allowed variations |
| Deliveries drift and revisions repeat | Review against the rules, explain fixes and capture recurring issues |

That shared context is the project’s **visual memory**. Consistent delivery leaves room for different designs.

## What the team receives

A project pack ready to zip and share, containing:

- **Five readable guides:** material index, project brief, design rules, delivery and review, references and counterexamples.
- **A project-specific Skill:** tells each teammate’s agent what to preserve and what may vary.
- **Materials and version records:** relevant references, samples, tools and file inventory travel together, without the original chat history.

Build on an existing design system. The director publishes updates; ongoing tasks retain their original versions so the rules do not shift midway.

## Explore two project packs

[Harbor Studio · game art](examples/harbor-studio-draft/guides/00-index.md): characters, environments, UI and item families in one specification.

[Weekend Light · campaign design](examples/campaign-studio-draft/guides/00-index.md): products, graphics, copy, UI and multiple formats delivered together.

Both are runnable fictional drafts with Chinese project-authored content. The film illustrates the workflow with original candidate artwork; it is not a recording of an approved production run.

<details>
<summary><strong>Requirements, offline package and technical documentation</strong></summary>

Core tools require Python 3.10+ and use the standard library; Pillow is optional for pixel checks. A Skill ZIP is also available as the [current build](https://newenergyeric.github.io/art-director-skill/downloads/art-director.zip?v=chinese-primary-20261011). Teammates need the director’s complete project pack; installing the general Skill does not provide project materials.

Designers use natural language. The agent handles files and commands.

[Detailed user guide](docs/HUMAN-GUIDE.en.md) · [Agent and engineering guide](docs/AGENT-GUIDE.en.md) · [Skill reading edition](docs/SKILL.en.md) · [Project pack contract](references/pack-contract.md)

```sh
python scripts/style_pack.py validate examples/harbor-studio-draft
python scripts/style_pack.py build examples/harbor-studio-draft --out NEW_PACK
```

</details>

---

<details>
<summary><strong>Validation and limits</strong></summary>

108 deterministic tests cover packs, rule references, frozen versions, delivery checks and relocation. Python 3.10 / 3.12 runs on Windows / Linux; the film and CodeQL have independent checks.

[Current CI](https://github.com/NewenergyEric/art-director-skill/actions) · [Reproducible acceptance evidence](evals/director-workflow-v0.5/acceptance.md)

These checks verify files and workflow contracts, not aesthetic quality or acceptance inside a real design tool or engine. Unknown specifications, proposals and unchecked work stay visible.

Pack tools run locally and do not automatically upload project materials. Generation and editing services follow your host tools and authorization.

</details>

---

[MIT License](LICENSE) · [Security](SECURITY.md) · [Share feedback](https://github.com/NewenergyEric/art-director-skill/issues/new?template=showcase.yml)

Made by Eric and Agents.

## Four roles. One game worth making.

For a solo creator these are four hats; for a team they are connected responsibilities. Explore what is worth making, what competitors do, the resources it requires, and the original art that defines it.

[How the roles exchange evidence, scope and visual assets](docs/WORKFLOW.en.md) · [Art Director](https://github.com/NewenergyEric/art-director-skill)

![Market intelligence → competitor analysis → production assessment → original art direction; prototype and cost feedback revise earlier decisions.](docs/assets/workflow/workflow-en.png)
