import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { blogs as fallbackBlogs } from "../data/blogs";
import { listBlogPosts } from "../lib/blogApi";
import { mapPostToBlog } from "../lib/blogMapper";

function Blogs() {
  const [blogItems, setBlogItems] = React.useState(fallbackBlogs);
  const [blogNote, setBlogNote] = React.useState("Curated posts");

  React.useEffect(() => {
    let active = true;

    const loadPosts = async () => {
      try {
        const posts = await listBlogPosts();
        if (!active) return;
        const mapped = (posts || [])
          .filter((post) => post.status === "published")
          .map(mapPostToBlog)
          .filter(Boolean);
        if (mapped.length) {
          setBlogItems(mapped);
          setBlogNote("Latest from Maya");
        } else {
          setBlogItems(fallbackBlogs);
          setBlogNote("Curated posts");
        }
      } catch (error) {
        if (!active) return;
        setBlogItems(fallbackBlogs);
        setBlogNote("Curated posts");
      }
    };

    loadPosts();
    return () => {
      active = false;
    };
  }, []);

  const featured = blogItems[0] || fallbackBlogs[0];

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-cream text-ink">
        <div className="mx-auto max-w-6xl px-6 pb-20 pt-16">
          <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <span className="inline-flex items-center rounded-full bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-muted">
                The Blog
              </span>
              <h1 className="mt-6 font-display text-4xl text-ink sm:text-5xl">
                Gentle nutrition stories, rituals, and recipes that feel like home.
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-muted">
                Read fresh insights on intuitive eating, balanced plates, and rituals that
                build a calm relationship with food.
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.3em] text-muted/70">
                {blogNote}
              </p>
            </div>
            <div className="rounded-3xl bg-white/80 p-6 shadow-soft">
              <p className="text-sm uppercase tracking-[0.3em] text-muted">Featured Topic</p>
              <h2 className="mt-3 font-display text-2xl">
                {featured?.title || "Releasing the pressure of tracking"}
              </h2>
              <p className="mt-3 text-sm text-muted">
                {featured?.summary ||
                  "A soft landing for anyone ready to move from numbers to nourishment."}
              </p>
              <Link
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink"
                to={`/blogs/${featured?.id || fallbackBlogs[0].id}`}
              >
                Read featured post -&gt;
              </Link>
            </div>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogItems.map((blog) => (
              <article
                key={blog.id}
                className="rounded-3xl bg-white/90 p-6 shadow-soft transition-transform hover:-translate-y-1"
              >
                <Link to={`/blogs/${blog.id}`}>
                  <img
                    className="h-48 w-full rounded-2xl object-cover"
                    src={blog.heroImage}
                    alt={blog.title}
                  />
                </Link>
                <div className="mt-6">
                  <span className="inline-flex rounded-full bg-ink/5 px-3 py-1 text-xs font-semibold text-ink">
                    {blog.category}
                  </span>
                  <Link to={`/blogs/${blog.id}`}>
                    <h3 className="mt-4 font-display text-2xl text-ink">{blog.title}</h3>
                  </Link>
                  <p className="mt-3 text-sm text-muted">{blog.summary}</p>
                  <div className="mt-6 flex items-center justify-between text-xs text-muted">
                    <span>{blog.date}</span>
                    <span>{blog.readTime}</span>
                  </div>
                  <Link
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink"
                    to={`/blogs/${blog.id}`}
                  >
                    Read more -&gt;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Blogs;
