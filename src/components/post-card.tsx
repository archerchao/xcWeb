import Image from "next/image";
import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { siteConfig } from "@/config/site";

interface PostCardProps {
  post: PostMeta;
}

export function FeaturedPostCard({ post }: PostCardProps) {
  return (
    <article className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm ring-1 ring-indigo-100 transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="grid md:grid-cols-2">
        <Link href={`/posts/${post.slug}`} className="block">
          <div className="relative h-56 w-full bg-zinc-100 md:h-full md:min-h-72">
            <Image src={post.cover} alt={post.title} fill className="object-cover transition duration-500 hover:scale-105" />
          </div>
        </Link>

        <div className="flex flex-col p-6 md:p-7">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-sm">
            <span className="rounded-full bg-zinc-100 px-2 py-1 text-zinc-700">{post.category}</span>
            <span className="text-zinc-500">{post.date}</span>
            <span className="rounded-full bg-amber-100 px-2 py-1 text-amber-700">{siteConfig.featuredLabel}</span>
          </div>

          <h2 className="text-2xl font-bold leading-tight text-zinc-900 md:text-3xl">
            <Link href={`/posts/${post.slug}`} className="hover:underline">
              {post.title}
            </Link>
          </h2>

          <p className="post-summary mt-3 text-zinc-600">{post.summary}</p>

          <div className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-500">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-zinc-100 px-2 py-1">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export function GridPostCard({ post }: PostCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/posts/${post.slug}`} className="block">
        <div className="relative h-44 w-full bg-zinc-100">
          <Image src={post.cover} alt={post.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
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

        <p className="post-summary mt-2 text-zinc-600">{post.summary}</p>

        <div className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-500">
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-zinc-100 px-2 py-1">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
