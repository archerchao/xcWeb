"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import type { PostMeta } from "@/lib/posts";

interface PostSearchProps {
  posts: PostMeta[];
}

const summaryClampStyle: CSSProperties = {
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

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

  const featured = filtered[0];
  const restPosts = filtered.slice(1);

  return (
    <section className="space-y-5">
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

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-6 text-zinc-500">
          没搜到内容。你可以换个关键词，或者怪我文章写得还不够多 😅
        </div>
      ) : (
        <>
          {featured ? (
            <article className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="grid md:grid-cols-2">
                <Link href={`/posts/${featured.slug}`} className="block">
                  <div className="relative h-56 w-full bg-zinc-100 md:h-full md:min-h-72">
                    <Image src={featured.cover} alt={featured.title} fill className="object-cover" />
                  </div>
                </Link>

                <div className="flex flex-col p-6 md:p-7">
                  <div className="mb-3 flex flex-wrap items-center gap-2 text-sm">
                    <span className="rounded-full bg-zinc-100 px-2 py-1 text-zinc-700">{featured.category}</span>
                    <span className="text-zinc-500">{featured.date}</span>
                    <span className="rounded-full bg-amber-100 px-2 py-1 text-amber-700">精选</span>
                  </div>

                  <h2 className="text-2xl font-bold leading-tight text-zinc-900 md:text-3xl">
                    <Link href={`/posts/${featured.slug}`} className="hover:underline">
                      {featured.title}
                    </Link>
                  </h2>

                  <p className="mt-3 text-zinc-600" style={summaryClampStyle}>
                    {featured.summary}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-500">
                    {featured.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-zinc-100 px-2 py-1">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ) : null}

          {restPosts.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {restPosts.map((post) => (
                <article
                  key={post.slug}
                  className="flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <Link href={`/posts/${post.slug}`} className="block">
                    <div className="relative h-40 w-full bg-zinc-100">
                      <Image src={post.cover} alt={post.title} fill className="object-cover" />
                    </div>
                  </Link>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-2 flex flex-wrap items-center gap-2 text-sm">
                      <span className="rounded-full bg-zinc-100 px-2 py-1 text-zinc-700">{post.category}</span>
                      <span className="text-zinc-500">{post.date}</span>
                    </div>

                    <h3 className="text-lg font-semibold leading-snug text-zinc-900">
                      <Link href={`/posts/${post.slug}`} className="hover:underline">
                        {post.title}
                      </Link>
                    </h3>

                    <p className="mt-2 text-zinc-600" style={summaryClampStyle}>
                      {post.summary}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-500">
                      {post.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-zinc-100 px-2 py-1">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : null}
        </>
      )}
    </section>
  );
}
