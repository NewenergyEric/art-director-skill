<p align="right"><strong>中文</strong> · <a href="README.en.md">English</a></p>

<p align="center">
  <a href="https://github.com/NewenergyEric/art-director-skill/actions/workflows/ci.yml"><img alt="Validate skill" src="https://github.com/NewenergyEric/art-director-skill/actions/workflows/ci.yml/badge.svg"></a>
  <a href="https://github.com/NewenergyEric/art-director-skill/actions/workflows/codeql.yml"><img alt="CodeQL" src="https://github.com/NewenergyEric/art-director-skill/actions/workflows/codeql.yml/badge.svg"></a>
  <a href="https://github.com/NewenergyEric/art-director-skill/releases/tag/v0.5.1"><img alt="Release v0.5.1" src="https://img.shields.io/badge/release-v0.5.1-225d4b.svg"></a>
  <a href="LICENSE"><img alt="MIT License" src="https://img.shields.io/badge/license-MIT-151715.svg"></a>
  <img alt="Python 3.10+" src="https://img.shields.io/badge/Python-3.10%2B-3272b8.svg">
</p>

# Art Director

## 一个团队，一份视觉记忆。

**让主美建立项目的视觉记忆，让团队从同一版本完成每一次交付。**

这里的“视觉记忆”包括视觉语言、组件与资产家族、代表样板、允许变化、交付要求和评审记录。Art Director 从已有作品、参考与批注开始，带主美一步步建立这些内容，再打包成团队可调用的项目 Skill。

<a href="https://newenergyeric.github.io/art-director-skill/docs/showcase.html"><picture>
  <source media="(prefers-reduced-motion: reduce)" srcset="assets/readme/depth-preview-zh.jpg?v=visual-memory-20261010">
  <img src="assets/readme/depth-preview-zh.gif?v=visual-memory-20261010" width="100%" alt="一个团队，一份视觉记忆。不同深度的作品画板连接到同一项目版本。">
</picture></a>

<p align="center"><sub>同一套视觉语言，贯穿规范、工作台与交付 · <a href="https://newenergyeric.github.io/art-director-skill/docs/landing.html">产品介绍</a> · <a href="https://newenergyeric.github.io/art-director-skill/docs/workbench.html">主美工作台</a> · <a href="https://newenergyeric.github.io/art-director-skill/docs/call-flow.html">工程调用路径</a></sub></p>

**Agent Skills 兼容** · Codex · Claude Code · Cursor · Gemini CLI · Windsurf · GitHub Copilot CLI · VS Code · Grok

```sh
npx skills add https://github.com/NewenergyEric/art-director-skill
```

