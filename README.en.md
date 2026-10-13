<p align="right"><a href="README.md">中文</a> · <strong>English</strong></p>

[**Game Dev Skills**](https://github.com/NewenergyEric/NewenergyEric/blob/main/GAME-DEV-SKILLS.md) · [Market Intelligence](https://github.com/NewenergyEric/game-market-intelligence) · [Reverse Analyst](https://github.com/NewenergyEric/game-reverse-analyst) · [Production Manager](https://github.com/NewenergyEric/game-production-manager) · **Art Director**

# Art Director

### One team, one visual memory.

**Strong images. A game that still feels inconsistent?**

Turn the director’s references, work and notes into a shared project Skill. Start with a representative sample, then extend characters, items, environments and UI. Every task carries the project’s rules, references and checks. Solo creators can carry yesterday’s decisions into the next session, too.

<a href="https://newenergyeric.github.io/art-director-skill/docs/landing.en.html#film"><picture>
  <source media="(prefers-reduced-motion: reduce)" srcset="assets/readme/depth-preview-en.jpg?v=visual-memory-20261013">
  <img src="assets/readme/depth-preview-en.gif?v=visual-memory-20261013" width="100%" alt="24-second original game-art study: define a sample, extend an item family, check a composited board, revise and hand off a project pack.">
</picture></a>

<p align="center"><sub>24 seconds: from direction to team delivery · <a href="https://newenergyeric.github.io/art-director-skill/docs/landing.en.html#film">Watch the clear version</a> · <a href="docs/assets/motion/depth-showcase-en.mp4">Download MP4</a> · <a href="docs/CASE-STUDIES.en.md">Read the case evidence</a></sub></p>

## Install. Then work in your agent.

```sh
npx skills add https://github.com/NewenergyEric/art-director-skill
```

Use a tool that supports Agent Skills, such as Codex, Claude Code or Cursor. Give the agent access to your materials and say:

> Use `$art-director`. Here are our gameplay notes, references, existing work and art-director feedback. Propose the visual direction and make a representative sample. Then help establish the asset and component requirements and package them for the team.

Continue existing direction without rebuilding it. Your agent uses its available generation and editing tools; this Skill does not include an image model.

## Can the next person carry the direction forward?

![Tidekeeper: continued character, environment, merge chain and editable game UI in one composition.](docs/assets/tidekeeper/overview.png)

We ran **Tidekeeper** through a full handoff: establish character, workshop, item and UI samples; distribute a pack; start five tasks in a new directory; continue Alan's pose, the workshop's restoration, L3/L4 lamps and a new order.

**The first pass did not fully work.** The assets carried over, but the UI felt like empty cards. A landscape scene cropped out important windows on a portrait screen. The next candidate version added order characters, resource icons, repair materials, button states and a portrait adaptation, then recomposed the actual outputs.

<p align="center">
  <img src="docs/assets/tidekeeper/lamp-l1.png" width="21%" alt="L1 Pocket lamp">
  <img src="docs/assets/tidekeeper/lamp-l2.png" width="21%" alt="L2 Storm lantern">
  <img src="docs/assets/tidekeeper/lamp-l3.png" width="21%" alt="L3 Searchlight">
  <img src="docs/assets/tidekeeper/lamp-l4.png" width="21%" alt="L4 Coastal beacon">
</p>

Merged items now satisfy orders. Delivery consumes inventory, grants rewards and unlocks crates. Both orders must be complete before the restored workshop appears. **Consistency has to survive the actual delivery context.**

[Read the handoff and revisions](docs/TIDEKEEPER-HANDOFF.en.md) · [Try the Chinese game-art prototype](https://newenergyeric.github.io/art-director-skill/docs/assets/tidekeeper/member-ui.html) · [Read the project rules](examples/tidekeeper-handoff/style-pack.json)

This is one agent's relocated-directory self-test using original candidates. Human art-direction approval, device and engine acceptance remain open. [Earlier adventure, building and lamp studies](docs/CASE-STUDIES.en.md) retain their originals and revision records.

## From the director’s decisions to the team’s delivery

1. **Use the existing material.** Draft what each reference contributes and what must stay fixed.
2. **Calibrate with a sample.** Inspect shape, proportion, materials and purpose; revise a specific problem.
3. **Carry the rules into each task.** Teammates receive a project Skill, samples, references, version and delivery requirements.
4. **Check in context.** Review families, display size and combinations; return shared issues to the direction.

The handoff includes five readable guides, a project-specific Skill and the relevant files. It can be distributed as a ZIP. Existing tasks retain their original version; new tasks use the published current pack.

After receiving the director’s **complete project pack**, a teammate can say:

> Extend two levels of this lighting family. Keep the view, light and materials, with clearer upgrade silhouettes. Show the first article, then check it on the board. Record the rules used and the checks still open.

The director can continue:

> This is too realistic: ocean detail distracts from the repair. Simplify the surfaces and background. Keep character identity, hand contact and spatial relationships, then compare the revision.

## Why this exists

This Skill began in a conversation with an art-director friend who cared about character, atmosphere and how games connect people. Too much time went into repeating the same reference explanations, component decisions and revision notes.

The aim is to pass those decisions along with the work. The director keeps creative judgment; the agent organizes the context and handoff. The same need connects market research, competitive analysis and production planning in Game Dev Skills.

<!-- Testimonial reserved: no customer endorsement is claimed. -->

<details>
<summary><strong>Project packs, guides and requirements</strong></summary>

Core tools use Python 3.10+ and its standard library; Pillow is optional for pixel checks. You can also [download the current Skill ZIP](https://newenergyeric.github.io/art-director-skill/downloads/art-director.zip?v=visual-memory-20261013). Installing the general Skill does not grant access to private team materials.

[Human guide](docs/HUMAN-GUIDE.en.md) · [Agent integration](docs/AGENT-GUIDE.en.md) · [Skill reading edition](docs/SKILL.en.md) · [Game-art quality method](references/game-art-quality.md)

[Tidekeeper first-article draft](examples/tidekeeper-draft/style-pack.json) · [Harbor Studio setup example](examples/harbor-studio-draft/guides/00-index.md) · [Campaign design example](examples/campaign-studio-draft/guides/00-index.md)

```sh
python scripts/style_pack.py validate examples/tidekeeper-draft
python scripts/style_pack.py build examples/tidekeeper-draft --out NEW_PACK
```

</details>

<details>
<summary><strong>Validation and limits</strong></summary>

[Current CI](https://github.com/NewenergyEric/art-director-skill/actions) · [Original case evidence](docs/CASE-STUDIES.en.md) · [Workflow acceptance](evals/director-workflow-v0.5/acceptance.md)

File checks do not establish artistic quality; agent observations do not establish director approval. Pack tools run locally. Generation services follow the host’s tools and your authorization.

</details>

[Tell us where you got stuck](https://github.com/NewenergyEric/art-director-skill/issues/new?template=showcase.yml) · [MIT](LICENSE) · [Security](SECURITY.md)

Made by Eric and Agents.

## Four roles. One game worth making.

For a solo creator these are four hats; for a team they are connected responsibilities. Explore what is worth making, what competitors do, the resources it requires, and the original art that defines it.

[How the roles exchange evidence, scope and visual assets](docs/WORKFLOW.en.md) · [Explore all four roles](https://github.com/NewenergyEric/NewenergyEric/blob/main/GAME-DEV-SKILLS.en.md)

| Your question | Start here | Carry forward |
|---|---|---|
| What is worth making? | [Market research](https://github.com/NewenergyEric/game-market-intelligence/blob/main/README.en.md) | Options, sources and validation gaps |
| How does it work? | [Reverse analysis](https://github.com/NewenergyEric/game-reverse-analyst/blob/main/README.en.md) | Rules, implementation evidence and asset BOM |
| Can we scope and deliver it? | [Production planning](https://github.com/NewenergyEric/game-production-manager/blob/main/README.en.md) | SOW, work packages, dependencies and acceptance |
| What defines the art? | [Art direction](https://github.com/NewenergyEric/art-director-skill/blob/main/README.en.md) | Shared rules, representative samples and project pack |

**Solo creator:** start with the question blocking you and switch roles as needed. **Team:** hand off actual reports, BOMs, work packages and art rules, keeping sources, versions and open decisions visible.

This is a collaboration method; it does not include an orchestrator that automatically runs four agents in sequence.

![Market intelligence → competitor analysis → production assessment → original art direction; prototype and cost feedback revise earlier decisions.](docs/assets/workflow/workflow-en.png)
