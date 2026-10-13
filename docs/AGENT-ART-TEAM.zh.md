[English](AGENT-ART-TEAM.en.md) · [返回介绍](landing.zh.html#cases)

# 用两个可玩样例检查美术交接

两款游戏都使用 Art Director 与制作配套 Skill，各自有独立的视觉方向。共同的方法把规范接到明确的资产任务、实际制作和游戏内组合检查；并不要求不同游戏采用同一画风。

## 潮灯小镇：重燃灯塔

[试玩](assets/tidekeeper-playable/play.html) · [下载 0.5.0 运行包](assets/tidekeeper-playable/tidekeeper-lighthouse-0.5.0.zip)

用七个合成家族完成订单，修栈桥、修灯塔木构件、安装透镜、注油点灯，最后迎接归船并领奖。0.5.0 候选版支持保存、撤销、重来与减少动态；免费补给足以完成全程。

扩展沿用 0.3.0 视觉基线。灯塔改造来自用户明确的任务要求，各场景从同一首件定向编辑。新道具有逐件生成记录；两张移动了栈桥木桩的场景未采用，原图仍保留。两段木工叙事沿用已有八帧修缮姿态；安装、点灯和招呼仍是静态姿势，本轮没有新增角色动画。

制作者检查了实际棋盘、订单、图鉴及桌面和手机视口，覆盖材料提交、存档、补给券与奖励时机。正常速度四章通关没有时间注入、跳过或状态改写，冻结 ZIP 也另行解压运行。检查环境是 Windows Chromium 与触摸模拟，不代表真实 iOS/Android、Mac 或生产引擎验收。

各场景的树叶、玻璃和高光仍有局部差异，修缮帧中仍有轻微手指、衣褶和木板漂移。手机开场侧重码头特写，施工聚焦和第二章才完整展示塔体。目前没有金币商店或长期经济系统。

[道具生成](assets/tidekeeper-playable/art/expansion/generation-props.md) · [场景编辑与未采用稿](assets/tidekeeper-playable/art/expansion/generation-scenes.md) · [字体来源与覆盖](assets/tidekeeper-playable/font-source.md) · [灯塔状态对照](assets/tidekeeper-playable/lighthouse-states.png)

<details>
<summary><strong>此前 0.4.0：第一盏归航灯</strong></summary>

[下载冻结的 0.4.0 运行包](assets/tidekeeper-playable/tidekeeper-first-light-0.4.0.zip)

第一段流程包括合成木料、交订单、修栈桥、合成灯具、点亮港湾与迎接归船。旧 ZIP 保留该版本；当前试玩入口已更新为 0.5.0。

主 Agent 沿用 Tidekeeper 0.3.0 草案，负责美术方向、生成与组合；成员分担玩法、制作审查和字体。运行包保留 18 张旧素材，新增八帧修缮姿势，沿用同一授权字体补齐新文案。第五帧的接触事件与扬尘共用动作时间轴。旧规范包、旧运行版本均未改写。

制作者记录了 30 项浏览器检查、正常速度通关和独立解压运行，覆盖触摸、键盘、拖动、刷新、跳过及只发放一次的 105 金币。仓库回归初次有八项子进程超时，按原超时限制单独复跑通过；没有把初次失败写成全绿。这与母 Skill 当前 CI 分开记录。

公开 ZIP 的 SHA-256 为 `036bbfd1134d3833e2d7195a200e0bac3875b3d39234f8d2cefd44141ca0498d`。导入文件与归档逐件核对，18 张复用图与母仓库字节一致。

[实际生成与修正](assets/tidekeeper-playable/art/generation-record.md) · [早期制作证据](TIDEKEEPER-PRODUCTION.md)

</details>

## 暮林守望：探索与布防

[试玩](assets/duskwood-watch/index.html) · [下载项目包](assets/duskwood-watch/project-pack.zip)

在手绘林地提灯巡行，在同一张地图守过四夜。采集物资、给灯添油、建造和升级防御设施，再用物品应对变化。移动光源能破除暗甲，灯下会改变攻速，光照同时参与美术表现和实际规则。

三名制作 Agent 共用冻结的 0.3.0 包，分别负责武器、世界/物品/UI、角色动作；主 Agent 负责地图、标题、玩法、灯光、组合与检查。先记录兼容迁移到 0.3.1，再整合成 0.4.0 草案，生成记录仍保留各自来源版本。这是共享上下文的协作试作，不是团队盲测。

标题采用手刻质感的生成美术字，动态 UI 文字全部使用本地 Noto Sans SC。武器底座与瞄准、释放帧分开；守灯人的步态跟随实际行走距离，提灯和手杖绑定手臂。不同敌人分别使用展翅、身体伸缩或根腿运动。

制作者完成四夜，并实测点击建造与升级、光暗护甲、物品、添油、失败重开、暂停/帮助及全屏。项目包另行换目录校验、运行。正常速度录像从准备好的情境开始，不冒充连续通关录像。

守灯人仍是侧面骨架，没有完整方向转面；镜像会改变提灯在屏幕上的一侧，帧间仍有小幅脚部接触跳动。根甲卫步态较克制，武器只有瞄准/释放状态，没有完整装填过渡。没有存档或手机专用界面，项目仍是未获真人主美批准的草案。

紧凑项目 ZIP 包含规范、运行美术与可编辑源码。全量原始生成、失败稿、提示词和脚本保留在独立案例交付中，下面链接公开的选定记录。早期 0.2.1 包与制作批次继续作为历史版本保留。

[制作记录](assets/duskwood-watch/production-record.md) · [组合检查](assets/duskwood-watch/integration-review.md) · [迁移记录](assets/duskwood-watch/evidence/v2/actors/pack-migration.json) · [标题与 UI 字体](assets/duskwood-watch/evidence/v2/typography/receipt.json) · [正常速度片段](assets/duskwood-watch/gameplay.mp4)

[冻结包哈希与导入检查](assets/sample-imports.json)记录公开的潮灯 0.5.0 与暮林 0.4.0 归档。

## 实作如何反馈到 Skill

| 实际问题 | 方法或工具的改进 |
|---|---|
| 动作任务可能丢失角色身份 | 同版 character/entity 与 motion 任务书明确关联。 |
| 生成网格越界，停走切换时角色大小跳变 | 实测裁切、保持同一倍率、配准根点与接触点，再检查状态转换。 |
| 命中效果、完成物和奖励时序混乱 | 共用帧时长与接触事件，区分材料提交、动作完成和奖励结算。 |
| 新文案缺字，字体脱离场景 | 在实际界面检查字形覆盖、层级和状态，字体服务于本项目画风。 |
| 成员把资源写到不同目录 | 任务同时给 Skill、包指纹、工作目录和唯一输出根。 |
| Windows 相对输出路径误判 | 修正包工具与打包工具的路径解析，新增外部输出及规范包保护回归。 |

交付保留生成源、失败稿与候选状态。技术检查、Agent 看图与真人主美批准分开记录；真机、生产引擎和长期玩法平衡未完成验收。公开 24 秒影片另有六姿势修缮研究，不计入潮灯运行包的八帧交付。
