"""Black-box contract tests for the style-pack CLI.

Every approval and visual in this module is a synthetic, test-only fixture.
Passing these tests is NOT evidence of human art-direction acceptance.
Run: python -m unittest discover -s tests -v
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
import zipfile


ROOT = Path(__file__).resolve().parents[1]
CLI = ROOT / "scripts" / "style_pack.py"
CATEGORIES = ["character", "environment", "prop", "ui"]


class StylePackContractTests(unittest.TestCase):
    def setUp(self):
        # Keep all fixture writes in the writable checkout. Some Windows agent
        # sandboxes expose a system TEMP that permits mkdir but not child writes.
        self.temp = tempfile.TemporaryDirectory(prefix=".tmp-style-pack-", dir=ROOT / "tests")
        self.addCleanup(self.temp.cleanup)
        self.work = Path(self.temp.name)
        self.pack = self.work / "source"
        self.pack.mkdir()
        (self.pack / "references").mkdir()
        self.reference_svg = (
            '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64">'
            '<title>TEST ONLY: synthetic fixture, no director approval</title>'
            '<rect width="64" height="64" fill="#336655"/></svg>'
        )
        for name in ("style.svg", "context.svg", "identity.svg"):
            (self.pack / "references" / name).write_text(
                self.reference_svg, encoding="utf-8"
            )
        self.data = self.make_data()
        self.write()

    def make_data(self):
        rules = []
        for rule_id, scope in (
            ("R-GLOBAL", "global"),
            ("R-CHARACTER", "character"),
            ("R-ENVIRONMENT", "environment"),
            ("R-PROP", "prop"),
            ("R-UI", "ui"),
            ("R-IDENTITY", "character"),
        ):
            rules.append({
                "id": rule_id,
                "scope": [scope],
                "strength": "must",
                "statement": "TEST ONLY: retain the selected fixture constraint.",
                "rationale": "Exercise routing without claiming art quality.",
                "allowed_variation": ["Pose may change."],
                "evidence": ["REF-IDENTITY" if rule_id == "R-IDENTITY" else "REF-STYLE"],
                "verification": "visual",
                "status": "proposed",
            })
        return {
            "schema_version": "1.0",
            "project": {
                "id": "synthetic-test-only",
                "name": "TEST ONLY synthetic fixture",
                "domain": "game-art",
                "owner": "TEST ONLY; no real director",
            },
            "version": "0.1.0",
            "status": "draft",
            "scope": {
                "medium": "2d",
                "view": "three-quarter",
                "target_platform": "desktop",
                "asset_types": CATEGORIES.copy(),
            },
            "intent": {
                "summary": "Synthetic schema and workflow fixture, not a style sample.",
                "pillars": ["Preserve test constraints."],
                "avoid": ["Claiming human approval."],
            },
            "tokens": {
                "colors": {"leaf": "#336655"},
                "fonts": {"body": {"family": "Arial", "fallback": ["sans-serif"]}},
            },
            "rules": rules,
            "references": [
                {
                    "id": "REF-STYLE", "path": "references/style.svg", "role": "style",
                    "applies_to": ["global"], "notes": "TEST ONLY style fixture.",
                    "status": "candidate", "provenance": "Synthetic test fixture authored locally.",
                },
                {
                    "id": "REF-CONTEXT", "path": "references/context.svg", "role": "context",
                    "applies_to": CATEGORIES.copy(), "notes": "TEST ONLY context fixture.",
                    "status": "candidate", "provenance": "Synthetic test fixture authored locally.",
                },
                {
                    "id": "REF-IDENTITY", "path": "references/identity.svg", "role": "identity",
                    "applies_to": ["character"], "notes": "TEST ONLY identity fixture.",
                    "status": "candidate", "provenance": "Synthetic test fixture authored locally.",
                },
            ],
            "profiles": {
                category: {
                    "brief": "TEST ONLY " + category,
                    "fixed": ["Keep the fixture color."],
                    "variable": ["Position."],
                    "technical": {"width": 64, "height": 64},
                }
                for category in CATEGORIES
            },
            "entities": [{
                "id": "hero", "kind": "character", "identity_rules": ["R-IDENTITY"],
                "reference_ids": ["REF-IDENTITY"], "fixed_features": ["One square brooch."],
                "variations": ["Pose."],
            }],
            "recipes": [{
                "id": "recipe-test-only", "tool": "synthetic", "model": "none",
                "capabilities": ["reference-image"], "instructions": "TEST ONLY; do not generate.",
                "reference_ids": ["REF-STYLE"], "limitations": ["No actual generator was tested."],
                "status": "untested",
            }],
            "decisions": [{
                "id": "decision-test-only", "decision": "Use this only for tests.",
                "rationale": "Separate fixture claims from product evidence.",
                "status": "proposed", "source": "Synthetic automated fixture.",
            }],
            "open_questions": ["TEST ONLY: a real director has not approved this fixture."],
            "approval": None,
        }

    def write(self):
        (self.pack / "style-pack.json").write_text(
            json.dumps(self.data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
        )

    def approve_test_fixture(self):
        """Create simulated acceptance solely in this test's temporary directory."""
        self.data["status"] = "approved"
        self.data["open_questions"] = []
        for rule in self.data["rules"]:
            rule["status"] = "confirmed"
        for reference in self.data["references"]:
            reference["status"] = "approved"
        for decision in self.data["decisions"]:
            decision["status"] = "accepted"
        (self.pack / "test-only-approval.md").write_text(
            "# TEST ONLY synthetic approval\n"
            "This document simulates evidence for automated tests. "
            "It is not real human approval and must not ship as project acceptance.\n",
            encoding="utf-8",
        )
        self.data["approval"] = {
            "by": "TEST ONLY simulated reviewer; no real approval",
            "at": "2026-10-09T12:00:00+08:00",
            "evidence_path": "test-only-approval.md",
        }
        self.write()

    def cli(self, *args, ok=True):
        proc = subprocess.run(
            [sys.executable, str(CLI), *(str(arg) for arg in args)],
            cwd=self.work,
            capture_output=True,
            text=True,
            encoding="utf-8",
            timeout=20,
        )
        if ok:
            self.assertEqual(proc.returncode, 0, proc.stdout + "\n" + proc.stderr)
        else:
            self.assertNotEqual(proc.returncode, 0, proc.stdout + "\n" + proc.stderr)
        return proc

    def json_cli(self, *args, ok=True):
        proc = self.cli(*args, ok=ok)
        try:
            return json.loads(proc.stdout)
        except ValueError:
            self.fail("Expected JSON stdout: " + proc.stdout + "\n" + proc.stderr)

    def snapshot(self, directory=None):
        directory = directory or self.pack
        return {
            p.relative_to(directory).as_posix(): hashlib.sha256(p.read_bytes()).hexdigest()
            for p in directory.rglob("*") if p.is_file()
        }

    def test_draft_is_structurally_valid_but_not_releasable(self):
        report = self.json_cli("validate", self.pack)
        self.assertTrue(report["ok"])
        self.assertTrue(report["warnings"])
        release = self.json_cli("validate", self.pack, "--release", ok=False)
        self.assertFalse(release["ok"])
        self.assertTrue(release["errors"])

    def test_shipped_template_and_example_remain_honest_drafts(self):
        paths = (
            ROOT / "templates" / "style-pack.template.json",
            ROOT / "examples" / "moss-harbor-draft" / "style-pack.json",
        )
        for path in paths:
            with self.subTest(path=path):
                fixture = self.work / path.parent.name
                fixture.mkdir()
                shutil.copyfile(path, fixture / "style-pack.json")
                self.assertTrue(self.json_cli("validate", fixture)["ok"])
                self.assertFalse(self.json_cli("validate", fixture, "--release", ok=False)["ok"])

    def test_synthetic_release_fixture_satisfies_structural_release_contract(self):
        self.approve_test_fixture()
        self.assertTrue(self.json_cli("validate", self.pack, "--release")["ok"])

    def test_missing_required_field_fails(self):
        del self.data["profiles"]
        self.write()
        self.json_cli("validate", self.pack, ok=False)

    def test_unknown_cross_references_fail(self):
        original = copy.deepcopy(self.data)
        cases = [
            ("rules", "evidence"), ("entities", "identity_rules"),
            ("entities", "reference_ids"), ("recipes", "reference_ids"),
        ]
        for collection, field in cases:
            with self.subTest(collection=collection, field=field):
                self.data = copy.deepcopy(original)
                self.data[collection][0][field] = ["DOES-NOT-EXIST"]
                self.write()
                self.json_cli("validate", self.pack, ok=False)

    def test_duplicate_ids_fail(self):
        original = copy.deepcopy(self.data)
        for collection in ("rules", "references", "entities", "recipes", "decisions"):
            with self.subTest(collection=collection):
                self.data = copy.deepcopy(original)
                self.data[collection].append(copy.deepcopy(self.data[collection][0]))
                self.write()
                self.json_cli("validate", self.pack, ok=False)

    def test_unsupported_asset_category_fails(self):
        self.data["scope"]["asset_types"].append("unimplemented-video")
        self.data["profiles"]["unimplemented-video"] = copy.deepcopy(self.data["profiles"]["ui"])
        self.write()
        self.json_cli("validate", self.pack, ok=False)

    def test_profile_missing_for_declared_category_fails(self):
        del self.data["profiles"]["prop"]
        self.write()
        self.json_cli("validate", self.pack, ok=False)

    def test_entity_rule_must_apply_to_entity_category(self):
        self.data["entities"][0]["identity_rules"] = ["R-ENVIRONMENT"]
        self.write()
        self.json_cli("validate", self.pack, ok=False)

    def test_confirmed_evidence_cannot_reference_missing_asset(self):
        self.approve_test_fixture()
        (self.pack / "references" / "style.svg").unlink()
        self.json_cli("validate", self.pack, "--release", ok=False)

    def test_release_requires_identity_reference_for_named_entity(self):
        self.approve_test_fixture()
        self.data["references"][2]["role"] = "composition"
        self.write()
        self.json_cli("validate", self.pack, "--release", ok=False)

    def test_release_requires_approved_context_for_every_category(self):
        self.approve_test_fixture()
        self.data["references"][1]["applies_to"] = ["character"]
        self.write()
        self.json_cli("validate", self.pack, "--release", ok=False)

    def test_release_requires_approval_evidence_and_cleared_questions(self):
        self.approve_test_fixture()
        (self.pack / "test-only-approval.md").unlink()
        self.json_cli("validate", self.pack, "--release", ok=False)
        self.approve_test_fixture()
        self.data["open_questions"] = ["Unresolved director decision."]
        self.write()
        self.json_cli("validate", self.pack, "--release", ok=False)

    def test_reference_parent_traversal_and_absolute_paths_fail(self):
        outside = self.work / "outside.svg"
        outside.write_text(self.reference_svg, encoding="utf-8")
        for unsafe in ("../outside.svg", str(outside.resolve()), "references\\style.svg"):
            with self.subTest(path=unsafe):
                self.data["references"][0]["path"] = unsafe
                self.write()
                self.json_cli("validate", self.pack, ok=False)

    def test_references_cannot_collide_with_generated_files_case_insensitively(self):
        for reserved in ("STYLE.md", "Style-Pack.json", "Agents/info.txt"):
            with self.subTest(path=reserved):
                target = self.pack / reserved
                if target != self.pack / "style-pack.json":
                    target.parent.mkdir(parents=True, exist_ok=True)
                    target.write_text(self.reference_svg, encoding="utf-8")
                self.data["references"][0]["path"] = reserved
                self.write()
                before = self.snapshot()
                self.json_cli("validate", self.pack, ok=False)
                self.cli("build", self.pack, "--out", self.work / "reserved-output", ok=False)
                self.assertEqual(before, self.snapshot())
                self.assertFalse((self.work / "reserved-output").exists())

    def test_symlink_reference_escape_fails_when_supported(self):
        outside = self.work / "outside.svg"
        outside.write_text(self.reference_svg, encoding="utf-8")
        link = self.pack / "references" / "escape.svg"
        try:
            link.symlink_to(outside)
        except (OSError, NotImplementedError) as exc:
            self.skipTest("Host does not permit creating symlinks: " + str(exc))
        self.data["references"][0]["path"] = "references/escape.svg"
        self.write()
        self.json_cli("validate", self.pack, ok=False)

    def test_validate_and_brief_do_not_mutate_input(self):
        before = self.snapshot()
        self.cli("validate", self.pack)
        self.cli("brief", self.pack, "--category", "character", "--task", "Test pose.", "--entity", "hero")
        self.assertEqual(before, self.snapshot())

    def test_brief_filters_category_and_preserves_global_and_identity(self):
        result = self.json_cli(
            "brief", self.pack, "--category", "character", "--task", "Test pose.", "--entity", "hero"
        )
        ids = {rule["id"] for rule in result["rules"]}
        self.assertTrue({"R-GLOBAL", "R-CHARACTER", "R-IDENTITY"}.issubset(ids))
        self.assertTrue({"R-PROP", "R-UI", "R-ENVIRONMENT"}.isdisjoint(ids))
        self.assertEqual(result["entity"]["id"], "hero")
        self.assertEqual(result["entity"]["fixed_features"], ["One square brooch."])
        self.assertIn("REF-IDENTITY", {ref["id"] for ref in result["references"]})
        self.assertEqual(result["pack"]["status"], "draft")
        self.assertTrue(result["unresolved"])

    def test_brief_rejects_wrong_or_unknown_entity_and_category(self):
        for category, entity in (("prop", "hero"), ("character", "missing"), ("video", "hero")):
            with self.subTest(category=category, entity=entity):
                self.cli("brief", self.pack, "--category", category, "--task", "Test.", "--entity", entity, ok=False)

    def test_tile_and_motion_select_their_own_profiles_rules_and_references(self):
        for category in ("tile", "motion"):
            self.data["scope"]["asset_types"].append(category)
            self.data["profiles"][category] = {
                "brief": "TEST ONLY " + category,
                "fixed": ["Keep the fixture color."], "variable": ["Position."],
                "technical": {"fixture_category": category},
            }
            rule = copy.deepcopy(self.data["rules"][0])
            rule.update(id="R-" + category.upper(), scope=[category], evidence=["REF-" + category.upper()])
            self.data["rules"].append(rule)
            reference = copy.deepcopy(self.data["references"][0])
            reference.update(id="REF-" + category.upper(), applies_to=[category], path="references/" + category + ".svg")
            self.data["references"].append(reference)
            (self.pack / reference["path"]).write_text(self.reference_svg, encoding="utf-8")
        self.write()
        before = self.snapshot()
        for category in ("tile", "motion"):
            with self.subTest(category=category):
                brief = self.json_cli("brief", self.pack, "--category", category, "--task", "TEST ONLY scoped request.")
                self.assertEqual(brief["profile"], self.data["profiles"][category])
                self.assertEqual({rule["id"] for rule in brief["rules"]}, {"R-GLOBAL", "R-" + category.upper()})
                self.assertEqual({ref["id"] for ref in brief["references"]}, {"REF-STYLE", "REF-" + category.upper()})
                self.assertTrue(all(review["result"] == "unknown" for review in brief["review"]))
        self.assertEqual(before, self.snapshot())
        built = self.work / "six-categories"
        self.cli("build", self.pack, "--out", built)
        self.assertTrue(self.json_cli("verify", built)["ok"])

    def test_legacy_pack_keeps_four_categories_and_rejects_undeclared_new_ones(self):
        built = self.work / "legacy-four-categories"
        self.cli("build", self.pack, "--out", built)
        canonical = json.loads((built / "style-pack.json").read_text(encoding="utf-8"))
        self.assertEqual(canonical, self.data)
        self.assertEqual(set(canonical["profiles"]), set(CATEGORIES))
        for category in ("tile", "motion"):
            result = self.json_cli("brief", built, "--category", category, "--task", "TEST ONLY.", ok=False)
            self.assertEqual(result["errors"][0]["code"], "unknown_category")

    def test_new_categories_require_profiles_and_release_context(self):
        self.approve_test_fixture()
        for category in ("tile", "motion"):
            self.data["scope"]["asset_types"].append(category)
            self.write()
            invalid = self.json_cli("validate", self.pack, ok=False)
            self.assertIn("missing_profile", {error["code"] for error in invalid["errors"]})
            self.data["profiles"][category] = copy.deepcopy(self.data["profiles"]["prop"])
            self.write()
            self.assertFalse(self.json_cli("validate", self.pack, "--release", ok=False)["ok"])
            self.data["references"][1]["applies_to"].append(category)
            self.write()
            self.assertTrue(self.json_cli("validate", self.pack, "--release")["ok"])

    def test_brief_does_not_mix_identities_of_two_characters(self):
        other_rule = copy.deepcopy(self.data["rules"][-1])
        other_rule["id"] = "R-OTHER-IDENTITY"
        other_rule["evidence"] = ["REF-OTHER-IDENTITY"]
        self.data["rules"].append(other_rule)
        other_ref = copy.deepcopy(self.data["references"][-1])
        other_ref["id"] = "REF-OTHER-IDENTITY"
        other_ref["path"] = "references/other-identity.svg"
        self.data["references"].append(other_ref)
        (self.pack / other_ref["path"]).write_text(self.reference_svg, encoding="utf-8")
        self.data["entities"].append({
            "id": "other-hero", "kind": "character", "identity_rules": ["R-OTHER-IDENTITY"],
            "reference_ids": ["REF-OTHER-IDENTITY"], "fixed_features": ["One round pin."],
            "variations": ["Pose."],
        })
        self.write()
        args = ("brief", self.pack, "--category", "character", "--task", "Test pose.")
        with_entity = self.json_cli(*args, "--entity", "hero")
        rule_ids = {rule["id"] for rule in with_entity["rules"]}
        ref_ids = {ref["id"] for ref in with_entity["references"]}
        self.assertIn("R-IDENTITY", rule_ids)
        self.assertNotIn("R-OTHER-IDENTITY", rule_ids)
        self.assertIn("REF-IDENTITY", ref_ids)
        self.assertNotIn("REF-OTHER-IDENTITY", ref_ids)
        without_entity = self.json_cli(*args)
        self.assertFalse(
            {"R-IDENTITY", "R-OTHER-IDENTITY"}.intersection(rule["id"] for rule in without_entity["rules"])
        )
        self.assertFalse(any(ref["role"] == "identity" for ref in without_entity["references"]))

    def test_reference_byte_change_changes_brief_fingerprint(self):
        args = ("brief", self.pack, "--category", "prop", "--task", "Test tool.")
        first = self.json_cli(*args)
        path = self.pack / "references" / "style.svg"
        path.write_text(self.reference_svg.replace("#336655", "#224433"), encoding="utf-8")
        second = self.json_cli(*args)
        self.assertNotEqual(first["pack"]["fingerprint"], second["pack"]["fingerprint"])

    def test_brief_reference_roles_keep_review_evidence_out_of_production(self):
        for ref_id, role, categories in (
            ("REF-ENV-EVIDENCE", "material", ["environment"]),
            ("REF-NEGATIVE", "counterexample", ["global"]),
        ):
            reference = copy.deepcopy(self.data["references"][0])
            reference.update({
                "id": ref_id, "role": role, "applies_to": categories,
                "path": "references/" + ref_id.lower() + ".svg",
                "status": "approved", "notes": "TEST ONLY simulated reference decision.",
            })
            (self.pack / reference["path"]).write_text(self.reference_svg, encoding="utf-8")
            self.data["references"].append(reference)
            self.data["rules"][0]["evidence"].append(ref_id)
        self.write()
        result = self.json_cli("brief", self.pack, "--category", "prop", "--task", "Test tool.")
        usages = {ref["id"]: ref["usage"] for ref in result["references"]}
        self.assertEqual(usages["REF-ENV-EVIDENCE"], "review_evidence_only")
        self.assertEqual(usages["REF-NEGATIVE"], "negative_review_only")
        self.assertEqual(usages["REF-STYLE"], "candidate_exploration_only")

    def test_build_refuses_existing_target_without_overwriting(self):
        target = self.work / "existing"
        target.mkdir()
        sentinel = target / "sentinel.txt"
        sentinel.write_text("preserve this", encoding="utf-8")
        self.cli("build", self.pack, "--out", target, ok=False)
        self.assertEqual(sentinel.read_text(encoding="utf-8"), "preserve this")
        self.assertEqual(list(target.iterdir()), [sentinel])

    def test_build_refuses_output_inside_source(self):
        before = self.snapshot()
        self.cli("build", self.pack, "--out", self.pack / "nested-build", ok=False)
        self.assertEqual(before, self.snapshot())
        self.assertFalse((self.pack / "nested-build").exists())

    def test_build_is_relocatable_and_does_not_mutate_source(self):
        before = self.snapshot()
        built = self.work / "built"
        self.cli("build", self.pack, "--out", built)
        self.assertEqual(before, self.snapshot())
        relocated = self.work / "moved" / "pack"
        relocated.parent.mkdir()
        shutil.move(str(built), str(relocated))
        self.assertTrue(self.json_cli("verify", relocated)["ok"])
        self.assertTrue(self.json_cli("validate", relocated)["ok"])
        self.assertTrue((relocated / "SKILL.md").is_file())
        self.assertTrue((relocated / "STYLE.md").is_file())
        brief = self.json_cli("brief", relocated, "--category", "prop", "--task", "Test tool.")
        self.assertEqual(brief["category"], "prop")
        for reference in brief["references"]:
            self.assertFalse(Path(reference["path"]).is_absolute())
            self.assertTrue((relocated / reference["path"]).is_file())

    def test_release_build_is_verifiable_and_keeps_test_only_evidence(self):
        self.approve_test_fixture()
        built = self.work / "release-test-only"
        self.cli("build", self.pack, "--out", built, "--release")
        self.assertTrue(self.json_cli("verify", built)["ok"])
        self.assertTrue(self.json_cli("validate", built, "--release")["ok"])
        self.assertIn("TEST ONLY", (built / "test-only-approval.md").read_text(encoding="utf-8"))

    def test_manifest_detects_changed_missing_and_added_files(self):
        for mutation in ("change", "remove", "add"):
            with self.subTest(mutation=mutation):
                built = self.work / ("built-" + mutation)
                self.cli("build", self.pack, "--out", built)
                target = built / "references" / "style.svg"
                if mutation == "change":
                    target.write_text("changed", encoding="utf-8")
                elif mutation == "remove":
                    target.unlink()
                else:
                    (built / "unexpected.txt").write_text("unexpected", encoding="utf-8")
                self.assertFalse(self.json_cli("verify", built, ok=False)["ok"])

    def test_brief_file_refuses_overwrite_and_source_target(self):
        target = self.work / "existing-brief.json"
        target.write_text("preserve", encoding="utf-8")
        args = ("brief", self.pack, "--category", "prop", "--task", "Test tool.")
        self.cli(*args, "--out", target, ok=False)
        self.assertEqual(target.read_text(encoding="utf-8"), "preserve")
        before = self.snapshot()
        self.cli(*args, "--out", self.pack / "style-pack.json", ok=False)
        self.assertEqual(before, self.snapshot())

    def test_diff_reports_change_without_mutating_either_pack(self):
        other = self.work / "other"
        shutil.copytree(self.pack, other)
        changed = copy.deepcopy(self.data)
        changed["version"] = "0.2.0"
        changed["tokens"]["colors"]["leaf"] = "#224433"
        (other / "style-pack.json").write_text(json.dumps(changed), encoding="utf-8")
        before, other_before = self.snapshot(), self.snapshot(other)
        result = self.json_cli("diff", self.pack, other)
        self.assertTrue(result)
        serialized = json.dumps(result)
        self.assertIn("0.2.0", serialized)
        self.assertIn("leaf", serialized)
        self.assertEqual(before, self.snapshot())
        self.assertEqual(other_before, self.snapshot(other))

    def test_non_game_campaign_categories_keep_scoped_rules_and_entity_identity(self):
        self.data["project"]["domain"] = "ecommerce"
        self.data["scope"]["asset_types"].extend(["product", "graphic", "typography", "layout"])
        for category in ("product", "graphic", "typography", "layout"):
            self.data["profiles"][category] = {"brief": "Test campaign category", "fixed": [], "variable": [], "technical": {}}
        product_rule = copy.deepcopy(self.data["rules"][0])
        product_rule.update(id="R-PRODUCT", scope=["product"], statement="Keep the test bottle packaging.")
        self.data["rules"].append(product_rule)
        self.data["entities"].append({"id":"bottle", "kind":"product", "identity_rules":["R-PRODUCT"], "reference_ids":[], "fixed_features":["Original packaging"], "variations":["placement"]})
        self.write()
        self.assertTrue(self.json_cli("validate", self.pack)["ok"])
        product = self.json_cli("brief", self.pack, "--category", "product", "--entity", "bottle", "--task", "Test campaign.")
        self.assertIn("R-PRODUCT", {r["id"] for r in product["rules"]})
        layout = self.json_cli("brief", self.pack, "--category", "layout", "--task", "Test layout.")
        self.assertNotIn("R-PRODUCT", {r["id"] for r in layout["rules"]})
        self.assertTrue(any(r["scope"] == ["global"] for r in layout["rules"]))

    def test_domain_is_a_required_nonempty_business_context(self):
        for bad in (None, 17, ""):
            with self.subTest(value=bad):
                self.data["project"]["domain"] = bad
                self.write()
                result = self.json_cli("validate", self.pack, ok=False)
                self.assertTrue(any(e["path"] == "$.project.domain" for e in result["errors"]))

    def test_archive_contains_only_relocatable_pack_and_refuses_overwrite(self):
        built = self.work / "built"
        self.cli("build", self.pack, "--out", built)
        archive = self.work / "style-pack.zip"
        self.cli("archive", built, "--out", archive)
        original_bytes = archive.read_bytes()
        with zipfile.ZipFile(archive) as zipped:
            names = zipped.namelist()
            self.assertTrue(names)
            self.assertTrue(all(not Path(name).is_absolute() and ".." not in Path(name).parts for name in names))
            self.assertTrue(any(name.endswith("SKILL.md") for name in names))
            self.assertTrue(any(name.endswith("style-pack.json") for name in names))
        self.cli("archive", built, "--out", archive, ok=False)
        self.assertEqual(original_bytes, archive.read_bytes())
        before = self.snapshot(built)
        self.cli("archive", built, "--out", built / "inside.zip", ok=False)
        self.assertEqual(before, self.snapshot(built))


if __name__ == "__main__":
    unittest.main()
