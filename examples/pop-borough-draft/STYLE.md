# 泡泡街区 Pop Borough（虚构团队量产演示草案） · 项目美术规范

项目：`pop-borough` · 版本：`0.1.0` · 状态：`draft`
交付状态：草案交付 / 尚未经过 release 构建
内容指纹：`414e047bd52f77735bddb4ae60d92113fc475aa0241442e1b89ad62bb54cc65f`

本文件由 style-pack.json 生成。修改源 JSON 后在未发布的工作副本中重新 render；不能把本文件的改写当作规范变更或总监批准。

## 意图

用轻量美式报刊与周日漫画的清晰轮廓、扁平色块和日光街区，探索消除游戏跨团队持续生产。Mira 是原创街区送货员。所有视觉规则、色值、尺寸与时长均为候选提案，不代表总监审批或性能验证。

- 先读懂棋盘，再欣赏细节
- 不同成员以同一套可说明的判断工作
- 角色、棋子与道具变化时保留身份和用途
- 版本、来源与未完成检查跟随每个交付项

### 避免

- 通过复杂纹理、体积光或密集碎片掩盖轮廓
- 各制作线自行切换到写实、厚涂或立体塑料质感
- 只靠颜色区分棋子
- 把样板板中的角色小图直接当成已确认身份图
- 把模型字形当作真实UI文字
- 把计划数量、模拟收件或脚本通过写成真实量产完成

## 适用范围

```json
{
  "medium": "2d",
  "view": "正视棋盘与轻微偏侧的日光街区；具体透视为待确认提案",
  "target_platform": "移动端消除游戏的演示假设；设备、引擎与性能预算尚未验证",
  "asset_types": [
    "character",
    "environment",
    "tile",
    "prop",
    "ui",
    "motion"
  ]
}
```

## 色彩与字体

```json
{
  "colors": {
    "coral": "#F47C6A",
    "mint": "#80CDA8",
    "yellow": "#FFD66B",
    "blue": "#7BAFE8",
    "ink": "#25303E",
    "paper": "#FFF4DB",
    "flower_pink_proposed": "#ED9CB5"
  },
  "fonts": {
    "body": {
      "family": "待确认支持中文与拉丁字母的圆润无衬线实际字体",
      "fallback": "由项目确认字形覆盖、授权与备用字体"
    },
    "numbers": {
      "family": "待确认清楚区分0/O与1/I的数字字体",
      "fallback": "随实际UI排版测试确认"
    }
  }
}
```

## 规则

### STYLE-01 · must · proposed

适用：global

候选风格采用轻量美式报刊与周日漫画气氛：宽松清晰轮廓、扁平色块、友善日光和可辨识的简化形体。

原因：让多条生产线共享可观察的风格判断。

允许变化：

- 主体可有少量幽默夸张，但不改变用途和整体可读性

依据：PB-STYLE-BOARD, PB-ART-DIRECTION
检查方式：visual

### PALETTE-01 · must · proposed

适用：global

以暖奶油paper为底、深蓝灰ink为描边，主体使用coral、mint、yellow、blue；粉花可使用flower_pink_proposed候选色。新增颜色应说明用途与取舍。

原因：限制色彩分歧，同时允许五种棋子双重识别。

允许变化：

- 同色的阴影明度可变化，需记录实际色值
- 背景可降低饱和度以衬托棋盘

依据：PB-ART-DIRECTION
检查方式：visual

### LINE-01 · must · proposed

适用：global

深蓝灰轮廓保持连续、宽松和清楚，内部细节少于外形信息；线宽随显示尺度统一调整，不能逐张随意改变。

原因：同批资产在缩小后仍像同一套作品。

允许变化：

- 背景内部线可比交互主体更轻
- 外轮廓可有轻微手绘起伏

依据：PB-STYLE-BOARD, PB-ART-DIRECTION
检查方式：visual

### SHADE-01 · must · proposed

适用：global

采用基色加一级块状阴影的两级明暗，不依靠连续渐变或真实反射塑造体积。

