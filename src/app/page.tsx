import Link from "next/link";
import PostSearch from "@/components/post-search";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <header className="mb-8 rounded-3xl bg-zinc-900 p-8 text-zinc-50">
        <p className="mb-3 text-sm uppercase tracking-widest text-zinc-300">万物碎碎念研究所</p>
        <h1 className="text-3xl font-bold md:text-4xl">把灵感、踩坑和胡思乱想都存进来</h1>
        <p className="mt-3 max-w-3xl text-zinc-300">
          这里是我的中文分享站：AI、效率、运维、生活观察都能聊。
          <br />
          主打一个“有用就记、没用就当段子看”。
        </p>
        <div className="mt-5">
          <Link href="/about" className="rounded-full bg-white px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-200">
            关于本站
          </Link>
        </div>
      </header>

      <PostSearch posts={posts} />
    </main>
  );
}
