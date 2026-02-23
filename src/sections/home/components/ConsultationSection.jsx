function ConsultationSection() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white/95 p-10 shadow-2xl">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted">Book a call</p>
            <h2 className="mt-4 font-display text-3xl text-ink">
              Ready for a personalized nutrition plan?
            </h2>
            <p className="mt-3 text-sm text-muted">
              Share your goals and we will reach out with next steps and plan options.
            </p>
          </div>
          <form className="grid gap-4">
            <input
              className="w-full rounded-2xl bg-cream/70 px-4 py-3 text-sm shadow-soft"
              placeholder="Full name"
            />
            <input
              className="w-full rounded-2xl bg-cream/70 px-4 py-3 text-sm shadow-soft"
              placeholder="Email"
              type="email"
            />
            <input
              className="w-full rounded-2xl bg-cream/70 px-4 py-3 text-sm shadow-soft"
              placeholder="Primary goal"
            />
            <textarea
              className="w-full rounded-2xl bg-cream/70 px-4 py-3 text-sm shadow-soft"
              rows={4}
              placeholder="Tell us a bit about your routine"
            />
            <button
              type="button"
              className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream shadow-lg"
            >
              Request a consultation
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ConsultationSection;

