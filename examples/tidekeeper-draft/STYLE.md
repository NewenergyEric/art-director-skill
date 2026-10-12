# 潮灯小镇 · 灯具首件与家族草案 · 项目美术规范

项目：`tidekeeper` · 版本：`0.1.0` · 状态：`draft`
交付状态：草案交付 / 尚未经过 release 构建
内容指纹：`b2a3ddf1535339cef9f897dedbe0e134c92354c0f278e9f0ecfcd578086b67b0`

本文件由 style-pack.json 生成。修改源 JSON 后在未发布的工作副本中重新 render；不能把本文件的改写当作规范变更或总监批准。

## 意图

原创休闲修复游戏：收集与合成灯具，逐步恢复沿海小镇的航标。先验证海港样板能否指导成套物品。

- 温暖的修复行为
- 清楚的物品升级轮廓
- 搪瓷与黄铜的共同材料语言

### 避免

- 只靠换色区别等级
- 写实材质噪点抢走玩法焦点
- 整板冒充独立可用资源

## 适用范围

```json
{
  "medium": "2D generated concept and item candidates",
  "view": "略俯视三分之四道具视角；主视觉使用叙事镜头",
  "target_platform": "本次 64 / 96 px 浏览器合成试验；真实设备待确认",
  "asset_types": [
    "prop",
    "environment",
    "character"
  ]
}
```

## 色彩与字体

```json
{
  "colors": {},
  "fonts": {}
}
```

## 规则

### TK-MATERIAL · must · proposed

适用：global

海绿搪瓷、蜂蜜色黄铜、奶油玻璃；上左暖主光。用大色面与克制的高光区分材料。

原因：保留海港修复世界的共同语言。

允许变化：

- 题材与当前等级所需的结构变化；不能覆盖共同视觉要求

依据：TK-KEY
检查方式：visual

### TK-SHAPE · must · proposed

适用：prop

灯具按矮灯、提柄风灯、圆镜探照灯、锥形航标区分；相邻等级不能只换色。

原因：让升级在小尺寸下可读。

允许变化：

- 题材与当前等级所需的结构变化；不能覆盖共同视觉要求

依据：TK-KEY
检查方式：visual

### TK-VIEW · must · proposed

适用：prop

单件使用略俯视的三分之四正面视角，完整露出轮廓。

原因：并列与合成时不会因镜头不同误读体量。

允许变化：

- 题材与当前等级所需的结构变化；不能覆盖共同视觉要求

依据：TK-KEY
检查方式：visual

### TK-CONTEXT · must · proposed

适用：prop

在标明的 64 与 96 px 试验尺度、浅深背景与棋盘合成中看实际结果。真实设备未验证。

原因：大图精致不证明小图可读。

允许变化：

- 题材与当前等级所需的结构变化；不能覆盖共同视觉要求

依据：TK-KEY
检查方式：visual

### TK-EXPORT · must · proposed

适用：prop

导出有可见主体的 RGBA PNG；检查尺寸、alpha、边距与浅深背景边缘。发现问题保留待修记录。

原因：文件扩展名或存在透明像素不能证明交付合格。

允许变化：

- 题材与当前等级所需的结构变化；不能覆盖共同视觉要求

依据：TK-KEY
检查方式：technical

### TK-STORY · must · proposed

适用：environment, character

主视觉让修灯动作成为焦点，并把手、灯、栈桥与远处灯塔连成空间关系。

原因：用事件与空间表达玩法世界，而非通用背景图。

允许变化：

- 题材与当前等级所需的结构变化；不能覆盖共同视觉要求

依据：TK-KEY
检查方式：visual

## 参考资产

style 控制画风；identity 控制同一对象身份；composition 控制构图；material 控制材质；context 检查实际场景与尺寸；counterexample 仅说明应避免的结果；font 提供字体依据。候选参考不可冒充已批准参考。

- `TK-KEY` · style · candidate · `references/tidekeeper.jpg`
  适用：global；说明：2026-10-13 实际生成的原创候选。不是已批准基线；不是第三方作品。
  来源：{"type": "generated_original", "source": "built-in image_gen.imagegen；任务依据与提示记录在 references/production-notes.md"}

- `TK-L1` · identity · candidate · `references/lantern-l1.png`
  适用：prop；说明：2026-10-13 实际生成的原创候选。不是已批准基线；不是第三方作品。
  来源：{"type": "generated_original", "source": "built-in image_gen.imagegen；任务依据与提示记录在 references/production-notes.md"}

- `TK-L2` · identity · candidate · `references/lantern-l2.png`
  适用：prop；说明：2026-10-13 实际生成的原创候选。不是已批准基线；不是第三方作品。
  来源：{"type": "generated_original", "source": "built-in image_gen.imagegen；任务依据与提示记录在 references/production-notes.md"}

