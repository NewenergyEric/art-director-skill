# 潮灯小镇 · 扩展道具生成记录

状态：candidate；未取得人工主美批准。共享项目规范：`examples/tidekeeper-production/style-pack.json`，版本 0.3.0，draft。

本批为各自独立生成的道具，不从整板拆分、不复制换色。工具使用内置 `image_gen`，每件单独调用，要求实际透明背景。原图保存于本目录 `source/`。工具未提供可验证的模型版本或 seed。

原始参考已实际打开：`docs/assets/tidekeeper-production/lamp-l1.png`、`producer.png`、`wood-l2.png` 与 `coin.png`。前三者用于同一镜头、体块、光源和材料语言；金币参考仅用于金币题材。保留大轮廓、暖左上光、轻俯视三分之四和青绿/珊瑚/蜂蜜金细节；每类材质分别表现。

## nails-1 首件

工具：`image_gen`；`transparent_background: true`。图像输入按序为 lamp-l1、producer、wood-l2，均为风格参考。

```text
Use case: stylized-concept.
Asset type: single transparent merge-game item sprite, Tidekeeper shared style pack 0.3.0, candidate.
Input images are STYLE REFERENCES ONLY: image 1 is the existing teal lamp showing camera and broad form; image 2 is the toolbox showing the timber and steel treatment; image 3 is bundled wood showing warm light and chunky small-scale readability. Do not reproduce the reference objects.
Create ONE small bundle of FOUR sturdy short iron nails, fanned very slightly, with broad flattened circular heads and clean pointed shafts, held together by one short teal cloth binding. The steel is muted blue-gray iron with a broad warm bevel highlight; the cloth is matte sea-green, with one tiny coral fastening knot. Iron must look different from cloth. Keep the nails individually understandable and the bundle compact.
Match the existing casual harbor merge-game illustration: slightly elevated three-quarter view, rounded chunky silhouettes, broad painted gradients, restrained edge definition, warm upper-left light, soft cool lower-right shading. Honey-gold, teal, coral accents only where functional. Friendly, rich color; hand-painted game sprite finish, not a photograph, not a flat vector, not glossy plastic.
Square canvas, centered entire object, 78–86% occupied width/height, generous clean margin. One item only. All outlines fully visible. Actual transparent background with clean alpha edges; no floor, no display base, no cast shadow, no atmospheric glow, no UI, no lettering, no numerals, no watermark. This is the level-1 nails item, visibly simple and smaller in silhouette than a future hardware box.
```

原图：`source/nails-1-v1.png`；导出：`nails-1.png`。首件观察：铁钉的灰蓝金属、哑光青绿绑带、珊瑚扣形成清楚的材料差异；钉头、尖端与绑带在同一紧凑轮廓中。其金属材质比旧木料光滑，整体光源、镜头与旧道具兼容。待完成实际小格组合检查后写入批次验收。

## nails-2

工具：内置 `image_gen`，`transparent_background: true`；每件独立调用。

图像输入：`docs/assets/tidekeeper-production/lamp-l1.png`、`docs/assets/tidekeeper-production/producer.png`、`docs/assets/tidekeeper-production/wood-l2.png`、`docs/assets/tidekeeper-playable/art/expansion/nails-1.png`。

