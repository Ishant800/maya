import { Link } from "react-router-dom";

function ServicesSection({ services }) {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted">Services</p>
            <h2 className="mt-3 font-display text-3xl text-ink">
              How we help you feel better
            </h2>
          </div>
          <Link
            to="/auth/signin"
            className="rounded-full bg-white/90 px-5 py-2 text-sm font-semibold text-ink shadow-soft"
          >
            Book a consultation
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <div key={service.title} className="rounded-3xl bg-white/95 p-6 shadow-lg">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">
                {service.title}
              </p>
              <p className="mt-4 text-sm text-muted">{service.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
