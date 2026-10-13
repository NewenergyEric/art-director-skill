# Compositor 适配范围

依据 [Compositor 官方写入指南](https://github.com/robbietilton/Compositor/blob/87e2283bae4cea45b857a1bb386f8a56ad4e99b6/docs/writing-comp-files.md) 与 [项目格式](https://github.com/robbietilton/Compositor/blob/87e2283bae4cea45b857a1bb386f8a56ad4e99b6/docs/project-format.md)，2026-10-13 核对。当前桌面应用要求 macOS 26、Apple Silicon；本适配没有 Windows 编辑器。

本导出器采用基础 version 11：`.comp/manifest.json` 与 `images/<大写UUID>.png`。数组从底到顶，位置使用画布像素；图层图像转成 RGBA8 PNG，维持独立图层。UUID 由项目、场景和图层 ID 确定，同样输入产生同样输出。生成临时目录后整包移入新目录，不修改已打开的项目。

支持普通图片层、位置、大小、旋转、水平/垂直翻转、透明度和 Normal 混合。浏览器动效、事件时序、灯光 CSS、交互 UI 和视频不自动变成原生图层动画；它们保留为可读配方与运行源码。文字与界面在 HTML/JS 中保持可编辑，本版不声称导出了原生文字或 PSD。

建议 Mac 接收者：解压交付包，打开 `compositor/` 内任一 `.comp`，检查画布尺寸、图层顺序、透明边和配方位置，移动一层并另存，回传检查结果。没有这份实际记录，就保持 `native_open: not_tested`。

文件哈希只证明文件未漂移；不认证来源、版权或主美批准。不要让外部 manifest 引用绝对路径或跳出项目目录；不要执行包里来历不明的脚本来“验证”它。
