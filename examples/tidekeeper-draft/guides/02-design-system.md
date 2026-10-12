# 美术风格与类别家族规范

项目 `tidekeeper` / 版本 `0.1.0` / 源状态 `draft`

交付状态：草案交付，尚未经 release 构建。

规范指纹：`b2a3ddf1535339cef9f897dedbe0e134c92354c0f278e9f0ecfcd578086b67b0`

由 style-pack.json 派生。修改规范请修改源文件并重建新版本；本手册不是独立审批或第二份规范源。unknown / proposed / planned / candidate 都不等于已确认，未明确参数不得推测为专业定值。

固定规则与开放变量同时保留；候选探索不能自动修改全队基线。规则原文及证据见 [STYLE.md](../STYLE.md)。

## 类别要求

### prop
沿用海港样板制作灯具家族；分别生成独立 PNG，再组合检查。
固定：
- 海绿搪瓷 / 黄铜 / 奶油玻璃
- 上左光源
- 三分之四镜头
可变化：
- 灯具等级与结构轮廓
技术约束：
```json
{
  "demo_export_px": [
    512,
    512
  ],
  "demo_display_px": [
    64,
    96
  ],
  "engine_format": null,
  "production_approved": false
}
```

### environment
海港栈桥到灯塔的空间关系，主体附近细节更集中。
固定：
- 修复主题
- 共同材料和冷暖关系
可变化：
- 故事镜头
技术约束：
```json
{
  "engine_layers": null
}
```

### character
年轻成年灯匠：短深蓝发、暖肤、芥黄披肩、靛蓝工装、珊瑚色鞋。
固定：
- 当前角色候选身份
可变化：
- 修灯动作
技术约束：
```json
{
  "turnaround": null,
  "rig": null
}
```
