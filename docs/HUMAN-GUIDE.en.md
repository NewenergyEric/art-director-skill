# Use Art Director in your agent

English · [中文](HUMAN-GUIDE.md)

Art Director helps a design lead establish professional rules, then share the rules, samples and delivery requirements as a project pack. Teammates use that pack in their own agents to create and review designs. Solo creators can take both roles and preserve decisions across sessions.

## 1. Install

```sh
npx skills add https://github.com/NewenergyEric/art-director-skill
```

You can also download a Skill ZIP as the [current build](https://newenergyeric.github.io/art-director-skill/downloads/art-director.zip?v=chinese-primary-20261011) and ask your agent to install it. Core helpers require Python 3.10+. Creation and editing use tools available in the host; this Skill does not include an image model.

## 2. Establish direction from existing materials

Put existing work, reference images, notes and project goals in a folder your agent can access. You do not need a complete specification to begin.

> Use `$art-director`. Organize these materials into a first art-direction draft. Help me define the asset and component requirements, calibrate with representative samples, and package the result for the team.

The agent gives you substantive content and distinguishes existing decisions, proposed rules and missing evidence. Respond naturally: “Make the button edge thicker” or “Keep the proportions from this character.” The agent updates the files; you decide the direction.

The result includes five guides: material index, project brief, design rules, delivery and review, references and counterexamples. Confirmed rules, samples, materials and the project-specific Skill travel in one pack. A production release requires actual decision records and the necessary samples.

## 3. Give teammates the complete project pack

The director exports and shares the full pack. A teammate gives it to their agent:

> Read this project pack. Create the default, pressed and disabled button states using its UI rules. Show me a first sample, the rules you used, and anything still needing a check.

The agent connects the task to relevant categories, components, references and the project version. Continue with “Check it in the main screen” or “Revise it from these notes.” No need to copy the director’s whole conversation or hand-edit JSON.

Installing the general Art Director Skill does not provide private project rules. Teammates also need the corresponding project pack.

## 4. Review, revise and update

> Check these assets against the rules. List each issue, its location, the rule behind it and a specific fix. Correct this button, then check related components for the same issue.

Technical checks and visual judgments have separate records. Unchecked work stays visible. Project-wide changes return to the director; new tasks use the new version while existing tasks retain their original version.

## 5. Connect the next role

Market Intelligence explores what is worth making. Reverse Analyst examines competitors and asset families. Production Manager assesses scope, capacity and work packages. Art Director develops original visual direction and the shared rules for production. Samples, prototype results and actual effort inform earlier decisions.

[24-second film and prompts](landing.en.html) · [Four-role handoff map](WORKFLOW.en.md) · [Example project pack, in Chinese](../examples/harbor-studio-draft/guides/00-index.md) · [Agent and engineering guide](AGENT-GUIDE.en.md)
