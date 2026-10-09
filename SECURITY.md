# Security and data handling

Art Director is designed to run locally. The included Python scripts do not call remote APIs, download models, send telemetry, or read credentials.

`style_pack.py` reads only the selected pack and its referenced files. It rejects absolute references, path escapes, symlinks in packaged material, reserved generated paths, and attempts to overwrite existing build, brief, or archive targets. `pilot.py intake` uses an allowlist and writes extracted material to a new output directory; it never modifies the source directory.

References, model sheets, approval records, and client material may still be sensitive. Review every project pack before sharing it. Include only files that the team is allowed to distribute, and keep private project packs out of public repositories.

To report a vulnerability, use GitHub's private vulnerability reporting for this repository when available. If that channel is unavailable, open an issue that describes the affected behavior without including private project files, credentials, or an active exploit payload.
