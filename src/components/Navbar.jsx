import React from "react";
import { Link } from "react-router-dom";
import { getUnreadCount } from "../lib/notificationsApi";
import {
  connectNotifications,
  disconnectNotifications,
} from "../lib/notificationsSocket";

const TOKEN_KEY = "maya_auth_token";
const LEGACY_TOKEN_KEY = "maya_admin_token";
const USER_KEY = "maya_auth_user";
const FALLBACK_AVATAR =
  "https://i.pravatar.cc/100?u=maya-nutrition-anon";

function parseJwt(token) {
  try {
    const payload = token.split(".")[1];
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decoded);
  } catch (error) {
    return null;
  }
}

function readToken() {
  return localStorage.getItem(TOKEN_KEY) || localStorage.getItem(LEGACY_TOKEN_KEY) || "";
}

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [auth, setAuth] = React.useState({ token: "", user: null });
  const [unreadCount, setUnreadCount] = React.useState(0);

  React.useEffect(() => {
    const token = readToken();
    const userRaw = localStorage.getItem(USER_KEY);
    const user = userRaw ? JSON.parse(userRaw) : null;
    setAuth({ token, user });

    const handleStorage = () => {
      const nextToken = readToken();
      const nextUserRaw = localStorage.getItem(USER_KEY);
      const nextUser = nextUserRaw ? JSON.parse(nextUserRaw) : null;
      setAuth({ token: nextToken, user: nextUser });
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(LEGACY_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setAuth({ token: "", user: null });
  };

  const tokenInfo = auth.token ? parseJwt(auth.token) : null;
  const avatarUrl =
    auth.user?.profile_image_url ||
    auth.user?.avatarUrl ||
    auth.user?.avatar ||
    FALLBACK_AVATAR;
  const role = (auth.user?.role || tokenInfo?.role || "visitor").toLowerCase();
  const email = auth.user?.email || tokenInfo?.email || "";

  React.useEffect(() => {
    if (!auth.token || !email) {
      setUnreadCount(0);
      disconnectNotifications();
      return;
    }

    connectNotifications(email);
    getUnreadCount(auth.token)
      .then((data) => setUnreadCount(Number(data?.unread || 0)))
      .catch(() => {});

    const handleNew = () => {
      setUnreadCount((prev) => prev + 1);
    };

    const handleRead = (event) => {
      if (typeof event?.detail?.unread === "number") {
        setUnreadCount(event.detail.unread);
      }
    };

    window.addEventListener("maya-notification", handleNew);
    window.addEventListener("maya-notification-read", handleRead);
    return () => {
      window.removeEventListener("maya-notification", handleNew);
      window.removeEventListener("maya-notification-read", handleRead);
    };
  }, [auth.token, email]);

  return (
    <header className="sticky top-0 z-50 bg-cream backdrop-blur-lg">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-ink font-display text-lg text-cream">
            M
          </div>
          <div>
            <p className="font-display text-xl">Maya</p>
            <p className="text-xs uppercase tracking-[0.3em] text-muted">diet plan studio</p>
          </div>
        </Link>
        
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted md:flex">
          <Link className="transition-colors hover:text-ink" to="/about">
            About Us
          </Link>
          <Link className="transition-colors hover:text-ink" to="/blogs">
            The Blog
          </Link>
        </nav>
        
        <div className="relative flex items-center gap-3">
          {!auth.token ? (
            <Link
              to="/auth/signin"
              className="rounded-full border border-ink/20 bg-white/50 px-6 py-2.5 text-sm font-semibold text-ink backdrop-blur-sm transition-all hover:border-ink hover:bg-white/80"
            >
              Sign in
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/notifications"
                className="relative z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-white/80 text-ink shadow-soft transition hover:bg-white"
                aria-label="View notifications"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M12 2a7 7 0 00-7 7v3.086l-.707.707A1 1 0 005 14h14a1 1 0 00.707-1.707L19 12.086V9a7 7 0 00-7-7zm0 20a3 3 0 003-3H9a3 3 0 003 3z" />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-ink px-1 text-[10px] font-bold text-cream">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </Link>

              <div
                className="relative"
                onMouseEnter={() => setIsMenuOpen(true)}
                onMouseLeave={() => setIsMenuOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setIsMenuOpen((prev) => !prev)}
                  className="flex items-center gap-2 rounded-full bg-white/70 p-1.5 shadow-lg transition hover:shadow-xl"
                >
                  <img
                    src={avatarUrl}
                    alt="Profile"
                    className="h-9 w-9 rounded-full object-cover"
                  />
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 top-full mt-3 w-60 rounded-2xl bg-white/95 p-2 shadow-2xl backdrop-blur z-50">
                    <div className="px-3 py-2 text-xs uppercase tracking-[0.2em] text-muted">
                      {role === "admin" ? "Admin Access" : "Member Access"}
                    </div>
                    <div className="my-2 h-px bg-slate-600/20" />

                    {role === "admin" ? (
                      <>
                        <Link
                          to="/admin"
                          className="block rounded-xl px-3 py-2 text-sm font-semibold text-ink hover:bg-cream/70"
                        >
                          Admin Dashboard
                        </Link>
                        <Link
                          to="/admin/blogs"
                          className="block rounded-xl px-3 py-2 text-sm text-ink hover:bg-cream/70"
                        >
                          Blog Manager
                        </Link>
                        <Link
                          to="/admin/settings"
                          className="block rounded-xl px-3 py-2 text-sm text-ink hover:bg-cream/70"
                        >
                          Account Settings
                        </Link>
                        <Link
                          to="/blogs"
                          className="block rounded-xl px-3 py-2 text-sm text-ink hover:bg-cream/70"
                        >
                          View Blog
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/dashboard"
                          className="block rounded-xl px-3 py-2 text-sm font-semibold text-ink hover:bg-cream/70"
                        >
                          Dashboard
                        </Link>
                        <Link
                          to="/profile"
                          className="block rounded-xl px-3 py-2 text-sm text-ink hover:bg-cream/70"
                        >
                          Profile
                        </Link>
                        <Link
                          to="/meal-plan"
                          className="block rounded-xl px-3 py-2 text-sm text-ink hover:bg-cream/70"
                        >
                          Meal Plan
                        </Link>
                        <Link
                          to="/activity"
                          className="block rounded-xl px-3 py-2 text-sm text-ink hover:bg-cream/70"
                        >
                          Recent Activity
                        </Link>
                        <Link
                          to="/account"
                          className="block rounded-xl px-3 py-2 text-sm text-ink hover:bg-cream/70"
                        >
                          Account Settings
                        </Link>
                      </>
                    )}

                    <div className="my-2 h-px bg-slate-600/20" />
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full rounded-xl px-3 py-2 text-left text-sm text-ink hover:bg-cream/70"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="h-px bg-slate-600/40" />
    </header>
  );
}

export default Navbar;
