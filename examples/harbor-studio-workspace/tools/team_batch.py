#!/usr/bin/env python3
"""Check a team delivery snapshot against one verified style-pack baseline.

Python 3.10+, standard library only. Recorded review results and existing evidence
are checked as declarations; this tool never grants artistic or engine approval.
"""
from __future__ import annotations

import argparse
import hashlib
import os
from pathlib import Path
import stat
import sys

# Importing the sibling validator must not leave runtime files in a read-only pack.
sys.dont_write_bytecode = True
import style_pack as sp


SCHEMA_VERSION = "1.0"
STATUSES = (
    "missing", "version_mismatch", "file_invalid", "review_failed",
    "review_pending", "ready_for_review_or_handoff",
)
SCOPE = (
    "Checks one verified pack, declared assignments and baselines, file SHA256, "
    "and the presence of nonempty review evidence. Review pass/fail/unknown are "
    "recorded claims, not independently assessed conclusions. No artistic quality, "
    "reviewer identity, engine integration, performance or production approval is verified."
)


def no_links(path: Path):
    """Reject symbolic links and Windows junctions, including ancestor directories."""
    current = path.absolute()
    while True:
        try:
            info = current.lstat()
        except FileNotFoundError:
            pass
        else:
            if stat.S_ISLNK(info.st_mode) or getattr(info, "st_file_attributes", 0) & getattr(stat, "FILE_ATTRIBUTE_REPARSE_POINT", 0):
                raise sp.PackError(f"Links and junctions are forbidden: {current}", "unsafe_path")
        if current == current.parent:
            break
        current = current.parent


def local_file(root: Path, relative: str, *, must_exist=True) -> Path:
    target = sp.safe_file(root, relative, must_exist=must_exist)
    no_links(target)
    return target


class BatchValidator(sp.Validator):
    def object(self, value, path, required, optional=()):
        obj = self.obj(value, path, required)
        for name in obj.keys() - set(required) - set(optional):
            self.error("unknown_field", path + "." + name, "Unknown field in batch schema 1.0.")
        return obj

    def identifier(self, value, path):
        if not isinstance(value, str) or not sp.ID_PATTERN.fullmatch(value):
            self.error("id", path, "Use an ID containing only letters, digits, '.', '-' and '_'.")
            return False
        return True

    def baseline(self, value, path):
        obj = self.object(value, path, ("project_id", "version", "fingerprint"))
        for field, pattern in (("project_id", sp.SLUG_PATTERN), ("version", sp.VERSION_PATTERN), ("fingerprint", sp.SHA_PATTERN)):
            text = obj.get(field)
            if not isinstance(text, str) or not pattern.fullmatch(text):
                self.error("baseline_format", path + "." + field, "Expected a project slug, semantic version or lowercase SHA256 fingerprint as appropriate.")

    def rows(self, value, path, *, nonempty=False):
        if not isinstance(value, list):
            self.error("type", path, "Expected an array of objects.")
            return []
        if nonempty and not value:
            self.error("empty", path, "At least one assignment is required.")
        return value

    def path(self, value, path, *, allow_empty=False):
        if allow_empty and (value is None or value == ""):
            return
        try:
            local_file(self.root, value, must_exist=False)
        except sp.PackError as exc:
            # Missing/non-regular files are delivery findings; unsafe paths make
            # the input invalid and are never opened, even for a claimed failure.
            if exc.code == "unsafe_path":
                self.error(exc.code, path, str(exc))
        except (OSError, RuntimeError) as exc:
            self.error("unsafe_path", path, str(exc))


