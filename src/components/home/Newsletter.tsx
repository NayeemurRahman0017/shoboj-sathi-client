"use client";

import { useState } from "react";
import { ArrowRight, Mail, CheckCircle2 } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) return;

    // Temporary frontend interaction.
    // Backend API integration will be added later.
    setSubscribed(true);
    setEmail("");
  };

  return (
    <section className="px-5 py-20 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-emerald-800 px-6 py-14 text-white sm:px-12 lg:px-16">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
            <Mail size={26} />
          </div>

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">
            Stay Connected
          </p>

          <h2 className="text-3xl font-bold sm:text-4xl">
            Be Part of Something Good
          </h2>

          <p className="mx-auto mt-4 max-w-lg leading-7 text-emerald-100">
            Get updates about upcoming events, volunteer opportunities, and
            inspiring stories from our community.
          </p>

          {subscribed ? (
            <div className="mt-8 flex items-center justify-center gap-2 rounded-xl bg-white/10 p-4 text-emerald-100">
              <CheckCircle2 size={20} />
              <span>Thank you for subscribing!</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-8 flex max-w-lg flex-col gap-3 rounded-2xl bg-white p-2 sm:flex-row"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="min-w-0 flex-1 rounded-xl px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400"
              />

              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900"
              >
                Subscribe
                <ArrowRight size={17} />
              </button>
            </form>
          )}

          <p className="mt-4 text-xs text-emerald-200">
            No spam. Just meaningful updates from our community.
          </p>
        </div>
      </div>
    </section>
  );
}