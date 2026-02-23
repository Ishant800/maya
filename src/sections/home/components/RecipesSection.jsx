import { Link } from "react-router-dom";

function RecipesSection({ recipes }) {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted">Recipes</p>
            <h2 className="mt-3 font-display text-3xl text-ink">Simple, nourishing recipes</h2>
            <p className="mt-2 text-sm text-muted">
              Quick meals designed for energy, balance, and comfort.
            </p>
          </div>
          <Link
            to="/recipes"
            className="rounded-full bg-white/90 px-5 py-2 text-sm font-semibold text-ink shadow-soft"
          >
            Browse recipes
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {recipes.slice(0, 3).map((recipe) => (
            <article key={recipe.id} className="rounded-3xl bg-white/95 p-6 shadow-lg">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={recipe.heroImage}
                  alt={recipe.title}
                  className="h-40 w-full object-cover"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink">
                  {recipe.time}
                </span>
              </div>
              <h3 className="mt-4 font-display text-xl text-ink">{recipe.title}</h3>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted">
                {recipe.calories}
              </p>
              <p className="mt-3 text-sm text-muted">{recipe.tagline}</p>
              <Link
                to={`/recipes/${recipe.id}`}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink"
              >
                View recipe -
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RecipesSection;

