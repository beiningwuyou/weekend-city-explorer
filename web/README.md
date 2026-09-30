# 「周末去哪玩」—— 高校周末城市探索指南与场景履约中枢 (Campus Weekend Explorer Studio)

基于 **美团本地生活生态** 与 **大众点评权威数据**，结合 **俞军产品交易模型** 与 **Marty Cagan 赋能产品模型** 打造的桌面全景出游工作台。

---

## 🌟 核心产品杀手锏

1. **120 秒极速决策驾驶舱 (W01)**：
   * 48 小时校园圈天气感知与降雨预警；
   * Agent 自然语言意图微调与情境标签；
   * **同行人数阶梯杠杆**：1人、2人、4人寝室成团人均预算秒级联动跳变（立省 60%）。
2. **全链路履约枢纽 (W02)**：
   * **动线排号哨兵**：AI 测距并自动提前远程代取大桌号，享受高校认证过号顺延 3 桌特权，承诺到店 5 分钟内入座；
   * **学信网学生票秒出**：免换票动态防伪二维码闸机直刷；
   * **美团出行双模对比**：美团单车接驳 vs 4 人特惠快车整车 AA。
3. **自主规划出游动线工作台 (POI)**：
   * 途经打卡点自由拖拽/调序，实时推演接驳耗时与人均预算；
   * 周边高赞美团特惠 POI 一键加点。
4. **校友搭子探索广场与创建向导 (W06 & 原型_2)**：
   * 海淀学院路等高校圈子分群招募；
   * 签署《高校同游自律公约》一键免押占座；
   * 队伍规模、AA 测算与防鸽门槛四步向导。
5. **组队裂变大屏与群码托管 (W03)**：
   * 4 人先锋队动态席位面板；
   * 队长微信群二维码**高斯模糊防爬保护**，满员动态打水印解锁；
   * 微信朋友圈 9:16 长图与社群文案一键复制。
6. **足迹手账与点评回流闭环 (W04)**：
   * 9:16 Canvas 动态防伪手账海报工坊（拍立得/盖章/极简 3 套模版切换与下载）；
   * 一键同步大众点评 140 字 NLP 避坑短评，全屏礼花动画发放 ¥10 美团外卖神券；
   * 最终 AA 消费清算账单与群收款回执。
7. **个人中心与数字孪生配置 (W05)**：
   * 学信网认证在读本硕身份档案；
   * 负向约束与避坑黑名单（自动剔除 >30 分钟无远程代排商户、恶劣天气屏蔽露天活动）。

---

## 🛠️ 技术栈与架构

* **框架**：Next.js 14 (App Router) + React 18 + TypeScript
* **样式与设计系统**：Tailwind CSS (完整注入 `campus_weekend_explorer_studio/DESIGN.md` Tokens)
* **状态中心**：Zustand (`useUserStore`, `usePricingStore`, `useSentinelStore`, `useSquadStore`, `useToastStore`)
* **动效与特效**：Framer Motion + Canvas Confetti
* **图标体系**：Google Material Symbols Outlined + Lucide React

---

## 🚀 本地开发与启动

```bash
# 启动开发服务器 (默认端口 3000)
npm run dev

# 编译生产构建
npm run build

# 启动生产服务
npm run start
```

访问地址：[http://localhost:3000](http://localhost:3000) (自动重定向至 `/explore`)

---

## 🗺️ 页面与业务路由索引

* `http://localhost:3000/explore`：W01 探索规划大厅 · Agent 决策驾驶舱
* `http://localhost:3000/itinerary/BJ-798-HOT04`：W02 行程全景工作台 · 美团全链路履约枢纽
* `http://localhost:3000/itinerary/custom`：自主规划出游动线与 POI 工作台
* `http://localhost:3000/squads`：W06 搭子探索广场 · 校友正在拼团大厅
* `http://localhost:3000/squads/create`：发起组队 / 招募设置工作台 (向导)
* `http://localhost:3000/squads/squad-089`：W03 组队搭子管理中心 · 拼团裂变大屏
* `http://localhost:3000/trips`：我的搭子 · 全景看板 (W07 入口)
* `http://localhost:3000/checkin`：W04 足迹手账与点评回流看板
* `http://localhost:3000/profile`：W05 个人中心 · 数字孪生与偏好中枢
