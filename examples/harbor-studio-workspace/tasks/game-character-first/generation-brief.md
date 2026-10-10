# game-character-first · 生成交接

状态：**prepared_for_exploration**；正式交付批准：否。
项目 `harbor-studio` / 版本 `0.5.0` / 指纹 `6c0e0e9ae893db942198b590fdee9911e92133d7c50c5d92cb7237a9cb2f2d75`

## 本次任务

按送货员家族做侧身招手首件，保留脸和发型，沿用默认衣装。

主体：mira；类目：character；模式：exploration

## 不变的判断

以下规则、固定特征与画风要求在探索中同样保留；变化只适用于明确开放的变量。发现新要求与 must/fixed 冲突时，先交主美处理，不自动丢弃旧规则。

- [STYLE-01] must / proposed：候选风格采用轻量美式报刊与周日漫画气氛：宽松清晰轮廓、扁平色块、友善日光和可辨识的简化形体。
- [PALETTE-01] must / proposed：以暖奶油paper为底、深蓝灰ink为描边，主体使用coral、mint、yellow、blue；粉花可使用flower_pink_proposed候选色。新增颜色应说明用途与取舍。
- [LINE-01] must / proposed：深蓝灰轮廓保持连续、宽松和清楚，内部细节少于外形信息；线宽随显示尺度统一调整，不能逐张随意改变。
- [SHADE-01] must / proposed：采用基色加一级块状阴影的两级明暗，不依靠连续渐变或真实反射塑造体积。
- [READ-01] must / proposed：在任务实际显示尺度、背景和相邻资产中检查轮廓与层级；仅看放大单图不能记录为可读性通过。
- [REF-01] must / proposed：综合板表达候选视觉语言，左上人物另登记为候选身份区域；它不替代精细转面、真实 UI、首件或组合的批准样板。
- [CHAR-01] must / proposed：Mira 的候选身份是深蓝短侧分波波头、暖肤与原参考的脸部比例；衣装不是永久身份，指定换装时开放衣装槽位。
- [CHAR-02] should / proposed：姿态用清楚的大动作表达，面部细节节制；角色与棋盘同屏时不能占据关键操作区域。
- [DELIVERY-01] must / proposed：每个交付项携带asset_id、task_id、项目id、规范版本与实际指纹，并记录实际工具、参考来源、可用设置、文件位置和未完成检查。
- [REVIEW-01] must / proposed：分别记录版本门、艺术门与工程门的检查；无证据、未查看或未测试均不能记为通过。模拟数据和draft包不得转述为总监批准或真实量产交付。

固定的类目要求：
- 同一候选人物的脸部与头发识别线索
- 轻量美式漫画轮廓、色系与块状阴影

固定的实体特征：
- 候选脸部比例与暖肤
- 短深蓝侧分波波头
- 一致年龄观感

## 已解析变量


## 组件/资产家族：courier-character · 送货员角色与表情姿态 · proposed
让同一角色在任务状态中持续可辨。
固定要求：
- 脸与短发轮廓
- 整体比例和年龄感
允许变化：
- 衣装
- 姿态
- 表情
家族技术约束：
```json
{
  "approved_turnaround": null,
  "output_size": null
}
```
- outfit：珊瑚短夹克、奶油围巾、薄荷挎包；默认衣装可由本次任务替换（继承默认值）；边界：可改服装剪裁、颜色与配件；不可据此改变脸、头发和年龄观感。
- pose：侧身招手（本次显式修改）；边界：改变姿势时检查肢体、手部和遮挡，保留候选身份。
- expression：友好轻微微笑（继承默认值）；边界：保持面部比例与人物年龄观感，仅调整允许的表情。
- composition：独立单角色全身，四周留出裁切安全区（继承默认值）；边界：构图可探索，但不要添加未要求的文字或把背景烘焙成正式透明资产。

本次抽卡预算 2 个候选；可探索：pose。规范预算上限 3，由主美可调；不是项目创意上限。
候选不会自动改写基线；记录更好的效果、制作成本、排期与兼容影响，由主美选择后建立新版本。

## 参考图片与说明材料

先区分文件类型：Markdown、文本和规范文档只供 Agent 阅读整理，不作为图像模型的图片输入。实际可读取且工具支持的图片才作为图像输入；SHA256 相同的图片只传一次，同时说明其多个参考角色与区域。不能把文本方向当作已具备的商品图或身份图。

相对路径从工作区根目录定位，保持整个工作区一起移动即可；绝对路径仅供当前机器便捷取用。

