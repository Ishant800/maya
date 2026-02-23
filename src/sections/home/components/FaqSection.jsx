function FaqSection({ faqs }) {
  return (
    <section className="px-6 pb-20">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">FAQ</p>
        <h2 className="mt-3 font-display text-3xl text-ink">Your questions answered</h2>
        <div className="mt-8 space-y-4">
          {faqs.map((faq) => (
            <div key={faq.question} className="rounded-3xl bg-white/95 p-6 shadow-lg">
              <p className="text-sm font-semibold text-ink">{faq.question}</p>
              <p className="mt-2 text-sm text-muted">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FaqSection;

