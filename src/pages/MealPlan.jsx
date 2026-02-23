import React from "react";

function MealPlan() {
  return (
    <div>
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Meal Plan</p>
        <h1 className="mt-3 font-display text-3xl text-ink">Your Week at a Glance</h1>
        <p className="mt-3 text-sm text-muted">
          Balanced plates, gentle rhythms, and cozy meals.
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
          (day) => (
            <div key={day} className="rounded-3xl bg-white/95 p-6 shadow-lg">
              <p className="text-xs uppercase tracking-[0.3em] text-muted">{day}</p>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                <li>Breakfast: Warm oat bowl + berries</li>
                <li>Lunch: Grain bowl + roasted veggies</li>
                <li>Dinner: Salmon + greens + quinoa</li>
              </ul>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default MealPlan;
