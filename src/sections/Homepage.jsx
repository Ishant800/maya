import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import heroImage from "../assets/veg.jpg";
import softBg from "../assets/bg.png";
import { blogs as fallbackBlogs } from "../data/blogs";
import { recipes } from "../data/recipes";
import { listBlogPosts } from "../lib/blogApi";
import { mapPostToBlog } from "../lib/blogMapper";

const heroStats = [
  { label: "Clients supported", value: "1,200+" },
  { label: "Avg. adherence", value: "88%" },
  { label: "Programs delivered", value: "40+" },
];

const services = [
  {
    title: "Personalized Meal Plans",
    body: "Plans tailored to your lifestyle, schedule, and health goals.",
  },
  {
    title: "Macro & Habit Coaching",
    body: "Simple tracking and habit support without overwhelm.",
  },
  {
    title: "Medical Nutrition Support",
    body: "Evidence-based guidance for specific health conditions.",
  },
  {
    title: "Family & Lifestyle Nutrition",
    body: "Balanced routines that work for households and busy days.",
  },
];

const programs = [
  {
    title: "Calm Energy Reset",
    category: "6-Week Program",
    summary: "Build steady energy with balanced plates and gentle routines.",
  },
  {
    title: "Balanced Plate Method",
    category: "Foundations",
    summary: "Learn a simple plate formula that supports your goals every day.",
  },
  {
    title: "Mindful Eating Lab",
    category: "Coaching Series",
    summary: "Shift from restriction to trust with guided weekly check-ins.",
  },
];

const processSteps = [
  {
    label: "01",
    title: "Discovery",
    body: "We start with your goals, health history, and lifestyle rhythms.",
  },
  {
    label: "02",
    title: "Personal Plan",
    body: "Get a clear, flexible plan built around foods you love.",
  },
  {
    label: "03",
    title: "Support & Progress",
    body: "Ongoing check-ins to keep you consistent and confident.",
  },
];

const testimonials = [
  {
    quote: "I stopped skipping meals and finally feel steady energy all day.",
    name: "Priya M.",
    role: "Client",
  },
  {
    quote: "The plan felt realistic. No guilt, just calm structure.",
    name: "Jonas R.",
    role: "Client",
  },
  {
    quote: "I love how simple the plate method is. It actually sticks.",
    name: "Avery L.",
    role: "Client",
  },
];

const successStories = [
  {
    name: "Nadia S.",
    goal: "Energy + meal consistency",
    before: "Skipped breakfast, afternoon crashes, irregular meals.",
    after: "Regular meals, stable energy, fewer cravings after 3 weeks.",
    highlight: "Lost the afternoon slump in 10 days.",
  },
  {
    name: "Carlos M.",
    goal: "Weight management",
    before: "Yo-yo dieting with strict rules and burnout.",
    after: "Sustainable plate method, steady weight loss, no guilt.",
    highlight: "Down 7 lbs while eating foods he enjoys.",
  },
  {
    name: "Leah K.",
    goal: "Gut health",
    before: "Bloating, low appetite, inconsistent meals.",
    after: "Gentle gut reset meals, better digestion, calmer routine.",
    highlight: "No more evening bloating after week 4.",
  },
];

const faqs = [
  {
    question: "Do you create custom meal plans?",
    answer: "Yes, every plan is personalized to your preferences and goals.",
  },
  {
    question: "Do I need to count calories?",
    answer: "No. We focus on balance, hunger cues, and sustainable routines.",
  },
  {
    question: "How often are check-ins?",
    answer: "Weekly or bi-weekly, depending on your plan and needs.",
  },
];

