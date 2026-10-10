# 团队批次契约 1.0

`scripts/team_batch.py` 对照一个已经构建且通过 `style_pack.py verify` 的包，检查多人交付快照。它读取真实文件并计算 SHA256，检查版本绑定、分工和评审证据是否齐备。工具不看图判断艺术质量、不执行引擎、不鉴定评审人身份，也不批准正式生产。

## 调用与文件边界

```text
python scripts/team_batch.py check production/batch.json --pack packs/project-0.1.0 --out reports/batch-001.json
```

`--pack` 必须指向已构建的目录（或其中的 `style-pack.json`）；只有未封装的 canonical JSON 不够。工具导入同目录 `style_pack.py` 做完整清单验证，不执行包内脚本。批次检查器由母 skill 提供，不自动复制进项目风格包。

批次 JSON、交付资产、证据和包均只读。报告必须是新文件、父目录已存在，且不得位于被验证的包目录内，也不能占据一个尚未创建的交付资产或证据路径。重复运行应更换报告文件名。拒绝输入、输出和依赖路径上的符号链接及 Windows junction。

所有 `files[].path` 和 `reviews[].evidence_path` 都相对 **批次 JSON 所在目录**，使用 `/`。禁止绝对路径、盘符、`..`、反斜杠、非便携设备名和路径逃逸；不会以当前工作目录或包根目录解释这些路径。路径语法错误为非法输入，缺文件则形成交付检查结果。

| 退出码 | 含义 |
| --- | --- |
| `0` | 每个预期资产都有唯一交付，基线、文件和记录的评审条件均通过，可进入评审或交接。仍不是艺术、引擎或生产批准。 |
| `1` | 输入合法，但有缺交付、基线不符、文件错误、评审失败或待补证据。报告已保存。空交付计划也返回 `1`。 |
| `2` | 批次结构、分工关系、路径、包完整性或输出操作非法。可解析且输出安全时保存诊断报告；解析或输出操作失败时只向 stdout 返回诊断。 |

stdout 为 JSON。报告与 stdout 一致。不要仅以文件存在或进程正常启动作为通过依据。

## 输入

从 [team-batch.template.json](../templates/team-batch.template.json) 复制到生产工作区。模板的 `fingerprint: null` 表示尚未绑定，必须替换才可检查；不要编造指纹。运行包的 `verify` 后，从 `manifest.json.pack` 取 `id`、`version`、`fingerprint`，分别填写为 `baseline.project_id`、`baseline.version`、`baseline.fingerprint`。

顶层字段全部必填，不接受未知字段：

| 字段 | 约束 |
| --- | --- |
| `schema_version` | 固定 `"1.0"`。 |
| `batch_id` | 非空 ID，字符为字母、数字、`.`、`-`、`_`，首字符为字母或数字。 |
| `mode` | `demonstration` 或 `production`。模式不是审批状态。 |
| `baseline` | `{project_id, version, fingerprint}`；项目 slug、语义版本、64 位小写 SHA256。三项必须同时与已验证包匹配。 |
| `assignments` | 至少一个分工。 |
| `deliveries` | 交付快照数组，可为空；修订交付另存新快照。 |

每个 assignment：

```json
{
  "task_id": "TASK-TILE",
  "category": "tile",
  "owner": {"id": "vendor-a", "kind": "external"},
  "asset_ids": ["tile-001", "tile-002"],
  "required_checks": ["R-SILHOUETTE", "readability-at-target-size", "technical-export"]
}
```

`task_id` 批次内唯一；`asset_ids` 非空、批次内全局唯一。owner.id 遵循同一 ID 格式，kind 为 `internal` 或 `external`。支持 `character/environment/prop/ui/tile/motion/product/graphic/layout/typography`；项目包必须声明该类别并拥有 profile。报告从包中附上对应 profile，不能依靠任务标签凭空获得规范。

