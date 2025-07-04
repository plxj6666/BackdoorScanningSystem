# 🛡️ 深瞳-AI模型后门威胁洞见平台

一个用于管理和扫描AI模型后门威胁的现代化Web应用。平台提供用户认证、模型上传、多模式扫描、历史追溯和用户管理等功能。

![系统版本](https://img.shields.io/badge/版本-2.0.0-blue)
![技术栈](https://img.shields.io/badge/技术栈-React%20%2B%20TypeScript%20%2B%20Router-green)
![构建工具](https://img.shields.io/badge/构建工具-Vite-orange)
![界面风格](https://img.shields.io/badge/界面风格-Modern%20Dashboard-purple)

## 📖 目录

- [系统概述](#-系统概述)
- [界面功能](#-界面功能)
- [用户指南](#-用户指南)
- [技术架构](#-技术架构)
- [安装运行](#-安装运行)
- [项目结构](#-项目结构)
- [开发指南](#-开发指南)

## 🎯 系统概述

深瞳（Deep Pupil）是一个专业的AI模型安全检测平台，旨在帮助用户识别和分析机器学习模型中的潜在后门攻击。系统采用现代化的Web技术栈构建，提供了一个功能齐全的仪表盘，用于管理从上传到扫描再到历史分析的整个模型安全生命周期。

### 🌟 主要特性

- **🔐 用户认证** - 安全的登录页面，保护平台访问。
- **📊 多页面仪表盘** - 清晰的功能划分，包括模型上传、扫描、历史记录和用户信息。
- **📤 灵活的模型上传** - 支持通过文件直接上传或通过API端点接入模型。
- **🔍 多模式扫描** - 提供快速、标准和深度三种扫描模式，以满足不同场景的需求。
- **📜 详细的扫描历史** - 记录每一次扫描的详细信息，便于追溯和审计。
- **👤 用户信息管理** - 允许用户管理自己的昵称和密码。
- **📦 本地数据模拟** - 使用JSON文件模拟后端数据库，方便前端开发和演示。

## 🖥️ 界面功能

### 1. 🔑 登录页面
用户通过凭据（默认为 `admin`/`admin123`）登录系统。

### 2. 🏠 主应用布局
登录后，用户进入主应用界面，该界面包含：
- **侧边导航栏 (Sidebar)**: 提供到应用内各个主要页面的链接（上传、扫描、历史、用户）。
- **内容区域 (Main Content)**: 动态显示当前选定页面的内容。

### 3. 📤 上传模型页面
- **上传方式切换**: 用户可以选择上传模型文件或提供API接口。
- **模型命名**: 为每个上传的模型指定一个唯一的名称。
- **提交**: 将模型信息（当前为模拟）保存到系统中。

### 4. 🔍 扫描模型页面
- **模型选择**: 从已上传的模型列表中选择一个进行扫描。
- **扫描类型选择**: 选择“快速”、“标准”或“深度”扫描。
- **开始扫描**: 启动扫描过程，期间会显示加载动画。
- **结果展示**: 扫描完成后，以模态框形式展示详细的扫描结果。

### 5. 📜 扫描历史页面
- **历史列表**: 以表格形式展示所有历史扫描记录。
- **关键信息**: 包括模型名称、扫描类型、日期、状态和结果。
- **状态高亮**: 使用不同颜色高亮“完成”、“进行中”等状态。
- **详情查看**:（未来功能）可以查看每次扫描的完整报告。

### 6. 👤 用户信息页面
- **信息修改**: 用户可以更新自己的昵称。
- **密码管理**: 提供修改密码的功能。

## 📚 用户指南

### 🚀 快速开始

#### 第一步：登录系统
- 打开应用，您将被引导至登录页面。
- 输入用户名 `admin` 和密码 `admin123`。

#### 第二步：上传模型
1. 登录后，您将默认进入 **上传模型** 页面。
2. 为您的模型命名。
3. 选择是通过文件上传还是API接口。
4. 填写所需信息并点击“提交”。

#### 第三步：扫描模型
1. 在侧边栏中，导航到 **扫描模型** 页面。
2. 从下拉列表中选择一个您已上传的模型。
3. 选择一种扫描类型（快速、标准或深度）。
4. 点击“开始扫描”并等待结果。

#### 第四步：查看历史记录
1. 在侧边栏中，导航到 **扫描历史** 页面。
2. 查看所有过去的扫描记录及其摘要。

#### 第五步：管理您的个人资料
1. 在侧边栏中，导航到 **用户信息** 页面。
2. 根据需要更新您的昵称或密码。

## 🏗️ 技术架构

### 前端技术栈

| 技术 | 版本/描述 | 用途 |
|-------------------|----------------|--------------------------|
| **React** | 18.2.0 | 用户界面框架 |
| **TypeScript** | 5.0.2 | 类型安全的JavaScript |
| **Vite** | 4.5.14 | 现代化构建工具 |
| **React Router** | 6.x | 用于实现单页应用的路由 |
| **CSS3** | - | 样式和布局 |

### 📁 项目结构

```
BackdoorScanningSystem/
│
├── 📄 index.html                 # HTML模板
├── 📄 package.json              # 项目配置和依赖
├── 📄 tsconfig.json             # TypeScript配置
├── 📄 vite.config.ts            # Vite构建配置
├── 📄 README.md                 # 项目文档
│
├── 📁 data/                      # 模拟数据目录
│   ├── 📄 users.json             # 模拟用户数据
│   ├── 📄 models.json            # 模拟模型列表
│   └── 📄 scan_history.json     # 模拟扫描历史
│
├── 📁 public/                   # 公共静态资源
│
└── 📁 src/                      # 源代码目录
    ├── 📄 main.tsx              # 应用入口点
    ├── 📄 App.tsx               # 主应用组件 (包含路由逻辑)
    ├── 📄 App.css               # 应用样式
    ├── 📄 index.css             # 全局样式
    │
    ├── 📁 components/           # 可复用React组件
    │   ├── 📄 Login.tsx         # 登录表单组件
    │   ├── 📄 Sidebar.tsx       # 侧边导航栏
    │   ├── 📄 MainLayout.tsx    # 主页面布局 (侧边栏 + 内容)
    │   ├── 📄 ModelUpload.tsx   # 模型上传表单
    │   └── 📄 ScanResultsModal.tsx # 扫描结果模态框
    │
    └── 📁 pages/                # 页面级组件
        ├── 📄 UploadModel.tsx   # 上传模型页面
        ├── 📄 ScanModel.tsx     # 扫描模型页面
        ├── 📄 ScanHistory.tsx   # 扫描历史页面
        └── 📄 Profile.tsx       # 用户信息页面
```

### 📊 数据流向

```
用户登录 -> 凭证验证 -> 设置登录状态 -> React Router 导航
    ↓
导航至页面 -> 页面组件渲染 (e.g., ScanHistory)
    ↓
useEffect Hook -> 拉取模拟数据 (e.g., from /data/scan_history.json)
    ↓
状态更新 (e.g., setScanHistory) -> 组件重渲染 -> UI显示数据
```

## 🚀 安装运行

### 环境要求

- **Node.js**: >= 16.0.0
- **npm**: >= 8.0.0 或 **yarn**: >= 1.22.0
- **浏览器**: Chrome/Firefox/Safari/Edge (支持ES2020)

### 快速启动

```bash
# 1. 克隆项目
git clone https://github.com/your-username/BackdoorScanningSystem.git
cd BackdoorScanningSystem

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 4. 打开浏览器
# 访问 http://localhost:5173 (或Vite指定的端口)
```

## 📄 许可证

本项目采用 MIT 许可证。