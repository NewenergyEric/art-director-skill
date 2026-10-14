# Art Director — public design direction

## Purpose

Make the art director's judgment reusable, so people and agents can create coherent components from shared direction. Preserve the mood and playfulness that motivated the work. English is the public default, with a complete Chinese edition. The fixed claim is **One team, one visual memory.** / **一个团队/项目，一份视觉记忆。**

## Design foundation

The established reference study covered FDE, Refero, Motion Sites and React Bits on 2026-10-10. Retain the navy, teal, mint and paper reading surfaces and layered original artwork. Select display type against the actual game art; the repository's OFL Noto Sans SC remains available for readable text but is not the default aesthetic for every image. Google Play screenshots inform the relationship between lettering, composition and game content. No third-party characters, wordmarks or proprietary font files are reused.

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
| Reading type | Self-hosted OFL Noto Sans SC variable subset; display lettering chosen for the pictured project |
| Content width | 1160 px maximum, with responsive gutters |
| Reading rhythm | 17 px body, 1.75 line height; smaller supporting notes |

## Composition

Open the reading experience with the supplied story about the art-director friend. Keep its human voice before explaining installation and workflow. The product helps preserve and share aesthetic judgment; avoid forced slogans about swapping people or objects fitting together.

For Tidekeeper campaign imagery, follow the [game presentation method](../references/game-presentation.md): original game art and short, literal descriptions of shared direction, assigned components and composition. The current implementation is `motion/src/GameCampaign.tsx`, with webpage treatments in `docs/assets/campaign.css`; [element provenance](assets/tidekeeper-campaign/README.md) records generation and the official store reference. Its dimensional lettering and harbor materials belong to this example, not all games.

Give each image or section one purpose. Do not repeat the same thought as a headline, caption, label and footer. Display lettering may overlap art when that improves the composition; it need not be skewed or outlined. Allow English and Chinese different line lengths and letterform treatments rather than shrinking both into the same box.

Use flat editorial sections, generous space and fine dividers. Keep install and agent prompts easy to copy. Use the final dark section for the four-role diagram, with a vertical equivalent on phones. Match the companion repositories’ map and include concrete handoffs plus feedback. Native GitHub text follows GitHub’s fonts; custom typography belongs in rendered media.

## Motion and accessibility

Both languages use the same complete 24-second story. The GIF is 800 px / 20 FPS during motion, under 6 MiB; the 1280 × 720 MP4 is 30 FPS, faststart and under 5 MiB. These delivery rates do not prove animation quality. Character actions need meaningful poses, contact and timing; short frame sequences, rigs or generated animation are possible methods. Stable holds keep copy readable and chapter stops select completed scenes. See [motion rebuild instructions](../motion/README.md).

The website uses manual video playback, `preload="none"`, native controls, optional captions and a transcript. Preserve focus styles, reduced motion, semantic headings, language metadata and a non-image equivalent of the mobile role diagram. Check both language layouts rather than assuming translation fits.

## Evidence

Public packs are fictional runnable drafts and original candidate demonstrations. The movie illustrates the workflow; it does not prove completed AI production or director approval. Tool validation and visual acceptance remain separate. Do not invent measured rework savings, commercial results or automatic multi-Skill orchestration.
