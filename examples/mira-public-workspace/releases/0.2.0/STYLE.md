# 米拉 Mira · 公开成员工作流示范 · 项目美术规范

项目：`mira-public-demo` · 版本：`0.2.0` · 状态：`draft`
交付状态：草案交付 / 尚未经过 release 构建
内容指纹：`d7f74d3a2f5e76d7c380d4dc4b80a8f200f7e6655ff2e2c1985ade45d35a6624`

本文件由 style-pack.json 生成。修改源 JSON 后在未发布的工作副本中重新 render；不能把本文件的改写当作规范变更或总监批准。

## 意图

成员只提出服装与姿态变化，Agent 绑定现有候选身份、共用风格和当前版本，生成可交接的制作任务。通过明确的可变槽位保留创意空间，所有艺术结果仍需实际观察。

- 风格与候选身份随任务读取
- 默认衣装不当作永久身份
- 主美管理底线、预算与版本
- 输出状态有真实证据才升级

### 避免

- 让成员重复手写整套风格
- 由换装任务静默改脸或改发型
- 把未知质检写成通过
- 把任务书当作完成的正式资产

## 适用范围

```json
{
  "medium": "2d",
  "view": "原角色候选参考与独立全身变化",
  "target_platform": "用于公开工作流演示；正式显示和投放规格待确认",
  "asset_types": [
    "character"
  ]
}
```

## 色彩与字体

```json
{
  "colors": {
    "coral": "#F47C6A",
    "mint": "#80CDA8",
    "yellow": "#FFD66B",
    "blue": "#7BAFE8",
    "ink": "#25303E",
    "paper": "#FFF4DB"
  },
  "fonts": {}
}
```

## 规则

### STYLE-01 · must · proposed

适用：global

候选风格采用轻量美式漫画：清晰的深蓝灰轮廓、扁平色块、友好日光和简化形体。

原因：不同成员共享可观察的风格依据。

允许变化：

- 动作可有幽默夸张，保持主体可读。

依据：MIRA-STYLE, MIRA-DIRECTION
检查方式：visual

### PALETTE-01 · must · proposed

适用：global

以暖奶油、深蓝灰和珊瑚/薄荷/黄/蓝形成候选色系；衣装变化仍需与同一色系协调。

原因：服装有空间，系列仍有共同色彩判断。

允许变化：

- 可提新色方案，记录理由并提交审阅。

依据：MIRA-DIRECTION
检查方式：visual

### LINE-SHADE · must · proposed

适用：global

轮廓连续清楚，内部细节节制；明暗以基色加一级块状阴影表达。

原因：降低逐张切换画法造成的差异。

允许变化：

- 线宽按实际显示尺度成套调整。

依据：MIRA-STYLE, MIRA-DIRECTION
检查方式：visual

### IDENTITY-FACE · must · proposed

适用：character

换装或换姿势仍参照左上 Mira 候选角色及其头像：暖肤色、简化深色大眼、圆润面部及其相对比例；不得把任务解释为重新设计长相。小图不足以保证精细面部一致。

原因：区分同一角色的新任务与重新设计角色。

允许变化：

- 可在本次表情槽位范围变化；需要实际并排检查。

依据：MIRA-IDENTITY
检查方式：visual

### IDENTITY-HAIR · must · proposed

适用：character

保留候选参考中的深蓝短波波头、侧分及微卷的主要轮廓；雨衣或姿势不授权改变发色、发际或头发长度。

原因：头发是此候选角色的识别线索。

允许变化：

- 随动作有轻微发丝移动，关键轮廓仍应可识别。

依据：MIRA-IDENTITY
检查方式：visual

### OUTFIT-SLOT · must · proposed

适用：character

珊瑚短夹克、奶油围巾与薄荷挎包为默认衣装；任务明确改 outfit 时允许替换它们，未指定 outfit 时继承默认值。

原因：使换装有创意空间，同时避免姿势任务顺带重设计衣装。

允许变化：

- 雨衣剪裁、配件与配色可作为候选探索。

依据：MIRA-DIRECTION
检查方式：visual

### REVIEW-IDENTITY · must · proposed

适用：character

生成后逐张比较参考与新图的面部、头发、年龄观感、风格和任务变更；未看图、细节不足或意见不一致均保留 unknown。

原因：结构化身份规则不能自动证明图像没有变脸。

允许变化：

- 无 / 尚未定义

依据：MIRA-DIRECTION
检查方式：human

### DELIVERY-SOURCE · must · proposed

适用：global

任务书、实际生成原图、修改后的可编辑源、导出文件和检查证据分别留存，携带项目版本与指纹；当前演示没有新生成图像或 PSD。

原因：后续成员可追溯依据，避免把概念图冒充生产文件。

允许变化：

- 无 / 尚未定义

依据：MIRA-DIRECTION
检查方式：technical

### CREATIVE-ADOPTION · must · proposed

适用：global

探索只在开放槽位内进行；优秀候选需记录收益、返工成本和排期影响，由真实负责人决定是否提升项目规范版本。

原因：底线保留，创意发现可以改变后续基线。

允许变化：

- 无 / 尚未定义

依据：MIRA-DIRECTION
检查方式：human

## 参考资产