function Homepage() {
  const [blogItems, setBlogItems] = React.useState(fallbackBlogs);
  const [blogNote, setBlogNote] = React.useState("Curated posts");
  const [storyIndex, setStoryIndex] = React.useState(0);

  React.useEffect(() => {
    let active = true;

    const loadPosts = async () => {
      try {
        const posts = await listBlogPosts();
        if (!active) return;
        const mapped = (posts || [])
          .filter((post) => post.status === "published")
          .map(mapPostToBlog)
          .filter(Boolean);
        if (mapped.length) {
          setBlogItems(mapped);
          setBlogNote("Latest from Maya");
        } else {
          setBlogItems(fallbackBlogs);
          setBlogNote("Curated posts");
        }
      } catch (error) {
        if (!active) return;
        setBlogItems(fallbackBlogs);
        setBlogNote("Curated posts");
      }
    };

    loadPosts();
    return () => {
      active = false;
    };
  }, []);

  const currentStory = successStories[storyIndex];

  const goPrev = () => {
    setStoryIndex((prev) => (prev - 1 + successStories.length) % successStories.length);
  };

  const goNext = () => {
    setStoryIndex((prev) => (prev + 1) % successStories.length);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-cream text-ink">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img
            src={softBg}
            alt="Soft background texture"
            className="h-full w-full object-cover opacity-60"
          />
        </div>

        <section className="px-6 pt-20">
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <span className="inline-flex rounded-full bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-muted shadow-soft">
                Maya Nutrition
              </span>
              <h1 className="font-display text-4xl text-ink sm:text-5xl">
                Calm, personalized nutrition support that fits real life.
              </h1>
              <p className="max-w-xl text-lg text-muted">
                Work with a registered nutritionist to build steady energy, balanced
                plates, and habits you can actually keep.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/auth/createaccount"
                  className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream shadow-lg"
                >
                  Start your plan
                </Link>
                <Link
                  to="/blogs"
                  className="rounded-full bg-white/90 px-6 py-3 text-sm font-semibold text-ink shadow-soft"
                >
                  Read nutrition tips
                </Link>
              </div>
              <div className="grid gap-4 pt-4 sm:grid-cols-3">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl bg-white/90 p-4 shadow-soft">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted">
                      {stat.label}
                    </p>
                    <p className="mt-2 font-display text-2xl text-ink">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6">
              <div className="relative overflow-hidden rounded-3xl bg-white/90 p-4 shadow-xl">
                <img
                  src={heroImage}
                  alt="Fresh nutrition prep"
                  className="h-72 w-full rounded-2xl object-cover"
                />
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted">
                      Signature program
                    </p>
                    <p className="mt-2 font-display text-xl text-ink">Calm Energy Reset</p>
                  </div>
                  <span className="rounded-full bg-cream/80 px-4 py-2 text-xs font-semibold text-ink">
                    +24% steadier energy
                  </span>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-ink p-6 text-cream shadow-xl">
                  <p className="text-xs uppercase tracking-[0.2em] text-cream/70">Result</p>
                  <p className="mt-3 text-3xl font-display">+18%</p>
                  <p className="mt-2 text-sm text-cream/70">
                    improvement in consistent meals
                  </p>
                </div>
                <div className="rounded-3xl bg-white/90 p-6 shadow-xl">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted">Timeline</p>
                  <p className="mt-3 text-3xl font-display text-ink">6 weeks</p>
                  <p className="mt-2 text-sm text-muted">foundation, plan, support</p>
                </div>
              </div>
            </div>
          </div>
        </section>

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

        <section className="px-6 py-16">
          <div className="mx-auto max-w-6xl rounded-3xl bg-white/95 p-8 shadow-xl">
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted">
                  Credentials
                </p>
                <h2 className="mt-3 font-display text-3xl text-ink">
                  Evidence-based guidance from a registered nutritionist
                </h2>
                <p className="mt-3 text-sm text-muted">
                  Maya is a registered nutritionist with clinical training, combining
                  science-backed nutrition therapy with compassionate coaching.
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-cream/70 p-4 text-sm text-muted">
                    MSc in Clinical Nutrition
                  </div>
                  <div className="rounded-2xl bg-cream/70 p-4 text-sm text-muted">
                    8+ years of client care
                  </div>
                  <div className="rounded-2xl bg-cream/70 p-4 text-sm text-muted">
                    Certified Diabetes Educator
                  </div>
                  <div className="rounded-2xl bg-cream/70 p-4 text-sm text-muted">
                    Personalized care plans
                  </div>
                </div>
              </div>
              <div className="rounded-3xl bg-ink p-6 text-cream shadow-xl">
                <p className="text-xs uppercase tracking-[0.2em] text-cream/70">Specialties</p>
                <ul className="mt-4 space-y-3 text-sm text-cream/80">
                  <li>Gut health and digestion</li>
                  <li>Hormonal balance</li>
                  <li>Weight management without restriction</li>
                  <li>Metabolic health support</li>
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

        
        <section className="px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs uppercase tracking-[0.3em] text-muted">Who this is for</p>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-6">
              <h2 className="font-display text-3xl text-ink">
                Support for real life schedules
              </h2>
              <Link
                to="/auth/createaccount"
                className="rounded-full bg-white/90 px-5 py-2 text-sm font-semibold text-ink shadow-soft"
              >
                Start with Maya
              </Link>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Busy professionals",
                  body: "Quick meals, smart grocery lists, and calm routines.",
                },
                {
                  title: "Parents & families",
                  body: "Family-friendly plans that everyone can enjoy.",
                },
                {
                  title: "Health reset seekers",
                  body: "A gentle restart that feels supportive, not restrictive.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-3xl bg-white/95 p-6 shadow-lg">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted">{item.title}</p>
                  <p className="mt-4 text-sm text-muted">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section><section className="px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs uppercase tracking-[0.3em] text-muted">Programs</p>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-6">
              <h2 className="font-display text-3xl text-ink">Current offerings</h2>
              <Link
                to="/blogs"
                className="rounded-full bg-white/90 px-5 py-2 text-sm font-semibold text-ink shadow-soft"
              >
                See nutrition blog
              </Link>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {programs.map((program) => (
                <article key={program.title} className="rounded-3xl bg-white/95 p-6 shadow-lg">
                  <div className="relative overflow-hidden rounded-2xl">
                    <img
                      src={heroImage}
                      alt={program.title}
                      className="h-44 w-full object-cover"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink">
                      {program.category}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl text-ink">{program.title}</h3>
                  <p className="mt-3 text-sm text-muted">{program.summary}</p>
                  <Link
                    to="/blogs"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink"
                  >
                    Learn more -
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 rounded-3xl bg-white/95 p-8 shadow-xl lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted">Weekly Planner</p>
                <h2 className="mt-3 font-display text-3xl text-ink">
                  A preview of your weekly meal flow
                </h2>
                <p className="mt-3 text-sm text-muted">
                  See how breakfast, lunch, dinner, and snacks are organized to keep
                  your week calm and consistent.
                </p>
                <ul className="mt-6 space-y-2 text-sm text-muted">
                  <li>Balanced plate guidance for every day</li>
                  <li>Prep steps to save time</li>
                  <li>Flexible swaps based on your schedule</li>
                </ul>
                <Link
                  to="/meal-plan"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-cream/80 px-5 py-2 text-sm font-semibold text-ink shadow-soft"
                >
                  See the full planner -
                </Link>
              </div>
              <div className="grid gap-4">
                {["Monday", "Wednesday", "Friday"].map((day) => (
                  <div key={day} className="rounded-2xl bg-cream/70 p-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted">{day}</p>
                    <div className="mt-3 grid gap-2 text-sm text-muted">
                      <p>Breakfast: Oat bowl + berries</p>
                      <p>Lunch: Grain bowl + roasted veggies</p>
                      <p>Dinner: Salmon + greens + quinoa</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 rounded-3xl bg-white/90 p-8 shadow-xl lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted">Process</p>
                <h2 className="mt-3 font-display text-3xl text-ink">
                  A simple path to sustainable change
                </h2>
                <p className="mt-3 text-sm text-muted">
                  We combine nutrition science with realistic habits so progress feels
                  calm and steady.
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

        <section className="px-6 py-16">
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted">Before & After</p>
                <h2 className="mt-3 font-display text-3xl text-ink">
                  Small changes, big shifts
                </h2>
                <p className="mt-2 text-sm text-muted">
                  Real client progress snapshots from the first 4-6 weeks.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={goPrev}
                  className="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-ink shadow-soft"
                >
                  Prev
                </button>
                <button
                  type="button"
                  onClick={goNext}
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
                  <h3 className="mt-3 font-display text-2xl text-ink">
                    {currentStory.name}
                  </h3>
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
                    onClick={() => setStoryIndex(index)}
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

        <section className="px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted">Blog</p>
                <h2 className="mt-3 font-display text-3xl text-ink">Nutrition tips</h2>
                <p className="mt-2 text-sm text-muted">{blogNote}</p>
              </div>
              <Link
                to="/blogs"
                className="rounded-full bg-white/90 px-5 py-2 text-sm font-semibold text-ink shadow-soft"
              >
                View all posts
              </Link>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {blogItems.slice(0, 3).map((blog) => (
                <article key={blog.id} className="rounded-3xl bg-white/95 p-6 shadow-lg">
                  <div className="relative overflow-hidden rounded-2xl">
                    <img
                      src={blog.heroImage}
                      alt={blog.title}
                      className="h-40 w-full object-cover"
                    />
                  </div>
                  <h3 className="mt-4 font-display text-xl text-ink">{blog.title}</h3>
                  <p className="mt-3 text-sm text-muted">{blog.summary}</p>
                  <Link
                    to={`/blogs/${blog.id}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink"
                  >
                    Read more -
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted">Recipes</p>
                <h2 className="mt-3 font-display text-3xl text-ink">Simple, nourishing recipes</h2>
                <p className="mt-2 text-sm text-muted">
                  Quick meals designed for energy, balance, and comfort.
                </p>
              </div>
              <Link
                to="/recipes"
                className="rounded-full bg-white/90 px-5 py-2 text-sm font-semibold text-ink shadow-soft"
              >
                Browse recipes
              </Link>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {recipes.slice(0, 3).map((recipe) => (
                <article key={recipe.id} className="rounded-3xl bg-white/95 p-6 shadow-lg">
                  <div className="relative overflow-hidden rounded-2xl">
                    <img
                      src={recipe.heroImage}
                      alt={recipe.title}
                      className="h-40 w-full object-cover"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink">
                      {recipe.time}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-xl text-ink">{recipe.title}</h3>
                  <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted">
                    {recipe.calories}
                  </p>
                  <p className="mt-3 text-sm text-muted">{recipe.tagline}</p>
                  <Link
                    to={`/recipes/${recipe.id}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink"
                  >
                    View recipe -
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted">Meet the nutritionists</p>
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
              {[
                {
                  name: "Maya Sharma, RD",
                  specialty: "Gut health + metabolic balance",
                  image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80",
                },
                {
                  name: "Alina Torres, MSc",
                  specialty: "Hormonal balance + energy",
                  image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
                },
                {
                  name: "Chris Patel, CDE",
                  specialty: "Sustainable weight management",
                  image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
                },
              ].map((member) => (
                <div
                  key={member.name}
                  className="group rounded-3xl bg-white/95 p-6 shadow-lg transition hover:-translate-y-1"
                >
                  <div className="relative overflow-hidden rounded-2xl">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-48 w-full object-cover"
                    />
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
              <div>
                <p className="text-sm font-semibold text-ink">Services</p>
                <p className="mt-3 text-sm text-muted">Meal plans</p>
                <p className="mt-2 text-sm text-muted">Coaching</p>
                <p className="mt-2 text-sm text-muted">Nutrition support</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-ink">Resources</p>
                <p className="mt-3 text-sm text-muted">Blog</p>
                <p className="mt-2 text-sm text-muted">Recipes</p>
                <p className="mt-2 text-sm text-muted">FAQ</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-ink">Company</p>
                <p className="mt-3 text-sm text-muted">Privacy</p>
                <p className="mt-2 text-sm text-muted">Terms</p>
                <p className="mt-2 text-sm text-muted">Contact</p>
              </div>
            </div>
            <div className="mt-10 text-center text-xs text-muted">
              © {new Date().getFullYear()} Maya Nutrition. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Homepage;


