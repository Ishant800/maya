import { blogs as fallbackBlogs } from "../data/blogs";

const fallbackHero = fallbackBlogs[0]?.heroImage || "";

export function mapPostToBlog(post) {
  if (!post) return null;
  const content = typeof post.content === "string" ? post.content : "";
  const excerpt =
    post.excerpt ||
    content.replace(/\s+/g, " ").trim().slice(0, 160) ||
    "A gentle note on nourishing your body.";
  const dateValue = post.published_at || post.created_at || null;

  const authorId =
    typeof post.author_id === "object"
      ? post.author_id?._id
      : post.author_id || post.authorId || "";
  const authorName =
    post.author_name ||
    post.author?.name ||
    post.author_id?.name ||
    "Maya Team";

  return {
    id: post._id || post.id,
    category: post.tags?.[0] || "Nutrition",
    title: post.title || "Untitled post",
    summary: excerpt,
    date: formatDate(dateValue),
    readTime: estimateReadTime(content || excerpt),
    author: authorName,
    authorId,
    heroImage: post.featured_image_url || fallbackHero,
    gallery: post.featured_image_url
      ? [post.featured_image_url, post.featured_image_url]
      : [fallbackHero, fallbackHero],
    highlight: excerpt,
    content,
    publishedAt: dateValue,
    status: post.status || "draft",
    likes_count: post.likes_count || 0,
    shares_count: post.shares_count || 0,
    comments_count: post.comments_count || 0,
  };
}

export function formatDate(value) {
  if (!value) return "Unscheduled";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unscheduled";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function estimateReadTime(text) {
  const words = text ? text.trim().split(/\s+/).length : 0;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}
