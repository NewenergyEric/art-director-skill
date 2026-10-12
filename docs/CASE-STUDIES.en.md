[中文](CASE-STUDIES.md) · [Back to the introduction](https://newenergyeric.github.io/art-director-skill/docs/landing.en.html#cases)

# Three game problems. Three art approaches.

These original candidates were generated and revised on 2026-10-13. They test whether art direction can become observable work, related assets and a transferable task. Each study uses a different language of shape, material and space.

Generation, agent visual inspection and file checks are recorded separately. No art director has approved these for production. Player testing and engine acceptance remain open.

<a id="tidekeeper"></a>

## 01 · Tidekeeper: four levels need more than four colors

**Task.** Establish a coastal repair-and-merge world through a lamp repair scene, then extend its visual language into four distinguishable items.

![Revised harbor key art](assets/cases/tidekeeper.jpg)

**Design decisions.** A mustard cape and indigo overalls identify the character. Sea-green enamel and warm brass connect tools, lamps and environment. Hand-to-lamp contact gives the action a focus; the jetty connects the work area with a distant lighthouse. The first image had excessive surface realism. The revision simplifies color planes and detail while retaining identity, action and space.

<details><summary>Actual first image and revision prompt</summary>

![First image, before the surface revision](assets/cases/tidekeeper-before.jpg)

[Initial prompt](../examples/game-art-studies/prompts/tidekeeper-keyart.txt) · [Revision prompt](../examples/game-art-studies/prompts/tidekeeper-edit-v2.txt)

Actual images were supplied to the tool. A recorded path does not replace attaching the reference image to a generation call.

</details>

**Family extension.** The four PNGs were generated separately. L1 / L2 use the harbor image as a style reference; L3 / L4 use L2 to retain the material treatment. A squat lamp, handled lantern, circular searchlight and tapered beacon distinguish levels through structure.

![Separate PNGs composited at 64 and 96 px on light and dark backgrounds](assets/cases/readability.png)

**What the checks found.** Initial L1 / L3 exports contained very low-alpha pixels at the canvas edge; L2 had insufficient top clearance. Distribution files preserve the entire source canvas, resize it to 384 × 384 and center it on a transparent 512 × 512 canvas. No pixels were cropped or alpha-thresholded. Minimum clear margins are now **64 / 68 / 64 / 80 px**. All four have visible subjects and an alpha range of 0–255.

In agent visual inspection, the lens and handle remain distinguishable at 64 px. The tall L2 / L4 silhouettes occupy less horizontal space, so their cell occupancy still needs a decision in the real project. 64 / 96 px are study sizes. This proof and the film's board are browser composites, not game recordings.

**Handoff evidence.** The [actual rule source](../examples/tidekeeper-draft/style-pack.json) contains six proposed rules, four prop entities, references and open questions. Rules and samples remain `proposed` / `candidate`. Without approval, they cannot become a production baseline. The [execution record](../examples/game-art-studies/verification.json) covers packaging, verification after relocation and release rejection.

[Generation prompts](../examples/game-art-studies/prompts/) · [Dimensions, alpha and hashes](../examples/game-art-studies/assets.json)

<a id="bramble"></a>

## 02 · Bramble Courier: a beautiful world needs a readable route

**Task.** A badger courier with a vermilion scarf crosses a branch bridge toward a post office where a giant moth rests. Create an illustrated adventure scene with a clear destination and depth.

![Bramble Courier](assets/cases/bramble.jpg)

**Design decisions.** Dark foreground shapes frame the scene. A middle-distance path connects the composition. Pale mist separates the small character; a warm envelope-shaped window marks the destination. Ink edges, dry-brush planes and irregular silhouettes specify the direction more clearly than generic adjectives.

**Observed.** Character, route and destination have readable spatial roles, with a different material and shape language from Tidekeeper. **Still open.** No collision, navigation, interactive hotspot, scrolling-layer or player eye-tracking tests were performed. A playable level needs its own layering and occlusion requirements.

[Full generation prompt](../examples/game-art-studies/prompts/bramble-keyart.txt)

<a id="depot"></a>

## 03 · Red Dune Depot: upgrade the building, keep the world

**Task.** Design a hut, water tower and wind-pump depot in a common isometric view. New functions change the massing while the entrance, cream adobe, petrol-colored beams and orange awning remain related.

![Three depot upgrade concepts](assets/cases/depot.jpg)

**Design decisions.** Water storage and power equipment explain the structural additions. Shared construction vocabulary establishes a family; a common camera makes the progression comparable.

**Actual revision.** The first rotor had the wrong number of blades. A targeted edit requested exactly four on the rightmost building while preserving the buildings, camera and arrangement. Four blades are visible in the result. Pixel-for-pixel preservation elsewhere was not automatically verified.

<details><summary>First image and targeted correction</summary>

![Depot before rotor correction](assets/cases/depot-before.jpg)

[Initial prompt](../examples/game-art-studies/prompts/depot-upgrades.txt) · [Rotor correction](../examples/game-art-studies/prompts/depot-rotor-fix.txt)

</details>

This is an upgrade concept board. Separate transparent buildings, tile footprints, meshes and engine prefabs have not been produced or accepted.

## Use the method in your project

Give your agent the player experience, existing work and references. Establish one representative first article, describing visible shape, proportion, materials, camera and detail density. Extend a family, reduce it to its use size, and inspect it in context. Revise the specific problem and retain the original, inputs and open checks.

The method is now part of [game-art quality](../references/game-art-quality.md) and the [first-article record](../templates/game-art-first-article.template.md). It extends the existing pack, version and handoff workflow without imposing these example styles on another project.
