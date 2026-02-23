import { apiFetch } from "./api";

export function listBlogPosts() {
  return apiFetch("/blog-posts");
}

export function getBlogPost(id) {
  return apiFetch(`/blog-posts/${id}`);
}

export function createBlogPost(payload, token) {
  return apiFetch("/blog-posts", {
    method: "POST",
    body: JSON.stringify(payload),
    token,
  });
}

export function updateBlogPost(id, payload, token) {
  return apiFetch(`/blog-posts/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
    token,
  });
}

export function deleteBlogPost(id, token) {
  return apiFetch(`/blog-posts/${id}`, {
    method: "DELETE",
    token,
  });
}

export function listBlogComments(postId) {
  return apiFetch(`/blog-posts/${postId}/comments`);
}

export function addBlogComment(postId, payload, token) {
  return apiFetch(`/blog-posts/${postId}/comments`, {
    method: "POST",
    body: JSON.stringify(payload),
    token,
  });
}

export function toggleBlogLike(postId, token) {
  return apiFetch(`/blog-posts/${postId}/like`, {
    method: "POST",
    token,
  });
}

export function shareBlogPost(postId, token) {
  return apiFetch(`/blog-posts/${postId}/share`, {
    method: "POST",
    token,
  });
}

export function getBlogLikeStatus(postId, token) {
  return apiFetch(`/blog-posts/${postId}/like-status`, {
    method: "GET",
    token,
  });
}
