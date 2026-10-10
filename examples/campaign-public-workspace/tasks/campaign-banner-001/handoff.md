# campaign-banner-001 · 资产落地交接

输出工作目录：`work/campaign-banner-001/`；冻结任务目录只读。

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
