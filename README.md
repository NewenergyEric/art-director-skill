<p align="right"><strong>中文</strong> · <a href="README.en.md">English</a></p>

[**Game Dev Skills**](https://github.com/NewenergyEric/NewenergyEric/blob/main/GAME-DEV-SKILLS.md) · [市场研究](https://github.com/NewenergyEric/game-market-intelligence) · [游戏拆解](https://github.com/NewenergyEric/game-reverse-analyst) · [制作管理](https://github.com/NewenergyEric/game-production-manager) · **美术总监**

# Art Director

### 一个团队/项目，一份视觉记忆。

**单张都不错，放在一起却不像同一款游戏？**

Art Director 帮主美把参考、作品和批注，变成团队能沿用的设计规范。先做代表样板，再扩展角色、物品、场景和 UI；每次制作都带上该项目的规则、参考与检查要求。个人制作，也能把上次做对的判断留给下一次。

<a href="https://newenergyeric.github.io/art-director-skill/docs/landing.html#film"><picture>
  <source media="(prefers-reduced-motion: reduce)" srcset="assets/readme/depth-preview-zh.jpg?v=game-art-20261013">
  <img src="assets/readme/depth-preview-zh.gif?v=game-art-20261013" width="100%" alt="24 秒原创游戏美术案例：建立样板、扩展灯具家族、检查棋盘合成、定向返修与项目包交接。">
</picture></a>

<p align="center"><sub>24 秒：从样板到成套资产 · <a href="https://newenergyeric.github.io/art-director-skill/docs/landing.html#film">播放清晰版</a> · <a href="docs/assets/motion/depth-showcase-zh.mp4">下载 MP4</a> · <a href="docs/CASE-STUDIES.md">看案例与检查记录</a></sub></p>

## 装好，在你的 Agent 里开始

```sh
npx skills add https://github.com/NewenergyEric/art-director-skill
```

在支持 Agent Skills 的工具里使用，例如 Codex、Claude Code 或 Cursor。把资料放进 Agent 能读取的文件夹，然后直接说：

> 使用 `$art-director`。这是我们的玩法、参考图、已有作品和主美批注。先梳理视觉方向，做一件代表样板；再带我补齐各类资产与组件的要求，打成团队能直接使用的项目包。

已有规范就接着完善，不必重做。绘图与编辑由 Agent 调用当前可用工具完成；Skill 不附带图像模型。

## 看作品，也看它解决了什么

### 01 · 合成链，不能只是换四种颜色

![潮灯小镇：灯匠修复航标的原创游戏主视觉。](docs/assets/cases/tidekeeper.jpg)

<p align="center">
  <img src="docs/assets/cases/lantern-l1.png" width="22%" alt="Tidekeeper L1">
  <img src="docs/assets/cases/lantern-l2.png" width="22%" alt="Tidekeeper L2">
  <img src="docs/assets/cases/lantern-l3.png" width="22%" alt="Tidekeeper L3">
  <img src="docs/assets/cases/lantern-l4.png" width="22%" alt="Tidekeeper L4">
</p>

从海港样板扩展出四件独立道具：**同镜头、同光源、同材料；不同等级，有不同轮廓。** 再放到 64 / 96 px 的合成试验里看是否分得清。

[看原稿、修正版与透明检查](docs/CASE-STUDIES.md#tidekeeper) · [打开实际规则源](examples/tidekeeper-draft/style-pack.json)

### 02 · 场景很漂亮，玩家却找不到路

![荆棘信使：小角色、清楚的树枝路径与暖光目的地。](docs/assets/cases/bramble.jpg)

角色用浅雾衬出轮廓，路径横贯中景，目的地留下暖光。**画风不只是一组关键词，还包括玩家先看见什么。**

[看手绘冒险的设计判断](docs/CASE-STUDIES.md#bramble)

### 03 · 升级建筑，别升级成另一个项目

![赤砂补给站：保留入口、建造语汇与镜头的三级建筑升级概念。](docs/assets/cases/depot.jpg)

从小屋到水塔、风泵，让功能扩展改变体量。风轮数量不对，就只修风轮；保留已经成立的建筑体系。

[看定向修改与剩余检查](docs/CASE-STUDIES.md#depot)

以上是实际生成的原创候选案例，包含 Agent 看图自查与文件实测。棋盘为合成示意；真实设备、引擎导入与主美生产验收另行记录。

## 从主美的判断，到团队的交付

1. **先整理已有内容。** 参考借鉴哪里、什么不能变，Agent 先写出具体初稿。
2. **用样板确定方向。** 看形状、比例、材料与用途，发现偏差就针对性修改。
3. **把规则带到任务。** 项目包包含规范、样板、参考、版本与交付要求，成员在自己的 Agent 中接着做。
4. **放回使用场景检查。** 不只看单张，还看家族关系、实际尺寸与组合；共性问题回到规范。

你最后交给团队的是五份可读手册、项目专属 Skill 和相关资料，能直接压缩分发。进行中的任务保留原版本，新任务使用已发布的新版本。

成员拿到主美的**完整项目包**后可以说：

> 按这版规范扩展两级灯具，保持镜头、光源和材料，让升级轮廓更清楚。先给我首件，再放回棋盘检查。记录沿用的规则与还没验证的内容。

主美也可以继续说：

> 这张太写实，海面细节抢了修灯动作。只简化表面和背景，保留人物身份、手部接触与空间关系，然后对照原稿复查。

## 为什么做这个

这个 Skill 起于和一位主美朋友的讨论。他在意角色的气质、画面的感觉，也在意游戏里人与人的连接；但许多时间花在重复解释参考、组件与返工原因。

我想让这些判断跟着作品交到下一位手里。主美保留创作与判断，Agent 负责整理、关联与交接。从这个问题出发，又连接到市场研究、竞品拆解和制作安排，成为 Game Dev Skills。

<!-- Testimonial reserved: no customer endorsement is claimed. -->

<details>
<summary><strong>项目包、说明书与安装要求</strong></summary>

核心工具需要 Python 3.10+，使用标准库；像素检查可另装 Pillow。也可[下载当前 Skill ZIP](https://newenergyeric.github.io/art-director-skill/downloads/art-director.zip?v=game-art-20261013)。仅安装通用 Skill，不会自动获得团队私有资料。

[人类上手说明](docs/HUMAN-GUIDE.md) · [Agent 与工程接入](docs/AGENT-GUIDE.md) · [Skill 入口](SKILL.md) · [游戏美术质量流程](references/game-art-quality.md)

[潮灯首件草案](examples/tidekeeper-draft/style-pack.json) · [港湾工作室完整建项示例](examples/harbor-studio-draft/guides/00-index.md) · [品牌与活动设计示例](examples/campaign-studio-draft/guides/00-index.md)

```sh
python scripts/style_pack.py validate examples/tidekeeper-draft
python scripts/style_pack.py build examples/tidekeeper-draft --out NEW_PACK
```

</details>

<details>
<summary><strong>验证与边界</strong></summary>

[当前 CI](https://github.com/NewenergyEric/art-director-skill/actions) · [原创案例证据](docs/CASE-STUDIES.md) · [项目工作流验收](evals/director-workflow-v0.5/acceptance.md)

结构与文件检查不代替艺术判断，视觉自查不代替主美批准。项目包工具在本地运行；使用生成服务时，按宿主工具和你的授权处理资料。

</details>

[告诉我，你在哪一步卡住](https://github.com/NewenergyEric/art-director-skill/issues/new?template=showcase.yml) · [MIT](LICENSE) · [安全说明](SECURITY.md)

由 Eric 与 Agents 一起制作。

## 四个岗位，共同做出值得做的游戏

个人制作者可以轮流承担四个岗位；团队通过同一份资料交接：什么值得做、竞对做了什么、资源和体量如何评估，以及如何创作自己的核心美术。

[岗位如何交接证据、范围与美术资产](docs/WORKFLOW.md) · [四岗位总览](https://github.com/NewenergyEric/NewenergyEric/blob/main/GAME-DEV-SKILLS.md)

| 眼前的问题 | 从这个岗位开始 | 带到下一步的资料 |
|---|---|---|
| 什么值得做？ | [市场研究](https://github.com/NewenergyEric/game-market-intelligence) | 机会比较、来源与验证缺口 |
| 竞对做了什么？ | [游戏拆解](https://github.com/NewenergyEric/game-reverse-analyst) | 规则、实现依据与资产 BOM |
| 做得起，也做得完吗？ | [制作管理](https://github.com/NewenergyEric/game-production-manager) | SOW、工作包、依赖与验收 |
| 核心美术如何建立？ | [美术总监](https://github.com/NewenergyEric/art-director-skill) | 共享规范、代表样板与项目包 |

**个人创作者：** 从当前卡住的问题开始，按需要切换岗位。**团队：** 用实际报告、BOM、工作包和美术规范交接；每一步保留来源、版本与未定项。

这是协作方法，当前没有自动串行执行四个 Agent 的编排器。

![市场研究、竞品拆解、项目评估与核心美术创作；样板与成本反馈推动前序决定修订。](docs/assets/workflow/workflow-zh.png)
