# 潮灯小镇字体来源

本文件对应 `tide-sans.woff2`，状态为 candidate；未取得人工主美批准。

- 字体：Noto Sans SC 2.004，正常体，可变字重 100–900。沿用现有港湾 UI 字体，未修改字形设计。
- 来源：[Google Fonts 官方目录](https://github.com/google/fonts/tree/main/ofl/notosanssc)；[源字体](https://raw.githubusercontent.com/google/fonts/main/ofl/notosanssc/NotoSansSC%5Bwght%5D.ttf)。
- 源文件 SHA256：`a3041811a78c361b1de50f953c805e0244951c21c5bd412f7232ef0d899af0da`。本次使用已有本地完整源；与官方 GitHub contents API 的 Git blob `fb0637bafbcd804fe32152370a1225990745b4bc` 核对一致。
- 授权：[SIL Open Font License 1.1](https://raw.githubusercontent.com/google/fonts/main/ofl/notosanssc/OFL.txt)，副本见同目录 `OFL.txt`；版权与字体内部许可字段保留。
- 构建：fontTools 4.61.1 的 `subset`，保留所有布局特性、名称与语言字段、完整可变字重轴；导出 WOFF2。
- 字符：当前 0.5 游戏 HTML/CSS/JS 中的中文、0.4 子集全部 731 个 Unicode 映射（包含初始字体的 687 个）、ASCII 32–126，以及修缮、归航、帮助与常见操作短文案。当前覆盖与源文件哈希见 `evals/tidekeeper-expansion/font-verification.json`；0.4 记录保留于 `evals/tidekeeper-playable/font-verification.json`。
- 原字体不含撤销符号 U+21B6 `↶`。最终 UI 已采用内联 SVG；没有把其他字形重映射成该符号。

游戏已保持现有 `font-family: TideSans`，把 `@font-face` 指向同目录 `url('./tide-sans.woff2') format('woff2')`，保留 `font-weight: 100 900` 与 `font-display: swap`，并预加载此字体。

字形轮廓和字宽在 100、400、700、900 字重对照旧字体检查通过；属于技术验证。最终界面缩放、文字布局和可读性由游戏组合验收记录。新增文案后需再次检查字符覆盖；此文件不宣称覆盖完整简体中文字库。

## 0.5 字形扩充

新增 35 个汉字，当前子集共 766 个 Unicode 映射，225,240 字节。当前运行时的 304 个中文字符与 95 个可打印 ASCII 字符全部覆盖。沿用同一完整 Noto Sans SC 2.004 源文件与可变 100–900 字重，没有替换字体设计。

0.4 子集的全部 731 个字符在 100、400、700、900 字重逐字比较，轮廓与字宽均一致。0.4 验证文件保持原样。当前字体 SHA256 为 `18f31b532143d8be8283522447d56bb3deb64bcbbacbf4dda294f8f7475a6b2e`。

已实际打开并查看五张浏览器 QA 截图：`evals/tidekeeper-expansion/desktop-catalog.png`、`tower-desktop.png`、`beacon-short-desktop.png`、`mobile390-catalog.png`、`dock-mobile.png`。对应图像哈希、尺寸与逐图观察记录于 0.5 字体验证文件。

所见桌面和 390px 手机区域中，无衬线字形与港湾场景、圆润道具和奶油面板协调；标题、按钮、数值与正文的层级可辨。未观察到可见缺字方框、突兀的宋体/字形风格变化、文字重叠或字形裁切。此为 Agent 候选视觉检查，不代表人工主美批准。

手机图鉴截图只展示木材、绳索、五金、工具卡片及底部玻璃分类标题；没有对更下方未展示的内容作视觉结论。此次查看的是给定静态截图，没有另行执行浏览器字体网络加载、滚动或其他设备测试；像素中的字形一致性与 cmap/轮廓技术检查分别记录。

触摸事件与预置道具数量调整后的当前 HTML/CSS/JS 已重新检查字符覆盖，并刷新验证文件中的运行时哈希；字体二进制与 0.4 验证记录保持不变。
