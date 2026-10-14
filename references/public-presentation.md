# Public presentation and visual memory

This guide governs Art Director’s own README, introduction and film. It does not impose a style on user projects.

## Explain the work

The fixed claim is **One team, one visual memory.** Chinese: **一个团队/项目，一份视觉记忆。**

The director makes their judgment reusable: references, samples, what can change and what must remain. Teammates and agents use that shared direction to create consistent components. A solo creator can perform both roles. The point is to carry taste, mood and playfulness into production, not replace them with a checklist. Direction and release decisions remain with the director.

Lead with the author's supplied story about the art-director friend and the repeated burden of explaining a project's feel. Preserve its first-person voice and factual limits; do not invent conversations, adoption or results. Follow the story with what the Skill helps the reader do, concrete starting prompts and actual outputs. Keep fingerprints and command details in specialist documentation.

## English primary, Chinese available, one introduction

`README.md` and `docs/landing.html` are the English defaults; `.en` addresses remain English aliases. `README.zh.md` and `docs/landing.zh.html` provide the Chinese editions. Both languages share claims, section IDs, visual direction and interaction code; switches preserve the current section. Skill entrypoints and agent metadata use English, and `docs/SKILL.zh.md` preserves the Chinese mother-Skill reading edition. Existing project fixtures keep their original evidence and language. Replies and project outputs follow the user, not the public website's default language.

The website explains the product and provides the film, installation and starting prompts. Actual work happens in the agent. Legacy showcase and workbench addresses redirect to the corresponding section. Do not recreate competing simulated consoles or imply that a showcase button invokes a live model, approval service or team backend.

## Shared visual grammar, varied compositions

- Public palette: navy `#001f3f`, teal `#007d86`, mint `#92e4da`, mist white `#f5f9fb`.
- Keep public body text legible and use redistributable font files. The repository's Noto Sans SC subset is an available source, not a universal display style. Choose or design display lettering against the actual game art; shape, texture and spacing need to belong to that world. Record new font sources and rebuild subsets when needed. Equivalent website and film treatments must agree.
- Use layers, occlusion, perspective and continuous object movement to explain how materials become rules, a pack and a task. Floating artwork alone does not demonstrate a function.
- Vary composition with the work: source art, related components in their intended context, and a specific revision. Give each surface one point. Remove repeated slogans, forced wordplay and commentary that merely narrates what is visible. Consistency is shared direction, not identical layouts or identical assets.
- Keep the website static for reading, with a manually played film, captions, transcript, keyboard focus, mobile layouts and reduced-motion behavior.

## One complete 24-second workflow

`motion/src/DepthShowcase.tsx` registers the matched English and Chinese GIF/MP4 compositions in `GameCampaign.tsx`:

1. Establish the shared art direction and show the original project.
2. Establish representative samples and actionable rules, then pack their dependencies.
3. Show actual member continuations across character, environment, items and UI.
4. Compose the new assets and operate the same editable UI source: merge, order, inventory and feedback.
5. Compare actual before/after outputs and carry discovered gaps into a new candidate version.

Each beat shows an input, action or result. Use the core claim where it introduces or concludes the idea, rather than repeating it over every scene. Leave stable reading holds; actual character actions need their own poses, deformation or animation, not a single transform applied to every image. Chapter buttons pause on completed scenes. Keep the film within 18–25 seconds and label it as an illustrated workflow using original candidate artwork, not an approved production recording.

The default page, README preview, film, poster, captions and social preview are English. Keep the Chinese edition aligned. Reuse verified media when only a default changes; regenerate assets whose visible copy changes.

## Art is the evidence

Lead with original game artwork, a concrete player or production problem, and a visible consequence. Use different visual languages for different genres, not one board recolored. The current cases cover merge props, an illustrated adventure environment and isometric upgrades. Preserve the initial images and targeted revisions; link prompts, reference relationships and file checks from the case guide. Do not publish third-party reference artwork as our work.

Separate concept boards from individual assets and individual assets from engine-ready deliverables. Use the first-article and context checks in `game-art-quality.md`. Keep work marked candidate until an actual director decision exists. A self-review cannot establish that our art exceeds a benchmark account or measures real-player performance.

## Related roles belong at the end

Use the same four-role graphic as the companion repositories, with links to Market Intelligence, Reverse Analyst, Production Manager and Art Director. Show opportunity → competitor/system evidence → resource and project assessment → original art direction, with sample, player and effort feedback into earlier decisions. A solo creator wears four hats; a team shares responsibilities. Engineering implements and validates those decisions alongside art and content production.

Keep the role map the final main-content section in the README and introduction. On phones, show the same questions and handoffs as a legible vertical sequence. Link the full diagram and the detailed handoff guide. This is a collaboration map, not a claim that the Skills automatically orchestrate one another.

## Build and check

- Current GIF delivery: 800 × 450, full 24-second story, 20 FPS, 128-color palette and `gifsicle -O3`; budget 6 MiB per language. Reassess palette quality against the actual artwork when the film changes.
- MP4: 1280 × 720, 30 FPS, H.264 faststart; budget 5 MiB per language. Same-origin player sources, `preload="none"`, controls and no autoplay.
- Use a static reduced-motion fallback for the README. Keep captions and a text workflow beside the player.
- Use a version query when replacing cached media or fonts. Record file sizes and hashes in the manifest.
- Run the presentation checker; visually inspect the opening, densest work surface and conclusion in both languages. Check desktop/mobile layout, language switching, copy feedback, chapter stops and the final role map.
- Keep technical validation separate from visual approval and unmeasured productivity claims.