```text
Use case: stylized-concept. Asset type: ONE independent transparent item sprite for Tidekeeper, a warm casual harbor merge game, shared style pack 0.3.0, candidate.
Input images are STYLE REFERENCES ONLY: image 1 lamp = broad volume, camera, warm light; image 2 toolbox = material treatment; image 3 bundled wood = silhouette and broad color blocks. Do not reproduce the reference objects.
Style: slightly elevated three-quarter view, rounded chunky usable forms, broad painted shading, restrained edges, warm upper-left light and cool lower-right shade. Sea-green/teal, honey gold, a small coral accent. Friendly polished hand-painted casual-game sprite, not a photograph, not flat vector. Distinct materials, not uniform plastic.
Composition: square, centered whole item, 78–86% of frame occupied in maximum dimension, complete clear silhouette and clean margin. Actual transparent RGBA background. NO floor, base, cast shadow, UI, text, numerals, watermark, outer glow, thin fussy parts or photographic texture.
Subject: A level-2 harbor hardware box, wider and more substantial than the level-1 nail bundle. One short open honey-colored wooden compartment box with rounded teal metal corner bands and a single coral clasp. Inside, a clearly visible group of large blue-gray iron nails and ONE broad L-shaped steel repair bracket. Three or four chunky parts total, readable at 50px. The solid wooden front lip partly hides the nail shafts. Nails must match the steel-gray broad nail heads of input image 4, which is the level-1 item style reference. Box grain is broad and sparse; steel has one smooth bevel highlight. No cloth binding, no hammer, no wrench, no lid floating behind. This is one box of hardware, not an arrangement of separate inventory icons.
```

原图：`source/nails-2-v1.png`；成品：`nails-2.png`。输出已实际读图；技术检查与小尺寸组合检查见 `asset-records.json`。

## rope-1

工具：内置 `image_gen`，`transparent_background: true`；每件独立调用。

图像输入：`docs/assets/tidekeeper-production/lamp-l1.png`、`docs/assets/tidekeeper-production/producer.png`、`docs/assets/tidekeeper-production/wood-l2.png`。

```text
Use case: stylized-concept. Asset type: ONE independent transparent item sprite for Tidekeeper, a warm casual harbor merge game, shared style pack 0.3.0, candidate.
Input images are STYLE REFERENCES ONLY: image 1 lamp = broad volume, camera, warm light; image 2 toolbox = material treatment; image 3 bundled wood = silhouette and broad color blocks. Do not reproduce the reference objects.
Style: slightly elevated three-quarter view, rounded chunky usable forms, broad painted shading, restrained edges, warm upper-left light and cool lower-right shade. Sea-green/teal, honey gold, a small coral accent. Friendly polished hand-painted casual-game sprite, not a photograph, not flat vector. Distinct materials, not uniform plastic.
Composition: square, centered whole item, 78–86% of frame occupied in maximum dimension, complete clear silhouette and clean margin. Actual transparent RGBA background. NO floor, base, cast shadow, UI, text, numerals, watermark, outer glow, thin fussy parts or photographic texture.
Subject: ONE compact flat coil of thick warm golden hemp rope, four generously sized loops with a small visible center opening; a short curved rope end rests against the coil. One sea-green retaining strap with a small coral wooden toggle holds the coil at the lower right. Broad stylized diagonal rope twist marks, matte coarse fiber material suggested sparingly, no hundreds of fine hairs. Warm buff rope distinct from green cloth. The coil is clearly a circular rope bundle, low and oval in the shared three-quarter view, sturdy rounded form. No anchor, hook, knots spilling far outside, or other tools.
```

原图：`source/rope-1-v1.png`；成品：`rope-1.png`。输出已实际读图；技术检查与小尺寸组合检查见 `asset-records.json`。

## tool-1

工具：内置 `image_gen`，`transparent_background: true`；每件独立调用。

图像输入：`docs/assets/tidekeeper-production/lamp-l1.png`、`docs/assets/tidekeeper-production/producer.png`、`docs/assets/tidekeeper-production/wood-l2.png`。

