# 美术风格与类别家族规范

项目 `campaign-studio` / 版本 `0.5.0` / 源状态 `draft`

交付状态：草案交付，尚未经 release 构建。

规范指纹：`7e3c4e7d75077ba0183e813653d6c5363533a3898387784488167b6e7f8842dd`

由 style-pack.json 派生。修改规范请修改源文件并重建新版本；本手册不是独立审批或第二份规范源。unknown / proposed / planned / candidate 都不等于已确认，未明确参数不得推测为专业定值。

固定规则与开放变量同时保留；候选探索不能自动修改全队基线。规则原文及证据见 [STYLE.md](../STYLE.md)。

## 类别要求

### product
保持真实商品身份，输出可复用商品主体。
固定：
- 商品包装与标识来自同一批准母版
可变化：
- 任务允许的摆放角度和位置
技术约束：
```json
{
  "source_master": null,
  "editable_source": "智能对象或可编辑合成源，按真实文件检查",
  "background": "transparent",
  "final_canvas_px": null
}
```

### graphic
制作可独立复用的促销装饰。
固定：
- 候选活动色板
- 不包含未经提供的文字与标识
可变化：
- 装饰轮廓和分布
技术约束：
```json
{
  "format": "PNG/SVG按实际工具与用途确认",
  "background": "transparent",
  "editable_source": "按所用工具保存"
}
```

### typography
用真实文字与字体单独排版。
固定：
- 不猜价格/折扣/活动日期
- 文字层可编辑
可变化：
- 合法可用字体方案与层级提案
技术约束：
```json
{
  "font_file": null,
  "final_copy": null,
  "target_display_px": null,
  "editable_source": "PSD或Figma可编辑文字层"
}
```

### layout
把同一活动版本的商品、装饰、字体组合成渠道画面。
固定：
- 商品身份与品牌标识不重设计
- 价格文案来源可核对
- 组成元素版本一致
可变化：
- 安全区内的构图与留白
技术约束：
```json
{
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

### ui
用真实行动文案制作主次按钮与状态，和海报及落地页共用活动语言。
固定：
- 行动可读
- 主次关系稳定
- 状态有区别
可变化：
- 宽度和布局提案
技术约束：
```json
{
  "font_file": null,
  "final_size": null
}
```

## product-master · 商品主体 · proposed
类别：product；用途：让不同岗位的产物能在同一活动下复用和组合。
规则：PRODUCT-IDENTITY
参考：尚无家族专用参考
固定：
- 真实包装、瓶型与标识
可变化：
- 授权视角与位置
技术约束：
```json
{
  "final_sizes": null
}
```

## campaign-decor · 活动装饰家族 · proposed
类别：graphic；用途：让不同岗位的产物能在同一活动下复用和组合。
规则：DECORATION-SPACE
参考：尚无家族专用参考
固定：
- 活动色域
- 无虚构文案和成分暗示
可变化：
- 轮廓
- 装饰密度
技术约束：
```json
{
  "final_sizes": null
}
```

## campaign-type · 活动文字层级 · proposed
类别：typography；用途：让不同岗位的产物能在同一活动下复用和组合。
规则：TYPE-HIERARCHY
参考：尚无家族专用参考
固定：
- 标题、利益、行动、细则层级
- 真实文字和字体
可变化：
- 字重和换行提案
技术约束：
```json
{
  "final_sizes": null
}
```

## channel-layouts · 横幅、海报和社媒模板 · proposed
类别：layout；用途：让不同岗位的产物能在同一活动下复用和组合。
规则：COMPOSITION-CONTEXT
参考：尚无家族专用参考
固定：
- 商品身份
- 信息优先级
- 组成元素同版
可变化：
- 构图
- 渠道重排
- 安全区提案
技术约束：
```json
{
  "final_sizes": null
}
```

## action-controls · 活动按钮与 UI 状态 · proposed
类别：ui；用途：让不同岗位的产物能在同一活动下复用和组合。
规则：继承类别规则
参考：尚无家族专用参考
固定：
- 主次关系
- 行动文案可读
可变化：
- 宽度
- 状态表现
技术约束：
```json
{
  "final_sizes": null
}
```
