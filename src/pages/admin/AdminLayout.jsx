import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { to: "/admin", label: "Dashboard" },
  { to: "/admin/blogs", label: "Blog Posts" },
  { to: "/admin/settings", label: "Account Settings" },
];

function AdminLayout() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 flex-col bg-white/80 p-6 shadow-xl lg:flex">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-ink font-display text-xl text-cream">
              M
            </div>
            <div>
              <p className="font-display text-2xl text-ink">Maya</p>
              <p className="text-xs uppercase tracking-[0.2em] text-muted">
                Admin Console
              </p>
            </div>
          </div>

          <nav className="mt-10 space-y-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/admin"}
                className={({ isActive }) =>
                  `block rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-ink text-cream shadow-lg"
                      : "text-ink/70 hover:bg-cream/70 hover:text-ink"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto rounded-2xl border border-ink/10 bg-cream/70 p-4 text-sm text-muted">
            Keep the blog warm, simple, and nourishing. Draft when unsure, publish
            when ready.
          </div>
        </aside>

        <div className="flex flex-1 flex-col">
          <header className="bg-white/80 px-6 py-5 shadow-lg">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted">
                  Maya Admin
                </p>
                <h1 className="font-display text-2xl text-ink">Content Studio</h1>
              </div>
              <div className="flex items-center gap-3 rounded-full bg-cream/80 px-4 py-2 text-xs text-muted shadow-soft">
                <span className="h-2 w-2 rounded-full bg-lime" />
                Connected to Maya backend
              </div>
            </div>
          </header>

          <main className="flex-1 px-6 py-8">
            <div className="mx-auto w-full max-w-6xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
