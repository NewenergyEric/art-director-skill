# Repair action · actual image-tool calls

2026-10-13. Built-in imagegen, transparent_background=true. Model, seed and pixel-size controls were not exposed by this tool; requested sizes in prompts were not returned exactly. Output of both calls is RGBA 1448×1086. These are original project candidates, reviewed by agents, without human art approval.

## Call 1 · eight real poses

Actual image inputs: `../../tidekeeper-production/character-repair.png` (pose/rendering) and `../../tidekeeper-production/character-base.png` (identity). Both were opened before generation. Raw result: `source/repair-eight-v1.png`.

```text
Use case: identity-preserve. Asset type: production-ready 8-frame game character action sprite sheet on real transparent alpha.
Input image 1 is the precise kneeling repair pose, outfit, tool, board and rendering reference. Input image 2 is identity reference for the SAME young adult female lamp artisan Alan: short tousled indigo hair, warm skin, large brown eyes, yellow short hooded rain cape, indigo denim overalls over white shirt, brown utility belt, coral work boots. Preserve this exact character, no redesign.
Create EIGHT genuinely different sequential drawings of a single hammering action, NOT copies translated or rotated. Layout is exactly FOUR columns and TWO rows, row-major order, equally sized rectangular cells, no borders, no letters or frame numbers. Each entire character, boots, wooden mallet and small wooden plank must fit well inside its own cell, with generous transparent gutters. Requested sheet canvas 2048x1536, cells 512x768.
Pose and camera match reference image 1: full body kneeling, viewed from front and a little above, angled toward screen-right. Left hand braces the far end of a small plank on the ground, safely away from the nail; right hand operates the wooden mallet. Knees, boots, plank and nail remain at exactly the same pixel positions relative to every cell and same scale throughout, as if locked animation pegs. The board sits near bottom right of each cell. No backdrop, cast floor shadow, debris, sparkles, effects or text.
Sequence:
1 ready: calm kneel, mallet held low above thigh, looks at the nail.
2 anticipation: shoulder and right elbow rise, mallet begins lift, slight upper-body lean.
3 high lift: right elbow bent, mallet above shoulder/head, gaze fixed on nail.
4 downswing: arm extends forward downward, hammer halfway toward nail, torso bends subtly.
5 CONTACT: mallet bottom face squarely touches nail head on the plank, arm follows, shoulder lowered, planted hand well clear.
6 follow-through: body settles and compresses at contact, mallet stays low, head dips.
7 recoil: elbow bends, mallet lifts a short distance, shoulder relaxes.
8 settle: mallet returns to near lap, torso eases back, expression relaxed.
Keep the large shaped folds and soft painted game rendering from input, no plastic gloss, no new costume pieces, no duplicate tools or extra arms. Distinguish joints, mallet angles, head inclination and body weight across all 8 frames. Frame 1 and 8 should be near matching rest poses. Real alpha transparency throughout outside the sprites.
```

Observed issue: sprites nearly touched at cell edges; uniform grid cropping would truncate some boots. Contact needed a clearer mallet-to-nail connection. Preserved for comparison, not used by runtime.

## Call 2 · targeted correction

Actual image input: the full raw output from call 1, supplied as the edit target. Raw result: `source/repair-eight-v2.png`.

```text
Use case: precise-object-edit. This is the repair animation sprite sheet for the same game character. Preserve these EIGHT real poses, character identity, outfit, proportions, rendering, and row-major order. Fix production layout and hammer contact only.
Create the final sheet on real transparent alpha: exact FOUR columns and TWO rows. Each cell must have the exact same dimensions. Every sprite must fit fully within its own cell, with at least 10% of the cell width TRANSPARENT SPACE on both sides. There must be a continuous transparent gutter between ALL neighboring sprites. The leftmost and rightmost boots must not touch the canvas edge. Scale all eight characters down equally to fit; keep EXACT same size and ground baseline in every cell. Fixed knee, two boots, plank and nail must occupy the same local cell coordinates in all eight frames. Alignment matters more than filling canvas.
Do not alter the sequence: rest, anticipation, high lift, downswing, contact, settle-on-impact, recoil, return-rest.
In frame 5 (bottom row first cell), ensure wooden mallet's bottom striking face actually touches the nail head centered over the nail, not hovering or striking the bracing fingers. In frame 6 hold that same contact and lower the nail slightly. Left hand holds far right edge of board away from impact. Small body/head changes appropriate to the eight poses. Keep plank shape and size consistent across all frames.
Do not add a grid, borders, labels, numbers, text, shadows, effects or background. No duplicated frames. Every character must remain fully visible including raised mallet in frame 3. Transparent gutters. Output landscape sheet around 4:3 aspect ratio.
```

Observed improvement: complete outer boots and more readable contact/recoil. The requested 10% gutters and exactly equal cells were still not achieved, so export uses observed transparent separators and fixed plank origins, recorded in repository-root `evals/tidekeeper-playable/export-action.py`. The export does not invent poses, deform limbs or interpolate frames. It only crops, pads and positions eight actual generated drawings onto equal 400×600 canvases.

Limit: small finger, fold and board changes remain between independently generated poses. This is an eight-frame narrative action candidate, not a skeletal rig or a complete isometric character set. Light and wave moments continue using older still poses, explicitly outside the new frame count.
