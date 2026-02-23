import React from "react";
import Navbar from "../components/Navbar";
import {
  listNotifications,
  markNotificationsRead,
} from "../lib/notificationsApi";

const TOKEN_KEY = "maya_auth_token";
const LEGACY_TOKEN_KEY = "maya_admin_token";

function readToken() {
  return localStorage.getItem(TOKEN_KEY) || localStorage.getItem(LEGACY_TOKEN_KEY) || "";
}

function formatDateTime(value) {
  if (!value) return "Just now";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Just now";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function Notifications() {
  const [token, setToken] = React.useState(() => readToken());
  const [notifications, setNotifications] = React.useState([]);
  const [status, setStatus] = React.useState({ type: "idle", message: "" });

  const refresh = React.useCallback(async () => {
    if (!token) return;
    try {
      const data = await listNotifications(token);
      setNotifications(data || []);
    } catch (error) {
      setStatus({ type: "error", message: "Could not load notifications." });
    }
  }, [token]);

  React.useEffect(() => {
    refresh();
  }, [refresh]);

  React.useEffect(() => {
    const handleStorage = () => {
      setToken(readToken());
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  React.useEffect(() => {
    const handleNew = (event) => {
      if (!event?.detail) return;
      setNotifications((prev) => [event.detail, ...prev]);
    };
    window.addEventListener("maya-notification", handleNew);
    return () => window.removeEventListener("maya-notification", handleNew);
  }, []);

  const handleMarkAll = async () => {
    if (!token) return;
    try {
      await markNotificationsRead({ all: true }, token);
      setNotifications((prev) =>
        prev.map((item) => ({
          ...item,
          is_read: true,
          read_at: item.read_at || new Date().toISOString(),
        }))
      );
      window.dispatchEvent(
        new CustomEvent("maya-notification-read", { detail: { unread: 0 } })
      );
    } catch (error) {
      setStatus({ type: "error", message: "Could not mark all as read." });
    }
  };

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-cream text-ink">
        <div className="mx-auto max-w-5xl px-6 pb-20 pt-10">
          <div className="rounded-3xl bg-white/90 p-8 shadow-soft">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted">
                  Notifications
                </p>
                <h1 className="mt-2 font-display text-3xl text-ink">
                  Your updates from Maya
                </h1>
              </div>
              <button
                type="button"
                onClick={handleMarkAll}
                className="rounded-full border border-ink/20 bg-cream/70 px-5 py-2 text-xs font-semibold text-ink"
              >
                Mark all as read
              </button>
            </div>

            {status.message && (
              <div className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
                {status.message}
              </div>
            )}

            {!token && (
              <div className="mt-6 rounded-2xl bg-cream/70 px-5 py-4 text-sm text-muted">
                Sign in to view your notifications.
              </div>
            )}

            {token && notifications.length === 0 && (
              <div className="mt-6 rounded-2xl bg-cream/70 px-5 py-4 text-sm text-muted">
                No notifications yet. Subscribe to a nutritionist to get updates.
              </div>
            )}

            <div className="mt-6 space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification._id || notification.id}
                  className={`rounded-2xl border px-5 py-4 text-sm shadow-soft ${
                    notification.is_read
                      ? "border-ink/10 bg-white"
                      : "border-lime/40 bg-lime/10"
                  }`}
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-muted">
                    {notification.title || "Update"}
                  </p>
                  <p className="mt-2 text-base text-ink">
                    {notification.message || "A new update is waiting for you."}
                  </p>
                  <p className="mt-2 text-xs text-muted">
                    {formatDateTime(notification.created_at || notification.createdAt)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Notifications;
