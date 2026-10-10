# 团队生产扩展：真实检查与协议演练

本目录与截图 A/B 试验分开。泡泡街区是虚构候选项目；七条工作流、50 项是计划，实际批次 `deliveries=[]`。HTML 中的并行制作和收件属于动画模拟，不是已执行的团队量产。

实际生成的是一张跨类别候选风格板，经历两次工具调用：首轮与一次定向修正。`reference-iterations/attempt-1.png` 保留首次结果；`attempt-2.png` 是移除动效星星额外五官后的候选图，与项目引用的 `style-board.png` 字节相同。生成回执在 `examples/pop-borough-draft/references/style-board-generation.json`（相对仓库根目录）。它不是50项逐件交付。

`reference-board-check.json` 是对最终板的实际测量：PNG、1536×1024、RGB，无透明通道；这是候选风格参考板的规格检查，不是透明精灵或引擎检查。

`plan-check.json` 用真实构建包检查案例生产计划。缺少交付时返回1并记录missing，不能把计划完整解释为资产已完成。

`stale-version-batch.json` 与 `stale-version-check.json` 是故意注入错误版本的协议演练。其 `fixture/` 下的文本只供文件/哈希检查，不是外包美术文件；所有艺术/技术/集成评审保持unknown。该演练可以证明错版会被检测，不能证明真实外包产物画风一致。

`current-version-batch.json` 仅将上述模拟交付的版本声明改为当前基线，用于证明“版本正确仍不能使缺少评审的交付通过”。它不是对真实资产重新制作或正式迁移，不得用于绕过旧版作品的复核。

检查脚本只读输入和规范包。每次运行输出到新文件；检查报告以及集成说明见 [团队生产更新报告](../../docs/team-production-update.md)。
