import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-static";

const siteUrl = "https://www.openclaw101.club";

function escapeXml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = getAllPosts();

  const items = posts
    .map(
      (post) => `\n      <item>\n        <title>${escapeXml(post.title)}</title>\n        <link>${siteUrl}/posts/${post.slug}</link>\n        <guid>${siteUrl}/posts/${post.slug}</guid>\n        <pubDate>${new Date(post.date).toUTCString()}</pubDate>\n        <description>${escapeXml(post.summary)}</description>\n      </item>`,
    )
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8" ?>\n<rss version="2.0">\n  <channel>\n    <title>万物碎碎念研究所</title>\n    <link>${siteUrl}</link>\n    <description>一个中文文章分享站，记录 AI、工具、效率和日常思考。</description>\n    <language>zh-cn</language>${items}\n  </channel>\n</rss>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
