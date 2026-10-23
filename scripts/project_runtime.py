#!/usr/bin/env python3
"""Project entry and frozen task inputs. Python 3.10+, standard library only.

An Agent translates a member's sentence into a request; this CLI does not parse
arbitrary natural language, generate images, run Photoshop, or approve artwork.
"""
from __future__ import annotations

import argparse
from contextlib import contextmanager
import copy
from datetime import datetime, timezone
import json
import os
from pathlib import Path
import re
import shutil
import sys
import tempfile

sys.dont_write_bytecode = True
import style_pack as sp


SCHEMA = "1.0"
TASK_ID = re.compile(r"^[A-Za-z0-9][A-Za-z0-9_-]{0,79}$")
SLOT_ID = re.compile(r"^[a-z][a-z0-9_]{0,63}$")
MAX_CANDIDATES = 1000  # Technical allocation guard, not a creative ceiling.
TASK_FILES = {"task.json", "request.json", "brief.json", "generation-brief.md", "handoff.md", "review.json"}
TOOL_FILES = {"project_runtime.py", "style_pack.py"}
TEAM_TOOL_FILES = TOOL_FILES | {"team_batch.py"}
STAGES = [
    ("concept", "创意候选与主美选择"),
    ("single_asset", "按冻结参考单独生成资产"),
    ("photoshop", "PS 调整尺寸、透明边缘与可编辑源文件"),
    ("integration", "实际投放版面、界面或游戏场景中的集成检查"),
    ("delivery", "最终导出、来源与交付复核"),
]


def now():
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def fail(message, code="invalid_runtime"):
    raise sp.PackError(message, code)


def exact(value, fields, label, optional=()):
    if not isinstance(value, dict):
        fail(f"{label} must be an object.", "invalid_schema")
    missing, extra = set(fields) - value.keys(), value.keys() - set(fields) - set(optional)
    if missing or extra:
        fail(f"{label}: missing {sorted(missing)}, unknown {sorted(extra)}.", "invalid_schema")
    return value


def text_value(value, label):
    if not isinstance(value, str) or not value.strip() or "\x00" in value:
        fail(f"{label} must be a nonempty string without NUL.", "invalid_schema")
    return value


def id_value(value, label):
    text_value(value, label)
    if not TASK_ID.fullmatch(value) or value.upper() in sp.WINDOWS_RESERVED:
        fail(f"{label} must be 1–80 letters/digits/_/- and not a reserved device name.", "unsafe_path")
    return value


def integer(value, label, minimum=1, maximum=MAX_CANDIDATES):
    if isinstance(value, bool) or not isinstance(value, int) or not minimum <= value <= maximum:
        fail(f"{label} must be an integer from {minimum} to {maximum}.", "invalid_schema")
    return value


def ordinary(path):
    if path.is_symlink() or (hasattr(path, "is_junction") and path.is_junction()):
        fail(f"Links and junctions are not supported here: {path}", "unsafe_path")


def local_path(root, relative, *, exists=True, directory=False):
    # Reuse portable-path checks, then reject links even when they stay inside.
    if directory:
        sp.safe_file(root, relative + "/.path-check", must_exist=False)
    else:
        sp.safe_file(root, relative, must_exist=exists)
    target = root
    for part in relative.split("/"):
        target = target / part
        ordinary(target)
    if exists and not (target.is_dir() if directory else target.is_file()):
        fail(f"Missing {'directory' if directory else 'file'}: {target}", "missing_file")
    return target


def write_new(path, value):
    with path.open("x", encoding="utf-8", newline="\n") as stream:
        stream.write(value if isinstance(value, str) else sp.json_text(value))


def controls(raw, label):
    if raw is None:
        return {"slots": {}, "exploration": {"allowed_slots": [], "max_candidates": 4}}
    exact(raw, {"slots"}, label, {"exploration"})
    if not isinstance(raw["slots"], dict):
        fail(f"{label}.slots must be an object.", "invalid_controls")
    result = copy.deepcopy(raw)
    for slot, definition in raw["slots"].items():
        if not isinstance(slot, str) or not SLOT_ID.fullmatch(slot):
            fail(f"Invalid slot name {slot!r} in {label}.", "invalid_controls")
        exact(definition, {"default", "guidance"}, f"{label}.slots.{slot}")
        for key in ("default", "guidance"):
            text_value(definition[key], f"{label}.slots.{slot}.{key}")
    exploration = raw.get("exploration", {"allowed_slots": [], "max_candidates": 4})
    exact(exploration, {"allowed_slots"}, label + ".exploration", {"max_candidates"})
    allowed = exploration["allowed_slots"]
    if not isinstance(allowed, list) or any(not isinstance(x, str) or not SLOT_ID.fullmatch(x) for x in allowed) or len(allowed) != len(set(allowed)):
        fail(f"{label}.exploration.allowed_slots must contain unique slot names.", "invalid_controls")
    maximum = integer(exploration.get("max_candidates", 4), label + ".exploration.max_candidates")
    result["exploration"] = {"allowed_slots": allowed, "max_candidates": maximum}
    return result


def resolved_controls(data, category, entity=None, family=None):
    profile_raw = data["profiles"][category].get("task_controls")
    result = controls(profile_raw, f"profiles.{category}.task_controls")
    if family and "task_controls" in family:
        override = controls(family["task_controls"], f"families.{family['id']}.task_controls")
        result["slots"].update(override["slots"])
        if "exploration" in family["task_controls"]:
            result["exploration"] = override["exploration"]
    if entity and "task_controls" in entity:
        override = controls(entity["task_controls"], f"entities.{entity['id']}.task_controls")
        result["slots"].update(override["slots"])
        if "exploration" in entity["task_controls"]:
            result["exploration"] = override["exploration"]
    if set(result["exploration"]["allowed_slots"]) - result["slots"].keys():
        fail(f"Exploration refers to undeclared slots for {entity['id'] if entity else category}.", "invalid_controls")
    return result