```text
Use case: stylized-concept. Asset type: ONE independent transparent item sprite for Tidekeeper, a warm casual harbor merge game, shared style pack 0.3.0, candidate.
Input images are STYLE REFERENCES ONLY: image 1 lamp = broad volume, camera, warm light; image 2 toolbox = material treatment; image 3 bundled wood = silhouette and broad color blocks. Do not reproduce the reference objects.
Style: slightly elevated three-quarter view, rounded chunky usable forms, broad painted shading, restrained edges, warm upper-left light and cool lower-right shade. Sea-green/teal, honey gold, a small coral accent. Friendly polished hand-painted casual-game sprite, not a photograph, not flat vector. Distinct materials, not uniform plastic.
Composition: square, centered whole item, 78–86% of frame occupied in maximum dimension, complete clear silhouette and clean margin. Actual transparent RGBA background. NO floor, base, cast shadow, UI, text, numerals, watermark, outer glow, thin fussy parts or photographic texture.
Subject: ONE sturdy small carpenter's claw hammer, shown diagonally rising from lower-left handle to upper-right head, fully visible. Thick honey-colored wooden handle with broad warm grain and rounded end, short matte sea-green grip wrap at the very bottom secured with one coral peg. Head is blue-gray forged steel with a round striking face to the left and a single broad split claw at right, the two claw tips clearly joined at the hammerhead. Simplified broad planes, rounded safe-looking game proportions, functional recognizable hammer; no long thin claw, nails, saw or extra tools. Wood is matte and warm; steel is smooth muted gray with a broad upper-left bevel highlight.
```

原图：`source/tool-1-v1.png`；成品：`tool-1.png`。输出已实际读图；技术检查与小尺寸组合检查见 `asset-records.json`。

## rope-2

工具：内置 `image_gen`，`transparent_background: true`；每件独立调用。

图像输入：`docs/assets/tidekeeper-production/lamp-l1.png`、`docs/assets/tidekeeper-production/producer.png`、`docs/assets/tidekeeper-production/wood-l2.png`、`docs/assets/tidekeeper-playable/art/expansion/rope-1.png`。

```text
Use case: stylized-concept. Asset type: ONE independent transparent item sprite for Tidekeeper, a warm casual harbor merge game, shared style pack 0.3.0, candidate.
Input images are STYLE REFERENCES ONLY: image 1 lamp = broad volume, camera, warm light; image 2 toolbox = material treatment; image 3 bundled wood = silhouette and broad color blocks. Do not reproduce the reference objects.
Style: slightly elevated three-quarter view, rounded chunky usable forms, broad painted shading, restrained edges, warm upper-left light and cool lower-right shade. Sea-green/teal, honey gold, a small coral accent. Friendly polished hand-painted casual-game sprite, not a photograph, not flat vector. Distinct materials, not uniform plastic.
Composition: square, centered whole item, 78–86% of frame occupied in maximum dimension, complete clear silhouette and clean margin. Actual transparent RGBA background. NO floor, base, cast shadow, UI, text, numerals, watermark, outer glow, thin fussy parts or photographic texture.
Subject: ONE compact level-2 pulley rig: a thick teal-painted metal single-sheave block with a large honey-brass grooved wheel visibly inside its oval open housing; a short broad steel hanging hook above; thick warm golden hemp rope runs correctly over that wheel and gathers into a small tidy coil below and to the left. Match the matte broad-twist rope in input image 4, which is the level-1 rope style reference. One coral axle cap. This is one connected usable hoisting rig, with a taller distinct silhouette than the simple coil. Keep load-bearing attachments clear; no thin suspended lines, no giant anchors, no duplicate wheels, no tiny hardware. Teal painted metal, brass wheel, and fibrous rope must have different material highlights.
```

原图：`source/rope-2-v1.png`；成品：`rope-2.png`。输出已实际读图；技术检查与小尺寸组合检查见 `asset-records.json`。

## tool-2

工具：内置 `image_gen`，`transparent_background: true`；每件独立调用。

图像输入：`docs/assets/tidekeeper-production/lamp-l1.png`、`docs/assets/tidekeeper-production/producer.png`、`docs/assets/tidekeeper-production/wood-l2.png`、`docs/assets/tidekeeper-playable/art/expansion/tool-1.png`。

