# Public presentation and visual memory

This guide governs Art Director’s own README, introduction and film. It does not impose a style on user projects.

## Explain the work

The fixed claim is **One team, one visual memory.** Chinese: **一个团队/项目，一份视觉记忆。**

The director turns references, rules and professional decisions into a distributable project Skill. Teammates create, review and deliver from that pack in their own agents. A solo creator can perform both roles. Visual memory includes visual language, component requirements, samples, permitted variation, delivery criteria and review records. Direction and release decisions remain with the director.

Readers should understand what to provide, what to ask their agent and what they receive. Use concrete starting prompts and actual outputs. Put fingerprints, command details and other engineering mechanics in expandable or specialist documentation.

## English first, one introduction

`README.md` and `docs/landing.html` are the English defaults. `README.en.md` is a maintained compatibility copy of the default README. `README.zh.md` and `docs/landing.zh.html` preserve the complete Chinese alternatives. Both languages share the same claims, section IDs, visual system and interaction script. Language switches preserve the current section. The root Skill, agent metadata and default human/agent guides use English, while user project documents follow the user’s requested language. Original project fixtures and detailed internal references may retain Chinese; label linked examples accordingly.

The website explains the product and provides the film, installation and starting prompts. Actual work happens in the agent. Legacy showcase and workbench addresses redirect to the corresponding section. Do not recreate competing simulated consoles or imply that a showcase button invokes a live model, approval service or team backend.

## Shared visual grammar, varied compositions

- Public palette: navy `#001f3f`, teal `#007d86`, mint `#92e4da`, mist white `#f5f9fb`.
- Use the repository’s OFL variable Noto Sans SC subset. Headers can use weight contrast, skew, rotation and image overlap; body copy stays upright and legible. Rebuild the subset after visible copy changes. Website and render font files must match.
- Use layers, occlusion, perspective and continuous object movement to explain how materials become rules, a pack and a task. Floating artwork alone does not demonstrate a function.
- Vary composition with the work: overlapping input materials, a focused requirement sheet, a distribution diagram, and a specific review change. Consistency does not mean duplicating every layout.
- Keep the website static for reading, with a manually played film, captions, transcript, keyboard focus, mobile layouts and reduced-motion behavior.

## One complete 24-second workflow

`motion/src/DepthShowcase.tsx` produces matched English and Chinese GIF/MP4 versions:

1. Give existing work, references and notes to the agent.
2. Define actionable component requirements and calibrate with samples.
3. Share rules, samples and delivery requirements as a project pack.
4. A teammate describes a task; the agent uses its rules, references and version.
5. Review the result, explain revisions and return shared issues to the director.

Each beat shows an input, action or result. Leave stable reading holds and use eased motion when relationships change. Chapter buttons pause on completed scenes rather than halfway through transitions. Keep the full film within the established 18–25 second range. Label the film as an illustrated workflow using original candidate artwork, not an approved production recording.

The default page, README preview, film, poster, captions and social preview are English. Chinese equivalents remain available. Reuse verified language editions when only the default language changes; regenerate any asset whose actual copy changes.

## Related roles belong at the end

Use the same four-role graphic as the companion repositories, with links to Market Intelligence, Reverse Analyst, Production Manager and Art Director. Show opportunity → competitor/system evidence → resource and project assessment → original art direction, with sample, player and effort feedback into earlier decisions. A solo creator wears four hats; a team shares responsibilities. Engineering implements and validates those decisions alongside art and content production.

Keep the role map the final main-content section in the README and introduction. On phones, show the same questions and handoffs as a legible vertical sequence. Link the full diagram and the detailed handoff guide. This is a collaboration map, not a claim that the Skills automatically orchestrate one another.

## Build and check

- GIF: 800 × 450, full 24-second story, 20 FPS during motion, 96-color palette and `gifsicle -O3 --lossy=20`; budget 6 MiB per language.
- MP4: 1280 × 720, 30 FPS, H.264 faststart; budget 5 MiB per language. Same-origin player sources, `preload="none"`, controls and no autoplay.
- Use a static reduced-motion fallback for the README. Keep captions and a text workflow beside the player.
- Use a version query when replacing cached media or fonts. Record file sizes and hashes in the manifest.
- Run the presentation checker; visually inspect the opening, densest work surface and conclusion in both languages. Check desktop/mobile layout, language switching, copy feedback, chapter stops and the final role map.
- Keep technical validation separate from visual approval and unmeasured productivity claims.
