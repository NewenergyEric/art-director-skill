[English](HUMAN-GUIDE.md) · 中文

# 在你的 Agent 里使用 Art Director

Art Director 帮主美逐步建立规范，再把规则、样板与交付要求打包给团队。成员在自己的 Agent 中使用这个包，制作和检查具体设计。

## 1. 安装

```sh
npx skills add https://github.com/NewenergyEric/art-director-skill
```

也可以下载[当前 Skill ZIP](https://newenergyeric.github.io/art-director-skill/downloads/art-director.zip?v=english-first-20261011)，交给 Agent 安装。核心脚本需要 Python 3.10+。生成或编辑设计使用宿主中已有的工具；Skill 不附带图像模型。

## 2. 主美从现有资料开始

把作品、参考图、批注和项目目标放进 Agent 能访问的文件夹。不用先准备完整规范。

> 使用 `$art-director`。先把这些资料整理成一版美术规范，再带我补齐各类资产和组件要求，用代表样板校准，最后打包给团队。

Agent 会先给出具体初稿，说明哪些来自已有决定、哪些是建议、哪些缺少依据。你可以直接说“按钮边缘再厚一些”“角色比例沿用这张”。Agent 负责更新文件，你负责判断方向。

最后会形成五份手册：资料索引、项目定位、设计规范、交付与验收、参考与反例。确认的规范、样板、资料与项目专属 Skill 放进同一个包。正式发布前，需要有真实确认记录和必要样板。

## 3. 成员接收完整项目包

主美把导出的完整包压缩分发。成员交给 Agent：

> 读取这个项目包。按 UI 规范做默认、按下、禁用三态按钮，先给首件，并说明用了哪些规则、还有哪些检查没做。

Agent 将任务接到相关类别、组件、参考和项目版本。之后继续说“放进主界面检查”“按批注修正”即可。不需要复制主美全部聊天记录，也不用手工填 JSON。

只安装通用 Art Director 并不能拿到私有项目规则，成员必须同时收到对应项目包。

## 4. 检查、返修和更新

> 对照规范检查这批结果，列出问题位置、依据和修改建议。先修正这个按钮，再看同类组件有没有同样的问题。

结构、尺寸等技术检查与视觉判断分别记录。没检查的内容不会自动通过。影响整个项目的改变交回主美；新任务读取新版本，进行中的任务保留原版本。

[24 秒演示与开场白](landing.zh.html) · [项目包示例](../examples/harbor-studio-draft/guides/00-index.md) · [Agent 与工程接入](AGENT-GUIDE.zh.md)
