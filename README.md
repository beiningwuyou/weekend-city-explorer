# 周末城市探索指南 · 项目工程总目录

> 版本：V2.1.0 | 更新时间：2026-09-30  
> 🔗 **在线访问地址（GitHub Pages）**：[https://beiningwuyou.github.io/weekend-city-explorer/](https://beiningwuyou.github.io/weekend-city-explorer/)

---

## 目录结构

```
trip/
├── web/                        # 桌面 Web 端（Next.js 14 + React 18 + TypeScript）
│   ├── src/
│   │   ├── app/               # App Router 页面路由
│   │   ├── components/        # 公共组件 + 业务组件
│   │   ├── stores/            # Zustand 全局状态
│   │   ├── types/             # TypeScript 领域类型
│   │   └── lib/               # Mock 数据 + 工具函数
│   ├── package.json
│   └── ...
│
├── miniapp/                    # 微信小程序端（Taro + React + TypeScript）
│   ├── src/
│   │   ├── pages/             # 小程序页面（对应 web 端各路由）
│   │   ├── components/        # 小程序专属组件
│   │   ├── stores/            # 共享状态管理
│   │   └── app.config.ts      # 小程序全局配置
│   ├── package.json
│   └── ...
│
├── docs/                       # 产品文档
├── stitch_product_prototype_implementation/  # 原型设计稿 HTML
├── web端原型设计稿.md
├── 周末城市探索指南_PRD_V2.0.0.md
└── README.md                   # 本文件
```

---

## 各端说明

### 🌐 Web 端 (`web/`)

**技术栈：** Next.js 14 · React 18 · TypeScript · Tailwind CSS · Zustand · Framer Motion

**启动方式：**
```bash
cd web
npm install   # 首次需要
npm run dev   # 开发服务器 → http://localhost:3000
npm run build # 生产构建
```

**页面路由：**
| 路由 | 页面 |
|---|---|
| `/explore` | W01 探索规划大厅 · Agent 决策驾驶舱 |
| `/itinerary/[id]` | W02 行程全景工作台 · 履约枢纽 |
| `/squads` | W06 搭子探索广场 |
| `/squads/[id]` | W03 组队搭子管理中心 |
| `/squads/create` | 发起组队向导 |
| `/trips` | W07 出游管家 · 实时随行 |
| `/checkin` | W04 足迹手账与点评回流 |
| `/profile` | W05 个人中心 · 数字孪生 |

---

### 📱 小程序端 (`miniapp/`)

**技术栈：** Taro 4 · React · TypeScript · NutUI · Zustand

**启动方式：**
```bash
cd miniapp
npm install          # 首次需要
npm run dev:weapp    # 编译微信小程序（需配合微信开发者工具）
npm run build:weapp  # 生产构建
```

**微信开发者工具导入：** 选择 `miniapp/dist/weapp` 目录

**页面对照：**
| 小程序页面 | 对应 Web 端 |
|---|---|
| `pages/explore/index` | W01 探索大厅 |
| `pages/itinerary/index` | W02 行程工作台 |
| `pages/squads/index` | W06 搭子广场 |
| `pages/squads/detail` | W03 队伍管理 |
| `pages/checkin/index` | W04 足迹手账 |
| `pages/profile/index` | W05 个人中心 |

---

## 共享资产

两端共享以下设计规范和业务逻辑：
- **设计 Token**：见 `stitch_product_prototype_implementation/campus_weekend_explorer_studio/DESIGN.md`
- **PRD 文档**：见 `周末城市探索指南_PRD_V2.0.0_美团生态与俞军决策版.md`
- **接口数据结构**：`types/` 目录下的 TypeScript 类型可在两端复用
