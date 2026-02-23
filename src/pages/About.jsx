import React from "react";
import Navbar from "../components/Navbar";

const principals = [
  {
    name: "Maya Sharma",
    role: "Founder + Lead Nutritionist",
    image:
      "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Rohan Iyer",
    role: "Clinical Programs Director",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80",
  },
];

const services = [
  {
    title: "Habit Architecture",
    body: "We design tiny routines that reduce decision fatigue and keep nutrition steady.",
  },
  {
    title: "Metabolic Reset",
    body: "Energy-first plans grounded in labs, sleep rhythms, and real-life schedules.",
  },
  {
    title: "Meal Strategy",
    body: "Simple plate-building frameworks that make every meal feel doable.",
  },
  {
    title: "Progress Mapping",
    body: "Weekly guidance and adaptive goals that follow your body, not just numbers.",
  },
];

const socials = ["Vimeo", "Pinterest", "Facebook", "Instagram", "Twitter", "YouTube", "LinkedIn"];

function About() {
  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-cream text-ink">
        <div className="mx-auto max-w-6xl px-6 pb-24 pt-14">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted">About Maya</p>
              <h1 className="mt-4 font-display text-6xl leading-[0.9] text-ink sm:text-7xl">
                ABOUT
                <br />
                US
              </h1>
              <p className="mt-6 text-sm text-muted">
                Luxury nutrition planning with a calm, modern approach. We blend
                clinical insight with rituals that feel light and sustainable.
              </p>
              <p className="mt-4 text-sm text-muted">
                Modern elegance for your meals: balanced macros, comforting flavors,
                and routines that respect your lifestyle.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-[1.1fr_0.9fr]">
              <div className="overflow-hidden rounded-[28px] bg-white shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80"
                  alt="Nutrition planning"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="space-y-4">
                <div className="overflow-hidden rounded-[24px] bg-white shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=800&q=80"
                    alt="Balanced meals"
                    className="h-40 w-full object-cover sm:h-44"
                  />
                </div>
                <div className="rounded-[24px] bg-white/95 p-5 shadow-lg">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted">
                    Our Philosophy
                  </p>
                  <p className="mt-3 text-sm text-muted">
                    We design nutrition experiences that reflect your tastes, goals,
                    and energy needs. Calm, consistent, and deeply personal.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 rounded-[36px] bg-ink/10 p-8 shadow-xl lg:p-10">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted">Meet the principals</p>
                <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
                  The nutritionists shaping Maya
                </h2>
              </div>
              <p className="max-w-lg text-sm text-muted">
                Each program is built in-house, with clinical rigor and the warmth
                of a boutique wellness studio.
              </p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {principals.map((person) => (
                <div key={person.name} className="rounded-[28px] bg-white p-6 shadow-lg">
                  <div className="grid gap-6 sm:grid-cols-[0.9fr_1.1fr]">
                    <div className="overflow-hidden rounded-[22px]">
                      <img
                        src={person.image}
                        alt={person.name}
                        className="h-52 w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-muted">
                        {person.role}
                      </p>
                      <h3 className="mt-3 font-display text-2xl text-ink">
                        {person.name}
                      </h3>
                      <p className="mt-3 text-sm text-muted">
                        We oversee daily nutrition planning, clinical review, and the
                        creation of every custom roadmap.
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[32px] bg-white p-8 shadow-xl">
              <p className="text-xs uppercase tracking-[0.3em] text-muted">Our Services</p>
              <h2 className="mt-4 font-display text-3xl text-ink">What we do</h2>
              <p className="mt-4 text-sm text-muted">
                At Maya, each service is crafted to meet your energy needs,
                metabolism, and daily routine without overwhelm.
              </p>
              <div className="mt-8 grid gap-5">
                {services.map((service) => (
                  <div key={service.title} className="rounded-2xl border border-ink/10 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted">
                      {service.title}
                    </p>
                    <p className="mt-2 text-sm text-muted">{service.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="overflow-hidden rounded-[28px] bg-white shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80"
                  alt="Nutrition planning"
                  className="h-72 w-full object-cover"
                />
              </div>
              <div className="rounded-[28px] bg-ink p-6 text-cream shadow-xl">
                <p className="text-xs uppercase tracking-[0.3em] text-cream/70">
                  Project Management
                </p>
                <p className="mt-3 text-sm text-cream/80">
                  We handle weekly planning, grocery mapping, and coaching check-ins so
                  you can stay focused on your life.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-20 rounded-[36px] bg-ink px-8 py-10 text-cream shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-cream/70">
                  Let’s Stay Connected
                </p>
                <h2 className="mt-3 font-display text-4xl">Contacts + Us</h2>
              </div>
              <p className="max-w-md text-sm text-cream/70">
                We would love to help you design a calm, confident nutrition routine.
                Reach us anytime.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {socials.map((label) => (
                <span
                  key={label}
                  className="rounded-full border border-cream/40 px-4 py-2 text-xs uppercase tracking-[0.2em] text-cream/80"
                >
                  {label}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-cream/60">
              <p>We invite you to contact our team for more information.</p>
              <p>© 2026 Maya Nutrition Studio</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
