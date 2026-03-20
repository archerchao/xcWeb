import Link from "next/link";
import PostSearch from "@/components/post-search";
import FloatingFunSidebar from "@/components/floating-fun-sidebar";
import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/config/site";

function getDailyQuote() {
  const quotes = siteConfig.dailyQuotes;
  const now = new Date();
  const daySeed = Number(`${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}`);
  const index = daySeed % quotes.length;
  return quotes[index];
}

export default function Home() {
  const posts = getAllPosts();
  const dailyQuote = getDailyQuote();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <header className="mb-8 overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-950 via-zinc-900 to-indigo-950 p-8 text-zinc-50 shadow-xl">
        <p className="mb-3 text-sm uppercase tracking-widest text-zinc-300">{siteConfig.badge}</p>
        <h1 className="text-3xl font-bold leading-tight md:text-5xl">{siteConfig.title}</h1>
        <p className="mt-4 max-w-3xl text-zinc-300">{siteConfig.description}</p>
        <div className="mt-5 flex flex-wrap gap-2 text-xs text-zinc-200">
          <span className="rounded-full border border-zinc-600 bg-zinc-900/60 px-3 py-1">AI</span>
          <span className="rounded-full border border-zinc-600 bg-zinc-900/60 px-3 py-1">效率</span>
          <span className="rounded-full border border-zinc-600 bg-zinc-900/60 px-3 py-1">运维</span>
          <span className="rounded-full border border-zinc-600 bg-zinc-900/60 px-3 py-1">生活观察</span>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href={siteConfig.aboutPath}
            className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-zinc-900 hover:bg-zinc-200"
          >
            关于本站
          </Link>
        </div>
      </header>

      <PostSearch posts={posts} />
      <FloatingFunSidebar quote={dailyQuote} posts={posts} />
    </main>
  );
}
