# campaign-layout-first · 生成交接

状态：**prepared_for_exploration**；正式交付批准：否。
项目 `campaign-studio` / 版本 `0.5.0` / 指纹 `7e3c4e7d75077ba0183e813653d6c5363533a3898387784488167b6e7f8842dd`

## 本次任务

按主美活动规范准备横幅、竖版和社媒的组合首件，商品与文字不重新发明；缺的真实资料先列清。

主体：未绑定既有实体；类目：layout；模式：exploration

## 不变的判断

以下规则、固定特征与画风要求在探索中同样保留；变化只适用于明确开放的变量。发现新要求与 must/fixed 冲突时，先交主美处理，不自动丢弃旧规则。

- [CAMPAIGN-STYLE] must / proposed：候选活动方向采用奶油底色、柑橘色点缀与深色文字，信息清楚；具体颜色和样板尚待品牌负责人确认。
- [COPY-TRUTH] must / proposed：本案例只提供占位活动标题‘周末轻饮’，不是投放文案。价格、优惠、时间和细则未给出时保持待补，不自行填写。真实文案用可编辑文字层排版逐字核对。
- [COMPOSITION-CONTEXT] must / proposed：组合任务同时读取商品、装饰、字体规则；在目标画布检查商品占比、信息顺序、遮挡、安全区及渠道裁切，并与系列其他尺寸并排比较。
- [PRODUCT-IDENTITY] must / proposed：商品瓶型、包装、标识、容量和真实标签沿用品牌母版；母版尚缺，不能凭文字合成的包装作为真实商品交付。
- [DECORATION-SPACE] must / proposed：装饰元素保留独立透明文件，不烘焙价格和品牌字；合成后不覆盖标签、主要文案及点击区域。
- [TYPE-HIERARCHY] must / proposed：按活动标题、核心利益、行动信息和细则定义层级；字体文件、字重与最小显示字号都待实际选定和检验。

固定的类目要求：
- 商品身份与品牌标识不重设计
- 价格文案来源可核对
- 组成元素版本一致

固定的实体特征：
- 无 / 尚未定义

## 已解析变量


## 组件/资产家族：channel-layouts · 横幅、海报和社媒模板 · proposed
让不同岗位的产物能在同一活动下复用和组合。
固定要求：
- 商品身份
- 信息优先级
- 组成元素同版
允许变化：
- 构图
- 渠道重排
- 安全区提案
家族技术约束：
```json
{
  "final_sizes": null
}
```
- composition：商品和活动信息分层，按三种渠道重排（本次显式修改）；边界：可探索构图关系但不可改商品包装或虚构促销事实。

组合组件：product / hero-bottle；同一冻结版本与指纹。
固定类目要求：
- 商品包装与标识来自同一批准母版
固定实体特征：
- 真实瓶型、包装、标识、容量待母版提供
家族：product-master · proposed
- 真实包装、瓶型与标识
家族技术约束：
```json
{
  "final_sizes": null
}
```

组合组件：graphic / 类别规范；同一冻结版本与指纹。
固定类目要求：
- 候选活动色板
- 不包含未经提供的文字与标识
固定实体特征：
- 无 / 尚未定义
家族：campaign-decor · proposed
- 活动色域
- 无虚构文案和成分暗示
家族技术约束：
```json
{
  "final_sizes": null
}
```

组合组件：typography / 类别规范；同一冻结版本与指纹。
固定类目要求：
- 不猜价格/折扣/活动日期
- 文字层可编辑
固定实体特征：
- 无 / 尚未定义
家族：campaign-type · proposed
- 标题、利益、行动、细则层级
- 真实文字和字体
家族技术约束：
```json
{
  "final_sizes": null
}
```

组合组件：ui / 类别规范；同一冻结版本与指纹。
固定类目要求：
- 行动可读
- 主次关系稳定
- 状态有区别
固定实体特征：
- 无 / 尚未定义
家族：action-controls · proposed
- 主次关系
- 行动文案可读
家族技术约束：
```json
{
  "final_sizes": null
}
```

本次抽卡预算 2 个候选；可探索：composition。规范预算上限 3，由主美可调；不是项目创意上限。
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

所有结果仍须按 review.json 中的 unknown 检查逐项提供真实证据。脚本不验证面孔相似度、颜色风格或语义矛盾。

## 家族、样板与渠道验收

