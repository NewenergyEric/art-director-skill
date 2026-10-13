# 潮灯小镇 · 四类资产交接试作 · 项目美术规范

项目：`tidekeeper` · 版本：`0.2.1` · 状态：`draft`
交付状态：草案交付 / 尚未经过 release 构建
内容指纹：`4b35136e2eae3a15768adb6b5bfe3987082a06126836e129717a9fcdd2a889e3`

本文件由 style-pack.json 生成。修改源 JSON 后在未发布的工作副本中重新 render；不能把本文件的改写当作规范变更或总监批准。

## 意图

一个团队/项目，一份视觉记忆。沿用首版角色、场景与灯具，新做动作、修复状态和等级；收到反馈后升版补齐游戏UI资产、状态与竖屏安全区。

- 像休闲合成游戏，先服务格内识别与操作
- 保留海港修复的共同形状与色彩语言
- 身份、类别、单次变化分开，组合时检验

### 避免

- 把宣传插画当游戏画面标准
- 让写实金属噪点淹没小格轮廓
- 只统一配色而不统一结构、镜头和状态

## 适用范围

```json
{
  "medium": "2D casual mobile merge-game art and editable UI study",
  "view": "角色对话立绘 / 俯视三分之四地图 / 轻俯视棋子 / 平面UI，各自有样板",
  "target_platform": "390×844 浏览器试作；真实手机与引擎待测",
  "asset_types": [
    "character",
    "environment",
    "prop",
    "ui"
  ]
}
```

## 色彩与字体

```json
{
  "colors": {
    "teal": "#2DAEA3",
    "gold": "#F8C353",
    "cream": "#FFF1CA",
    "coral": "#F17F63",
    "ink": "#214C50"
  },
  "fonts": {
    "ui": {
      "family": "TideSans / Noto Sans SC",
      "fallback": [
        "Microsoft YaHei",
        "sans-serif"
      ]
    }
  }
}
```

## 规则

### TK-FORM · must · proposed

适用：global

饱满大体块、干净局部色、柔和宽高光与上左主光；按类别简化细节。不是每件都涂同一种颜色或材料。

原因：让同一世界在不同资源职责下成立。

允许变化：

- 只变化本任务声明的槽位，保留其余结构。

依据：TK-NOTES
检查方式：visual

### TK-USE · must · proposed

适用：global

先看实际使用：对话角色、地图、棋子、订单与按钮各有职责。宣传构图不继承为通用制作约束。

原因：避免统一到错误类型或错误镜头。

允许变化：

- 只变化本任务声明的槽位，保留其余结构。

依据：TK-NOTES
检查方式：visual

### TK-CHAR-ID · must · proposed

适用：character

阿澜：暖棕肤、棕色杏眼、浓眉、圆颊短鼻、深蓝不对称大块短卷发、小耳钉，成年体态约5.5头身。

原因：同一人改变动作仍能识别。

允许变化：

- 只变化本任务声明的槽位，保留其余结构。

依据：TK-CHAR
检查方式：visual

### TK-CHAR-DRAW · must · proposed

适用：character

用宽色面与柔和塑形；发型分成大块，省略发丝与布料织纹；保持小尺寸脸部表情可读。

原因：区别剧情角色立绘与精细宣传插画。

允许变化：

- 只变化本任务声明的槽位，保留其余结构。

依据：TK-CHAR
检查方式：visual

### TK-SCENE-ID · must · proposed

适用：environment

旧灯房：珊瑚色弧形坡屋顶、右侧烟囱、奶油墙、前面中央门和两窗、门上圆形灯徽，海水在左，木平台及门前缺板的位置固定。

原因：修复前后应是同一地点。

允许变化：

- 只变化本任务声明的槽位，保留其余结构。

依据：TK-MAP
检查方式：visual

### TK-SCENE-VIEW · must · proposed

适用：environment

俯视三分之四地图机位保持；不添加天空或电影镜头；只修改任务授权的修复部位。

原因：修复状态可以直接对照。

允许变化：

- 只变化本任务声明的槽位，保留其余结构。

依据：TK-MAP
检查方式：visual

### TK-ITEM-SHAPE · must · proposed

适用：prop

L1圆腹侧环矮灯，L2宽体拱柄提灯，L3大圆镜/U形支架探照灯，L4短粗锥形航标；两件同级生成下一级，生产器不参与此链。

