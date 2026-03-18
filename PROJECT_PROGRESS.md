# 项目进度记录（xcWeb）

更新时间：2026-03-18 12:20（GMT+8）

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
- ✅ 部署：
  - 静态构建成功（`npm run build`）
  - Nginx 已安装并生效
  - 站点根目录：`/var/Pro-AI/web/out`
- ✅ 代码托管：
  - 远程仓库：`git@github.com:archerchao/xcWeb.git`
  - 首次推送：`main` 分支成功

## 三、运行信息

- 网站访问：`http://<服务器IP>`（80 端口）
- 当前服务器示例：`http://172.16.0.3`
- SSH 端口：22

## 四、目录说明

- `content/posts/`：文章 Markdown 文件
- `src/lib/posts.ts`：文章读取与解析
- `src/components/post-search.tsx`：搜索和分类组件
- `src/app/`：路由页面
- `out/`：静态构建产物（Nginx 实际托管目录）

## 五、下阶段建议

1. 配置域名与 HTTPS（证书自动续期）
2. 增加 SEO（Open Graph / sitemap）
3. 建立自动化发布（GitHub Actions）
4. 增加评论/订阅（按需）
