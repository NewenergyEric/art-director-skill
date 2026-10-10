# campaign-ui-first · 生成交接

状态：**prepared_for_exploration**；正式交付批准：否。
项目 `campaign-studio` / 版本 `0.5.0` / 指纹 `7e3c4e7d75077ba0183e813653d6c5363533a3898387784488167b6e7f8842dd`

## 本次任务

沿用活动视觉规范准备主次按钮和不可用状态。

主体：未绑定既有实体；类目：ui；模式：exploration

## 不变的判断

以下规则、固定特征与画风要求在探索中同样保留；变化只适用于明确开放的变量。发现新要求与 must/fixed 冲突时，先交主美处理，不自动丢弃旧规则。

- [CAMPAIGN-STYLE] must / proposed：候选活动方向采用奶油底色、柑橘色点缀与深色文字，信息清楚；具体颜色和样板尚待品牌负责人确认。

固定的类目要求：
- 行动可读
- 主次关系稳定
- 状态有区别

固定的实体特征：
- 无 / 尚未定义

## 已解析变量


## 组件/资产家族：action-controls · 活动按钮与 UI 状态 · proposed
让不同岗位的产物能在同一活动下复用和组合。
固定要求：
- 主次关系
- 行动文案可读
允许变化：
- 宽度
- 状态表现
家族技术约束：
```json
{
  "final_sizes": null
}
```
- state：默认、按下、不可用（本次显式修改）；边界：设计按下和不可用状态，但不捏造交互已经实现

本次抽卡预算 2 个候选；可探索：state。规范预算上限 3，由主美可调；不是项目创意上限。
候选不会自动改写基线；记录更好的效果、制作成本、排期与兼容影响，由主美选择后建立新版本。

## 参考图片与说明材料

先区分文件类型：Markdown、文本和规范文档只供 Agent 阅读整理，不作为图像模型的图片输入。实际可读取且工具支持的图片才作为图像输入；SHA256 相同的图片只传一次，同时说明其多个参考角色与区域。不能把文本方向当作已具备的商品图或身份图。

相对路径从工作区根目录定位，保持整个工作区一起移动即可；绝对路径仅供当前机器便捷取用。

- CAMPAIGN-BRIEF · context / candidate_exploration_only
  - 路径：`releases/0.5.0/references/campaign-brief.md`
  - 当前绝对路径：`<PROJECT_ROOT>\examples\campaign-studio-workspace\releases\0.5.0\references\campaign-brief.md`
  - SHA256：`289c49ce7c2dc088ed68be651e7a8759e2d2529d1ed65b60ffe01b82a8b71563`
  - 用法：真实存在的文本演示方向，未提供商品/品牌图像或正式活动数据。

反例只用于否定和质检；不要当正向参考。候选图只能作为候选探索来源。调用前实际查看参考；没有图片读取或图像模型时交接本 brief，不能声称已经生成。

## 技术要求

```json
{
  "font_file": null,
  "final_size": null
}
```

所有结果仍须按 review.json 中的 unknown 检查逐项提供真实证据。脚本不验证面孔相似度、颜色风格或语义矛盾。

## 家族、样板与渠道验收

- `family/action-controls/fixed/1` · 来源状态 proposed · unknown：主次关系
- `family/action-controls/fixed/2` · 来源状态 proposed · unknown：行动文案可读
- `family/action-controls/technical` · 来源状态 proposed · unknown：按家族技术约束核对：{"final_sizes": null}
- `exemplar/component-first/acceptance/1` · 来源状态 planned · unknown：真实字体和文案
- `exemplar/component-first/acceptance/2` · 来源状态 planned · unknown：主次与状态可辨
- `exemplar/component-first/acceptance/3` · 来源状态 planned · unknown：组合时不遮住行动区域
- `delivery/campaign-assets/requirement/1` · 来源状态 proposed · unknown：商品、图形和可编辑文字分别交接
- `delivery/campaign-assets/requirement/2` · 来源状态 proposed · unknown：未提供价格、折扣或日期时保持待补
- `delivery/campaign-assets/requirement/3` · 来源状态 proposed · unknown：保留版本、素材来源和修改记录
- `delivery/campaign-assets/technical` · 来源状态 proposed · unknown：按渠道技术约束核对：{"final_dimensions": null, "color_export_profile": null}
- `delivery/campaign-channels/requirement/1` · 来源状态 proposed · unknown：每个渠道有实际尺寸导出和合成预览
- `delivery/campaign-channels/requirement/2` · 来源状态 proposed · unknown：内容源相同，按渠道重新组织层级
- `delivery/campaign-channels/requirement/3` · 来源状态 proposed · unknown：最终检查事实、裁切、可读性和组成版本
- `delivery/campaign-channels/technical` · 来源状态 proposed · unknown：按渠道技术约束核对：{"final_dimensions": null, "color_export_profile": null}

## 项目未定事项（按本任务用途核对）

- 缺真实商品母版、品牌标识和批准风格样板
- 缺正式活动文字、价格、日期与细则
- 缺已选字体及实际渠道尺寸
- 尚未生成图像或进行PS/Figma排版、投放验收

任务已准备不表示材料齐备；缺关键参考时可继续规划，实际制作与正式交付仍需相应材料及检查。