原因：同级易配对、相邻等级有轮廓差异。

允许变化：

- 只变化本任务声明的槽位，保留其余结构。

依据：TK-NOTES
检查方式：visual

### TK-ITEM-MATERIAL · must · proposed

适用：prop

海绿主体、蜂蜜黄宽金属块、奶油灯面、珊瑚单钮；轻俯视三分之四；粗护栏与大开口。删除细螺钉、细杆、镜面噪点及外发光。

原因：在小格内看见功能轮廓。

允许变化：

- 只变化本任务声明的槽位，保留其余结构。

依据：TK-LAMPS
检查方式：visual

### TK-ITEM-SCALE · must · proposed

适用：prop

在实际约50px棋盘格及46/64/96px比较轮廓和透明边缘；512px RGBA，完整原画布等比缩放补边，目标有效占比70–90%。

原因：不能用大图精细代替格内清楚。

允许变化：

- 只变化本任务声明的槽位，保留其余结构。

依据：TK-NOTES
检查方式：technical

### TK-UI-STATE · must · proposed

适用：ui

订单有缺件/可提交/已交付状态；缺件按钮不可提交，有货交付消耗实际目标物并更新反馈。选中与生产器角标各自明确。

原因：真实信息与反馈服务合成操作。

允许变化：

- 只变化本任务声明的槽位，保留其余结构。

依据：TK-UI
检查方式：visual

### TK-UI-TEXT · must · proposed

适用：ui

海港角色站在奶油订单台后；暖木框、海绿双色棋格、草绿凸起动作按钮。数值17px粗斜体，按钮12px粗字与短阴影，说明11px；装饰字与可编辑正文分开。

原因：文字和图像各司其职；数值仍为试作设置。

允许变化：

- 只变化本任务声明的槽位，保留其余结构。

依据：TK-UI, TK-FONT
检查方式：visual

### TK-COMPOSE · must · proposed

适用：global

最终使用同版本的真实成员输出组合检查；对话立绘是UI叠层，不作为等距地图小人；棋子不可压住格子边界和角标。

原因：分开正确也要组合正确。

允许变化：

- 只变化本任务声明的槽位，保留其余结构。

依据：TK-NOTES
检查方式：visual

### TK-UI-ART · must · proposed

适用：ui

UI须包含本项目角色订单、贝壳金币、体力、两条合成链、生产器、锁定货箱、状态标记与物品说明。每项对应可读职责，不添加无效充值或活动按钮。

原因：此次组合自测与用户反馈暴露的缺口。

允许变化：

- 任务声明的文案与状态，保留共同语言。

依据：TK-UI, TK-UI-SHOT
检查方式：visual

### TK-VIEWPORT · must · proposed

适用：environment, ui

使用竖版前后适配图，保留屋顶、门、两扇正窗和平台；390×844中完整显示建筑，不把横图直接cover铺满。

原因：此次组合自测与用户反馈暴露的缺口。

允许变化：

- 任务声明的文案与状态，保留共同语言。

依据：TK-PORTRAIT-BEFORE, TK-PORTRAIT-AFTER
检查方式：visual

## 参考资产

style 控制画风；identity 控制同一对象身份；composition 控制构图；material 控制材质；context 检查实际场景与尺寸；counterexample 仅说明应避免的结果；font 提供字体依据。候选参考不可冒充已批准参考。

- `TK-NOTES` · context · candidate · `references/handoff-notes.md`
  适用：global；说明：项目定位、类别翻译、接口和试作边界。
  来源：{"type": "original-study", "source": "本次原创交接自测；来源和生成文本见 handoff-notes.md / generation-prompts.md；不是已批准生产基线。"}

- `TK-PROMPTS` · context · candidate · `references/generation-prompts.md`
  适用：global；说明：真实生成提示与输入关系，不是额外批准。
  来源：{"type": "original-study", "source": "本次原创交接自测；来源和生成文本见 handoff-notes.md / generation-prompts.md；不是已批准生产基线。"}

- `TK-CHAR` · identity · candidate · `references/character-base.png`
  适用：character；说明：阿澜身份和默认服装。地图角色视角未覆盖。
  来源：{"type": "original-study", "source": "本次原创交接自测；来源和生成文本见 handoff-notes.md / generation-prompts.md；不是已批准生产基线。"}

