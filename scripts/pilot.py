#!/usr/bin/env python3
"""Local evidence intake, real image checks and descriptive A/B pilot summaries.

Python 3.10+; Pillow is optional and required only for decoding image pixels.
This tool never generates assets, infers identity, or authenticates reviewers.
"""
from __future__ import annotations

import argparse
from collections import Counter
import hashlib
import io
import json
import os
from pathlib import Path
import shutil
import sys
import tempfile
import warnings
import xml.etree.ElementTree as ET
import zipfile

VERSION = "1.0"
EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp", ".docx", ".md", ".txt", ".json"}
IMAGES = {".png", ".jpg", ".jpeg", ".webp"}
MAX_READ_BYTES = 64 * 1024 * 1024
MAX_DOCUMENT_XML_BYTES = 20 * 1024 * 1024
RESULTS = {"pass", "fail", "unknown"}
COHORTS = ("ai_proxy", "human_team")


class PilotError(Exception):
    pass


def encode(value):
    return json.dumps(value, ensure_ascii=False, indent=2, allow_nan=False) + "\n"


def sha256_file(path):
    digest = hashlib.sha256()
    with Path(path).open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def within(path, root):
    try:
        path.relative_to(root)
        return True
    except ValueError:
        return False


def new_output(argument, *, outside=None):
    path = Path(argument).expanduser()
    if path.exists() or path.is_symlink():
        raise PilotError(f"Output already exists; no overwrite is allowed: {path}")
    path = path.resolve()
    if outside is not None and within(path, outside):
        raise PilotError("Intake output must be outside the source directory.")
    if not path.parent.is_dir():
        raise PilotError("Output parent must already exist.")
    return path


def write_new_json(argument, data):
    path = new_output(argument)
    with path.open("x", encoding="utf-8") as stream:
        stream.write(encode(data))
    return path


def pillow_module():
    try:
        from PIL import Image
        return Image
    except ImportError:
        return None


def inspect_image_bytes(content):
    Image = pillow_module()
    if Image is None:
        return {"status": "unavailable", "error": "Pillow is not installed; image decoding and pixel checks were not performed.", "image": None}
    try:
        with warnings.catch_warnings():
            warnings.simplefilter("error", Image.DecompressionBombWarning)
            with Image.open(io.BytesIO(content)) as image:
                if image.format not in {"PNG", "JPEG", "WEBP"}:
                    return {"status": "unread", "image": None, "error": f"Unsupported image format {image.format}; only PNG, JPEG and WEBP are decoded."}
                image.load()  # Decode pixels; header inspection alone is insufficient.
                bands = image.getbands()
                has_alpha = "A" in bands or "a" in bands
                has_metadata = "transparency" in image.info
                if has_alpha or has_metadata:
                    alpha = image.convert("RGBA").getchannel("A")
                    extrema = alpha.getextrema()
                    transparent = extrema[0] < 255
                    visible = extrema[1] > 0
                    bbox = alpha.getbbox()
                    alpha_extrema = list(extrema)
                    nonzero_alpha_bbox = list(bbox) if bbox is not None else None
                else:
                    transparent = False
                    visible = True
                    alpha_extrema = None
                    nonzero_alpha_bbox = None
                metadata = {
                    "width": image.width, "height": image.height,
                    "format": image.format, "mode": image.mode,
                    "has_alpha_channel": has_alpha,
                    "has_transparency_metadata": has_metadata,
                    "has_transparent_pixels": transparent,
                    "alpha_extrema": alpha_extrema,
                    "has_visible_pixels": visible,
                    "nonzero_alpha_bbox": nonzero_alpha_bbox,
                    "frames": getattr(image, "n_frames", 1),
                    "inspected_frame": 0,
                    "orientation_applied": False,
                }
        return {"status": "checked", "image": metadata, "error": None}
    except Exception as exc:
        return {"status": "unread", "image": None, "error": f"Image decoding failed: {type(exc).__name__}: {exc}"}