原因：降低风格漂移与小尺寸视觉噪声。

允许变化：

- 极小高光可作为功能或材质提示，但不能增加复杂明暗层次

依据：PB-ART-DIRECTION
检查方式：visual

### READ-01 · must · proposed

适用：global

在任务实际显示尺度、背景和相邻资产中检查轮廓与层级；仅看放大单图不能记录为可读性通过。

原因：资产最终服务连续游戏画面。

允许变化：

- 不同类别可使用各自的合成场景，需保留观察证据

依据：PB-ART-DIRECTION
检查方式：human

### REF-01 · must · proposed

适用：global

候选样板板只表达共同风格范围，不是任何角色、棋子或道具的已确认身份图；复用具名实体时应另建真实identity参考并检查。

原因：风格相似不能证明同一对象的身份已锁定。

允许变化：

- 身份参考缺失时可制作文字约束下的候选，但必须保留未验证标记

依据：PB-ART-DIRECTION
检查方式：human

### CHAR-01 · must · proposed

适用：character

原创送货员Mira的候选固定特征为短深蓝头发、珊瑚色短夹克、米色围巾和薄荷小挎包；动作与表情变化保留这四项。

原因：区分同一角色的姿态制作与重新设计。

允许变化：

- 表情、朝向、手势和携带邮包可按任务变化
- 遮挡固定特征时应提供可辨认该特征的其他视图

依据：PB-ART-DIRECTION
检查方式：visual

### CHAR-02 · should · proposed

适用：character

姿态用清楚的大动作表达，面部细节节制；角色与棋盘同屏时不能占据关键操作区域。

原因：角色支持街区故事和反馈，同时保留游戏焦点。

允许变化：

- 独立胜利画面可扩大动作幅度，需在对应任务写明

依据：PB-ART-DIRECTION
检查方式：visual

### ENV-01 · must · proposed

适用：environment

背景采用日光、圆角街区与店铺；以清楚入口和少量生活道具表达店铺用途，棋盘后方留低细节区域。

原因：各场景可更换叙事内容，同时持续支持棋盘识别。

允许变化：

- 店招形状、货物与街角摆设可变化
- 真实店名文字另行排版

依据：PB-STYLE-BOARD, PB-ART-DIRECTION
检查方式：visual

### ENV-02 · should · proposed

适用：environment

同批场景保持一致日光方向和视线高度，背景反差低于棋子；变化先在合成图中评估。

原因：降低关卡切换时的视觉跳变。

允许变化：

- 特殊时间或天气作为另立任务的候选，不自动扩展本批规则

依据：PB-ART-DIRECTION
检查方式：visual

### TILE-01 · must · proposed

适用：tile

五种棋子使用红苹果、绿叶、黄星、蓝水滴、粉花的双重识别；保持圆润的各自轮廓，不将其统一为只换色的圆球，也不添加五官。

原因：形状和颜色共同承载种类识别，减少只靠颜色的歧义。

允许变化：

- 小幅手绘轮廓起伏和一级阴影可变化
- 选中或消除状态不能替换种类轮廓

依据：PB-ART-DIRECTION
检查方式：visual

### TILE-02 · must · proposed

适用：tile

选中态保留基础棋子的完整轮廓，以统一外圈和轻微位移表达状态；候选64px显示下外圈宽度为2px，此数值尚未在目标设备验证。

原因：状态识别与棋子种类识别应同时成立。

允许变化：

- 可在实际尺寸试验后提交外圈宽度变更，变更需形成新版本

依据：PB-ART-DIRECTION
检查方式：human

### PROP-01 · must · proposed

适用：prop

纸风车以折叠纸叶片和短柄、木槌以圆角木锤头和握柄、邮包以盒体和折盖表达用途；静止、激活和包装变体保留关键结构。

原因：内制母版与外包变体共享同一物件身份。

允许变化：

- 授权任务可改配色、表面图案或开启状态
- 结构变化须作为重新设计提案

