# 连续场景与生产交付

从实际玩法确定需要哪些连续变化，再分配素材。例如修缮需要接触动作与前后场景，探索需要发现、反应与可读的路径，塔防需要预备、攻击、命中和恢复。选择与本项目有关的事件；港湾、合成链或塔防均不成为所有游戏的默认内容。

在项目源记录相机与地标、角色尺度和身份保持项、动作的表现理由及允许夸张；事件、接触点、时长和中断处理放在对应任务。状态图需要比较实际锚点，不能用相同宽高证明几何一致。画风共同，动作仍应表现不同人物、材料和力量。

动作任务也要携带被驱动对象的身份依据。当前 CLI 的实体属于单一类别：角色动作先生成 `character` 类别并绑定对应 `--entity` 的任务书，再生成 `motion` 任务书，在任务说明中关联两份文件及同版身份图。不要给 motion 强塞 character 实体，也不要为了通过校验改写实体类别。动作成员读两份任务书的适用部分，不能只收到节奏说明而丢失角色身份。

短动作可以用 6–20 张有实际姿势或形变差异的画面组织预备、作用和恢复；也可以根据可用工具用骨骼、逐帧绘制或生成动画完成。帧数服从节奏和用途，并非每个粒子效果都要 6–20 张图。先制作并播放一项代表动作，再扩展。将同一张图复制、平移和透明度变化，不能记录成新增动作帧；没有动画工具时交接真实关键姿势和未完成的过渡，不声称已有流畅动画。

把落脚和接触、道具附着、轮廓和身份、起止与循环、时长及状态响应放回游戏检查。合成效果要能看清原物件、合成发生和目标等级，不能靠闪光掩盖身份或结构跳变。记录正常速度播放和关键中间帧的实际观察；单张分镜不证明连续动作成立。详细执行见配套 Skill 的组合与动作验收。

持续生产把判断接到明确的资产、负责人、输入与组合关系：谁建立首件，谁做同族变体，谁组合并播放检查。记录实际工具输入；复用未变资产，将变动影响传到下游。共享审美仍来自 `style-pack.json`，计划只引用它。自动检查能发现漏件和错版，不能代替主美判断动作是否有性格、画面是否好玩。

可选配套 `game-art-production` 有两条输出：常规资产/组合交付，以及 Compositor `.comp` 分层场景。它是独立安装的执行入口，项目包仍由这里维护。Compositor 是图层编辑器，不替代图像模型、动画软件或引擎；用户不需要安装它才能用主 Skill。

发现共性问题时，新建候选版本，记录哪些规则与资产受到影响，重建包后再冻结生产计划。演示、素材库、视频与导出共用同一场景配方。交接中区分技术完整、自查结果、真实主美批准和原生/引擎检查，不把其中任何一步代替其余步骤。

## Connect resources to visible scene changes

For each construction or repair stage, connect the damaged part, the required material or tool, the visible result and its activation condition. The damage should make the resource request plausible. Delivered rope or hardware, for example, may require a visible attachment or rigging change at the correct anchor; completing a nearby surface alone would leave that relationship unexplained. Check the result in later scene states too. Material submission, completed construction, activation and reward remain distinct events. A lighting change or glow cannot substitute for required structural work; if the task only replenishes fuel, identify that narrower change explicitly.

Create variants from a geometrically valid first article with the same camera and fixed landmarks. Compare the full view and affected details before accepting an edit. Reject unintended displacement, retain the failed source and restrict the next edit to the authorized area; a transition must not conceal drift. Recheck the scene in its actual viewport, since a crop can hide the damaged part, completed work or interaction target. Distinguish allowed foliage or highlight variation from changes to required structure and anchors, and record remaining differences instead of claiming seamless interchangeability.
