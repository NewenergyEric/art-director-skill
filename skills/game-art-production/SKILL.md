---
name: game-art-production
description: 读取主美分发的美术项目包，把角色、场景状态、道具、UI、动作与效果组织成可追溯的生成批次和组合交付；用于继续制作游戏素材、验证场景变化、导出 Compositor 分层文件或排查资产版本漂移。
---

# Game Art Production · 游戏美术制作

**一个团队/项目，一份视觉记忆。** 本 Skill 负责把同一份规范用在持续制作与组合交付中。`art-director` 负责建立和迭代专业规范；这里读取其项目包，不另写一套审美标准。已有项目包可独立使用本 Skill；缺少方向时先补方向，不能套用潮灯案例的画风。

先读完整项目包的 `SKILL.md`、`style-pack.json` 与当前任务，验证包内 manifest。冻结项目版本、fingerprint 和 manifest 哈希。用户用设计语言提出目标，Agent 整理清单、调用绘图工具和检查结果；不要求设计师先填 JSON。

## 从已有工作继续

1. 把使用情境写清：玩家在做什么、屏幕要表达什么、哪些资产同时出现。将目标拆成首件、家族扩展、场景状态、动作、效果和交付文件。功能需要多少资产就做多少，不用装饰数量充当完整性。
2. 为每件记录资产 ID、来源、身份/画风/构图参考、适用规则、允许变化、依赖、输出要求和检查状态。依赖先做首件，再做变体。已存在且哈希未变的合格文件复用；缺失、拒收、旧版本不得悄悄换成占位图。
3. 用当前可用图像工具实际生成/编辑。每次带上相关原图；保留实际提示、工具、输入和新输出。脚本只做确定性检查和导出，不生成美术，也不伪造一次没有执行的生成。
4. 在真实使用尺度组合：角色落脚、场景机位与地标、UI 遮挡、透明边、层级与效果强度。状态图对齐后再转场；动作与效果绑定事件和接触点。切换背景不能掩盖建筑漂移，立绘轻移不能冒充骨骼动画。方法见 [组合与状态验收](references/assembly-review.md)。
5. 把共性问题返回 `art-director` 的候选新版；单件返修留在任务里。首次交付候选用 `--allow-candidate` 明确标记，不将技术通过写成主美批准。现有用户授权继续有效。

## 两条交付路径

**常规制作：** 项目包 → 首件 → 同族扩展 → 使用尺度组合 → 评审与交付。适用于任何支持的图像工具和引擎，不要求安装 Compositor。

**分层编辑：** 在常规制作后，把同一场景配方导出为 `.comp`。Compositor 是可选的图层编辑出口；不承担生成、游戏逻辑或视频动画。先读 [Compositor 适配](references/compositor.md)。Windows 可以生成和检查格式；只有实际在支持的 Mac 中打开、检查与回存，才能记录原生验收通过。

随本 Skill 的 `scripts/production.py` 使用 Python 3.10+。`check`、`tasks`、`verify` 使用标准库；PNG 转换与 Compositor 导出需要 Pillow。通过 `--help` 获取参数。所有输出要求新目录，禁止覆盖成员正在编辑的内容。

```text
python scripts/production.py check PLAN.json --pack RECEIVED_PACK --allow-candidate
python scripts/production.py tasks PLAN.json --pack RECEIVED_PACK --out NEW_TASKS
python scripts/production.py build PLAN.json --pack RECEIVED_PACK --out NEW_DELIVERY --allow-candidate
python scripts/production.py verify NEW_DELIVERY
```

计划字段和批次恢复见 [制作协议](references/production-contract.md)。先整理真实资料，Agent 再写计划；示例 JSON 是工具契约，不是用户入门问卷。

交付摘要用人能读懂的语言说明：完成了哪些内容、共用了什么规范、实际检查结果、文件入口和仍未解决的问题。清楚区分原创候选、技术检查、视觉自查、主美批准和引擎验收。
