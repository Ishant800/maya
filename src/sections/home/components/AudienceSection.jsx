import { Link } from "react-router-dom";

function AudienceSection({ targetGroups }) {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Who this is for</p>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-6">
          <h2 className="font-display text-3xl text-ink">Support for real life schedules</h2>
          <Link
            to="/auth/createaccount"
            className="rounded-full bg-white/90 px-5 py-2 text-sm font-semibold text-ink shadow-soft"
          >
            Start with Maya
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {targetGroups.map((item) => (
            <div key={item.title} className="rounded-3xl bg-white/95 p-6 shadow-lg">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">{item.title}</p>
              <p className="mt-4 text-sm text-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AudienceSection;

