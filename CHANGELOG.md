# Changelog

All notable changes to this project will be documented in this file.

## [2026-03-18]

### Added
- 初始化项目：Next.js + TypeScript + Tailwind CSS。
- 新增中文文章分享站基础页面：首页、关于页、文章详情页。
- 新增 Markdown 文章系统（frontmatter + 渲染）。
- 新增分类筛选与关键词搜索功能（标题/摘要/标签）。
- 新增示例文章 3 篇。
- 新增 `PROJECT_PROGRESS.md` 项目进度记录。
- 新增 OpenClaw 主题文章 2 篇：
  - 《如何部署并配置 OpenClaw》
  - 《如何使用 OpenClaw：从入门到实战案例》

### Changed
- 配置 Next.js 静态导出（`output: "export"`，`trailingSlash: true`）。
- 首页品牌与文案调整为中文内容站风格。
- 全局样式优化为中文阅读体验（字体、行距、配色）。

### Infrastructure
- 安装并启用 Nginx。
- Nginx 站点根目录切换为 `/var/Pro-AI/web/out`。
- 增加静态资源缓存策略与基础安全响应头。
- 完成本地构建验证与 HTTP 联通测试。

### Repository
- 完成 Git 初始化与多次提交。
- 远程仓库接入 GitHub（SSH）：`git@github.com:archerchao/xcWeb.git`。
- `main` 分支推送成功。