def validate_extensions(data):
    for category in data["profiles"]:
        resolved_controls(data, category)
    for family in data.get("direction", {}).get("families", []):
        resolved_controls(data, family["category"], family=family)
    aliases = {}
    for entity in data["entities"]:
        values = entity.get("aliases", [])
        if not isinstance(values, list):
            fail(f"Entity {entity['id']} aliases must be an array.", "invalid_alias")
        for alias in [entity["id"], *values]:
            key = (entity["kind"], text_value(alias, "alias").strip().casefold())
            if key in aliases:
                fail(f"Alias {alias!r} is ambiguous or repeated in {entity['kind']}: {aliases[key]}, {entity['id']}.", "ambiguous_alias")
            aliases[key] = entity["id"]
        resolved_controls(data, entity["kind"], entity)


def checked_pack(path):
    root = sp.resolve_pack(str(path))
    ordinary(root)
    report = sp.verify_pack(root)
    if not report["ok"]:
        fail("Pack verification failed: " + "; ".join(f"{e['code']}: {e['message']}" for e in report["errors"]), "pack_verification")
    data = sp.read_json(root / "style-pack.json")
    validate_extensions(data)
    return root, data, report


def pointer(data, verification):
    return {"version": data["version"], "fingerprint": verification["pack"]["fingerprint"],
            "path": "releases/" + data["version"], "release": verification["release"]}


def validate_pointer(value):
    exact(value, {"version", "fingerprint", "path", "release"}, "baseline")
    if not isinstance(value["version"], str) or not sp.VERSION_PATTERN.fullmatch(value["version"]):
        fail("Invalid baseline version.", "invalid_pointer")
    if not isinstance(value["fingerprint"], str) or not sp.SHA_PATTERN.fullmatch(value["fingerprint"]):
        fail("Invalid baseline fingerprint.", "invalid_pointer")
    if value["path"] != "releases/" + value["version"] or not isinstance(value["release"], bool):
        fail("Baseline path or release flag is invalid.", "invalid_pointer")


def verify_tools(root):
    manifest = sp.read_json(local_path(root, "tools-manifest.json"))
    exact(manifest, {"schema_version", "files", "notice"}, "tools-manifest")
    if manifest["schema_version"] != SCHEMA or not isinstance(manifest["files"], dict) or set(manifest["files"]) not in (TOOL_FILES, TEAM_TOOL_FILES):
        fail("Invalid tool manifest.", "tool_integrity")
    for name, digest in manifest["files"].items():
        if sp.file_digest(local_path(root, "tools/" + name)) != digest:
            fail(f"Project tool changed: tools/{name}.", "tool_integrity")


def workspace(argument):
    raw = Path(argument).expanduser()
    ordinary(raw)
    root = raw.resolve()
    if not root.is_dir():
        fail("WORKSPACE must be an existing project runtime directory.", "missing_workspace")
    verify_tools(root)
    config = sp.read_json(local_path(root, "project.json"))
    exact(config, {"schema_version", "project_id", "current", "created_at", "updated_at", "history"}, "project")
    if config["schema_version"] != SCHEMA:
        fail("Unsupported workspace schema.", "invalid_schema")
    text_value(config["project_id"], "project_id")
    validate_pointer(config["current"])
    if not isinstance(config["history"], list) or not config["history"]:
        fail("Project history must contain the initial version.", "invalid_schema")
    versions = set()
    for entry in config["history"]:
        exact(entry, {"baseline", "adopted_at"}, "history entry")
        validate_pointer(entry["baseline"])
        text_value(entry["adopted_at"], "adopted_at")
        if entry["baseline"]["version"] in versions:
            fail("History contains a reused version.", "version_reused")
        versions.add(entry["baseline"]["version"])
    if config["history"][-1]["baseline"] != config["current"]:
        fail("Current pointer differs from the last recorded adoption.", "invalid_pointer")
    for name in ("releases", "tasks", "work", "requests", "tools"):
        local_path(root, name, directory=True)
    return root, config


def bound_pack(root, config, baseline):
    validate_pointer(baseline)
    pack, data, verified = checked_pack(local_path(root, baseline["path"], directory=True))
    if data["project"]["id"] != config["project_id"] or pointer(data, verified) != baseline:
        fail("Baseline does not match its verified package.", "baseline_mismatch")
    return pack, data, verified


@contextmanager
def locked(root):
    target = root / ".runtime.lock"
    ordinary(target)
    try:
        with target.open("x", encoding="utf-8") as stream:
            stream.write(sp.json_text({"pid": os.getpid(), "at": now()}))
    except FileExistsError as exc:
        raise sp.PackError("Another runtime mutation owns .runtime.lock; retry after it finishes. Do not remove an active process's lock.", "workspace_busy") from exc
    try:
        yield
    finally:
        target.unlink()


def copy_pack(source, destination):
    if destination.exists() or destination.is_symlink():
        fail(f"Release destination exists: {destination}", "version_reused")
    manifest = sp.read_json(source / "manifest.json")
    destination.mkdir(exist_ok=False)
    for relative in [*manifest["files"], "manifest.json"]:
        target = destination / relative
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(sp.safe_file(source, relative), target)
    checked_pack(destination)


