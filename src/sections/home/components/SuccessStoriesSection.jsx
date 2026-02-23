function SuccessStoriesSection({
  currentStory,
  storyIndex,
  successStories,
  onPrev,
  onNext,
  onSelect,
}) {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted">Before & After</p>
            <h2 className="mt-3 font-display text-3xl text-ink">Small changes, big shifts</h2>
            <p className="mt-2 text-sm text-muted">
              Real client progress snapshots from the first 4-6 weeks.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onPrev}
              className="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-ink shadow-soft"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={onNext}
              className="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-ink shadow-soft"
            >
              Next
            </button>
          </div>
        </div>

        <div className="mt-8 rounded-3xl bg-white/95 p-8 shadow-xl">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted">{currentStory.goal}</p>
              <h3 className="mt-3 font-display text-2xl text-ink">{currentStory.name}</h3>
              <p className="mt-4 text-sm text-muted">{currentStory.highlight}</p>
            </div>
            <div className="grid gap-4">
              <div className="rounded-2xl bg-cream/70 p-4 text-sm text-muted">
                <span className="text-xs uppercase tracking-[0.2em] text-muted">Before</span>
                <p className="mt-2">{currentStory.before}</p>
              </div>
              <div className="rounded-2xl bg-cream/70 p-4 text-sm text-muted">
                <span className="text-xs uppercase tracking-[0.2em] text-muted">After</span>
                <p className="mt-2">{currentStory.after}</p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            {successStories.map((story, index) => (
              <button
                key={story.name}
                type="button"
                onClick={() => onSelect(index)}
                className={`h-2 w-8 rounded-full transition ${
                  index === storyIndex ? "bg-ink" : "bg-ink/20"
                }`}
                aria-label={`View story ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SuccessStoriesSection;
