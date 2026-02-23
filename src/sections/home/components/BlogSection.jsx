import { Link } from "react-router-dom";

function BlogSection({ blogItems, blogNote }) {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted">Blog</p>
            <h2 className="mt-3 font-display text-3xl text-ink">Nutrition tips</h2>
            <p className="mt-2 text-sm text-muted">{blogNote}</p>
          </div>
          <Link
            to="/blogs"
            className="rounded-full bg-white/90 px-5 py-2 text-sm font-semibold text-ink shadow-soft"
          >
            View all posts
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {blogItems.slice(0, 3).map((blog) => (
            <article key={blog.id} className="rounded-3xl bg-white/95 p-6 shadow-lg">
              <div className="relative overflow-hidden rounded-2xl">
                <img src={blog.heroImage} alt={blog.title} className="h-40 w-full object-cover" />
              </div>
              <h3 className="mt-4 font-display text-xl text-ink">{blog.title}</h3>
              <p className="mt-3 text-sm text-muted">{blog.summary}</p>
              <Link
                to={`/blogs/${blog.id}`}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink"
              >
                Read more -
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BlogSection;