style 控制画风；identity 控制同一对象身份；composition 控制构图；material 控制材质；context 检查实际场景与尺寸；counterexample 仅说明应避免的结果；font 提供字体依据。候选参考不可冒充已批准参考。

- `MIRA-STYLE` · style · candidate · `references/style-board.png`
  适用：global；说明：原创综合候选风格板；不是正式资产库或审批证据。
  来源：{"type": "generated_candidate_copy", "source": "原创 Pop Borough 候选综合板的逐字节拷贝", "source_sha256": "6e281fc7a35749b83a054683e23668264dd1bfba5892c9b772dfeca6727a3453", "approval": "none"}

- `MIRA-IDENTITY` · identity · candidate · `references/identity-candidate-board.png`
  适用：character；说明：仅指向图中左上角送货员 Mira 及其旁边头像。候选身份引用；未裁切、未编辑，缺精细脸部和转面，不能宣称已锁定身份。
  来源：{"type": "candidate_region_reference", "source": "同一原创图中的可见候选角色", "source_sha256": "6e281fc7a35749b83a054683e23668264dd1bfba5892c9b772dfeca6727a3453", "region_description": "左上角角色与相邻头像，仅作候选对象定位", "approval": "none"}

- `MIRA-DIRECTION` · context · candidate · `references/art-direction.md`
  适用：global；说明：公开演示的原创文本方向，区分身份、默认衣装和探索槽位。此文件须由 Agent 阅读，不能作为图像模型图片附件。
  来源：{"type": "authored_demo", "source": "原创工作流示范文本", "approval": "none"}

## character

在同一候选角色下制作换装或姿态提案，再实际检查身份与风格。

固定约束：

- 同一候选人物的脸部与头发识别线索
- 轻量美式漫画轮廓、色系与块状阴影

可变范围：

- outfit
- pose
- expression
- composition

技术规格（仅作为项目要求，CLI 不对生成资产自动检测这些项目）：

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

任务变量与探索预算（由 project_runtime 校验；不会覆盖身份或固定规则）：

```json
{
  "slots": {
    "outfit": {
      "default": "珊瑚短夹克、奶油围巾、薄荷挎包；默认衣装可由本次任务替换",
      "guidance": "可改服装剪裁、颜色与配件；不可据此改变脸、头发和年龄观感。"
    },
    "pose": {
      "default": "自然站姿，手臂清楚可读",
      "guidance": "改变姿势时检查肢体、手部和遮挡，保留候选身份。"
    },
    "expression": {
      "default": "友好轻微微笑",
      "guidance": "保持面部比例与人物年龄观感，仅调整允许的表情。"
    },
    "composition": {
      "default": "独立单角色全身，四周留出裁切安全区",
      "guidance": "构图可探索，但不要添加未要求的文字或把背景烘焙成正式透明资产。"
    }
  },
  "exploration": {
    "allowed_slots": [
      "outfit",
      "pose",
      "expression",
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
    "id": "mira",
    "kind": "character",
    "identity_rules": [
      "IDENTITY-FACE",
      "IDENTITY-HAIR"
    ],
    "reference_ids": [
      "MIRA-IDENTITY"
    ],
    "fixed_features": [
      "暖肤色与参考脸部相对比例（精细细节未验证）",
      "深蓝短侧分微卷波波头",
      "候选人物的年龄观感"
    ],
    "variations": [
      "outfit",
      "pose",
      "expression",
      "composition"
    ],
    "aliases": [
      "女主",
      "米拉"
    ]
  }
]
```

## 制作配方

```json
[
  {
    "id": "reference-guided-candidate",
    "tool": "目标环境中实际可用且已授权的图像编辑工具",
    "model": "unknown",
    "capabilities": [
      "reference-image",
      "edit"
    ],
    "instructions": "先查看候选图并阅读文本方向；同一图片按 SHA 去重后发送一次，说明风格与候选身份双重用途。只加任务变化，保留身份底线，实际生成后保存回执并逐张检查。无图像工具时仅交接任务书。",
    "reference_ids": [
      "MIRA-STYLE",
      "MIRA-IDENTITY",
      "MIRA-DIRECTION"
    ],
    "limitations": [
      "没有已批准的精细身份母版",
      "任务书不会自行调用图像工具或 PS",
      "哈希与规则绑定不能证明画面风格和身份正确"
    ],
    "status": "untested"
  }
]
```

## 决策记录

```json
[
  {
    "id": "PUBLIC-DEMO",
    "decision": "以原创 Mira 示范换装与姿势的低门槛成员入口，保留独立候选版本和未完成检查。",
    "rationale": "公开展示团队流程，不使用客户的角色或源图。",
    "status": "proposed",
    "source": "受托编写的原创公开工作流案例"
  }
]
```

## 待决问题

- 尚无真实负责人确认的精细角色设定图与批准记录
- 需要真实图像模型生成并检查身份、风格和候选差异
- 需要确认正式画布、显示尺寸、锚点与 PS 等可编辑交付要求
- 需要用真实团队实验评估身份错误、首次通过率和返工轮次

## 审批记录

```json
null
```

审批字段及证据文件只证明存在该记录；本工具不验证审批者身份、授权、资产权利或美术质量。