依据：PB-ART-DIRECTION
检查方式：visual

### PROP-02 · must · proposed

适用：prop

外包变体逐项绑定指定母版、规范版本和指纹；依赖母版缺失时只制作候选探索，不能将样板板截取图当成已确认母版。

原因：外包作为交付角色使用相同规则，避免追溯链中断。

允许变化：

- 包装与配色可在任务明确范围内变化

依据：PB-ART-DIRECTION
检查方式：technical

### UI-01 · must · proposed

适用：ui

按钮和面板使用简洁圆角、深色细描边和清楚层级，图标与文字分别制作；棋盘操作区不被装饰侵占。

原因：界面继承漫画气氛并保持操作清楚。

允许变化：

- 主次按钮可用填色和面积区分
- 圆角与边距数值在目标屏幕试排后确认

依据：PB-STYLE-BOARD, PB-ART-DIRECTION
检查方式：visual

### TYPE-01 · must · proposed

适用：ui

UI中文、拉丁字母、数字与标点使用真实字体单独排版，检查来源、语言覆盖、真实字数和实际尺寸；模型生成的字形不作为交付文字。

原因：可读文字与可维护组件需要真实排版信息。

允许变化：

- 字体选择、字号与字重可作为有依据的候选提交

依据：PB-ART-DIRECTION
检查方式：human

### MOTION-01 · must · proposed

适用：motion

每套动效明确anticipation预备、burst爆点、settle收束三个阶段，以弹性小爆点和短暂反馈服务操作结果。

原因：统一动作语法便于批量制作和比较。

允许变化：

- 三阶段的时长可按操作语义调整，并逐套记录
- 无效交换以回弹收束，不冒充成功消除

依据：PB-ART-DIRECTION
检查方式：visual

### MOTION-02 · must · proposed

适用：motion

动效避免遮挡棋盘；单棋消除的候选峰值包围盒不超过棋格1.25倍，并以叠加回放检查邻格与结果可见性；该数值不代表实测性能或通过验收。

原因：持续消除时玩家仍需读懂相邻棋子和下一步。

允许变化：

- 直线消除可沿目标行列延伸，但不能以满屏粒子替代清楚的结果反馈
- 修改覆盖范围需新版本和受影响动效复查

依据：PB-ART-DIRECTION
检查方式：human

### MOTION-03 · must · proposed

适用：tile, motion

动作只改变位置、缩放、旋转与允许的短暂变形；不得给无五官的静态棋子新增眼睛或嘴，也不得重设计种类轮廓。

原因：动作变化不应造成身份变化；样板生成中出现过星棋子动效新增五官的真实候选问题。

允许变化：

- 局部碎片和弹性变形应在收束时回到规定结果，需逐帧观察

依据：PB-ART-DIRECTION
检查方式：visual

### DELIVERY-01 · must · proposed

适用：global

每个交付项携带asset_id、task_id、项目id、规范版本与实际指纹，并记录实际工具、参考来源、可用设置、文件位置和未完成检查。

原因：批次可追溯，成员接续工作时能判断所用依据。

允许变化：

- 工具不返回模型版本或seed时明确记录unknown或null，不猜测

依据：PB-ART-DIRECTION
检查方式：technical

### REVIEW-01 · must · proposed

适用：global

分别记录版本门、艺术门与工程门的检查；无证据、未查看或未测试均不能记为通过。模拟数据和draft包不得转述为总监批准或真实量产交付。

原因：让可复查的机器检查与需要实际观察的判断保持清楚。

允许变化：

- 不适用项可标not_applicable并写理由；不影响其他适用项

依据：PB-ART-DIRECTION
检查方式：human

## 参考资产

style 控制画风；identity 控制同一对象身份；composition 控制构图；material 控制材质；context 检查实际场景与尺寸；counterexample 仅说明应避免的结果；font 提供字体依据。候选参考不可冒充已批准参考。

