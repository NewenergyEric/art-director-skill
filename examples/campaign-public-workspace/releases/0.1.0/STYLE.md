# 周末轻饮 · 电商促销候选 · 项目美术规范

项目：`weekend-campaign` · 版本：`0.1.0` · 状态：`draft`
交付状态：草案交付 / 尚未经过 release 构建
内容指纹：`f7147528ec51046fe38bce314e2d3cbbca3a95b5dcfcd6addb8300039fcd074d`

本文件由 style-pack.json 生成。修改源 JSON 后在未发布的工作副本中重新 render；不能把本文件的改写当作规范变更或总监批准。

## 意图

示范商品、活动装饰、真实文字与组合版式由不同成员制作，却沿用同一活动规范与版本。当前仅有文本方向和任务编译，没有品牌母版或已完成海报。

- 先认出商品，再读懂活动
- 多个渠道保持同一活动身份
- 装饰与版式留创意空间

### 避免

- 模型改写商品包装或品牌标识
- 凭空补价格、折扣、日期、功能卖点
- 单元素合格却在组合画面中遮挡主要信息

## 适用范围

```json
{
  "medium": "电商横幅、宣传海报与组件的团队组合设计",
  "view": "由投放渠道画布与裁切决定",
  "target_platform": "待提供真实投放规格",
  "asset_types": [
    "product",
    "graphic",
    "typography",
    "layout"
  ]
}
```

## 色彩与字体

```json
{
  "colors": {
    "candidate_cream": "#FFF4DB",
    "candidate_citrus": "#F5A838",
    "candidate_ink": "#24352C"
  },
  "fonts": {}
}
```

## 规则

### CAMPAIGN-STYLE · must · proposed

适用：global

候选活动方向采用奶油底色、柑橘色点缀与深色文字，信息清楚；具体颜色和样板尚待品牌负责人确认。

原因：给所有成员同一活动方向，但不冒充已批准品牌标准。

允许变化：

- 无 / 尚未定义

依据：CAMPAIGN-BRIEF
检查方式：human

### PRODUCT-IDENTITY · must · proposed

适用：product

商品瓶型、包装、标识、容量和真实标签沿用品牌母版；母版尚缺，不能凭文字合成的包装作为真实商品交付。

原因：商品身份是底线，背景换风格不代表可以改商品。

允许变化：

- 无 / 尚未定义

依据：CAMPAIGN-BRIEF
检查方式：human

### DECORATION-SPACE · must · proposed

适用：graphic

装饰元素保留独立透明文件，不烘焙价格和品牌字；合成后不覆盖标签、主要文案及点击区域。

原因：跨成员复用和组合需要独立元素及实际合成检查。

允许变化：

- 无 / 尚未定义

依据：CAMPAIGN-BRIEF
检查方式：human

### COPY-TRUTH · must · proposed

适用：typography, layout

本案例只提供占位活动标题‘周末轻饮’，不是投放文案。价格、优惠、时间和细则未给出时保持待补，不自行填写。真实文案用可编辑文字层排版逐字核对。

原因：实际文字与事实必须来自活动负责人，生图里的近似字形不能作为排版。

允许变化：

- 无 / 尚未定义

依据：CAMPAIGN-BRIEF
检查方式：human

### TYPE-HIERARCHY · must · proposed

适用：typography

按活动标题、核心利益、行动信息和细则定义层级；字体文件、字重与最小显示字号都待实际选定和检验。

原因：不同成员制作的字块在最终画面中仍需连续清楚。

允许变化：

- 无 / 尚未定义

依据：CAMPAIGN-BRIEF
检查方式：human

### COMPOSITION-CONTEXT · must · proposed

适用：layout

组合任务同时读取商品、装饰、字体规则；在目标画布检查商品占比、信息顺序、遮挡、安全区及渠道裁切，并与系列其他尺寸并排比较。

原因：单个元素正确不能证明最终海报或促销页面一致。

允许变化：

- 无 / 尚未定义

依据：CAMPAIGN-BRIEF
检查方式：human

## 参考资产

style 控制画风；identity 控制同一对象身份；composition 控制构图；material 控制材质；context 检查实际场景与尺寸；counterexample 仅说明应避免的结果；font 提供字体依据。候选参考不可冒充已批准参考。

