"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { PostMeta } from "@/lib/posts";

interface PostSearchProps {
  posts: PostMeta[];
}

export default function PostSearch({ posts }: PostSearchProps) {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("全部");

  const categories = useMemo(() => {
    const set = new Set(posts.map((post) => post.category));
    return ["全部", ...Array.from(set)];
  }, [posts]);

  const filtered = useMemo(() => {
    const lowerKeyword = keyword.trim().toLowerCase();

    return posts.filter((post) => {
      const matchCategory = category === "全部" || post.category === category;
      const text = `${post.title} ${post.summary} ${post.tags.join(" ")}`.toLowerCase();
      const matchKeyword = !lowerKeyword || text.includes(lowerKeyword);
      return matchCategory && matchKeyword;
    });
  }, [posts, keyword, category]);

  return (
    <section className="space-y-4">
      <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 md:grid-cols-3">
          <input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="搜索标题、摘要、标签..."
            className="md:col-span-2 rounded-xl border border-zinc-300 px-4 py-2 outline-none focus:border-zinc-500"
          />
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="rounded-xl border border-zinc-300 px-4 py-2 outline-none focus:border-zinc-500"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-5">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-6 text-zinc-500">
            没搜到内容。你可以换个关键词，或者怪我文章写得还不够多 😅
          </div>
        ) : (
          filtered.map((post) => (
            <article key={post.slug} className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
              <Link href={`/posts/${post.slug}`} className="block">
                <div className="relative h-44 w-full bg-zinc-100 md:h-56">
                  <Image src={post.cover} alt={post.title} fill className="object-cover" />
                </div>
              </Link>

              <div className="p-5">
                <div className="mb-2 flex flex-wrap items-center gap-2 text-sm">
                  <span className="rounded-full bg-zinc-100 px-2 py-1 text-zinc-700">{post.category}</span>
                  <span className="text-zinc-500">{post.date}</span>
                </div>

                <h2 className="text-xl font-semibold text-zinc-900">
                  <Link href={`/posts/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h2>

                <p className="mt-2 text-zinc-600">{post.summary}</p>

                <div className="mt-3 flex flex-wrap gap-2 text-xs text-zinc-500">
                  {post.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-zinc-100 px-2 py-1">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
