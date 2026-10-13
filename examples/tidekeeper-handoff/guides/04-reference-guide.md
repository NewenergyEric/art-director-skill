# 参考说明与反例

项目 `tidekeeper` / 版本 `0.2.1` / 源状态 `draft`

交付状态：草案交付，尚未经 release 构建。

规范指纹：`4b35136e2eae3a15768adb6b5bfe3987082a06126836e129717a9fcdd2a889e3`

由 style-pack.json 派生。修改规范请修改源文件并重建新版本；本手册不是独立审批或第二份规范源。unknown / proposed / planned / candidate 都不等于已确认，未明确参数不得推测为专业定值。

style 决定视觉语言，identity 绑定同一对象，composition 指导布局，context 用于真实尺寸/用途检视；counterexample 仅用于排除，不送入正向图像生成。

批准状态与来源记录不等于工具已检验图像质量或授权人身份。

## TK-NOTES · context · candidate
[打开材料](../references/handoff-notes.md)
适用：global
项目定位、类别翻译、接口和试作边界。
来源：{"type": "original-study", "source": "本次原创交接自测；来源和生成文本见 handoff-notes.md / generation-prompts.md；不是已批准生产基线。"}

## TK-PROMPTS · context · candidate
[打开材料](../references/generation-prompts.md)
适用：global
真实生成提示与输入关系，不是额外批准。
来源：{"type": "original-study", "source": "本次原创交接自测；来源和生成文本见 handoff-notes.md / generation-prompts.md；不是已批准生产基线。"}

## TK-CHAR · identity · candidate
[打开材料](../references/character-base.png)
适用：character
阿澜身份和默认服装。地图角色视角未覆盖。
来源：{"type": "original-study", "source": "本次原创交接自测；来源和生成文本见 handoff-notes.md / generation-prompts.md；不是已批准生产基线。"}

## TK-MAP · identity · candidate
[打开材料](../references/workshop-before.jpg)
适用：environment
旧灯房结构与机位；成员修复时绑定该实体。
来源：{"type": "original-study", "source": "本次原创交接自测；来源和生成文本见 handoff-notes.md / generation-prompts.md；不是已批准生产基线。"}

## TK-LAMPS · style · candidate
[打开材料](../references/lamp-l1.png)
适用：prop
物品材料、粗轮廓、高光与镜头。L1身份不是L3/L4结构。
来源：{"type": "original-study", "source": "本次原创交接自测；来源和生成文本见 handoff-notes.md / generation-prompts.md；不是已批准生产基线。"}

## TK-L2 · style · candidate
[打开材料](../references/lamp-l2.png)
适用：prop
L2扩展首件；成员L3/L4沿用处理语言，不沿用L2剪影。
来源：{"type": "original-study", "source": "本次原创交接自测；来源和生成文本见 handoff-notes.md / generation-prompts.md；不是已批准生产基线。"}

## TK-PRODUCER · identity · candidate
[打开材料](../references/producer.png)
适用：prop
灯匠工作箱生产器；不是合成链成员。
来源：{"type": "original-study", "source": "本次原创交接自测；来源和生成文本见 handoff-notes.md / generation-prompts.md；不是已批准生产基线。"}

## TK-UI · composition · candidate
[打开材料](../references/ui-first.html)
适用：ui
UI首件实际源码，依赖本目录JS、字体和图片。
来源：{"type": "original-study", "source": "本次原创交接自测；来源和生成文本见 handoff-notes.md / generation-prompts.md；不是已批准生产基线。"}

## TK-UI-KIT · context · candidate
[打开材料](../references/ui-kit.js)
适用：ui
可编辑组件、状态及交互；这是项目源码材料，不代表正式游戏实现。
来源：{"type": "original-study", "source": "本次原创交接自测；来源和生成文本见 handoff-notes.md / generation-prompts.md；不是已批准生产基线。"}

## TK-FONT · font · candidate
[打开材料](../references/tide-sans.woff2)
适用：ui
Noto Sans SC OFL子集，许可见OFL.txt。
来源：{"type": "original-study", "source": "本次原创交接自测；来源和生成文本见 handoff-notes.md / generation-prompts.md；不是已批准生产基线。"}

## TK-FONT-LICENSE · context · candidate
[打开材料](../references/OFL.txt)
适用：ui
随包字体许可。
来源：{"type": "original-study", "source": "本次原创交接自测；来源和生成文本见 handoff-notes.md / generation-prompts.md；不是已批准生产基线。"}