- `CAMPAIGN-BRIEF` · context · candidate · `references/campaign-brief.md`
  适用：global；说明：真实存在的文本演示方向，未提供商品/品牌图像或正式活动数据。
  来源：{"type": "authored_demo", "source": "本会话扩展至电商与宣传海报的需求", "approval": "none"}

## product

保持真实商品身份，输出可复用商品主体。

固定约束：

- 商品包装与标识来自同一批准母版

可变范围：

- 任务允许的摆放角度和位置

技术规格（仅作为项目要求，CLI 不对生成资产自动检测这些项目）：

```json
{
  "source_master": null,
  "editable_source": "智能对象或可编辑合成源，按真实文件检查",
  "background": "transparent",
  "final_canvas_px": null
}
```

任务变量与探索预算（由 project_runtime 校验；不会覆盖身份或固定规则）：

```json
{
  "slots": {
    "angle": {
      "default": "母版角度",
      "guidance": "缺少其他视角时不得自行补成正式商品。"
    }
  },
  "exploration": {
    "allowed_slots": [
      "angle"
    ],
    "max_candidates": 3
  }
}
```

## graphic

制作可独立复用的促销装饰。

固定约束：

- 候选活动色板
- 不包含未经提供的文字与标识

可变范围：

- 装饰轮廓和分布

技术规格（仅作为项目要求，CLI 不对生成资产自动检测这些项目）：

```json
{
  "format": "PNG/SVG按实际工具与用途确认",
  "background": "transparent",
  "editable_source": "按所用工具保存"
}
```

任务变量与探索预算（由 project_runtime 校验；不会覆盖身份或固定规则）：

```json
{
  "slots": {
    "motif": {
      "default": "抽象柑橘切片与圆点",
      "guidance": "仅探索视觉氛围，不暗示未确认的商品成分。"
    }
  },
  "exploration": {
    "allowed_slots": [
      "motif"
    ],
    "max_candidates": 3
  }
}
```

## typography

用真实文字与字体单独排版。

固定约束：

- 不猜价格/折扣/活动日期
- 文字层可编辑

可变范围：

- 合法可用字体方案与层级提案

技术规格（仅作为项目要求，CLI 不对生成资产自动检测这些项目）：

```json
{
  "font_file": null,
  "final_copy": null,
  "target_display_px": null,
  "editable_source": "PSD或Figma可编辑文字层"
}
```

任务变量与探索预算（由 project_runtime 校验；不会覆盖身份或固定规则）：

```json
{
  "slots": {
    "hierarchy": {
      "default": "标题→利益→行动→细则",
      "guidance": "未提供的文案明确标待补，字体和尺寸待校验。"
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

## layout

把同一活动版本的商品、装饰、字体组合成渠道画面。

固定约束：

- 商品身份与品牌标识不重设计
- 价格文案来源可核对
- 组成元素版本一致

可变范围：

- 安全区内的构图与留白

技术规格（仅作为项目要求，CLI 不对生成资产自动检测这些项目）：

```json
{
  "candidate_canvas_px": [
    1200,
    628
  ],
  "final_canvas_px": null,
  "channel": "待确认",
  "editable_source": "PSD/Figma等可编辑合成文件",
  "required_checks": [
    "逐字核对文案",
    "字体与商品来源",
    "遮挡与信息顺序",
    "实际渠道裁切",
    "组合版本与可编辑源"
  ]
}
```

任务变量与探索预算（由 project_runtime 校验；不会覆盖身份或固定规则）：

```json
{
  "slots": {
    "composition": {
      "default": "商品一侧、活动信息另一侧，留出安全区",
      "guidance": "可探索构图关系但不可改商品包装或虚构促销事实。"
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

## 实体身份

```json
[
  {
    "id": "hero-bottle",
    "kind": "product",
    "identity_rules": [
      "PRODUCT-IDENTITY"
    ],
    "reference_ids": [],
    "fixed_features": [
      "真实瓶型、包装、标识、容量待母版提供"
    ],
    "variations": [
      "仅任务允许的角度和摆放"
    ],
    "aliases": [
      "主商品",
      "商品瓶"
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
[]
```

## 待决问题

- 缺真实商品母版、品牌标识和批准风格样板
- 缺正式活动文字、价格、日期与细则
- 缺已选字体及实际渠道尺寸
- 尚未生成图像或进行PS/Figma排版、投放验收

## 审批记录

```json
null
```

审批字段及证据文件只证明存在该记录；本工具不验证审批者身份、授权、资产权利或美术质量。
