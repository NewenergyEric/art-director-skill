# mira-production-001 · 生成交接

状态：**blocked**；正式交付批准：否。
项目 `mira-public-demo` / 版本 `0.2.0` / 指纹 `d7f74d3a2f5e76d7c380d4dc4b80a8f200f7e6655ff2e2c1985ade45d35a6624`

## 本次任务

把女主换成雨衣并摆挥手姿势，作为正式资产交付。

主体：mira；类目：character；模式：production

## 不变的判断

以下规则、固定特征与画风要求在探索中同样保留；变化只适用于明确开放的变量。发现新要求与 must/fixed 冲突时，先交主美处理，不自动丢弃旧规则。

- [STYLE-01] must / proposed：候选风格采用轻量美式漫画：清晰的深蓝灰轮廓、扁平色块、友好日光和简化形体。
- [PALETTE-01] must / proposed：以暖奶油、深蓝灰和珊瑚/薄荷/黄/蓝形成候选色系；衣装变化仍需与同一色系协调。
- [LINE-SHADE] must / proposed：轮廓连续清楚，内部细节节制；明暗以基色加一级块状阴影表达。
- [IDENTITY-FACE] must / proposed：换装或换姿势仍参照左上 Mira 候选角色及其头像：暖肤色、简化深色大眼、圆润面部及其相对比例；不得把任务解释为重新设计长相。小图不足以保证精细面部一致。
- [IDENTITY-HAIR] must / proposed：保留候选参考中的深蓝短波波头、侧分及微卷的主要轮廓；雨衣或姿势不授权改变发色、发际或头发长度。
- [OUTFIT-SLOT] must / proposed：珊瑚短夹克、奶油围巾与薄荷挎包为默认衣装；任务明确改 outfit 时允许替换它们，未指定 outfit 时继承默认值。
- [REVIEW-IDENTITY] must / proposed：生成后逐张比较参考与新图的面部、头发、年龄观感、风格和任务变更；未看图、细节不足或意见不一致均保留 unknown。
- [DELIVERY-SOURCE] must / proposed：任务书、实际生成原图、修改后的可编辑源、导出文件和检查证据分别留存，携带项目版本与指纹；当前演示没有新生成图像或 PSD。
- [CREATIVE-ADOPTION] must / proposed：探索只在开放槽位内进行；优秀候选需记录收益、返工成本和排期影响，由真实负责人决定是否提升项目规范版本。

固定的类目要求：
- 同一候选人物的脸部与头发识别线索
- 轻量美式漫画轮廓、色系与块状阴影

固定的实体特征：
- 暖肤色与参考脸部相对比例（精细细节未验证）
- 深蓝短侧分微卷波波头
- 候选人物的年龄观感

## 已解析变量

- outfit：轻便黄色雨衣（本次显式修改）；边界：可改服装剪裁、颜色与配件；不可据此改变脸、头发和年龄观感。
- pose：抬手挥手（本次显式修改）；边界：改变姿势时检查肢体、手部和遮挡，保留候选身份。
- expression：友好轻微微笑（继承默认值）；边界：保持面部比例与人物年龄观感，仅调整允许的表情。
- composition：独立单角色全身，四周留出裁切安全区（继承默认值）；边界：构图可探索，但不要添加未要求的文字或把背景烘焙成正式透明资产。

## 参考图片与说明材料

先区分文件类型：Markdown、文本和规范文档只供 Agent 阅读整理，不作为图像模型的图片输入。实际可读取且工具支持的图片才作为图像输入；SHA256 相同的图片只传一次，同时说明其多个参考角色与区域。不能把文本方向当作已具备的商品图或身份图。

相对路径从工作区根目录定位，保持整个工作区一起移动即可；绝对路径仅供当前机器便捷取用。

- MIRA-STYLE · style / candidate_exploration_only
  - 路径：`releases/0.2.0/references/style-board.png`
  - 当前绝对路径：`<PROJECT_ROOT>\examples\mira-public-workspace\releases\0.2.0\references\style-board.png`
  - SHA256：`6e281fc7a35749b83a054683e23668264dd1bfba5892c9b772dfeca6727a3453`
  - 用法：原创综合候选风格板；不是正式资产库或审批证据。
- MIRA-IDENTITY · identity / candidate_exploration_only
  - 路径：`releases/0.2.0/references/identity-candidate-board.png`
  - 当前绝对路径：`<PROJECT_ROOT>\examples\mira-public-workspace\releases\0.2.0\references\identity-candidate-board.png`
  - SHA256：`6e281fc7a35749b83a054683e23668264dd1bfba5892c9b772dfeca6727a3453`
  - 用法：仅指向图中左上角送货员 Mira 及其旁边头像。候选身份引用；未裁切、未编辑，缺精细脸部和转面，不能宣称已锁定身份。
- MIRA-DIRECTION · context / candidate_exploration_only
  - 路径：`releases/0.2.0/references/art-direction.md`
  - 当前绝对路径：`<PROJECT_ROOT>\examples\mira-public-workspace\releases\0.2.0\references\art-direction.md`
  - SHA256：`a3f67515cf4d985770bb0946c2e715e2a204d25cef2194785ade4a31487a1716`
  - 用法：公开演示的原创文本方向，区分身份、默认衣装和探索槽位。此文件须由 Agent 阅读，不能作为图像模型图片附件。

反例只用于否定和质检；不要当正向参考。候选图只能作为候选探索来源。调用前实际查看参考；没有图片读取或图像模型时交接本 brief，不能声称已经生成。

## 技术要求

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

所有结果仍须按 review.json 中的 unknown 检查逐项提供真实证据。脚本不验证面孔相似度、颜色风格或语义矛盾。

## 阻断

- 当前包未经 release 构建，仅可候选探索，不能作为正式生产基线；请主美完成真实确认和发布，或明确建立探索任务。

## 项目未定事项（按本任务用途核对）

- 尚无真实负责人确认的精细角色设定图与批准记录
- 需要真实图像模型生成并检查身份、风格和候选差异
- 需要确认正式画布、显示尺寸、锚点与 PS 等可编辑交付要求
- 需要用真实团队实验评估身份错误、首次通过率和返工轮次

任务已准备不表示材料齐备；缺关键参考时可继续规划，实际制作与正式交付仍需相应材料及检查。
