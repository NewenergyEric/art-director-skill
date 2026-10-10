<p align="right"><strong>中文</strong> · <a href="README.en.md">English</a></p>

# Art Director

### 一个团队/项目，一份视觉记忆。

**主美不用反复解释，团队有据可依。**

把散落的参考图、设计规范和主美批注，整理成项目专属的 Skill。主美跟着 Agent 逐步建立规则；成员拿到项目包，在自己的 Agent 里接着做。角色、场景、UI、商品和海报，都从同一套规范出发。

<a href="https://newenergyeric.github.io/art-director-skill/docs/landing.html#film"><picture>
  <source media="(prefers-reduced-motion: reduce)" srcset="assets/readme/depth-preview-zh.jpg?v=agent-first-20261010">
  <img src="assets/readme/depth-preview-zh.gif?v=agent-first-20261010" width="100%" alt="24 秒功能演示：整理参考、建立规范与样板、打包给团队、按规则制作、检查偏差并返修。">
</picture></a>

<p align="center"><sub>24 秒，看一次完整协作 · <a href="https://newenergyeric.github.io/art-director-skill/docs/landing.html#film">播放清晰版</a> · <a href="docs/assets/motion/depth-showcase-zh.mp4">下载 MP4</a></sub></p>

## 装好，然后直接说

在支持 Agent Skills 的工具中安装，例如 Codex、Claude Code 或 Cursor：

```sh
npx skills add https://github.com/NewenergyEric/art-director-skill
```

日常工作都在你的 Agent 中完成。把资料放进它能读取的文件夹，再说出要做的事。

### 我是主美，要把规范建立起来

> 使用 `$art-director`。这是现有作品、参考和批注。先帮我整理一版美术规范，再一步步补齐角色、场景和 UI 组件的要求，做代表样板让我确认，最后打包给团队。

**你会得到：** 有具体内容的规范初稿、需要你决定的问题，以及可交接的项目包。资料不齐也可以开始；Agent 会先整理已有内容，再补问影响下一步的问题。

你可以像和设计同事交流一样修改：“按钮要更厚实，禁用态降低饱和度”“角色比例沿用这张，服装可以变”。Agent 将这些判断整理进规范，保持手册和项目包同步。

### 我是成员，要按主美的规则做设计

先把主美分发的**完整项目包**交给 Agent，再说：

> 读取这个项目包。按里面的 UI 规范做按钮的默认、按下、禁用三态。先给我首件，说明沿用了哪些规则，以及还有什么要检查。

**你会得到：** 带着项目版本、相关规则和参考的制作任务，以及首件和检查记录。之后可以继续说“把这组三态放回主界面检查”，不用重新解释项目风格。

具体设计由 Agent 调用当前可用的生成或编辑工具完成。Skill 负责把规范接到制作过程；它本身不附带绘图模型或设计软件。

### 已有结果，要检查和修改

> 对照项目规范检查这批资产，把不一致的位置、依据和修改建议列出来。先修正这一个按钮，再看同类组件有没有同样的问题。

**你会得到：** 能执行的返修清单，区分视觉问题、技术问题和暂时没检查的内容。影响整个项目的变化交回主美确认，再发布新版。

## 它把哪些事连起来

| 你现在要做的事 | Skill 帮你推进到哪里 |
|---|---|
| 参考很多，还没形成规范 | 整理项目定位、整体风格、各类资产和组件要求 |
| 文字说不清，团队理解有分歧 | 用代表样板与实际组合校准，把确认的判断记下来 |
| 新成员或外包加入 | 分发包含规范、样板、参考和交付要求的项目包 |
| 多人同时制作 | 每个任务沿用明确版本，保留固定项与允许变化 |
| 交付风格不一，反复返工 | 对照规则检查，给出具体修正依据，记录共性问题 |

“视觉记忆”就是这些共同依据。**让交付保持一致，不是让每张图长得一样。**

## 主美最后交给团队什么

一份可以直接压缩分发的项目包，包含：

- **五份可读手册：** 资料索引、项目定位、设计规范、交付与验收、参考与反例。
- **项目专属 Skill：** 让成员的 Agent 知道本项目要沿用什么、可以改变什么。
- **项目资料与版本记录：** 相关参考、样板、工具和文件清单一起走，不依赖原来的聊天记录。

已有规范可以接着完善，不必从头重建。新版本由主美发布；进行中的任务保留原来的版本，避免做到一半规则变了。

## 看两份实际项目包

[港湾工作室 · 游戏美术](examples/harbor-studio-draft/guides/00-index.md)：角色、场景、UI、物品家族如何写进同一套规范。

[周末轻饮 · 活动设计](examples/campaign-studio-draft/guides/00-index.md)：商品、图形、文案、UI 与横竖版物料如何一起交付。

两份都是可运行的虚构项目草案。动画是流程示意，所用作品为原创候选素材，不代表已获主美批准。

<details>
<summary><strong>安装要求、离线包与技术文档</strong></summary>

核心工具需要 Python 3.10+，使用标准库；像素检查可另装 Pillow。也可从 [Release](https://github.com/NewenergyEric/art-director-skill/releases/latest) 下载 Skill ZIP。成员需要收到主美导出的完整项目包，仅安装通用 Skill 不会自动获得项目资料。

设计师用自然语言工作，文件整理和命令由 Agent 处理。

[详细上手说明](docs/HUMAN-GUIDE.md) · [Agent 与工程接入](docs/AGENT-GUIDE.md) · [Skill 入口](SKILL.md) · [项目包契约](references/pack-contract.md)

```sh
python scripts/style_pack.py validate examples/harbor-studio-draft
python scripts/style_pack.py build examples/harbor-studio-draft --out NEW_PACK
```

</details>

<details>
<summary><strong>验证情况与能力边界</strong></summary>

108 项确定性测试覆盖项目包、规则关联、版本冻结、交付检查和搬迁使用。Python 3.10 / 3.12 在 Windows / Linux 上持续验证，展示片与 CodeQL 独立检查。

[当前 CI](https://github.com/NewenergyEric/art-director-skill/actions) · [可复核的验收记录](evals/director-workflow-v0.5/acceptance.md)

这些检查验证文件和工作流程，不代替主美的审美判断、真实软件或引擎中的效果验收。未知规格、候选方案和未检查内容会保持可见。

项目包工具在本地运行，不自动上传项目材料。使用生成或编辑服务时，按宿主工具和你的授权处理资料。

</details>

[MIT License](LICENSE) · [安全说明](SECURITY.md) · [分享使用反馈](https://github.com/NewenergyEric/art-director-skill/issues/new?template=showcase.yml)

由 Eric 与 Agents 一起制作。
