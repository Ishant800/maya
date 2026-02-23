function HomeFooter({ footerColumns }) {
  return (
    <footer className="bg-white/90 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-ink font-display text-xl text-cream">
                M
              </div>
              <div>
                <p className="font-display text-2xl text-ink">Maya</p>
                <p className="text-sm text-muted">Nutrition & Meal Planning</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted">
              Personalized nutrition coaching for balanced, joyful living.
            </p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <p className="text-sm font-semibold text-ink">{column.title}</p>
              {column.links.map((link) => (
                <p key={link} className="mt-3 text-sm text-muted">
                  {link}
                </p>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-10 text-center text-xs text-muted">
          © {new Date().getFullYear()} Maya Nutrition. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default HomeFooter;
