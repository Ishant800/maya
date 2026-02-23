import React from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { recipes } from "../data/recipes";

function RecipeDetail() {
  const { recipeId } = useParams();
  const recipe = recipes.find((item) => item.id === recipeId) || recipes[0];

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-cream text-ink">
        <div className="mx-auto max-w-6xl px-6 pb-20 pt-12">
          <Link className="text-sm text-muted" to="/recipes">
            - Back to recipes
          </Link>

          <div className="mt-8 rounded-3xl bg-white/90 p-8 shadow-soft lg:p-12">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <span className="inline-flex rounded-full bg-ink/10 px-3 py-1 text-xs font-semibold text-ink">
                  {recipe.time}
                </span>
                <h1 className="mt-5 font-display text-4xl text-ink sm:text-5xl">
                  {recipe.title}
                </h1>
                <p className="mt-4 text-sm text-muted">
                  {recipe.tagline} • {recipe.calories} • Serves {recipe.serves}
                </p>

                <div className="mt-10 space-y-8 text-base leading-7 text-muted">
                  <div>
                    <h2 className="font-display text-2xl text-ink">Why it works</h2>
                    <p className="mt-3">
                      This recipe keeps prep simple and energy steady. It balances protein,
                      fiber, and fat so you stay satisfied without a heavy cleanup.
                    </p>
                  </div>

                  <div>
                    <h2 className="font-display text-2xl text-ink">Quick steps</h2>
                    <ol className="mt-3 list-decimal pl-5">
                      <li>Gather everything in one bowl or pan.</li>
                      <li>Layer textures: creamy base, crisp top, finishing drizzle.</li>
                      <li>Taste, adjust salt, and enjoy immediately.</li>
                    </ol>
                  </div>

                  <div className="rounded-2xl border border-amber-700/30 bg-amber-50/60 px-6 py-5">
                    <p className="font-display text-lg text-ink">
                      “Prepared in minutes, delicious for hours.”
                    </p>
                  </div>

                  <div>
                    <h2 className="font-display text-2xl text-ink">Make it yours</h2>
                    <p className="mt-3">
                      Swap in seasonal fruit, extra greens, or a spicy crunch. The goal is
                      a meal that feels exciting and easy to repeat.
                    </p>
                  </div>
                </div>
              </div>

              <aside className="space-y-6">
                <img
                  className="h-72 w-full rounded-3xl object-cover"
                  src={recipe.heroImage}
                  alt={recipe.title}
                />

                <div className="rounded-2xl bg-cream/60 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                    Ingredients (simple)
                  </p>
                  <ul className="mt-4 space-y-3 text-sm text-muted">
                    <li>1 cup base (yogurt, oats, or grains)</li>
                    <li>1/2 cup colorful fruit or veggies</li>
                    <li>1 tbsp crunch (seeds, nuts, or granola)</li>
                    <li>1 tsp flavor boost (citrus, herbs, spice)</li>
                  </ul>
                </div>

                <div className="rounded-2xl bg-white/90 p-6 shadow-soft">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                    Nutrition vibe
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {recipe.highlights.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-ink/10 px-3 py-1 text-xs font-semibold text-ink"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </aside>
            </div>

            <div className="mt-12 rounded-3xl bg-white/90 p-6 shadow-soft">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                    Need more fast meals?
                  </p>
                  <p className="mt-2 text-sm text-muted">
                    Save your favorites and get a fresh 2-minute recipe every week.
                  </p>
                </div>
                <button className="rounded-xl bg-ink px-6 py-3 text-sm font-semibold text-cream">
                  Get weekly recipes
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default RecipeDetail;