def entry_documents(name):
    project = f"""# {name} · 团队工作入口

成员直接对 Agent 说：**按已确认的卡片家族做一组商品卡，覆盖两个渠道。** 或者 **用当前角色、场景、图标和 UI 规范，完成活动页面与单件资产。**
不需要自己描述整套画风，不需要写 JSON、任务编号或命令。Agent 应先读取本文件和 `project.json`，确认类别、组件家族与复用主体，自动绑定当前规范、身份与允许变化。包中 guides/ 下的五份手册帮助理解项目判断，不代替 JSON 事实源。

- 正式资产：说清本次变化和用途；默认保留角色长相/商品外形与标识、项目风格和未改变的要求。
- 想抽卡：说“探索几种方案”；只能在主美开放的变量内探索，每次预算由规范决定。优秀候选由主美判断排期与落地后，进入新规范发布流程。
- 继续旧任务：告诉 Agent 上次任务或文件。旧任务保持当时版本；有新版会提示，不会偷偷替换。

新任务会重新读取 `project.json` 当前指针、真实规范及参考文件并核验指纹。编辑草稿不会自动发布给团队；已发布包不能原地修改。成员各自拥有本地副本时，需要分发/同步后才能看到同一新版。

## Agent 执行入口

1. 运行 `python tools/project_runtime.py status .`，读取当前包的 `style-pack.json`。把成员原话解析成结构化 request，自动生成唯一 task_id，保存到 `requests/`。脚本本身不理解自然语言。
2. 运行 `python tools/project_runtime.py start . --request requests/任务请求.json`。使用返回路径的 `generation-brief.md`、`brief.json` 和真实参考图调用可用图像工具；不得把反例当正向参考。
3. 按 `handoff.md` 推进单件资产、PS、实际场景集成及交付。真实产物和评审记录放在返回的 `work_dir`，不得改写冻结输入或把初始 unknown 当 pass。
4. 继续任务运行 `python tools/project_runtime.py resume . --task 任务编号`。若当前版本变化，仅报告差异；重新绑定需要建立新任务。

请求字段：`schema_version`="1.0"、`task_id`、`request`(原话)、`category`、`subject`(实体 ID/已定义别名/null)、`mode`(production/exploration)、`changes`(已开放变量)、`exploration`(正式任务为 null；探索为 slots/candidates)、`owner`(id/kind，kind 为 internal/external)。可选 `family` 绑定组件/资产家族；可选 `components`=[{{category,subject,family}}] 绑定组合版面的商品、字体、UI 等子规范，所有组件使用同一版本。家族已定义的类别必须选 family；不要猜测未定义的主体或静默解锁固定规则。运行 `tools/team_batch.py check` 检查交付批次，家族要求会自动纳入待审项。

运行层会阻止错误变量、版本与文件混用；它不会识别人脸相似度、评价创意、操作 Photoshop 或批准正式资产。草案任务只能探索。`tools-manifest.json` 与包指纹能检测意外编辑，是未签名记录，不认证发布者身份。
"""
    agents = """# 此工作区的 Agent 入口

每次新任务先读 PROJECT.md 与 project.json，并运行 `python tools/project_runtime.py status .`。按 current 指针重新读取 style-pack.json、适用规则和参考，不以聊天记忆代替文件。成员只提供一句话；由你解析请求、自动生成任务 ID 与 requests/*.json，再运行 start。

使用 `python tools/project_runtime.py start . --request requests/<request>.json` 冻结任务。绑定主体必须唯一；只修改显式开放的 slot。服装默认值可以变化并不表示脸、发型和风格被解锁；组合海报也要通过 components 绑定商品身份、字体、UI 等适用规范。实际图片调用前检查图片和冲突；must/fixed 与新要求冲突时，不得自动丢弃规则。探索任务也保留身份与画风底线。预算是每次候选数量，不是项目创意上限。

有 direction.families 的类别必须选择 family，组合组件各自选择家族；固定项、样板验收与渠道交付要求随任务编译进来，全部初始 unknown。变量默认按类别→家族→实体合并，任何冲突仍须人工判断，不把覆盖顺序当艺术豁免。整批交付用 tools/team_batch.py 核对，同一基线、家族、证据及产物字节均须对应。

按照 task 的 generation-brief.md/handoff.md 使用可用工具，把产出与真实评审保存在 work/<task_id>/；不声称 CLI 已生成图像或做了 PS。继续任务运行 resume，使用冻结版本；current 更新只提示。任何未知检查保持 unknown。不能把生成了图片等同正式交付。

主美采用更优方案后，修改开发草案、留下真实决定与证据、构建新版本，再执行 `python tools/project_runtime.py publish . --pack <built-pack> --expect-current <current-fingerprint>`；不编造审批。`--allow-draft` 仅用于候选工作区，不能覆盖已发布正式基线。
"""
    return project, agents


