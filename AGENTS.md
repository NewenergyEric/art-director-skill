# Guidance for agents working in this repository

This repository packages `art-director` at the repository root and the optional `skills/game-art-production` companion. They share project packs; do not duplicate aesthetic rules. It also contains deterministic tools for building project-specific art-direction skills.

## Keep the skill discoverable

- `SKILL.md` is the entrypoint. Its frontmatter name must remain `art-director`.
- Keep the frontmatter description concrete about when the skill should be used.
- Put long methods in `references/`, reusable records in `templates/`, and deterministic operations in `scripts/`.
- Do not make the entrypoint depend on an absolute path or on the original development checkout.

## Preserve the evidence model

- `style-pack.json` is the source of truth for a project pack. `STYLE.md` and the project `SKILL.md` are derived outputs.
- Keep project style, entity identity, task variation, and technical facts separate.
- Do not upgrade `proposed`, `unknown`, or unchecked material to approved status without an actual decision record.
- A successful schema or file check is not visual approval.
- Examples are fictional fixtures. Do not turn their visual choices into universal art direction.

## Changing code or templates

- Keep the core CLI compatible with Python 3.10+ and the standard library. Pillow may remain optional for pixel checks.
- Default to refusing destructive overwrites of builds, archives, and existing project packs.
- Update tests when a change affects the pack contract, validation rules, command output, or relocatability.
- Run `python -m unittest discover -s tests -v`; validate both `examples/harbor-studio-draft` and `examples/campaign-studio-draft`; then build the mother Skill archive before release.

## Public repository hygiene

- Use repository-relative paths in documentation and fixtures.
- Do not commit customer names, customer assets, private project decisions, credentials, or local machine paths.
- Keep Chinese and English README claims aligned.
- Regenerate README motion assets from `motion/src/` with the scripts in `package.json` when their copy or visual system changes.
