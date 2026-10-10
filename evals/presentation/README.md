# Agent-first introduction acceptance

The public entry is `docs/landing.html`. The README explains the actual Skill, installation, director and teammate prompts, expected outputs, and two project packs. Technical detail is progressively disclosed. The former showcase, workbench, member, team and call-flow URLs redirect to relevant sections rather than presenting separate simulated products.

The reading structure was informed by [huashu-design](https://github.com/alchaincyf/huashu-design): explain the outcome, put installation and real prompts near the front, demonstrate the work, then disclose mechanics. Its performance claims and design assets are not reused.

## Film acceptance

The same 24-second story ships as Chinese/English GIF and MP4. It illustrates a fictional UI task with original candidate art, not an approved production recording.

| Time | Visible operation |
|---|---|
| 0–4 s | Work, references and notes enter an agent request |
| 4–8.4 s | Concrete UI rules appear; the director reviews samples |
| 8.4–12.4 s | Rules, samples and delivery requirements form a project Skill and reach teammates |
| 12.4–17.2 s | A teammate requests three button states; task inherits project context |
| 17.2–21 s | The same task surface focuses on the disabled state and applies a rule-based correction |
| 21–24 s | Shared visual-memory claim and return-to-agent invitation |

Stable reading intervals alternate with eased transforms. The task-to-review match transition preserves the same button and card. Important text is large at the 800 px README output size. The site offers native controls, five chapter seeks, optional captions and a text alternative, with no autoplay or media preload.

## Verification

`python evals/presentation/check.py --probe --out evals/presentation/check.json` checks media digests, 24-second parity, GIF and MP4 budgets, codecs, faststart, local file links, redirect anchors, copy-button targets and captions. It does not grade aesthetics.

Browser review covers desktop and a 390 px phone viewport, horizontal overflow, installation/prompt layout, copy success feedback, chapter seeking and old links. The renderer supplies stills from each narrative beat for visual inspection. The root Skill and existing deterministic tests are verified separately under AGENTS.md.
