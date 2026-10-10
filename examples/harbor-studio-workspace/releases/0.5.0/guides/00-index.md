# 资料索引与样板计划

项目 `harbor-studio` / 版本 `0.5.0` / 源状态 `draft`

交付状态：草案交付，尚未经 release 构建。

规范指纹：`6c0e0e9ae893db942198b590fdee9911e92133d7c50c5d92cb7237a9cb2f2d75`

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

- 确认目标玩家与设备环境
- 建立各家族代表样板与真实批准记录
- 确认字体、尺寸、锚点和动效格式
- 指定首件与组合评审责任人、批次节奏和预算

## 代表样板计划

样板数量和职责由项目决定；计划或候选不能冒充批准样板。组合样板可覆盖多个家族，仍须分别检查各家族要求。

### direction-board · 全局方向讨论板 · candidate
用途：给主美看整体形状、色彩和类别关系。
覆盖家族：项目整体
发布前必需：否
材料：PB-STYLE-BOARD
验收：
- 说明借鉴部分和不继承的细节
- 所有判断仍为候选
审批记录：null

### character-first · 角色身份与两种姿态首件 · planned
用途：验证身份与衣装、姿态变量可分离。
覆盖家族：courier-character
发布前必需：是
材料：待建立
验收：
- 对照精细脸部和转面
- 新姿态仍是同一人
- 实际交付尺度与透明边缘
审批记录：null

### street-first · 核心场景与角色比例 · planned
用途：校准尺度、镜头和前后层级。
覆盖家族：street-scenes, courier-character
发布前必需：是
材料：待建立
验收：
- 人物与入口比例合理
- 棋盘位置可读
- 图层可独立交接
审批记录：null

### hud-first · 真实 UI 组件三态及合成页 · planned
用途：先验证可用界面再扩展组件。
覆盖家族：hud-controls, ui-type
发布前必需：是
材料：待建立
验收：
- 真实文字长度和字形
- 三态可辨
- 不靠放大图判定可读性
审批记录：null

### item-chain · 道具状态链与棋盘组合 · planned
用途：从基础、激活到结束检查静动一致。
覆盖家族：boosters, match-tiles, feedback-effects
发布前必需：是
材料：待建立
验收：
- 升级和激活保留结构
- 相邻物件可辨
- 效果不遮挡关键反馈
审批记录：null

### campaign-first · 活动主视觉与两种渠道重排 · planned
用途：让游戏内与宣传图像共用判断。
覆盖家族：campaign-layout, ui-type
发布前必需：是
材料：待建立
验收：
- 真实文案与安全区
- 横竖重排保持信息优先级
- 组合中的角色仍符合身份
审批记录：null
