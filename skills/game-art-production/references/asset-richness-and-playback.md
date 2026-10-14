# Asset richness and sustained playback

Use this guide when expanding a playable asset set or investigating sparse content, repetitive motion or UI that feels detached from the game. Richness comes from what players can recognize, distinguish and use. The received project pack supplies the visual direction; this guide prescribes no asset quota, font, rendering style or interface layout. Extend the existing brief, batch record and receipt instead of creating another schema or approval system.

## Map the playable loop to coverage

Walk through the relevant loop: discovery, approach, interaction, resource use, construction, conflict and feedback as applicable. Record each asset's purpose, where it appears, what triggers its state and what the player can observe. A world resource, its inventory icon and its depleted state may share a family but serve different reading tasks. Permanent tools, consumables, currency, decoration and catalogue samples need accurate roles; appearing in a catalogue does not prove an item is usable.

Plan an **entity × state × direction × action phase** matrix in the existing task record. Mark required, deferred and not-applicable combinations with reasons drawn from the camera and mechanics. Do not make unused variants just to fill the matrix. Each required combination identifies its family or identity reference, owner, upstream first article, attachment/event dependencies, intended scale and receiving scene or component.

Use the same frozen baseline across related tasks. A migration records old and new baselines, affected assets and the compatibility decision. Compare old first articles, adjacent levels and new families together at the actual cell or world scale; then exercise their uses. Cover functional and stage gaps before adding more decoration, while preserving intentional differences between family members.

## Count sources, exports and uses separately

Report three different results: required gameplay functions, usable resources delivered and functions integrated into play. Alongside them, distinguish independent generation calls and raw outputs from distinct source-sheet cells, reusable art parts, rig keyframes, baked frames, atlas exports and playback steps. A rig baked into twelve frames has twelve exports; it does not establish twelve independent image generations. Reusing one panel twice or revisiting a frame during a loop does not create another design.

A crop, rename, scale change or recolour may be a legitimate export or variant, but does not by itself add a distinct function or drawing. Keep rejected and superseded outputs visible and out of accepted totals. Use IDs and source-to-export mappings to explain the counts, not just a contact sheet or list of filenames.

## Choose the missing state or motion deliberately

Keep the shared structure, camera, scale and attachment contract across states. Choose drawn frames, a rig, moving parts or another supported method according to the behavior. A rotating barrel can be a valid aiming mechanism; it does not establish independent views of a whole structure or prove loading, recoil and recovery. Declare the states actually provided.

Mirroring and shared parts can reduce production effort, but inspect handedness, asymmetric equipment, text, lighting and occlusion. Record unsupported directions rather than calling a profile a complete turnaround. When repeated generation fails to produce the needed gait or contact, preserve the failures and reconsider the production method at the task's revision checkpoint. More frames and different hashes cannot prove better motion.

Use [assembly and animation review](assembly-review.md) for crop, scale, contact, attachment and event timing checks. This guide adds coverage and evidence requirements; it does not replace those checks.

## Observe sustained play at 1×

After inspecting individual exports, use the actual runtime at **1× game speed**. Observe enough continuous play to cross loop seams and relevant starts, stops, turns, interruptions and state transitions. Exercise the applicable combinations, such as moving while acting, slowdown, pause/resume, resource depletion, failure and restart. Do not invent mechanics merely to satisfy a checklist.

Test real pointer or touch interactions at the target viewport as well as state-level checks. A correctly drawn object can still have a misplaced hit area after anchor, camera or scale transforms. Recheck any world menus, inventory skins, text and input after resizing; record which desktop, mobile viewport, simulated touch or physical-device conditions were actually tested.

Keep three evidence scopes separate: completion of a gameplay path, visual inspection of normal-speed playback and performance measurement. Record runtime/build, logical canvas, viewport, device pixel ratio, display scale, sampling mode, animation rate and game-speed setting. For performance, also record the environment, scene load, observed wall-clock interval, sample count and measured frame intervals, including slow frames or percentiles when collected. No single frame-rate target or short sample establishes smooth play on every device.

Disclose deterministic setup, state injection, accelerated time or skipped stages. A prepared scene followed by a short live recording can demonstrate that segment; it is not a full normal-speed playthrough. Identify the portions actually watched when using recordings or sampled frames. Static images establish static observations only. Retain observed contact quantization, subtle gait, incomplete transitions and other defects as `fail` or documented limitations; leave untested conditions `unknown`.

## Place UI and real typography in the game

Choose the information's purpose, location and lifetime before its skin. A world-anchored action menu can support a nearby object, while persistent resources or urgent information may need another placement. Panels, cards, radial controls, canvas and DOM interfaces are all project choices. Check actionable space, occlusion and spatial understanding in real interactions; changing the renderer alone does not make an interface belong to its world.

Specify content-safe areas, stretch behavior, transparent openings and component states. Keep changing text, numbers and shortcuts as real text unless the project explicitly requires baked artwork. Separate title lettering from body, action, numeric and system-message roles. Test actual copy, long labels, changing values, selected/disabled states and any required languages on the final background.

Deliver the actual font files or declared runtime dependency, provenance, permitted use and fallback. Confirm which font supplies the visible glyphs; a `font-family` declaration or successful file load is insufficient. When extending a subset, retain existing characters, outlines and advance widths at the relevant weights, plus required variable axes and licensing records, unless a recorded typography revision authorizes changes. Verify new coverage and old/new text together in the actual components; do not silently replace established glyphs while adding missing ones.

## Resume from saved production evidence

Assign stable task and output IDs and one explicit output root. Save the actual prompt and referenced inputs at invocation, then persist returned raw media, output IDs, available metadata and failures before export or integration. Label reconstructed prompts as reconstructions; never present them as original calls. Unreturned model names, seeds or settings remain `unknown`.

Track pending, failed, saved, exported, integrated and unchecked work separately in the existing records. After an interruption, inspect or resume the existing job/session before launching a duplicate. Check saved files, decoding, dimensions and hashes, then continue the missing steps. A timeout, empty response or completed wait is not evidence that an image was delivered. Reuse verified unchanged outputs and established tools; report unavailable capabilities and any substitute honestly.

Keep generated or drawn artwork, rigging and deterministic exports distinguishable. Scripts may crop, scale, arrange, bake or validate declared inputs; undisclosed placeholders do not complete missing artwork. Stage exports and check them before replacing working results. A failed item should not overwrite an otherwise usable batch.

## Return receipts without changing approval status

Carry the evidence in task notes and linked files through the existing [production contract](production-contract.md); do not add unsupported CLI fields or edit frozen receipts. Identify the pack version/fingerprint and manifest hash; actual prompts, input roles, returned metadata and raw-output hashes; asset IDs and use/state/direction mappings; source cells or parts, export settings and playback mappings; and delivered, integrated, missing or rejected items. Keep paths relative to the delivery, preserve failed versions and identify their replacements. Check a relocated delivery using its own files and tools rather than silently retrieving dependencies from the original workspace.

For each conclusion, retain `pass`, `fail` or `unknown`, the observation, evidence location and tested conditions. Preserve remaining direction gaps, mirroring differences, contact drift, static actions and device limits even when other tests pass. Technical validation, visual self-review, runtime acceptance and a director's decision are separate records. Candidate assets remain candidates without the corresponding decision; this is not a reason to request repeated permission for already authorized production and verification.