def init_workspace(pack_argument, output, allow_draft=False):
    source, data, verified = checked_pack(pack_argument)
    if not verified["release"] and not allow_draft:
        fail("This package is not a release. Use --allow-draft only for a candidate workspace.", "draft_requires_opt_in")
    out = sp.destination_new(str(output), source)
    baseline = pointer(data, verified)
    timestamp = now()
    config = {"schema_version": SCHEMA, "project_id": data["project"]["id"], "current": baseline,
              "created_at": timestamp, "updated_at": timestamp, "history": [{"baseline": copy.deepcopy(baseline), "adopted_at": timestamp}]}
    # Claim a new destination only; a failed copy never overwrites an existing workspace.
    out.mkdir(exist_ok=False)
    for folder in ("releases", "tasks", "work", "requests", "tools"):
        (out / folder).mkdir()
    copy_pack(source, out / baseline["path"])
    _, copied_data, copied_verified = checked_pack(out / baseline["path"])
    if copied_data["project"]["id"] != config["project_id"] or pointer(copied_data, copied_verified) != baseline:
        fail("Package changed while initializing; no project pointer was created.", "input_changed")
    for name in TEAM_TOOL_FILES:
        shutil.copyfile(Path(__file__).resolve().with_name(name), out / "tools" / name)
    write_new(out / "tools-manifest.json", {"schema_version": SCHEMA,
        "files": {name: sp.file_digest(out / "tools" / name) for name in sorted(TEAM_TOOL_FILES)},
        "notice": "Unsigned hashes detect accidental changes; they do not authenticate the runtime author or approver."})
    project, agents = entry_documents(data["project"]["name"])
    write_new(out / "PROJECT.md", project)
    write_new(out / "AGENTS.md", agents)
    write_new(out / "project.json", config)
    return {"ok": True, "command": "init", "workspace": str(out), "current": baseline,
            "candidate_workspace": not verified["release"], "production_approved": False}


def request_data(path):
    request = sp.read_json(Path(path).expanduser().resolve())
    exact(request, {"schema_version", "task_id", "request", "category", "subject", "mode", "changes", "exploration", "owner"}, "request", {"components", "family"})
    if request["schema_version"] != SCHEMA:
        fail("Unsupported request schema.", "invalid_schema")
    id_value(request["task_id"], "task_id")
    text_value(request["request"], "request")
    if not isinstance(request["category"], str) or request["category"] not in sp.CATEGORIES or not isinstance(request["mode"], str) or request["mode"] not in {"production", "exploration"}:
        fail("Unknown category or mode.", "invalid_schema")
    if request["subject"] is not None:
        text_value(request["subject"], "subject")
    if request.get("family") is not None:
        text_value(request["family"], "family")
    components = request.get("components", [])
    if not isinstance(components, list):
        fail("components must be an array.", "invalid_schema")
    seen = set()
    for component in components:
        exact(component, {"category", "subject"}, "component", {"family"})
        if not isinstance(component["category"], str) or component["category"] not in sp.CATEGORIES:
            fail("Unknown component category.", "invalid_schema")
        if component["subject"] is not None:
            text_value(component["subject"], "component.subject")
        if component.get("family") is not None:
            text_value(component["family"], "component.family")
        key = (component["category"], component["subject"], component.get("family"))
        if key in seen:
            fail("Repeated component binding.", "invalid_schema")
        seen.add(key)
    if not isinstance(request["changes"], dict):
        fail("changes must be an object.", "invalid_schema")
    for slot, value in request["changes"].items():
        text_value(value, f"changes.{slot}")
    exact(request["owner"], {"id", "kind"}, "owner")
    text_value(request["owner"]["id"], "owner.id")
    if not isinstance(request["owner"]["kind"], str) or request["owner"]["kind"] not in {"internal", "external"}:
        fail("owner.kind must be internal or external.", "invalid_schema")
    if request["mode"] == "production":
        if request["exploration"] is not None:
            fail("Production requests must use exploration:null.", "invalid_schema")
    else:
        exp = exact(request["exploration"], {"slots", "candidates"}, "exploration")
        if not isinstance(exp["slots"], list) or any(not isinstance(x, str) for x in exp["slots"]) or len(exp["slots"]) != len(set(exp["slots"])):
            fail("exploration.slots must be an array of unique names.", "invalid_schema")
        integer(exp["candidates"], "exploration.candidates")
    return request


def resolve_entity(data, category, subject):
    if subject is None:
        return None
    matches = [entity for entity in data["entities"] if entity["kind"] == category and subject.strip().casefold() in [name.strip().casefold() for name in [entity["id"], *entity.get("aliases", [])]]]
    if len(matches) != 1:
        fail(f"Subject {subject!r} resolves to {len(matches)} entities in {category}; use one existing entity ID or unique alias.", "ambiguous_subject" if matches else "unknown_subject")
    return matches[0]