```text
Use case: stylized-concept. Asset type: ONE independent transparent item sprite for Tidekeeper, a warm casual harbor merge game, shared style pack 0.3.0, candidate.
Input images are STYLE REFERENCES ONLY: image 1 lamp = broad volume, camera, warm light; image 2 toolbox = material treatment; image 3 bundled wood = silhouette and broad color blocks. Do not reproduce the reference objects.
Style: slightly elevated three-quarter view, rounded chunky usable forms, broad painted shading, restrained edges, warm upper-left light and cool lower-right shade. Sea-green/teal, honey gold, a small coral accent. Friendly polished hand-painted casual-game sprite, not a photograph, not flat vector. Distinct materials, not uniform plastic.
Composition: square, centered whole item, 78–86% of frame occupied in maximum dimension, complete clear silhouette and clean margin. Actual transparent RGBA background. NO floor, base, cast shadow, UI, text, numerals, watermark, outer glow, thin fussy parts or photographic texture.
Subject: ONE compact installation tool kit for repairing a harbor lighthouse's WOODEN lamp-room frame, timber railings and maintenance ladder. A folded thick sea-green canvas tool roll holds a chunky wood-handled steel hammer and one short carpenter's hand saw with a broad blue-gray blade, six clear blunt teeth and a honey wooden closed handle. Hammer matches input image 4, the level-1 tool style reference. A small group of two or three spare steel nails and one folded cream wiping cloth are tucked in the front pocket. A coral strap with a broad brass buckle securely ties the kit into ONE cohesive inventory item; tool heads rise visibly above it. No decorative toolbox, no extra wrench, no stonework tools. Hammer, saw, usable consumables; balanced, larger and wider than a single hammer. Make the canvas matte, wood softly grained, steel gently beveled. Do not cram in tiny parts.
```

原图：`source/tool-2-v1.png`；成品：`tool-2.png`。输出已实际读图；技术检查与小尺寸组合检查见 `asset-records.json`。

## glass-1

工具：内置 `image_gen`，`transparent_background: true`；每件独立调用。

图像输入：`docs/assets/tidekeeper-production/lamp-l1.png`、`docs/assets/tidekeeper-production/producer.png`、`docs/assets/tidekeeper-production/wood-l2.png`。

```text
Use case: stylized-concept. Asset type: ONE independent transparent item sprite for Tidekeeper, a warm casual harbor merge game, shared style pack 0.3.0, candidate.
Input images are STYLE REFERENCES ONLY: image 1 lamp = broad volume, camera, warm light; image 2 toolbox = material treatment; image 3 bundled wood = silhouette and broad color blocks. Do not reproduce the reference objects.
Style: slightly elevated three-quarter view, rounded chunky usable forms, broad painted shading, restrained edges, warm upper-left light and cool lower-right shade. Sea-green/teal, honey gold, a small coral accent. Friendly polished hand-painted casual-game sprite, not a photograph, not flat vector. Distinct materials, not uniform plastic.
Composition: square, centered whole item, 78–86% of frame occupied in maximum dimension, complete clear silhouette and clean margin. Actual transparent RGBA background. NO floor, base, cast shadow, UI, text, numerals, watermark, outer glow, thin fussy parts or photographic texture.
Subject: TWO broad smooth pieces of tumbled sea-blue glass, slightly overlapping as ONE inventory item. One larger softly rounded irregular quadrilateral in pale turquoise at back, one smaller rounded triangular piece in deeper aqua in front. These are thick translucent beach glass panes with blunt wave-worn rims, softly glowing light TRANSMITTED INSIDE the glass only, subtle broad cream upper-left reflection and darker cyan edges. Frosted glass surfaces, minimal texture, distinctly translucent rather than plastic or gems. No cut crystal facets, no cracks, no sparkles outside, no sand, no holder, no metal frame, no colored cloth. The overlap remains readable at tiny size; simple two-part silhouette.
```

原图：`source/glass-1-v1.png`；成品：`glass-1.png`。输出已实际读图；技术检查与小尺寸组合检查见 `asset-records.json`。

## glass-2

工具：内置 `image_gen`，`transparent_background: true`；每件独立调用。

图像输入：`docs/assets/tidekeeper-production/lamp-l1.png`、`docs/assets/tidekeeper-production/producer.png`、`docs/assets/tidekeeper-production/wood-l2.png`、`docs/assets/tidekeeper-playable/art/expansion/glass-1.png`。

