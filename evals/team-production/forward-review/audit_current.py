"""Read-only audit of the explicitly supplied current batch and built pack."""
from pathlib import Path
import collections
import hashlib
import json
import subprocess
import sys
from datetime import datetime, timezone

ROOT = Path(__file__).resolve().parents[3]
OUT = ROOT / "evals/team-production/forward-review"
PACK = ROOT / "dist/pop-borough-0.1.0-draft"
BATCH = ROOT / "evals/team-production/current-version-batch.json"
STYLE_TOOL = ROOT / "art-director/scripts/style_pack.py"
TEAM_TOOL = ROOT / "art-director/scripts/team_batch.py"

def read_json(path):
    return json.loads(path.read_text(encoding="utf-8-sig"))

def digest(path):
    raw = path.read_bytes()
    return {"bytes": len(raw), "sha256": hashlib.sha256(raw).hexdigest()}

def write_json(name, value):
    with (OUT / name).open("x", encoding="utf-8") as stream:
        json.dump(value, stream, ensure_ascii=False, indent=2)
        stream.write("\n")

batch = read_json(BATCH)
pack = read_json(PACK / "style-pack.json")
delivery_paths = [BATCH.parent / f["path"] for d in batch["deliveries"] for f in d["files"]]
inputs = [BATCH, STYLE_TOOL, TEAM_TOOL] + sorted(p for p in PACK.rglob("*") if p.is_file()) + delivery_paths
before = {str(p): digest(p) for p in inputs}
records = []
commands = [
    ("pack-verify.json", [sys.executable, "-B", str(STYLE_TOOL), "verify", str(PACK)]),
    ("release-validation.json", [sys.executable, "-B", str(STYLE_TOOL), "validate", str(PACK), "--release"]),
    ("batch-check.stdout.json", [sys.executable, "-B", str(TEAM_TOOL), "check", str(BATCH), "--pack", str(PACK), "--out", str(OUT / "batch-check.json")]),
]
for filename, argv in commands:
    started = datetime.now(timezone.utc).isoformat()
    result = subprocess.run(argv, cwd=ROOT, capture_output=True, text=True, encoding="utf-8")
    with (OUT / filename).open("x", encoding="utf-8") as stream:
        stream.write(result.stdout)
    records.append({"argv": argv, "started_at_utc": started, "exit_code": result.returncode,
                    "stdout_file": filename, "stderr": result.stderr})
write_json("executed-checks.json", records)

inspection = {
    "inspected_at_utc": datetime.now(timezone.utc).isoformat(),
    "batch_file": str(BATCH), "pack_root": str(PACK),
    "project": pack["project"], "version": pack["version"], "status": pack["status"],
    "approval": pack["approval"], "batch_mode": batch["mode"],
    "rule_status_counts": dict(collections.Counter(rule["status"] for rule in pack["rules"])),
    "references": pack["references"], "open_questions": pack["open_questions"],
    "profile_technical": {key: value["technical"] for key, value in pack["profiles"].items()},
    "actual_delivery_files": [{"path": str(p), **digest(p), "suffix": p.suffix,
                               "text_contents": p.read_text(encoding="utf-8")} for p in delivery_paths],
}
write_json("direct-inspection.json", inspection)
after = {str(p): digest(p) for p in inputs}
write_json("input-integrity.json", {"all_inputs_unchanged": before == after,
                                   "before": before, "after": after})
report = read_json(OUT / "batch-check.json")
print(json.dumps({"checks": [{"stdout_file": r["stdout_file"], "exit_code": r["exit_code"]} for r in records],
                  "summary": report.get("summary"), "all_inputs_unchanged": before == after,
                  "output_directory": str(OUT)}, ensure_ascii=False, indent=2))
