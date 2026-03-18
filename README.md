# 万物碎碎念研究所（xcWeb）

一个使用 Next.js 构建、Nginx 托管的中文文章分享站。

## 技术栈

- Next.js 16（App Router）
- Tailwind CSS 4
- Markdown（文章内容）
- Nginx（静态站点托管）

## 项目结构

- `content/posts/*.md`：文章文件
- `src/app`：页面路由
- `src/lib/posts.ts`：文章读取与解析
- `src/components/post-search.tsx`：搜索和分类筛选

## 本地开发

```bash
npm install
npm run dev
```

## 构建静态站点

```bash
npm run build
```

构建后产物在 `out/` 目录。

## 新增文章

在 `content/posts/` 新建 `xxx.md`，示例：

```md
---
title: "文章标题"
date: "2026-03-18 11:30"
category: "分类名"
summary: "一句话摘要"
tags:
  - 标签1
  - 标签2
---

这里是正文。
```

然后执行：

```bash
npm run build
sudo systemctl reload nginx
```

## Nginx 部署

已配置默认站点根目录：`/var/Pro-AI/web/out`

关键配置：

- `try_files $uri $uri/ /index.html;`
- 静态资源缓存 7 天

配置文件位置：`/etc/nginx/sites-available/default`

## 访问

- 本机：`http://127.0.0.1`
- 局域网/公网：`http://<服务器IP>`

> 当前是 HTTP（80 端口），后续可扩展 HTTPS。
