function TestimonialsSection({ testimonials }) {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Client Stories</p>
        <h2 className="mt-3 font-display text-3xl text-ink">Results that feel real</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="rounded-3xl bg-white/95 p-6 shadow-lg">
              <p className="text-sm text-muted">"{testimonial.quote}"</p>
              <p className="mt-6 text-sm font-semibold text-ink">{testimonial.name}</p>
              <p className="text-xs text-muted">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;

