# 项目进度记录（xcWeb）

更新时间：2026-03-18 12:38（GMT+8）

## 一、目标
搭建一个基于 Nginx 的中文文章分享网站，支持分类和搜索，并托管到 GitHub。

## 二、已完成事项

- ✅ 项目初始化：Next.js + TypeScript + Tailwind
- ✅ 内容系统：Markdown 文章读取（frontmatter）
- ✅ 页面：
  - 首页（文章列表）
  - 文章详情页（`/posts/[slug]`）
  - 关于页（`/about`）
- ✅ 功能：
  - 分类筛选
  - 关键词搜索（标题/摘要/标签）
  - 首页文章封面缩略图
  - 全站“回到顶部”按钮
- ✅ 内容建设：
  - 示例文章 3 篇
  - OpenClaw 图文文章 2 篇
  - 新增示意图资源（部署架构、流程、使用模式、案例地图）
- ✅ 部署：
  - 静态构建成功（`npm run build`）
  - Nginx 已安装并生效
  - 站点根目录：`/var/Pro-AI/web/out`
- ✅ 代码托管：
  - 远程仓库：`git@github.com:archerchao/xcWeb.git`
  - 已完成 SSH 推送配置

## 三、最新优化（待审查后再 push）

> 按用户要求：后续改动先本地 commit，不立即 push。

- ✅ 文章排版优化：标题层级、段落间距、列表、引用、代码块、图片样式
- ✅ 页面宽度优化：由偏窄阅读宽度调整为更适合图文站的布局宽度
- ✅ 首页视觉优化：文章卡片新增封面图

本地未推送提交：
- `3e6cb72` feat: add homepage cover thumbnails and enrich post visuals
- `c04b653` feat: improve reading typography, add back-to-top, and widen layouts

## 四、运行信息

- 网站访问：`http://<服务器IP>`（80 端口）
- 当前服务器示例：`http://172.16.0.3`
- SSH 端口：22

## 五、目录说明

- `content/posts/`：文章 Markdown 文件
- `public/images/openclaw/`：OpenClaw 文章配图
- `public/images/covers/`：首页文章封面图
- `src/lib/posts.ts`：文章读取与解析
- `src/components/post-search.tsx`：搜索和分类组件
- `src/components/back-to-top.tsx`：回到顶部按钮
- `src/app/`：路由页面
- `out/`：静态构建产物（Nginx 实际托管目录）

## 六、下阶段建议

1. 配置域名与 HTTPS（证书自动续期）
2. 增加 SEO（Open Graph / sitemap）
3. 建立自动化发布（GitHub Actions）
4. 增加评论/订阅（按需）
