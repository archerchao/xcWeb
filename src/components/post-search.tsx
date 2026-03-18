"use client";

import { useMemo, useState } from "react";
import type { PostMeta } from "@/lib/posts";
import EmptyState from "@/components/empty-state";
import { FeaturedPostCard, GridPostCard } from "@/components/post-card";

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

  const [featured, ...restPosts] = filtered;

  return (
    <section className="space-y-5">
      <div className="rounded-2xl border border-zinc-200/80 bg-white/90 p-4 shadow-sm backdrop-blur">
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

      {filtered.length === 0 ? (
        <EmptyState text="没搜到内容。你可以换个关键词，或者怪我文章写得还不够多 😅" />
      ) : (
        <>
          {featured ? <FeaturedPostCard post={featured} /> : null}
          {restPosts.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {restPosts.map((post) => (
                <GridPostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : null}
        </>
      )}
    </section>
  );
}
