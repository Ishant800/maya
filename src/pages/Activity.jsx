import React from "react";

function Activity() {
  return (
    <div>
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Recent Activity</p>
        <h1 className="mt-3 font-display text-3xl text-ink">Momentum Log</h1>
        <p className="mt-3 text-sm text-muted">
          A gentle history of what you’ve completed.
        </p>
      </div>

      <div className="mt-8 space-y-4">
        {[
          "Completed breakfast check-in",
          "Saved a new snack ritual",
          "Reviewed weekly plan",
          "Completed hydration target",
        ].map((item, index) => (
          <div key={item} className="rounded-3xl bg-white/95 p-6 shadow-lg">
            <p className="text-xs uppercase tracking-[0.3em] text-muted">
              Step {index + 1}
            </p>
            <p className="mt-3 text-sm text-muted">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Activity;
