# 资料索引与样板计划

项目 `tidekeeper` / 版本 `0.3.0` / 源状态 `draft`

交付状态：草案交付，尚未经 release 构建。

规范指纹：`fc586948fa3f8e059f42c5710729e4aa531e1781f0ffe91f0ef2104842e21e3a`

由 style-pack.json 派生。修改规范请修改源文件并重建新版本；本手册不是独立审批或第二份规范源。unknown / proposed / planned / candidate 都不等于已确认，未明确参数不得推测为专业定值。

## 入口与责任

主美建立定位、视觉语言、类别/家族与代表样板，再确认交付和发布；成员接收同一个包，按类别与家族创建任务。

- [项目定位](01-positioning.md)
- [美术与组件规范](02-design-system.md)
- [交付与验收](03-delivery-review.md)
- [参考与反例](04-reference-guide.md)
- [规范源](../style-pack.json)
- [完整规范](../STYLE.md)
- [团队执行入口](../SKILL.md)

## 当前缺口

- 真实主美是否接受本版视觉方向与样板？
- 真实手机、目标棋盘密度、引擎格式与性能尚未验收。
- 分层编辑源、角色多视角与地图行走动画不在本次交接切片内。

## 代表样板计划

样板数量和职责由项目决定；计划或候选不能冒充批准样板。组合样板可覆盖多个家族，仍须分别检查各家族要求。

### sample-dialogue · 剧情角色首件 · candidate
用途：新动作延续同一身份
覆盖家族：dialogue
发布前必需：是
材料：TK-CHAR
验收：
- 约5.5头身；对话立绘用途
- 实际输出与首件并排看；在目标使用画面复查。
审批记录：null

### sample-workshop · 灯房修复首件 · candidate
用途：同地点状态变体
覆盖家族：workshop
发布前必需：是
材料：TK-MAP
验收：
- 同机位与结构
- 实际输出与首件并排看；在目标使用画面复查。
审批记录：null

### sample-light-chain · 灯具合成链首件 · candidate
用途：L1到L4升级和格内识别
覆盖家族：light-chain
发布前必需：是
材料：TK-LAMPS, TK-L2
验收：
- 同材料、镜头、光源
- 实际输出与首件并排看；在目标使用画面复查。
审批记录：null

### sample-orders · 订单与棋盘首件 · candidate
用途：真实可用的状态组件
覆盖家族：orders
发布前必需：是
材料：TK-UI, TK-UI-KIT, TK-FONT, TK-UI-SHOT
验收：
- 层级、状态语义与文字源
- 实际输出与首件并排看；在目标使用画面复查。
审批记录：null
