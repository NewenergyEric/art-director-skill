# 交付与验收规范

项目 `harbor-studio` / 版本 `0.5.0` / 源状态 `draft`

交付状态：草案交付，尚未经 release 构建。

规范指纹：`6c0e0e9ae893db942198b590fdee9911e92133d7c50c5d92cb7237a9cb2f2d75`

由 style-pack.json 派生。修改规范请修改源文件并重建新版本；本手册不是独立审批或第二份规范源。unknown / proposed / planned / candidate 都不等于已确认，未明确参数不得推测为专业定值。

首件确认后再扩批；原始生成、编辑源文件、单件导出、组合检查和批次记录分别留证。以下是项目声明的要求，工具没有自动执行编辑器或艺术验收。

## 检查与批次

成员任务生成的 review.json 初始均为 unknown。实际记录 pass/fail/unknown 与对应证据；unknown 不能当通过。运行包内 scripts/team_batch.py 检查指纹、文件和评审记录，艺术批准由真实负责人作出。

## game-runtime · 游戏内单件和组合 · proposed
类别：character, environment, tile, prop, ui, motion, typography
渠道：目标游戏界面, 实际目标设备
- 交付可编辑源、单件导出、组合预览与检查记录
- 首件被接收后再按同一版本扩批
- 外包与内制使用同一资产编号和验收标准
```json
{
  "final_dimensions": null,
  "color_export_profile": null
}
```
来源：本原创案例的交付讨论稿；最终尺寸和输出配置待实际目标环境确定。

## game-campaign · 活动主视觉及多尺寸 · proposed
类别：layout, typography, character
渠道：活动横幅, 竖版宣传位
- 渠道按各自画布重排而非拉伸
- 真实文字可编辑，保留必要安全区
- 记录引用单件的版本和负责人
```json
{
  "final_dimensions": null,
  "color_export_profile": null
}
```
来源：本原创案例的交付讨论稿；最终尺寸和输出配置待实际目标环境确定。
