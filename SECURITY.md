# Security and data-flow statement

This document declares the network access, credential handling, subprocesses, and file-deletion boundaries in Art Director so the claims can be checked against the repository.

**TL;DR: the project-pack tools run locally. `style_pack.py`, `project_runtime.py`, `team_batch.py`, `pilot.py`, and `package_release.py` make no network requests, read no API keys, and send no telemetry. Project references and client material remain on the machine unless the user deliberately uploads or publishes them with another tool.**

## Supported versions

Security fixes are applied to the current release line.

| Version | Supported |
|---|---|
| `0.5.x` | Yes |
| `0.2.x` | Critical fixes only |
| `< 0.2` | No |

## Complete network surface

The runtime scripts contain no HTTP client and define no outbound destination.

| Activity | Network destination | Data sent | When |
|---|---|---|---|
| Core project-pack commands | None | Nothing | Pack, project runtime, batch, intake, image-check, and summary commands are local |
| Dependency installation | The npm or Python registry configured by the user | Standard package-manager requests | Only when the user runs `npm install` or installs optional Pillow |
| Remotion browser setup | Remotion/Google browser download endpoint | Standard download request; no project assets | Only when no compatible local Chrome/Edge executable is supplied |
| GitHub README media | `github.com` / `githubusercontent.com` | Standard browser request for public release assets | Only when a reader opens the README |
| User-selected image or AI tools | Defined by that external tool, outside this repository | Determined by the user's tool and request | Only when the user separately chooses such a tool |

`scripts/render_depth_showcase.py` detects an installed Chrome or Edge first on Windows. Set `REMOTION_BROWSER_EXECUTABLE` to avoid Remotion downloading its browser runtime.

## Credentials and secrets

- No command needs an API key, login, `.env` file, browser session, or GitHub token.
- No credential is hardcoded, loaded, printed, or forwarded by repository code.
- The only environment variable read by project code is `REMOTION_BROWSER_EXECUTABLE`, which is treated as a local file path.
- Generated project packs can contain user-approved references and decision records. They should be treated as project material, not as a secret store.

## Subprocesses

The core pack scripts do not start subprocesses. The optional motion renderer starts only local executables:

- `npx remotion` to render React compositions;
- Chrome or Edge in headless rendering mode;
- `ffmpeg` to create the original audio bed, mux MP4, and encode GIF previews.

The renderer passes arguments as a list through Python's `subprocess.run`; it does not build a shell command, use `shell=True`, or combine a network download with script execution.

## File reads and writes

### `style_pack.py`

- Reads the selected pack and relative references declared in `style-pack.json`.
- Rejects absolute reference paths, path traversal, symlinks/junctions in packaged material, reserved generated paths, case collisions, and unexpected files in a built pack.
- Writes derived documents transactionally inside an unsealed working pack.
- `build`, `brief`, and `archive` require a new destination and refuse to overwrite it.
- Build and archive manifests contain SHA-256 hashes for integrity checking. They are not signatures and do not authenticate the approver.

### `pilot.py`

- `intake` walks only the selected source directory, applies an extension allowlist, and writes bounded text/image inspection results to a new destination.
- Source files are not modified or copied into an approved pack.
- Extracted text is explicitly treated as untrusted content, never as executable instructions.

### Motion and release tools

- `render_depth_showcase.py` writes only its named presentation artifacts and creates uniquely named temporary frame directories inside this repository for each run.
- `package_release.py` requires a new archive path outside the repository and packages a fixed allowlist of Skill files.

## Deletion boundaries

There is no general-purpose delete command.

- Transactional render rollback removes only a newly created target whose write failed, then restores any previous content.
- Failed `build` or `pilot intake` operations remove only the destination directory created by that same operation.
- Failed archive/package operations remove only the incomplete archive created by that invocation.
- Motion-frame cleanup removes only the uniquely named `render-frames-<language>-*` directory created by that invocation inside the selected repository output folder.
- Python temporary-directory cleanup is limited to `.style-render-*`, `.style-build-*`, `.pilot-intake-*`, or system temp directories created by the running command.
- No script recursively deletes an existing user-selected directory.

## Sensitive project material

References, model sheets, approval records, unreleased game assets, and client decisions can be confidential even though the tools are local. Before publishing or handing off a pack:

1. inspect every file in `references/`;
2. confirm the team is allowed to share it;
3. remove customer names and private production details from public examples;
4. run `verify` on the built pack and compare its manifest;
5. distribute the new build, never a working folder with unrelated files.

## Automated checks

- The test matrix runs on Windows and Linux with Python 3.10 and 3.12.
- CodeQL scans Python and JavaScript/TypeScript on pushes, pull requests, and a weekly schedule.
- Dependabot checks npm and GitHub Actions dependencies weekly.
- Pack validation covers path escapes, symlinks, collisions, unexpected files, immutable builds, and content fingerprints.

## Reporting a vulnerability

Use [GitHub private vulnerability reporting](https://github.com/NewenergyEric/art-director-skill/security/advisories/new). Include the affected command, version, operating system, and a minimal reproduction. Do not attach customer assets, credentials, private project packs, or an active exploit to a public issue.

If private reporting is unavailable, open a public issue containing only a high-level description and ask the maintainer for a private channel.
