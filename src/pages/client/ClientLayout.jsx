import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

const USER_KEY = "maya_auth_user";

const navItems = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/profile", label: "Profile" },
  { to: "/meal-plan", label: "Meal Plan" },
  { to: "/activity", label: "Recent Activity" },
  { to: "/notifications", label: "Notifications" },
  { to: "/dashboard#chat", label: "Chat" },
  { to: "/account", label: "Account Settings" },
];

function ClientLayout() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const raw = localStorage.getItem(USER_KEY);
    setUser(raw ? JSON.parse(raw) : null);
  }, []);

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
                Client Space
              </p>
            </div>
          </div>

          <nav className="mt-10 space-y-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/dashboard"}
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

          <div className="mt-auto rounded-2xl bg-cream/70 p-4 text-sm text-muted shadow-soft">
            Stay steady. Small rituals build lasting results.
          </div>
        </aside>

        <div className="flex flex-1 flex-col">
          <header className="bg-white/80 px-6 py-5 shadow-lg">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted">
                  Client Dashboard
                </p>
                <h1 className="font-display text-2xl text-ink">
                  Welcome back{user?.name ? `, ${user.name}` : ""}
                </h1>
              </div>
              <Link
                to="/meal-plan"
                className="rounded-full bg-ink px-5 py-2 text-sm font-semibold text-cream shadow-lg"
              >
                View Meal Plan
              </Link>
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

export default ClientLayout;
