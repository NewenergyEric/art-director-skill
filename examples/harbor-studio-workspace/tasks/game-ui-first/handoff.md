# game-ui-first · 资产落地交接

输出工作目录：`work/game-ui-first/`；冻结任务目录只读。

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

`review.json` 是冻结时的初始检查模板（全部 unknown），真实评审另存输出目录；不要改它以掩盖任务起点。

## 家族与渠道的实际交付检查
- family/hud-controls/fixed/1：圆角与描边体系（来源状态 proposed，待检查 unknown）
- family/hud-controls/fixed/2：图文可分别编辑（来源状态 proposed，待检查 unknown）
- family/hud-controls/fixed/3：操作区不被装饰遮挡（来源状态 proposed，待检查 unknown）
- family/hud-controls/technical：按家族技术约束核对：{"states": ["默认", "按下", "不可用"], "minimum_target_size": null, "font_file": null}（来源状态 proposed，待检查 unknown）
- rule/UI-01：按钮和面板使用简洁圆角、深色细描边和清楚层级，图标与文字分别制作；棋盘操作区不被装饰侵占。（来源状态 proposed，待检查 unknown）
- rule/TYPE-01：UI中文、拉丁字母、数字与标点使用真实字体单独排版，检查来源、语言覆盖、真实字数和实际尺寸；模型生成的字形不作为交付文字。（来源状态 proposed，待检查 unknown）
- exemplar/direction-board/acceptance/1：说明借鉴部分和不继承的细节（来源状态 candidate，待检查 unknown）
- exemplar/direction-board/acceptance/2：所有判断仍为候选（来源状态 candidate，待检查 unknown）
- exemplar/hud-first/acceptance/1：真实文字长度和字形（来源状态 planned，待检查 unknown）
- exemplar/hud-first/acceptance/2：三态可辨（来源状态 planned，待检查 unknown）
- exemplar/hud-first/acceptance/3：不靠放大图判定可读性（来源状态 planned，待检查 unknown）
- delivery/game-runtime/requirement/1：交付可编辑源、单件导出、组合预览与检查记录（来源状态 proposed，待检查 unknown）
- delivery/game-runtime/requirement/2：首件被接收后再按同一版本扩批（来源状态 proposed，待检查 unknown）
- delivery/game-runtime/requirement/3：外包与内制使用同一资产编号和验收标准（来源状态 proposed，待检查 unknown）
- delivery/game-runtime/technical：按渠道技术约束核对：{"final_dimensions": null, "color_export_profile": null}（来源状态 proposed，待检查 unknown）
