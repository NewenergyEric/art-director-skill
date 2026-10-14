// Continuous same-source motion. Timing keys are not new painted frames.
window.TIDEKEEPER_ANIMATION = {
  "version": "0.6.2-candidate",
  "humanApproval": null,
  "projectFingerprint": "fc586948fa3f8e059f42c5710729e4aa531e1781f0ffe91f0ef2104842e21e3a",
  "actions": {
    "repair": {
      "displayBox": [
        385.5,
        543.9375,
        225,
        337.5
      ],
      "groundLocal": [
        200,
        569
      ],
      "contactLocal": [
        256.8,
        517.2
      ],
      "loops": 2,
      "status": "candidate; same-source continuous 2D action",
      "rig": "TidekeeperMotion",
      "method": "fixed clean underlay, localized elbow mesh, rigid hand and tool, explicit tool ownership",
      "source": "art/actions-v062/repair-master.png",
      "sourceSha256": "95632c2caa587f7710e4f84cbba06bd2ea6966d7a24499e84102708cf3aa8cf0",
      "frameSize": [
        400,
        600
      ],
      "frames": [
        {
          "src": "art/actions-v062/repair-master.png",
          "duration": 180,
          "phase": "ready",
          "keyType": "timing-key; not a painted animation frame"
        },
        {
          "src": "art/actions-v062/repair-master.png",
          "duration": 260,
          "phase": "backswing",
          "keyType": "timing-key; not a painted animation frame"
        },
        {
          "src": "art/actions-v062/repair-master.png",
          "duration": 90,
          "phase": "downstroke",
          "keyType": "timing-key; not a painted animation frame"
        },
        {
          "src": "art/actions-v062/repair-master.png",
          "duration": 120,
          "phase": "impact",
          "keyType": "timing-key; not a painted animation frame",
          "event": "impact"
        },
        {
          "src": "art/actions-v062/repair-master.png",
          "duration": 170,
          "phase": "recoil",
          "keyType": "timing-key; not a painted animation frame"
        },
        {
          "src": "art/actions-v062/repair-master.png",
          "duration": 380,
          "phase": "settle",
          "keyType": "timing-key; not a painted animation frame"
        }
      ],
      "paintedSourceFrames": 1,
      "newPaintedAnimationFrames": 0,
      "keyType": "timing markers for continuous motion; not newly drawn frames",
      "events": []
    },
    "lens": {
      "status": "candidate / exported; runtime acceptance pending",
      "asset": "lens",
      "source": "art/actions-v060/source/lens-v1.png",
      "sourceSha256": "a64e3f955bd1c1af1bd0ef1b978e85fbf4365ed0c11382590e44bea5c5eef83d",
      "sourceSize": [
        1254,
        1254
      ],
      "requestedSourceSize": [
        1536,
        1536
      ],
      "sourceCount": 1,
      "distinctSourceCells": 6,
      "exportedFrames": 6,
      "frameSize": [
        400,
        600
      ],
      "uniformScale": 0.88,
      "display": "lamp-inset",
      "groundLocal": [
        310,
        560
      ],
      "registrationAnchorRole": "bottom center of stationary lamp pedestal; manually measured in each source cell",
      "cropReview": "Actual alpha>=16 content checked against measured inter-cell gaps. Per-row crop boxes account for sheet-grid drift. Faint alpha retained. No per-frame bbox fit.",
      "duration": 2200,
      "frames": [
        {
          "src": "art/actions-v060/lens/lens-01.png",
          "duration": 300,
          "phase": "anticipation",
          "startMs": 0,
          "endMs": 300,
          "cropBox": [
            0,
            0,
            418,
            627
          ],
          "sourceVisibleBoxAlpha16": [
            27,
            34,
            401,
            605
          ],
          "sourceRegistrationAnchor": [
            320,
            596
          ],
          "scale": 0.88,
          "offset": [
            28,
            36
          ],
          "registrationTarget": [
            310,
            560
          ],
          "visibleBoxAlpha16": [
            52,
            66,
            382,
            568
          ],
          "sha256": "0f6d12b47e1f9277c3e45102c13fb413421679ac14238800ca120cd520159a90"
        },
        {
          "src": "art/actions-v060/lens/lens-02.png",
          "duration": 350,
          "phase": "approach",
          "startMs": 300,
          "endMs": 650,
          "cropBox": [
            418,
            0,
            836,
            627
          ],
          "sourceVisibleBoxAlpha16": [
            24,
            61,
            408,
            602
          ],
          "sourceRegistrationAnchor": [
            324,
            596
          ],
          "scale": 0.88,
          "offset": [
            25,
            36
          ],
          "registrationTarget": [
            310,
            560
          ],
          "visibleBoxAlpha16": [
            46,
            90,
            384,
            566
          ],
          "sha256": "80aac3e9963a311f9bab9a36f6414a3d3cf134a7f22ee4039b0582a65effa5fe"
        },
        {
          "src": "art/actions-v060/lens/lens-03.png",
          "duration": 450,
          "phase": "seat",
          "startMs": 650,
          "endMs": 1100,
          "cropBox": [
            836,
            0,
            1254,
            627
          ],
          "sourceVisibleBoxAlpha16": [
            19,
            43,
            400,
            604
          ],
          "sourceRegistrationAnchor": [
            314,
            596
          ],
          "scale": 0.88,
          "offset": [
            34,
            36
          ],
          "registrationTarget": [
            310,
            560
          ],
          "visibleBoxAlpha16": [
            51,
            74,
            386,
            568
          ],
          "sha256": "975aa3f31f9c98f98be10fa4e1a475c0a544a5aa60827cfb80f088553301d8b2",
          "contactLocal": [
            303,
            267
          ],
          "event": "seat"
        },
        {
          "src": "art/actions-v060/lens/lens-04.png",
          "duration": 350,
          "phase": "latch",
          "startMs": 1100,
          "endMs": 1450,
          "cropBox": [
            0,
            627,
            418,
            1254
          ],
          "sourceVisibleBoxAlpha16": [
            37,
            30,
            395,
            596
          ],
          "sourceRegistrationAnchor": [
            312,
            588
          ],
          "scale": 0.88,
          "offset": [
            35,
            43
          ],
          "registrationTarget": [
            310,
            560
          ],
          "visibleBoxAlpha16": [
            67,
            70,
            382,
            568
          ],
          "sha256": "544733e4c080254274fc648e50d2182264342d96e79f9d51db91637fd122a0b0",
          "contactLocal": [
            347,
            260
          ],
          "event": "latch"
        },
        {
          "src": "art/actions-v060/lens/lens-05.png",
          "duration": 350,
          "phase": "release",
          "startMs": 1450,
          "endMs": 1800,
          "cropBox": [
            418,
            627,
            836,
            1254
          ],
          "sourceVisibleBoxAlpha16": [
            19,
            30,
            407,
            595
          ],
          "sourceRegistrationAnchor": [
            323,
            588
          ],
          "scale": 0.88,
          "offset": [
            26,
            43
          ],
          "registrationTarget": [
            310,
            560
          ],
          "visibleBoxAlpha16": [
            43,
            69,
            385,
            567
          ],
          "sha256": "466a7ce389228b02a955464e95db915652dab219ac12973225cbec97921dd029",
          "contactLocal": [
            303,
            267
          ],
          "event": "release"
        },
        {
          "src": "art/actions-v060/lens/lens-06.png",
          "duration": 400,
          "phase": "recovery",
          "startMs": 1800,
          "endMs": 2200,
          "cropBox": [
            836,
            627,
            1254,
            1254
          ],
          "sourceVisibleBoxAlpha16": [
            25,
            22,
            399,
            596
          ],
          "sourceRegistrationAnchor": [
            314,
            588
          ],
          "scale": 0.88,
          "offset": [
            34,
            43
          ],
          "registrationTarget": [
            310,
            560
          ],
          "visibleBoxAlpha16": [
            56,
            62,
            386,
            568
          ],
          "sha256": "98c25591664ee0ea652ff108760d2a3a46e02f6deac35e4ba50b5bf9dceb8625"
        }
      ],
      "events": [
        {
          "name": "seat",
          "time": 650
        },
        {
          "name": "latch",
          "time": 1100
        },
        {
          "name": "release",
          "time": 1450
        }
      ],
      "loops": 1,
      "contactLocal": [
        303,
        267
      ]
    },
    "ignition": {
      "groundLocal": [
        240,
        558
      ],
      "contactLocal": [
        347,
        235
      ],
      "display": "lamp-inset",
      "loops": 1,
      "status": "candidate; same-source continuous 2D action",
      "rig": "TidekeeperMotion",
      "method": "fixed clean underlay, localized elbow mesh, rigid hand and tool, explicit tool ownership",
      "source": "art/actions-v062/lamp-master.png",
      "sourceSha256": "6574305398b0539b19f898b9bc4902d35a541ac1e2f5cad49037088ac63ceb38",
      "frameSize": [
        500,
        600
      ],
      "frames": [
        {
          "src": "art/actions-v062/lamp-master.png",
          "duration": 300,
          "phase": "grip",
          "keyType": "timing-key; not a painted animation frame"
        },
        {
          "src": "art/actions-v062/lamp-master.png",
          "duration": 900,
          "phase": "pour-and-set-down",
          "keyType": "timing-key; not a painted animation frame"
        },
        {
          "src": "art/actions-v062/lamp-master.png",
          "duration": 350,
          "phase": "pick-up-taper",
          "keyType": "timing-key; not a painted animation frame"
        },
        {
          "src": "art/actions-v062/lamp-master.png",
          "duration": 500,
          "phase": "reach-wick",
          "keyType": "timing-key; not a painted animation frame"
        },
        {
          "src": "art/actions-v062/lamp-master.png",
          "duration": 250,
          "phase": "ignite",
          "keyType": "timing-key; not a painted animation frame"
        },
        {
          "src": "art/actions-v062/lamp-master.png",
          "duration": 900,
          "phase": "return-and-release",
          "keyType": "timing-key; not a painted animation frame"
        }
      ],
      "paintedSourceFrames": 1,
      "newPaintedAnimationFrames": 0,
      "keyType": "timing markers for continuous motion; not newly drawn frames",
      "events": [
        {
          "name": "ignite",
          "time": 2050
        }
      ]
    },
    "beckon": {
      "displayBox": [
        391.125,
        550.125,
        225,
        337.5
      ],
      "groundLocal": [
        190,
        558
      ],
      "loops": 3,
      "status": "candidate; same-source continuous 2D action",
      "rig": "TidekeeperMotion",
      "method": "fixed clean underlay, localized elbow mesh, rigid hand and tool, explicit tool ownership",
      "source": "art/actions-v062/beckon-master.png",
      "sourceSha256": "4b96e432d71f2665fe91563c9c3cf40f94b383dd7fbd8b60e658041f54a3265b",
      "frameSize": [
        400,
        600
      ],
      "frames": [
        {
          "src": "art/actions-v062/beckon-master.png",
          "duration": 200,
          "phase": "attention",
          "keyType": "timing-key; not a painted animation frame"
        },
        {
          "src": "art/actions-v062/beckon-master.png",
          "duration": 180,
          "phase": "lift",
          "keyType": "timing-key; not a painted animation frame"
        },
        {
          "src": "art/actions-v062/beckon-master.png",
          "duration": 260,
          "phase": "signal-out",
          "keyType": "timing-key; not a painted animation frame"
        },
        {
          "src": "art/actions-v062/beckon-master.png",
          "duration": 240,
          "phase": "signal-in",
          "keyType": "timing-key; not a painted animation frame"
        },
        {
          "src": "art/actions-v062/beckon-master.png",
          "duration": 260,
          "phase": "second-greeting",
          "keyType": "timing-key; not a painted animation frame"
        },
        {
          "src": "art/actions-v062/beckon-master.png",
          "duration": 260,
          "phase": "settle",
          "keyType": "timing-key; not a painted animation frame"
        }
      ],
      "paintedSourceFrames": 1,
      "newPaintedAnimationFrames": 0,
      "keyType": "timing markers for continuous motion; not newly drawn frames",
      "events": []
    }
  },
  "anatomyCorrection": "0.6 repair/beckon rig visual acceptance withdrawn after user identified displaced/detached arm structure. Replaced with complete anatomically connected poses; corrected ignition hand continuity."
};
