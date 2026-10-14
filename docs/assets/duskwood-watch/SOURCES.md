# Sources and production record

All game art was produced in this task with the built-in image_gen tool on 2026-10-13. The user supplied a mixed reference collage for observation; it is not included in the deliverable. The selected direction is an original painterly cold forest with warm lamps, readable silhouettes, and a clear road. No source character or logo was traced or reused.

## Generated art

| Asset | Production input and retained evidence |
| --- | --- |
| Keeper identity | Original elderly lantern keeper study; raw output is assets/source/keeper-base-original.png. Source generation ID: exec-a60b32da-cef8-4e3b-92f0-51665425ba4c. |
| Forest map | Generated with the keeper identity image as the brush/material reference, 1536×1024. Source generation ID: exec-a1ba621d-81fa-491a-b779-360645c6e384. Final map.png retains the source image. |
| Keeper walk | Two actual generations. Exact prompts and both raw sheets are in evidence/keeper-animation-*.txt and evidence/animation-source/. The extraction prompt was drafted but NOT executed. |
| Towers, shrine, ordinary enemy, icons | Exact prompts are in evidence/asset-prompts/; original outputs in assets/raw/. |
| Enemy walk and brute | Two walk generations (first rejected for clipping) and one independent brute generation. See evidence/asset-prompts/, assets/raw/, and evidence/enemy-action-review.md. |

The original keeper/map prompt text was not saved verbatim to a file during those two calls. The following is a reconstruction of their briefs, NOT an exact tool-call transcript: an elderly woman ranger with an asymmetrical bent ochre hood, gray hair, long nose, deep teal cloak, heavy boots, lantern and curved staff, broad matte gouache brushwork, transparent background; a 3:2 light top-down forest map with no horizon, cold border vegetation, warm readable winding earth road and clear build areas, without characters, text, UI or buildings. This provenance gap is retained rather than silently inventing a literal prompt.

The built-in image tool did not expose model version, seed or sampling parameters; these are unavailable. Export scripts only crop, uniformly scale, register and assemble existing generated pixels. They do not draw character poses or synthesize missing frames.

## Fonts

- Noto Serif SC: [Google Fonts source](https://github.com/google/fonts/tree/main/ofl/notoserifsc), SIL Open Font License 1.1. title.woff2 is a local text subset; license is assets/notoserifsc-OFL.txt.
- Noto Sans SC: [Google Fonts source](https://github.com/google/fonts/tree/main/ofl/notosanssc), SIL Open Font License 1.1. ui.woff2 is a local text subset; license is assets/notosanssc-OFL.txt.
- Font coverage for current Chinese copy is recorded in evidence/font-coverage.json. The full TTF source files are archived separately in artifacts/source-fonts at the repository root and are not required to play. Rebuild with fontTools and evidence/build-fonts.py --source-dir pointing to those two TTF files.

## Code and sound

Canvas rendering, game logic, editable HTML/CSS UI, server and synthesized sound effects were implemented by the agent team in this task. No remote runtime service or external audio recording is used. The optional browser QA client derives from the installed develop-web-game Skill; adaptations add DuskGame.ready waiting, environment-configured Playwright/Chrome, and launch argument handling. Test files require a local Playwright installation; playing the game only needs Node.js and a browser.

All art and direction remain candidate/draft. Browser and file checks are not a human art-director approval.


## V2 — 2026-10-13 to 2026-10-14

The default entry now uses the V2 assets. Exact prompts, failed versions, export records and receipts are under evidence/v2/{actors,weapons,world,map,typography}. Three subagents worked against frozen pack 0.3.0 and explicitly migrated to compatible 0.3.1; integration is the 0.4.0 candidate.

The keeper rig uses 11 generated painted parts with recorded pivots, parents and 12 keyframes. Exporting this rig to a 12-frame sprite strip is deterministic animation baking, not 12 independent image generations. Source anatomy, joint chains and constraints remain editable JSON plus PNG parts. The new map and title each have an actual image_gen call receipt. Model/seed remain unavailable where the tool did not return them.

V2 UI uses Noto Sans SC only; Noto Serif SC is retained solely for the V1 historical entry and is not loaded by V2. Custom generated title lettering is used only for the four-character title. All changing UI text remains real Canvas text with the local licensed Sans subset. The font source/license links above apply; evidence/font-coverage.json contains the current glyph test.

Reference research is documented in evidence/v2/reference-study.md. Gameplay mechanisms inspired by the user's proposals are not represented as exact rules of the referenced commercial games. No third-party game art is distributed.