def validate_batch(data, root: Path, pack: dict) -> list[dict]:
    v = BatchValidator(root, False)
    batch = v.object(data, "$", ("schema_version", "batch_id", "mode", "baseline", "assignments", "deliveries"))
    if batch.get("schema_version") != SCHEMA_VERSION:
        v.error("schema_version", "$.schema_version", "Supported schema_version is '1.0'.")
    v.identifier(batch.get("batch_id"), "$.batch_id")
    v.choice(batch.get("mode"), "$.mode", {"demonstration", "production"})
    v.baseline(batch.get("baseline"), "$.baseline")
    tasks, assets, assigned_families = set(), {}, {}
    for index, raw in enumerate(v.rows(batch.get("assignments"), "$.assignments", nonempty=True)):
        path = f"$.assignments[{index}]"
        item = v.object(raw, path, ("task_id", "category", "owner", "asset_ids", "required_checks"), ("family",))
        task_id = item.get("task_id")
        if v.identifier(task_id, path + ".task_id"):
            if task_id in tasks:
                v.error("duplicate_task", path + ".task_id", "A task may be assigned only once per snapshot.")
            tasks.add(task_id)
        category = item.get("category")
        v.choice(category, path + ".category", sp.CATEGORIES)
        if isinstance(category, str) and (category not in pack["scope"]["asset_types"] or category not in pack["profiles"]):
            v.error("unavailable_category", path + ".category", "The verified pack must declare this category and its profile.")
        family_id = item.get("family")
        if family_id is not None and not isinstance(family_id, str):
            v.error("type", path + ".family", "Expected a family ID or null.")
        else:
            try:
                sp.resolve_family(pack, category, family_id)
            except sp.PackError as exc:
                v.error(exc.code, path + ".family", str(exc))
            if family_id is None and any(f["category"] == category for f in pack.get("direction", {}).get("families", [])):
                v.error("family_required", path + ".family", "Choose the defined family for this assignment.")
        owner = v.object(item.get("owner"), path + ".owner", ("id", "kind"))
        v.identifier(owner.get("id"), path + ".owner.id")
        v.choice(owner.get("kind"), path + ".owner.kind", {"internal", "external"})
        for asset_id in v.texts(item.get("asset_ids"), path + ".asset_ids", nonempty=True, unique=True):
            if v.identifier(asset_id, path + ".asset_ids"):
                if asset_id in assets:
                    v.error("duplicate_asset", path + ".asset_ids", f"Asset is already assigned: {asset_id}")
                assets[asset_id] = task_id
                assigned_families[asset_id] = family_id
        v.texts(item.get("required_checks"), path + ".required_checks", nonempty=True, unique=True)
    delivered = set()
    for index, raw in enumerate(v.rows(batch.get("deliveries"), "$.deliveries")):
        path = f"$.deliveries[{index}]"
        item = v.object(raw, path, ("asset_id", "task_id", "baseline", "files", "reviews"), ("family",))
        asset_id, task_id = item.get("asset_id"), item.get("task_id")
        v.identifier(task_id, path + ".task_id")
        if v.identifier(asset_id, path + ".asset_id"):
            if asset_id in delivered:
                v.error("duplicate_delivery", path + ".asset_id", "One delivery per asset; put revisions in a new snapshot.")
            delivered.add(asset_id)
            if asset_id not in assets:
                v.error("unassigned_asset", path + ".asset_id", "Delivery asset is not assigned in this snapshot.")
            elif assets[asset_id] != task_id:
                v.error("task_mismatch", path + ".task_id", "Delivery task does not own this asset.")
            elif item.get("family") != assigned_families.get(asset_id):
                v.error("family_mismatch", path + ".family", "Delivery must name the same family as its assignment.")
        v.baseline(item.get("baseline"), path + ".baseline")
        seen_paths = set()
        for j, raw_file in enumerate(v.rows(item.get("files"), path + ".files")):
            file_path = f"{path}.files[{j}]"
            file = v.object(raw_file, file_path, ("path", "sha256"))
            relative = file.get("path")
            v.path(relative, file_path + ".path")
            if isinstance(relative, str):
                if relative.casefold() in seen_paths:
                    v.error("duplicate_file", file_path + ".path", "A file path may occur only once in a delivery.")
                seen_paths.add(relative.casefold())
            if not isinstance(file.get("sha256"), str) or not sp.SHA_PATTERN.fullmatch(file["sha256"]):
                v.error("hash_format", file_path + ".sha256", "Expected a lowercase SHA256 digest.")
        criteria = set()
        for j, raw_review in enumerate(v.rows(item.get("reviews"), path + ".reviews")):
            review_path = f"{path}.reviews[{j}]"
            review = v.object(raw_review, review_path, ("criterion", "result"), ("evidence_path",))
            criterion = review.get("criterion")
            if v.text(criterion, review_path + ".criterion"):
                if criterion in criteria:
                    v.error("duplicate_review", review_path + ".criterion", "Each criterion has one result per delivery snapshot.")
                criteria.add(criterion)
            v.choice(review.get("result"), review_path + ".result", {"pass", "fail", "unknown"})
            v.path(review.get("evidence_path"), review_path + ".evidence_path", allow_empty=True)
    return v.errors


