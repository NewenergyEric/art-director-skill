# Darwin audit · v0.2

## Scope and method

This audit compares the `0.1.0` entrypoint at commit `dcddbed` with the revised `SKILL.md` in `0.2.0`. It follows Darwin's nine-dimension, 100-point rubric and uses the same reviewer on both versions so the comparison is more meaningful than the absolute score.

The behavior check is a manual deterministic trace through four representative prompts in [`evals/darwin-test-prompts.json`](../evals/darwin-test-prompts.json). It is not an independent model benchmark or a real-team efficiency study. Raw outcomes are in [`evals/darwin-results.tsv`](../evals/darwin-results.tsv).

## Scorecard

| Dimension | Weight | `0.1.0` | `0.2.0` | What changed |
|---|---:|---:|---:|---|
| Frontmatter and trigger quality | 7 | 6 | 7 | Added UI, skill/VFX, batch-production, campaign, poster, social-template, and handoff triggers while keeping the runtime neutral. |
| Workflow clarity | 12 | 9 | 11 | Added numbered stages with explicit inputs, outputs, and route-specific deliverables. |
| Failure modes and recovery | 12 | 6 | 11 | Added an if/then recovery table for conflicting references, failed first pieces, missing identity evidence, batch drift, and release failure. |
| Checkpoints | 6 | 2 | 6 | Added first-piece and shared-baseline checkpoints with conditions for proceeding under existing authorization. |
| Executable specificity | 18 | 15 | 17 | Defined the rule contract, minimum task-brief contents, review states, and exact CLI sequence. |
| Resource integration | 4 | 4 | 4 | Kept progressive links to focused references and templates. |
| Architecture | 12 | 10 | 12 | Clear route → rule → task → sample → review → version → pack flow. |
| Practical performance | 23 | 18 | 21 | Reduced unnecessary rediscovery, made batch stopping conditions explicit, and prevented one-off feedback from rewriting global direction. |
| Anti-patterns | 6 | 3 | 6 | Added a concrete blacklist tied to common art-production failures. |
| **Total** | **100** | **73** | **95** | **+22** |

## Behavior trace

### 1. High-volume casual-game batch

The earlier Skill linked to volume-production guidance and said to confirm a representative sample, but the stop condition was implicit. The revised entrypoint routes the request to `production-at-scale`, requires asset families and state matrices, and holds batch expansion at **Checkpoint A**. Result: partial → pass.

### 2. Mixed art review

Both versions separate style, identity, task, and specification. The revision makes the output states and no-visual-access fallback explicit, so a structural or dimension check cannot be mistaken for art approval. Result: pass → pass with a narrower failure surface.

### 3. One-off feedback versus project baseline

The earlier version warned against silently changing shared rules but offered no compact decision branch. The revision states that one-off feedback stays local, cross-family impact becomes a change proposal, **Checkpoint B** guards publication, and `diff` plus a new output directory preserve the previous version. Result: partial → pass.

### 4. Multi-channel campaign family

The earlier version focused on game-asset categories. The revision routes a campaign request through layout grammar and production-at-scale, treats promotional components and channel layouts as families, tests the key visual in a main size and an extreme size, and blocks full rollout until the representative pair is confirmed. Result: partial → pass.

## Runtime-neutrality gate

The Skill body names no proprietary agent runtime, command namespace, hidden tool, or vendor-specific memory path. Platform names appear only in the public README compatibility line, outside the Skill instructions. The CLI examples use repository-relative scripts and replaceable paths.

## What remains unproven

- The four prompts were traced by the same reviewer who made the revision; an independent model comparison would be stronger.
- No live art team has yet measured handoff time, rework rate, or review accuracy against its current process.
- The framework makes decisions traceable; it cannot guarantee taste, originality, engine performance, or production approval.

These limitations are kept in the public README rather than converted into unsupported claims.