- `PB-STYLE-BOARD` · style · candidate · `references/style-board.png`
  适用：global；说明：实际生成的候选综合样板板。只作为轻量漫画风格提案，不是实体identity参考、已批准母版或性能证明。
  来源：{"type": "generated_candidate", "source": "本次虚构案例的真实图像生成调用", "generation_record_path": "references/style-board-generation.json", "rights_note": "原创方向提案；未完成独立权利审查，未获得真实项目总监审批"}

- `PB-ART-DIRECTION` · context · candidate · `references/team-art-direction.md`
  适用：global；说明：实际存在的文本方向参考，记录七线协作语境、候选规则、参考用途与检查界限。它不替代视觉观察和身份设定图。
  来源：{"type": "authored_text", "source": "本次受托编写的虚构团队生产案例", "rights_note": "新增原创文本方向提案；非总监批准"}

## character

制作原创送货员Mira的八种候选姿态；保留文字身份约束，等待单独身份设定图。

固定约束：

- 短深蓝头发
- 珊瑚色短夹克
- 米色围巾
- 薄荷小挎包
- 统一轮廓与两级明暗

可变范围：

- 表情
- 朝向
- 手势
- 携带邮包

技术规格（仅作为项目要求，CLI 不对生成资产自动检测这些项目）：

```json
{
  "status": "proposed_not_validated",
  "deliverable": "candidate_sprite_and_editable_source",
  "canvas_px": [
    512,
    512
  ],
  "background": "transparent",
  "anchor": "统一脚底锚点，位置待实测确认",
  "identity_reference": "missing; style board is not an identity reference",
  "target_display_px": null
}
```

## environment

制作六个日光圆角街区背景，保留棋盘和信息区的低细节空间。

固定约束：

- 日光方向一致
- 圆角店铺形体
- 入口可辨
- 棋盘后方低细节

可变范围：

- 店铺用途
- 货物
- 店招形状
- 街角生活细节

技术规格（仅作为项目要求，CLI 不对生成资产自动检测这些项目）：

```json
{
  "status": "proposed_not_validated",
  "deliverable": "candidate_layered_background",
  "canvas_px": [
    1600,
    900
  ],
  "layers": [
    "sky",
    "far_buildings",
    "street",
    "foreground"
  ],
  "board_safe_area": "待实际布局与设备确认",
  "engine_integration": "not_tested"
}
```

## tile

制作红苹果、绿叶、黄星、蓝水滴、粉花各基础和选中两态，以颜色和轮廓共同识别。

固定约束：

- 五种独立轮廓
- 种类与候选色对应
- 无五官
- 共同锚点
- 选中态保留本体

可变范围：

- 允许范围内的状态外圈
- 轻微手绘轮廓起伏

技术规格（仅作为项目要求，CLI 不对生成资产自动检测这些项目）：

```json
{
  "status": "proposed_not_validated",
  "deliverable": "candidate_rgba_tile_states",
  "canvas_px": [
    256,
    256
  ],
  "proposed_display_px": [
    64,
    64
  ],
  "proposed_selected_ring_px_at_display": 2,
  "anchor": "center",
  "background": "transparent",
  "checks": [
    "目标尺寸合成",
    "相邻棋子并排",
    "灰度观察",
    "透明边缘"
  ]
}
```

## prop

制作纸风车、木槌和邮包的基础状态与外包配色包装变体。

固定约束：

- 关键功能结构
- 母版与变体可追溯
- 统一轮廓与两级明暗

可变范围：

- 指定配色
- 表面包装
- 激活或开启状态

技术规格（仅作为项目要求，CLI 不对生成资产自动检测这些项目）：

```json
{
  "status": "proposed_not_validated",
  "deliverable": "candidate_master_and_variants",
  "canvas_px": [
    256,
    256
  ],
  "background": "transparent",
  "anchor": "center; master and variants must match",
  "external_delivery": "逐资产记录母版来源、任务id、版本和指纹",
  "source_master_status": "planned_not_delivered"
}
```

## ui

制作八个候选组件，真实文字另排，清楚呈现操作层级。

