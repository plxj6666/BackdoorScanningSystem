# 🛡️ AI模型后门扫描系统

一个现代化的Web前端界面，用于检测和分析AI模型中的潜在后门威胁。本系统提供直观的文件上传、实时扫描进度跟踪和详细的威胁分析报告。

![系统版本](https://img.shields.io/badge/版本-1.0.0-blue)
![技术栈](https://img.shields.io/badge/技术栈-React%20%2B%20TypeScript-green)
![构建工具](https://img.shields.io/badge/构建工具-Vite-orange)
![界面风格](https://img.shields.io/badge/界面风格-Cyberpunk-purple)

## 📖 目录

- [系统概述](#-系统概述)
- [界面功能](#-界面功能)
- [用户指南](#-用户指南)
- [技术架构](#-技术架构)
- [安装运行](#-安装运行)
- [项目结构](#-项目结构)
- [开发指南](#-开发指南)

## 🎯 系统概述

AI模型后门扫描系统是一个专业的安全检测工具，专门用于识别机器学习模型中的潜在后门攻击。系统采用现代化的Web技术栈构建，提供友好的用户界面和强大的分析功能。

### 🌟 主要特性

- **🔐 多文件类型支持** - 支持模型代码、权重文件和验证数据上传
- **⚡ 实时扫描进度** - 动态显示扫描进度和当前处理阶段
- **📊 详细威胁报告** - 提供深入的威胁分析和风险评估
- **🎨 现代化UI** - 采用赛博朋克风格的未来感界面
- **📱 响应式设计** - 完美适配桌面、平板和移动设备
- **🔄 智能状态管理** - 实时状态更新和错误处理

## 🖥️ 界面功能

### 1. 🏠 顶部导航栏
![导航栏](https://via.placeholder.com/800x100/1a1a2e/ffffff?text=AI%E6%A8%A1%E5%9E%8B%E5%90%8E%E9%97%A8%E6%89%AB%E6%8F%8F%E7%B3%BB%E7%BB%9F)

- **品牌标识**: 系统LOGO和名称
- **状态指示器**: 显示系统当前状态
- **粘性布局**: 滚动时保持顶部固定
- **毛玻璃效果**: 现代化的视觉层次

### 2. 📁 文件上传区域
![文件上传](https://via.placeholder.com/800x300/0f172a/ffffff?text=%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E5%8C%BA%E5%9F%9F)

#### 三个独立上传区域：

**📄 模型代码文件**
- 支持格式：`.py`, `.ipynb`, `.json`, `.yaml`
- 用途：AI模型的源代码和配置文件
- 验证：自动检测文件类型和完整性

**⚖️ 模型权重文件**  
- 支持格式：`.h5`, `.pt`, `.pth`, `.ckpt`, `.pb`
- 用途：训练好的模型权重和参数
- 检测：权重异常和隐藏模式分析

**📊 验证数据集**
- 支持格式：`.csv`, `.json`, `.npy`, `.pkl`
- 用途：用于验证和测试的数据集
- 分析：数据投毒和对抗样本检测

#### 上传功能特性：
- **🖱️ 拖拽上传** - 直接拖拽文件到上传区域
- **📂 点击选择** - 点击区域打开文件选择器
- **📋 文件信息** - 显示文件名、大小、类型和上传时间
- **✅ 实时验证** - 即时文件格式和大小验证
- **🗑️ 一键删除** - 快速移除已上传文件

### 3. ⚙️ 扫描配置面板
![扫描配置](https://via.placeholder.com/800x200/1e293b/ffffff?text=%E6%89%AB%E6%8F%8F%E9%85%8D%E7%BD%AE%E9%9D%A2%E6%9D%BF)

- **🎚️ 灵敏度设置** - 调整检测算法的敏感程度
- **🔍 扫描深度** - 选择浅层或深度分析模式
- **⏱️ 超时设置** - 配置最大扫描时间限制
- **📈 阈值配置** - 设置威胁检测的置信度阈值

### 4. 🎛️ 扫描控制中心
![控制中心](https://via.placeholder.com/800x150/312e81/ffffff?text=%E6%89%AB%E6%8F%8F%E6%8E%A7%E5%88%B6%E4%B8%AD%E5%BF%83)

#### 主要按钮：

**🔍 开始扫描按钮**
- **状态感知** - 只有上传所有必需文件后才能点击
- **动画效果** - 渐变背景和悬停动画
- **加载状态** - 扫描期间显示进度指示器
- **快捷键支持** - 支持键盘快捷键操作

**🔄 重置按钮**  
- **一键清空** - 清除所有上传文件和扫描结果
- **确认机制** - 防止误操作的安全确认
- **状态恢复** - 将系统恢复到初始状态

### 5. 📊 扫描进度显示
![进度显示](https://via.placeholder.com/800x200/059669/ffffff?text=%E6%89%AB%E6%8F%8F%E8%BF%9B%E5%BA%A6%E6%98%BE%E7%A4%BA)

- **🎯 实时进度条** - 动态显示扫描完成百分比
- **📝 阶段提示** - 显示当前扫描的具体阶段
- **⏱️ 时间估算** - 预估剩余完成时间
- **🔄 状态更新** - 每个阶段的详细状态信息

### 6. 📋 威胁分析报告
![分析报告](https://via.placeholder.com/800x400/dc2626/ffffff?text=%E5%A8%81%E8%83%81%E5%88%86%E6%9E%90%E6%8A%A5%E5%91%8A)

#### 报告组成部分：

**🎯 总体评估**
- **威胁等级** - 高/中/低风险分级显示
- **置信度分数** - 0-100分的可信度评分
- **检测摘要** - 简洁的威胁概述

**🔍 详细威胁列表**
- **威胁类型** - 数据投毒、权重异常、梯度攻击等
- **严重程度** - 颜色编码的风险级别
- **位置信息** - 精确的威胁发现位置
- **描述说明** - 详细的威胁机制解释

**📊 统计信息**
- **扫描耗时** - 总计扫描时间
- **文件分析** - 各文件的分析结果
- **风险因子** - 影响评估的关键因素

## 📚 用户指南

### 🚀 快速开始

#### 第一步：准备文件
1. **准备模型代码文件** (必需)
   - Python脚本 (`.py`)
   - Jupyter笔记本 (`.ipynb`) 
   - 配置文件 (`.json`, `.yaml`)

2. **准备模型权重文件** (必需)
   - TensorFlow模型 (`.h5`, `.pb`)
   - PyTorch模型 (`.pt`, `.pth`)
   - 检查点文件 (`.ckpt`)

3. **准备验证数据** (必需)
   - CSV数据 (`.csv`)
   - NumPy数组 (`.npy`)
   - JSON数据 (`.json`)

#### 第二步：上传文件
1. **拖拽上传** - 直接将文件拖到对应的上传区域
2. **点击上传** - 点击上传区域选择本地文件
3. **验证检查** - 系统自动验证文件格式和大小

#### 第三步：配置扫描
1. **设置扫描参数** - 根据需要调整检测灵敏度
2. **选择扫描模式** - 选择快速扫描或深度分析
3. **配置阈值** - 设置威胁检测的置信度要求

#### 第四步：开始扫描
1. **点击扫描按钮** - 确保所有必需文件已上传
2. **监控进度** - 观察实时进度和阶段提示
3. **等待完成** - 扫描过程通常需要30秒-2分钟

#### 第五步：查看结果
1. **查看总体评估** - 了解模型的整体安全状况
2. **分析威胁详情** - 深入了解发现的具体威胁
3. **下载报告** - 保存详细的分析报告

### 📱 界面操作技巧

#### 文件管理
- **批量上传**: 可同时选择多个文件进行上传
- **格式检查**: 系统会自动提示不支持的文件格式
- **大小限制**: 单个文件最大支持500MB
- **替换文件**: 重新上传会自动替换之前的文件

#### 扫描控制
- **状态监控**: 通过控制台查看详细的调试信息
- **中断扫描**: 扫描过程中可以点击重置按钮中断
- **重新扫描**: 可以修改配置后重新进行扫描

#### 结果分析
- **威胁过滤**: 可以按严重程度过滤威胁项目
- **详情展开**: 点击威胁项目查看更多详细信息
- **数据导出**: 支持导出JSON格式的分析报告

### ⚠️ 注意事项

1. **文件安全**: 上传的文件仅在浏览器本地处理，不会上传到服务器
2. **浏览器兼容**: 建议使用Chrome、Firefox、Safari等现代浏览器
3. **性能要求**: 大文件扫描可能需要较高的系统资源
4. **网络要求**: 仅需要加载初始页面，后续操作无需网络连接

### 🔧 故障排除

#### 常见问题

**Q: 上传文件失败？**
A: 检查文件格式是否支持，文件大小是否超出限制

**Q: 扫描按钮无法点击？**
A: 确保已上传所有三种必需文件（模型代码、权重、验证数据）

**Q: 扫描过程卡住？**
A: 尝试刷新页面或使用重置按钮清空状态

**Q: 结果显示异常？**
A: 检查浏览器控制台是否有错误信息，尝试重新扫描

## 🏗️ 技术架构

### 前端技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| **React** | 18.2.0 | 用户界面框架 |
| **TypeScript** | 5.0.2 | 类型安全的JavaScript |
| **Vite** | 4.5.14 | 现代化构建工具 |
| **CSS3** | - | 样式和动画 |

### 🎯 架构设计

```
┌─────────────────────────────────────────┐
│                Browser                   │
├─────────────────────────────────────────┤
│              React App                   │
│  ┌─────────────────────────────────────┐ │
│  │        Component Layer             │ │
│  │  ┌─────────┬─────────┬─────────┐   │ │
│  │  │ Header  │FileUpload│Results │   │ │
│  │  └─────────┴─────────┴─────────┘   │ │
│  └─────────────────────────────────────┘ │
│  ┌─────────────────────────────────────┐ │
│  │         State Layer                 │ │
│  │  ┌─────────┬─────────┬─────────┐   │ │
│  │  │ScanReq  │ScanRes  │Loading  │   │ │
│  │  └─────────┴─────────┴─────────┘   │ │
│  └─────────────────────────────────────┘ │
│  ┌─────────────────────────────────────┐ │
│  │        Business Layer              │ │
│  │  ┌─────────┬─────────┬─────────┐   │ │
│  │  │FileProc │Scanner  │Analyzer │   │ │
│  │  └─────────┴─────────┴─────────┘   │ │
│  └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

### 🔧 核心特性

- **🎨 组件化架构** - 高度模块化和可复用的组件设计
- **📊 状态管理** - 使用React Hooks进行集中式状态管理
- **🔒 类型安全** - TypeScript提供编译时类型检查
- **⚡ 性能优化** - 使用useMemo和useCallback优化渲染性能
- **🎭 现代CSS** - CSS Grid、Flexbox和现代动画效果
- **📱 响应式设计** - 移动端优先的自适应布局

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
# 或使用 yarn
yarn install

# 3. 启动开发服务器
npm run dev
# 或使用 yarn
yarn dev

# 4. 打开浏览器
# 访问 http://localhost:3000
```

### 🛠️ 开发命令

```bash
# 开发模式 (热重载)
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview

# 类型检查
npm run type-check

# 代码格式化
npm run format

# 清理缓存
rm -rf node_modules/.vite
```

### 🔧 配置说明

#### Vite配置 (`vite.config.ts`)
```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,      // 开发服务器端口
    open: true       // 自动打开浏览器
  },
  build: {
    outDir: 'dist',  // 构建输出目录
    sourcemap: true  // 生成源码映射
  }
})
```

#### TypeScript配置 (`tsconfig.json`)
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

## 📁 项目结构

```
BackdoorScanningSystem/
│
├── 📄 index.html                 # HTML模板
├── 📄 package.json              # 项目配置和依赖
├── 📄 tsconfig.json             # TypeScript配置
├── 📄 vite.config.ts            # Vite构建配置
├── 📄 README.md                 # 项目文档
├── 📄 BUTTON_IMPROVEMENTS.md    # 按钮改进文档
│
├── 📁 src/                      # 源代码目录
│   ├── 📄 main.tsx              # 应用入口点
│   ├── 📄 App.tsx               # 主应用组件
│   ├── 📄 App.css               # 应用样式
│   ├── 📄 index.css             # 全局样式
│   │
│   ├── 📁 components/           # React组件
│   │   ├── 📄 BackdoorScanner.tsx          # 🏠 主扫描组件
│   │   ├── 📄 BackdoorScanner.css          # 主组件样式
│   │   ├── 📄 BackdoorScannerSimple.tsx    # 简化版组件
│   │   ├── 📄 Header.tsx                   # 🎯 头部导航
│   │   ├── 📄 Header.css                   # 头部样式
│   │   ├── 📄 FileUploadSection.tsx        # 📁 文件上传区域
│   │   ├── 📄 FileUploadSection.css        # 上传区域样式
│   │   ├── 📄 FileUpload.tsx               # 📄 单文件上传组件
│   │   ├── 📄 FileUpload.css               # 文件上传样式
│   │   ├── 📄 ScanConfiguration.tsx        # ⚙️ 扫描配置面板
│   │   ├── 📄 ScanConfiguration.css        # 配置面板样式
│   │   ├── 📄 ScanResults.tsx              # 📊 结果展示组件
│   │   ├── 📄 ScanResults.css              # 结果样式
│   │   ├── 📄 LoadingOverlay.tsx           # ⏳ 加载遮罩层
│   │   ├── 📄 LoadingOverlay.css           # 加载样式
│   │   └── 📄 TestComponent.tsx            # 🧪 测试组件
│   │
│   ├── 📁 types/                # TypeScript类型定义
│   │   └── 📄 index.ts          # 核心类型接口
│   │
│   ├── 📁 hooks/                # 自定义React Hooks
│   ├── 📁 utils/                # 工具函数
│   └── 📁 styles/               # 共享样式文件
│
└── 📁 dist/                     # 构建输出目录 (自动生成)
```

### 🧩 组件职责

| 组件 | 职责 | 依赖关系 |
|------|------|----------|
| **BackdoorScanner** | 主控制器，状态管理 | 所有子组件 |
| **Header** | 导航栏，品牌展示 | 独立组件 |
| **FileUploadSection** | 文件上传管理 | FileUpload |
| **FileUpload** | 单文件上传逻辑 | 独立组件 |
| **ScanConfiguration** | 扫描参数设置 | 独立组件 |
| **ScanResults** | 结果展示和分析 | 独立组件 |
| **LoadingOverlay** | 加载状态显示 | 独立组件 |

### 📊 数据流向

```
用户交互 → 事件处理 → 状态更新 → 组件重渲染 → UI更新
    ↓
文件选择 → handleFileUpload → setScanRequest → 文件信息显示
    ↓
开始扫描 → handleStartScan → setScanResult → 进度/结果显示
    ↓
重置操作 → handleReset → 清空状态 → 恢复初始界面
```

## 👨‍💻 开发指南

### 🎨 样式系统

#### CSS变量 (CSS Custom Properties)
```css
:root {
  /* 主色调 */
  --primary-blue: #00d4ff;
  --primary-purple: #8b5cf6;
  --accent-red: #ff6b6b;
  
  /* 背景色 */
  --bg-dark: #0f172a;
  --bg-darker: #020617;
  --bg-light: rgba(255, 255, 255, 0.05);
  
  /* 文字色 */
  --text-primary: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.8);
  --text-muted: rgba(255, 255, 255, 0.6);
  
  /* 边框和分割线 */
  --border-color: rgba(255, 255, 255, 0.1);
  --border-focus: rgba(0, 212, 255, 0.5);
}
```

#### 组件样式规范
- **BEM命名规范** - `.component__element--modifier`
- **模块化CSS** - 每个组件独立的CSS文件
- **响应式优先** - 移动端优先的媒体查询
- **现代CSS特性** - Grid、Flexbox、CSS变量、backdrop-filter

### 🔧 开发工具

#### VSCode推荐扩展
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode", 
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

#### 代码格式化配置 (`.prettierrc`)
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

### 🧪 测试策略

#### 组件测试
```typescript
// 示例：FileUpload组件测试
import { render, screen, fireEvent } from '@testing-library/react';
import FileUpload from './FileUpload';

test('should handle file upload', () => {
  const mockOnUpload = jest.fn();
  render(<FileUpload onFileUpload={mockOnUpload} />);
  
  const input = screen.getByLabelText(/上传文件/i);
  const file = new File(['test'], 'test.py', { type: 'text/plain' });
  
  fireEvent.change(input, { target: { files: [file] } });
  expect(mockOnUpload).toHaveBeenCalledWith(file);
});
```

### 🚀 部署指南

#### GitHub Pages部署
```bash
# 1. 构建项目
npm run build

# 2. 部署到GitHub Pages
npm install -g gh-pages
gh-pages -d dist
```

#### Netlify部署
```bash
# 1. 构建命令
npm run build

# 2. 发布目录
dist
```

#### Docker部署
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

### 📈 性能优化

#### 代码分割
```typescript
// 懒加载组件
const ScanResults = lazy(() => import('./ScanResults'));

// 使用Suspense包装
<Suspense fallback={<LoadingSpinner />}>
  <ScanResults result={scanResult} />
</Suspense>
```

#### 内存优化
```typescript
// 使用useCallback缓存函数
const handleFileUpload = useCallback((file: File) => {
  // 处理逻辑
}, [dependencies]);

// 使用useMemo缓存计算结果
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);
```

## 🤝 贡献指南

### 开发流程
1. **Fork项目** - 创建项目副本
2. **创建分支** - `git checkout -b feature/new-feature`
3. **提交更改** - 遵循commit规范
4. **推送分支** - `git push origin feature/new-feature`
5. **创建PR** - 提交Pull Request

### Commit规范
```
feat: 新功能
fix: 错误修复
docs: 文档更新
style: 样式调整
refactor: 代码重构
test: 测试相关
chore: 构建工具相关
```

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系方式

- **项目地址**: https://github.com/your-username/BackdoorScanningSystem
- **问题反馈**: https://github.com/your-username/BackdoorScanningSystem/issues
- **技术支持**: your-email@example.com

---

**⭐ 如果这个项目对你有帮助，请考虑给它一个Star！**