def generation_markdown(task, brief):
    entity = brief["entity"]
    lines = [f"# {task['task_id']} · 生成交接", "", f"状态：**{task['status']}**；正式交付批准：否。",
             f"项目 `{task['project_id']}` / 版本 `{task['baseline']['version']}` / 指纹 `{task['baseline']['fingerprint']}`", "",
             "## 本次任务", "", task["request"], "", f"主体：{entity['id'] if entity else '未绑定既有实体'}；类目：{task['category']}；模式：{task['mode']}", "",
             "## 不变的判断", "", "以下规则、固定特征与画风要求在探索中同样保留；变化只适用于明确开放的变量。发现新要求与 must/fixed 冲突时，先交主美处理，不自动丢弃旧规则。", ""]
    for rule in brief["rules"]:
        lines.append(f"- [{rule['id']}] {rule['strength']} / {rule['status']}：{rule['statement']}")
    lines.extend(["", "固定的类目要求：", sp.bullets(brief["profile"]["fixed"]), "", "固定的实体特征：", sp.bullets(entity["fixed_features"] if entity else []), "", "## 已解析变量", ""])
    if brief.get("family"):
        family = brief["family"]
        lines += ["", f"## 组件/资产家族：{family['id']} · {family['name']} · {family['status']}", family["purpose"], "固定要求：", sp.bullets(family["fixed"]), "允许变化：", sp.bullets(family["variable"]), "家族技术约束：", "```json", sp.json_text(family["technical"]).rstrip(), "```"]
    for slot, value in task["resolved_values"].items():
        lines.append(f"- {slot}：{value}（{'本次显式修改' if slot in task['changes'] else '继承默认值'}）；边界：{task['controls']['slots'][slot]['guidance']}")
    for component in brief.get("component_briefs", []):
        lines += ["", f"组合组件：{component['category']} / {component['entity']['id'] if component['entity'] else '类别规范'}；同一冻结版本与指纹。", "固定类目要求：", sp.bullets(component["profile"]["fixed"]), "固定实体特征：", sp.bullets(component["entity"]["fixed_features"] if component["entity"] else [])]
        lines += ["组件技术要求：", "```json", sp.json_text(component["profile"]["technical"]).rstrip(), "```"]
        if component.get("family"):
            lines += [f"家族：{component['family']['id']} · {component['family']['status']}", sp.bullets(component["family"]["fixed"]), "家族技术约束：", "```json", sp.json_text(component["family"]["technical"]).rstrip(), "```"]
    if task["exploration"]:
        lines += ["", f"本次抽卡预算 {task['exploration']['candidates']} 个候选；可探索：{', '.join(task['exploration']['slots']) or '不主动改变变量，仅采样'}。规范预算上限 {task['controls']['exploration']['max_candidates']}，由主美可调；不是项目创意上限。",
                  "候选不会自动改写基线；记录更好的效果、制作成本、排期与兼容影响，由主美选择后建立新版本。"]
    lines += ["", "## 参考图片与说明材料", "", "先区分文件类型：Markdown、文本和规范文档只供 Agent 阅读整理，不作为图像模型的图片输入。实际可读取且工具支持的图片才作为图像输入；SHA256 相同的图片只传一次，同时说明其多个参考角色与区域。不能把文本方向当作已具备的商品图或身份图。", "", "相对路径从工作区根目录定位，保持整个工作区一起移动即可；绝对路径仅供当前机器便捷取用。", ""]
    for reference in task["references"]:
        lines.append(f"- {reference['id']} · {reference['role']} / {reference['usage']}\n  - 路径：`{reference['workspace_path']}`\n  - 当前绝对路径：`{reference['absolute_path']}`\n  - SHA256：`{reference['sha256']}`\n  - 用法：{reference['notes']}")
    lines += ["", "反例只用于否定和质检；不要当正向参考。候选图只能作为候选探索来源。调用前实际查看参考；没有图片读取或图像模型时交接本 brief，不能声称已经生成。", "", "## 技术要求", "", "```json", json.dumps(brief["profile"]["technical"], ensure_ascii=False, indent=2), "```", "", "所有结果仍须按 review.json 中的 unknown 检查逐项提供真实证据。脚本不验证面孔相似度、颜色风格或语义矛盾。"]
    if brief.get("workflow"):
        lines += ["", "## 随任务携带的制作与验收方法", "",
                  "这是执行方法；项目要求和确认状态以上面的冻结规则为准。", "",
                  *[f"{index}. {step}" for index, step in enumerate(brief["workflow"], 1)]]
    if brief.get("judgment_tools"):
        lines += ["", "## 按需补充判断证据", "",
                  "以下链接指向本任务冻结包内的方法与简表。记录写在任务工作目录，已有表可直接补充；不修改冻结包，也不自动批准或更改项目要求。"]
        for record in brief["judgment_tools"]:
            target = "../../" + task["baseline"]["path"] + "/" + record["guide"]
            lines.append(f"- [{record['title']}]({target})：{record['when']}。")
    if brief.get("direction_checks"):
        lines += ["", "## 家族、样板与渠道验收", "", *[f"- `{check['criterion']}` · 来源状态 {check['source_status']} · unknown：{check['statement']}" for check in brief["direction_checks"]]]
    if task["blockers"]:
        lines += ["", "## 阻断", "", *["- " + item["message"] for item in task["blockers"]]]
    if task.get("open_questions"):
        lines += ["", "## 项目未定事项（按本任务用途核对）", "", *["- " + item for item in task["open_questions"]], "", "任务已准备不表示材料齐备；缺关键参考时可继续规划，实际制作与正式交付仍需相应材料及检查。"]
    return "\n".join(lines) + "\n"


def handoff_markdown(task, brief):
    lines = [f"# {task['task_id']} · 资产落地交接", "", f"输出工作目录：`{task['work_path']}/`；冻结任务目录只读。", "",
             "该文件是交接计划。还没有生成资产、操作 Photoshop、完成集成或通过验收。", ""]
    for index, (key, label) in enumerate(STAGES, 1):
        lines.append(f"{index}. **{label}**：状态 unknown。保留实际文件、操作记录与检查证据；未执行保持 unknown。")
        if key == "concept":
            lines.append("   选择创意候选时，保留落选候选与理由。更优风格需主美结合排期决策，不能让个别成员自动更新全队规范。")
        elif key == "single_asset":
            lines.append("   图像模型按 generation-brief.md 单独生产需要的资产；记录工具/模型/设置/种子（不可得则 unknown）、真实参考与原始输出。")
        elif key == "photoshop":
            lines.append("   在 PS 或可用编辑器中按规范调整画布/像素尺寸/锚点，检查真实 alpha 与边缘，保留 PSD 等可编辑源文件和单件导出；未明确的尺寸或命名不得猜成已确认要求。")
        elif key == "integration":
            lines.append("   放回实际投放版面、产品界面或游戏场景，按用途检查大小、商品/角色身份、字号、读图、遮挡、色彩及动效衔接。没有真实集成环境时记 unknown。")
        else:
            lines.append("   逐项复核身份、风格、任务、技术与集成，留存证据、版本、产物哈希和责任人。生成图/alpha 存在/脚本通过均不等于主美批准。")
    lines += ["", "## 冻结的技术要求", "", "```json", json.dumps(brief["profile"]["technical"], ensure_ascii=False, indent=2), "```", "", "`review.json` 是冻结时的初始检查模板（全部 unknown），真实评审另存输出目录；不要改它以掩盖任务起点。"]
    for component in brief.get("component_briefs", []):
        lines += ["", f"组件 {component['category']} / {component['entity']['id'] if component['entity'] else '类别'} 的技术要求：", "", "```json", json.dumps(component["profile"]["technical"], ensure_ascii=False, indent=2), "```"]
    if brief.get("direction_checks"):
        lines += ["", "## 家族与渠道的实际交付检查", *[f"- {check['criterion']}：{check['statement']}（来源状态 {check['source_status']}，待检查 unknown）" for check in brief["direction_checks"]]]
    return "\n".join(lines) + "\n"