- `TK-L3` · identity · candidate · `references/lantern-l3.png`
  适用：prop；说明：2026-10-13 实际生成的原创候选。不是已批准基线；不是第三方作品。
  来源：{"type": "generated_original", "source": "built-in image_gen.imagegen；任务依据与提示记录在 references/production-notes.md"}

- `TK-L4` · identity · candidate · `references/lantern-l4.png`
  适用：prop；说明：2026-10-13 实际生成的原创候选。不是已批准基线；不是第三方作品。
  来源：{"type": "generated_original", "source": "built-in image_gen.imagegen；任务依据与提示记录在 references/production-notes.md"}

- `TK-CONTEXT` · context · candidate · `references/production-notes.md`
  适用：global；说明：本次案例假设、执行提示及边界。
  来源：{"type": "authored_demo", "source": "2026-10-13 原创案例执行记录"}

## prop

沿用海港样板制作灯具家族；分别生成独立 PNG，再组合检查。

固定约束：

- 海绿搪瓷 / 黄铜 / 奶油玻璃
- 上左光源
- 三分之四镜头

可变范围：

- 灯具等级与结构轮廓

技术规格（仅作为项目要求，CLI 不对生成资产自动检测这些项目）：

```json
{
  "demo_export_px": [
    512,
    512
  ],
  "demo_display_px": [
    64,
    96
  ],
  "engine_format": null,
  "production_approved": false
}
```

任务变量与探索预算（由 project_runtime 校验；不会覆盖身份或固定规则）：

```json
{
  "slots": {
    "level": {
      "default": "L2 提柄风灯",
      "guidance": "按等级形状要求；保留共同材料与视角"
    }
  }
}
```

## environment

海港栈桥到灯塔的空间关系，主体附近细节更集中。

固定约束：

- 修复主题
- 共同材料和冷暖关系

可变范围：

- 故事镜头

技术规格（仅作为项目要求，CLI 不对生成资产自动检测这些项目）：

```json
{
  "engine_layers": null
}
```

## character

年轻成年灯匠：短深蓝发、暖肤、芥黄披肩、靛蓝工装、珊瑚色鞋。

固定约束：

- 当前角色候选身份

可变范围：

- 修灯动作

技术规格（仅作为项目要求，CLI 不对生成资产自动检测这些项目）：

```json
{
  "turnaround": null,
  "rig": null
}
```

## 实体身份

```json
[
  {
    "id": "light-l1",
    "kind": "prop",
    "aliases": [
      "矮油灯",
      "L1"
    ],
    "identity_rules": [
      "TK-SHAPE"
    ],
    "reference_ids": [
      "TK-L1"
    ],
    "fixed_features": [
      "矮油灯的主体结构轮廓"
    ],
    "variations": [
      "经任务明确允许的状态"
    ]
  },
  {
    "id": "light-l2",
    "kind": "prop",
    "aliases": [
      "提柄风灯",
      "L2"
    ],
    "identity_rules": [
      "TK-SHAPE"
    ],
    "reference_ids": [
      "TK-L2"
    ],
    "fixed_features": [
      "提柄风灯的主体结构轮廓"
    ],
    "variations": [
      "经任务明确允许的状态"
    ]
  },
  {
    "id": "light-l3",
    "kind": "prop",
    "aliases": [
      "圆镜探照灯",
      "L3"
    ],
    "identity_rules": [
      "TK-SHAPE"
    ],
    "reference_ids": [
      "TK-L3"
    ],
    "fixed_features": [
      "圆镜探照灯的主体结构轮廓"
    ],
    "variations": [
      "经任务明确允许的状态"
    ]
  },
  {
    "id": "light-l4",
    "kind": "prop",
    "aliases": [
      "锥形航标",
      "L4"
    ],
    "identity_rules": [
      "TK-SHAPE"
    ],
    "reference_ids": [
      "TK-L4"
    ],
    "fixed_features": [
      "锥形航标的主体结构轮廓"
    ],
    "variations": [
      "经任务明确允许的状态"
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
    "id": "TK-DRAFT-01",
    "decision": "用四个灯具候选验证同一材料语言与不同轮廓；主视觉从写实细节转向更清楚的大色面。",
    "rationale": "响应实际看图反馈，记录首件到扩展与返修。",
    "status": "proposed",
    "source": "2026-10-13 原创案例试用与 Agent 看图自查；不是客户验收。"
  }
]
```

## 待决问题

- 项目负责人是否认可当前画风与等级链？
- 透明边缘与画布边距仍需依生产规格复核。
- 真实设备、棋盘密度、导出锚点和引擎导入尚未确认。
- 多视角身份、分层源文件、动作与真人团队复用尚未验证。

## 审批记录

```json
null
```

审批字段及证据文件只证明存在该记录；本工具不验证审批者身份、授权、资产权利或美术质量。
