[English](TIDEKEEPER-CONTINUITY.en.md) · [案例总览](AGENT-ART-TEAM.zh.md)

# 潮灯 0.6.2：从单张姿势到完整连续动作

[试玩](assets/tidekeeper-playable/play.html?v=0.6.2) · [顺序播放、慢放与逐相位检查](assets/tidekeeper-playable/motion-review.html?v=0.6.2)

维修、点灯和招手现在沿用同一动作母版做连续局部运动。修正目标是人物结构、服装与手持物在完整动作中保持一致。七个合成家族、十六级物品、两种货币和四章施工继续使用原有规则与美术方向。

## 发现了什么，怎样修正

0.6.0 把独立生成的手臂拼到身体上，出现肩位、比例与衣袖遮挡错误。把这种结构缺陷当作“轻微生硬”的判断已撤回。0.6.1 改用完整人物姿势后，单张连接较完整，但连续切换仍有头发、衣褶、体态、油壶与灯体比例漂移。

0.6.2 借鉴《午夜物归原主》中同母版、受限动作和真实运行复核的方法，改用固定底板、局部肘区变形及刚性手/工具。借鉴的是制作方法，不是复用其人物或把另一案例的验收结论搬过来。

| 动作 | 完整过程 | 固定项与联系 |
|---|---|---|
| 维修，2.8 秒 | 预备、抬锤、落锤、回弹、收势；两次敲击 | 脸、衣服、支撑姿态固定；手和木锤一起运动，530/1730 ms 接触与效果同步 |
| 点灯，3.2 秒 | 倒油、放壶、取引火杆、触芯、回放 | 油壶复用棋盘中的同一素材；桌面、手、支座共享交接坐标，道具只出现一次 |
| 招手，5.2 秒 | 小幅前臂摆动、渐入、渐出、回到初始姿态 | 同一脸、衣服和靴子；肘部局部过渡，不移动整张角色冒充动作 |

![维修的准备、抬锤、接触和收势](assets/tidekeeper-playable/evidence/v062/repair-strip.jpg)
![点灯的倒油、工具交接、触芯和回放](assets/tidekeeper-playable/evidence/v062/ignition-strip.jpg)
![招手的起步、中间相位和收势](assets/tidekeeper-playable/evidence/v062/beckon-strip.jpg)

局部动画也经历返修：运动裁片夹带裤料、旧手的半透明残影、未恢复的 Canvas clip 截掉工具，以及引火杆交接约一像素跳位。处理方式分别是收紧运动范围、完整干净底板、恢复绘图上下文、统一交接坐标。额外生成的一张底板改变了构图和比例，被拒收并保留。

## 实际播放与验证

[完整 11.2 秒顺序动作录像](assets/tidekeeper-playable/evidence/v062/continuous-actions.webm)先以原生正常速度播放，再进入慢放与逐相位诊断。检查页可以自己运行同一份动作代码。录像和代表性相位不等于每一毫秒均由独立人员审阅。

[中文完整通关录像](assets/tidekeeper-playable/evidence/v062/normal-speed-zh.webm)与[英文完整通关录像](assets/tidekeeper-playable/evidence/v062/normal-speed-en.webm)分别为 35.889 秒、37.045 秒，均从新局通过普通控件完成 17 次合成并取得 225 金币，没有注入资源、跳过或加速。

七种浏览器场景通过 431 项检查，覆盖双语桌面、竖屏、横屏、减少动态、拖动、撤回、暂停续播、存档重载与重开。另有 [315 次指定区域光栅采样和交接检查](assets/tidekeeper-playable/evidence/v062/continuity-verification.json)：指定脸、衣服、靴子、灯座区域保持不变，点火端点误差约 0.091 源像素。这些数值只支持所声明的固定区域和坐标关系，不能自动批准人体结构与自然运动。

[可复现脚本](../evals/tidekeeper-continuity/README.md)将正常交互与确定性诊断分开。[导入回执](assets/tidekeeper-playable/evidence/v062/import-verification.json)逐件记录源文件与发布文件的哈希。发布集成仅调整两条标题的翻译调用以兼容静态检查，显示内容与动作不变；[发布复核](assets/tidekeeper-playable/evidence/v062/publication-verification.json)记录重新通关、连续播放及仓库检查。

## 素材与 Skill 的可追溯更新

本次实际生成 4 次，选用 3 张新原图、拒收 1 张。运行使用 3 个固定动作母版、2 张干净底板和既有油壶；新增绘制动画帧为 0。六张透镜安装姿势保留，18 个时间标记不计作新绘制帧。[源图、实际提示、输入关系和哈希](assets/tidekeeper-playable/art/actions-v062/receipt.json)区分当前素材和历史尝试。

制作 Skill 的[结构与组合检查](../skills/game-art-production/references/assembly-review.md)新增肩臂体积、衣袖遮挡和三维来源的真实口径；[连续动作制作与复核](../skills/game-art-production/references/continuous-actions.md)覆盖完整起止、循环、工具归属、底板残影、关节与刚性道具分离，以及实际速度验收。

当前仍是身体整体较静、幅度受限的二维局部运动，没有真实三维模型、骨骼或蒙皮。透镜安装未在本轮改为连续局部动画。真实手机、生产引擎与人工主美批准未完成；已有浏览器与自动检查不替代这些验收。
