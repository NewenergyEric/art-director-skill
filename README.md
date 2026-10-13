<p align="right"><strong>中文</strong> · <a href="README.en.md">English</a></p>

[**Game Dev Skills**](https://github.com/NewenergyEric/NewenergyEric/blob/main/GAME-DEV-SKILLS.md) · [市场研究](https://github.com/NewenergyEric/game-market-intelligence) · [游戏拆解](https://github.com/NewenergyEric/game-reverse-analyst) · [制作管理](https://github.com/NewenergyEric/game-production-manager) · **美术总监**

# Art Director

### 一个团队/项目，一份视觉记忆。

**单张都不错，放在一起却不像同一款游戏？**

Art Director 帮主美把参考、作品和批注，变成团队能沿用的设计规范。先做代表样板，再扩展角色、物品、场景和 UI；每次制作都带上该项目的规则、参考与检查要求。个人制作，也能把上次做对的判断留给下一次。

<a href="https://newenergyeric.github.io/art-director-skill/docs/landing.html#film"><picture>
  <source media="(prefers-reduced-motion: reduce)" srcset="assets/readme/depth-preview-zh.jpg?v=production-20261013">
  <img src="assets/readme/depth-preview-zh.gif?v=production-20261013" width="100%" alt="24 秒潮灯小镇：主美建立规范，成员接包续作四类资产，组合、操作、返修。">
</picture></a>

<p align="center"><sub>24 秒：从主美建规范，到成员交付 · <a href="https://newenergyeric.github.io/art-director-skill/docs/landing.html#film">播放清晰版</a> · <a href="docs/assets/motion/depth-showcase-zh.mp4">下载 MP4</a> · <a href="docs/CASE-STUDIES.md">看案例与检查记录</a></sub></p>

## 装好，在你的 Agent 里开始

```sh
npx skills add https://github.com/NewenergyEric/art-director-skill --skill art-director
```

在支持 Agent Skills 的工具里使用，例如 Codex、Claude Code 或 Cursor。把资料放进 Agent 能读取的文件夹，然后直接说：

> 使用 `$art-director`。这是我们的玩法、参考图、已有作品和主美批注。先梳理视觉方向，做一件代表样板；再带我补齐各类资产与组件的要求，打成团队能直接使用的项目包。

已有规范就接着完善，不必重做。绘图与编辑由 Agent 调用当前可用工具完成；Skill 不附带图像模型。

## 同一份规范，下一位能接着做吗？

![潮灯小镇：同一角色的不同姿势与完整灯具升级链，按项目规范继续。](docs/assets/tidekeeper-campaign/team-world.png)

我们用 **潮灯小镇** 做了一次完整交接：先建立角色、灯房、灯具与 UI 样板，打包后在新目录开始五个任务，继续制作阿澜的新动作、灯房修复状态、L3/L4 灯具和新订单。

**第一次没有全通过。** 道具和角色能接上，UI 却像空卡片；横版场景放进竖屏，还裁掉了门窗。于是把这些问题带回规范：补齐订单角色、资源图标、修缮材料、按钮状态和竖版适配，再把实际输出放进同一画面检查。

<p align="center">
  <img src="docs/assets/tidekeeper/lamp-l1.png" width="21%" alt="L1 口袋油灯">
  <img src="docs/assets/tidekeeper/lamp-l2.png" width="21%" alt="L2 手提风灯">
  <img src="docs/assets/tidekeeper/lamp-l3.png" width="21%" alt="L3 圆镜探照灯">
  <img src="docs/assets/tidekeeper/lamp-l4.png" width="21%" alt="L4 小小航标灯">
</p>

现在，交木料会触发修缮，交灯具后点亮夜晚，再招呼补给船靠岸。角色动作、昼夜、扬尘、灯光和水纹跟着同一段故事变化。**一致性要在连续的使用画面里成立。**

[看前次交接与修正](docs/TIDEKEEPER-HANDOFF.md) · [试试修缮、点灯与归航](https://newenergyeric.github.io/art-director-skill/docs/assets/tidekeeper-production/play.html) · [本轮生成与交付记录](docs/TIDEKEEPER-PRODUCTION.md)

![同一项目规范下的修缮、点灯与归航；共享场景配方。](docs/assets/tidekeeper-production/states-proof.png)

这是一位 Agent 在隔离目录里的交接自测，素材为原创候选；真实主美审阅、设备与引擎验收仍待进行。[此前的冒险场景、建筑升级与灯具探索](docs/CASE-STUDIES.md)也保留了原稿和修改记录。

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

## 两个 Skill，一份项目规范

| 你现在要做的事 | 使用哪个入口 | 得到什么 |
|---|---|---|
| 建立方向、样板、类别与验收要求 | **art-director** | 可分发的专业项目包 |
| 接包后连续生成、组合与交付 | **game-art-production**（可选） | 任务依赖、场景配方、检查记录与分层文件 |

先让首件成立，再组织生产。新制作 Skill 读取同一项目包，能发现缺素材、旧版本和下游依赖变化；不会另立一份画风规范。普通资产交付可以直接使用，可编辑场景则能导出给 [Compositor](https://github.com/robbietilton/Compositor)。

```sh
npx skills add https://github.com/NewenergyEric/art-director-skill --skill game-art-production
```

也可[下载制作 Skill ZIP](https://newenergyeric.github.io/art-director-skill/downloads/game-art-production.zip)，然后说：

> 使用 `$game-art-production`，读取这个完整项目包。继续做修缮动作、傍晚场景和归航效果，先检查同屏比例与接触点，再交付可继续编辑的分层场景。

潮灯案例已有 **19 张美术素材、27 项受检查的资产与依赖、5 个场景配方**。生成使用 Agent 的图像工具；Compositor 负责图层编辑，不生成图片或播放游戏动画。目前验证了文件格式与换目录交付，Mac 原生打开尚未验证。[查看制作 Skill](skills/game-art-production/SKILL.md) · [下载本轮候选交付包](docs/assets/tidekeeper-production/tidekeeper-production-0.3.0.zip)

## 为什么做这个

这个 Skill 起于和一位主美朋友的讨论。他在意角色的气质、画面的感觉，也在意游戏里人与人的连接；但许多时间花在重复解释参考、组件与返工原因。

我想让这些判断跟着作品交到下一位手里。主美保留创作与判断，Agent 负责整理、关联与交接。从这个问题出发，又连接到市场研究、竞品拆解和制作安排，成为 Game Dev Skills。

<!-- Testimonial reserved: no customer endorsement is claimed. -->

<details>
<summary><strong>项目包、说明书与安装要求</strong></summary>

核心工具需要 Python 3.10+，使用标准库；像素检查可另装 Pillow。也可[下载当前 Skill ZIP](https://newenergyeric.github.io/art-director-skill/downloads/art-director.zip?v=production-20261013)。仅安装通用 Skill，不会自动获得团队私有资料。

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