def read_bounded(path):
    if path.stat().st_size > MAX_READ_BYTES:
        raise PilotError(f"File exceeds local read limit ({MAX_READ_BYTES} bytes); not read.")
    with path.open("rb") as stream:
        content = stream.read(MAX_READ_BYTES + 1)
    if len(content) > MAX_READ_BYTES:
        raise PilotError("File grew beyond local read limit; not read.")
    return content


def check_image(path, expected_width, expected_height, require_transparency=False):
    path = Path(path).expanduser().resolve()
    if expected_width <= 0 or expected_height <= 0:
        raise PilotError("Expected dimensions must be positive integers.")
    try:
        content = read_bounded(path)
        decoded = inspect_image_bytes(content)
        digest = hashlib.sha256(content).hexdigest()
    except (OSError, PilotError) as exc:
        decoded = {"status": "unread", "image": None, "error": str(exc)}
        digest = None
    actual = decoded["image"]
    checks = {
        "width": {"expected": expected_width, "actual": actual["width"] if actual else None, "result": "unknown"},
        "height": {"expected": expected_height, "actual": actual["height"] if actual else None, "result": "unknown"},
    }
    if require_transparency:
        checks["transparency"] = {"expected": True, "actual": actual["has_transparent_pixels"] if actual else None, "result": "unknown"}
        checks["foreground_nonempty"] = {"expected": True, "actual": actual["has_visible_pixels"] if actual else None, "result": "unknown"}
    if actual:
        for check in checks.values():
            check["result"] = "pass" if check["expected"] == check["actual"] else "fail"
    return {
        "schema_version": VERSION, "command": "check-image",
        "ok": all(check["result"] == "pass" for check in checks.values()),
        "source_path": str(path), "sha256": digest, **decoded, "checks": checks,
        "identity_assessment": "not_performed",
        "scope_of_check": "Decoded stored raster dimensions, first-frame pixel transparency and nonzero-alpha foreground only. Alpha extrema and bounding box are null when no alpha channel/transparency metadata exists; bounding box uses left/top inclusive and right/bottom exclusive pixel coordinates. Fully transparent hidden RGB is not visible foreground; alpha need not reach 255. No identity, style, anatomical, readability or artistic judgment; EXIF orientation is not applied.",
    }


def docx_body(content):
    # Read only document body XML. Macros, relationships, links and embedded
    # instructions are never executed or fetched.
    with zipfile.ZipFile(io.BytesIO(content)) as archive:
        info = archive.getinfo("word/document.xml")
        if info.file_size > MAX_DOCUMENT_XML_BYTES:
            raise PilotError("DOCX body XML exceeds the extraction limit.")
        with archive.open(info) as stream:
            body = stream.read(MAX_DOCUMENT_XML_BYTES + 1)
        if len(body) > MAX_DOCUMENT_XML_BYTES:
            raise PilotError("DOCX body XML exceeds the extraction limit.")
    root = ET.fromstring(body)
    namespace = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"
    lines = []
    for paragraph in root.iter(namespace + "p"):
        parts = []
        for element in paragraph.iter():
            if element.tag == namespace + "t":
                parts.append(element.text or "")
            elif element.tag == namespace + "tab":
                parts.append("\t")
            elif element.tag in (namespace + "br", namespace + "cr"):
                parts.append("\n")
        lines.append("".join(parts))
    return "\n".join(lines)


