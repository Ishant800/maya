import React from "react";
import {
  createBlogPost,
  deleteBlogPost,
  listBlogPosts,
  updateBlogPost,
} from "../../lib/blogApi";
import { formatDate } from "../../lib/blogMapper";

const emptyForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  featured_image_url: "",
  tags: "",
  status: "draft",
  published_at: "",
  author_id: "",
};

const TOKEN_KEY = "maya_auth_token";
const LEGACY_TOKEN_KEY = "maya_admin_token";

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function parseJwt(token) {
  try {
    const payload = token.split(".")[1];
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decoded);
  } catch (error) {
    return null;
  }
}

function toDateInputValue(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

function AdminBlogPosts() {
  const [posts, setPosts] = React.useState([]);
  const [status, setStatus] = React.useState({ type: "idle", message: "" });
  const [loading, setLoading] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [token, setToken] = React.useState(() => readToken());
  const [tokenInfo, setTokenInfo] = React.useState(() => parseJwt(token));
  const [form, setForm] = React.useState(() => ({
    ...emptyForm,
    author_id: parseJwt(token)?.sub || "",
  }));

  const refresh = React.useCallback(async () => {
    setLoading(true);
    try {
      const data = await listBlogPosts();
      setPosts(data || []);
    } catch (error) {
      setStatus({ type: "error", message: "Could not load blog posts." });
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    refresh();
  }, [refresh]);

  React.useEffect(() => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    }
    const info = parseJwt(token);
    setTokenInfo(info);
    if (info?.sub) {
      setForm((prev) => ({ ...prev, author_id: prev.author_id || info.sub }));
    }
  }, [token]);

  React.useEffect(() => {
    const handleStorage = () => {
      const nextToken = readToken();
      setToken(nextToken);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      slug:
        name === "title" && !prev.slug
          ? slugify(value)
          : name === "slug"
          ? slugify(value)
          : prev.slug,
    }));
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      ...emptyForm,
      author_id: tokenInfo?.sub || "",
    });
  };

  const handleEdit = (post) => {
    setEditingId(post._id);
    setForm({
      title: post.title || "",
      slug: post.slug || "",
      excerpt: post.excerpt || "",
      content: post.content || "",
      featured_image_url: post.featured_image_url || "",
      tags: (post.tags || []).join(", "),
      status: post.status || "draft",
      published_at: toDateInputValue(post.published_at),
      author_id: post.author_id || tokenInfo?.sub || "",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "idle", message: "" });

    if (!token) {
      setStatus({ type: "error", message: "Add a token before saving posts." });
      return;
    }

    const payload = {
      title: form.title.trim(),
      slug: form.slug || slugify(form.title),
      excerpt: form.excerpt.trim(),
      content: form.content.trim(),
      featured_image_url: form.featured_image_url.trim(),
      tags: form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      status: form.status,
      published_at:
        form.status === "published"
          ? form.published_at
            ? new Date(form.published_at).toISOString()
            : new Date().toISOString()
          : null,
      author_id: form.author_id || tokenInfo?.sub || "",
    };

    if (!payload.title || !payload.slug || !payload.author_id) {
      setStatus({
        type: "error",
        message: "Title, slug, and author are required.",
      });
      return;
    }

    try {
      if (editingId) {
        await updateBlogPost(editingId, payload, token);
        setStatus({ type: "success", message: "Post updated successfully." });
      } else {
        await createBlogPost(payload, token);
        setStatus({ type: "success", message: "Post created successfully." });
      }
      resetForm();
      refresh();
    } catch (error) {
      setStatus({
        type: "error",
        message: error?.data?.error || "Could not save post.",
      });
    }
  };

  const handleDelete = async (postId) => {
    if (!token) {
      setStatus({ type: "error", message: "Add a token before deleting posts." });
      return;
    }
    const confirmed = window.confirm("Delete this blog post? This cannot be undone.");
    if (!confirmed) return;
    try {
      await deleteBlogPost(postId, token);
      setStatus({ type: "success", message: "Post deleted." });
      refresh();
    } catch (error) {
      setStatus({
        type: "error",
        message: error?.data?.error || "Could not delete post.",
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-3xl bg-white/95 p-6 shadow-lg">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Admin Session</p>
          <p className="mt-3 text-sm text-muted">
            Your admin session is detected automatically after sign in.
          </p>
          <div className="mt-4 rounded-2xl bg-cream/80 px-4 py-3 text-xs text-muted shadow-soft">
            <p>Role: {tokenInfo?.role || "unknown"}</p>
            <p>Status: {token ? "Token active" : "No token found"}</p>
          </div>
        </div>

        <div className="rounded-3xl bg-ink p-6 text-cream shadow-xl">
          <p className="text-xs uppercase tracking-[0.3em] text-cream/70">
            Publishing Checklist
          </p>
          <ul className="mt-4 space-y-3 text-sm text-cream/80">
            <li>Keep titles human and hopeful.</li>
            <li>Use 1-2 tags for discoverability.</li>
            <li>Set status to published when ready.</li>
          </ul>
          <p className="mt-4 text-xs text-cream/60">
            Remember: drafts stay hidden from the public blog feed.
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-3xl bg-white/95 p-6 shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted">All Posts</p>
              <p className="mt-2 text-sm text-muted">
                {loading ? "Loading posts..." : `${posts.length} total posts`}
              </p>
            </div>
            <button
              onClick={resetForm}
              className="rounded-full border border-ink/20 bg-cream/70 px-4 py-2 text-xs font-semibold text-ink"
            >
              New post
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {posts.length === 0 && (
              <div className="rounded-2xl bg-cream/70 p-6 text-sm text-muted shadow-soft">
                No posts yet. Draft something new to get started.
              </div>
            )}
            {posts.map((post) => (
              <div
                key={post._id}
                className="rounded-2xl bg-white p-4 shadow-soft"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted">
                      {post.status || "draft"}
                    </p>
                    <h3 className="mt-2 font-display text-xl text-ink">
                      {post.title || "Untitled post"}
                    </h3>
                    <p className="mt-2 text-xs text-muted">
                      Updated {formatDate(post.updated_at || post.created_at)}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleEdit(post)}
                      className="rounded-full bg-cream/80 px-4 py-2 text-xs font-semibold text-ink shadow-soft"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="rounded-full bg-red-100 px-4 py-2 text-xs font-semibold text-red-700 shadow-soft"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                {post.excerpt && (
                  <p className="mt-3 text-sm text-muted">{post.excerpt}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-white/95 p-6 shadow-lg">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">
            {editingId ? "Edit Post" : "Create Post"}
          </p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {status.message && (
              <div
                className={`rounded-2xl px-4 py-3 text-sm shadow-soft ${
                  status.type === "success"
                    ? "bg-lime/10 text-ink"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {status.message}
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                Title
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full rounded-xl bg-cream/60 px-4 py-3 text-sm shadow-soft"
                placeholder="Warm, clear, and human"
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                Slug
              </label>
              <input
                name="slug"
                value={form.slug}
                onChange={handleChange}
                className="w-full rounded-xl bg-cream/60 px-4 py-3 text-sm shadow-soft"
                placeholder="auto-generated from title"
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                Excerpt
              </label>
              <textarea
                name="excerpt"
                value={form.excerpt}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-xl bg-cream/60 px-4 py-3 text-sm shadow-soft"
                placeholder="Short summary for previews"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                Content
              </label>
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                rows={8}
                className="w-full rounded-xl bg-cream/60 px-4 py-3 text-sm shadow-soft"
                placeholder="Write the full post content"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                Featured Image URL
              </label>
              <input
                name="featured_image_url"
                value={form.featured_image_url}
                onChange={handleChange}
                className="w-full rounded-xl bg-cream/60 px-4 py-3 text-sm shadow-soft"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                Tags
              </label>
              <input
                name="tags"
                value={form.tags}
                onChange={handleChange}
                className="w-full rounded-xl bg-cream/60 px-4 py-3 text-sm shadow-soft"
                placeholder="comma separated"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                  Status
                </label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-cream/60 px-4 py-3 text-sm shadow-soft"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                  Publish Date
                </label>
                <input
                  type="date"
                  name="published_at"
                  value={form.published_at}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-ink/10 bg-cream/50 px-4 py-3 text-sm"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                className="rounded-2xl bg-ink px-6 py-3 text-sm font-semibold text-cream shadow-lg"
              >
                {editingId ? "Update post" : "Create post"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-2xl bg-cream/80 px-6 py-3 text-sm font-semibold text-ink shadow-soft"
                >
                  Cancel edit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminBlogPosts;
function readToken() {
  return localStorage.getItem(TOKEN_KEY) || localStorage.getItem(LEGACY_TOKEN_KEY) || "";
}
