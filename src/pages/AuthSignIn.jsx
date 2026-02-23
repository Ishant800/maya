import React from "react";
import Navbar from "../components/Navbar";
import SignIn from "../components/SignIn";

function AuthSignIn() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <Navbar />
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="glow glow-one" />
          <div className="glow glow-two" />
          <div className="grain" />
        </div>
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-muted">
              Welcome back
            </span>
            <h1 className="text-4xl font-display leading-tight text-ink sm:text-5xl">
              Your next calm week is already waiting.
            </h1>
            <p className="max-w-xl text-lg text-muted">
              Pick up your grocery list, check your plan, and keep moving with ease.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-ink/10 bg-white/70 p-4">
                <p className="text-sm font-semibold text-ink">Plan history</p>
                <p className="mt-2 text-sm text-muted">
                  See every week you built and reuse what worked best.
                </p>
              </div>
              <div className="rounded-2xl border border-ink/10 bg-white/70 p-4">
                <p className="text-sm font-semibold text-ink">Smart grocery</p>
                <p className="mt-2 text-sm text-muted">
                  Auto-sorted lists keep store trips fast and focused.
                </p>
              </div>
            </div>
          </div>
          <SignIn />
        </div>
      </div>
    </div>
  );
}

export default AuthSignIn;
