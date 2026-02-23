import { Link } from "react-router-dom";

function ProgramsSection({ programs, heroImage }) {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Programs</p>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-6">
          <h2 className="font-display text-3xl text-ink">Current offerings</h2>
          <Link
            to="/blogs"
            className="rounded-full bg-white/90 px-5 py-2 text-sm font-semibold text-ink shadow-soft"
          >
            See nutrition blog
          </Link>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {programs.map((program) => (
            <article key={program.title} className="rounded-3xl bg-white/95 p-6 shadow-lg">
              <div className="relative overflow-hidden rounded-2xl">
                <img src={heroImage} alt={program.title} className="h-44 w-full object-cover" />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink">
                  {program.category}
                </span>
              </div>
              <h3 className="mt-4 font-display text-2xl text-ink">{program.title}</h3>
              <p className="mt-3 text-sm text-muted">{program.summary}</p>
              <Link
                to="/blogs"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink"
              >
                Learn more -
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProgramsSection;