```text
Use case: stylized-concept. Asset type: ONE independent transparent item sprite for Tidekeeper, a warm casual harbor merge game, shared style pack 0.3.0, candidate.
Input images are STYLE REFERENCES ONLY: image 1 lamp = broad volume, camera, warm light; image 2 toolbox = material treatment; image 3 bundled wood = silhouette and broad color blocks. Do not reproduce the reference objects.
Style: slightly elevated three-quarter view, rounded chunky usable forms, broad painted shading, restrained edges, warm upper-left light and cool lower-right shade. Sea-green/teal, honey gold, a small coral accent. Friendly polished hand-painted casual-game sprite, not a photograph, not flat vector. Distinct materials, not uniform plastic.
Composition: square, centered whole item, 78–86% of frame occupied in maximum dimension, complete clear silhouette and clean margin. Actual transparent RGBA background. NO floor, base, cast shadow, UI, text, numerals, watermark, outer glow, thin fussy parts or photographic texture.
Subject: ONE circular lighthouse optical lens with a thick rounded honey-brass rim, angled gently into the shared slightly elevated three-quarter view. Its large sea-blue convex glass face has three broad concentric optical rings and a pale cream upper-left reflection. Glass color and softly translucent feel match the tumbled sea glass in input image 4; now refined into a useful lens with distinct glass-and-metal materials. A slim teal rear band visible on the lower-right rim; one restrained coral alignment mark on the brass rim, no writing. The full circular rim remains unbroken. No stand, handle, lamp body, backing board, pedestal, light beam, extra objects or external glow. Clean broad disc silhouette, visibly different from the two loose glass pieces.
```

原图：`source/glass-2-v1.png`；成品：`glass-2.png`。输出已实际读图；技术检查与小尺寸组合检查见 `asset-records.json`。

## oil-1

工具：内置 `image_gen`，`transparent_background: true`；每件独立调用。

图像输入：`docs/assets/tidekeeper-production/lamp-l1.png`、`docs/assets/tidekeeper-production/producer.png`、`docs/assets/tidekeeper-production/wood-l2.png`。

```text
Use case: stylized-concept. Asset type: ONE independent transparent item sprite for Tidekeeper, a warm casual harbor merge game, shared style pack 0.3.0, candidate.
Input images are STYLE REFERENCES ONLY: image 1 lamp = broad volume, camera, warm light; image 2 toolbox = material treatment; image 3 bundled wood = silhouette and broad color blocks. Do not reproduce the reference objects.
Style: slightly elevated three-quarter view, rounded chunky usable forms, broad painted shading, restrained edges, warm upper-left light and cool lower-right shade. Sea-green/teal, honey gold, a small coral accent. Friendly polished hand-painted casual-game sprite, not a photograph, not flat vector. Distinct materials, not uniform plastic.
Composition: square, centered whole item, 78–86% of frame occupied in maximum dimension, complete clear silhouette and clean margin. Actual transparent RGBA background. NO floor, base, cast shadow, UI, text, numerals, watermark, outer glow, thin fussy parts or photographic texture.
Subject: ONE short stout amber-glass lamp-oil bottle with softly squared round shoulders, a small thick neck, and a broad natural cork stopper. Amber golden liquid visible through warm translucent glass with a simple horizontal fill level, single broad cream reflection on upper-left. A narrow matte teal cloth band wraps the lower neck and is secured by one small coral wax-like clasp, blank and unlettered. Rounded stable bottom, no separate base, no handle, no pouring spout, no paper label or label-shaped empty rectangle. Cork has a few broad soft grain marks, glass is translucent rather than plastic, cloth is matte. Simple compact level-1 supply bottle.
```

原图：`source/oil-1-v1.png`；成品：`oil-1.png`。输出已实际读图；技术检查与小尺寸组合检查见 `asset-records.json`。

## coin-pile

工具：内置 `image_gen`，`transparent_background: true`；每件独立调用。

