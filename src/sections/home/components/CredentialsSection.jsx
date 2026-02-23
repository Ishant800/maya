import { Link } from "react-router-dom";

function CredentialsSection({ credentials, specialties }) {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl rounded-3xl bg-white/95 p-8 shadow-xl">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted">Credentials</p>
            <h2 className="mt-3 font-display text-3xl text-ink">
              Evidence-based guidance from a registered nutritionist
            </h2>
            <p className="mt-3 text-sm text-muted">
              Maya is a registered nutritionist with clinical training, combining
              science-backed nutrition therapy with compassionate coaching.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {credentials.map((credential) => (
                <div key={credential} className="rounded-2xl bg-cream/70 p-4 text-sm text-muted">
                  {credential}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-ink p-6 text-cream shadow-xl">
            <p className="text-xs uppercase tracking-[0.2em] text-cream/70">Specialties</p>
            <ul className="mt-4 space-y-3 text-sm text-cream/80">
              {specialties.map((specialty) => (
                <li key={specialty}>{specialty}</li>
              ))}
            </ul>
            <Link
              to="/profile"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-lime px-5 py-2 text-sm font-semibold text-ink"
            >
              Meet Maya -
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CredentialsSection;
