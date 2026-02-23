import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { recipes } from "../data/recipes";

function Recipes() {
  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-cream text-ink">
        <div className="mx-auto max-w-6xl px-6 pb-20 pt-16">
          <div className="grid items-end gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <span className="inline-flex items-center rounded-full bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-muted">
                Recipes
              </span>
              <h1 className="mt-6 font-display text-4xl text-ink sm:text-5xl">
                Fast, feel-good meals that make healthy feel effortless.
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-muted">
                Catchy, cozy, and low-stress recipes designed for real life. Minimal time,
                maximal flavor, and calm energy.
              </p>
            </div>
            <div className="rounded-3xl bg-white/85 p-6 shadow-soft">
              <p className="text-xs uppercase tracking-[0.3em] text-muted">Quick pick</p>
              <h2 className="mt-3 font-display text-2xl">
                {recipes[0].title}
              </h2>
              <p className="mt-3 text-sm text-muted">
                {recipes[0].tagline} {recipes[0].calories} · {recipes[0].time}
              </p>
              <Link
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink"
                to={`/recipes/${recipes[0].id}`}
              >
                View recipe ->
              </Link>
            </div>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe) => (
              <article
                key={recipe.id}
                className="rounded-3xl bg-white/90 p-6 shadow-soft transition-transform hover:-translate-y-1"
              >
                <Link to={`/recipes/${recipe.id}`}>
                  <img
                    className="h-48 w-full rounded-2xl object-cover"
                    src={recipe.heroImage}
                    alt={recipe.title}
                  />
                </Link>
                <div className="mt-6">
                  <span className="inline-flex rounded-full bg-ink/10 px-3 py-1 text-xs font-semibold text-ink">
                    {recipe.time}
                  </span>
                  <Link to={`/recipes/${recipe.id}`}>
                    <h3 className="mt-4 font-display text-2xl text-ink">{recipe.title}</h3>
                  </Link>
                  <p className="mt-3 text-sm text-muted">{recipe.tagline}</p>
                  <div className="mt-5 flex items-center justify-between text-xs text-muted">
                    <span>{recipe.calories}</span>
                    <span>Serves {recipe.serves}</span>
                  </div>
                  <Link
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink"
                    to={`/recipes/${recipe.id}`}
                  >
                    See steps ->
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Recipes;
