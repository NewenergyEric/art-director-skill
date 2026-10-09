<p align="right"><strong>中文</strong> · <a href="README.en.md">English</a></p>

<p align="center">
  <a href="https://github.com/NewenergyEric/art-director-skill/actions/workflows/ci.yml"><img alt="Validate skill" src="https://github.com/NewenergyEric/art-director-skill/actions/workflows/ci.yml/badge.svg"></a>
  <a href="https://github.com/NewenergyEric/art-director-skill/actions/workflows/codeql.yml"><img alt="CodeQL" src="https://github.com/NewenergyEric/art-director-skill/actions/workflows/codeql.yml/badge.svg"></a>
  <a href="LICENSE"><img alt="MIT License" src="https://img.shields.io/badge/license-MIT-151715.svg"></a>
  <img alt="Python 3.10+" src="https://img.shields.io/badge/Python-3.10%2B-3272b8.svg">
</p>

<picture>
  <source media="(prefers-reduced-motion: reduce)" srcset="assets/readme/art-director-still-zh.png">
  <img src="https://github.com/NewenergyEric/art-director-skill/releases/download/v0.2.0/art-director-hero-zh.gif" width="100%" alt="美术总监与团队在同一个项目系统里完成素材分组、模板切换、批量生产与评审的 30 秒动画。">
</picture>

<p align="center"><sub>▲ 30 秒双语 Remotion 成片 · 连续镜头、七类生产模板、四条团队产线 · <a href="https://github.com/NewenergyEric/art-director-skill/releases/download/v0.2.0/art-director-hero-zh.mp4">下载带声音的 MP4</a></sub></p>

# Art Director

> ## 一套方向，要带得动整支团队。

多人协作的视觉项目，总会同时推进很多东西。游戏里是角色、场景、棋子、道具、UI、技能和动效；电商与品牌项目里，是主视觉、商品元素、价格组件、活动海报和不同渠道的尺寸版本。真正难的往往不是再出一张图，而是让每个人都知道：**哪些不能丢，哪里可以变，这一轮到底要改什么。**

Art Director 把这些判断留在项目里。总监继续决定什么是好看、什么适合这个项目；团队拿到适合自己产线的任务；Agent 从已经确认的版本继续，不必每次回到一句模糊提示词。

它是一套可安装的 Agent Skill，也是一组能真正运行的本地工具：从参考与反馈中建立项目规则，先验证小批，再展开生产，最后交付可迁移、可核验、可继续更新的项目 Skill。

`Codex` · `Claude Code` · `Cursor` · 其他支持 Agent Skills 的工具

## 它解决的不是一张图，而是整条生产线

| 团队现场 | Art Director 留下什么 | 下一轮怎么用 |
|---|---|---|
| 总监说“感觉不对” | 分开记录画风、身份、本次任务和技术规格 | 修改落到具体层级，不牵连无关规则 |
| 角色、UI、道具、技能同时推进 | 为每类素材编译独立任务书，共用同一项目版本 | 各产线各做各的事，但不会各长各的样子 |
| 消除类或 LiveOps 要大量状态与变体 | 素材家族、状态矩阵、首件门槛和抽查记录 | 先看代表小批，确认后再放大产量 |
| 新成员、外包或 Agent 接手 | 带证据的 `STYLE.md`、`SKILL.md`、任务卡和版本差异 | 从确认过的判断继续，不靠转述猜方向 |
| 规范发生变化 | 保留旧版本、变更原因、影响范围与确认记录 | 知道什么变了，也知道什么没有变 |

---

## 同一套方法，不限定一种画风

伪 3D、美漫、传统绘画、收藏卡牌风，对造型、材质、线条、留白和信息密度的要求完全不同。Art Director 不拿一组通用形容词硬套所有画面，而是把同一份项目判断拆给不同职能：物品设计师拿到资产家族，角色与场景拿到身份边界，UI 拿到组件和状态，执行者拿到本轮任务与交付规格。

