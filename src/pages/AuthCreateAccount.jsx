import React from "react";
import Navbar from "../components/Navbar";
import CreateAccount from "../components/CreateAccount";

function AuthCreateAccount() {
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
              Maya access
            </span>
            <h1 className="text-4xl font-display leading-tight text-ink sm:text-5xl">
              Build the account that keeps pace with your life.
            </h1>
            <p className="max-w-xl text-lg text-muted">
              Your nutrition plan stays flexible, your grocery flow stays calm, and
              your goals stay visible.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-ink/10 bg-white/70 p-4">
                <p className="text-sm font-semibold text-ink">Weekly rhythm</p>
                <p className="mt-2 text-sm text-muted">
                  Maya adapts meals to training days, travel, and busy shifts.
                </p>
              </div>
              <div className="rounded-2xl border border-ink/10 bg-white/70 p-4">
                <p className="text-sm font-semibold text-ink">Smart swaps</p>
                <p className="mt-2 text-sm text-muted">
                  Switch ingredients without losing macro balance.
                </p>
              </div>
            </div>
          </div>
          <CreateAccount />
        </div>
      </div>
    </div>
  );
}

export default AuthCreateAccount;