- PB-STYLE-BOARD · style / candidate_exploration_only
  - 路径：`releases/0.5.0/references/style-board.png`
  - 当前绝对路径：`<PROJECT_ROOT>\examples\harbor-studio-workspace\releases\0.5.0\references\style-board.png`
  - SHA256：`6e281fc7a35749b83a054683e23668264dd1bfba5892c9b772dfeca6727a3453`
  - 用法：原有原创 Pop Borough 综合板，供讨论整体风格；不是已批准首件，也不是可直接使用的独立图集。
- PB-ART-DIRECTION · context / candidate_exploration_only
  - 路径：`releases/0.5.0/references/director-source-notes.md`
  - 当前绝对路径：`<PROJECT_ROOT>\examples\harbor-studio-workspace\releases\0.5.0\references\director-source-notes.md`
  - SHA256：`99cc06bf6508f596aa19bb52730f0f55c964cc494c07ba28b78ed864d7811c35`
  - 用法：Agent 整理的原创项目讨论稿，记录使用情境与关键待定项。
- HS-IDENTITY · identity / candidate_exploration_only
  - 路径：`releases/0.5.0/references/identity-candidate.png`
  - 当前绝对路径：`<PROJECT_ROOT>\examples\harbor-studio-workspace\releases\0.5.0\references\identity-candidate.png`
  - SHA256：`6e281fc7a35749b83a054683e23668264dd1bfba5892c9b772dfeca6727a3453`
  - 用法：仅取综合板左上角色及其头像的候选身份线索；该文件与风格板字节相同，模型输入按哈希去重。脸部精度、转面未验证。

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

## 家族、样板与渠道验收

- `family/courier-character/fixed/1` · 来源状态 proposed · unknown：脸与短发轮廓
- `family/courier-character/fixed/2` · 来源状态 proposed · unknown：整体比例和年龄感
- `family/courier-character/technical` · 来源状态 proposed · unknown：按家族技术约束核对：{"approved_turnaround": null, "output_size": null}
- `rule/CHAR-01` · 来源状态 proposed · unknown：Mira 的候选身份是深蓝短侧分波波头、暖肤与原参考的脸部比例；衣装不是永久身份，指定换装时开放衣装槽位。
- `rule/CHAR-02` · 来源状态 proposed · unknown：姿态用清楚的大动作表达，面部细节节制；角色与棋盘同屏时不能占据关键操作区域。
- `exemplar/direction-board/acceptance/1` · 来源状态 candidate · unknown：说明借鉴部分和不继承的细节
- `exemplar/direction-board/acceptance/2` · 来源状态 candidate · unknown：所有判断仍为候选
- `exemplar/character-first/acceptance/1` · 来源状态 planned · unknown：对照精细脸部和转面
- `exemplar/character-first/acceptance/2` · 来源状态 planned · unknown：新姿态仍是同一人
- `exemplar/character-first/acceptance/3` · 来源状态 planned · unknown：实际交付尺度与透明边缘
- `exemplar/street-first/acceptance/1` · 来源状态 planned · unknown：人物与入口比例合理
- `exemplar/street-first/acceptance/2` · 来源状态 planned · unknown：棋盘位置可读
- `exemplar/street-first/acceptance/3` · 来源状态 planned · unknown：图层可独立交接
- `delivery/game-runtime/requirement/1` · 来源状态 proposed · unknown：交付可编辑源、单件导出、组合预览与检查记录
- `delivery/game-runtime/requirement/2` · 来源状态 proposed · unknown：首件被接收后再按同一版本扩批
- `delivery/game-runtime/requirement/3` · 来源状态 proposed · unknown：外包与内制使用同一资产编号和验收标准
- `delivery/game-runtime/technical` · 来源状态 proposed · unknown：按渠道技术约束核对：{"final_dimensions": null, "color_export_profile": null}
- `delivery/game-campaign/requirement/1` · 来源状态 proposed · unknown：渠道按各自画布重排而非拉伸
- `delivery/game-campaign/requirement/2` · 来源状态 proposed · unknown：真实文字可编辑，保留必要安全区
- `delivery/game-campaign/requirement/3` · 来源状态 proposed · unknown：记录引用单件的版本和负责人
- `delivery/game-campaign/technical` · 来源状态 proposed · unknown：按渠道技术约束核对：{"final_dimensions": null, "color_export_profile": null}

## 项目未定事项（按本任务用途核对）

- 确认目标玩家与设备环境
- 建立各家族代表样板与真实批准记录
- 确认字体、尺寸、锚点和动效格式
- 指定首件与组合评审责任人、批次节奏和预算

任务已准备不表示材料齐备；缺关键参考时可继续规划，实际制作与正式交付仍需相应材料及检查。