固定约束：

- 简洁圆角
- 深色细描边
- 文字图形分层
- 不侵占棋盘操作区

可变范围：

- 按钮填色
- 主次层级
- 真实字体与字号提案

技术规格（仅作为项目要求，CLI 不对生成资产自动检测这些项目）：

```json
{
  "status": "proposed_not_validated",
  "deliverable": "candidate_component_and_text_layout",
  "target_language": [
    "zh-CN",
    "en"
  ],
  "font_file": null,
  "dimensions": "按实际布局另行确认",
  "nine_slice": "按组件逐项确认，不预设已适配",
  "engine_integration": "not_tested"
}
```

## motion

制作六套三阶段弹性反馈；逐套回放检查棋盘遮挡和身份连续性。

固定约束：

- anticipation/burst/settle三个阶段
- 小爆点
- 结果可辨
- 静态实体身份不变

可变范围：

- 各阶段时长
- 允许的短暂变形
- 反馈强度

技术规格（仅作为项目要求，CLI 不对生成资产自动检测这些项目）：

```json
{
  "status": "proposed_not_validated",
  "deliverable": "candidate_motion_package_with_timeline",
  "proposed_duration_ms_range": [
    160,
    280
  ],
  "proposed_preview_fps": 30,
  "proposed_single_pop_peak_cell_ratio": 1.25,
  "stages": [
    "anticipation",
    "burst",
    "settle"
  ],
  "format": "待引擎、骨骼或序列帧方案确认",
  "performance_validation": "not_performed"
}
```

## 实体身份

```json
[
  {
    "id": "mira",
    "kind": "character",
    "identity_rules": [
      "CHAR-01"
    ],
    "reference_ids": [],
    "fixed_features": [
      "短深蓝头发",
      "珊瑚色短夹克",
      "米色围巾",
      "薄荷小挎包"
    ],
    "variations": [
      "表情",
      "朝向",
      "手势",
      "携带邮包"
    ]
  },
  {
    "id": "tile-apple",
    "kind": "tile",
    "identity_rules": [
      "TILE-01",
      "TILE-02",
      "MOTION-03"
    ],
    "reference_ids": [],
    "fixed_features": [
      "圆润苹果轮廓",
      "红色候选基色",
      "无五官"
    ],
    "variations": [
      "基础态",
      "选中态",
      "允许的短暂变形"
    ]
  },
  {
    "id": "tile-leaf",
    "kind": "tile",
    "identity_rules": [
      "TILE-01",
      "TILE-02",
      "MOTION-03"
    ],
    "reference_ids": [],
    "fixed_features": [
      "圆润叶片轮廓",
      "绿色候选基色",
      "无五官"
    ],
    "variations": [
      "基础态",
      "选中态",
      "允许的短暂变形"
    ]
  },
  {
    "id": "tile-star",
    "kind": "tile",
    "identity_rules": [
      "TILE-01",
      "TILE-02",
      "MOTION-03"
    ],
    "reference_ids": [],
    "fixed_features": [
      "圆角五角星轮廓",
      "黄色候选基色",
      "无五官"
    ],
    "variations": [
      "基础态",
      "选中态",
      "允许的短暂变形"
    ]
  },
  {
    "id": "tile-drop",
    "kind": "tile",
    "identity_rules": [
      "TILE-01",
      "TILE-02",
      "MOTION-03"
    ],
    "reference_ids": [],
    "fixed_features": [
      "圆润水滴轮廓",
      "蓝色候选基色",
      "无五官"
    ],
    "variations": [
      "基础态",
      "选中态",
      "允许的短暂变形"
    ]
  },
  {
    "id": "tile-flower",
    "kind": "tile",
    "identity_rules": [
      "TILE-01",
      "TILE-02",
      "MOTION-03"
    ],
    "reference_ids": [],
    "fixed_features": [
      "花瓣轮廓",
      "粉色候选基色",
      "无五官"
    ],
    "variations": [
      "基础态",
      "选中态",
      "允许的短暂变形"
    ]
  },
  {
    "id": "pinwheel",
    "kind": "prop",
    "identity_rules": [
      "PROP-01",
      "PROP-02"
    ],
    "reference_ids": [],
    "fixed_features": [
      "折叠纸叶片",
      "短柄",
      "母版结构保持"
    ],
    "variations": [
      "静止",
      "激活",
      "指定配色"
    ]
  },
  {
    "id": "mallet",
    "kind": "prop",
    "identity_rules": [
      "PROP-01",
      "PROP-02"
    ],
    "reference_ids": [],
    "fixed_features": [
      "圆角木锤头",
      "握柄",
      "母版结构保持"
    ],
    "variations": [
      "静止",
      "激活",
      "指定配色"
    ]
  },
  {
    "id": "parcel",
    "kind": "prop",
    "identity_rules": [
      "PROP-01",
      "PROP-02"
    ],
    "reference_ids": [],
    "fixed_features": [
      "盒体",
      "折盖",
      "母版结构保持"
    ],
    "variations": [
      "关闭",
      "开启",
      "表面包装配色"
    ]
  }
]
```

