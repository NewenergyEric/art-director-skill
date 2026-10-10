# 交付与验收规范

项目 `campaign-studio` / 版本 `0.5.0` / 源状态 `draft`

交付状态：草案交付，尚未经 release 构建。

规范指纹：`7e3c4e7d75077ba0183e813653d6c5363533a3898387784488167b6e7f8842dd`

由 style-pack.json 派生。修改规范请修改源文件并重建新版本；本手册不是独立审批或第二份规范源。unknown / proposed / planned / candidate 都不等于已确认，未明确参数不得推测为专业定值。

首件确认后再扩批；原始生成、编辑源文件、单件导出、组合检查和批次记录分别留证。以下是项目声明的要求，工具没有自动执行编辑器或艺术验收。

## 检查与批次

成员任务生成的 review.json 初始均为 unknown。实际记录 pass/fail/unknown 与对应证据；unknown 不能当通过。运行包内 scripts/team_batch.py 检查指纹、文件和评审记录，艺术批准由真实负责人作出。

## campaign-assets · 单件组件交付 · proposed
类别：product, graphic, typography, ui
渠道：设计源文件, 活动合成组件
- 商品、图形和可编辑文字分别交接
- 未提供价格、折扣或日期时保持待补
- 保留版本、素材来源和修改记录
```json
{
  "final_dimensions": null,
  "color_export_profile": null
}
```
来源：本原创案例的交付讨论稿；最终尺寸和输出配置待实际目标环境确定。

## campaign-channels · 多尺寸多渠道交付 · proposed
类别：layout, typography, ui
渠道：电商横幅, 竖版宣传海报, 社媒模板
- 每个渠道有实际尺寸导出和合成预览
- 内容源相同，按渠道重新组织层级
- 最终检查事实、裁切、可读性和组成版本
```json
{
  "final_dimensions": null,
  "color_export_profile": null
}
```
来源：本原创案例的交付讨论稿；最终尺寸和输出配置待实际目标环境确定。