<p align="center"><img src="https://github.com/NewenergyEric/art-director-skill/releases/download/v0.2.0/style-directions-zh.gif" width="100%" alt="伪 3D 物品家族、美漫任务简报、国风卡牌家族和绘制收藏卡牌四种视觉系统连续切换。"></p>

画风可以变，团队使用的链路保持清楚：**项目基线 → 分工任务书 → 资产家族或模板 → 首件评审 → 批量与版本。** 游戏是仓库里最完整的案例；同样的结构也能用于多人协作的 UI 系统、电商促销、活动海报、社媒模板与多尺寸渠道适配。

## 七类素材，一套项目判断

角色、道具、UI、技能/VFX，以及消除、解谜、桌游系统需要不同的任务结构。Art Director 不把它们塞进同一条长提示词，而是从项目基线编译出各自能执行的制作模板。

<p align="center"><img src="https://github.com/NewenergyEric/art-director-skill/releases/download/v0.2.0/template-switch-zh.gif" width="100%" alt="角色、道具、UI、技能、消除、解谜与桌游七种生产模板连续切换。"></p>

每条规则都说明适用对象、硬要求或建议、允许变化、证据与检查办法。角色身份不会误写成全局画风；一次动作要求也不会悄悄变成所有人的共享规范。

## 先看小批，再让团队放大产量

大批量生产最怕把错误理解复制几十次。新的资产家族先做首件，方向成立后，角色/场景、UI/HUD、道具/物品、技能/VFX 再沿同一版本进入各自产线。

<p align="center"><img src="https://github.com/NewenergyEric/art-director-skill/releases/download/v0.2.0/team-pipeline-zh.gif" width="100%" alt="角色、UI、道具、技能四条产线从任务、首件、评审走向批量。"></p>

每个批次会留下范围、素材家族、状态、规格、首件、抽查结果和返工原因。单件失误回到单件，家族共同问题回到样板，只有跨家族的共同变化才升级项目基线。

## 把“感觉不对”变成团队能改的地方

评审先问四件事：它像不像这个项目？还是不是这个角色或道具？这一轮到底要改什么？文件能不能进入生产？

<p align="center"><img src="https://github.com/NewenergyEric/art-director-skill/releases/download/v0.2.0/review-lens-zh.gif" width="100%" alt="评审镜头依次检查画风、身份、本次任务和技术规格。"></p>

艺术判断、技术检查和未检查项分别记录。尺寸通过不等于画面通过，概念图好看也不等于已经满足引擎规格。

---

## 安装

```sh
npx skills add https://github.com/NewenergyEric/art-director-skill
```

核心 CLI 需要 Python 3.10+，只使用标准库。读取图片尺寸和透明像素时可选安装 Pillow。Remotion 展示片需要 Node.js 20+ 与 FFmpeg，不影响 Skill 的日常使用。

安装后可以直接这样说：

> 使用 `$art-director`。先看项目已经确认的参考和最近评审，把画风、角色或道具身份、本轮任务、技术规格分开记录。先给我一小批最能暴露问题的样板，确认后再为角色、UI、道具和技能产线生成任务包。