- `family/channel-layouts/fixed/1` · 来源状态 proposed · unknown：商品身份
- `family/channel-layouts/fixed/2` · 来源状态 proposed · unknown：信息优先级
- `family/channel-layouts/fixed/3` · 来源状态 proposed · unknown：组成元素同版
- `family/channel-layouts/technical` · 来源状态 proposed · unknown：按家族技术约束核对：{"final_sizes": null}
- `rule/COMPOSITION-CONTEXT` · 来源状态 proposed · unknown：组合任务同时读取商品、装饰、字体规则；在目标画布检查商品占比、信息顺序、遮挡、安全区及渠道裁切，并与系列其他尺寸并排比较。
- `exemplar/channel-first/acceptance/1` · 来源状态 planned · unknown：商品与活动身份保持
- `exemplar/channel-first/acceptance/2` · 来源状态 planned · unknown：各渠道真实裁切与安全区
- `exemplar/channel-first/acceptance/3` · 来源状态 planned · unknown：实际尺寸看文字和信息顺序
- `delivery/campaign-channels/requirement/1` · 来源状态 proposed · unknown：每个渠道有实际尺寸导出和合成预览
- `delivery/campaign-channels/requirement/2` · 来源状态 proposed · unknown：内容源相同，按渠道重新组织层级
- `delivery/campaign-channels/requirement/3` · 来源状态 proposed · unknown：最终检查事实、裁切、可读性和组成版本
- `delivery/campaign-channels/technical` · 来源状态 proposed · unknown：按渠道技术约束核对：{"final_dimensions": null, "color_export_profile": null}
- `family/product-master/fixed/1` · 来源状态 proposed · unknown：真实包装、瓶型与标识
- `family/product-master/technical` · 来源状态 proposed · unknown：按家族技术约束核对：{"final_sizes": null}
- `rule/PRODUCT-IDENTITY` · 来源状态 proposed · unknown：商品瓶型、包装、标识、容量和真实标签沿用品牌母版；母版尚缺，不能凭文字合成的包装作为真实商品交付。
- `exemplar/product-first/acceptance/1` · 来源状态 planned · unknown：比对真实商品母版
- `exemplar/product-first/acceptance/2` · 来源状态 planned · unknown：包装文字不被改写
- `exemplar/product-first/acceptance/3` · 来源状态 planned · unknown：边缘和遮挡可用
- `delivery/campaign-assets/requirement/1` · 来源状态 proposed · unknown：商品、图形和可编辑文字分别交接
- `delivery/campaign-assets/requirement/2` · 来源状态 proposed · unknown：未提供价格、折扣或日期时保持待补
- `delivery/campaign-assets/requirement/3` · 来源状态 proposed · unknown：保留版本、素材来源和修改记录
- `delivery/campaign-assets/technical` · 来源状态 proposed · unknown：按渠道技术约束核对：{"final_dimensions": null, "color_export_profile": null}
- `family/campaign-decor/fixed/1` · 来源状态 proposed · unknown：活动色域
- `family/campaign-decor/fixed/2` · 来源状态 proposed · unknown：无虚构文案和成分暗示
- `family/campaign-decor/technical` · 来源状态 proposed · unknown：按家族技术约束核对：{"final_sizes": null}
- `rule/DECORATION-SPACE` · 来源状态 proposed · unknown：装饰元素保留独立透明文件，不烘焙价格和品牌字；合成后不覆盖标签、主要文案及点击区域。
- `exemplar/component-first/acceptance/1` · 来源状态 planned · unknown：真实字体和文案
- `exemplar/component-first/acceptance/2` · 来源状态 planned · unknown：主次与状态可辨
- `exemplar/component-first/acceptance/3` · 来源状态 planned · unknown：组合时不遮住行动区域
- `family/campaign-type/fixed/1` · 来源状态 proposed · unknown：标题、利益、行动、细则层级
- `family/campaign-type/fixed/2` · 来源状态 proposed · unknown：真实文字和字体
- `family/campaign-type/technical` · 来源状态 proposed · unknown：按家族技术约束核对：{"final_sizes": null}
- `rule/TYPE-HIERARCHY` · 来源状态 proposed · unknown：按活动标题、核心利益、行动信息和细则定义层级；字体文件、字重与最小显示字号都待实际选定和检验。
- `family/action-controls/fixed/1` · 来源状态 proposed · unknown：主次关系
- `family/action-controls/fixed/2` · 来源状态 proposed · unknown：行动文案可读
- `family/action-controls/technical` · 来源状态 proposed · unknown：按家族技术约束核对：{"final_sizes": null}

## 项目未定事项（按本任务用途核对）

- 缺真实商品母版、品牌标识和批准风格样板
- 缺正式活动文字、价格、日期与细则
- 缺已选字体及实际渠道尺寸
- 尚未生成图像或进行PS/Figma排版、投放验收

任务已准备不表示材料齐备；缺关键参考时可继续规划，实际制作与正式交付仍需相应材料及检查。