`required_checks` 是至少一项、不重复的非空字符串，由美术负责人依据该类规则、实际尺寸和集成要求确定。可用规则 ID 或明确的检查名称；脚本不推断这份清单是否足以覆盖所有艺术问题。不能删光检查项来使空集合通过。

每个 delivery 包含 `asset_id`、`task_id`、`baseline`、`files`、`reviews`，不接受未知字段：

- `asset_id` 必须已指派，`task_id` 必须是其所属任务。同一资产只能出现一次；不能把多次返工交付混入一个快照来挑选通过结果。
- `baseline` 使用与顶层相同结构，必须与包同时匹配。版本相同但指纹不同也拒收；不从顶层自动继承、补齐或改写交付声明。
- `files` 为 `{path, sha256}` 数组。交付要 ready，至少有一个真实、非空普通文件且每个文件哈希都匹配。一个交付内的路径不能重复（大小写不敏感）。空数组可记录未完成交付，但状态为 `file_invalid`。
- `reviews` 为 `{criterion, result, evidence_path}` 数组。criterion 非空且本次交付内唯一；result 为 `pass/fail/unknown`。evidence_path 可省略、为 `null` 或空串以记录证据缺失，但不能据此通过。每个已指派的 required_check 必须有记录。缺记录按 unknown 处理。
- `pass` 仅在证据文件存在且非空时被此协议接受；`unknown` 永远待补；`fail` 永远阻断。额外记录的检查也参与判断，不能忽略已记录的 fail 或 unknown。报告保留证据的实测大小与 SHA256 便于追溯。

单批次只绑定一个基线。若只迁移部分任务到新版，为这些任务新建一个使用新基线的批次；原批次继续保存原版记录。基线迁移及评审不能通过原地改写已构建包完成。

## 报告

| 字段 | 含义 |
| --- | --- |
| `input_valid` | 批次结构、分工引用、路径约束及包验证合法。 |
| `plan_valid` | input_valid 且顶层 baseline 匹配包。空 deliveries 可以为 true。 |
| `ready`、`ok` | 两者等价；所有预期资产都达到 `ready_for_review_or_handoff`。 |
| `production_approved` | 始终 false；即使 mode=production 且退出码 0，也不能将脚本当作批准人。 |
| `verified_baseline` | 已验证包的项目、版本和指纹，供对照使用。 |
| `pack_release` | 包的 manifest 是否记录 release 构建。false 时交付仍属于草案评审/交接。 |
| `scope_of_check` | 机器检查范围及未检查的艺术、身份、引擎和性能结论。 |
| `summary` | expected/delivered/missing/ready/pending/blocked 的资产数及各主状态计数。仅在输入合法后生成。 |
| `assets` | 每个预期资产的 task、owner、category、profile、required_checks、交付基线、status、blockers、file_checks、review_checks。 |

逐资产状态为：

| 状态 | 触发条件 |
| --- | --- |
| `version_mismatch` | 顶层或交付的项目、版本、指纹有任一不符。 |
| `missing` | 预期资产没有交付。 |
| `file_invalid` | 没有交付文件，或文件缺失、为空、不可读、哈希不符。 |
| `review_failed` | 任一记录的检查为 fail。 |
| `review_pending` | 缺必查项、unknown，或 pass 缺少可读非空证据。 |
| `ready_for_review_or_handoff` | 以上阻断均不存在。 |

有多个问题时按表中顺序选择主 `status`，完整原因保留在 `blockers`。summary 的 ready、pending、blocked 三类互斥且合计 expected；含版本、文件或 fail 问题的归 blocked，其余未齐的归 pending。missing_assets 独立计数，即使一个资产也有版本问题仍计为缺交付。

文件存在和哈希一致只能支持“检查时读取到了这些字节”。证据正文中写着“通过”不等于脚本验证了艺术结论；unsigned manifest 也不能证明来源或审批身份。demonstration 的模拟素材、示意评审和协议通过报告必须保留演示标识；production 模式同样需要团队真实评审与引擎验收。
