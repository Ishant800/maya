import React from "react";
import { Link } from "react-router-dom";

function AdminSettings() {
  return (
    <div className="space-y-8">
      <div className="rounded-3xl bg-white/95 p-6 shadow-lg">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Admin Settings</p>
        <h2 className="mt-4 font-display text-2xl text-ink">Studio Preferences</h2>
        <p className="mt-3 text-sm text-muted">
          Control publishing workflow, team access, and notifications.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {[
          "Publishing approvals: Enabled",
          "Team seats: 3 active",
          "Notifications: Weekly digest",
          "Security: 2FA recommended",
        ].map((item) => (
          <div key={item} className="rounded-3xl bg-white/95 p-6 shadow-lg">
            <p className="text-sm text-muted">{item}</p>
          </div>
        ))}
      </div>

      <Link
        to="/admin"
        className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream shadow-lg"
      >
        Back to admin dashboard
      </Link>
    </div>
  );
}

export default AdminSettings;
