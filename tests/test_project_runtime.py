"""Black-box project runtime checks, using synthetic data and approval fixtures.

These checks exercise binding/version behavior, not visual similarity, natural
language understanding, Photoshop, or human acceptance of actual artwork.
"""
from __future__ import annotations

import copy
import hashlib
import json
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import unittest

import test_style_pack


ROOT = Path(__file__).resolve().parents[1]
CLI = ROOT / "scripts" / "project_runtime.py"
STYLE = CLI.with_name("style_pack.py")


class ProjectRuntimeTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix=".tmp-project-runtime-", dir=ROOT / "tests")
        self.addCleanup(self.temp.cleanup)
        self.work = Path(self.temp.name)
        self.source = self.work / "source"
        self.source.mkdir()
        (self.source / "references").mkdir()
        self.data = test_style_pack.StylePackContractTests().make_data()
        for ref in self.data["references"]:
            (self.source / ref["path"]).write_text("TEST ONLY reference bytes; not an artwork.", encoding="utf-8")
        self.data["entities"][0].update({"aliases": ["女主", "米拉"], "fixed_features": ["TEST ONLY: same facial proportions and eye color."]})
        self.data["rules"][-1]["statement"] = "TEST ONLY: preserve the hero's facial identity. Clothing changes do not unlock this rule."
        self.data["profiles"]["character"]["task_controls"] = {
            "slots": {
                "outfit": {"default": "coral jacket", "guidance": "Clothing may change; facial identity stays fixed."},
                "pose": {"default": "standing", "guidance": "Pose may change without changing body proportions."},
            },
            "exploration": {"allowed_slots": ["outfit", "pose"], "max_candidates": 4},
        }
        self.data["entities"][0]["task_controls"] = {"slots": {"outfit": {"default": "cream raincoat", "guidance": "Keep the same face; change garments only."}}}
        self.built_number = 0
        self.pack = self.build()
        self.workspace = self.work / "project"
        self.request_number = 0

    def cli(self, *args, expected=0, script=CLI, cwd=None):
        result = subprocess.run([sys.executable, str(script), *(str(arg) for arg in args)], cwd=self.work if cwd is None else cwd,
                                capture_output=True, text=True, encoding="utf-8", timeout=30)
        self.assertEqual(result.returncode, expected, result.stdout + "\n" + result.stderr)
        try:
            return json.loads(result.stdout)
        except ValueError:
            self.fail("Expected JSON stdout: " + result.stdout + "\n" + result.stderr)

    def build(self, *, release=False):
        self.built_number += 1
        (self.source / "style-pack.json").write_text(json.dumps(self.data, ensure_ascii=False), encoding="utf-8")
        pack = self.work / f"built-{self.built_number}"
        self.cli("build", self.source, "--out", pack, *( ["--release"] if release else []), script=STYLE)
        return pack

    def approve_test_fixture(self):
        self.data["status"] = "approved"
        self.data["open_questions"] = []
        for rule in self.data["rules"]:
            rule["status"] = "confirmed"
        for ref in self.data["references"]:
            ref["status"] = "approved"
        for decision in self.data["decisions"]:
            decision["status"] = "accepted"
        (self.source / "test-only-approval.md").write_text("TEST ONLY synthetic approval for automated tests; not human approval.", encoding="utf-8")
        self.data["approval"] = {"by": "TEST ONLY synthetic reviewer", "at": "2026-10-09", "evidence_path": "test-only-approval.md"}

    def init(self, *, pack=None, draft=True, expected=0):
        return self.cli("init", "--pack", pack or self.pack, "--out", self.workspace, *( ["--allow-draft"] if draft else []), expected=expected)

    def request(self, **updates):
        self.request_number += 1
        result = {"schema_version": "1.0", "task_id": f"TASK-{self.request_number}", "request": "给女主换一套雨衣，挥手。", "category": "character", "subject": "女主",
                  "mode": "exploration", "changes": {"outfit": "yellow raincoat", "pose": "waving"},
                  "exploration": {"slots": ["outfit", "pose"], "candidates": 3}, "owner": {"id": "test-designer", "kind": "internal"}}
        result.update(updates)
        return result

    def start(self, request, *, expected=0, script=CLI, workspace=None):
        path = self.work / (request["task_id"].replace("/", "_").replace("\\", "_").replace(":", "_") + "-request.json")
        path.write_text(json.dumps(request, ensure_ascii=False), encoding="utf-8")
        return self.cli("start", workspace or self.workspace, "--request", path, expected=expected, script=script)

    def read(self, relative):
        return json.loads((self.workspace / relative).read_text(encoding="utf-8"))

    def snapshots(self, root):
        return {p.relative_to(root).as_posix(): hashlib.sha256(p.read_bytes()).hexdigest() for p in root.rglob("*") if p.is_file()}

    def error(self, result, code):
        self.assertEqual(result["errors"][0]["code"], code)

    def test_frozen_runtime_init_accepts_external_relative_output_from_pack_directory(self):
        before = self.snapshots(self.pack)
        result = self.cli("init", "--pack", ".", "--out", "../project", "--allow-draft",
                          script=self.pack / "scripts" / "project_runtime.py", cwd=self.pack)
        self.assertEqual(result["workspace"], str(self.workspace))
        self.assertEqual(before, self.snapshots(self.pack))
        status = self.cli("status", self.workspace, script=self.workspace / "tools" / "project_runtime.py")
        self.assertEqual(status["current"], result["current"])
        self.assertTrue(status["candidate_workspace"])

    def test_draft_requires_explicit_opt_in_then_production_is_saved_blocked(self):
        self.error(self.init(draft=False, expected=2), "draft_requires_opt_in")
        self.assertFalse(self.workspace.exists())
        self.assertTrue(self.init()["candidate_workspace"])
        request = self.request(mode="production", exploration=None)
        result = self.start(request, expected=1)
        self.assertEqual(result["status"], "blocked")
        self.assertFalse(result["ready"])
        self.assertFalse(result["production_approved"])
        self.assertIn("draft_production", {b["code"] for b in result["blockers"]})
        self.assertTrue(Path(result["generation_brief"]).is_file())
        review = self.read(f"tasks/{request['task_id']}/review.json")
        self.assertTrue(all(check["result"] == "unknown" for check in review["checks"] + review["stages"] + review["rules"]))
        self.assertEqual(list(Path(result["work_dir"]).iterdir()), [])

    def test_alias_outfit_change_keeps_face_rules_and_reference_hashes(self):
        initial = self.init()
        request = self.request()
        result = self.start(request)
        task = self.read(f"tasks/{request['task_id']}/task.json")
        brief = self.read(f"tasks/{request['task_id']}/brief.json")
        self.assertEqual(task["entity_id"], "hero")
        self.assertEqual(task["resolved_values"], {"outfit": "yellow raincoat", "pose": "waving"})
        self.assertEqual(task["controls"]["slots"]["outfit"]["default"], "cream raincoat")
        self.assertEqual(task["baseline"], initial["current"])
        self.assertTrue(any(r["id"] == "R-IDENTITY" and r["strength"] == "must" for r in brief["rules"]))
        self.assertEqual(brief["entity"]["fixed_features"], self.data["entities"][0]["fixed_features"])
        self.assertTrue(any(r["role"] == "identity" for r in task["references"]))
        for ref in task["references"]:
            self.assertEqual(ref["sha256"], hashlib.sha256((self.workspace / ref["workspace_path"]).read_bytes()).hexdigest())
        self.assertIn("不自动丢弃旧规则", Path(result["generation_brief"]).read_text(encoding="utf-8"))
        self.assertFalse(task["production_approved"])

    def test_unchanged_slots_inherit_entity_default_and_copied_cli_runs(self):
        self.init()
        request = self.request(changes={"pose": "sitting"}, exploration={"slots": ["pose"], "candidates": 2})
        self.start(request, script=self.workspace / "tools/project_runtime.py")
        task = self.read(f"tasks/{request['task_id']}/task.json")
        self.assertEqual(task["resolved_values"]["outfit"], "cream raincoat")
        self.assertEqual(self.cli("status", self.workspace, script=self.workspace / "tools/project_runtime.py")["tasks"][0]["task_id"], request["task_id"])

    def test_undeclared_face_and_legacy_outfit_slots_are_rejected(self):
        self.init()
        self.error(self.start(self.request(changes={"face": "new face"}), expected=2), "unknown_slot")
        del self.data["profiles"]["character"]["task_controls"]
        del self.data["entities"][0]["task_controls"]
        self.data["version"] = "0.2.0"
        legacy = self.build()
        current = self.read("project.json")["current"]
        self.cli("publish", self.workspace, "--pack", legacy, "--expect-current", current["fingerprint"], "--allow-draft")
        self.error(self.start(self.request(), expected=2), "unknown_slot")
        self.assertEqual(list((self.workspace / "tasks").iterdir()), [])

    def test_exploration_scope_and_budget_are_enforced_but_budget_is_configurable(self):
        self.init()
        self.error(self.start(self.request(exploration={"slots": ["face"], "candidates": 3}), expected=2), "exploration_scope")
        self.error(self.start(self.request(exploration={"slots": ["pose"], "candidates": 5}), expected=2), "exploration_budget")
        self.data["version"] = "0.2.0"
        self.data["profiles"]["character"]["task_controls"]["exploration"]["max_candidates"] = 8
        updated = self.build()
        current = self.read("project.json")["current"]
        self.cli("publish", self.workspace, "--pack", updated, "--expect-current", current["fingerprint"], "--allow-draft")
        result = self.start(self.request(exploration={"slots": ["outfit"], "candidates": 7}))
        self.assertEqual(result["status"], "prepared_for_exploration")
        self.assertFalse(result["ready"])

    def test_invalid_alias_collision_blocks_import(self):
        other = copy.deepcopy(self.data["entities"][0])
        other["id"] = "other-hero"
        self.data["entities"].append(other)
        bad = self.build()
        self.error(self.init(pack=bad, expected=2), "ambiguous_alias")
        self.assertFalse(self.workspace.exists())

    def test_wrong_subject_category_and_missing_identity_do_not_guess(self):
        self.init()
        self.error(self.start(self.request(subject="somebody else"), expected=2), "unknown_subject")
        self.error(self.start(self.request(category="prop", subject="hero", changes={}, exploration={"slots": [], "candidates": 1}), expected=2), "unknown_subject")
        result = self.start(self.request(subject=None), expected=1)
        self.assertIn("subject_required", {b["code"] for b in result["blockers"]})

    def test_new_tasks_reload_current_while_existing_tasks_remain_frozen(self):
        initial = self.init()
        old_request = self.request()
        self.start(old_request)
        frozen_before = self.snapshots(self.workspace / "tasks" / old_request["task_id"])
        release_before = self.snapshots(self.workspace / initial["current"]["path"])
        self.data["version"] = "0.2.0"
        self.data["entities"][0]["task_controls"]["slots"]["outfit"]["default"] = "updated navy raincoat"
        updated = self.build()
        result = self.cli("publish", self.workspace, "--pack", updated, "--expect-current", initial["current"]["fingerprint"], "--allow-draft")
        new_request = self.request(changes={"pose": "jumping"})
        newer = self.start(new_request)
        self.assertEqual(newer["baseline"], result["current"])
        self.assertNotEqual(newer["baseline"], initial["current"])
        new_task = self.read(f"tasks/{new_request['task_id']}/task.json")
        self.assertEqual(new_task["resolved_values"]["outfit"], "updated navy raincoat")
        resumed = self.cli("resume", self.workspace, "--task", old_request["task_id"])
        self.assertTrue(resumed["current_has_update"])
        self.assertFalse(resumed["migrated"])
        self.assertEqual(resumed["baseline"], initial["current"])
        self.assertEqual(frozen_before, self.snapshots(self.workspace / "tasks" / old_request["task_id"]))
        self.assertEqual(release_before, self.snapshots(self.workspace / initial["current"]["path"]))

    def test_publish_current_guard_and_version_reuse_preserve_pointer(self):
        initial = self.init()
        before = (self.workspace / "project.json").read_bytes()
        self.error(self.cli("publish", self.workspace, "--pack", self.pack, "--expect-current", "0" * 64, "--allow-draft", expected=2), "current_changed")
        self.error(self.cli("publish", self.workspace, "--pack", self.pack, "--expect-current", initial["current"]["fingerprint"], "--allow-draft", expected=2), "version_reused")
        self.data["intent"]["summary"] = "Changed bytes but same version should still fail."
        reused = self.build()
        self.error(self.cli("publish", self.workspace, "--pack", reused, "--expect-current", initial["current"]["fingerprint"], "--allow-draft", expected=2), "version_reused")
        self.assertEqual(before, (self.workspace / "project.json").read_bytes())

    def test_publish_rejects_different_project(self):
        initial = self.init()
        self.data["project"]["id"] = "other-project"
        self.data["version"] = "0.2.0"
        other = self.build()
        self.error(self.cli("publish", self.workspace, "--pack", other, "--expect-current", initial["current"]["fingerprint"], "--allow-draft", expected=2), "project_mismatch")

    def test_release_inputs_allow_preparation_but_never_asset_approval(self):
        self.approve_test_fixture()
        release = self.build(release=True)
        before = self.snapshots(release)
        initial = self.init(pack=release, draft=False)
        result = self.start(self.request(mode="production", exploration=None))
        self.assertEqual(result["status"], "prepared_for_generation")
        self.assertTrue(initial["current"]["release"])
        self.assertFalse(result["production_approved"])
        self.assertFalse(result["ready"])
        self.assertEqual(before, self.snapshots(release))

    def test_approved_document_without_release_build_is_still_candidate(self):
        self.approve_test_fixture()
        candidate = self.build(release=False)
        self.error(self.init(pack=candidate, draft=False, expected=2), "draft_requires_opt_in")

    def test_candidate_cannot_replace_released_baseline(self):
        self.approve_test_fixture()
        release = self.build(release=True)
        initial = self.init(pack=release, draft=False)
        self.data["version"] = "0.2.0"
        candidate = self.build(release=False)
        self.error(self.cli("publish", self.workspace, "--pack", candidate, "--expect-current", initial["current"]["fingerprint"], "--allow-draft", expected=2), "draft_over_release")
        self.assertEqual(self.read("project.json")["current"], initial["current"])

    def test_pack_tamper_and_task_tamper_are_detected(self):
        initial = self.init()
        request = self.request()
        self.start(request)
        frozen = self.workspace / "tasks" / request["task_id"] / "generation-brief.md"
        frozen.write_text("accidental overwrite", encoding="utf-8")
        self.error(self.cli("resume", self.workspace, "--task", request["task_id"], expected=2), "task_integrity")
        canonical = self.workspace / initial["current"]["path"] / "style-pack.json"
        canonical.write_text(canonical.read_text(encoding="utf-8") + "\n", encoding="utf-8")
        self.error(self.start(self.request(), expected=2), "pack_verification")

    def test_tool_tamper_is_detected(self):
        self.init()
        (self.workspace / "tools/style_pack.py").write_text("# modified", encoding="utf-8")
        self.error(self.cli("status", self.workspace, expected=2), "tool_integrity")

    def test_no_overwrite_and_workspace_inside_pack_are_rejected(self):
        self.init()
        self.error(self.init(expected=2), "destination_exists")
        request = self.request()
        self.start(request)
        self.error(self.start(request, expected=2), "task_exists")
        self.error(self.cli("init", "--pack", self.pack, "--out", self.pack / "workspace", "--allow-draft", expected=2), "destination_inside_source")

    def test_bad_task_paths_and_unknown_request_fields_do_not_write_tasks(self):
        self.init()
        for task_id in ("../escape", "bad\\path", "CON", ".."):
            with self.subTest(task_id=task_id):
                self.error(self.start(self.request(task_id=task_id), expected=2), "unsafe_path")
        malformed = self.request()
        malformed["override_identity"] = True
        self.error(self.start(malformed, expected=2), "invalid_schema")
        self.error(self.start(self.request(category=[]), expected=2), "invalid_schema")
        self.error(self.start(self.request(exploration={"slots": ["pose"], "candidates": True}), expected=2), "invalid_schema")
        self.assertEqual(list((self.workspace / "tasks").iterdir()), [])

    def test_busy_lock_does_not_get_removed_by_competing_writer(self):
        self.init()
        lock = self.workspace / ".runtime.lock"
        lock.write_text("TEST ONLY pretend another process holds this lock", encoding="utf-8")
        self.error(self.start(self.request(), expected=2), "workspace_busy")
        self.assertTrue(lock.is_file())

    def test_workspace_move_uses_relative_release_and_frozen_paths(self):
        self.init()
        request = self.request()
        self.start(request)
        moved = self.work / "moved-project"
        shutil.move(str(self.workspace), moved)
        result = self.cli("resume", moved, "--task", request["task_id"], script=moved / "tools/project_runtime.py")
        self.assertEqual(result["baseline"]["path"], "releases/0.1.0")
        self.assertTrue(Path(result["work_dir"]).is_dir())
        self.assertEqual(self.cli("status", moved, script=moved / "tools/project_runtime.py")["workspace"], str(moved))

    def test_layout_components_bind_product_identity_and_typography_same_baseline(self):
        self.data["project"]["domain"] = "ecommerce"
        for category in ("product", "layout", "typography"):
            self.data["scope"]["asset_types"].append(category)
            self.data["profiles"][category] = {"brief": "TEST ONLY " + category, "fixed": ["TEST ONLY preserve category requirements."], "variable": [], "technical": {"export": "unknown"}}
            self.data["rules"].append({"id": "R-" + category.upper(), "scope": [category], "strength": "must", "statement": "TEST ONLY " + category + " requirements.", "rationale": "Synthetic component binding check.", "allowed_variation": [], "evidence": ["REF-STYLE"], "verification": "visual", "status": "proposed"})
        self.data["references"].append({"id": "REF-PRODUCT", "path": "references/product.txt", "role": "identity", "applies_to": ["product"], "notes": "TEST ONLY product reference.", "status": "candidate", "provenance": "Synthetic fixture."})
        (self.source / "references/product.txt").write_text("TEST ONLY product shape", encoding="utf-8")
        self.data["rules"].append({"id": "R-PRODUCT-IDENTITY", "scope": ["product"], "strength": "must", "statement": "TEST ONLY keep product geometry and label intact.", "rationale": "Synthetic identity binding check.", "allowed_variation": [], "evidence": ["REF-PRODUCT"], "verification": "visual", "status": "proposed"})
        self.data["entities"].append({"id": "bottle", "kind": "product", "aliases": ["商品"], "identity_rules": ["R-PRODUCT-IDENTITY"], "reference_ids": ["REF-PRODUCT"], "fixed_features": ["TEST ONLY product label."], "variations": []})
        campaign = self.build()
        initial = self.init(pack=campaign)
        request = self.request(category="layout", subject=None, changes={}, exploration={"slots": [], "candidates": 1}, components=[{"category": "product", "subject": "商品"}, {"category": "typography", "subject": None}])
        self.start(request)
        brief = self.read(f"tasks/{request['task_id']}/brief.json")
        task = self.read(f"tasks/{request['task_id']}/task.json")
        ids = [r["id"] for r in brief["rules"]]
        self.assertIn("R-PRODUCT-IDENTITY", ids)
        self.assertIn("R-TYPOGRAPHY", ids)
        self.assertEqual(ids.count("R-GLOBAL"), 1)
        self.assertTrue(any(r["id"] == "REF-PRODUCT" for r in task["references"]))
        self.assertTrue(all(b["pack"]["fingerprint"] == initial["current"]["fingerprint"] for b in brief["component_briefs"]))
        self.assertEqual(task["components"][0]["entity_id"], "bottle")
        self.assertFalse(task["production_approved"])


if __name__ == "__main__":
    unittest.main()
