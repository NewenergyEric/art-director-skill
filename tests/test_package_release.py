"""Packaging CLI regressions using isolated, synthetic Skill trees."""
from __future__ import annotations

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
CLI = ROOT / "scripts" / "package_release.py"


class PackageReleaseTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix=".tmp-style-pack-release-", dir=ROOT / "tests")
        self.addCleanup(self.temp.cleanup)
        self.work = Path(self.temp.name)
        self.source = self.work / "repository"
        self.companion = self.source / "skills" / "game-art-production"
        for relative in (
            "SKILL.md", "LICENSE", "scripts/style_pack.py", "scripts/project_runtime.py",
            "scripts/team_batch.py", "scripts/pilot.py", "templates/style-pack.template.json",
            "agents/openai.yaml", "references/test-only.md", "skills/game-art-production/SKILL.md",
            "skills/game-art-production/scripts/production.py", "skills/game-art-production/agents/openai.yaml",
        ):
            path = self.source / relative
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text("TEST ONLY synthetic packaging fixture: " + relative + "\n", encoding="utf-8")
        self.script = self.source / "scripts" / "package_release.py"
        shutil.copyfile(CLI, self.script)

    def cli(self, *args, expected=0, cwd=None):
        result = subprocess.run([sys.executable, str(self.script), *map(str, args)],
                                cwd=self.source if cwd is None else cwd,
                                capture_output=True, text=True, encoding="utf-8", timeout=20)
        self.assertEqual(result.returncode, expected, result.stdout + "\n" + result.stderr)
        return result

    def snapshot(self):
        return {path.relative_to(self.source).as_posix(): hashlib.sha256(path.read_bytes()).hexdigest()
                for path in self.source.rglob("*") if path.is_file()}

    def assert_external_archive(self, skill, relative, cwd):
        target = self.work / "dist" / (skill + ".zip")
        before = self.snapshot()
        result = json.loads(self.cli("--skill", skill, "--out", relative, cwd=cwd).stdout)
        self.assertEqual(result["archive"], str(target))
        self.assertEqual(result["sha256"], hashlib.sha256(target.read_bytes()).hexdigest())
        with zipfile.ZipFile(target) as archive:
            names = archive.namelist()
            self.assertEqual(result["files"], len(names))
            self.assertIn(skill + "/SKILL.md", names)
            self.assertIn(skill + "/LICENSE", names)
            self.assertTrue(all(name.startswith(skill + "/") and ".." not in Path(name).parts for name in names))
            self.assertIsNone(archive.testzip())
        self.assertEqual(before, self.snapshot())

    def test_mother_archive_accepts_external_relative_output(self):
        self.assert_external_archive("art-director", "../dist/art-director.zip", self.source)

    def test_companion_archive_accepts_external_relative_output(self):
        self.assert_external_archive("game-art-production", "../../../dist/game-art-production.zip", self.companion)

    def test_archives_keep_teaching_examples_but_exclude_development_byproducts(self):
        unwanted = (
            "tests/run.json", "evals/report.json", "planning/notes.md", "output/proof.png",
            "references/__pycache__/reader.pyc", "references/.tmp-review/record.json",
            "references/trace.log", "references/preview.tmp", "templates/form.bak",
            "references/.DS_Store", "references/Thumbs.db",
        )
        teaching = "references/learning-cases/assets/before.png"
        for skill, source in (("art-director", self.source), ("game-art-production", self.companion)):
            with self.subTest(skill=skill):
                for relative in (*unwanted, teaching):
                    path = source / relative
                    path.parent.mkdir(parents=True, exist_ok=True)
                    path.write_bytes(b"TEST ONLY synthetic packaging content")
                before = self.snapshot()
                target = self.work / (skill + "-curated.zip")
                self.cli("--skill", skill, "--out", target)
                with zipfile.ZipFile(target) as archive:
                    names = set(archive.namelist())
                    self.assertIn(skill + "/" + teaching, names)
                    self.assertTrue(all(skill + "/" + relative not in names for relative in unwanted))
                self.assertEqual(before, self.snapshot())

    def test_archive_rejects_destination_inside_selected_skill(self):
        before = self.snapshot()
        for skill, source in (("art-director", self.source), ("game-art-production", self.companion)):
            with self.subTest(skill=skill):
                target = source / "inside.zip"
                result = self.cli("--skill", skill, "--out", target, expected=2)
                self.assertIn("Archive must be outside the source skill folder", result.stderr)
                self.assertFalse(target.exists())
                self.assertEqual(before, self.snapshot())

    def test_archive_refuses_existing_output_without_overwriting(self):
        target = self.work / "existing.zip"
        target.write_bytes(b"TEST ONLY preserve existing output")
        for skill in ("art-director", "game-art-production"):
            with self.subTest(skill=skill):
                result = self.cli("--skill", skill, "--out", target, expected=2)
                self.assertIn("Destination already exists", result.stderr)
                self.assertEqual(target.read_bytes(), b"TEST ONLY preserve existing output")

    def symlink(self, link, target, *, directory=False):
        try:
            link.symlink_to(target, target_is_directory=directory)
        except (OSError, NotImplementedError) as exc:
            self.skipTest("Host does not permit creating symlinks: " + str(exc))

    def test_symlinked_source_file_is_rejected_when_supported(self):
        outside = self.work / "outside.md"
        outside.write_text("TEST ONLY outside reference", encoding="utf-8")
        self.symlink(self.source / "references" / "linked.md", outside)
        target = self.work / "linked-source.zip"
        result = self.cli("--out", target, expected=2)
        self.assertIn("Symlinks are not packaged", result.stderr)
        self.assertFalse(target.exists())

    def test_output_symlink_into_source_is_rejected_when_supported(self):
        link = self.work / "source-alias"
        self.symlink(link, self.source, directory=True)
        target = link / "inside.zip"
        result = self.cli("--out", target, expected=2)
        self.assertIn("Archive must be outside the source skill folder", result.stderr)
        self.assertFalse(target.exists())

    @unittest.skipIf(sys.platform == "win32", "POSIX resolves symlinks before parent traversal; Windows normalizes traversal first.")
    def test_output_parent_traversal_preserves_posix_symlink_semantics(self):
        child = self.source / "child"
        child.mkdir()
        self.symlink(self.work / "source-alias", child, directory=True)
        result = self.cli("--out", "../source-alias/../inside.zip", expected=2)
        self.assertIn("Archive must be outside the source skill folder", result.stderr)
        self.assertFalse((self.source / "inside.zip").exists())
        self.assertFalse((self.work / "inside.zip").exists())


if __name__ == "__main__":
    unittest.main()