- `TK-MAP` · identity · candidate · `references/workshop-before.jpg`
  适用：environment；说明：旧灯房结构与机位；成员修复时绑定该实体。
  来源：{"type": "original-study", "source": "本次原创交接自测；来源和生成文本见 handoff-notes.md / generation-prompts.md；不是已批准生产基线。"}

- `TK-LAMPS` · style · candidate · `references/lamp-l1.png`
  适用：prop；说明：物品材料、粗轮廓、高光与镜头。L1身份不是L3/L4结构。
  来源：{"type": "original-study", "source": "本次原创交接自测；来源和生成文本见 handoff-notes.md / generation-prompts.md；不是已批准生产基线。"}

- `TK-L2` · style · candidate · `references/lamp-l2.png`
  适用：prop；说明：L2扩展首件；成员L3/L4沿用处理语言，不沿用L2剪影。
  来源：{"type": "original-study", "source": "本次原创交接自测；来源和生成文本见 handoff-notes.md / generation-prompts.md；不是已批准生产基线。"}

- `TK-PRODUCER` · identity · candidate · `references/producer.png`
  适用：prop；说明：灯匠工作箱生产器；不是合成链成员。
  来源：{"type": "original-study", "source": "本次原创交接自测；来源和生成文本见 handoff-notes.md / generation-prompts.md；不是已批准生产基线。"}

- `TK-UI` · composition · candidate · `references/ui-first.html`
  适用：ui；说明：UI首件实际源码，依赖本目录JS、字体和图片。
  来源：{"type": "original-study", "source": "本次原创交接自测；来源和生成文本见 handoff-notes.md / generation-prompts.md；不是已批准生产基线。"}

- `TK-UI-KIT` · context · candidate · `references/ui-kit.js`
  适用：ui；说明：可编辑组件、状态及交互；这是项目源码材料，不代表正式游戏实现。
  来源：{"type": "original-study", "source": "本次原创交接自测；来源和生成文本见 handoff-notes.md / generation-prompts.md；不是已批准生产基线。"}

- `TK-FONT` · font · candidate · `references/tide-sans.woff2`
  适用：ui；说明：Noto Sans SC OFL子集，许可见OFL.txt。
  来源：{"type": "original-study", "source": "本次原创交接自测；来源和生成文本见 handoff-notes.md / generation-prompts.md；不是已批准生产基线。"}

- `TK-FONT-LICENSE` · context · candidate · `references/OFL.txt`
  适用：ui；说明：随包字体许可。
  来源：{"type": "original-study", "source": "本次原创交接自测；来源和生成文本见 handoff-notes.md / generation-prompts.md；不是已批准生产基线。"}

- `TK-OLD` · counterexample · candidate · `references/counterexample-old-lamp.png`
  适用：prop；说明：不采用细杆、窄体、写实金属细节；不要作为正向生图输入。
  来源：{"type": "original-study", "source": "本次原创交接自测；来源和生成文本见 handoff-notes.md / generation-prompts.md；不是已批准生产基线。"}

- `TK-UI-SHOT` · composition · candidate · `references/ui-first.png`
  适用：ui；说明：ui-first.html 的实际渲染，390×844；字体和素材由同包源码提供。
  来源：{"type": "native-ui-render", "source": "Remotion renders the same ui-kit.js markup and CSS; not image-generated text."}

- `TK-WAVE` · identity · candidate · `references/character-wave.png`
  适用：character；说明：阿澜挥手变体；0.2.0成员实际续作。
  来源：{"type": "original-study", "source": "原创自测生成/原生渲染；实际输入与提示见 generation-prompts.md。"}

- `TK-AFTER` · identity · candidate · `references/workshop-after.jpg`
  适用：environment；说明：同机位修复前后；0.2.0成员实际续作。
  来源：{"type": "original-study", "source": "原创自测生成/原生渲染；实际输入与提示见 generation-prompts.md。"}

- `TK-L3` · style · candidate · `references/lamp-l3.png`
  适用：prop, ui；说明：L3圆镜轮廓；0.2.0成员实际续作。
  来源：{"type": "original-study", "source": "原创自测生成/原生渲染；实际输入与提示见 generation-prompts.md。"}

- `TK-L4` · style · candidate · `references/lamp-l4.png`
  适用：prop, ui；说明：L4航标轮廓；0.2.0成员实际续作。
  来源：{"type": "original-study", "source": "原创自测生成/原生渲染；实际输入与提示见 generation-prompts.md。"}

