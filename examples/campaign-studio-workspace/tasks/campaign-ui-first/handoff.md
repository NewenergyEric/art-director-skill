# campaign-ui-first · 资产落地交接

输出工作目录：`work/campaign-ui-first/`；冻结任务目录只读。

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
  "font_file": null,
  "final_size": null
}
```

`review.json` 是冻结时的初始检查模板（全部 unknown），真实评审另存输出目录；不要改它以掩盖任务起点。

## 家族与渠道的实际交付检查
- family/action-controls/fixed/1：主次关系（来源状态 proposed，待检查 unknown）
- family/action-controls/fixed/2：行动文案可读（来源状态 proposed，待检查 unknown）
- family/action-controls/technical：按家族技术约束核对：{"final_sizes": null}（来源状态 proposed，待检查 unknown）
- exemplar/component-first/acceptance/1：真实字体和文案（来源状态 planned，待检查 unknown）
- exemplar/component-first/acceptance/2：主次与状态可辨（来源状态 planned，待检查 unknown）
- exemplar/component-first/acceptance/3：组合时不遮住行动区域（来源状态 planned，待检查 unknown）
- delivery/campaign-assets/requirement/1：商品、图形和可编辑文字分别交接（来源状态 proposed，待检查 unknown）
- delivery/campaign-assets/requirement/2：未提供价格、折扣或日期时保持待补（来源状态 proposed，待检查 unknown）
- delivery/campaign-assets/requirement/3：保留版本、素材来源和修改记录（来源状态 proposed，待检查 unknown）
- delivery/campaign-assets/technical：按渠道技术约束核对：{"final_dimensions": null, "color_export_profile": null}（来源状态 proposed，待检查 unknown）
- delivery/campaign-channels/requirement/1：每个渠道有实际尺寸导出和合成预览（来源状态 proposed，待检查 unknown）
- delivery/campaign-channels/requirement/2：内容源相同，按渠道重新组织层级（来源状态 proposed，待检查 unknown）
- delivery/campaign-channels/requirement/3：最终检查事实、裁切、可读性和组成版本（来源状态 proposed，待检查 unknown）
- delivery/campaign-channels/technical：按渠道技术约束核对：{"final_dimensions": null, "color_export_profile": null}（来源状态 proposed，待检查 unknown）