## 制作配方

```json
[
  {
    "id": "candidate-reference-production",
    "tool": "目标环境中已授权的参考图生成或编辑工具",
    "model": "unknown",
    "capabilities": [
      "reference-image",
      "edit"
    ],
    "instructions": "先查看候选样板与方向文本，读取当前类别和全局规则。具名实体缺少identity图时明确交付候选，不宣称身份锁定。用任务书仅增加本次允许的变化，保存真实工具回执和未经伪造的设置；工具缺失时交付制作任务书。",
    "reference_ids": [
      "PB-STYLE-BOARD",
      "PB-ART-DIRECTION"
    ],
    "limitations": [
      "样板生成调用不等于50项量产配方经过验证",
      "当前没有已批准的identity参考",
      "尚未验证目标引擎、字体和性能预算",
      "工具返回能力决定能记录的模型、seed和设置，缺失项不可推定"
    ],
    "status": "untested"
  }
]
```

## 决策记录

```json
[
  {
    "id": "DEMO-TEAM-01",
    "decision": "用泡泡街区承载七线团队持续生产演示，保留苔港作为复杂风格与意图策略示例。",
    "rationale": "简单清楚的消除游戏资产便于看懂数量、依赖、版本与逐项检查。",
    "status": "proposed",
    "source": "本次用户要求下新增的虚构案例；不是真实游戏项目审批"
  },
  {
    "id": "DEMO-TEAM-02",
    "decision": "首批计划50项，六条内制类别线与一条外包prop变体线使用同一候选基线。",
    "rationale": "通过枚举asset_id让计划和回传可核对；外包沿用相同美术类别与检查标准。",
    "status": "proposed",
    "source": "production/roster.json与production/batch-plan.json中的示范计划；无实际交付"
  },
  {
    "id": "DEMO-TEAM-03",
    "decision": "批次接收分别检查版本、艺术证据与工程证据；修订时按影响范围重新出任务书。",
    "rationale": "错版本不应无差别推翻整批，未完成视觉判断也不能由哈希检查替代。",
    "status": "proposed",
    "source": "虚构生产流程设计；真实检查结果由实际运行报告记录"
  }
]
```

## 待决问题

- 需要真实美术总监确认方向、规则和参考用途
- 需要Mira、五种棋子与三种道具的正式身份参考和母版
- 需要确认设备、显示尺度、棋盘布局、分辨率和透明边缘要求
- 需要实际字体选择、字符覆盖测试与资源授权记录
- 需要选择生产工具并验证候选配方在批量变化下的表现
- 需要明确动效导出方案、时长预算、遮挡标准和引擎性能测试
- 需要真实团队确认责任人、交付时点与检查证据责任

## 审批记录

```json
null
```

审批字段及证据文件只证明存在该记录；本工具不验证审批者身份、授权、资产权利或美术质量。
