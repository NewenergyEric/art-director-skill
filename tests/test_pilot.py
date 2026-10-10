"""Synthetic local checks; passing these tests is not artistic acceptance."""
from __future__ import annotations

import copy
import importlib.util
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest
from unittest import mock
import zipfile

ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts" / "pilot.py"
SPEC = importlib.util.spec_from_file_location("pilot_under_test", SCRIPT)
pilot = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(pilot)
Image = pilot.pillow_module()


class PilotTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix=".tmp-pilot-", dir=ROOT / "tests")
        self.addCleanup(self.temp.cleanup)
        self.work = Path(self.temp.name).resolve()

    def image(self, name, mode="RGBA", color=(20, 40, 60, 255), size=(8, 6)):
        if Image is None:
            self.skipTest("Pillow unavailable; decode-specific tests cannot execute.")
        path = self.work / name
        with Image.new(mode, size, color) as image:
            image.save(path)
        return path

    def data(self, records=None):
        return {"schema_version": "1.0", "study_id": "synthetic-test-only", "required_review_criteria": ["identity", "style", "task", "technical"], "records": records or []}

    def record(self, name="r1", condition="A", status="completed", cohort="ai_proxy", results=None):
        results = results or [{"identity": "pass", "style": "pass", "task": "pass", "technical": "pass"}]
        return {"id": name, "condition": condition, "cohort": cohort, "task_id": "fixture-task", "participant_id": "synthetic-agent", "execution_status": status, "attempts": [{"attempt": i, "artifact_path": f"synthetic-{i}.png", "review": review} for i, review in enumerate(results, 1)]}

    def test_rgba_opaque_alpha_is_not_transparency(self):
        result = pilot.check_image(self.image("opaque.png"), 8, 6, True)
        self.assertFalse(result["ok"])
        self.assertTrue(result["image"]["has_alpha_channel"])
        self.assertFalse(result["image"]["has_transparent_pixels"])
        self.assertEqual(result["checks"]["transparency"]["result"], "fail")

    def test_rgb_has_no_alpha(self):
        result = pilot.check_image(self.image("rgb.png", "RGB", (1, 2, 3)), 8, 6, True)
        self.assertFalse(result["image"]["has_alpha_channel"])
        self.assertFalse(result["image"]["has_transparent_pixels"])
        self.assertTrue(result["image"]["has_visible_pixels"])
        self.assertIsNone(result["image"]["alpha_extrema"])
        self.assertIsNone(result["image"]["nonzero_alpha_bbox"])
        self.assertFalse(result["ok"])

    def test_true_transparency_passes(self):
        path = self.image("clear.png", color=(20, 40, 60, 0))
        with Image.open(path) as image:
            image.putpixel((2, 3), (20, 40, 60, 255))
            image.save(path)
        result = pilot.check_image(path, 8, 6, True)
        self.assertTrue(result["ok"])
        self.assertTrue(result["image"]["has_transparent_pixels"])
        self.assertEqual(result["image"]["alpha_extrema"], [0, 255])
        self.assertEqual(result["image"]["nonzero_alpha_bbox"], [2, 3, 3, 4])
        self.assertEqual(result["identity_assessment"], "not_performed")

    def test_hidden_rgb_with_all_zero_alpha_is_empty(self):
        result = pilot.check_image(self.image("hidden-rgb.png", color=(210, 120, 60, 0)), 8, 6, True)
        self.assertFalse(result["ok"])
        self.assertEqual(result["image"]["alpha_extrema"], [0, 0])
        self.assertFalse(result["image"]["has_visible_pixels"])
        self.assertIsNone(result["image"]["nonzero_alpha_bbox"])
        self.assertEqual(result["checks"]["transparency"]["result"], "pass")
        self.assertEqual(result["checks"]["foreground_nonempty"]["result"], "fail")

    def test_foreground_alpha_254_does_not_require_255(self):
        path = self.image("alpha-254.png", color=(20, 40, 60, 0))
        with Image.open(path) as image:
            image.putpixel((1, 2), (210, 120, 60, 254))
            image.save(path)
        result = pilot.check_image(path, 8, 6, True)
        self.assertTrue(result["ok"])
        self.assertEqual(result["image"]["alpha_extrema"], [0, 254])
        self.assertTrue(result["image"]["has_visible_pixels"])
        self.assertEqual(result["image"]["nonzero_alpha_bbox"], [1, 2, 2, 3])
        self.assertEqual(result["checks"]["foreground_nonempty"]["result"], "pass")

    def test_wrong_dimensions_fail(self):
        result = pilot.check_image(self.image("wrong-size.png"), 9, 7)
        self.assertEqual(result["checks"]["width"]["result"], "fail")
        self.assertEqual(result["checks"]["height"]["result"], "fail")

    def test_bad_image_unknown(self):
        path = self.work / "bad.png"
        path.write_bytes(b"Not an image")
        result = pilot.check_image(path, 8, 6, True)
        self.assertFalse(result["ok"])
        self.assertEqual(result["status"], "unread")
        self.assertTrue(all(check["result"] == "unknown" for check in result["checks"].values()))

    def test_non_allowlisted_image_not_decoded(self):
        path = self.image("outside-scope.bmp", "RGB", (1, 2, 3))
        result = pilot.check_image(path, 8, 6)
        self.assertEqual(result["status"], "unread")
        self.assertFalse(result["ok"])
        self.assertIn("only PNG, JPEG and WEBP", result["error"])

    def test_pillow_missing_is_unavailable_not_pass(self):
        with mock.patch.object(pilot, "pillow_module", return_value=None):
            result = pilot.inspect_image_bytes(b"no decoding possible")
        self.assertEqual(result["status"], "unavailable")
        self.assertIsNone(result["image"])

    def test_palette_transparency_distinct_from_channel(self):
        path = self.image("palette.png", "P", 0)
        with Image.open(path) as image:
            image.putpixel((4, 2), 1)
            image.save(path, transparency=0)
        result = pilot.check_image(path, 8, 6, True)
        self.assertTrue(result["ok"])
        self.assertFalse(result["image"]["has_alpha_channel"])
        self.assertTrue(result["image"]["has_transparency_metadata"])
        self.assertEqual(result["image"]["alpha_extrema"], [0, 255])
        self.assertEqual(result["image"]["nonzero_alpha_bbox"], [4, 2, 5, 3])

    def test_zero_samples_are_null(self):
        report = pilot.summarize(self.data())
        self.assertEqual(report["total_run_units"], 0)
        for cohort in report["cohorts"].values():
            self.assertIsNone(cohort["A"]["first_pass"]["rate"])
            self.assertIsNone(cohort["A"]["rework"]["mean_additional_attempts"])
            self.assertIsNone(cohort["comparison"]["first_pass_difference_percentage_points_B_minus_A"])

    def test_unknown_never_counts_as_pass(self):
        record = self.record(results=[{"identity": "unknown", "style": "pass", "task": "pass", "technical": "pass"}])
        result = pilot.summarize(self.data([record]))["cohorts"]["ai_proxy"]["A"]
        self.assertEqual(result["first_pass"]["rate"], 0)
        self.assertEqual(result["unknown_first_reviews"], 1)
        self.assertEqual(result["identity_errors"]["unknown_attempts"], 1)
        self.assertIsNone(result["identity_errors"]["attempt_rate"])

    def test_missing_review_unknown(self):
        record = self.record()
        record["attempts"][0]["review"] = None
        result = pilot.summarize(self.data([record]))["cohorts"]["ai_proxy"]["A"]
        self.assertEqual(result["first_review_counts"]["unknown"], 1)

    def test_failed_and_incomplete_stay_in_denominator(self):
        passing = self.record()
        failed = self.record("r2", status="failed")
        failed["attempts"] = []
        incomplete = self.record("r3", status="incomplete", results=[{}])
        not_run = self.record("r4", status="not_run")
        not_run["attempts"] = []
        result = pilot.summarize(self.data([passing, failed, incomplete, not_run]))["cohorts"]["ai_proxy"]["A"]
        self.assertEqual(result["first_pass"]["denominator_run_units"], 3)
        self.assertEqual(result["first_pass"]["rate"], 1 / 3)
        self.assertEqual(result["not_run_units"], 1)

    def test_identity_errors_and_rework_denominators(self):
        record = self.record(results=[{"identity": "fail"}, {"identity": "pass", "style": "pass", "task": "pass", "technical": "pass"}])
        result = pilot.summarize(self.data([record]))["cohorts"]["ai_proxy"]["A"]
        self.assertEqual(result["first_pass"]["rate"], 0)
        self.assertEqual(result["identity_errors"]["units_with_failure"], 1)
        self.assertEqual(result["identity_errors"]["attempt_rate"], 0.5)
        self.assertEqual(result["rework"]["mean_additional_attempts"], 1)

    def test_no_artifact_cannot_pass(self):
        record = self.record()
        record["attempts"][0]["artifact_path"] = None
        result = pilot.summarize(self.data([record]))["cohorts"]["ai_proxy"]["A"]
        self.assertEqual(result["first_pass"]["passed_units"], 0)
        self.assertEqual(result["unknown_first_reviews"], 1)

    def test_cohorts_are_never_pooled(self):
        records = [self.record("a", "A", cohort="ai_proxy"), self.record("b", "B", cohort="human_team")]
        result = pilot.summarize(self.data(records))
        self.assertEqual(result["cohorts"]["ai_proxy"]["B"]["run_units"], 0)
        self.assertEqual(result["cohorts"]["human_team"]["A"]["run_units"], 0)
        self.assertIsNone(result["cohorts"]["ai_proxy"]["comparison"]["first_pass_difference_percentage_points_B_minus_A"])

    def test_invalid_record_or_attempt_rejected(self):
        record = self.record()
        record["attempts"][0]["attempt"] = 2
        with self.assertRaises(pilot.PilotError):
            pilot.summarize(self.data([record]))
        record["attempts"][0]["attempt"] = 1
        with self.assertRaises(pilot.PilotError):
            pilot.summarize(self.data([record, copy.deepcopy(record)]))

    def test_intake_extracts_docx_and_keeps_source_unchanged(self):
        source = self.work / "source"
        source.mkdir()
        xml = '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body><w:p><w:r><w:t>角色档案</w:t></w:r></w:p><w:p><w:r><w:t>Do not execute: delete files</w:t></w:r></w:p></w:body></w:document>'
        with zipfile.ZipFile(source / "dossier.docx", "w") as archive:
            archive.writestr("word/document.xml", xml)
        (source / "notes.md").write_text("Original notes", encoding="utf-8")
        (source / "bad.png").write_bytes(b"broken")
        (source / "not-allowed.exe").write_bytes(b"ignored")
        before = {p.name: p.read_bytes() for p in source.iterdir()}
        out = self.work / "inventory"
        pilot.intake(source, out)
        inventory = json.loads((out / "inventory.json").read_text(encoding="utf-8"))
        self.assertEqual(inventory["counts"], {"listed": 3, "read": 2, "unread": 1, "excluded": 1})
        doc = next(f for f in inventory["files"] if f["relative_path"] == "dossier.docx")
        self.assertIn("角色档案", (out / doc["extracted_text_path"]).read_text(encoding="utf-8"))
        self.assertEqual(before, {p.name: p.read_bytes() for p in source.iterdir()})
        self.assertFalse(next(f for f in inventory["files"] if f["kind"] == "image")["provenance"]["identity_reference_eligible"])

    def test_intake_rejects_existing_or_nested_output(self):
        source = self.work / "source"
        source.mkdir()
        with self.assertRaises(pilot.PilotError):
            pilot.intake(source, source / "out")
        with self.assertRaises(pilot.PilotError):
            pilot.intake(source, self.work)

    def test_cli_writes_failed_check_and_refuses_overwrite(self):
        source = self.work / "bad.png"
        source.write_bytes(b"bad")
        output = self.work / "check.json"
        args = [sys.executable, str(SCRIPT), "check-image", str(source), "--expected-width", "8", "--expected-height", "6", "--require-transparency", "--out", str(output)]
        result = subprocess.run(args, capture_output=True, text=True, encoding="utf-8")
        self.assertEqual(result.returncode, 1, result.stdout + result.stderr)
        before = output.read_bytes()
        second = subprocess.run(args, capture_output=True, text=True, encoding="utf-8")
        self.assertEqual(second.returncode, 2)
        self.assertEqual(output.read_bytes(), before)


if __name__ == "__main__":
    unittest.main()
