# Tidekeeper action candidate 0.6.0

Candidate assembly on the frozen Tidekeeper 0.3.0 draft direction. Human art-director approval is unrecorded.

## Actual production counts

| Quantity | Count | Meaning |
|---|---:|---|
| Image-generation calls | 9 | 4 lamp/lens calls and 5 repair/beckon calls, including failures |
| Raw generated images | 9 | All retained in `source/` |
| Selected generated source images | 7 | 3 lamp/lens sources and 4 articulated character sources |
| Selected drawn pose cells/single-frame edits | 12 | 6 lens poses; 5 cells and 1 contact correction for ignition |
| Articulated rig key poses | 14 | 8 repair and 6 beckon poses from generated continuous arm surfaces |
| Runtime PNG frames | 26 | 400×600 RGBA; shared scale within each action |
| Action families | 4 | Repair, lens installation, oil/ignition, beckoning |

These are actions for Alan and existing tools/fixtures, not 26 new entities. The game retains seven functional item families, sixteen merge tiers, two currencies and four construction chapters. The repair action is used for both pier work and lighthouse structural preparation.

The generated sources are actual tool outputs. Cropping, common-scale registration, articulated mesh deformation and alpha compositing produce the runtime frames. Whole-character image translation is not counted as a new pose. `ignition-contact-target.png` and `ignition-contact-v3-400.png` are deterministic derivatives, not extra generated sources.

## Action contracts

| Action | One phrase | Runtime | Contact / effect |
|---|---:|---|---|
| Repair | 1,200 ms / 8 poses | Two phrases, then hold | Mallet impact at 630 ms each phrase; local [256.8,517.2], world [529.95,834.8625] |
| Lens | 2,200 ms / 6 poses | One phrase | Seat 650 ms; latch 1,100 ms; release 1,450 ms; world lens appears after release |
| Ignition | 3,200 ms / 6 poses | One phrase | Pour 450 ms; set down 1,100 ms; wick approach 1,600 ms; ignite 2,050 ms; world beacon follows contact |
| Beckon | 1,400 ms / 6 poses | Three phrases, then hold | Open-hand signal; ground stays [498,864]; first frame before arrival, last frame after arrival |

Lens and ignition use a lamp-room close-up linked to the world lighthouse. Portrait and landscape placements preserve frame aspect. State rewards remain in the game core and cannot be paid by an animation callback.

## Evidence and limits

The candidate archive includes `production/lamp-actions/` and `production/dock-actions/`: actual prompts, reference hashes, read receipts, raw outputs, rejected attempts, exports and specialist reviews. The round handoff includes full normal-speed recordings and responsive screenshots.

Repair's highly raised elbow remains angular in two poses. Lens/ignition drawings have small clothing/foot-spacing/fixture-contour changes. These are discrete key poses with stepped timing, not a full skeletal animation system. Landscape preserves the tall harbor composition in a narrow central region and uses close-ups for action readability. Browser checks do not claim physical-phone validation or human art approval.
