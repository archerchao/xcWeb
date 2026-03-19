import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked, Renderer } from "marked";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface TocHeading {
  id: string;
  text: string;
  depth: number;
}

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
  cover: string;
  summary: string;
  tags: string[];
}

export interface Post extends PostMeta {
  content: string;
  html: string;
  toc: TocHeading[];
}

function normalizeAssetPath(src: string): string {
  if (!src) return src;
  if (/^(https?:)?\/\//.test(src)) return src;
  return src.startsWith("/") ? src : `/${src.replace(/^\.\//, "")}`;
}

function createMarkedRenderer() {
  const renderer = new Renderer();

  renderer.image = ({ href, text }) => {
    const src = normalizeAssetPath(String(href ?? ""));
    const alt = String(text ?? "");
    return `<img src="${src}" alt="${alt}" loading="lazy" decoding="async" />`;
  };

  return renderer;
}

function slugifyHeading(text: string, index: number): string {
  const base = text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\u4e00-\u9fa5-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return base ? `h-${base}` : `h-section-${index}`;
}

function buildHtmlAndToc(rawHtml: string): { html: string; toc: TocHeading[] } {
  const toc: TocHeading[] = [];
  let headingIndex = 0;

  const html = rawHtml.replace(/<h([2-3])>([\s\S]*?)<\/h\1>/g, (_m, depthRaw: string, inner: string) => {
    headingIndex += 1;
    const depth = Number(depthRaw);
    const text = inner.replace(/<[^>]+>/g, "").trim();
    const id = slugifyHeading(text, headingIndex);

    toc.push({ id, text, depth });
    return `<h${depth} id="${id}">${inner}</h${depth}>`;
  });

  return { html, toc };
}

function parseMeta(fileName: string): Post {
  const slug = fileName.replace(/\.md$/, "");
  const fullPath = path.join(postsDirectory, fileName);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  const renderedHtml = marked.parse(content, { renderer: createMarkedRenderer() }) as string;
  const { html, toc } = buildHtmlAndToc(renderedHtml);

  return {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? "1970-01-01 00:00"),
    category: String(data.category ?? "未分类"),
    cover: normalizeAssetPath(String(data.cover ?? "/images/covers/ai-gradient.svg")),
    summary: String(data.summary ?? "暂无摘要"),
    tags: Array.isArray(data.tags) ? data.tags.map((tag: unknown) => String(tag)) : [],
    content,
    html,
    toc,
  };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) return [];

  const files = fs.readdirSync(postsDirectory).filter((name) => name.endsWith(".md"));

  return files
    .map((fileName) => parseMeta(fileName))
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map(({ html: _html, content: _content, toc: _toc, ...meta }) => meta);
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];

  return fs
    .readdirSync(postsDirectory)
    .filter((name) => name.endsWith(".md"))
    .map((name) => name.replace(/\.md$/, ""));
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  return parseMeta(`${slug}.md`);
}

export function getRelatedPosts(post: PostMeta, limit = 3): PostMeta[] {
  const all = getAllPosts().filter((item) => item.slug !== post.slug);

  return all
    .map((item) => {
      const sharedTags = item.tags.filter((tag) => post.tags.includes(tag)).length;
      const sameCategory = item.category === post.category ? 1 : 0;
      return { item, score: sharedTags * 2 + sameCategory };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ item }) => item);
}