- `TK-PORTRAIT-BEFORE` · composition · candidate · `references/workshop-before-portrait.jpg`
  适用：environment, ui；说明：竖版未修复布局和安全区。
  来源：{"type": "original-study", "source": "原创自测生成/原生渲染；实际输入与提示见 generation-prompts.md。"}

- `TK-PORTRAIT-AFTER` · composition · candidate · `references/workshop-after-portrait.jpg`
  适用：environment, ui；说明：竖版修复后的布局；先生成此适配再编辑未修复状态。
  来源：{"type": "original-study", "source": "原创自测生成/原生渲染；实际输入与提示见 generation-prompts.md。"}

- `TK-WOOD1` · style · candidate · `references/wood-l1.png`
  适用：prop, ui；说明：木料一级；暖木与海绿宽带。
  来源：{"type": "original-study", "source": "原创自测生成/原生渲染；实际输入与提示见 generation-prompts.md。"}

- `TK-WOOD2` · style · candidate · `references/wood-l2.png`
  适用：prop, ui；说明：木料二级；成捆轮廓与珊瑚扣。
  来源：{"type": "original-study", "source": "原创自测生成/原生渲染；实际输入与提示见 generation-prompts.md。"}

- `TK-COIN` · style · candidate · `references/coin.png`
  适用：ui；说明：贝壳金币，资源栏24px检查。
  来源：{"type": "original-study", "source": "原创自测生成/原生渲染；实际输入与提示见 generation-prompts.md。"}

- `TK-ENERGY` · style · candidate · `references/energy.png`
  适用：ui；说明：体力图标，资源栏与生产器共同使用。
  来源：{"type": "original-study", "source": "原创自测生成/原生渲染；实际输入与提示见 generation-prompts.md。"}

- `TK-NERI` · identity · candidate · `references/neri.png`
  适用：character, ui；说明：奈莉订单半身像，不沿用阿澜身份或全身导出比例。
  来源：{"type": "original-study", "source": "原创自测生成/原生渲染；实际输入与提示见 generation-prompts.md。"}

- `TK-LOCK` · style · candidate · `references/locked.png`
  适用：prop, ui；说明：缠网旧货箱，锁定区占位。
  来源：{"type": "original-study", "source": "原创自测生成/原生渲染；实际输入与提示见 generation-prompts.md。"}

- `TK-FAIL-UI` · counterexample · candidate · `references/ui-flat-v020.png`
  适用：ui；说明：首版过空、卡片化，保留作为实际失败。
  来源：{"type": "original-study", "source": "原创自测生成/原生渲染；实际输入与提示见 generation-prompts.md。"}

- `TK-FAIL-CROP` · counterexample · candidate · `references/ui-crop-failure.png`
  适用：environment, ui；说明：横版cover竖屏导致建筑裁切。
  来源：{"type": "original-study", "source": "原创自测生成/原生渲染；实际输入与提示见 generation-prompts.md。"}

## character

阿澜剧情对话立绘。

固定约束：

- TK-CHAR-DRAW；具体身份与比例按所绑定实体，不把阿澜身份应用到其他角色。

可变范围：

- 表情、动作；本轮沿用默认服装。

技术规格（仅作为项目要求，CLI 不对生成资产自动检测这些项目）：

```json
{
  "study_export_px": [
    768,
    1152
  ],
  "study_display_height_px": 220,
  "source_format": "RGBA PNG；非分层PSD",
  "engine_rig": null
}
```

任务变量与探索预算（由 project_runtime 校验；不会覆盖身份或固定规则）：

```json
{
  "slots": {
    "pose": {
      "default": "站立手扶工具包",
      "guidance": "仅改变动作，不更换身份。"
    },
    "expression": {
      "default": "亲切微笑",
      "guidance": "允许微笑幅度变化。"
    },
    "outfit": {
      "default": "芥黄短披肩、米白内衫、靛蓝卷腿工装、棕工具包、珊瑚鞋",
      "guidance": "本轮不换装；默认服装不自动成为永久身份。"
    }
  },
  "exploration": {
    "allowed_slots": [
      "pose",
      "expression",
      "outfit"
    ],
    "max_candidates": 2
  }
}
```

## environment

旧灯房地图修复前后。

固定约束：