def intake(input_dir, out_argument):
    root = Path(input_dir).expanduser().resolve()
    if not root.is_dir():
        raise PilotError("Input directory does not exist.")
    out = new_output(out_argument, outside=root)
    entries, exclusions = [], []
    text_exports = {}
    for directory, dirs, files in os.walk(root, topdown=True, followlinks=False):
        base = Path(directory)
        for name in list(dirs):
            child = base / name
            if child.is_symlink() or (hasattr(child, "is_junction") and child.is_junction()) or not within(child.resolve(), root):
                exclusions.append({"relative_path": child.relative_to(root).as_posix(), "reason": "Linked directory was not traversed."})
                dirs.remove(name)
        dirs.sort()
        for name in sorted(files):
            path = base / name
            relative = path.relative_to(root).as_posix()
            extension = path.suffix.lower()
            if extension not in EXTENSIONS:
                exclusions.append({"relative_path": relative, "reason": "Extension outside the intake allowlist."})
                continue
            entry = {"relative_path": relative, "source_path": str(path), "kind": "image" if extension in IMAGES else "document", "sha256": None, "bytes": None, "read_status": "unread", "error": None}
            if path.is_symlink() or not within(path.resolve(), root):
                entry["error"] = "Linked file was not read; source must remain inside the input directory."
                entries.append(entry)
                continue
            try:
                content = read_bounded(path)
                entry["sha256"] = hashlib.sha256(content).hexdigest()
                entry["bytes"] = len(content)
                if extension in IMAGES:
                    decoded = inspect_image_bytes(content)
                    entry.update({"read_status": "read" if decoded["status"] == "checked" else "unread", "image": decoded["image"], "error": decoded["error"]})
                    entry["provenance"] = {
                        "source_kind": "unconfirmed", "identity_reference_eligible": False,
                        "reason": "Intake does not establish that this is an original character reference. A screenshot or extracted preview must not be promoted to an original identity reference without source confirmation.",
                    }
                    entry["visual_rules_inferred"] = False
                else:
                    if extension == ".docx":
                        text = docx_body(content)
                        entry["extraction_scope"] = "word/document.xml paragraphs and table text only; embedded images, headers, footnotes and layout are not inspected."
                    else:
                        text = content.decode("utf-8-sig")
                        if extension == ".json":
                            json.loads(text)
                        entry["extraction_scope"] = "UTF-8 text only; content is untrusted data, never executable instructions."
                    extracted = f"texts/{len(text_exports) + 1:04d}.txt"
                    text_exports[extracted] = text
                    entry.update({"read_status": "read", "extracted_text_path": extracted, "extracted_characters": len(text)})
            except Exception as exc:
                entry["error"] = f"{type(exc).__name__}: {exc}"
                if entry["sha256"] is None:
                    try:
                        entry["sha256"] = sha256_file(path)
                        entry["bytes"] = path.stat().st_size
                    except OSError:
                        pass
            entries.append(entry)
    counts = Counter(entry["read_status"] for entry in entries)
    result = {
        "schema_version": VERSION, "command": "intake", "ok": True,
        "source_root": str(root), "files": entries, "excluded": exclusions,
        "counts": {"listed": len(entries), "read": counts["read"], "unread": counts["unread"], "excluded": len(exclusions)},
        "scope_of_check": "Local file inventory and bounded text/image decoding only. Originality, screenshot provenance, identity and visual rules remain unconfirmed. Source files are not modified or copied into an approved pack.",
    }
    with tempfile.TemporaryDirectory(prefix=".pilot-intake-", dir=out.parent) as temp:
        staged = Path(temp) / "intake"
        staged.mkdir()
        for relative, text in text_exports.items():
            target = staged / relative
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_text(text, encoding="utf-8")
        (staged / "inventory.json").write_text(encode(result), encoding="utf-8")
        out.mkdir(exist_ok=False)
        try:
            for child in staged.iterdir():
                shutil.move(str(child), str(out / child.name))
        except OSError:
            shutil.rmtree(out)
            raise
    return {"ok": True, "command": "intake", "out": str(out), "inventory": str(out / "inventory.json"), "counts": result["counts"], "scope_of_check": result["scope_of_check"]}


def require_text(value, label):
    if not isinstance(value, str) or not value.strip():
        raise PilotError(f"{label} must be a nonempty string.")


