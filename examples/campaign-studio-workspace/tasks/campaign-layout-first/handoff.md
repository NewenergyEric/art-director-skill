# campaign-layout-first · 资产落地交接

输出工作目录：`work/campaign-layout-first/`；冻结任务目录只读。

该文件是交接计划。还没有生成资产、操作 Photoshop、完成集成或通过验收。

1. **创意候选与主美选择**：状态 unknown。保留实际文件、操作记录与检查证据；未执行保持 unknown。
   选择创意候选时，保留落选候选与理由。更优风格需主美结合排期决策，不能让个别成员自动更新全队规范。
2. **按冻结参考单独生成资产**：状态 unknown。保留实际文件、操作记录与检查证据；未执行保持 unknown。
   图像模型按 generation-brief.md 单独生产需要的资产；记录工具/模型/设置/种子（不可得则 unknown）、真实参考与原始输出。
3. **PS 调整尺寸、透明边缘与可编辑源文件**：状态 unknown。保留实际文件、操作记录与检查证据；未执行保持 unknown。
   在 PS 或可用编辑器中按规范调整画布/像素尺寸/锚点，检查真实 alpha 与边缘，保留 PSD 等可编辑源文件和单件导出；未明确的尺寸或命名不得猜成已确认要求。
4. **实际投放版面、界面或游戏场景中的集成检查**：状态 unknown。保留实际文件、操作记录与检查证据；未执行保持 unknown。
   放回实际投放版面、产品界面或游戏场景，按用途检查大小、商品/角色身份、字号、读图、遮挡、色彩及动效衔接。没有真实集成环境时记 unknown。
5. **最终导出、来源与交付复核**：状态 unknown。保留实际文件、操作记录与检查证据；未执行保持 unknown。
   逐项复核身份、风格、任务、技术与集成，留存证据、版本、产物哈希和责任人。生成图/alpha 存在/脚本通过均不等于主美批准。

## 冻结的技术要求

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

`review.json` 是冻结时的初始检查模板（全部 unknown），真实评审另存输出目录；不要改它以掩盖任务起点。

组件 product / hero-bottle 的技术要求：

```json
{
  "source_master": null,
  "editable_source": "智能对象或可编辑合成源，按真实文件检查",
  "background": "transparent",
  "final_canvas_px": null
}
```

组件 graphic / 类别 的技术要求：

```json
{
  "format": "PNG/SVG按实际工具与用途确认",
  "background": "transparent",
  "editable_source": "按所用工具保存"
}
```

组件 typography / 类别 的技术要求：

```json
{
  "font_file": null,
  "final_copy": null,
  "target_display_px": null,
  "editable_source": "PSD或Figma可编辑文字层"
}
```

组件 ui / 类别 的技术要求：

```json
{
  "font_file": null,
  "final_size": null
}
```

## 家族与渠道的实际交付检查
- family/channel-layouts/fixed/1：商品身份（来源状态 proposed，待检查 unknown）
- family/channel-layouts/fixed/2：信息优先级（来源状态 proposed，待检查 unknown）
- family/channel-layouts/fixed/3：组成元素同版（来源状态 proposed，待检查 unknown）
- family/channel-layouts/technical：按家族技术约束核对：{"final_sizes": null}（来源状态 proposed，待检查 unknown）
- rule/COMPOSITION-CONTEXT：组合任务同时读取商品、装饰、字体规则；在目标画布检查商品占比、信息顺序、遮挡、安全区及渠道裁切，并与系列其他尺寸并排比较。（来源状态 proposed，待检查 unknown）
- exemplar/channel-first/acceptance/1：商品与活动身份保持（来源状态 planned，待检查 unknown）
- exemplar/channel-first/acceptance/2：各渠道真实裁切与安全区（来源状态 planned，待检查 unknown）
- exemplar/channel-first/acceptance/3：实际尺寸看文字和信息顺序（来源状态 planned，待检查 unknown）
- delivery/campaign-channels/requirement/1：每个渠道有实际尺寸导出和合成预览（来源状态 proposed，待检查 unknown）
- delivery/campaign-channels/requirement/2：内容源相同，按渠道重新组织层级（来源状态 proposed，待检查 unknown）
- delivery/campaign-channels/requirement/3：最终检查事实、裁切、可读性和组成版本（来源状态 proposed，待检查 unknown）
- delivery/campaign-channels/technical：按渠道技术约束核对：{"final_dimensions": null, "color_export_profile": null}（来源状态 proposed，待检查 unknown）
- family/product-master/fixed/1：真实包装、瓶型与标识（来源状态 proposed，待检查 unknown）
- family/product-master/technical：按家族技术约束核对：{"final_sizes": null}（来源状态 proposed，待检查 unknown）
- rule/PRODUCT-IDENTITY：商品瓶型、包装、标识、容量和真实标签沿用品牌母版；母版尚缺，不能凭文字合成的包装作为真实商品交付。（来源状态 proposed，待检查 unknown）
- exemplar/product-first/acceptance/1：比对真实商品母版（来源状态 planned，待检查 unknown）
- exemplar/product-first/acceptance/2：包装文字不被改写（来源状态 planned，待检查 unknown）
- exemplar/product-first/acceptance/3：边缘和遮挡可用（来源状态 planned，待检查 unknown）
- delivery/campaign-assets/requirement/1：商品、图形和可编辑文字分别交接（来源状态 proposed，待检查 unknown）
- delivery/campaign-assets/requirement/2：未提供价格、折扣或日期时保持待补（来源状态 proposed，待检查 unknown）
- delivery/campaign-assets/requirement/3：保留版本、素材来源和修改记录（来源状态 proposed，待检查 unknown）
- delivery/campaign-assets/technical：按渠道技术约束核对：{"final_dimensions": null, "color_export_profile": null}（来源状态 proposed，待检查 unknown）
- family/campaign-decor/fixed/1：活动色域（来源状态 proposed，待检查 unknown）
- family/campaign-decor/fixed/2：无虚构文案和成分暗示（来源状态 proposed，待检查 unknown）
- family/campaign-decor/technical：按家族技术约束核对：{"final_sizes": null}（来源状态 proposed，待检查 unknown）
- rule/DECORATION-SPACE：装饰元素保留独立透明文件，不烘焙价格和品牌字；合成后不覆盖标签、主要文案及点击区域。（来源状态 proposed，待检查 unknown）
- exemplar/component-first/acceptance/1：真实字体和文案（来源状态 planned，待检查 unknown）
- exemplar/component-first/acceptance/2：主次与状态可辨（来源状态 planned，待检查 unknown）
- exemplar/component-first/acceptance/3：组合时不遮住行动区域（来源状态 planned，待检查 unknown）
- family/campaign-type/fixed/1：标题、利益、行动、细则层级（来源状态 proposed，待检查 unknown）
- family/campaign-type/fixed/2：真实文字和字体（来源状态 proposed，待检查 unknown）
- family/campaign-type/technical：按家族技术约束核对：{"final_sizes": null}（来源状态 proposed，待检查 unknown）
- rule/TYPE-HIERARCHY：按活动标题、核心利益、行动信息和细则定义层级；字体文件、字重与最小显示字号都待实际选定和检验。（来源状态 proposed，待检查 unknown）
- family/action-controls/fixed/1：主次关系（来源状态 proposed，待检查 unknown）
- family/action-controls/fixed/2：行动文案可读（来源状态 proposed，待检查 unknown）
- family/action-controls/technical：按家族技术约束核对：{"final_sizes": null}（来源状态 proposed，待检查 unknown）