[打开调用路径](https://newenergyeric.github.io/art-director-skill/) · [读取 Skill 入口](SKILL.md) · [查看虚构演示包](examples/moss-harbor-draft)

## 五分钟跑通一次

仓库附带一个虚构的“苔港”草案。它故意保留缺失参考、待确认规则和未验证工具，用来展示系统在证据不足时怎样工作。

```sh
python scripts/style_pack.py validate examples/moss-harbor-draft

python scripts/style_pack.py brief examples/moss-harbor-draft \
  --category character \
  --entity lin \
  --task "林蹲在码头修理灯具"
```

建立自己的项目包：

```sh
cp templates/style-pack.template.json my-project/style-pack.json
python scripts/style_pack.py render my-project
python scripts/style_pack.py build my-project --out dist/my-project-0.1.0
python scripts/style_pack.py verify dist/my-project-0.1.0
```

Windows PowerShell 把 `cp` 换成 `Copy-Item`。发布已确认基线时，为 `validate` 和 `build` 加上 `--release`；缺少真实确认、证据或引用文件时，发布检查会停下来并指出具体缺口。

## 一份项目包里有什么

```text
project-art-style/
├── style-pack.json   # 唯一事实源
├── STYLE.md          # 团队可读的项目规范
├── SKILL.md          # 新会话与 Agent 的入口
├── manifest.json     # 文件清单与内容指纹
├── references/       # 获准共享的参考与判断依据
├── scripts/          # 包内验证与任务书工具
└── agents/           # Agent UI 元数据
```

项目包可以复制、归档和核验。成员不需要得到总监原来的聊天记录，也能看到当前版本、适用范围、已确认事项、待判断问题和本次任务。

## 两个本地工具

### `style_pack.py` · 项目包生命周期

`validate`、`render`、`brief`、`build`、`verify`、`archive` 和 `diff` 覆盖从工作副本到固定发布快照的完整路径。默认拒绝覆盖已有构建和归档，并检查路径逃逸、软链接、大小写碰撞、内容指纹与意外文件。

### `pilot.py` · 真实材料与试点证据

`intake` 盘点交付材料，`check-image` 读取实际图片的尺寸和透明信息，`summarize` 分开汇总 Agent 模拟与真人团队记录。它不会生成图片，也不会把技术通过冒充艺术通过。

## 已经验证了什么

- Python 3.10 / 3.12、Windows / Linux 的确定性测试矩阵。
- 数据结构、交叉引用、路径边界、软链接、大小写碰撞、拒绝覆写、构建搬迁和内容指纹。
- 无图像工具时的回退、只拿项目包评审、从模糊意图建立讨论草案等行为情境。
- Remotion 的十个中英文动态 Composition 与一张社交预览均可编译，母片与四套风格输出按 14 个关键帧做视觉审查。
- Darwin 九维审计、三组代表任务与优化前后配对复核，见 [审计报告](docs/darwin-audit-v0.2.md)。

完整证据见 [验证报告](docs/validation-report.md)、[首轮试点准备](docs/round-01-report.md) 与 [专家复核](docs/expert-review-v0.2.md)。结构检查通过只说明文件和记录满足契约；真实画风一致性、引擎可用性和团队效率仍要在实际项目中验证。

## 安全与数据流

项目包工具在本地运行，不调用远程 API、不读取密钥、不发送遥测。仓库逐项公开了网络边界、子进程、文件写入和删除范围，并启用 CodeQL、Dependabot 与私密漏洞报告。

[阅读完整 Security 声明](SECURITY.md) · [私密报告漏洞](https://github.com/NewenergyEric/art-director-skill/security/advisories/new)

## 当前边界

- 不自带图像模型、LoRA、引擎插件或付费生成服务。
- 不从文件名、提示词或填写的审批人字段推断真实授权。
- 不自动判断审美好坏；它让判断有证据、有范围、能进入下一轮工作。
- 不把概念图仅凭观感声明为可直接进入引擎的资产。
- 不用一个总分掩盖身份错误、技术失败或未检查项。

## 仓库结构

```text
├── SKILL.md              # 母 Skill 入口
├── agents/               # Agent UI 元数据
├── references/           # 按任务读取的方法
├── templates/            # 风格包、任务卡与评审记录
├── scripts/              # 项目包、试点与媒体渲染工具
├── examples/             # 虚构演示项目
├── tests/                # 确定性测试
├── evals/                # 行为验证与审计任务
├── motion/               # Remotion 源码与原创视觉素材
├── docs/                 # 协议、研究与验证报告
└── assets/readme/        # 静态回退图与社交预览
```

## 研究依据

这套方法吸收了真实游戏资产管线里反复出现的结构：资产类型与导入预设、稳定元数据、模块化 UI/VFX、批量校验、版本控制和首件门槛。研究摘要与官方来源见 [游戏美术生产研究](docs/game-production-research.md)。

## License

[MIT](LICENSE) — 可以使用、修改、分发和用于商业项目，但需保留版权与许可声明。

由 Eric 与 Agents 一起制作。这里保存的是能继续使用的方法，也是总监与团队共同形成的项目记忆。
