import { apiFetch } from "./api";

export function listNutritionists(token) {
  return apiFetch("/chat/nutritionists", { token });
}

export function listConversations(token) {
  return apiFetch("/chat/conversations", { token });
}

export function startConversation(nutritionistId, token) {
  return apiFetch("/chat/conversations", {
    method: "POST",
    body: JSON.stringify({ nutritionist_id: nutritionistId }),
    token,
  });
}

export function listMessages(conversationId, token, options = {}) {
  const params = new URLSearchParams();
  if (options.limit) params.set("limit", String(options.limit));
  if (options.skip) params.set("skip", String(options.skip));
  const suffix = params.toString() ? `?${params.toString()}` : "";
  return apiFetch(`/chat/conversations/${conversationId}/messages${suffix}`, {
    token,
  });
}

export function sendMessage(payload, token) {
  return apiFetch("/chat/messages", {
    method: "POST",
    body: JSON.stringify(payload),
    token,
  });
}

export async function uploadChatAttachment(file, token) {
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch(
    `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/chat/attachments`,
    {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    }
  );
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data?.error || "Upload failed");
    error.status = response.status;
    error.data = data;
    throw error;
  }
  return data;
}

export function markChatRead(conversationId, token) {
  return apiFetch("/chat/mark-read", {
    method: "PATCH",
    body: JSON.stringify({ conversation_id: conversationId }),
    token,
  });
}

export function getChatUnreadCount(token) {
  return apiFetch("/chat/unread-count", { token });
}