def inspect_file(root: Path, relative: str, expected: str | None = None) -> dict:
    result = {"path": relative, "sha256": None, "bytes": None, "valid": False, "issues": []}
    if expected is not None:
        result["expected_sha256"] = expected
    try:
        target = local_file(root, relative)
        digest, size = hashlib.sha256(), 0
        with target.open("rb") as source:
            for block in iter(lambda: source.read(1024 * 1024), b""):
                digest.update(block)
                size += len(block)
        result.update(sha256=digest.hexdigest(), bytes=size)
        if not size:
            result["issues"].append(sp.issue("empty_file", relative, "File must contain evidence or asset bytes."))
        if expected is not None and result["sha256"] != expected:
            result["issues"].append(sp.issue("hash_mismatch", relative, "File bytes do not match the delivery's declared SHA256."))
    except (sp.PackError, OSError, RuntimeError) as exc:
        result["issues"].append(sp.issue(getattr(exc, "code", "file_read"), relative, str(exc)))
    result["valid"] = not result["issues"]
    return result


def review_checks(root: Path, assignment: dict, delivery: dict) -> list[dict]:
    recorded = {review["criterion"]: review for review in delivery["reviews"]}
    criteria = list(dict.fromkeys(assignment["required_checks"] + list(recorded)))
    checks = []
    for criterion in criteria:
        review = recorded.get(criterion)
        result = review["result"] if review else "unknown"
        path = review.get("evidence_path") if review else None
        evidence = inspect_file(root, path) if path else None
        checks.append({
            "criterion": criterion, "required": criterion in assignment["required_checks"],
            "recorded": review is not None, "result": result, "evidence_path": path,
            "evidence": evidence,
            "accepted": bool(result == "pass" and evidence and evidence["valid"]),
        })
    return checks


def report_base() -> dict:
    return {
        "schema_version": SCHEMA_VERSION, "command": "check", "ok": False,
        "input_valid": False, "plan_valid": False, "ready": False,
        "production_approved": False, "scope_of_check": SCOPE,
        "errors": [], "warnings": [], "assets": [],
    }


def check_batch(data, root: Path, pack_root: Path) -> tuple[dict, int]:
    report = report_base()
    verified = sp.verify_pack(pack_root)
    report["pack_verified"] = verified["ok"]
    if not verified["ok"]:
        report["errors"] = verified["errors"]
        return report, 2
    pack = sp.read_json(pack_root / "style-pack.json")
    report["errors"] = validate_batch(data, root, pack)
    if report["errors"]:
        return report, 2
    info = verified["pack"]
    baseline = {"project_id": info["id"], "version": info["version"], "fingerprint": info["fingerprint"]}
    baseline_matches = data["baseline"] == baseline
    report.update(
        input_valid=True, plan_valid=baseline_matches, batch_id=data["batch_id"],
        mode=data["mode"], baseline=data["baseline"], verified_baseline=baseline,
        pack_release=verified["release"],
    )
    if not baseline_matches:
        report["errors"].append(sp.issue("batch_baseline_mismatch", "$.baseline", "Batch baseline must match the verified pack project, version and fingerprint."))
    if not verified["release"]:
        report["warnings"].append(sp.issue("unreleased_pack", "pack", "Pack was built without --release; readiness remains draft review/handoff only."))
    if data["mode"] == "demonstration":
        report["warnings"].append(sp.issue("demonstration_only", "$.mode", "This is a demonstration snapshot; passing checks cannot grant production approval."))
    deliveries = {delivery["asset_id"]: delivery for delivery in data["deliveries"]}
    for assignment in data["assignments"]:
        compiled = sp.direction_checks(pack, assignment["category"], assignment.get("family"))
        effective = dict(assignment)
        effective["required_checks"] = list(dict.fromkeys(assignment["required_checks"] + [item["criterion"] for item in compiled]))
        for asset_id in assignment["asset_ids"]:
            delivery = deliveries.get(asset_id)
            blockers, files, reviews = [], [], []
            if not baseline_matches or (delivery and delivery["baseline"] != baseline):
                blockers.append("version_mismatch")
            if delivery is None:
                blockers.append("missing")
            else:
                files = [inspect_file(root, file["path"], file["sha256"]) for file in delivery["files"]]
                if not files or any(not file["valid"] for file in files):
                    blockers.append("file_invalid")
                reviews = review_checks(root, effective, delivery)
                if any(review["result"] == "fail" for review in reviews):
                    blockers.append("review_failed")
                if any(review["result"] != "fail" and not review["accepted"] for review in reviews):
                    blockers.append("review_pending")
            report["assets"].append({
                "asset_id": asset_id, "task_id": assignment["task_id"],
                "category": assignment["category"], "owner": assignment["owner"],
                "family": sp.resolve_family(pack, assignment["category"], assignment.get("family")),
                "profile": pack["profiles"][assignment["category"]],
                "required_checks": effective["required_checks"], "direction_checks": compiled,
                "delivery_baseline": delivery["baseline"] if delivery else None,
                "status": blockers[0] if blockers else "ready_for_review_or_handoff",
                "ready": not blockers, "blockers": blockers,
                "file_checks": files, "review_checks": reviews,
            })
    counts = {status: sum(asset["status"] == status for asset in report["assets"]) for status in STATUSES}
    pending = sum(any(b in ("missing", "review_pending") for b in asset["blockers"]) and not any(b in ("version_mismatch", "file_invalid", "review_failed") for b in asset["blockers"]) for asset in report["assets"])
    ready = counts["ready_for_review_or_handoff"]
    report["summary"] = {
        "expected_assets": len(report["assets"]), "delivered_assets": len(deliveries),
        "missing_assets": sum("missing" in asset["blockers"] for asset in report["assets"]),
        "ready_assets": ready, "pending_assets": pending,
        "blocked_assets": len(report["assets"]) - ready - pending, "status_counts": counts,
    }
    report["ok"] = report["ready"] = all(asset["ready"] for asset in report["assets"])
    return report, 0 if report["ready"] else 1


