import { apiFetch } from "./api";

export function subscribeToAuthor(payload, token) {
  return apiFetch("/notifications/subscribe", {
    method: "POST",
    body: JSON.stringify(payload),
    token,
  });
}

export function unsubscribeFromAuthor(payload, token) {
  return apiFetch("/notifications/unsubscribe", {
    method: "POST",
    body: JSON.stringify(payload),
    token,
  });
}

export function listNotifications(token, options = {}) {
  const params = new URLSearchParams();
  if (options.limit) params.set("limit", String(options.limit));
  if (options.skip) params.set("skip", String(options.skip));
  const suffix = params.toString() ? `?${params.toString()}` : "";
  return apiFetch(`/notifications${suffix}`, { token });
}

export function getUnreadCount(token) {
  return apiFetch("/notifications/unread-count", { token });
}

export function markNotificationsRead(payload, token) {
  return apiFetch("/notifications/mark-read", {
    method: "PATCH",
    body: JSON.stringify(payload),
    token,
  });
}
