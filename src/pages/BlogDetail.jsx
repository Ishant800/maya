import React from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { blogs as fallbackBlogs } from "../data/blogs";
import { recipes } from "../data/recipes";
import {
  addBlogComment,
  getBlogLikeStatus,
  getBlogPost,
  listBlogComments,
  shareBlogPost,
  toggleBlogLike,
} from "../lib/blogApi";
import { mapPostToBlog } from "../lib/blogMapper";
import { subscribeToAuthor } from "../lib/notificationsApi";

const TOKEN_KEY = "maya_auth_token";
const LEGACY_TOKEN_KEY = "maya_admin_token";
const USER_KEY = "maya_auth_user";

function readToken() {
  return localStorage.getItem(TOKEN_KEY) || localStorage.getItem(LEGACY_TOKEN_KEY) || "";
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

function BlogDetail() {
  const { blogId } = useParams();
  const [blog, setBlog] = React.useState(
    fallbackBlogs.find((item) => item.id === blogId) || fallbackBlogs[0]
  );
  const [note, setNote] = React.useState("Curated post");
  const [comments, setComments] = React.useState([]);
  const [commentBody, setCommentBody] = React.useState("");
  const [likesCount, setLikesCount] = React.useState(0);
  const [sharesCount, setSharesCount] = React.useState(0);
  const [liked, setLiked] = React.useState(false);
  const [actionStatus, setActionStatus] = React.useState(null);
  const [subscribeEmail, setSubscribeEmail] = React.useState("");
  const [subscribeStatus, setSubscribeStatus] = React.useState(null);
  const token = readToken();
  const tokenInfo = token ? parseJwt(token) : null;
  const role = (tokenInfo?.role || "").toLowerCase();
  const canInteract = Boolean(token && role === "client");
  const authorId = blog?.authorId || blog?.author_id || "";

  React.useEffect(() => {
    const raw = localStorage.getItem(USER_KEY);
    const user = raw ? JSON.parse(raw) : null;
    if (user?.email) {
      setSubscribeEmail(user.email);
    }
  }, []);

  React.useEffect(() => {
    let active = true;

    const loadPost = async () => {
      try {
        const post = await getBlogPost(blogId);
        if (!active) return;
        const mapped = mapPostToBlog(post);
        if (mapped) {
          setBlog(mapped);
          setNote("Latest from Maya");
          setLikesCount(mapped?.likes_count || 0);
          setSharesCount(mapped?.shares_count || 0);
          return;
        }
      } catch (error) {
        if (!active) return;
      }

      const fallback =
        fallbackBlogs.find((item) => item.id === blogId) || fallbackBlogs[0];
      setBlog(fallback);
      setNote("Curated post");
      setLikesCount(fallback?.likes_count || 0);
      setSharesCount(fallback?.shares_count || 0);
    };

    if (blogId) {
      loadPost();
    }

    return () => {
      active = false;
    };
  }, [blogId]);

  const apiId =
    blog?.id && /^[a-f0-9]{24}$/i.test(blog.id) ? blog.id : null;

  React.useEffect(() => {
    let active = true;

    const loadComments = async () => {
      if (!apiId) return;
      try {
        const data = await listBlogComments(apiId);
        if (!active) return;
        setComments(data || []);
      } catch (error) {
        if (!active) return;
        setComments([]);
      }
    };

    loadComments();
    return () => {
      active = false;
    };
  }, [apiId]);

  React.useEffect(() => {
    let active = true;
    const loadLikeStatus = async () => {
      if (!apiId || !canInteract) return;
      try {
        const result = await getBlogLikeStatus(apiId, token);
        if (!active) return;
        setLiked(Boolean(result?.liked));
      } catch (error) {
        if (!active) return;
      }
    };
    loadLikeStatus();
    return () => {
      active = false;
    };
  }, [apiId, canInteract, token]);

  const handleLike = async () => {
    if (!canInteract || !apiId) {
      setActionStatus("Sign in as a client to like this post.");
      return;
    }
    try {
      const result = await toggleBlogLike(apiId, token);
      setLiked(Boolean(result?.liked));
      setLikesCount(result?.likes_count ?? likesCount);
    } catch (error) {
      setActionStatus(error?.data?.error || "Could not update like.");
    }
  };

  const handleShare = async () => {
    if (!canInteract || !apiId) {
      setActionStatus("Sign in as a client to share this post.");
      return;
    }
    try {
      const result = await shareBlogPost(apiId, token);
      setSharesCount(result?.shares_count ?? sharesCount);
    } catch (error) {
      setActionStatus(error?.data?.error || "Could not share this post.");
    }
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    if (!canInteract || !apiId) {
      setActionStatus("Sign in as a client to comment.");
      return;
    }
    if (!commentBody.trim()) return;
    try {
      const created = await addBlogComment(
        apiId,
        { body: commentBody.trim() },
        token
      );
      setComments((prev) => [created, ...prev]);
      setCommentBody("");
    } catch (error) {
      setActionStatus(error?.data?.error || "Could not add comment.");
    }
  };

  const handleSubscribe = async () => {
    if (!subscribeEmail) {
      setSubscribeStatus({ type: "error", message: "Add your email first." });
      return;
    }
    if (!authorId) {
      setSubscribeStatus({
        type: "error",
        message: "Author details are missing for this post.",
      });
      return;
    }
    setSubscribeStatus({ type: "loading", message: "Subscribing..." });
    try {
      await subscribeToAuthor(
        { email: subscribeEmail, author_id: authorId },
        token
      );
      setSubscribeStatus({
        type: "success",
        message: "You're subscribed to this nutritionist.",
      });
    } catch (error) {
      setSubscribeStatus({
        type: "error",
        message: error?.data?.error || "Could not subscribe.",
      });
    }
  };

  const contentBlocks =
    blog?.content
      ?.split(/\n\s*\n/)
      .map((block) => block.trim())
      .filter(Boolean) || [];

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-cream text-ink">
        <div className="mx-auto max-w-6xl px-6 pb-20 pt-12">
          <Link className="text-sm text-muted" to="/blogs">
            Back to blogs
          </Link>
          <p className="mt-2 text-xs uppercase tracking-[0.3em] text-muted/70">
            {note}
          </p>

          <div className="mt-8 rounded-3xl bg-white/90 p-8 shadow-soft lg:p-12">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <span className="inline-flex rounded-full bg-ink/10 px-3 py-1 text-xs font-semibold text-ink">
                  {blog.category}
                </span>
                <h1 className="mt-5 font-display text-4xl text-ink sm:text-5xl">
                  {blog.title}
                </h1>
                <p className="mt-4 text-sm text-muted">
                  By {blog.author} • {blog.date} • {blog.readTime}
                </p>

                <div className="mt-10 space-y-8 text-base leading-7 text-muted">
                  {contentBlocks.length ? (
                    contentBlocks.map((block, index) => <p key={index}>{block}</p>)
                  ) : (
                    <>
                      <div>
                        <h2 className="font-display text-2xl text-ink">
                          The Problem with Numbers
                        </h2>
                        <p className="mt-3">
                          I used to tally every bite in an app. It made me feel safe, but it
                          also made me tense. I stopped noticing hunger cues and started
                          worrying about whether a meal was “good” or “bad.” The scale of
                          progress became a spreadsheet instead of a lived experience.
                        </p>
                        <p className="mt-3">
                          The moment I stepped back, I heard my body again. I started asking,
                          “Am I satisfied?” instead of “Did I hit my number?” That question
                          created space for calm, confidence, and gentler choices.
                        </p>
                      </div>

                      <div>
                        <h2 className="font-display text-2xl text-ink">Listening Your Body</h2>
                        <p className="mt-3">
                          Intuitive eating is not a free-for-all. It is a practice of tuning in,
                          honoring cravings, and building meals that feel grounding. It means
                          slowing down, noticing fullness, and letting satisfaction guide the
                          next bite.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-amber-700/30 bg-amber-50/60 px-6 py-5">
                        <p className="font-display text-lg text-ink">“{blog.highlight}”</p>
                      </div>

                      <div>
                        <h2 className="font-display text-2xl text-ink">The Tiny Rituals</h2>
                        <p className="mt-3">
                          I keep a few steady rituals: a warm drink before breakfast, a colorful
                          plate at lunch, and a gentle protein-forward snack in the afternoon.
                          Those cues create rhythm, and rhythm builds trust.
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <aside className="space-y-6">
                <img
                  className="h-72 w-full rounded-3xl object-cover"
                  src={blog.heroImage}
                  alt={blog.title}
                />

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  <div className="rounded-2xl bg-cream/60 p-5">
                    <div className="rounded-xl border border-ink/10 bg-white px-4 py-6 text-sm text-muted">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                        Plate Guide
                      </p>
                      <svg
                        className="mt-4 w-full"
                        viewBox="0 0 240 180"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="90" cy="90" r="70" fill="none" stroke="#1f1b16" strokeWidth="2" />
                        <path
                          d="M90 20 A70 70 0 0 1 160 90"
                          fill="none"
                          stroke="#1f1b16"
                          strokeWidth="2"
                        />
                        <path
                          d="M90 90 L160 90"
                          stroke="#1f1b16"
                          strokeWidth="2"
                        />
                        <text x="150" y="40" fontSize="10" fill="#1f1b16">
                          Protein
                        </text>
                        <text x="10" y="120" fontSize="10" fill="#1f1b16">
                          Veggies
                        </text>
                        <text x="120" y="120" fontSize="10" fill="#1f1b16">
                          Whole grains
                        </text>
                      </svg>
                    </div>
                  </div>

                  <img
                    className="h-48 w-full rounded-2xl object-cover"
                    src={blog.gallery?.[0] || blog.heroImage}
                    alt="Mindful meal"
                  />
                </div>

                <div className="rounded-2xl bg-white/90 p-6 shadow-soft">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                    3 Things to Try Today
                  </p>
                  <ul className="mt-4 space-y-3 text-sm text-muted">
                    <li>Eat one snack without a screen, just a breath.</li>
                    <li>Build a plate with 3 colors you love.</li>
                    <li>Check in after lunch: satisfied, sleepy, or steady?</li>
                  </ul>
                </div>
              </aside>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1fr]">
              <div className="rounded-3xl bg-cream/70 p-6">
                <div className="flex items-center gap-4">
                  <div className="grid h-14 w-14 place-items-center rounded-full bg-ink text-lg font-semibold text-cream">
                    MS
                  </div>
                  <div>
                    <p className="font-display text-lg text-ink">Maya Sharma</p>
                    <p className="text-sm text-muted">Registered Dietitian</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted">
                  Maya is a registered dietitian who helps women build peaceful
                  relationships with food, habit by habit. When she is not writing,
                  she is hiking with her dog Luna.
                </p>
                <Link className="mt-4 inline-flex text-sm font-semibold text-ink" to="/blogs">
                  Read more posts -
                </Link>
              </div>

              <div className="rounded-3xl bg-white/90 p-6 shadow-soft">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                  Loved this post? Get more like it:
                </p>
                <p className="mt-3 text-sm text-muted">
                  Join 5,000+ readers receiving weekly tips on joyful eating.
                </p>
                {subscribeStatus?.message && (
                  <p
                    className={`mt-4 text-xs ${
                      subscribeStatus.type === "success"
                        ? "text-ink"
                        : subscribeStatus.type === "error"
                        ? "text-red-600"
                        : "text-muted"
                    }`}
                  >
                    {subscribeStatus.message}
                  </p>
                )}
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <input
                    className="flex-1 rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm"
                    placeholder="Email"
                    value={subscribeEmail}
                    onChange={(event) => setSubscribeEmail(event.target.value)}
                  />
                  <button
                    type="button"
                    onClick={handleSubscribe}
                    className="rounded-xl bg-ink px-6 py-3 text-sm font-semibold text-cream"
                  >
                    Subscribe
                  </button>
                </div>
                <p className="mt-4 text-xs text-muted">
                  No spam. Just gentle reminders that you are doing great.
                </p>
              </div>
            </div>

            <div className="mt-12 rounded-3xl bg-white/90 p-6 shadow-soft">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted">
                    Engagement
                  </p>
                  <p className="mt-2 text-sm text-muted">
                    Likes: {likesCount} · Shares: {sharesCount}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleLike}
                    className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                      canInteract
                        ? "bg-cream/70 text-ink hover:bg-cream"
                        : "bg-cream/40 text-ink/50 cursor-not-allowed"
                    }`}
                  >
                    {liked ? "Liked" : "Like"}
                  </button>
                  <button
                    type="button"
                    onClick={handleShare}
                    className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                      canInteract
                        ? "bg-cream/70 text-ink hover:bg-cream"
                        : "bg-cream/40 text-ink/50 cursor-not-allowed"
                    }`}
                  >
                    Share
                  </button>
                </div>
              </div>
              {actionStatus && (
                <p className="mt-3 text-xs text-muted">{actionStatus}</p>
              )}
            </div>

            <div className="mt-8 rounded-3xl bg-white/90 p-6 shadow-soft">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">
                Comments
              </p>
              <form onSubmit={handleCommentSubmit} className="mt-4 space-y-3">
                <textarea
                  value={commentBody}
                  onChange={(event) => setCommentBody(event.target.value)}
                  className="w-full rounded-2xl border border-ink/10 bg-cream/50 px-4 py-3 text-sm"
                  rows={3}
                  placeholder={
                    canInteract
                      ? "Share your thoughts..."
                      : "Sign in as a client to comment."
                  }
                  disabled={!canInteract}
                />
                <button
                  type="submit"
                  className={`rounded-full px-5 py-2 text-xs font-semibold ${
                    canInteract
                      ? "bg-ink text-cream"
                      : "bg-ink/40 text-cream/70 cursor-not-allowed"
                  }`}
                  disabled={!canInteract}
                >
                  Add comment
                </button>
              </form>

              <div className="mt-6 space-y-4">
                {comments.length === 0 && (
                  <p className="text-sm text-muted">
                    No comments yet. Be the first to share your note.
                  </p>
                )}
                {comments.map((comment) => (
                  <div key={comment._id} className="rounded-2xl bg-cream/60 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted">
                      {comment.author_name || "Client"}
                    </p>
                    <p className="mt-2 text-sm text-muted">{comment.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 rounded-3xl bg-white/90 p-6 shadow-soft">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                    Recipes to Try Next
                  </p>
                  <p className="mt-2 text-sm text-muted">
                    Fast, low-stress meals that keep energy steady and cravings quiet.
                  </p>
                </div>
                <Link
                  className="inline-flex items-center gap-2 rounded-full border border-ink/20 bg-white/70 px-6 py-2 text-sm font-semibold text-ink transition hover:border-ink"
                  to="/recipes"
                >
                  Explore recipes -
                </Link>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {recipes.slice(0, 3).map((recipe) => (
                  <Link
                    key={recipe.id}
                    to={`/recipes/${recipe.id}`}
                    className="rounded-2xl border border-ink/10 bg-cream/60 p-4 transition hover:-translate-y-0.5"
                  >
                    <p className="text-xs uppercase tracking-[0.2em] text-muted">
                      {recipe.time}
                    </p>
                    <p className="mt-2 font-display text-lg text-ink">{recipe.title}</p>
                    <p className="mt-1 text-xs text-muted">{recipe.calories}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default BlogDetail;

