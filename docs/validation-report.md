# v0.2.0 发布验证报告

日期：2026-10-10。验证对象：母 Skill、项目包 CLI、公开文档、安全配置、Remotion 源码与中英文发布媒体。

## 可重复的工程检查

- `python -m unittest discover -s tests`：**49 项，48 项通过，1 项跳过**，耗时 18.531 秒。跳过项是当前 Windows 权限不允许创建符号链接；对应拒绝符号链接的代码和其他平台测试仍保留。
- `python scripts/style_pack.py validate examples/moss-harbor-draft`：结构检查通过。示例继续保持 `draft`，缺失批准参考、确认规则和真实审批的项目被准确列为发布警告。
- `python -m py_compile ...`：项目包、试点、打包与媒体脚本均通过语法检查。
- `python scripts/package_release.py --out ...`：母 Skill 包含 20 个允许文件与 MIT 许可证，ZIP CRC 检查通过。
- `npm install --package-lock-only --ignore-scripts`：锁文件与 `0.2.0`、MIT 元数据一致，npm 报告 0 个已知漏洞。
- Remotion 成功编译并列出 **11 个 Composition**：中英文母片，Style Directions、Template Switch、Team Pipeline、Review Lens 四组双语片段，以及 1280 × 640 社交预览。

## 媒体检查

中英文母片均为 1280 × 720、30 fps、30 秒 H.264，并包含 AAC 声音轨。发布 MP4 各约 10.5 MB；README 总览 GIF 各约 16 MB；四组功能 GIF 各约 2–5 MB。

抽帧覆盖：真人团队开场、生产墙、伪 3D 物品家族、美漫完整任务书、国风卡牌家族、绘制收藏卡牌、七类制作模板、团队产线、四层评审与版本化收尾。中英文分别检查标题、正文、状态标签、底部生产链和转场叠加，没有发现文字溢出或关键信息被素材遮挡。

Remotion 在当前 Windows 环境调用内置 FFmpeg 编码时发生进程异常退出。发布脚本因此改为先生成有固定命名的 JPEG 序列，再用系统 FFmpeg 编码 H.264；临时帧目录只位于仓库的命名输出目录，成功或失败都会按精确路径清理。最终媒体通过 `ffprobe` 核对时长、分辨率、视频流与声音流。

## Darwin 与专家复核

Darwin 九维配对审计从 73/100 提升到 95/100，变化集中在首件放行、共享基线发布、失败恢复、反模式与可执行任务书。四个代表任务覆盖大批量消除素材、混合资产评审、局部反馈与共享基线冲突，以及多渠道电商活动家族。详见 [Darwin 审计](darwin-audit-v0.2.md) 与 [原始结果](../evals/darwin-results.tsv)。

营销和设计复核检查了问题表达、受众识别、证据位置、行动入口、画面层级和不同视觉语言的产出呈现。README 不使用虚构效率数字，也没有把结构检查写成艺术批准。详见 [专家复核](expert-review-v0.2.md)。

## 安全与公开发布

- MIT 许可证进入仓库和母 Skill 分发包。
- `SECURITY.md` 逐项声明网络、凭据、子进程、文件读写与删除边界。
- CodeQL 覆盖 Python 与 JavaScript/TypeScript；Dependabot 覆盖 npm 与 GitHub Actions。
- 公开内容扫描未发现本机绝对路径、凭据、客户名称或真实客户项目素材。
- 发布包由固定允许列表生成，不包含 `node_modules`、Remotion 源素材、临时帧、媒体缓存或个人工作目录。

## 这轮验证证明什么

本轮证明仓库结构、任务路由、项目包契约、本地工具、分发内容、公开说明和媒体构建可以按记录复现。它也验证了 Skill 在证据不足时保持草案状态，在首件未确认时不应放大生产，在局部反馈出现时不静默改写共享基线。

真实团队的交接时间、返工率、视觉一致性和渠道适配效果仍由项目试点记录。现有 [首轮试点计划](round-01-report.md) 保持实际样本数与未执行项，不把演示结果计作真人项目数据。