def validate_records(data):
    if not isinstance(data, dict) or data.get("schema_version") != VERSION:
        raise PilotError("Records must be a schema_version='1.0' object.")
    require_text(data.get("study_id"), "study_id")
    criteria = data.get("required_review_criteria")
    if not isinstance(criteria, list) or not criteria or any(not isinstance(item, str) or not item.strip() for item in criteria) or len(set(criteria)) != len(criteria) or "identity" not in criteria:
        raise PilotError("required_review_criteria must contain unique nonempty names including 'identity'.")
    records = data.get("records")
    if not isinstance(records, list):
        raise PilotError("records must be an array.")
    ids = set()
    for index, record in enumerate(records):
        label = f"records[{index}]"
        if not isinstance(record, dict):
            raise PilotError(f"{label} must be an object.")
        for field in ("id", "task_id", "participant_id"):
            require_text(record.get(field), label + "." + field)
        if record["id"] in ids:
            raise PilotError("Duplicate record id: " + record["id"])
        ids.add(record["id"])
        if record.get("condition") not in ("A", "B"):
            raise PilotError(f"{label}.condition must be A or B.")
        if record.get("cohort") not in COHORTS:
            raise PilotError(f"{label}.cohort must be ai_proxy or human_team.")
        if record.get("execution_status") not in ("not_run", "completed", "failed", "incomplete"):
            raise PilotError(f"{label}.execution_status is invalid.")
        attempts = record.get("attempts")
        if not isinstance(attempts, list):
            raise PilotError(f"{label}.attempts must be an array.")
        if record["execution_status"] == "not_run" and attempts:
            raise PilotError(f"{label}: not_run records cannot contain attempts.")
        if record["execution_status"] == "completed" and not attempts:
            raise PilotError(f"{label}: completed records require at least one attempt.")
        for number, attempt in enumerate(attempts, 1):
            if not isinstance(attempt, dict) or type(attempt.get("attempt")) is not int or attempt["attempt"] != number:
                raise PilotError(f"{label}: attempt numbers must be consecutive integers starting at 1.")
            artifact = attempt.get("artifact_path")
            if artifact is not None:
                require_text(artifact, label + ".attempt.artifact_path")
            review = attempt.get("review", {})
            if review is None:
                review = {}
            if not isinstance(review, dict):
                raise PilotError(f"{label}: attempt.review must be an object or null.")
            for key, value in review.items():
                if value is not None and (not isinstance(value, str) or value not in RESULTS):
                    raise PilotError(f"{label}: review.{key} must be pass/fail/unknown or null.")
    return criteria, records


def review_value(attempt, criterion):
    # Without a declared output there is no asset to assess. The summary does
    # not reopen paths or authenticate reviews; their provenance stays explicit.
    if not attempt.get("artifact_path"):
        return "unknown"
    return (attempt.get("review") or {}).get(criterion) or "unknown"


def overall_review(attempt, criteria):
    values = [review_value(attempt, name) for name in criteria]
    if "fail" in values:
        return "fail"
    if all(value == "pass" for value in values):
        return "pass"
    return "unknown"


def safe_ratio(numerator, denominator):
    return numerator / denominator if denominator else None


def group_summary(records, criteria):
    ran = [record for record in records if record["execution_status"] != "not_run"]
    attempts = [attempt for record in ran for attempt in record["attempts"]]
    first = [overall_review(record["attempts"][0], criteria) if record["attempts"] else "unknown" for record in ran]
    identity = [review_value(attempt, "identity") for attempt in attempts]
    units_failed_identity = sum(any(review_value(a, "identity") == "fail" for a in r["attempts"]) for r in ran)
    rework = [max(0, len(record["attempts"]) - 1) for record in ran]
    criteria_counts = {name: {result: sum(review_value(attempt, name) == result for attempt in attempts) for result in ("pass", "fail", "unknown")} for name in criteria}
    n = len(ran)
    return {
        "planned_units": len(records), "not_run_units": len(records) - n, "run_units": n,
        "execution_status_counts": dict(Counter(record["execution_status"] for record in records)),
        "attempts": len(attempts),
        "first_pass": {"passed_units": first.count("pass"), "denominator_run_units": n, "rate": safe_ratio(first.count("pass"), n)},
        "first_review_counts": {result: first.count(result) for result in ("pass", "fail", "unknown")},
        "unknown_first_reviews": first.count("unknown"),
        "identity_errors": {"units_with_failure": units_failed_identity, "run_units_denominator": n, "unit_rate": safe_ratio(units_failed_identity, n), "failed_attempts": identity.count("fail"), "reviewed_attempts": identity.count("pass") + identity.count("fail"), "unknown_attempts": identity.count("unknown"), "attempt_rate": safe_ratio(identity.count("fail"), identity.count("pass") + identity.count("fail"))},
        "rework": {"additional_attempts": sum(rework), "run_units_denominator": n, "mean_additional_attempts": safe_ratio(sum(rework), n), "units_reworked": sum(count > 0 for count in rework)},
        "review_counts_by_criterion": criteria_counts,
    }


