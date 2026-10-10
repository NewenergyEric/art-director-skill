# 公开原创案例：本地执行与展示检查

这组记录使用原创米拉候选板和电商组合示例，核查任务与规范的调用方式。它不是图像质量实验，也不是正式资产验收。

## 实际执行

[summary.json](summary.json) 记录 **24 次真实 CLI 调用、17 条断言全部通过**，每次命令的输入、退出码与输出保存在 `calls/`。其中正式生产在草稿规范下返回阻断状态，超出尚未启用预算的请求被拒绝；这些非零退出是预期结果。

实际核查：

- 一句话经 Agent 整理成结构化请求后，人物别名绑定到正确对象；CLI 不负责自然语言理解。
- 换装继续带上脸部与头发的候选身份规则，单改姿势继承默认衣装。
- 电商布局任务同时编入商品、图形和文字约束，使用同一版本。
- 只改草稿时，任务仍使用 current 指向的旧版。
- 显式采用 0.2.1 候选后，新任务使用新版预算；旧任务文件逐字节不变。
- 恢复旧任务能提示当前版本已变化，不自动迁移。

本轮 **新增生成图像 0、PSD 0、正式批准 0**。候选板是已有原创图像的原样复制；它不是精细身份设定图。规则进入任务书，不等于模型已经收到参考，也不等于新图的长相或风格已通过检查。

## 查看实际文件

- [米拉换装任务](../../examples/mira-public-workspace/tasks/mira-raincoat-001/task.json)
- [生成输入说明](../../examples/mira-public-workspace/tasks/mira-raincoat-001/generation-brief.md)
- [PS 与正式交付交接计划](../../examples/mira-public-workspace/tasks/mira-raincoat-001/handoff.md)
- [电商组合任务](../../examples/campaign-public-workspace/tasks/campaign-banner-001/task.json)
- [新版前任务](version-workspace/tasks/before-update/task.json)、[只改草稿后的任务](version-workspace/tasks/draft-edit-only/task.json)、[启用新版后任务](version-workspace/tasks/after-update/task.json)

## 页面与分发检查

页面检查使用静态分析和 Node 中的交互逻辑验证，不等于真实浏览器视觉验收。文件链接、素材哈希和已知保密标识扫描的分发结果见 [release-check.json](release-check.json)。扫描仅针对明确的回归条件，不能替代分享前对新资料用途的判断。

分发使用明确文件清单，不打包整个工作区。历史材料未被删除，也未因未进入公开包而改写研究结果。

## 重跑

由 Agent 在项目根目录执行 `python scripts/run_public_demo.py --help`，选择新的证据与工作区输出路径。运行脚本不覆盖既有记录；新输出路径不自动改变当前 HTML 引用。

对真实团队效果的下一步验证见 [需求覆盖审计](../../docs/requirements-coverage.md)。
