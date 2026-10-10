# 港湾工作室 · 团队游戏资产体系 · 项目美术规范

项目：`harbor-studio` · 版本：`0.5.0` · 状态：`draft`
交付状态：草案交付 / 尚未经过 release 构建
内容指纹：`6c0e0e9ae893db942198b590fdee9911e92133d7c50c5d92cb7237a9cb2f2d75`

本文件由 style-pack.json 生成。修改源 JSON 后在未发布的工作副本中重新 render；不能把本文件的改写当作规范变更或总监批准。

## 意图

把轻量漫画方向组织成八个制作家族，以样板和首件校准，再交给角色、场景、棋子、UI、道具、动效、排版和宣传成员并行生产。方向来自已有原创候选板，专业判断为供评审的提案。

- 玩家先看懂操作与反馈
- 同一角色和物件跨状态保留身份
- 用首件与组合验证后再扩批
- 探索结果可以提升后续基线

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
  "target_platform": "移动游戏场景及活动宣传；目标设备、语言和渠道尺寸待验证",
  "asset_types": [
    "character",
    "environment",
    "tile",
    "prop",
    "ui",
    "motion",
    "layout",
    "typography"
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

综合板表达候选视觉语言，左上人物另登记为候选身份区域；它不替代精细转面、真实 UI、首件或组合的批准样板。

原因：风格相似不能证明同一对象的身份已锁定。

允许变化：

- 身份参考缺失时可制作文字约束下的候选，但必须保留未验证标记

依据：PB-ART-DIRECTION
检查方式：human

### CHAR-01 · must · proposed

适用：character

Mira 的候选身份是深蓝短侧分波波头、暖肤与原参考的脸部比例；衣装不是永久身份，指定换装时开放衣装槽位。

原因：区分同一角色的姿态制作与重新设计。

允许变化：

- 任务开放的衣装、表情与动作
- 遮挡五官时补可比较的视图

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
  适用：global；说明：原有原创 Pop Borough 综合板，供讨论整体风格；不是已批准首件，也不是可直接使用的独立图集。
  来源：{"type": "existing_generated_original", "source": "原创 Pop Borough 候选参考；逐字节复用，未编辑"}

- `PB-ART-DIRECTION` · context · candidate · `references/director-source-notes.md`
  适用：global；说明：Agent 整理的原创项目讨论稿，记录使用情境与关键待定项。
  来源：{"type": "authored_demo", "source": "本次原创工作流示范"}

- `HS-IDENTITY` · identity · candidate · `references/identity-candidate.png`
  适用：character；说明：仅取综合板左上角色及其头像的候选身份线索；该文件与风格板字节相同，模型输入按哈希去重。脸部精度、转面未验证。
  来源：{"type": "existing_generated_original", "source": "同一原创综合板的人物区域；未裁切、未批准"}

## character

在同一候选角色下制作换装或姿态提案，再实际检查身份与风格。

固定约束：

- 同一候选人物的脸部与头发识别线索
- 轻量美式漫画轮廓、色系与块状阴影

可变范围：

- outfit
- pose
- expression
- composition

技术规格（仅作为项目要求，CLI 不对生成资产自动检测这些项目）：

```json
{
  "status": "proposed_not_validated",
  "candidate_canvas_px": [
    1024,
    1024
  ],
  "final_canvas_px": null,
  "background": "transparent for the requested standalone asset; verify actual alpha after generation",
  "editable_source": "实际 PS 或其他制作源待交付",
  "identity_reference_status": "candidate composite region only; no approved detailed turnaround",
  "required_checks": [
    "参考与新图并排看脸和头发",
    "服装与姿态是否符合任务",
    "实际目标尺寸、透明边缘、锚点",
    "可编辑源和导出一致性",
    "实际组合环境"
  ]
}
```

任务变量与探索预算（由 project_runtime 校验；不会覆盖身份或固定规则）：

```json
{
  "slots": {
    "outfit": {
      "default": "珊瑚短夹克、奶油围巾、薄荷挎包；默认衣装可由本次任务替换",
      "guidance": "可改服装剪裁、颜色与配件；不可据此改变脸、头发和年龄观感。"
    },
    "pose": {
      "default": "自然站姿，手臂清楚可读",
      "guidance": "改变姿势时检查肢体、手部和遮挡，保留候选身份。"
    },
    "expression": {
      "default": "友好轻微微笑",
      "guidance": "保持面部比例与人物年龄观感，仅调整允许的表情。"
    },
    "composition": {
      "default": "独立单角色全身，四周留出裁切安全区",
      "guidance": "构图可探索，但不要添加未要求的文字或把背景烘焙成正式透明资产。"
    }
  },
  "exploration": {
    "allowed_slots": [
      "outfit",
      "pose",
      "expression",
      "composition"
    ],
    "max_candidates": 3
  }
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

## layout

沿用游戏角色和风格做活动主视觉，给出不同渠道的组合方案。

固定约束：

- 同一项目身份
- 真实活动文案独立排版

可变范围：

- 构图与留白

技术规格（仅作为项目要求，CLI 不对生成资产自动检测这些项目）：

```json
{
  "final_canvas_px": null,
  "editable_source": "分层合成源与渠道导出"
}
```

任务变量与探索预算（由 project_runtime 校验；不会覆盖身份或固定规则）：

```json
{
  "slots": {
    "composition": {
      "default": "角色、活动信息与背景分层",
      "guidance": "不同渠道重新组织层级，不机械拉伸同一张图"
    }
  },
  "exploration": {
    "allowed_slots": [
      "composition"
    ],
    "max_candidates": 3
  }
}
```

## typography

真实文字与数字的组件化排版。

固定约束：

- 来自实际文案源
- 可编辑文字

可变范围：

- 字重与层级提案

技术规格（仅作为项目要求，CLI 不对生成资产自动检测这些项目）：

```json
{
  "font_file": null,
  "minimum_display_size": null
}
```

任务变量与探索预算（由 project_runtime 校验；不会覆盖身份或固定规则）：

```json
{
  "slots": {
    "hierarchy": {
      "default": "标题、任务说明、辅助信息",
      "guidance": "先用实际长度与语言校验"
    }
  },
  "exploration": {
    "allowed_slots": [
      "hierarchy"
    ],
    "max_candidates": 3
  }
}
```

## 实体身份

```json
[
  {
    "id": "mira",
    "kind": "character",
    "aliases": [
      "米拉",
      "送货员"
    ],
    "identity_rules": [
      "CHAR-01"
    ],
    "reference_ids": [
      "HS-IDENTITY"
    ],
    "fixed_features": [
      "候选脸部比例与暖肤",
      "短深蓝侧分波波头",
      "一致年龄观感"
    ],
    "variations": [
      "衣装",
      "动作",
      "表情"
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
[]
```

## 决策记录

```json
[
  {
    "id": "HS-DRAFT-01",
    "decision": "先将已有候选视觉判断组织为家族、样板和交付讨论稿。",
    "rationale": "给主美具体可评审内容，校准之后再扩批。",
    "status": "proposed",
    "source": "本次原创演示，不是真实负责人批准"
  }
]
```

## 待决问题

- 确认目标玩家与设备环境
- 建立各家族代表样板与真实批准记录
- 确认字体、尺寸、锚点和动效格式
- 指定首件与组合评审责任人、批次节奏和预算

## 审批记录

```json
null
```

审批字段及证据文件只证明存在该记录；本工具不验证审批者身份、授权、资产权利或美术质量。