## TK-OLD · counterexample · candidate
[打开材料](../references/counterexample-old-lamp.png)
适用：prop
不采用细杆、窄体、写实金属细节；不要作为正向生图输入。
来源：{"type": "original-study", "source": "本次原创交接自测；来源和生成文本见 handoff-notes.md / generation-prompts.md；不是已批准生产基线。"}

## TK-UI-SHOT · composition · candidate
[打开材料](../references/ui-first.png)
适用：ui
ui-first.html 的实际渲染，390×844；字体和素材由同包源码提供。
来源：{"type": "native-ui-render", "source": "Remotion renders the same ui-kit.js markup and CSS; not image-generated text."}

## TK-WAVE · identity · candidate
[打开材料](../references/character-wave.png)
适用：character
阿澜挥手变体；0.2.0成员实际续作。
来源：{"type": "original-study", "source": "原创自测生成/原生渲染；实际输入与提示见 generation-prompts.md。"}

## TK-AFTER · identity · candidate
[打开材料](../references/workshop-after.jpg)
适用：environment
同机位修复前后；0.2.0成员实际续作。
来源：{"type": "original-study", "source": "原创自测生成/原生渲染；实际输入与提示见 generation-prompts.md。"}

## TK-L3 · style · candidate
[打开材料](../references/lamp-l3.png)
适用：prop, ui
L3圆镜轮廓；0.2.0成员实际续作。
来源：{"type": "original-study", "source": "原创自测生成/原生渲染；实际输入与提示见 generation-prompts.md。"}

## TK-L4 · style · candidate
[打开材料](../references/lamp-l4.png)
适用：prop, ui
L4航标轮廓；0.2.0成员实际续作。
来源：{"type": "original-study", "source": "原创自测生成/原生渲染；实际输入与提示见 generation-prompts.md。"}

## TK-PORTRAIT-BEFORE · composition · candidate
[打开材料](../references/workshop-before-portrait.jpg)
适用：environment, ui
竖版未修复布局和安全区。
来源：{"type": "original-study", "source": "原创自测生成/原生渲染；实际输入与提示见 generation-prompts.md。"}

## TK-PORTRAIT-AFTER · composition · candidate
[打开材料](../references/workshop-after-portrait.jpg)
适用：environment, ui
竖版修复后的布局；先生成此适配再编辑未修复状态。
来源：{"type": "original-study", "source": "原创自测生成/原生渲染；实际输入与提示见 generation-prompts.md。"}

## TK-WOOD1 · style · candidate
[打开材料](../references/wood-l1.png)
适用：prop, ui
木料一级；暖木与海绿宽带。
来源：{"type": "original-study", "source": "原创自测生成/原生渲染；实际输入与提示见 generation-prompts.md。"}

## TK-WOOD2 · style · candidate
[打开材料](../references/wood-l2.png)
适用：prop, ui
木料二级；成捆轮廓与珊瑚扣。
来源：{"type": "original-study", "source": "原创自测生成/原生渲染；实际输入与提示见 generation-prompts.md。"}

## TK-COIN · style · candidate
[打开材料](../references/coin.png)
适用：ui
贝壳金币，资源栏24px检查。
来源：{"type": "original-study", "source": "原创自测生成/原生渲染；实际输入与提示见 generation-prompts.md。"}

## TK-ENERGY · style · candidate
[打开材料](../references/energy.png)
适用：ui
体力图标，资源栏与生产器共同使用。
来源：{"type": "original-study", "source": "原创自测生成/原生渲染；实际输入与提示见 generation-prompts.md。"}

## TK-NERI · identity · candidate
[打开材料](../references/neri.png)
适用：character, ui
奈莉订单半身像，不沿用阿澜身份或全身导出比例。
来源：{"type": "original-study", "source": "原创自测生成/原生渲染；实际输入与提示见 generation-prompts.md。"}

## TK-LOCK · style · candidate
[打开材料](../references/locked.png)
适用：prop, ui
缠网旧货箱，锁定区占位。
来源：{"type": "original-study", "source": "原创自测生成/原生渲染；实际输入与提示见 generation-prompts.md。"}

## TK-FAIL-UI · counterexample · candidate
[打开材料](../references/ui-flat-v020.png)
适用：ui
首版过空、卡片化，保留作为实际失败。
来源：{"type": "original-study", "source": "原创自测生成/原生渲染；实际输入与提示见 generation-prompts.md。"}

## TK-FAIL-CROP · counterexample · candidate
[打开材料](../references/ui-crop-failure.png)
适用：environment, ui
横版cover竖屏导致建筑裁切。
来源：{"type": "original-study", "source": "原创自测生成/原生渲染；实际输入与提示见 generation-prompts.md。"}
