# mira-production-001 · 资产落地交接

输出工作目录：`work/mira-production-001/`；冻结任务目录只读。

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

`review.json` 是冻结时的初始检查模板（全部 unknown），真实评审另存输出目录；不要改它以掩盖任务起点。
