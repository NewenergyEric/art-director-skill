# 港湾工作室 · 团队游戏资产体系 · 团队工作入口

成员直接对 Agent 说：**按已确认的卡片家族做一组商品卡，覆盖两个渠道。** 或者 **用当前角色、场景、图标和 UI 规范，完成活动页面与单件资产。**
不需要自己描述整套画风，不需要写 JSON、任务编号或命令。Agent 应先读取本文件和 `project.json`，确认类别、组件家族与复用主体，自动绑定当前规范、身份与允许变化。包中 guides/ 下的五份手册帮助理解项目判断，不代替 JSON 事实源。

- 正式资产：说清本次变化和用途；默认保留角色长相/商品外形与标识、项目风格和未改变的要求。
- 想抽卡：说“探索几种方案”；只能在主美开放的变量内探索，每次预算由规范决定。优秀候选由主美判断排期与落地后，进入新规范发布流程。
- 继续旧任务：告诉 Agent 上次任务或文件。旧任务保持当时版本；有新版会提示，不会偷偷替换。

新任务会重新读取 `project.json` 当前指针、真实规范及参考文件并核验指纹。编辑草稿不会自动发布给团队；已发布包不能原地修改。成员各自拥有本地副本时，需要分发/同步后才能看到同一新版。

## Agent 执行入口

1. 运行 `python tools/project_runtime.py status .`，读取当前包的 `style-pack.json`。把成员原话解析成结构化 request，自动生成唯一 task_id，保存到 `requests/`。脚本本身不理解自然语言。
2. 运行 `python tools/project_runtime.py start . --request requests/任务请求.json`。使用返回路径的 `generation-brief.md`、`brief.json` 和真实参考图调用可用图像工具；不得把反例当正向参考。
3. 按 `handoff.md` 推进单件资产、PS、实际场景集成及交付。真实产物和评审记录放在返回的 `work_dir`，不得改写冻结输入或把初始 unknown 当 pass。
4. 继续任务运行 `python tools/project_runtime.py resume . --task 任务编号`。若当前版本变化，仅报告差异；重新绑定需要建立新任务。

请求字段：`schema_version`="1.0"、`task_id`、`request`(原话)、`category`、`subject`(实体 ID/已定义别名/null)、`mode`(production/exploration)、`changes`(已开放变量)、`exploration`(正式任务为 null；探索为 slots/candidates)、`owner`(id/kind，kind 为 internal/external)。可选 `family` 绑定组件/资产家族；可选 `components`=[{category,subject,family}] 绑定组合版面的商品、字体、UI 等子规范，所有组件使用同一版本。家族已定义的类别必须选 family；不要猜测未定义的主体或静默解锁固定规则。运行 `tools/team_batch.py check` 检查交付批次，家族要求会自动纳入待审项。

运行层会阻止错误变量、版本与文件混用；它不会识别人脸相似度、评价创意、操作 Photoshop 或批准正式资产。草案任务只能探索。`tools-manifest.json` 与包指纹能检测意外编辑，是未签名记录，不认证发布者身份。
