import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "文章不存在",
    };
  }

  return {
    title: `${post.title} | 万物碎碎念研究所`,
    description: post.summary,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 md:px-6">
      <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-900">
        ← 返回首页
      </Link>

      <article className="mt-4 rounded-3xl border border-zinc-200 bg-white p-6 md:p-8">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-sm">
          <span className="rounded-full bg-zinc-100 px-2 py-1 text-zinc-700">{post.category}</span>
          <span className="text-zinc-500">{post.date}</span>
        </div>
        <h1 className="text-3xl font-bold text-zinc-900">{post.title}</h1>
        <p className="mt-2 text-zinc-600">{post.summary}</p>
        <div className="prose prose-zinc mt-8 max-w-none" dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
    </main>
  );
}
