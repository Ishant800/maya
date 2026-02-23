import { Link } from "react-router-dom";

function WeeklyPlannerSection({ plannerDays }) {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 rounded-3xl bg-white/95 p-8 shadow-xl lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted">Weekly Planner</p>
            <h2 className="mt-3 font-display text-3xl text-ink">
              A preview of your weekly meal flow
            </h2>
            <p className="mt-3 text-sm text-muted">
              See how breakfast, lunch, dinner, and snacks are organized to keep your week
              calm and consistent.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-muted">
              <li>Balanced plate guidance for every day</li>
              <li>Prep steps to save time</li>
              <li>Flexible swaps based on your schedule</li>
            </ul>
            <Link
              to="/meal-plan"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-cream/80 px-5 py-2 text-sm font-semibold text-ink shadow-soft"
            >
              See the full planner -
            </Link>
          </div>
          <div className="grid gap-4">
            {plannerDays.map((day) => (
              <div key={day} className="rounded-2xl bg-cream/70 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-muted">{day}</p>
                <div className="mt-3 grid gap-2 text-sm text-muted">
                  <p>Breakfast: Oat bowl + berries</p>
                  <p>Lunch: Grain bowl + roasted veggies</p>
                  <p>Dinner: Salmon + greens + quinoa</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WeeklyPlannerSection;

