# Art Director — public design direction

## Purpose

Make the use of the Skill clear: establish original art direction, package confirmed rules, and create consistent deliveries in the user’s own agent. Chinese is the default; the complete English alternative uses the same visual system. The fixed claim is **One team, one visual memory.** / **一个团队/项目，一份视觉记忆。**

## Design foundation

The established reference study covered FDE, Refero, Motion Sites and React Bits on 2026-10-10. The resulting navy, teal, mint and paper palette, expressive headline and layered original artwork are retained. Use the repository’s OFL Noto Sans SC variable face; no proprietary reference-site fonts or brand assets are redistributed. User reference screenshots inform layout, not imagery reuse.

The current canonical rules live in [public presentation](../references/public-presentation.md). The English and Chinese introduction pages are language editions of one product entrance. Former console and spatial-demo URLs redirect there.

## Visual tokens

| Role | Value |
|---|---|
| Dark canvas | `#001f3f` |
| Action and emphasis | `#007d86` |
| Highlight | `#92e4da` |
| Reading surface | `#f5f9fb` |
| Body ink / secondary | `#123344` / `#54717d` |
| Divider | `#c8d7dc` |
| Type | Self-hosted OFL Noto Sans SC variable subset |
| Content width | 1160 px maximum, with responsive gutters |
| Reading rhythm | 17 px body, 1.75 line height; smaller supporting notes |

## Composition

For Tidekeeper campaign imagery, follow the [game presentation method](../references/game-presentation.md): full-bleed game art, short action-led hooks, outlined dimensional display lettering and reusable original game elements. Do not use repeated explanation-column/phone-frame slides. The current implementation is `motion/src/GameCampaign.tsx`, with webpage treatments in `docs/assets/campaign.css`; [element provenance](assets/tidekeeper-campaign/README.md) records the actual generation and official store reference. These are this fictional project's materials, not a universal style for every game.

Keep one headline, one principal action and one original-art surface in the opening. The warm display hook overlaps the artwork with a slight skew and rotation; body text remains upright. Allow English and Chinese different line lengths instead of shrinking all type to fit a shared box.

Use flat editorial sections, generous space and fine dividers. Keep install and agent prompts easy to copy. Use the final dark section for the four-role diagram, with a vertical equivalent on phones. Match the companion repositories’ map and include concrete handoffs plus feedback. Native GitHub text follows GitHub’s fonts; custom typography belongs in rendered media.

## Motion and accessibility

Both languages use the same complete 24-second story. The GIF is 800 px / 20 FPS during motion, under 6 MiB; the 1280 × 720 MP4 is 30 FPS, faststart and under 5 MiB. Stable reading holds make each function understandable. Chapter stops select completed scenes, not transition frames. See [motion rebuild instructions](../motion/README.md).

The website uses manual video playback, `preload="none"`, native controls, optional captions and a transcript. Preserve focus styles, reduced motion, semantic headings, language metadata and a non-image equivalent of the mobile role diagram. Check both language layouts rather than assuming translation fits.

## Evidence

Public packs are fictional runnable drafts and original candidate demonstrations. The movie illustrates the workflow; it does not prove completed AI production or director approval. Tool validation and visual acceptance remain separate. Do not invent measured rework savings, commercial results or automatic multi-Skill orchestration.