def output_target(argument: str, pack_root: Path, batch_file: Path, data) -> Path:
    candidate = Path(argument).expanduser()
    no_links(candidate)
    target = sp.destination_new(argument, pack_root)
    # A missing delivery/evidence file must not be created by saving its report.
    if isinstance(data, dict) and isinstance(data.get("deliveries"), list):
        for delivery in data["deliveries"]:
            if not isinstance(delivery, dict):
                continue
            for field, key in (("files", "path"), ("reviews", "evidence_path")):
                rows = delivery.get(field, [])
                if not isinstance(rows, list):
                    continue
                for row in rows:
                    relative = row.get(key) if isinstance(row, dict) else None
                    if isinstance(relative, str) and relative:
                        try:
                            dependency = local_file(batch_file.parent, relative, must_exist=False)
                        except (sp.PackError, OSError, RuntimeError):
                            # Schema/file checks report malformed or unavailable
                            # inputs; do not resolve an unchecked JSON path here.
                            continue
                        if dependency.resolve() == target:
                            raise sp.PackError("Report cannot occupy a declared asset or evidence path.", "output_input_collision")
    return target


def main(argv=None) -> int:
    parser = argparse.ArgumentParser(description=__doc__, epilog="Exit 0: ready for review/handoff; 1: valid input with pending/blocked delivery; 2: invalid input, pack or operation. Outputs never overwrite files.")
    commands = parser.add_subparsers(dest="command", required=True)
    check = commands.add_parser("check", help="Check a batch snapshot without modifying the batch, delivery files or built pack.")
    check.add_argument("batch", metavar="BATCH_JSON")
    check.add_argument("--pack", required=True, metavar="BUILT_PACK")
    check.add_argument("--out", required=True, metavar="NEW_REPORT_JSON")
    args = parser.parse_args(argv)
    try:
        batch_file = Path(args.batch).expanduser()
        no_links(batch_file)
        batch_file = batch_file.resolve()
        if not batch_file.is_file():
            raise sp.PackError("BATCH_JSON must be an existing regular file.", "missing_batch")
        no_links(Path(args.pack).expanduser())
        pack_root = sp.resolve_pack(args.pack)
        data = sp.read_json(batch_file)
        target = output_target(args.out, pack_root, batch_file, data)
        report, code = check_batch(data, batch_file.parent, pack_root)
        report["out"] = str(target)
        with target.open("x", encoding="utf-8") as output:
            output.write(sp.json_text(report))
        print(sp.json_text(report), end="")
        return code
    except (sp.PackError, OSError, RuntimeError) as exc:
        report = report_base()
        report["errors"] = [sp.issue(getattr(exc, "code", "operation_failed"), "$", str(exc))]
        print(sp.json_text(report), end="")
        return 2


if __name__ == "__main__":
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    raise SystemExit(main())
