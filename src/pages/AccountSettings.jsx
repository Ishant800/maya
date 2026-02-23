import React from "react";

function AccountSettings() {
  return (
    <div className="rounded-3xl bg-white/95 p-8 shadow-lg">
      <p className="text-xs uppercase tracking-[0.3em] text-muted">Account Settings</p>
      <h1 className="mt-3 font-display text-3xl text-ink">Personalize Your Plan</h1>
      <p className="mt-3 text-sm text-muted">
        Update preferences, notifications, and plan details.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl bg-cream/70 p-5 text-sm text-muted">
          Nutrition focus: Balanced, steady energy
        </div>
        <div className="rounded-2xl bg-cream/70 p-5 text-sm text-muted">
          Notifications: Weekly summaries
        </div>
        <div className="rounded-2xl bg-cream/70 p-5 text-sm text-muted">
          Preferences: Plant-forward meals
        </div>
        <div className="rounded-2xl bg-cream/70 p-5 text-sm text-muted">
          Timezone: Local
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;
