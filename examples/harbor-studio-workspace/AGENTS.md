# 此工作区的 Agent 入口

每次新任务先读 PROJECT.md 与 project.json，并运行 `python tools/project_runtime.py status .`。按 current 指针重新读取 style-pack.json、适用规则和参考，不以聊天记忆代替文件。成员只提供一句话；由你解析请求、自动生成任务 ID 与 requests/*.json，再运行 start。

使用 `python tools/project_runtime.py start . --request requests/<request>.json` 冻结任务。绑定主体必须唯一；只修改显式开放的 slot。服装默认值可以变化并不表示脸、发型和风格被解锁；组合海报也要通过 components 绑定商品身份、字体、UI 等适用规范。实际图片调用前检查图片和冲突；must/fixed 与新要求冲突时，不得自动丢弃规则。探索任务也保留身份与画风底线。预算是每次候选数量，不是项目创意上限。

有 direction.families 的类别必须选择 family，组合组件各自选择家族；固定项、样板验收与渠道交付要求随任务编译进来，全部初始 unknown。变量默认按类别→家族→实体合并，任何冲突仍须人工判断，不把覆盖顺序当艺术豁免。整批交付用 tools/team_batch.py 核对，同一基线、家族、证据及产物字节均须对应。

按照 task 的 generation-brief.md/handoff.md 使用可用工具，把产出与真实评审保存在 work/<task_id>/；不声称 CLI 已生成图像或做了 PS。继续任务运行 resume，使用冻结版本；current 更新只提示。任何未知检查保持 unknown。不能把生成了图片等同正式交付。

主美采用更优方案后，修改开发草案、留下真实决定与证据、构建新版本，再执行 `python tools/project_runtime.py publish . --pack <built-pack> --expect-current <current-fingerprint>`；不编造审批。`--allow-draft` 仅用于候选工作区，不能覆盖已发布正式基线。
