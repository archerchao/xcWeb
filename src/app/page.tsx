import Link from "next/link";
import PostSearch from "@/components/post-search";
import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/config/site";

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <header className="mb-8 rounded-3xl bg-zinc-900 p-8 text-zinc-50">
        <p className="mb-3 text-sm uppercase tracking-widest text-zinc-300">{siteConfig.badge}</p>
        <h1 className="text-3xl font-bold md:text-4xl">{siteConfig.title}</h1>
        <p className="mt-3 max-w-3xl text-zinc-300">{siteConfig.description}</p>
        <div className="mt-5">
          <Link
            href={siteConfig.aboutPath}
            className="rounded-full bg-white px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-200"
          >
            关于本站
          </Link>
        </div>
      </header>

      <PostSearch posts={posts} />
    </main>
  );
}
