# 美术风格与类别家族规范

项目 `tidekeeper` / 版本 `0.3.0` / 源状态 `draft`

交付状态：草案交付，尚未经 release 构建。

规范指纹：`fc586948fa3f8e059f42c5710729e4aa531e1781f0ffe91f0ef2104842e21e3a`

由 style-pack.json 派生。修改规范请修改源文件并重建新版本；本手册不是独立审批或第二份规范源。unknown / proposed / planned / candidate 都不等于已确认，未明确参数不得推测为专业定值。

固定规则与开放变量同时保留；候选探索不能自动修改全队基线。规则原文及证据见 [STYLE.md](../STYLE.md)。

## 类别要求

### character
阿澜对话立绘与修缮、举灯叙事插演。
固定：
- TK-CHAR-DRAW；具体身份与比例按所绑定实体，不把阿澜身份应用到其他角色。
可变化：
- 表情、动作；本轮沿用默认服装。
技术约束：
```json
{
  "study_display_height_px": 220,
  "source_format": "RGBA PNG；非分层PSD",
  "engine_rig": null,
  "dialogue_export_px": [
    768,
    1152
  ],
  "action_export_px": [
    640,
    960
  ],
  "scene_pose": "225×337.5 on 900×1600 canvas; cutout vignette, not map turnarounds or skeletal animation"
}
```

### environment
旧灯房待修、修好与傍晚状态；保留主体机位与地标。
固定：
- 建筑结构与镜头；门窗数及位置；岸线。
可变化：
- 修补木板、窗户开合、门灯亮灭。
- 授权昼夜与窗灯变化，不改门窗和栈桥地标。
技术约束：
```json
{
  "study_export_px": [
    1440,
    810
  ],
  "engine_layers": null,
  "portrait_use": "独立竖版样板；390px宽完整显示，不能用横版cover裁掉门窗。",
  "state_export_px": [
    900,
    1600
  ]
}
```

### prop
合成棋子、工作箱与独立地图补给船；按家族选镜头和尺度。
固定：
- 材料、光源、镜头和有效占比。
可变化：
- 等级轮廓按家族变更。
技术约束：
```json
{
  "study_export_px": [
    512,
    512
  ],
  "study_cell_px": 50,
  "engine_anchor": null,
  "map_boat_export_px": [
    720,
    480
  ]
}
```

### ui
竖屏合成棋盘与订单组件。
固定：
- 资源栏、订单、棋盘、反馈、导航分工；同一套按钮与格子。
可变化：
- 订单文案与目标等级、缺件/可提交/已提交状态。
技术约束：
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

### motion
修缮、点灯、归航事件的动作与效果组合。
固定：
- TK-ACTION：身份、服装、接触点与姿势用途。
- TK-FX：效果触发原因、层级、形状与可读性。
- 终点、大小和朝向读取同一场景配方。
可变化：
- 已授权事件、时间、强度与减少动态表现。
技术约束：
```json
{
  "scene_canvas_px": [
    900,
    1600
  ],
  "study_viewport_px": [
    390,
    844
  ],
  "repair_ms": 2600,
  "light_ms": 2800,
  "arrival_ms": 3800,
  "source_format": "Separate PNG poses + frame-driven HTML/JS/SVG effects",
  "engine_animation": null
}
```

## dialogue · 剧情角色 · proposed
类别：character；用途：新动作延续同一身份
规则：TK-CHAR-DRAW
参考：TK-CHAR
固定：
- 画风与展示职责一致；具体比例、身份和裁切按实体样板。
可变化：
- 动作与表情
技术约束：
```json
{}
```

## workshop · 灯房修复 · proposed
类别：environment；用途：同地点状态变体
规则：TK-SCENE-VIEW, TK-VIEWPORT
参考：TK-MAP, TK-PORTRAIT-BEFORE, TK-PORTRAIT-AFTER
固定：
- 同机位与结构
可变化：
- 授权修复点
技术约束：
```json
{}
```

## light-chain · 灯具合成链 · proposed
类别：prop；用途：L1到L4升级和格内识别
规则：TK-ITEM-SHAPE, TK-ITEM-MATERIAL, TK-ITEM-SCALE
参考：TK-LAMPS, TK-L2
固定：
- 同材料、镜头、光源
可变化：
- 四级结构轮廓
技术约束：
```json
{}
```

## orders · 订单与棋盘 · proposed
类别：ui；用途：真实可用的状态组件
规则：TK-UI-STATE, TK-UI-TEXT, TK-UI-ART, TK-VIEWPORT
参考：TK-UI, TK-UI-KIT, TK-FONT, TK-L3, TK-L4, TK-PORTRAIT-BEFORE, TK-PORTRAIT-AFTER, TK-WOOD1, TK-WOOD2, TK-COIN, TK-ENERGY, TK-NERI, TK-LOCK, TK-FAIL-UI, TK-FAIL-CROP
固定：
- 层级、状态语义与文字源
可变化：
- 订单和目标等级
技术约束：
```json
{}
```

## repair-chain · 木料修缮链 · proposed
类别：prop；用途：木板到整捆木料，支持第二张实际订单
规则：TK-ITEM-SHAPE, TK-ITEM-SCALE
参考：TK-WOOD1, TK-WOOD2
固定：
- 大体块、同光源、暖木与海绿宽带
可变化：
- 一级单块与二级成捆结构
技术约束：
```json
{
  "levels": 2
}
```

## harbor-events · 港湾事件动作与效果 · proposed
类别：motion；用途：连续状态组合仍沿用同一项目规范
规则：TK-STATE, TK-ACTION, TK-FX
参考：TK-PRODUCTION-NOTES
固定：
- 结构、身份、接触点和图层次序；交付只有一次奖励。
可变化：
- 授权修复、照明和路径时序
技术约束：
```json
{
  "scene_recipe": "references/scene-recipes.json"
}
```
