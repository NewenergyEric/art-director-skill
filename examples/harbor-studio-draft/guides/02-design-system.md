# 美术风格与类别家族规范

项目 `harbor-studio` / 版本 `0.5.0` / 源状态 `draft`

交付状态：草案交付，尚未经 release 构建。

规范指纹：`6c0e0e9ae893db942198b590fdee9911e92133d7c50c5d92cb7237a9cb2f2d75`

由 style-pack.json 派生。修改规范请修改源文件并重建新版本；本手册不是独立审批或第二份规范源。unknown / proposed / planned / candidate 都不等于已确认，未明确参数不得推测为专业定值。

固定规则与开放变量同时保留；候选探索不能自动修改全队基线。规则原文及证据见 [STYLE.md](../STYLE.md)。

## 类别要求

### character
在同一候选角色下制作换装或姿态提案，再实际检查身份与风格。
固定：
- 同一候选人物的脸部与头发识别线索
- 轻量美式漫画轮廓、色系与块状阴影
可变化：
- outfit
- pose
- expression
- composition
技术约束：
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

### environment
制作六个日光圆角街区背景，保留棋盘和信息区的低细节空间。
固定：
- 日光方向一致
- 圆角店铺形体
- 入口可辨
- 棋盘后方低细节
可变化：
- 店铺用途
- 货物
- 店招形状
- 街角生活细节
技术约束：
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

### tile
制作红苹果、绿叶、黄星、蓝水滴、粉花各基础和选中两态，以颜色和轮廓共同识别。
固定：
- 五种独立轮廓
- 种类与候选色对应
- 无五官
- 共同锚点
- 选中态保留本体
可变化：
- 允许范围内的状态外圈
- 轻微手绘轮廓起伏
技术约束：
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

### prop
制作纸风车、木槌和邮包的基础状态与外包配色包装变体。
固定：
- 关键功能结构
- 母版与变体可追溯
- 统一轮廓与两级明暗
可变化：
- 指定配色
- 表面包装
- 激活或开启状态
技术约束：
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

### ui
制作八个候选组件，真实文字另排，清楚呈现操作层级。
固定：
- 简洁圆角
- 深色细描边
- 文字图形分层
- 不侵占棋盘操作区
可变化：
- 按钮填色
- 主次层级
- 真实字体与字号提案
技术约束：
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

### motion
制作六套三阶段弹性反馈；逐套回放检查棋盘遮挡和身份连续性。
固定：
- anticipation/burst/settle三个阶段
- 小爆点
- 结果可辨
- 静态实体身份不变
可变化：
- 各阶段时长
- 允许的短暂变形
- 反馈强度
技术约束：
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

### layout
沿用游戏角色和风格做活动主视觉，给出不同渠道的组合方案。
固定：
- 同一项目身份
- 真实活动文案独立排版
可变化：
- 构图与留白
技术约束：
```json
{
  "final_canvas_px": null,
  "editable_source": "分层合成源与渠道导出"
}
```

### typography
真实文字与数字的组件化排版。
固定：
- 来自实际文案源
- 可编辑文字
可变化：
- 字重与层级提案
技术约束：
```json
{
  "font_file": null,
  "minimum_display_size": null
}
```

## courier-character · 送货员角色与表情姿态 · proposed
类别：character；用途：让同一角色在任务状态中持续可辨。
规则：CHAR-01, CHAR-02
参考：HS-IDENTITY
固定：
- 脸与短发轮廓
- 整体比例和年龄感
可变化：
- 衣装
- 姿态
- 表情
技术约束：
```json
{
  "approved_turnaround": null,
  "output_size": null
}
```

## street-scenes · 街角店铺与场景模块 · proposed
类别：environment；用途：变换店铺内容仍保持视线、尺度与操作区。
规则：ENV-01, ENV-02
参考：尚无家族专用参考
固定：
- 入口用途可读
- 统一视线高度
- 棋盘后方少细节
可变化：
- 店铺用途
- 摆设
技术约束：
```json
{
  "layer_structure": [
    "远景",
    "主体",
    "前景"
  ],
  "target_canvas": null
}
```
任务变量：
```json
{
  "slots": {
    "shop": {
      "default": "街角店铺",
      "guidance": "变内容，不任意改镜头和模块尺度"
    }
  },
  "exploration": {
    "allowed_slots": [
      "shop"
    ],
    "max_candidates": 3
  }
}
```