def start_workspace(argument, request_path):
    root, _ = workspace(argument)
    request = request_data(request_path)
    with locked(root):
        _, config = workspace(root)  # Read the pointer again under the mutation lock.
        pack, data, verified = bound_pack(root, config, config["current"])
        category = request["category"]
        if category not in data["profiles"]:
            fail(f"Category {category} has no project profile.", "unknown_category")
        entity = resolve_entity(data, category, request["subject"])
        family = sp.resolve_family(data, category, request.get("family"))
        control = resolved_controls(data, category, entity, family)
        unknown = request["changes"].keys() - control["slots"].keys()
        if unknown:
            fail("Undeclared change slots: " + ", ".join(sorted(unknown)) + ". The Agent must not infer permission to unlock identity or legacy fixed features.", "unknown_slot")
        if request["exploration"]:
            exp = request["exploration"]
            if set(exp["slots"]) - set(control["exploration"]["allowed_slots"]):
                fail("Exploration includes slots not opened by the director.", "exploration_scope")
            if exp["candidates"] > control["exploration"]["max_candidates"]:
                fail("Candidate count exceeds this task's director-set budget; change the project budget explicitly rather than silently increasing it.", "exploration_budget")
        task_id = request["task_id"]
        target = local_path(root, "tasks/" + task_id, exists=False, directory=True)
        work = local_path(root, "work/" + task_id, exists=False, directory=True)
        if target.exists() or work.exists():
            fail(f"Task or output directory already exists: {task_id}", "task_exists")
        brief = sp.brief_pack(pack, category, request["request"], entity["id"] if entity else None, family_id=request.get("family"))
        if not brief["ok"]:
            fail("Cannot compile the bound package.", "brief_failed")
        component_briefs = []
        component_entities = []
        for component in request.get("components", []):
            component_category = component["category"]
            if component_category not in data["profiles"]:
                fail(f"Component category {component_category} has no project profile.", "unknown_category")
            component_entity = resolve_entity(data, component_category, component["subject"])
            component_brief = sp.brief_pack(pack, component_category, request["request"], component_entity["id"] if component_entity else None, family_id=component.get("family"))
            if not component_brief["ok"] or component_brief["pack"] != brief["pack"]:
                fail("Component brief could not bind the same package.", "brief_failed")
            component_briefs.append(component_brief)
            component_entities.append({"category": component_category, "subject": component["subject"], "entity_id": component_entity["id"] if component_entity else None, "family_id": component.get("family")})
        brief["component_briefs"] = component_briefs
        brief["workflow"] = sp.production_protocol([category, *[item["category"] for item in component_briefs]])
        for key in ("rules", "references", "review", "direction_checks"):
            id_key = "rule_id" if key == "review" else ("criterion" if key == "direction_checks" else "id")
            unique = {item[id_key]: copy.deepcopy(item) for item in brief[key]}
            for component_brief in component_briefs:
                for item in component_brief[key]:
                    unique.setdefault(item[id_key], copy.deepcopy(item))
            brief[key] = list(unique.values())
        blockers = []
        if request["mode"] == "production" and not verified["release"]:
            blockers.append({"code": "draft_production", "message": "当前包未经 release 构建，仅可候选探索，不能作为正式生产基线；请主美完成真实确认和发布，或明确建立探索任务。"})
        if entity is None and any(e["kind"] == category for e in data["entities"]):
            blockers.append({"code": "subject_required", "message": "该类目有已登记实体；先唯一绑定主体或让主美登记新实体，不能依赖模型猜测身份。"})
        if family is None and any(f["category"] == category for f in data.get("direction", {}).get("families", [])):
            blockers.append({"code": "family_required", "message": "该类目定义了组件/资产家族；先明确选择 family，不能把类别要求当作所有家族的完整规范。"})
        for component in component_entities:
            if component["entity_id"] is None and any(e["kind"] == component["category"] for e in data["entities"]):
                blockers.append({"code": "component_subject_required", "message": f"组件 {component['category']} 有已登记实体；先唯一绑定主体，不能让组合任务漏掉商品或角色身份规范。"})
            if component["family_id"] is None and any(f["category"] == component["category"] for f in data.get("direction", {}).get("families", [])):
                blockers.append({"code": "component_family_required", "message": f"组件 {component['category']} 需要明确 family；不能跳过组件家族要求。"})
        resolved = {slot: value["default"] for slot, value in control["slots"].items()}
        resolved.update(request["changes"])
        refs = []
        for source_ref in brief["references"]:
            ref = copy.deepcopy(source_ref)
            ref["workspace_path"] = config["current"]["path"] + "/" + ref["path"]
            reference_path = local_path(root, ref["workspace_path"])
            ref["absolute_path"] = str(reference_path)
            ref["sha256"] = sp.file_digest(reference_path)
            refs.append(ref)
        task = {"schema_version": SCHEMA, "task_id": task_id, "project_id": config["project_id"], "created_at": now(),
                "request": request["request"], "category": category, "subject": request["subject"], "entity_id": entity["id"] if entity else None, "family_id": request.get("family"),
                "owner": request["owner"], "mode": request["mode"], "baseline": copy.deepcopy(config["current"]),
                "status": "blocked" if blockers else ("prepared_for_exploration" if request["mode"] == "exploration" else "prepared_for_generation"),
                "ready": False, "production_approved": False, "blockers": blockers, "controls": control,
                "changes": request["changes"], "resolved_values": resolved, "exploration": request["exploration"], "components": component_entities,
                "references": refs, "open_questions": copy.deepcopy(data["open_questions"]), "work_path": "work/" + task_id,
                "limitations": ["Agent parses the request; CLI cannot assess semantic conflicts or visual identity.", "Initial unknown checks are not approval or generated assets.", "All tasks retain applicable must/fixed constraints, including during exploration."]}
        review = {"schema_version": SCHEMA, "task_id": task_id, "baseline": copy.deepcopy(config["current"]), "production_approved": False,
                  "checks": [{"criterion": criterion, "result": "unknown", "evidence": None} for criterion in ("instruction_conflicts", "identity", "style", "task", "technical", "integration", "director_acceptance")],
                  "rules": brief["review"], "direction_checks": brief["direction_checks"], "stages": [{"id": key, "label": label, "result": "unknown", "evidence": None} for key, label in STAGES]}
        files = {"task.json": sp.json_text(task), "request.json": sp.json_text(request), "brief.json": sp.json_text(brief),
                 "generation-brief.md": generation_markdown(task, brief), "handoff.md": handoff_markdown(task, brief), "review.json": sp.json_text(review)}
        bound_pack(root, config, config["current"])
        with tempfile.TemporaryDirectory(prefix=".task-stage-", dir=root / "tasks") as temporary:
            stage = Path(temporary)
            for name, content in files.items():
                write_new(stage / name, content)
            write_new(stage / "task-manifest.json", {"schema_version": SCHEMA, "task_id": task_id,
                "files": {name: sp.file_digest(stage / name) for name in sorted(TASK_FILES)},
                "notice": "Frozen input hashes are unsigned; real outputs and review evidence belong under work/, not in this snapshot."})
            target.mkdir(exist_ok=False)
            for child in stage.iterdir():
                shutil.move(str(child), str(target / child.name))
        work.mkdir(exist_ok=False)
        return {"ok": not blockers, "command": "start", "task_id": task_id, "task_dir": str(target), "work_dir": str(work),
                "baseline": task["baseline"], "status": task["status"], "ready": False, "production_approved": False, "blockers": blockers,
                "attention": task["open_questions"], "generation_brief": str(target / "generation-brief.md"), "handoff": str(target / "handoff.md")}


