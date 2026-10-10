# Style Pack 1.0 字段与状态

`style-pack.json` 是唯一事实源。使用标准 JSON，不使用注释或 YAML；`STYLE.md`、项目 `SKILL.md` 与 agent 元数据由脚本派生。当前是本项目自定义 schema，不是 DESIGN.md 或 DTCG 规范实现。

| 字段 | 结构 | 用途 |
|---|---|---|
| schema_version | 固定字符串 `1.0` | 与项目规范版本分开 |
| project | id、name、domain、owner | id 为字母开头的小写连字符名称，最多54字符；domain 为非空业务场景，如 game-art、ecommerce、brand-ui |
| version | 主.次.修订 | 项目规范版本 |
| status | draft / approved | 工作草案或有依据的已确认基线 |
| scope | medium、view、target_platform、asset_types | 资产类型取 character/environment/tile/prop/ui/motion/product/graphic/layout/typography；未知规格用明确文字说明。外包是责任类型，不是资产类别 |
| intent | summary、pillars[]、avoid[] | 审美意图与取舍 |
| tokens | colors、fonts | 项目简易色值和字体表；不等于实际已安装字体 |
| rules | 规则对象数组 | 规则内容和依据 |
| references | 参考对象数组 | 本地参考文件及用途 |
| profiles | 以 asset_type 为键的对象 | 每类资产的 brief、fixed[]、variable[]、technical 对象 |
| entities | 实体对象数组 | 同一角色或物件的身份约束 |
| recipes | 配方对象数组 | 工具控制、参考、版本及局限 |
| decisions | 决策对象数组 | 改动理由、状态与来源 |
| open_questions | 字符串数组 | 尚未确认的项目问题 |
| approval | null 或 by、at、evidence_path | 指向真实批准内容的记录；脚本不会认证审批人 |

规则包含 `id`、`scope[]`（global 或资产类别）、`strength`（must/should）、`statement`、`rationale`、`allowed_variation[]`、`evidence[]`（参考 ID）、`verification`（visual/technical/human）、`status`（proposed/confirmed）。硬要求与已确认是两回事。视觉性 must 仍需要真正看图才能检查。

参考包含 `id`、`path`、`role`、`applies_to[]`、`notes`、`status`、`provenance`。role 为 style、identity、composition、material、counterexample、context 或 font。状态为 candidate/approved；被批准作为反例的素材使用 counterexample 角色，不能作为正向风格图投喂。

参考路径和 `approval.evidence_path` 使用包内 POSIX 相对路径，例如 `assets/hero-front.png`。不接受绝对路径、盘符、反斜杠、父目录跳转或逃出包目录的链接。URL 可以写入 provenance，但不能代替自包含交付所需的实际文件。校验路径和哈希不证明图片有效、来源授权或视觉内容正确。

实体包含 `id`、`kind`、`identity_rules[]`、`reference_ids[]`、`fixed_features[]`、`variations[]`。制作任务通过 `--entity` 选择对象；没有参考的草案可以输出候选要求，但不得声称身份已锁定或已验证。

**运行层的可选扩展。** `entities[].aliases` 给 Agent 和任务入口提供中文别名，类别内重名或重复会被运行层拒绝。`profiles.*.task_controls` 与 `entities[].task_controls` 包含 `slots`，每个槽位有非空 `default` / `guidance`；可选 `exploration` 包含 `allowed_slots` 和可调 `max_candidates`。实体同名槽位覆盖类别默认，身份与固定规则仍保留。没有声明 outfit 的旧包不能经运行层偷偷换装。字段在同一 canonical JSON 内，改变它们也会改变指纹；运行扩展由 `project_runtime.py` 检验，普通 `style_pack validate` 仅检验基础协议。

成员请求示例见 [member-request.template.json](../templates/member-request.template.json)，由 Agent 从原话准备。`components` 可选，逐项 `{category,subject}` 绑定其他类别/实体；所有组件从同一冻结基线编译，合并适用规则和参考并保留 `component_briefs`，不证明已获得组件文件或画面合格。项目运行目录的 `project.json` 管理 current，任务目录冻结输入，产出与真实评审存 work。操作与版本语义见 [成员指南](../references/member-workflow.md)。

配方包含 `id`、`tool`、`model`、`capabilities[]`、`instructions`、`reference_ids[]`、`limitations[]`、`status`（untested/verified）。配方不是可执行远程代码，也不意味着可以自动安装、下载模型或产生费用；按真实工具能力与用户授权实施。验证状态描述项目实际试用，不能从别人的介绍推定。

decisions 每项包含 `id`、`decision`、`rationale`、`status`（proposed/accepted/rejected）、`source`。真实决策记录中应保留发生语境。模板和测试夹具中的人为模拟记录不能用于正式基线。

**构建状态与项目确认状态分开。** `build` 为草稿和正式版本都可生成完整性清单，因此有 manifest 不代表艺术方向获批。带清单的包作为不可原地编辑的交付快照；更改应在工作副本进行并构建新目录。

发布附加检查由 `validate --release` 给出具体诊断，包括项目已批准、真实审批记录文件存在、无待定问题、规则确认及足够的已批准参考覆盖。通过检查仍不等于鉴别了签署人、完成视觉验证或证明可进引擎。

草案可以保留空 pillars；发布基线需要非空 pillars、无 proposed decisions，并且每个已声明类别都有已批准的 style 和 context 参考。已声明实体需明确身份规则、固定特征和已批准 identity 参考。配方允许保留 untested 并明确警示，它不会被当成已验证能力。

**版本指纹。** 指纹覆盖 canonical JSON 和引用/审批文件内容。只换参考图而不改 JSON，也会改变指纹。构建 manifest 记录实际交付文件的 SHA256；verify 检测改动、缺失和额外业务文件。哈希不是签名，没有外部可信发布渠道就不能证明作者身份。

**工作记录。** review-report 与 delivery-record 是 agent 填写的交换模板，当前 CLI 不把它们当成独立实现的审美自动验收器。检查项建议使用 pass/fail/not_evaluated/not_applicable，加具体证据、观察与下一步。留空或未知项不能推导为通过。成员任务书和产出记录存放在项目工作目录，避免写进封存的规范包。

实际可运行示例见 `examples/moss-harbor-draft/style-pack.json`，字段默认值见母 skill 的模板。该示例故意没有虚构参考图与批准，适合验证新会话交接与缺少证据的行为。

新增 `examples/pop-borough-draft/style-pack.json` 演示消除游戏六类资产的共同标准；其生产计划为七条工作流（包含外包）、50项计划交付，实物交付与模拟演示分开。批次记录不是规范的一部分，独立使用 [team-batch-contract.md](../references/team-batch-contract.md)，每个批次固定一个构建包的版本和 fingerprint。
