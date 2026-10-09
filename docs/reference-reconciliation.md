# 参考方案合并与事实核验

2026-10-09。核验对象是用户提供的方案内容，未安装或执行其中引用项目。原文保留在用户提供的路径；这里只记录影响开发决定的差异。

| 附件建议或主张 | 核验与开发决定 |
|---|---|
| DESIGN.md 是成熟事实标准 | [Google Labs 仓库](https://github.com/google-labs-code/design.md) 与 [原始规范](https://raw.githubusercontent.com/google-labs-code/design.md/main/docs/spec.md) 存在，项目标记 alpha。采用精确值与设计理由分层的思路，不依赖其成熟度假设。 |
| StyleSeed 三层架构及 80 分门槛 | [README](https://raw.githubusercontent.com/bitjaru/styleseed/main/README.md) 和 [架构](https://raw.githubusercontent.com/bitjaru/styleseed/main/engine/ARCHITECTURE.md) 已包含更多执行与验证层。可借鉴分离方法与项目规则；自检分数不等于专家认可。 |
| DTCG 是 W3C 标准，示例无损兼容 | [2025.10 首个稳定版公告](https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/) 属实；[规范状态](https://www.designtokens.org/tr/2025.10/format/#status-of-this-document) 明确不是 W3C Standard。当前 color 值有结构要求，不能把任意 hex/YAML 字段称为兼容。本版本将项目 schema 与未来 token 转换分开。 |
| 没有游戏美术同类方案 | [Sprixen](https://sprixen.com/docs) 有项目 Style Lock；[game-assets 美术方向指南](https://raw.githubusercontent.com/gamedev-skills/awesome-gamedev-agent-skills/main/skills/disciplines/create-game-assets/references/art-direction.md) 覆盖跨会话和跨成员一致性。因此差异化聚焦完整交接和规范治理，不主张确认业界空白。 |
| CharacterConsistencyEngine 可作为 0.95 自动门禁范本 | [原始代码](https://github.com/SainathPattipati/ai-video-generation-pipeline/blob/main/src/character/consistency_engine.py#L157) 中 embedding 和分数是固定返回的占位实现。未验证的 0.92/0.95 阈值不能用于本产品验收。 |
| 不通过检查的图不能展示 | 本项目允许带失败/未评估状态展示以讨论和诊断；约束的是不得冒充“已验收”或“正式发布”。 |
| 先做平面/PPT，之后做游戏 | 这是参考作者建议。沿用用户已明确选择的游戏美术首发范围。 |
| 定期 git pull 保持全员一致 | 开发采用固定版本快照与明确升级，防止进行中的任务静默换规范；不自动修改其他成员环境。 |

本仓库的工作流、schema 和脚本为本次任务编写，未将第三方 skill 源码整段纳入发布包。外部项目链接用于说明依据与借鉴点，不代表本工具已经复现其全部能力。
