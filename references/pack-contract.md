# 项目风格包契约

项目包是一个可以独立交接的项目 skill。成员应能只拿到这个包就读取规则与参考，不需要母 skill 的源码目录或总监的聊天历史。

## 唯一事实源与派生输出

`style-pack.json` 是项目事实源。编辑定位、规则、家族、样板、参考、实体、技术约束和决策后，用 `render` 重建可读文档与项目入口。总监可以直接在手册上批注或提出修改；Agent 对照原版提取实际变更并回写 JSON，保留来源与状态，再重新生成。不让总监学习 JSON，也不让手册与源数据分别维护成两套规范。

当前 `render` / `build` 生成 `STYLE.md`、项目 `SKILL.md`、`agents/openai.yaml` 及五份手册：

| 文件 | 内容 |
|---|---|
| `guides/00-index.md` | 当前入口、缺口、样板计划与决定状态 |
| `guides/01-positioning.md` | 项目意图、范围及带来源的定位 |
| `guides/02-design-system.md` | 类别、组件/家族、固定与可变要求 |
| `guides/03-delivery-review.md` | 渠道、交付、源文件及实际检查要求 |
| `guides/04-reference-guide.md` | 参考文件、用途、来源、反例与状态 |

这是同一规范的不同阅读视图。编译器忠实整理已有数据；专业内容由 Agent 按[总监工作流](director-workflow.md)结合资料起草和完善，不能用空数组生成几份文档就宣布建项完成。

新构建包的交付手册还携带图解判断卡、整链／家族设计表、返修前后对照的通用方法与简表，成员 brief 的 `judgment_tools` 只链接该包内实际存在的章节。方法不新增项目参数、规则或批准；旧包缺少这些章节时不伪造链接，也不静默改写旧包。母 Skill 的原创教学图不默认进入项目包。要交接本项目的判断案例，先在工作副本 `references` 登记说明及它引用的每个本地文件，再构建新版本；只登记 Markdown 不会递归收集内嵌图片。

实际字段以 [JSON 模板](../templates/style-pack.template.json) 和 `scripts/style_pack.py` 的校验为准。本版 schema 为 `1.0`，色彩和字体是项目自有的简单 token 表达，不声明 DTCG 兼容。

`project.domain` 是非空业务场景，例如 `game-art`、`ecommerce` 或 `brand-ui`。类别可选 character/environment/prop/ui/tile/motion/product/graphic/layout/typography，只使用项目声明的部分。可选的 `profiles.*.task_controls`、`direction.families[].task_controls`、`entities[].task_controls` 与 `entities[].aliases` 仍在唯一 JSON 中并进入包指纹；运行层另行校验变量、别名、探索预算和组合任务。单独的 `style_pack validate` 不证明所有运行请求有效。

主要内容的责任边界：

| 内容 | 责任 |
|---|---|
| 项目、版本、状态与范围 | 说明适用于谁、何种资产，以及是否已确认 |
| 意图、规则、类别档案 | 表达理由、硬要求、建议、固定项与允许变化 |
| `direction` 专业建项记录 | 承载定位、组件/家族、代表样板和渠道交付，关联既有规则与参考 |
| 参考与实体 | 保留可访问的证据及参考用途，区分风格与身份 |
| 配方 | 记录某个工具实际使用的设置及限制，不把参数当成普适标准 |
| 决策、待定问题、批准依据 | 保留为什么改、谁在什么语境下确认、仍缺什么 |

规则的 `must/should` 表示约束强度，`proposed/confirmed` 表示确认状态；两者独立。候选硬规则仍是候选，不因写成 `must` 就变为团队已同意的标准。参考的 `candidate/approved` 也不等于其文件存在或许可已确认。

## 定位、家族、样板与交付扩展

`direction` 是 schema `1.0` 的可选扩展，已有不含它的包仍可读取。需要它时同时提供以下四个数组，内容由实际项目决定；无需编造条目填满数组。

| 数组 | 字段与状态 |
|---|---|
| `positioning` | `id, topic, statement, status, source`；status 为 unknown / proposed / confirmed |
| `families` | `id, name, category, purpose, rule_ids, reference_ids, fixed, variable, technical, status`，可选 `task_controls`；status 为 proposed / confirmed |
| `exemplars` | `id, name, family_ids, purpose, reference_ids, acceptance, required, status, approval`；status 为 planned / candidate / approved / rejected |
| `delivery` | `id, name, categories, channels, requirements, technical, status, source`；status 为 unknown / proposed / confirmed |

`fixed`、`variable`、`acceptance`、`requirements` 等为文字数组，技术要求放 `technical` 对象；ID 列表引用包内已有记录。家族绑定一个实际类别，其规则/参考必须适用于这个类别。状态、组合与渠道关系写入具体要求和验收说明；这不是自动布局或依赖求解器。

全局/类别共同规则保持共享。专属于某个家族的规则与参考绑定到该家族，通过 `brief --family FAMILY_ID` 或请求中的 `family` 选择；没有选择的家族专用内容不会混入任务。如果某类别已定义家族，Agent 必须据实际需求绑定家族；运行层会把遗漏记为阻碍。实体身份另按 `entity` 绑定，不能通过选择家族改变对象身份。

样板 `required` 为布尔值，表示它是否阻碍该包正式发布，不代表所有项目必须有固定数量。规划中保持 `planned`，已有候选实物为 `candidate`，不采纳为 `rejected`；这些状态的 `approval` 必须是 null。只有真实批准后可设 `approved`，此时需要实际已批准参考、覆盖所关联家族的证据，以及独立的 `approval: {by, at, evidence_path}` 记录。批准依据文件不能就是样板图本身。