图像输入：`docs/assets/tidekeeper-production/lamp-l1.png`、`docs/assets/tidekeeper-production/producer.png`、`docs/assets/tidekeeper-production/wood-l2.png`、`docs/assets/tidekeeper-production/coin.png`。

```text
Use case: stylized-concept. Asset type: ONE independent transparent item sprite for Tidekeeper, a warm casual harbor merge game, shared style pack 0.3.0, candidate.
Input images are STYLE REFERENCES ONLY: image 1 lamp = broad volume, camera, warm light; image 2 toolbox = material treatment; image 3 bundled wood = silhouette and broad color blocks. Do not reproduce the reference objects.
Style: slightly elevated three-quarter view, rounded chunky usable forms, broad painted shading, restrained edges, warm upper-left light and cool lower-right shade. Sea-green/teal, honey gold, a small coral accent. Friendly polished hand-painted casual-game sprite, not a photograph, not flat vector. Distinct materials, not uniform plastic.
Composition: square, centered whole item, 78–86% of frame occupied in maximum dimension, complete clear silhouette and clean margin. Actual transparent RGBA background. NO floor, base, cast shadow, UI, text, numerals, watermark, outer glow, thin fussy parts or photographic texture.
Subject: ONE small compact pile of FIVE gold harbor coins. Image 4 is the exact existing coin identity reference: keep its broad round golden rim, warm inset center, and raised simple scallop-shell emblem with five broad lobes. Two short overlapping stacks and one tilted face coin at the front make a single cohesive pile, with only two clearly exposed shell faces. Vary coin orientations naturally, not a grid. Match the coin's honey gold and buttery highlight exactly, smooth broad metallic planes, crisp readable shell, no extra engravings or numbers. No bag, chest, ribbon, gems, dust, sparkles, text, banknotes or extra props. Distinct pile silhouette, restrained count, actual transparent background without cast shadow.
```

原图：`source/coin-pile-v1.png`；成品：`coin-pile.png`。输出已实际读图；技术检查与小尺寸组合检查见 `asset-records.json`。

## oil-2

工具：内置 `image_gen`，`transparent_background: true`；每件独立调用。

图像输入：`docs/assets/tidekeeper-production/lamp-l1.png`、`docs/assets/tidekeeper-production/producer.png`、`docs/assets/tidekeeper-production/wood-l2.png`、`docs/assets/tidekeeper-playable/art/expansion/oil-1.png`。

```text
Use case: stylized-concept. Asset type: ONE independent transparent item sprite for Tidekeeper, a warm casual harbor merge game, shared style pack 0.3.0, candidate.
Input images are STYLE REFERENCES ONLY: image 1 lamp = broad volume, camera, warm light; image 2 toolbox = material treatment; image 3 bundled wood = silhouette and broad color blocks. Do not reproduce the reference objects.
Style: slightly elevated three-quarter view, rounded chunky usable forms, broad painted shading, restrained edges, warm upper-left light and cool lower-right shade. Sea-green/teal, honey gold, a small coral accent. Friendly polished hand-painted casual-game sprite, not a photograph, not flat vector. Distinct materials, not uniform plastic.
Composition: square, centered whole item, 78–86% of frame occupied in maximum dimension, complete clear silhouette and clean margin. Actual transparent RGBA background. NO floor, base, cast shadow, UI, text, numerals, watermark, outer glow, thin fussy parts or photographic texture.
Subject: ONE large sturdy harbor lamp-oil pouring can, the level-2 upgrade to the small amber oil bottle in image 4. A rounded pear-shaped sea-green enameled METAL reservoir, wide honey-brass upper shoulder and base band, one thick loop carry handle on the left, and one short substantial curved brass pouring spout rising to the upper right with a clearly open round tip. Small snug brass filler lid on top with a coral thumb tab. One compact amber glass oil-level window inset in the front, blank and unlettered, with golden oil visible. Must read as a useful oil can, not a kettle: no steam, no flame, no cup. Friendly large silhouette, visibly more capable than the bottle. Broad smooth painted-metal shading distinct from brass and the tiny amber window; no uniform plastic shine. Entire spout and handle safely inside wide clean margins, no drip, no detached parts.
```

