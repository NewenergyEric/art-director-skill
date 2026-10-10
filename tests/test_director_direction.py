"""Director-to-team contract tests. Every artwork/approval is synthetic test data.

These prove routing, integrity and prerequisite enforcement, not visual quality.
"""
from __future__ import annotations

import copy
import hashlib
import json
from pathlib import Path
import shutil
import subprocess
import sys
import unittest
import zipfile

import test_project_runtime as runtime_tests


ROOT = Path(__file__).resolve().parents[1]
STYLE = ROOT / "scripts/style_pack.py"
RUNTIME = STYLE.with_name("project_runtime.py")
BATCH = STYLE.with_name("team_batch.py")


class DirectorDirectionTests(unittest.TestCase):
    cli = runtime_tests.ProjectRuntimeTests.cli
    build = runtime_tests.ProjectRuntimeTests.build
    init = runtime_tests.ProjectRuntimeTests.init
    request = runtime_tests.ProjectRuntimeTests.request
    start = runtime_tests.ProjectRuntimeTests.start
    read = runtime_tests.ProjectRuntimeTests.read
    approve_test_fixture = runtime_tests.ProjectRuntimeTests.approve_test_fixture

    def setUp(self):
        runtime_tests.ProjectRuntimeTests.setUp(self)
        # Two families within UI must not leak exclusive rules to each other.
        for suffix in ("CARD", "BUTTON"):
            rule = copy.deepcopy(self.data["rules"][0])
            rule.update(id="F-" + suffix, scope=["ui"], statement="TEST ONLY " + suffix + " requirement")
            self.data["rules"].append(rule)
        self.data["direction"] = {
            "positioning": [{"id": "audience", "topic": "Audience", "statement": "TEST ONLY audience proposal", "status": "proposed", "source": "Synthetic local test"}],
            "families": [
                {"id": "cards", "name": "Test cards", "category": "ui", "purpose": "TEST ONLY card variants", "rule_ids": ["F-CARD"], "reference_ids": [],
                 "fixed": ["TEST ONLY keep card hierarchy"], "variable": ["Layout"], "technical": {"width": None}, "status": "proposed",
                 "task_controls": {"slots": {"layout": {"default": "image above title", "guidance": "TEST ONLY preserve hierarchy"}}, "exploration": {"allowed_slots": ["layout"], "max_candidates": 3}}},
                {"id": "buttons", "name": "Test buttons", "category": "ui", "purpose": "TEST ONLY action controls", "rule_ids": ["F-BUTTON"], "reference_ids": [],
                 "fixed": ["TEST ONLY keep button states"], "variable": ["Label"], "technical": {}, "status": "proposed"},
            ],
            "exemplars": [{"id": "card-sample", "name": "Test sample", "family_ids": ["cards"], "purpose": "TEST ONLY first piece and composition", "reference_ids": [],
                           "acceptance": ["TEST ONLY verify hierarchy in context"], "required": True, "status": "planned", "approval": None}],
            "delivery": [{"id": "web", "name": "Test web channel", "categories": ["ui"], "channels": ["TEST ONLY website"], "requirements": ["TEST ONLY editable source and export"],
                          "technical": {"export_format": "PNG"}, "status": "proposed", "source": "Synthetic fixture"}],
        }
        self.pack = self.build()

    def write(self):
        (self.source / "style-pack.json").write_text(json.dumps(self.data, ensure_ascii=False), encoding="utf-8")

    def ui_request(self, **updates):
        request = self.request(category="ui", subject=None, family="cards", changes={"layout": "image beside title"}, exploration={"slots": ["layout"], "candidates": 2})
        request.update(updates)
        return request

    def test_five_guides_derive_states_and_link_same_canonical_source(self):
        manifest = json.loads((self.pack / "manifest.json").read_text(encoding="utf-8"))
        self.assertEqual(manifest["format"], "team-v1")
        guides = list((self.pack / "guides").glob("*.md"))
        self.assertEqual(len(guides), 5)
        for guide in guides:
            text = guide.read_text(encoding="utf-8")
            self.assertIn(manifest["pack"]["fingerprint"], text)
            self.assertIn("style-pack.json", text)
        self.assertIn("planned", (self.pack / "guides/00-index.md").read_text(encoding="utf-8"))
        self.assertIn("null", (self.pack / "guides/02-design-system.md").read_text(encoding="utf-8"))
        self.assertTrue((self.pack / "scripts/project_runtime.py").is_file())
        self.assertTrue((self.pack / "scripts/team_batch.py").is_file())

    def test_brief_and_member_task_bind_family_and_canonical_checks(self):
        brief = self.cli("brief", self.pack, "--category", "ui", "--family", "cards", "--task", "test cards", script=STYLE)
        self.assertIn("F-CARD", {r["id"] for r in brief["rules"]})
        self.assertNotIn("F-BUTTON", {r["id"] for r in brief["rules"]})
        self.assertEqual(brief["family"]["id"], "cards")
        self.assertEqual(brief["exemplars"][0]["status"], "planned")
        self.init()
        request = self.ui_request()
        result = self.start(request)
        task = self.read(f"tasks/{request['task_id']}/task.json")
        review = self.read(f"tasks/{request['task_id']}/review.json")
        self.assertEqual(task["family_id"], "cards")
        self.assertEqual(task["resolved_values"]["layout"], "image beside title")
        criteria = {r["criterion"] for r in review["direction_checks"]}
        self.assertIn("family/cards/fixed/1", criteria)
        self.assertIn("exemplar/card-sample/acceptance/1", criteria)
        self.assertIn("delivery/web/requirement/1", criteria)
        self.assertTrue(all(r["result"] == "unknown" for r in review["direction_checks"]))
        self.assertIn("Test cards", Path(result["generation_brief"]).read_text(encoding="utf-8"))

    def test_family_selection_is_required_not_guessed_and_category_must_match(self):
        self.init()
        result = self.start(self.ui_request(family=None, changes={}, exploration={"slots": [], "candidates": 1}), expected=1)
        self.assertIn("family_required", {b["code"] for b in result["blockers"]})
        wrong = self.start(self.ui_request(category="prop"), expected=2)
        self.assertEqual(wrong["errors"][0]["code"], "family_category")
        missing = self.cli("brief", self.pack, "--category", "ui", "--family", "missing", "--task", "test", script=STYLE, expected=2)
        self.assertEqual(missing["errors"][0]["code"], "unknown_family")

    def test_combined_components_merge_family_rules_and_checklists(self):
        self.init()
        request = self.request(components=[{"category": "ui", "subject": None, "family": "cards"}, {"category": "ui", "subject": None, "family": "buttons"}])
        self.start(request)
        brief = self.read(f"tasks/{request['task_id']}/brief.json")
        self.assertTrue({"F-CARD", "F-BUTTON"} <= {r["id"] for r in brief["rules"]})
        self.assertEqual({b["family"]["id"] for b in brief["component_briefs"]}, {"cards", "buttons"})
        self.assertEqual(len(brief["direction_checks"]), len({c["criterion"] for c in brief["direction_checks"]}))

    def test_dangling_ids_wrong_scopes_and_unknown_status_are_validation_errors(self):
        original = copy.deepcopy(self.data)
        changes = [
            (lambda d: d["direction"]["families"][0].update(rule_ids=["missing"]), "unknown_rule"),
            (lambda d: d["direction"]["families"][0].update(rule_ids=["R-CHARACTER"]), "family_scope"),
            (lambda d: d["direction"]["exemplars"][0].update(family_ids=["missing"]), "unknown_family"),
            (lambda d: d["direction"]["families"][0].update(reference_ids=["missing"]), "unknown_reference"),
            (lambda d: d["direction"]["positioning"][0].update(status="accepted"), "enum"),
        ]
        for change, code in changes:
            with self.subTest(code=code):
                self.data = copy.deepcopy(original)
                change(self.data)
                self.write()
                result = self.cli("validate", self.source, expected=1, script=STYLE)
                self.assertIn(code, {e["code"] for e in result["errors"]})

    def test_family_controls_fail_early_for_unknown_slots_and_invalid_budget(self):
        original = copy.deepcopy(self.data)
        for change in ("slot", "budget", "shape"):
            with self.subTest(change=change):
                self.data = copy.deepcopy(original)
                controls = self.data["direction"]["families"][0]["task_controls"]
                if change == "slot":
                    controls["exploration"]["allowed_slots"] = ["not_declared"]
                elif change == "budget":
                    controls["exploration"]["max_candidates"] = 0
                else:
                    controls["slots"]["layout"] = []
                self.write()
                result = self.cli("validate", self.source, script=STYLE, expected=1)
                self.assertTrue(result["errors"])

    def test_family_binding_does_not_remove_global_rules_or_other_category_guidance(self):
        self.data["direction"]["families"][0]["rule_ids"].append("R-GLOBAL")
        self.data["direction"]["families"][0]["reference_ids"].append("REF-STYLE")
        self.pack = self.build()
        button = self.cli("brief", self.pack, "--category", "ui", "--family", "buttons", "--task", "test buttons", script=STYLE)
        self.assertIn("R-GLOBAL", {r["id"] for r in button["rules"]})
        self.assertIn("REF-STYLE", {r["id"] for r in button["references"]})
        prop = self.cli("brief", self.pack, "--category", "prop", "--task", "test prop", script=STYLE)
        self.assertIn("R-GLOBAL", {r["id"] for r in prop["rules"]})
        self.assertIn("REF-STYLE", {r["id"] for r in prop["references"]})

    def test_planned_sample_cannot_be_relabelled_candidate_or_approved_without_materials(self):
        sample = self.data["direction"]["exemplars"][0]
        for status in ("candidate", "approved"):
            sample["status"] = status
            self.write()
            result = self.cli("validate", self.source, script=STYLE, expected=1)
            self.assertIn("exemplar_evidence", {e["code"] for e in result["errors"]})
        sample.update(reference_ids=["REF-STYLE"], approval={"by": "TEST ONLY", "at": "2026-10-10", "evidence_path": "missing-approval.md"})
        self.write()
        result = self.cli("validate", self.source, script=STYLE, expected=1)
        self.assertTrue({"exemplar_evidence", "missing_file"} <= {e["code"] for e in result["errors"]})

    def test_release_blocks_unknown_parameters_and_required_unapproved_sample(self):
        self.approve_test_fixture()
        direction = self.data["direction"]
        for collection in ("positioning", "families", "delivery"):
            for item in direction[collection]:
                item["status"] = "confirmed"
        self.write()
        result = self.cli("validate", self.source, "--release", script=STYLE, expected=1)
        self.assertTrue({"required_exemplar", "unknown_technical"} <= {e["code"] for e in result["errors"]})
        direction["families"][0]["technical"]["width"] = 64
        sample = direction["exemplars"][0]
        (self.source / "sample-approval.md").write_text("TEST ONLY synthetic sample approval; not a human review.", encoding="utf-8")
        sample.update(status="approved", reference_ids=["REF-CONTEXT"], approval={"by": "TEST ONLY synthetic reviewer", "at": "2026-10-10", "evidence_path": "sample-approval.md"})
        release = self.build(release=True)
        self.assertTrue((release / "sample-approval.md").is_file())
        before = json.loads((release / "manifest.json").read_text(encoding="utf-8"))["pack"]["fingerprint"]
        (self.source / "sample-approval.md").write_text("TEST ONLY changed approval bytes", encoding="utf-8")
        changed = self.build(release=True)
        after = json.loads((changed / "manifest.json").read_text(encoding="utf-8"))["pack"]["fingerprint"]
        self.assertNotEqual(before, after)

    def test_legacy_manifest_remains_verifiable_and_direction_requires_team_format(self):
        # Recreate the documented pre-v0.5 whitelist in a temporary legacy fixture.
        data = self.data.pop("direction")
        legacy = self.build()
        manifest_path = legacy / "manifest.json"
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
        del manifest["format"]
        extras = [p for p in manifest["files"] if p.startswith("guides/") or p in {"scripts/project_runtime.py", "scripts/team_batch.py"}]
        for relative in extras:
            path = (legacy / relative).resolve()
            self.assertTrue(path.is_relative_to(self.work.resolve()))
            path.unlink()
            del manifest["files"][relative]
        manifest_path.write_text(json.dumps(manifest), encoding="utf-8")
        self.assertTrue(self.cli("verify", legacy, script=STYLE)["ok"])
        self.data["direction"] = data
        rich_manifest = json.loads((self.pack / "manifest.json").read_text(encoding="utf-8"))
        del rich_manifest["format"]
        (self.pack / "manifest.json").write_text(json.dumps(rich_manifest), encoding="utf-8")
        invalid = self.cli("verify", self.pack, script=STYLE, expected=1)
        self.assertIn("manifest_format", {e["code"] for e in invalid["errors"]})

    def test_archive_unpacks_elsewhere_and_only_bundled_tools_prepare_check_and_resume(self):
        archive = self.work / "team.zip"
        self.cli("archive", self.pack, "--out", archive, script=STYLE)
        unpacked = self.work / "another-machine" / "received-pack"
        unpacked.mkdir(parents=True)
        with zipfile.ZipFile(archive) as stream:
            stream.extractall(unpacked)
        self.assertTrue(self.cli("verify", unpacked, script=unpacked / "scripts/style_pack.py")["ok"])
        member = unpacked.parent / "member-workspace"
        self.cli("init", "--pack", unpacked, "--out", member, "--allow-draft", script=unpacked / "scripts/project_runtime.py")
        request = self.ui_request()
        self.start(request, script=member / "tools/project_runtime.py", workspace=member)
        self.assertEqual(len(self.cli("status", member, script=member / "tools/project_runtime.py")["tasks"]), 1)
        self.assertFalse(self.cli("resume", member, "--task", request["task_id"], script=member / "tools/project_runtime.py")["production_approved"])
        current = json.loads((member / "project.json").read_text(encoding="utf-8"))["current"]
        baseline = {"project_id": self.data["project"]["id"], "version": current["version"], "fingerprint": current["fingerprint"]}
        batch = {"schema_version": "1.0", "batch_id": "portable-batch", "mode": "demonstration", "baseline": baseline,
                 "assignments": [{"task_id": request["task_id"], "category": "ui", "family": "cards", "owner": request["owner"], "asset_ids": ["card-001"], "required_checks": ["style"]}], "deliveries": []}
        batch_path = member / "work/batch.json"
        batch_path.write_text(json.dumps(batch), encoding="utf-8")
        report = self.cli("check", batch_path, "--pack", member / current["path"], "--out", member / "work/batch-report.json", expected=1, script=member / "tools/team_batch.py")
        self.assertTrue(report["plan_valid"])
        self.assertFalse(report["ready"])
        self.assertEqual(report["assets"][0]["family"]["id"], "cards")
        self.assertIn("family/cards/fixed/1", report["assets"][0]["required_checks"])

    def test_batch_cannot_omit_family_or_pass_with_only_generic_checks(self):
        current = json.loads((self.pack / "manifest.json").read_text(encoding="utf-8"))["pack"]
        baseline = {"project_id": current["id"], "version": current["version"], "fingerprint": current["fingerprint"]}
        asset = self.work / "asset.svg"
        asset.write_text("TEST ONLY asset bytes", encoding="utf-8")
        evidence = self.work / "review.md"
        evidence.write_text("TEST ONLY recorded claim; no art approval", encoding="utf-8")
        batch = {"schema_version": "1.0", "batch_id": "family-batch", "mode": "demonstration", "baseline": baseline,
                 "assignments": [{"task_id": "cards-task", "category": "ui", "family": "cards", "owner": {"id": "test-vendor", "kind": "external"}, "asset_ids": ["card-001"], "required_checks": ["style"]}],
                 "deliveries": [{"asset_id": "card-001", "task_id": "cards-task", "family": "cards", "baseline": baseline, "files": [{"path": "asset.svg", "sha256": hashlib.sha256(asset.read_bytes()).hexdigest()}], "reviews": [{"criterion": "style", "result": "pass", "evidence_path": "review.md"}]}]}
        path = self.work / "batch.json"
        path.write_text(json.dumps(batch), encoding="utf-8")
        report = self.cli("check", path, "--pack", self.pack, "--out", self.work / "batch-report-1.json", script=BATCH, expected=1)
        self.assertIn("review_pending", report["assets"][0]["blockers"])
        self.assertTrue(any(r["criterion"] == "family/cards/fixed/1" and r["result"] == "unknown" for r in report["assets"][0]["review_checks"]))
        batch["deliveries"][0]["family"] = "buttons"
        path.write_text(json.dumps(batch), encoding="utf-8")
        mismatch = self.cli("check", path, "--pack", self.pack, "--out", self.work / "batch-report-2.json", script=BATCH, expected=2)
        self.assertIn("family_mismatch", {e["code"] for e in mismatch["errors"]})
        del batch["assignments"][0]["family"]
        path.write_text(json.dumps(batch), encoding="utf-8")
        missing = self.cli("check", path, "--pack", self.pack, "--out", self.work / "batch-report-3.json", script=BATCH, expected=2)
        self.assertIn("family_required", {e["code"] for e in missing["errors"]})


if __name__ == "__main__":
    unittest.main()
