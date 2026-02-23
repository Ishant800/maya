import { Link } from "react-router-dom";

function HomeHero({ heroStats, heroImage }) {
  return (
    <section className="px-6 pt-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <span className="inline-flex rounded-full bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-muted shadow-soft">
            Maya Nutrition
          </span>
          <h1 className="font-display text-4xl text-ink sm:text-5xl">
            Calm, personalized nutrition support that fits real life.
          </h1>
          <p className="max-w-xl text-lg text-muted">
            Work with a registered nutritionist to build steady energy, balanced plates,
            and habits you can actually keep.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/auth/createaccount"
              className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream shadow-lg"
            >
              Start your plan
            </Link>
            <Link
              to="/blogs"
              className="rounded-full bg-white/90 px-6 py-3 text-sm font-semibold text-ink shadow-soft"
            >
              Read nutrition tips
            </Link>
          </div>
          <div className="grid gap-4 pt-4 sm:grid-cols-3">
            {heroStats.map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-white/90 p-4 shadow-soft">
                <p className="text-xs uppercase tracking-[0.2em] text-muted">{stat.label}</p>
                <p className="mt-2 font-display text-2xl text-ink">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          <div className="relative overflow-hidden rounded-3xl bg-white/90 p-4 shadow-xl">
            <img
              src={heroImage}
              alt="Fresh nutrition prep"
              className="h-72 w-full rounded-2xl object-cover"
            />
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted">
                  Signature program
                </p>
                <p className="mt-2 font-display text-xl text-ink">Calm Energy Reset</p>
              </div>
              <span className="rounded-full bg-cream/80 px-4 py-2 text-xs font-semibold text-ink">
                +24% steadier energy
              </span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-ink p-6 text-cream shadow-xl">
              <p className="text-xs uppercase tracking-[0.2em] text-cream/70">Result</p>
              <p className="mt-3 text-3xl font-display">+18%</p>
              <p className="mt-2 text-sm text-cream/70">improvement in consistent meals</p>
            </div>
            <div className="rounded-3xl bg-white/90 p-6 shadow-xl">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">Timeline</p>
              <p className="mt-3 text-3xl font-display text-ink">6 weeks</p>
              <p className="mt-2 text-sm text-muted">foundation, plan, support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeHero;