def read_task(root, task_id):
    id_value(task_id, "task_id")
    task_root = local_path(root, "tasks/" + task_id, directory=True)
    manifest = sp.read_json(local_path(task_root, "task-manifest.json"))
    exact(manifest, {"schema_version", "task_id", "files", "notice"}, "task-manifest")
    if manifest["schema_version"] != SCHEMA or manifest["task_id"] != task_id or not isinstance(manifest["files"], dict) or set(manifest["files"]) != TASK_FILES:
        fail("Invalid frozen task manifest.", "task_integrity")
    if {p.name for p in task_root.iterdir()} != TASK_FILES | {"task-manifest.json"}:
        fail("Frozen task contains unexpected or missing files; store outputs under work/.", "task_integrity")
    for name, digest in manifest["files"].items():
        if sp.file_digest(local_path(task_root, name)) != digest:
            fail(f"Frozen task input changed: {name}", "task_integrity")
    task = sp.read_json(task_root / "task.json")
    if not isinstance(task, dict) or task.get("task_id") != task_id:
        fail("Frozen task ID does not match.", "task_integrity")
    validate_pointer(task.get("baseline"))
    return task_root, task


def resume_workspace(argument, task_id):
    root, config = workspace(argument)
    task_root, task = read_task(root, task_id)
    bound_pack(root, config, task["baseline"])
    bound_pack(root, config, config["current"])
    if task["project_id"] != config["project_id"]:
        fail("Task belongs to another project.", "baseline_mismatch")
    updated = task["baseline"] != config["current"]
    references = []
    for reference in task["references"]:
        absolute = local_path(root, reference["workspace_path"])
        if sp.file_digest(absolute) != reference["sha256"]:
            fail("A frozen reference no longer matches its captured hash.", "task_integrity")
        references.append({"id": reference["id"], "role": reference["role"], "usage": reference["usage"],
                           "workspace_path": reference["workspace_path"], "absolute_path": str(absolute), "sha256": reference["sha256"]})
    return {"ok": True, "command": "resume", "task_id": task_id, "task_dir": str(task_root), "work_dir": str(root / task["work_path"]),
            "status": task["status"], "baseline": task["baseline"], "current": config["current"], "current_has_update": updated,
            "migrated": False, "ready": False, "production_approved": False, "blockers": task["blockers"], "references": references,
            "notice": "当前规范已更新；本任务继续冻结旧版。如需迁移，显式建立新任务并复核兼容。" if updated else "继续使用已冻结的任务与参考。"}


