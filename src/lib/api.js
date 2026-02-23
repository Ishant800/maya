const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

export function getApiBase() {
  return API_BASE;
}

export async function apiFetch(path, options = {}) {
  const { token, headers: inputHeaders, ...rest } = options;
  const headers = {
    "Content-Type": "application/json",
    ...(inputHeaders || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...rest,
    headers,
  });

  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : null;

  if (!response.ok) {
    const error = new Error(data?.error || "Request failed");
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}