- 建筑结构与镜头；门窗数及位置；岸线。

可变范围：

- 修补木板、窗户开合、门灯亮灭。

技术规格（仅作为项目要求，CLI 不对生成资产自动检测这些项目）：

```json
{
  "study_export_px": [
    1440,
    810
  ],
  "engine_layers": null,
  "portrait_use": "独立竖版样板；390px宽完整显示，不能用横版cover裁掉门窗。"
}
```

任务变量与探索预算（由 project_runtime 校验；不会覆盖身份或固定规则）：

```json
{
  "slots": {
    "restoration": {
      "default": "未修复",
      "guidance": "只改授权修复点，不重绘布局。"
    }
  },
  "exploration": {
    "allowed_slots": [
      "restoration"
    ],
    "max_candidates": 2
  }
}
```

## prop

合成棋子与工作箱。

固定约束：

- 材料、光源、镜头和有效占比。

可变范围：

- 等级轮廓按家族变更。

技术规格（仅作为项目要求，CLI 不对生成资产自动检测这些项目）：

```json
{
  "study_export_px": [
    512,
    512
  ],
  "study_cell_px": 50,
  "engine_anchor": null
}
```

任务变量与探索预算（由 project_runtime 校验；不会覆盖身份或固定规则）：

```json
{
  "slots": {
    "level": {
      "default": "L1",
      "guidance": "L1/L2为首件，成员继续L3/L4。"
    }
  },
  "exploration": {
    "allowed_slots": [
      "level"
    ],
    "max_candidates": 2
  }
}
```

## ui

竖屏合成棋盘与订单组件。

固定约束：

- 资源栏、订单、棋盘、反馈、导航分工；同一套按钮与格子。

可变范围：

- 订单文案与目标等级、缺件/可提交/已提交状态。

技术规格（仅作为项目要求，CLI 不对生成资产自动检测这些项目）：

```json
{
  "study_viewport_px": [
    390,
    844
  ],
  "grid": [
    7,
    8
  ],
  "source_format": "HTML/CSS/JS with bundled font",
  "engine_widget_format": null
}
```

任务变量与探索预算（由 project_runtime 校验；不会覆盖身份或固定规则）：

```json
{
  "slots": {
    "order": {
      "default": "第一盏归航灯 / L4；栈桥需要新木料 / W2",
      "guidance": "成员可换L4订单，保留状态逻辑。"
    },
    "state": {
      "default": "灯具缺件、木料可提交",
      "guidance": "缺件不可提交；完成消耗需求物并变为已交付。"
    }
  },
  "exploration": {
    "allowed_slots": [
      "order",
      "state"
    ],
    "max_candidates": 2
  }
}
```

## 实体身份

```json
[
  {
    "id": "alan",
    "kind": "character",
    "aliases": [
      "阿澜",
      "灯匠"
    ],
    "identity_rules": [
      "TK-CHAR-ID"
    ],
    "reference_ids": [
      "TK-CHAR"
    ],
    "fixed_features": [
      "TK-CHAR-ID 所列脸、发块、体态"
    ],
    "variations": [
      "动作和表情"
    ]
  },
  {
    "id": "old-workshop",
    "kind": "environment",
    "aliases": [
      "旧灯房",
      "灯房"
    ],
    "identity_rules": [
      "TK-SCENE-ID"
    ],
    "reference_ids": [
      "TK-MAP"
    ],
    "fixed_features": [
      "建筑结构、镜头与岸线"
    ],
    "variations": [
      "修复状态"
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
    "id": "TK-REVISION-02",
    "decision": "本次将试作方向由精细宣传插画校准为休闲合成游戏的角色、地图、棋子与UI；先做类别首件再交包。",
    "rationale": "用户指出画风、物品或界面不像真正的合成游戏；不能只保持错误的一致性。",
    "status": "proposed",
    "source": "2026-10-13 用户反馈与本次实际生成/代码制作；视觉选择是Agent建议，非主美已批准。"
  }
]
```

## 待决问题

- 真实主美是否接受本版视觉方向与样板？
- 真实手机、目标棋盘密度、引擎格式与性能尚未验收。
- 分层编辑源、角色多视角与地图行走动画不在本次交接切片内。

## 审批记录

```json
null
```

审批字段及证据文件只证明存在该记录；本工具不验证审批者身份、授权、资产权利或美术质量。
