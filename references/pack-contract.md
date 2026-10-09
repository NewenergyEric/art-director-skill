# 项目风格包契约

项目包是一个可以独立交接的项目 skill。成员应能只拿到这个包就读取规则与参考，不需要母 skill 的源码目录或总监的聊天历史。

## 唯一事实源与派生输出

`style-pack.json` 是项目事实源。编辑规则、参考、实体、技术约束和决策时只改它，再用 `render` 重建 `STYLE.md` 和项目 `SKILL.md`。不要分别修改三个文件；直接改派生文件会造成下一次重建丢失改动或团队使用不一致内容。

实际字段以 [JSON 模板](../templates/style-pack.template.json) 和 `scripts/style_pack.py` 的校验为准。本版 schema 为 `1.0`，色彩和字体是项目自有的简单 token 表达，不声明 DTCG 兼容。

主要内容的责任边界：

| 内容 | 责任 |
|---|---|
| 项目、版本、状态与范围 | 说明适用于谁、何种资产，以及是否已确认 |
| 意图、规则、类别档案 | 表达理由、硬要求、建议、固定项与允许变化 |
| 参考与实体 | 保留可访问的证据及参考用途，区分风格与身份 |
| 配方 | 记录某个工具实际使用的设置及限制，不把参数当成普适标准 |
| 决策、待定问题、批准依据 | 保留为什么改、谁在什么语境下确认、仍缺什么 |

规则的 `must/should` 表示约束强度，`proposed/confirmed` 表示确认状态；两者独立。候选硬规则仍是候选，不因写成 `must` 就变为团队已同意的标准。参考的 `candidate/approved` 也不等于其文件存在或许可已确认。

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
python scripts/style_pack.py build PACK --out NEW_DIR
python scripts/style_pack.py verify NEW_DIR
python scripts/style_pack.py diff OLD_PACK NEW_PACK
python scripts/style_pack.py archive NEW_DIR --out project-style.zip
```

- `validate`：校验结构、引用及约束，不评判画面审美。
- `render`：根据 JSON 更新派生文档；先确认操作的是工作副本。含构建清单的交付包拒绝原地渲染，修改应从源工作包的新版本开始。
- `brief`：为任务整理当前类别、规则和可选实体；它输出任务书，不调用生图服务。
- `build`：构建新的独立交付目录；目标必须尚不存在且不能放在源包内部。交付前检查其中的入口和参考文件。
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

制作任务和 [交付记录](../templates/delivery-record.template.json) 固定具体项目版本。已有基线更新时，先复制工作版本，修改版本号并恢复 `draft`，处理受影响的批准与样板，再按决策构建新目录。不要原地覆盖团队仍在使用的包。

语义版本可作为约定：改变现有资产判断的规则通常需要显著升级；增加不影响现有任务的内容可小版本升级；修正文案且不改变含义可修订版本。最终判断仍需写清实际影响，不能只依赖版本号。

共享前从构建目录检查：入口无需母 skill、JSON 与派生文件一致、引用资产可访问、待定问题可见、状态准确。提供本地目录或压缩包由用户决定使用方式。安装到 agent 的技能目录、Git 分发和团队通知是单独的操作范围，不是构建项目包的隐含动作。
