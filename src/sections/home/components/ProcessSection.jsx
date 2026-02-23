function ProcessSection({ processSteps }) {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 rounded-3xl bg-white/90 p-8 shadow-xl lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted">Process</p>
            <h2 className="mt-3 font-display text-3xl text-ink">
              A simple path to sustainable change
            </h2>
            <p className="mt-3 text-sm text-muted">
              We combine nutrition science with realistic habits so progress feels calm
              and steady.
            </p>
          </div>
          <div className="grid gap-4">
            {processSteps.map((step) => (
              <div key={step.label} className="rounded-2xl bg-cream/60 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-muted">
                  {step.label} · {step.title}
                </p>
                <p className="mt-2 text-sm text-muted">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProcessSection;

