import React from "react";
import { Link } from "react-router-dom";
import { listBlogPosts } from "../../lib/blogApi";
import { formatDate } from "../../lib/blogMapper";

function AdminDashboard() {
  const [stats, setStats] = React.useState({
    total: 0,
    published: 0,
    draft: 0,
    latest: null,
  });

  React.useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const posts = await listBlogPosts();
        if (!active) return;
        const total = posts?.length || 0;
        const published = posts?.filter((post) => post.status === "published").length || 0;
        const draft = posts?.filter((post) => post.status === "draft").length || 0;
        const latest = posts?.[0] || null;
        setStats({ total, published, draft, latest });
      } catch (error) {
        if (!active) return;
      }
    };

    load();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-3">
        {[
          { label: "Total Posts", value: stats.total },
          { label: "Published", value: stats.published },
          { label: "Drafts", value: stats.draft },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-3xl bg-white/95 p-6 shadow-lg"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-muted">{item.label}</p>
            <p className="mt-4 font-display text-4xl text-ink">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl bg-white/95 p-6 shadow-lg">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Latest Update</p>
          <h2 className="mt-4 font-display text-2xl text-ink">
            {stats.latest?.title || "No posts yet"}
          </h2>
          <p className="mt-3 text-sm text-muted">
            {stats.latest
              ? `Updated ${formatDate(stats.latest.updated_at || stats.latest.created_at)}`
              : "Create your first post to see recent activity here."}
          </p>
          <Link
            to="/admin/blogs"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-cream/80 px-5 py-2 text-sm font-semibold text-ink shadow-soft transition hover:shadow-md"
          >
            Manage blog posts -
          </Link>
        </div>

        <div className="rounded-3xl bg-ink p-6 text-cream shadow-xl">
          <p className="text-xs uppercase tracking-[0.3em] text-cream/70">
            Quick Actions
          </p>
          <p className="mt-4 text-lg">
            Draft a fresh insight, publish a new recipe ritual, or revisit your highlights.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Link
              to="/admin/blogs"
              className="rounded-2xl bg-lime px-4 py-3 text-sm font-semibold text-ink"
            >
              Create a new post
            </Link>
            <Link
              to="/blogs"
              className="rounded-2xl border border-cream/40 px-4 py-3 text-sm font-semibold text-cream"
            >
              Preview public blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
