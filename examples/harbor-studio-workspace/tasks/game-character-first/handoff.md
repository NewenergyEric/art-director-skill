# game-character-first · 资产落地交接

输出工作目录：`work/game-character-first/`；冻结任务目录只读。

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

## 家族与渠道的实际交付检查
- family/courier-character/fixed/1：脸与短发轮廓（来源状态 proposed，待检查 unknown）
- family/courier-character/fixed/2：整体比例和年龄感（来源状态 proposed，待检查 unknown）
- family/courier-character/technical：按家族技术约束核对：{"approved_turnaround": null, "output_size": null}（来源状态 proposed，待检查 unknown）
- rule/CHAR-01：Mira 的候选身份是深蓝短侧分波波头、暖肤与原参考的脸部比例；衣装不是永久身份，指定换装时开放衣装槽位。（来源状态 proposed，待检查 unknown）
- rule/CHAR-02：姿态用清楚的大动作表达，面部细节节制；角色与棋盘同屏时不能占据关键操作区域。（来源状态 proposed，待检查 unknown）
- exemplar/direction-board/acceptance/1：说明借鉴部分和不继承的细节（来源状态 candidate，待检查 unknown）
- exemplar/direction-board/acceptance/2：所有判断仍为候选（来源状态 candidate，待检查 unknown）
- exemplar/character-first/acceptance/1：对照精细脸部和转面（来源状态 planned，待检查 unknown）
- exemplar/character-first/acceptance/2：新姿态仍是同一人（来源状态 planned，待检查 unknown）
- exemplar/character-first/acceptance/3：实际交付尺度与透明边缘（来源状态 planned，待检查 unknown）
- exemplar/street-first/acceptance/1：人物与入口比例合理（来源状态 planned，待检查 unknown）
- exemplar/street-first/acceptance/2：棋盘位置可读（来源状态 planned，待检查 unknown）
- exemplar/street-first/acceptance/3：图层可独立交接（来源状态 planned，待检查 unknown）
- delivery/game-runtime/requirement/1：交付可编辑源、单件导出、组合预览与检查记录（来源状态 proposed，待检查 unknown）
- delivery/game-runtime/requirement/2：首件被接收后再按同一版本扩批（来源状态 proposed，待检查 unknown）
- delivery/game-runtime/requirement/3：外包与内制使用同一资产编号和验收标准（来源状态 proposed，待检查 unknown）
- delivery/game-runtime/technical：按渠道技术约束核对：{"final_dimensions": null, "color_export_profile": null}（来源状态 proposed，待检查 unknown）
- delivery/game-campaign/requirement/1：渠道按各自画布重排而非拉伸（来源状态 proposed，待检查 unknown）
- delivery/game-campaign/requirement/2：真实文字可编辑，保留必要安全区（来源状态 proposed，待检查 unknown）
- delivery/game-campaign/requirement/3：记录引用单件的版本和负责人（来源状态 proposed，待检查 unknown）
- delivery/game-campaign/technical：按渠道技术约束核对：{"final_dimensions": null, "color_export_profile": null}（来源状态 proposed，待检查 unknown）
