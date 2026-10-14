# 制作协议 v1

`production-plan.json` 不含一套新的画风。它钉住主美包的 `id/version/fingerprint` 和整个 `manifest.json` 的 SHA256；资产必须是该包已列入 manifest 的文件。新生成资产先归入候选新版再冻结，不原地篡改旧包。

最小结构（值由实际包填入）：

```json
{
  "schema_version": "1.0",
  "batch_id": "harbor-state-study",
  "pack": {"id": "project", "version": "0.3.0", "fingerprint": "64位哈希", "manifest_sha256": "64位哈希"},
  "assets": [{"id": "harbor-day", "path": "references/harbor-day.png", "status": "candidate", "kind": "image", "depends_on": [], "task": {"rules": ["ENV-01"], "variation": "已检查首件", "prompt_record": "references/prompts.md"}}],
  "scenes": [{"id": "day", "width": 900, "height": 1600, "layers": [{"id": "background", "asset": "harbor-day", "box": [0, 0, 900, 1600]}]}]
}
```

`kind` 为 `image/font/runtime/record`。`status` 为 `candidate/approved/rejected`，不得由脚本自动升级。`approved` 必须附 `approval_path`，指向包中实际决策记录；工具检查它存在，不认证批准人。规则 ID 必须来自 `style-pack.json`。依赖图不允许重复 ID、悬空或循环。

图片任务可带 `pixels: [宽,高]`、`alpha: true`。图层可带 `opacity`、`rotation`、`flipX/flipY`。画布与图层尺寸受官方格式上限及内存预算限制。素材路径限制在包内，禁止符号链接、反斜线/绝对路径/`..` 穿越；构建先检查所有输入再输出。

`tasks` 为每件输出任务 JSON 和状态索引：缺失/改变/拒收保持可见，任务引用包中原始输入。不会自动执行生成服务、付费请求或复用哈希不一致的输出。Agent 在任务说明或已有批次记录中维护负责人、首件依赖、允许变化和最终组合接口；CLI 不解析这些说明，也不会验证实际分工或动作质量。修正后建立新候选包与新计划，再 `check/build`；旧任务和旧目录保留。

`build` 交付冻结项目包、原计划、场景配方、Compositor 文件和哈希 receipt。`verify` 从任意解压位置检查全部文件；新增或改动也报告。不要在交付目录内运行会制造 `__pycache__` 的操作后误判成原包内容。重新编辑后的 `.comp` 是新工作副本，不再声称匹配原交付哈希。
