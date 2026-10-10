"""Black-box tests for team batches; all assets/reviews are synthetic test data.

Passing these tests says nothing about real artistic or engine acceptance.
Run: python -m unittest discover -s tests -p 'test_team_batch.py' -v
"""
from __future__ import annotations

import copy
import hashlib
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest

import test_style_pack


ROOT = Path(__file__).resolve().parents[1]
CLI = ROOT / "scripts" / "team_batch.py"
STYLE_CLI = CLI.with_name("style_pack.py")


class TeamBatchContractTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix=".tmp-team-batch-", dir=ROOT / "tests")
        self.addCleanup(self.temp.cleanup)
        self.work = Path(self.temp.name)
        self.source = self.work / "source"
        self.source.mkdir()
        (self.source / "references").mkdir()
        self.pack_data = test_style_pack.StylePackContractTests().make_data()
        for reference in self.pack_data["references"]:
            (self.source / reference["path"]).write_text("TEST ONLY synthetic reference bytes.", encoding="utf-8")
        for category in ("tile", "motion"):
            self.pack_data["scope"]["asset_types"].append(category)
            self.pack_data["profiles"][category] = copy.deepcopy(self.pack_data["profiles"]["prop"])
            self.pack_data["profiles"][category]["technical"] = {"fixture_category": category}
        (self.source / "style-pack.json").write_text(json.dumps(self.pack_data), encoding="utf-8")
        self.pack = self.work / "built"
        self.run_cli(STYLE_CLI, "build", self.source, "--out", self.pack, expected=0)
        manifest = json.loads((self.pack / "manifest.json").read_text(encoding="utf-8"))
        self.baseline = {"project_id": manifest["pack"]["id"], "version": manifest["pack"]["version"], "fingerprint": manifest["pack"]["fingerprint"]}
        self.batch_root = self.work / "batch"
        self.batch_root.mkdir()
        (self.batch_root / "assets").mkdir()
        (self.batch_root / "evidence").mkdir()
        asset_file = self.batch_root / "assets" / "tile.svg"
        asset_file.write_text("TEST ONLY synthetic asset bytes.", encoding="utf-8")
        (self.batch_root / "evidence" / "tile.md").write_text("TEST ONLY recorded claim; no real review or engine test.", encoding="utf-8")
        self.data = {
            "schema_version": "1.0", "batch_id": "test-batch-001", "mode": "demonstration",
            "baseline": copy.deepcopy(self.baseline),
            "assignments": [{
                "task_id": "TASK-TILE", "category": "tile", "owner": {"id": "test-vendor", "kind": "external"},
                "asset_ids": ["tile-001"], "required_checks": ["style", "readability"],
            }],
            "deliveries": [{
                "asset_id": "tile-001", "task_id": "TASK-TILE", "baseline": copy.deepcopy(self.baseline),
                "files": [{"path": "assets/tile.svg", "sha256": hashlib.sha256(asset_file.read_bytes()).hexdigest()}],
                "reviews": [{"criterion": criterion, "result": "pass", "evidence_path": "evidence/tile.md"} for criterion in ("style", "readability")],
            }],
        }
        self.batch = self.batch_root / "batch.json"
        self.report_number = 0

    def run_cli(self, cli, *args, expected):
        process = subprocess.run([sys.executable, str(cli), *(str(arg) for arg in args)], cwd=self.work, capture_output=True, text=True, encoding="utf-8", timeout=20)
        self.assertEqual(process.returncode, expected, process.stdout + "\n" + process.stderr)
        try:
            return json.loads(process.stdout)
        except ValueError:
            self.fail("Expected JSON stdout: " + process.stdout + "\n" + process.stderr)

    def check(self, expected=0, *, output=None):
        self.batch.write_text(json.dumps(self.data), encoding="utf-8")
        self.report_number += 1
        output = output or self.work / f"report-{self.report_number}.json"
        result = self.run_cli(CLI, "check", self.batch, "--pack", self.pack, "--out", output, expected=expected)
        if output.is_file() and "out" in result:
            self.assertEqual(result, json.loads(output.read_text(encoding="utf-8")))
        return result

    def snapshot(self, root):
        return {path.relative_to(root).as_posix(): hashlib.sha256(path.read_bytes()).hexdigest() for path in root.rglob("*") if path.is_file()}

    def test_complete_demo_is_ready_but_never_production_approval(self):
        self.batch.write_text(json.dumps(self.data), encoding="utf-8")
        before_pack, before_batch = self.snapshot(self.pack), self.snapshot(self.batch_root)
        result = self.check()
        self.assertTrue(result["input_valid"])
        self.assertTrue(result["plan_valid"])
        self.assertTrue(result["ready"])
        self.assertFalse(result["production_approved"])
        self.assertEqual(result["summary"]["ready_assets"], 1)
        asset = result["assets"][0]
        self.assertEqual(asset["status"], "ready_for_review_or_handoff")
        self.assertEqual(asset["profile"], self.pack_data["profiles"]["tile"])
        self.assertEqual(asset["file_checks"][0]["sha256"], self.data["deliveries"][0]["files"][0]["sha256"])
        self.assertTrue(all(review["accepted"] and review["evidence"]["bytes"] > 0 for review in asset["review_checks"]))
        self.assertEqual(before_pack, self.snapshot(self.pack))
        self.assertEqual(before_batch, self.snapshot(self.batch_root))

    def test_production_mode_still_does_not_grant_approval(self):
        self.data["mode"] = "production"
        result = self.check()
        self.assertTrue(result["ready"])
        self.assertFalse(result["production_approved"])
        self.assertFalse(result["pack_release"])

    def test_empty_deliveries_are_a_valid_plan_with_pending_assets(self):
        self.data["deliveries"] = []
        result = self.check(1)
        self.assertTrue(result["input_valid"])
        self.assertTrue(result["plan_valid"])
        self.assertFalse(result["ready"])
        self.assertEqual(result["summary"]["expected_assets"], 1)
        self.assertEqual(result["summary"]["missing_assets"], 1)
        self.assertEqual(result["summary"]["pending_assets"], 1)
        self.assertEqual(result["assets"][0]["status"], "missing")

    def test_one_missing_asset_prevents_batch_readiness(self):
        self.data["assignments"][0]["asset_ids"].append("tile-002")
        result = self.check(1)
        self.assertEqual(result["summary"]["ready_assets"], 1)
        self.assertEqual(result["summary"]["pending_assets"], 1)
        self.assertFalse(result["ready"])

    def test_old_version_wrong_project_and_same_version_wrong_fingerprint_rejected(self):
        for field, wrong in (("version", "0.0.1"), ("project_id", "wrong-project"), ("fingerprint", "0" * 64)):
            with self.subTest(field=field):
                self.data["deliveries"][0]["baseline"] = copy.deepcopy(self.baseline)
                self.data["deliveries"][0]["baseline"][field] = wrong
                result = self.check(1)
                self.assertTrue(result["plan_valid"])
                self.assertEqual(result["assets"][0]["status"], "version_mismatch")
                self.assertEqual(result["summary"]["blocked_assets"], 1)
                self.assertFalse(result["ready"])

    def test_wrong_batch_baseline_blocks_even_a_current_delivery(self):
        self.data["baseline"]["fingerprint"] = "0" * 64
        result = self.check(1)
        self.assertFalse(result["plan_valid"])
        self.assertEqual(result["assets"][0]["status"], "version_mismatch")

    def test_duplicate_deliveries_unassigned_assets_and_wrong_task_are_invalid(self):
        original = copy.deepcopy(self.data)
        for change, code in (("duplicate", "duplicate_delivery"), ("unassigned", "unassigned_asset"), ("task", "task_mismatch")):
            with self.subTest(change=change):
                self.data = copy.deepcopy(original)
                if change == "duplicate":
                    self.data["deliveries"].append(copy.deepcopy(self.data["deliveries"][0]))
                elif change == "unassigned":
                    self.data["deliveries"][0]["asset_id"] = "not-assigned"
                else:
                    self.data["deliveries"][0]["task_id"] = "WRONG-TASK"
                result = self.check(2)
                self.assertFalse(result["input_valid"])
                self.assertIn(code, {issue["code"] for issue in result["errors"]})

    def test_duplicate_assignments_and_empty_or_duplicate_checks_are_invalid(self):
        original = copy.deepcopy(self.data)
        for change in ("asset", "task", "empty_assignments", "empty_assets", "empty_checks", "duplicate_checks"):
            with self.subTest(change=change):
                self.data = copy.deepcopy(original)
                assignment = self.data["assignments"][0]
                if change == "asset":
                    other = copy.deepcopy(assignment)
                    other["task_id"] = "OTHER-TASK"
                    self.data["assignments"].append(other)
                elif change == "task":
                    other = copy.deepcopy(assignment)
                    other["asset_ids"] = ["tile-002"]
                    self.data["assignments"].append(other)
                elif change == "empty_assignments":
                    self.data["assignments"] = []
                elif change == "empty_assets":
                    assignment["asset_ids"] = []
                elif change == "empty_checks":
                    assignment["required_checks"] = []
                else:
                    assignment["required_checks"] = ["style", "style"]
                self.assertFalse(self.check(2)["input_valid"])

    def test_motion_profile_is_bound_and_missing_category_is_invalid(self):
        self.data["assignments"][0]["category"] = "motion"
        self.assertEqual(self.check()["assets"][0]["profile"], self.pack_data["profiles"]["motion"])
        self.data["assignments"][0]["category"] = "video"
        self.assertFalse(self.check(2)["input_valid"])
        self.data["assignments"][0]["category"] = "tile"
        self.pack_data["scope"]["asset_types"].remove("tile")
        del self.pack_data["profiles"]["tile"]
        (self.source / "style-pack.json").write_text(json.dumps(self.pack_data), encoding="utf-8")
        self.pack = self.work / "without-tile"
        self.run_cli(STYLE_CLI, "build", self.source, "--out", self.pack, expected=0)
        self.assertIn("unavailable_category", {error["code"] for error in self.check(2)["errors"]})

    def test_unknown_failed_missing_review_and_missing_evidence_do_not_pass(self):
        original = copy.deepcopy(self.data)
        for change, status in (("unknown", "review_pending"), ("fail", "review_failed"), ("missing_review", "review_pending"), ("missing_path", "review_pending"), ("empty_path", "review_pending"), ("missing_file", "review_pending")):
            with self.subTest(change=change):
                self.data = copy.deepcopy(original)
                reviews = self.data["deliveries"][0]["reviews"]
                if change in ("unknown", "fail"):
                    reviews[0]["result"] = change
                elif change == "missing_review":
                    reviews.pop(0)
                elif change == "missing_path":
                    del reviews[0]["evidence_path"]
                elif change == "empty_path":
                    reviews[0]["evidence_path"] = ""
                else:
                    reviews[0]["evidence_path"] = "evidence/missing.md"
                result = self.check(1)
                self.assertEqual(result["assets"][0]["status"], status)
                self.assertFalse(result["assets"][0]["review_checks"][0]["accepted"])

    def test_empty_evidence_does_not_pass(self):
        (self.batch_root / "evidence" / "tile.md").write_bytes(b"")
        result = self.check(1)
        self.assertEqual(result["assets"][0]["status"], "review_pending")
        self.assertEqual(result["assets"][0]["review_checks"][0]["evidence"]["bytes"], 0)

    def test_extra_failed_review_blocks_and_duplicate_criteria_are_invalid(self):
        self.data["deliveries"][0]["reviews"].append({"criterion": "engine", "result": "fail", "evidence_path": "evidence/tile.md"})
        self.assertEqual(self.check(1)["assets"][0]["status"], "review_failed")
        self.data["deliveries"][0]["reviews"][-1]["criterion"] = "style"
        self.assertIn("duplicate_review", {error["code"] for error in self.check(2)["errors"]})

    def test_files_are_required_nonempty_present_and_hash_verified(self):
        original = copy.deepcopy(self.data)
        for change in ("no_files", "missing", "hash", "empty"):
            with self.subTest(change=change):
                self.data = copy.deepcopy(original)
                file = self.data["deliveries"][0]["files"][0]
                if change == "no_files":
                    self.data["deliveries"][0]["files"] = []
                elif change == "missing":
                    file["path"] = "assets/missing.svg"
                elif change == "hash":
                    file["sha256"] = "0" * 64
                else:
                    (self.batch_root / "assets" / "tile.svg").write_bytes(b"")
                    file["sha256"] = hashlib.sha256(b"").hexdigest()
                result = self.check(1)
                self.assertEqual(result["assets"][0]["status"], "file_invalid")
                self.assertFalse(result["ready"])

    def test_changed_asset_bytes_are_detected_without_rewriting_inputs(self):
        (self.batch_root / "assets" / "tile.svg").write_text("tampered TEST ONLY bytes", encoding="utf-8")
        before = self.snapshot(self.pack)
        result = self.check(1)
        check = result["assets"][0]["file_checks"][0]
        self.assertFalse(check["valid"])
        self.assertNotEqual(check["sha256"], check["expected_sha256"])
        self.assertIn("hash_mismatch", {issue["code"] for issue in check["issues"]})
        self.assertEqual(before, self.snapshot(self.pack))

    def test_file_and_evidence_paths_cannot_escape_or_be_absolute(self):
        original = copy.deepcopy(self.data)
        outside = self.work / "outside.txt"
        outside.write_text("must not be opened as delivery input", encoding="utf-8")
        for field, key in (("files", "path"), ("reviews", "evidence_path")):
            for path in ("../outside.txt", str(outside.resolve()), "assets\\tile.svg", "assets/../assets/tile.svg", "assets/invalid\x00.svg"):
                with self.subTest(field=field, path=path):
                    self.data = copy.deepcopy(original)
                    self.data["deliveries"][0][field][0][key] = path
                    result = self.check(2)
                    self.assertFalse(result["input_valid"])
                    self.assertIn("unsafe_path", {error["code"] for error in result["errors"]})

    def test_links_even_inside_batch_directory_are_rejected_when_supported(self):
        link = self.batch_root / "assets" / "linked.svg"
        try:
            link.symlink_to(self.batch_root / "assets" / "tile.svg")
        except (OSError, NotImplementedError) as exc:
            self.skipTest("Host does not permit creating symlinks: " + str(exc))
        self.data["deliveries"][0]["files"][0]["path"] = "assets/linked.svg"
        self.assertIn("unsafe_path", {error["code"] for error in self.check(2)["errors"]})

    def test_report_refuses_overwrite_and_cannot_write_inside_pack(self):
        target = self.work / "keep.json"
        target.write_text("preserve existing report", encoding="utf-8")
        result = self.check(2, output=target)
        self.assertEqual(result["errors"][0]["code"], "destination_exists")
        self.assertEqual(target.read_text(encoding="utf-8"), "preserve existing report")
        before = self.snapshot(self.pack)
        self.check(2, output=self.pack / "report.json")
        self.assertEqual(before, self.snapshot(self.pack))

    def test_report_cannot_create_a_missing_declared_input(self):
        self.data["deliveries"][0]["reviews"][0]["evidence_path"] = "evidence/not-yet-written.json"
        target = self.batch_root / "evidence" / "not-yet-written.json"
        result = self.check(2, output=target)
        self.assertEqual(result["errors"][0]["code"], "output_input_collision")
        self.assertFalse(target.exists())

    def test_unbuilt_or_tampered_pack_is_rejected(self):
        original = self.pack
        self.pack = self.source
        result = self.check(2)
        self.assertFalse(result["pack_verified"])
        self.pack = original
        (self.pack / "references" / "style.svg").write_text("changed", encoding="utf-8")
        result = self.check(2)
        self.assertFalse(result["pack_verified"])
        self.assertFalse(result["ready"])

    def test_invalid_schema_cannot_be_silently_treated_as_ready(self):
        original = copy.deepcopy(self.data)
        for change in ("unknown_field", "invalid_mode", "missing_baseline", "null_fingerprint", "invalid_owner"):
            with self.subTest(change=change):
                self.data = copy.deepcopy(original)
                if change == "unknown_field":
                    self.data["baseline_version"] = "0.1.0"
                elif change == "invalid_mode":
                    self.data["mode"] = "approved"
                elif change == "missing_baseline":
                    del self.data["deliveries"][0]["baseline"]
                elif change == "null_fingerprint":
                    self.data["baseline"]["fingerprint"] = None
                else:
                    self.data["assignments"][0]["owner"]["kind"] = "automatically-approved"
                self.assertFalse(self.check(2)["input_valid"])


if __name__ == "__main__":
    unittest.main()