[进入主美工作台](https://newenergyeric.github.io/art-director-skill/docs/workbench.html) · [人类使用说明](docs/HUMAN-GUIDE.md) · [Agent 使用说明](docs/AGENT-GUIDE.md) · [读取 Skill](SKILL.md) · [下载项目工具包](https://github.com/NewenergyEric/art-director-skill/releases/tag/v0.5.1)

| 主美建立 | 团队调用 | 一致交付 |
|---|---|---|
| 把已有判断整理成可评审的项目体系 | 每个任务自动读取适用规则、样板与版本 | 错版、缺件和未检查项保持可见，反馈回到同一项目记忆 |

**判断与发布决定由主美负责** · **规范、参考和工具一起分发** · **核心工具本地运行，不自动上传项目材料**

---

## 两类用户，一条共同生产链

| 主美 / 设计总监 | 团队成员 / 外包 |
|---|---|
| 把零散资料整理成可评审的定位与规范初稿 | 接收项目包，不依赖主美原来的聊天记录 |
| 明确整体语言、类别、组件家族、固定项和变量 | 用自然语言提出角色、场景、UI、商品或组合任务 |
| 选择能解决分歧的代表样板和首件 | Agent 自动绑定当前版本、类别、家族、身份和参考 |
| 定义交付、组合、渠道与验收要求 | 交付单件、源文件、组合结果和检查证据 |
| 根据效果、成本和周期决定是否升级规范 | 新任务读取新版，既有任务继续冻结版本 |

```text
已有资料与专业判断
  → 项目定位 / 整体视觉语言
  → 类别、组件与资产家族
  → 代表样板 / 首件 / 实际组合校准
  → 规则、参考、手册和工具打包
  → 成员按项目版本制作与交付
  → 批次检查、定向返工、采用更好方案
  → 主美发布下一版基线
```

## 主美怎样开始

安装后，把已有材料交给 Agent，直接说：

> 使用 `$art-director`。我还没有整理好完整规范。先根据现有作品、参考和批注写出能评审的初稿，再带我明确项目定位、整体风格、各类组件和家族的要求、允许变化、代表样板与验收方法，最后生成可以交给团队执行的项目包。

Skill 会先整理具体内容，再集中补影响下一步的关键问题。它区分已经观察到的事实、主美确认的决定、Agent 建议和真正待定的事项，不用一套空问卷代替专业建项。

主美最终得到五份同源手册：

| 手册 | 团队用它做什么 |
|---|---|
| 资料索引 | 找到当前版本、规则、参考、样板和待定事项 |
| 项目定位 | 理解受众、使用场景、视觉目标与制作范围 |
| 设计规范 | 读取全局语言、类别、家族、实体身份、固定项与变量 |
| 交付与验收 | 明确首件、源文件、导出、组合和渠道检查 |
| 参考与反例 | 知道每份资料参考什么、不继承什么、批准到什么范围 |

## 团队怎样调用

项目包带有自己的 `SKILL.md`、结构化规范、可读手册、引用资料、运行工具和内容指纹。成员可以把整个包交给自己的 Agent，然后直接描述本次任务：

> 按这个项目的 HUD 家族制作按钮三态首件，沿用主美规则与参考，准备实际尺寸和组合检查。

或者：

> 用这次活动的商品、图形、文字和 UI 组件，做横幅与竖版海报。保持商品与信息身份，按渠道重排，交付可编辑源和组合验证。

Agent 会把任务绑定到固定版本和对应家族，生成制作说明、参考清单、交接要求及逐项检查。家族混淆、错版、缺件和未检查项会保持可见；单件通过后仍需检查最终组合。

## 评审怎样回到规则

评审把问题落到四层：项目视觉语言、资产或组件身份、本次任务范围、技术与交付规格。单件问题留在单件，家族共同问题回到代表样板，只有跨家族的共同变化才由主美评估并形成下一版基线。

## 运行要求与离线安装

也可以从 [v0.5.1 Release](https://github.com/NewenergyEric/art-director-skill/releases/tag/v0.5.1) 下载母 Skill ZIP。核心工具需要 Python 3.10+ 且只使用标准库；图片尺寸与透明像素检查另可安装 Pillow。Remotion 只用于仓库展示片，不影响 Skill 日常使用。

## 可运行的公开案例

| 入口 | 证明什么 |
|---|---|
| [18 秒空间介绍](https://newenergyeric.github.io/art-director-skill/docs/showcase.html#film) | 一份项目视觉记忆怎样连接作品、规则、团队与交付 |
| [产品方法](https://newenergyeric.github.io/art-director-skill/docs/landing.html) | 主美如何建立、样板如何校准、团队如何从同一版本继续 |
| [主美工作台](https://newenergyeric.github.io/art-director-skill/docs/workbench.html) | 从资料、定位、家族、样板到项目包、成员制作和迭代的完整路径 |
| [港湾工作室](examples/harbor-studio-draft/guides/00-index.md) | 游戏项目的 8 个家族、样板计划、任务与团队接包 |
| [周末轻饮](examples/campaign-studio-draft/guides/00-index.md) | 商品、图形、文字、UI 与多渠道组合的同源规范 |
| [成员任务示例](https://newenergyeric.github.io/art-director-skill/docs/member-workbench.html) | 单件任务、探索范围、版本冻结和组合调用 |
| [团队生产动画](https://newenergyeric.github.io/art-director-skill/docs/team-production.html) | 角色、场景、棋子、道具、UI、动效和外包并行 |
| [实际调用路径](https://newenergyeric.github.io/art-director-skill/docs/call-flow.html) | 每一步对应的文件、工具与判断边界 |

这些案例都是原创候选草案。方向图不会被冒充为已批准样板，参考图的像素尺寸也不会自动变成正式交付规格。

有实际项目经验？[分享你的规范、交接过程与验证结果](https://github.com/NewenergyEric/art-director-skill/issues/new?template=showcase.yml)，帮助下一位主美判断它是否适合自己的团队。

## 项目包与工具

```text
project-art-direction/
├── SKILL.md               # 团队 Agent 入口
├── style-pack.json        # 唯一事实源
├── STYLE.md               # 团队可读规范
├── guides/                # 定位、设计系统、交付、参考说明
├── references/            # 获准共享的项目资料
├── scripts/               # 构建、任务、版本与批次工具
├── agents/                # Agent UI 元数据
└── manifest.json          # 文件清单和内容指纹
```

核心命令由 Agent 调用，设计师无需手写 JSON 或记住 CLI：

```sh
python scripts/style_pack.py validate examples/harbor-studio-draft
python scripts/style_pack.py render examples/harbor-studio-draft
python scripts/style_pack.py build examples/harbor-studio-draft --out NEW_PACK
python scripts/project_runtime.py init --pack NEW_PACK --out MEMBER_WORKSPACE --allow-draft
python scripts/team_batch.py check BATCH_JSON --pack NEW_PACK --out NEW_REPORT_JSON
```

构建、归档和任务快照默认拒绝原地覆盖。正式发布检查要求真实批准依据、必要样板与关键规格；候选包可以用于探索和试接，但不会因此获得生产批准。

## 验证状态

- 108 项确定性测试覆盖规范源、交叉引用、家族/组件绑定、版本冻结、搬迁、批次交付、路径边界、内容指纹和拒绝覆写。
- Python 3.10 / 3.12 × Windows / Linux 的 GitHub Actions 矩阵持续运行；Remotion 与 CodeQL 独立检查。
- 两套完整案例生成 10 份手册，并从独立解压包建立 6 个成员任务；30 条流程断言通过。
- 独立 Agent 从一张原创方向图建立了定位、8 个家族、22 条候选规则、5 项样板计划和可交接项目包。

[查看 v0.5 验收记录](evals/director-workflow-v0.5/acceptance.md) · [查看实现说明](docs/director-workflow-v0.5.md) · [查看当前 CI](https://github.com/NewenergyEric/art-director-skill/actions)

[本轮可用性复核](evals/2026-10-review.md) · [GitHub 同类参考](docs/github-reference-scan.md)

结构和工具检查证明工作流契约成立，不代替真实艺术质量、PS/Figma 编辑、引擎或渠道集成、负责人批准及真人团队效率实验。

## 安全与边界

项目包工具在本地运行，不读取密钥、不发送遥测，也不自动上传项目材料。它不会把填写的审批人字段当成真实授权，不会自动判断审美好坏，也不会把概念图仅凭观感宣布为生产资产。

[阅读 Security 声明](SECURITY.md) · [私密报告漏洞](https://github.com/NewenergyEric/art-director-skill/security/advisories/new) · [MIT License](LICENSE)

## 仓库结构

```text
├── SKILL.md              # 母 Skill 入口
├── references/           # 主美、成员、评审和团队方法
├── templates/            # 方向、任务、批次、交付与变更模板
├── scripts/              # 项目包、运行时、批次和试点工具
├── examples/             # 原创项目草案与成员工作区
├── tests/                # 确定性行为测试
├── evals/                # 公开验证证据
├── docs/                 # 互动工作台、调用图与实现说明
├── motion/               # Remotion 展示片源码
└── assets/readme/        # README 媒体
```

由 Eric 与 Agents 一起制作。