## match-tiles · 基础棋子与状态 · proposed
类别：tile；用途：并排与缩小时仍识别种类和选中状态。
规则：TILE-01, TILE-02, MOTION-03
参考：尚无家族专用参考
固定：
- 颜色与轮廓双重识别
- 不增加五官
- 同一锚点
可变化：
- 状态外圈
- 允许的短暂变形
技术约束：
```json
{
  "display_size": null,
  "anchor": "中心，待工程确认"
}
```
任务变量：
```json
{
  "slots": {
    "state": {
      "default": "基础态",
      "guidance": "选中态不重设计主体轮廓"
    }
  },
  "exploration": {
    "allowed_slots": [
      "state"
    ],
    "max_candidates": 3
  }
}
```

## boosters · 增益道具与升级状态 · proposed
类别：prop；用途：内制母版与外包变体共享关键结构。
规则：PROP-01, PROP-02
参考：尚无家族专用参考
固定：
- 功能结构和识别轮廓
- 同一母版来源
可变化：
- 包装
- 激活状态
- 配色提案
技术约束：
```json
{
  "state_chain": [
    "基础",
    "激活",
    "结束"
  ],
  "final_canvas": null
}
```
任务变量：
```json
{
  "slots": {
    "state": {
      "default": "基础态",
      "guidance": "升级或激活保持同一物件，未经样板不固定等级数量"
    }
  },
  "exploration": {
    "allowed_slots": [
      "state"
    ],
    "max_candidates": 3
  }
}
```

## hud-controls · HUD 按钮与面板家族 · proposed
类别：ui；用途：操作优先级、组件状态与真实文案共用设计语言。
规则：UI-01, TYPE-01
参考：尚无家族专用参考
固定：
- 圆角与描边体系
- 图文可分别编辑
- 操作区不被装饰遮挡
可变化：
- 主次按钮配色
- 允许的内容宽度
技术约束：
```json
{
  "states": [
    "默认",
    "按下",
    "不可用"
  ],
  "minimum_target_size": null,
  "font_file": null
}
```
任务变量：
```json
{
  "slots": {
    "state": {
      "default": "默认态",
      "guidance": "三态按同一结构检查，明确反馈差异"
    }
  },
  "exploration": {
    "allowed_slots": [
      "state"
    ],
    "max_candidates": 3
  }
}
```

## feedback-effects · 消除与回弹反馈 · proposed
类别：motion；用途：动作能让玩家读懂结果，保持静态对象身份。
规则：MOTION-01, MOTION-02, MOTION-03
参考：尚无家族专用参考
固定：
- 预备、命中、收束
- 结果清楚
- 不新增棋子五官
可变化：
- 反馈强度
- 阶段时长提案
技术约束：
```json
{
  "engine_format": null,
  "duration_ms": null
}
```
任务变量：
```json
{
  "slots": {
    "action": {
      "default": "单棋消除",
      "guidance": "逐帧和实际速度检查，静态板不能证明时序可用"
    }
  },
  "exploration": {
    "allowed_slots": [
      "action"
    ],
    "max_candidates": 3
  }
}
```

## campaign-layout · 游戏活动主视觉及尺寸变体 · proposed
类别：layout；用途：把角色、场景与活动信息组成系列传播画面。
规则：继承类别规则
参考：尚无家族专用参考
固定：
- 角色身份
- 项目视觉语言
- 真实文案
可变化：
- 布局
- 裁切
- 背景密度
技术约束：
```json
{
  "channel_sizes": null,
  "text_safe_area": null
}
```

## ui-type · 游戏文字与数字 · proposed
类别：typography；用途：真实文本在界面与宣传中有一致层级。
规则：继承类别规则
参考：尚无家族专用参考
固定：
- 真实字体排版
- 数字清晰
- 语言覆盖
可变化：
- 字重层级提案
技术约束：
```json
{
  "font_file": null,
  "display_sizes": null
}
```
