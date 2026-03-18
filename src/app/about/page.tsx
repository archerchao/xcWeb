export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 md:px-6">
      <section className="rounded-3xl border border-zinc-200 bg-white p-6 md:p-8">
        <h1 className="text-3xl font-bold text-zinc-900">关于本站</h1>
        <p className="mt-4 leading-8 text-zinc-700">
          欢迎来到「万物碎碎念研究所」。
          这是一个中文分享站，主要记录我在 AI、工具、效率、运维和生活里的所见所想。
        </p>
        <p className="mt-3 leading-8 text-zinc-700">
          你可以把它理解成一个不断更新的个人知识库：
          <strong>有价值的沉淀留下来，没价值的踩坑也留下来提醒自己。</strong>
        </p>
        <p className="mt-3 leading-8 text-zinc-700">如果某篇文章帮到了你，那这站就没白建。</p>
      </section>
    </main>
  );
}
