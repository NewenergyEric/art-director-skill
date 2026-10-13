# 潮灯小镇宣传元素

`title-plaque.png` 是本轮实际生成的独立透明标题牌，借用项目已有的青绿搪瓷、奶油木边、珊瑚装饰和绳结。它用于宣传标题，不属于运行时核心美术包，也不改变 0.3.0 的游戏规则。`motion/src/GameCampaign.tsx` 保留标题、合成与动画源文件；`docs/assets/campaign.css` 保留网页文字与按钮样式。

输入为项目的 `workshop-after-portrait.jpg` 与 `lamp-l4.png`。2026-10-13 使用当前宿主的 imagegen 生成；输出有真实 alpha，原始完整画布保留。未声称主美批准或原生文字图层导出。

实际提示：

```text
Create one ORIGINAL game UI artwork element, a reusable title plaque for the fictional casual mobile merge game Tidekeeper. Use image 1 for the established warm harbor visual world and image 2 for its chunky rounded hand-painted 3D material language. Single wide horizontal maritime name plaque, aspect of the visible plaque about 4.6:1, centered on a transparent canvas. Rich deep teal enamel inset, gently curved chunky warm ivory carved wooden silhouette, warm brass trim and tiny coral-red corner flourishes. A neatly sculpted rope knot only on the left and right end, small shell medallion in the top center. Polished premium casual merge-game asset, broad painted highlights, believable volume, appealing beveled edges, clean silhouette. Large uninterrupted deep-teal center must be empty for adding editable typography later. No text, letters, numbers, mockup UI, characters, background, gray checkerboard, cast floor shadow or other elements. Entire plaque fully inside the canvas with transparent space all round. It must look like a designed in-game title ribbon that belongs to this harbor, not a flat website card, generic vector badge or metallic fantasy RPG crest. Real transparent alpha background. A single plaque only.
```

构图研究使用 [Gossip Harbor 的官方 Google Play 图片](https://play.google.com/store/apps/details?id=com.mergegames.gossipharbor)：大字的厚度与对比、角色/道具前景、短动作标题与画面叙事。没有复制其美术或剧情。宣传可以重排项目素材；实际运行与分层导出的坐标仍来自 0.3.0 场景配方。
