"use client";

import Link from "next/link";
import { useState } from "react";
import type { PostMeta } from "@/lib/posts";

interface FloatingFunSidebarProps {
  quote: string;
  posts: PostMeta[];
}

export default function FloatingFunSidebar({ quote, posts }: FloatingFunSidebarProps) {
  const [picked, setPicked] = useState<PostMeta | null>(null);

  const pickRandom = () => {
    if (posts.length === 0) return;
    const index = Math.floor(Math.random() * posts.length);
    setPicked(posts[index]);
  };

  return (
    <aside className="fixed right-6 top-1/2 z-40 hidden w-72 -translate-y-1/2 space-y-3 xl:block">
      <div className="rounded-2xl bg-white/90 p-4 shadow-lg ring-1 ring-zinc-200/80 backdrop-blur dark:bg-zinc-900/90 dark:ring-zinc-700/80">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">✨ 今日金句</h3>
        <p className="mt-2 text-sm leading-6 text-zinc-700 dark:text-zinc-300">“{quote}”</p>
      </div>

      <div className="rounded-2xl bg-white/90 p-4 shadow-lg ring-1 ring-zinc-200/80 backdrop-blur dark:bg-zinc-900/90 dark:ring-zinc-700/80">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">🎁 随机文章盲盒</h3>
        <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">点一下，交给命运分配阅读任务。</p>
        <button
          type="button"
          onClick={pickRandom}
          disabled={posts.length === 0}
          className="mt-3 rounded-full bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-indigo-600 dark:hover:bg-indigo-500"
        >
          开盲盒
        </button>
        {picked ? (
          <div className="mt-2">
            <Link href={`/posts/${picked.slug}`} className="text-sm text-indigo-600 hover:underline dark:text-indigo-400">
              {picked.title}
            </Link>
          </div>
        ) : null}
      </div>
    </aside>
  );
}