普通构建可保留待定定位、候选家族、未完成样板和交付条件。`--release` 要求定位/家族/交付记录 confirmed，所需家族参考 approved，并要求所有 `required: true` 样板 approved，另加原有项目发布检查。不能靠移除必需样板、把 required 改为 false 或伪写批准来越过实际未完成的工作；项目若改变发布范围，须记录真实决定。

## 文件与来源

包内被引用的文件使用相对路径，保持在包目录内部。不能依赖 `C:\Users\...`、工作电脑的共享盘或其他项目中的隐藏文件。保存需要交接的参考、批准依据和来源说明；不创建没有实际用途的空目录。

引用不能从包目录逃逸。不要用软链接、`../` 或平台路径技巧绕过独立打包。远程地址作为来源信息保存，不等于图片已在包内或已被读取；需要自包含的发布包应携带可合法分发的本地参考文件。

包中保存的“某总监于某日确认”是可追溯记录；工具不会验证人的身份或组织权限。`approved` 必须有实际决策依据，不能伪造对话、代签姓名或用自造确认文档充当用户批准。当前只允许讨论的内容保持 `draft`。

## CLI 工作顺序

下列路径从母 skill 目录运行时成立；在别处运行需使用脚本实际路径。`PACK` 可替换为具体项目包目录或其 `style-pack.json` 路径。命令结果以 JSON 输出；失败时读取具体错误，不把只出现输出当作成功。

```text
python scripts/style_pack.py --help
python scripts/style_pack.py validate PACK
python scripts/style_pack.py render PACK
python scripts/style_pack.py brief PACK --category prop --task "制作主角旅行灯" --out task-brief.json
python scripts/style_pack.py brief PACK --category ui --family FAMILY_ID --task "制作本家族的活动组件" --out family-brief.json
python scripts/style_pack.py build PACK --out NEW_DIR
python scripts/style_pack.py verify NEW_DIR
python scripts/style_pack.py diff OLD_PACK NEW_PACK
python scripts/style_pack.py archive NEW_DIR --out project-style.zip
```

- `validate`：校验结构、引用及约束，不评判画面审美。
- `render`：根据 JSON 更新规范、五份手册、入口与包内工具；先确认操作的是工作副本。含构建清单的交付包拒绝原地渲染，修改应从源工作包的新版本开始。
- `brief`：为任务整理当前类别、可选家族/实体、规则、样板计划和渠道交付；它输出任务书，不调用生图服务。
- `build`：构建新的独立交付目录，携带参考和运行工具；目标必须尚不存在且不能放在源包内部。交付前检查其中的入口和参考文件。
- `verify`：检查已构建包的文件完整性；清单可检测意外改动，不能认证作者或授权。
- `diff`：比较两个版本，为评审提供实际变化信息；它不判断改变是否合理。
- `archive`：归档已构建的项目包；归档前保留完整性检查结果。

`--release` 用于发布已批准共享基线时的附加检查：

```text
python scripts/style_pack.py validate PACK --release
python scripts/style_pack.py build PACK --out NEW_RELEASE_DIR --release
```

普通构建支持 `draft`，便于讨论和行为试用。通过发布检查仍只证明工具能验证的条件满足；是否经过视觉样板验证、成员试用及总监决策，需要相应真实记录。不能把成功退出码解释为生产质量保证。

## 版本与交付

当前新构建包的 manifest `format` 为 `team-v1`，自带 `scripts/style_pack.py`、`scripts/project_runtime.py`、`scripts/team_batch.py`，可解压到另一目录按包内入口使用。旧版无 format 的已构建包仍按旧格式核验；它不会因母 skill 更新就自动长出新工具和手册。使用新功能时，从源数据另建新包，保留旧包。

参考制作的执行方法随新构建包进入交付手册、`brief.workflow` 和成员任务书；其中棋盘检查仅在任务涉及 `tile` 时接入，包括组合中的棋子组件。方法不增加项目规格或批准状态。复杂度边界、显示条件及依据仍来自原有规则和 `technical` 等字段，schema 继续为 `1.0`；旧包和旧任务不会被自动改写。

Agent 可直接用新包内的 `project_runtime.py init --pack BUILT --out NEW_WORKSPACE` 接入项目，生成 PROJECT.md、AGENTS.md、current 指针与工具副本；[成员指南](member-workflow.md)说明后续操作。包固定一版规范，工作区选择新任务所用版本并保存旧任务。草稿试用显式加 `--allow-draft`，不将其改称已批准生产包。生图、PS/Figma、引擎等工具按实际任务和环境接入；运行层管理任务，不自动安装宿主配置或跨电脑同步。

制作任务和 [交付记录](../templates/delivery-record.template.json) 固定具体项目版本。已有基线更新时，先复制工作版本，修改版本号并恢复 `draft`，处理受影响的批准与样板，再按决策构建新目录。不要原地覆盖团队仍在使用的包。

语义版本可作为约定：改变现有资产判断的规则通常需要显著升级；增加不影响现有任务的内容可小版本升级；修正文案且不改变含义可修订版本。最终判断仍需写清实际影响，不能只依赖版本号。

共享前从构建目录或解压后的独立目录检查：入口和三项工具可用、JSON 与派生文件一致、引用资产可访问、实际调用能绑定适用类别/家族/实体、待定问题可见、状态准确。不要把任务输出写进不可变发布包。提供目录或压缩包即可交接；安装到 agent 技能目录、Git 分发或通知团队按用户已有授权执行，不让直接打包试用依赖先搭同步平台。
