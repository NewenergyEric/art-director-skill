"""Package the local mother skill without installing or publishing it."""
from __future__ import annotations

import argparse
import hashlib
from pathlib import Path
import sys
import zipfile


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--out", required=True, type=Path)
    args = parser.parse_args()
    source = Path(__file__).resolve().parents[1]
    destination = args.out.resolve()
    if destination == source or source in destination.parents:
        parser.error("Archive must be outside the source skill folder")
    if destination.exists():
        parser.error("Destination already exists; choose a new release filename")
    required = ("SKILL.md", "LICENSE", "scripts/style_pack.py", "templates/style-pack.template.json")
    if not all((source / name).is_file() for name in required):
        parser.error("Skill is incomplete")
    files = [
        source / "SKILL.md",
        source / "LICENSE",
        source / "scripts" / "style_pack.py",
        source / "scripts" / "pilot.py",
    ]
    for folder in ("agents", "references", "templates"):
        files.extend(path for path in (source / folder).rglob("*") if path.is_file())
    files = sorted(set(files))
    for path in files:
        if path.is_symlink():
            parser.error(f"Symlinks are not packaged: {path}")
    destination.parent.mkdir(parents=True, exist_ok=True)
    created = False
    try:
        with zipfile.ZipFile(destination, "x", compression=zipfile.ZIP_DEFLATED) as archive:
            created = True
            for path in files:
                name = "art-director/" + path.relative_to(source).as_posix()
                info = zipfile.ZipInfo(name, date_time=(1980, 1, 1, 0, 0, 0))
                info.compress_type = zipfile.ZIP_DEFLATED
                info.external_attr = 0o100644 << 16
                archive.writestr(info, path.read_bytes())
        with zipfile.ZipFile(destination) as archive:
            if archive.testzip() is not None:
                raise ValueError("Archive CRC verification failed")
    except Exception:
        if created:
            destination.unlink(missing_ok=True)
        raise
    import json
    print(json.dumps({"archive": str(destination), "files": len(files),
                      "sha256": hashlib.sha256(destination.read_bytes()).hexdigest()},
                     ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