def publish_workspace(argument, pack_argument, expect_current, allow_draft=False):
    root, _ = workspace(argument)
    source, data, verified = checked_pack(pack_argument)
    if not isinstance(expect_current, str) or not sp.SHA_PATTERN.fullmatch(expect_current):
        fail("--expect-current must be the current lowercase SHA256 fingerprint.", "invalid_pointer")
    with locked(root):
        _, config = workspace(root)
        bound_pack(root, config, config["current"])
        if config["current"]["fingerprint"] != expect_current:
            fail("Current changed since it was read. Reload status and review the new baseline before publishing.", "current_changed")
        if data["project"]["id"] != config["project_id"]:
            fail("Cannot publish a different project into this workspace.", "project_mismatch")
        if not verified["release"]:
            if not allow_draft:
                fail("Candidate packages require --allow-draft.", "draft_requires_opt_in")
            if config["current"]["release"]:
                fail("A candidate cannot replace a released production baseline; use a separate candidate workspace.", "draft_over_release")
        baseline = pointer(data, verified)
        if any(entry["baseline"]["version"] == baseline["version"] for entry in config["history"]):
            fail("A version already adopted in this workspace cannot be reused, even with different bytes.", "version_reused")
        destination = local_path(root, baseline["path"], exists=False, directory=True)
        copy_pack(source, destination)
        _, copied_data, copied_verified = checked_pack(destination)
        if pointer(copied_data, copied_verified) != baseline:
            fail("Package changed while publishing; current pointer was not changed.", "input_changed")
        timestamp = now()
        updated = copy.deepcopy(config)
        updated["current"] = baseline
        updated["updated_at"] = timestamp
        updated["history"].append({"baseline": baseline, "adopted_at": timestamp})
        # Atomic file replacement; all package copies and verification precede it.
        with tempfile.NamedTemporaryFile(mode="w", encoding="utf-8", prefix=".project-stage-", suffix=".json", dir=root, delete=False) as stream:
            temporary = Path(stream.name)
            stream.write(sp.json_text(updated))
            stream.flush()
            os.fsync(stream.fileno())
        try:
            if sp.read_json(local_path(root, "project.json")) != config:
                fail("Project pointer was changed by another writer; publishing did not replace it.", "current_changed")
            os.replace(temporary, root / "project.json")
        finally:
            if temporary.exists():
                temporary.unlink()
        return {"ok": True, "command": "publish", "workspace": str(root), "previous": config["current"], "current": baseline,
                "existing_tasks_migrated": False, "production_approved": False,
                "notice": "新任务将读取新指针；既有任务与发布包保留。release 只反映包中真实记录的校验，不认证审批者身份或美术质量。"}


def status_workspace(argument):
    root, config = workspace(argument)
    pack, data, verified = bound_pack(root, config, config["current"])
    tasks = []
    for child in sorted((root / "tasks").iterdir()):
        if child.name.startswith(".task-stage-"):
            continue
        _, task = read_task(root, child.name)
        tasks.append({"task_id": task["task_id"], "status": task["status"], "baseline": task["baseline"], "current_has_update": task["baseline"] != config["current"]})
    return {"ok": True, "command": "status", "workspace": str(root), "project_id": config["project_id"],
            "current": config["current"], "pack_path": str(pack), "canonical_path": str(pack / "style-pack.json"),
            "candidate_workspace": not verified["release"], "tasks": tasks, "categories": list(data["profiles"]),
            "subjects": [{"id": e["id"], "category": e["kind"], "aliases": e.get("aliases", [])} for e in data["entities"]],
            "production_approved": False, "notice": "已重新读取磁盘指针并核验当前包；未自动联网同步其他成员副本，未生成或验收任何资产。"}


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    commands = parser.add_subparsers(dest="command", required=True)
    init = commands.add_parser("init")
    init.add_argument("--pack", required=True)
    init.add_argument("--out", required=True)
    init.add_argument("--allow-draft", action="store_true")
    start = commands.add_parser("start")
    start.add_argument("workspace")
    start.add_argument("--request", required=True)
    resume = commands.add_parser("resume")
    resume.add_argument("workspace")
    resume.add_argument("--task", required=True)
    publish = commands.add_parser("publish")
    publish.add_argument("workspace")
    publish.add_argument("--pack", required=True)
    publish.add_argument("--expect-current", required=True)
    publish.add_argument("--allow-draft", action="store_true")
    status = commands.add_parser("status")
    status.add_argument("workspace")
    args = parser.parse_args(argv)
    try:
        if args.command == "init":
            result = init_workspace(args.pack, args.out, args.allow_draft)
        elif args.command == "start":
            result = start_workspace(args.workspace, args.request)
        elif args.command == "resume":
            result = resume_workspace(args.workspace, args.task)
        elif args.command == "publish":
            result = publish_workspace(args.workspace, args.pack, args.expect_current, args.allow_draft)
        else:
            result = status_workspace(args.workspace)
        print(sp.json_text(result), end="")
        return 0 if result["ok"] else 1
    except (sp.PackError, OSError, RuntimeError, ValueError) as exc:
        print(sp.json_text({"ok": False, "command": args.command, "errors": [{"code": getattr(exc, "code", "io_error"), "message": str(exc)}]}), end="")
        return 2


if __name__ == "__main__":
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    raise SystemExit(main())
