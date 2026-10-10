# game-motion-first · 资产落地交接

输出工作目录：`work/game-motion-first/`；冻结任务目录只读。

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

`review.json` 是冻结时的初始检查模板（全部 unknown），真实评审另存输出目录；不要改它以掩盖任务起点。

## 家族与渠道的实际交付检查
- family/feedback-effects/fixed/1：预备、命中、收束（来源状态 proposed，待检查 unknown）
- family/feedback-effects/fixed/2：结果清楚（来源状态 proposed，待检查 unknown）
- family/feedback-effects/fixed/3：不新增棋子五官（来源状态 proposed，待检查 unknown）
- family/feedback-effects/technical：按家族技术约束核对：{"engine_format": null, "duration_ms": null}（来源状态 proposed，待检查 unknown）
- rule/MOTION-01：每套动效明确anticipation预备、burst爆点、settle收束三个阶段，以弹性小爆点和短暂反馈服务操作结果。（来源状态 proposed，待检查 unknown）
- rule/MOTION-02：动效避免遮挡棋盘；单棋消除的候选峰值包围盒不超过棋格1.25倍，并以叠加回放检查邻格与结果可见性；该数值不代表实测性能或通过验收。（来源状态 proposed，待检查 unknown）
- rule/MOTION-03：动作只改变位置、缩放、旋转与允许的短暂变形；不得给无五官的静态棋子新增眼睛或嘴，也不得重设计种类轮廓。（来源状态 proposed，待检查 unknown）
- exemplar/direction-board/acceptance/1：说明借鉴部分和不继承的细节（来源状态 candidate，待检查 unknown）
- exemplar/direction-board/acceptance/2：所有判断仍为候选（来源状态 candidate，待检查 unknown）
- exemplar/item-chain/acceptance/1：升级和激活保留结构（来源状态 planned，待检查 unknown）
- exemplar/item-chain/acceptance/2：相邻物件可辨（来源状态 planned，待检查 unknown）
- exemplar/item-chain/acceptance/3：效果不遮挡关键反馈（来源状态 planned，待检查 unknown）
- delivery/game-runtime/requirement/1：交付可编辑源、单件导出、组合预览与检查记录（来源状态 proposed，待检查 unknown）
- delivery/game-runtime/requirement/2：首件被接收后再按同一版本扩批（来源状态 proposed，待检查 unknown）
- delivery/game-runtime/requirement/3：外包与内制使用同一资产编号和验收标准（来源状态 proposed，待检查 unknown）
- delivery/game-runtime/technical：按渠道技术约束核对：{"final_dimensions": null, "color_export_profile": null}（来源状态 proposed，待检查 unknown）