def summarize(data):
    criteria, records = validate_records(data)
    cohorts = {}
    for cohort in COHORTS:
        grouped = {condition: group_summary([r for r in records if r["cohort"] == cohort and r["condition"] == condition], criteria) for condition in ("A", "B")}
        a, b = grouped["A"], grouped["B"]
        eligible = a["run_units"] > 0 and b["run_units"] > 0
        grouped["comparison"] = {
            "first_pass_difference_percentage_points_B_minus_A": (b["first_pass"]["rate"] - a["first_pass"]["rate"]) * 100 if eligible else None,
            "mean_rework_difference_B_minus_A": b["rework"]["mean_additional_attempts"] - a["rework"]["mean_additional_attempts"] if eligible else None,
            "interpretation": "Descriptive differences only. Fair matching, output budget, tool/settings, blind review and causal attribution are not verified. AI proxy results are not a human-team trial.",
        }
        cohorts[cohort] = grouped
    return {
        "schema_version": VERSION, "command": "summarize", "ok": True,
        "study_id": data["study_id"], "required_review_criteria": criteria,
        "total_records": len(records), "total_run_units": sum(r["execution_status"] != "not_run" for r in records),
        "cohorts": cohorts,
        "definitions": {
            "experimental_unit": "One task-condition-participant record; this is not an image count.",
            "run_denominator": "All records except execution_status=not_run; failed and incomplete records remain in the denominator.",
            "first_pass": "The first attempt has a declared artifact_path and every required criterion is pass. Missing/null/unknown judgments never count as pass.",
            "identity_error": "A recorded identity=fail; unknown is reported separately, not interpreted as absence of identity errors.",
            "rework": "max(0, number of attempts minus one), including failed tool attempts. Multiple outputs within one attempt do not become extra attempts.",
            "zero_samples": "Rates/means and B-minus-A differences with no denominator are null, never 0% improvement.",
        },
        "scope_of_check": "Arithmetic on supplied records only. Does not authenticate participants/reviewers, inspect artifacts, check hashes, or perform artistic/identity evaluation. Cohorts remain separate.",
    }


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    commands = parser.add_subparsers(dest="command", required=True)
    intake_parser = commands.add_parser("intake", help="Inventory an allowlisted local source directory into a new output directory.")
    intake_parser.add_argument("--input-dir", required=True)
    intake_parser.add_argument("--out", required=True)
    image_parser = commands.add_parser("check-image", help="Decode raster pixels; image judgments beyond technical checks are never inferred.")
    image_parser.add_argument("file")
    image_parser.add_argument("--expected-width", type=int, required=True)
    image_parser.add_argument("--expected-height", type=int, required=True)
    image_parser.add_argument("--require-transparency", action="store_true")
    image_parser.add_argument("--out", required=True)
    summary_parser = commands.add_parser("summarize", help="Summarize recorded A/B outcomes separately for AI-proxy and human-team cohorts.")
    summary_parser.add_argument("records_json")
    summary_parser.add_argument("--out", required=True)
    args = parser.parse_args(argv)
    try:
        # Check the destination before any expensive source processing.
        if args.command == "intake":
            result = intake(args.input_dir, args.out)
        else:
            new_output(args.out)
            if args.command == "check-image":
                result = check_image(args.file, args.expected_width, args.expected_height, args.require_transparency)
            else:
                with Path(args.records_json).open("r", encoding="utf-8-sig") as stream:
                    data = json.load(stream)
                result = summarize(data)
                result["source_path"] = str(Path(args.records_json).resolve())
                result["source_sha256"] = sha256_file(args.records_json)
            write_new_json(args.out, result)
        print(encode(result), end="")
        return 0 if result["ok"] else 1
    except (PilotError, OSError, ValueError) as exc:
        print(encode({"ok": False, "command": args.command, "error": str(exc)}), end="")
        return 2


if __name__ == "__main__":
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    raise SystemExit(main())