原图：`source/oil-2-v1.png`；成品：`oil-2.png`。输出已实际读图；技术检查与小尺寸组合检查见 `asset-records.json`。

## shipping-token

工具：内置 `image_gen`，`transparent_background: true`；每件独立调用。

图像输入：`docs/assets/tidekeeper-production/lamp-l1.png`、`docs/assets/tidekeeper-production/producer.png`、`docs/assets/tidekeeper-production/wood-l2.png`。

```text
Use case: stylized-concept. Asset type: ONE independent transparent item sprite for Tidekeeper, a warm casual harbor merge game, shared style pack 0.3.0, candidate.
Input images are STYLE REFERENCES ONLY: image 1 lamp = broad volume, camera, warm light; image 2 toolbox = material treatment; image 3 bundled wood = silhouette and broad color blocks. Do not reproduce the reference objects.
Style: slightly elevated three-quarter view, rounded chunky usable forms, broad painted shading, restrained edges, warm upper-left light and cool lower-right shade. Sea-green/teal, honey gold, a small coral accent. Friendly polished hand-painted casual-game sprite, not a photograph, not flat vector. Distinct materials, not uniform plastic.
Composition: square, centered whole item, 78–86% of frame occupied in maximum dimension, complete clear silhouette and clean margin. Actual transparent RGBA background. NO floor, base, cast shadow, UI, text, numerals, watermark, outer glow, thin fussy parts or photographic texture.
Subject: ONE physical harbor shipping token, a thick rounded rectangular metal badge with gently clipped corners, angled slightly into the shared three-quarter view. Sea-blue enamel face within a broad honey-brass rim; one large simple raised brass ANCHOR emblem centered, with a clear round top ring, horizontal stock and two balanced curved flukes. A short coral cloth tab loops through a small brass eye at the upper-left corner, attached to the badge as one cohesive object. The anchor silhouette must be bold and readable at 50 pixels. This token is a tangible collectible port pass, not a UI button or a logo graphic. No letter, number, fake text, perforation text, paper ticket, shell emblem, coins, extra medallions or sparkles. Enamel, brushed brass and cloth have separate material response. Keep its compact wide silhouette distinct from round coins and a circular lens.
```

原图：`source/shipping-token-v1.png`；成品：`shipping-token.png`。输出已实际读图；技术检查与小尺寸组合检查见 `asset-records.json`。





## 导出与实际检查

十二件均为独立 `image_gen` 调用；没有整板切件、复制或换色充数。所有原始输出保留于 `source/`；最终文件为 512×512 RGBA。确定性导出仅对完整原画布等比缩放、居中与补透明边，不抠图、不重绘、不改变色彩。

盘绳、滑轮索具、安装工具包、大油壶的原图有效占比超过 90%，分别缩小完整画布，把最长有效轮廓降至约 86%；未裁切钩、锯、绳和壶嘴。其他资产保留原画布比例。

实际打开并检查了每张工具输出，以及 `evals/tidekeeper-expansion/props-review.png` 和 `props-scale-review.png`。46、50、64、96px 中，道具类别与等级的主体轮廓可区分；原有灯具、工具箱、木料和金币已同屏对照。透明边在奶油底和原棋盘色上没有影响识别的暗边。具体观察、尺寸、alpha、SHA256 见 `asset-records.json`。

滑轮索具是本批最窄的轮廓，若最终格子小于 46px，需重新检验实际落位。文件通过和 Agent 读图不代表人工主美批准；本批仍为 candidate。游戏接入与正常操作速度下的组合检查由父任务完成。

## 本次发现与方法反馈

提示词给出 78–86% 占比后，四张输出仍超出 90%；应以最终 alpha 有效轮廓实测，再对完整画布等比缩小补边。首件与同族图像参考能保持钉头、绳索、锤和玻璃材质连续，但不替代逐件读图。大图中可见的布纹/光圈在小格中被主体色块概括，不能把这些细节视为等级识别依据。
