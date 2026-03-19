import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReadingProgress from "@/components/reading-progress";
import { getAllSlugs, getPostBySlug, getRelatedPosts } from "@/lib/posts";

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
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      images: [{ url: post.cover }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: [post.cover],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(post, 3);

  return (
    <main className="mx-auto max-w-7xl px-4 pb-10 pt-24 md:px-6">
      <ReadingProgress />
      <Link
        href="/"
        className="fixed left-4 top-5 z-40 inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white/90 px-4 py-2.5 text-base font-medium text-zinc-800 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:shadow md:left-6"
      >
        <span aria-hidden>←</span>
        返回首页
      </Link>

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <article className="mt-2 rounded-3xl border border-zinc-200 bg-white p-6 md:p-10">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-sm">
            <span className="rounded-full bg-zinc-100 px-2 py-1 text-zinc-700">{post.category}</span>
            <span className="text-zinc-500">{post.date}</span>
          </div>
          <h1 className="text-3xl font-bold text-zinc-900 md:text-4xl">{post.title}</h1>
          <p className="mt-3 text-zinc-600">{post.summary}</p>
          <div className="article-content mt-8" dangerouslySetInnerHTML={{ __html: post.html }} />
        </article>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          {post.toc.length > 0 ? (
            <section className="rounded-2xl border border-zinc-200 bg-white p-4">
              <h2 className="mb-3 text-sm font-semibold text-zinc-900">目录</h2>
              <ul className="space-y-1 text-sm text-zinc-600">
                {post.toc.map((heading) => (
                  <li key={heading.id} className={heading.depth === 3 ? "pl-3" : ""}>
                    <a className="hover:text-indigo-600" href={`#${heading.id}`}>
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {relatedPosts.length > 0 ? (
            <section className="rounded-2xl border border-zinc-200 bg-white p-4">
              <h2 className="mb-3 text-sm font-semibold text-zinc-900">相关推荐</h2>
              <ul className="space-y-2">
                {relatedPosts.map((item) => (
                  <li key={item.slug}>
                    <Link className="text-sm text-zinc-700 hover:text-indigo-600" href={`/posts/${item.slug}`}>
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </aside>
      </div>
    </main>
  );
}
