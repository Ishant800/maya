import { Link } from "react-router-dom";

function TeamSection({ teamMembers }) {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted">
              Meet the nutritionists
            </p>
            <h2 className="mt-3 font-display text-3xl text-ink">
              A compassionate team, here for your goals
            </h2>
            <p className="mt-2 text-sm text-muted">
              Registered professionals with a calm, realistic approach to nourishment.
            </p>
          </div>
          <Link
            to="/auth/createaccount"
            className="rounded-full bg-white/90 px-5 py-2 text-sm font-semibold text-ink shadow-soft"
          >
            Book a session
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="group rounded-3xl bg-white/95 p-6 shadow-lg transition hover:-translate-y-1"
            >
              <div className="relative overflow-hidden rounded-2xl">
                <img src={member.image} alt={member.name} className="h-48 w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="absolute bottom-4 left-4 right-4 opacity-0 transition group-hover:opacity-100">
                  <button className="rounded-full bg-lime px-4 py-2 text-xs font-semibold text-ink shadow-lg">
                    Book an appointment
                  </button>
                </div>
              </div>
              <h3 className="mt-4 font-display text-xl text-ink">{member.name}</h3>
              <p className="mt-2 text-sm text-muted">{member.specialty}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TeamSection;

