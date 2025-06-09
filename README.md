# 极简待办事项应用 (Minimalist Todo App)

一个使用 Vue.js 和 Supabase 构建的简单、高效的任务管理应用。

## ✨ 功能特性

### 🔐 用户认证
- 用户注册和登录
- 安全的用户会话管理
- **忘记密码功能** - 通过邮箱重置密码
- 用户登出

### 📝 任务管理
- 创建、查看、编辑和删除待办事项
- 标记任务为完成/未完成状态
- 用户专属的任务列表

### 🎨 用户界面
- 简洁直观的用户界面
- 响应式设计，支持移动端
- 中文界面，用户友好
- 现代化的 UI 组件

### 🚀 技术架构
- 无服务器架构
- 实时数据同步
- 安全的数据访问控制

## 🛠️ 技术栈

- **前端框架**: Vue.js 3 (Composition API)
- **UI 组件库**: Element Plus
- **路由管理**: Vue Router 4
- **后端服务**: Supabase
  - 用户认证
  - PostgreSQL 数据库
  - 实时 API
  - 邮件服务
- **构建工具**: Vite
- **部署平台**: Vercel

## 📦 项目设置

### 环境要求

- Node.js (v18+ 推荐)
- npm 或 yarn
- Supabase 账户

### 安装步骤

1. **克隆仓库**:
   ```bash
   git clone https://github.com/txgo/todo.git
   cd todo
   ```

2. **安装依赖**:
   ```bash
   npm install
   ```

3. **配置环境变量**:
   
   复制环境变量示例文件：
   ```bash
   cp .env.example .env
   ```
   
   编辑 `.env` 文件，填入您的 Supabase 配置：
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

4. **启动开发服务器**:
   ```bash
   npm run dev
   ```

   应用将在 `http://localhost:5173` 运行

## ⚙️ Supabase 配置

### 1. 创建项目
1. 访问 [supabase.com](https://supabase.com)
2. 创建新项目
3. 获取项目 URL 和 anon key

### 2. 数据库设置

创建 `todos` 表：

```sql
-- 创建 todos 表
CREATE TABLE todos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  is_complete BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 启用行级安全策略
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- 创建安全策略
CREATE POLICY "用户只能查看自己的待办事项" ON todos
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "用户只能创建自己的待办事项" ON todos
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "用户只能更新自己的待办事项" ON todos
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "用户只能删除自己的待办事项" ON todos
  FOR DELETE USING (auth.uid() = user_id);
```

### 3. 认证配置

在 Supabase 控制台中配置：

1. **Authentication → URL Configuration**
2. 添加重定向 URL：
   - 开发环境：`http://localhost:5173/auth/callback`
   - 生产环境：`https://your-domain.com/auth/callback`

### 4. 邮件模板配置

为忘记密码功能配置邮件模板：

1. **Authentication → Email Templates**
2. 自定义 "Reset Password" 模板
3. 确保重定向链接指向正确的回调 URL

## 🚀 部署

### Vercel 部署

1. **推送代码到 GitHub**:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **连接 Vercel**:
   - 访问 [vercel.com](https://vercel.com)
   - 导入 GitHub 仓库
   - 配置环境变量

3. **环境变量配置**:
   在 Vercel 项目设置中添加：
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **更新 Supabase 重定向 URL**:
   添加生产环境回调 URL：`https://your-app.vercel.app/auth/callback`

### 构建生产版本

```bash
npm run build
```

生成的 `dist` 文件夹可以部署到任何静态托管服务。

## 📱 使用说明

### 基本流程

1. **注册/登录**: 创建账户或使用现有账户登录
2. **创建任务**: 在仪表板中添加新的待办事项
3. **管理任务**: 编辑、完成或删除任务
4. **忘记密码**: 如果忘记密码，可以通过邮箱重置

### 忘记密码功能

1. 在登录页面点击"忘记密码？"
2. 输入注册时使用的邮箱地址
3. 检查邮箱中的重置链接
4. 点击链接设置新密码
5. 使用新密码登录

## 🔧 开发

### 项目结构

```
src/
├── components/          # 可复用组件
│   ├── auth/           # 认证相关组件
│   └── todos/          # 待办事项组件
├── views/              # 页面组件
│   ├── Home.vue        # 首页
│   ├── Login.vue       # 登录页
│   ├── Signup.vue      # 注册页
│   ├── Dashboard.vue   # 仪表板
│   ├── ForgotPassword.vue  # 忘记密码
│   ├── ResetPassword.vue   # 重置密码
│   └── AuthCallback.vue    # 认证回调
├── router/             # 路由配置
├── services/           # API 服务
└── assets/             # 静态资源
```

### 可用脚本

```bash
npm run dev      # 启动开发服务器
npm run build    # 构建生产版本
npm run preview  # 预览生产构建
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 🔗 相关链接

- [在线演示](https://todo-nu-kohl.vercel.app)
- [Vue.js 文档](https://vuejs.org)
- [Supabase 文档](https://supabase.com/docs)
- [Element Plus 文档](https://element-plus.org)
