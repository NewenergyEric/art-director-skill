# 本次工具与观察证据

项目 neighbourhood-life-draft / 0.1.0 / draft；指纹 `9c45f5e9933a57ea407b08c62198f2ae7fd899e1b25f48dead78231e89827d81`。

## 实际执行

| 检查 | 实际结果 | 能证明的范围 |
|---|---|---|
| validate / render / build | 成功；普通校验有 102 条草案/发布前条件提醒 | 字段、引用和生成文档成立 |
| verify / archive / 解压再 verify | 成功 | 独立包完整、参考相对路径可访问 |
| 解压包内 runtime init --allow-draft | 成功 | 无母 Skill 源码依赖的项目入口 |
| 六次 start、一次 resume、status | 成功 | 家族、实体、状态、版本与组合规则可准备 |
| 独立 brief | 成功 | 主按钮任务排除了卡片和角标专属规则 |
| pilot intake | 成功；3/3 文件可读 | 原图 1536 × 1024，PNG / RGB，无 alpha；不当正式尺寸 |
| validate --release | 按预期拒绝，退出 1；99 项发布阻碍 | 未批准规则/样板、缺少真实使用场景和技术参数仍可见 |

首次本地验证脚本把 release 失败预期误写成退出码 2；工具实际正确返回 1。只纠正了 forward 内的验证脚本并复核该一步，保留 [初次记录](validation/18-release-gate.json) 与 [复核记录](validation/19-release-gate-confirmed.json)。母 Skill/工具没有改动。

## 语义核对

- pass：六条任务冻结同一份草案。member-trial/tasks/*/task.json 限制：只证明编译与绑定成功，ready=false；没有生产输出或美术合格。
- pass：主按钮状态与家族绑定。member-trial/tasks/button-disabled/task.json
- pass：主按钮排除其他 UI 家族专用规则。member-trial/tasks/button-disabled/brief.json
- pass：合成家族等级和状态保留。member-trial/tasks/garden-l2-selected/task.json 限制：级数与合成玩法仍未确认。
- pass：中文主体别名绑定候选身份。member-trial/tasks/resident-hello/task.json 与 brief.json 限制：候选角色身份没有变成真实主美批准。
- pass：宣传组合继承五类规则和身份。member-trial/tasks/promo-combination/brief.json 限制：主类 layout + 四个组件；布局和像素结果尚未生成。
- pass：物件卡同时绑定本体与状态角标。member-trial/tasks/card-locked/brief.json 限制：运行层组件只绑定类别/家族/实体；不同子组件状态需各自开任务并在组合交接中对应，不能假定 parent state 自动同步。
- pass：两种参考用途仍为原始相同像素。SOURCE-MANIFEST.json 与 intake/inventory.json 限制：仅复制并区分 style/identity 用途；没有新图或抠图。
- pass：没有自造主美批准。review-pack/style-pack.json
- pass：发布边界拒绝草案。validation/19-release-gate-confirmed.json 限制：该拒绝是正常的草案发布条件检查，非执行环境故障。

## 未执行的检查

新资产生成、PS/Figma 编辑、真实屏幕/字体/对比度、合成玩法、播放/引擎/性能、真人成员试用均未执行。每条任务的 review.json 保持 unknown；不把编译成功写成视觉 pass。

原图已实际以 view_image 打开，观察见 references/brief-and-observations.md；pilot 解码只测技术事实。身份副本与风格副本 SHA 相同，未来调用图片工具应去重，并按区域解释用途。

[运行汇总](validation/run-summary.json) · [逐项语义核对](validation/20-semantic-audit.json) · [原始盘点](intake/inventory.json)。
