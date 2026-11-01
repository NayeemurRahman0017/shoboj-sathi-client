"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Heart,
  Users,
  CalendarDays,
  Leaf,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

export default function Hero() {
  const { data: session } = authClient.useSession();

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid min-h-162.5 max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:px-8 lg:py-20">

        <div className="relative z-10">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-secondary px-4 py-2 text-sm font-semibold text-primary">
            <Leaf size={16} />
            Make Every Action Count
          </div>

          <h1 className="max-w-2xl text-5xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Be the Change.
            <br />
            <span className="text-primary">Inspire the World.</span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
            Small acts of kindness can create a big impact. Discover
            meaningful community events, connect with passionate
            volunteers, and make a difference together.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/events"
              className="flex items-center gap-2 rounded-full bg-primary px-7 py-4 font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:-translate-y-1 hover:opacity-90"
            >
              Explore Events
              <ArrowRight size={18} />
            </Link>

            <Link
              href={session ? "/joined-events" : "/register"}
              className="rounded-full border border-border bg-card px-7 py-4 font-semibold text-foreground transition hover:bg-muted"
            >
              Become a Volunteer
            </Link>
          </div>

          <div className="mt-14 grid max-w-lg grid-cols-3 gap-5 border-t border-border pt-8">
            <div>
              <div className="flex items-center gap-2 text-primary">
                <Users size={19} />
                <span className="text-2xl font-bold">500+</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
                Volunteers
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-primary">
                <CalendarDays size={19} />
                <span className="text-2xl font-bold">120+</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
                Events
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-primary">
                <Heart size={19} />
                <span className="text-2xl font-bold">25+</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
                Communities
              </p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -right-8 -top-8 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-8 -left-8 h-48 w-48 rounded-full bg-amber-400/10 blur-3xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-secondary p-4 shadow-2xl sm:p-6">
            <div className="relative aspect-[5/2] overflow-hidden rounded-[1.5rem] bg-[#dcebdc] dark:bg-[#263c30]">
              <Image
                src="/images/hero/Hero%20Banner.png"
                alt="ShobujShathi volunteers making a difference"
                fill
                priority
                quality={90}
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="absolute -bottom-5 -left-4 flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-xl sm:-left-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-primary">
              <Heart size={22} />
            </div>
            <div>
              <p className="font-bold text-foreground">Spread Kindness</p>
              <p className="text-xs text-muted-foreground">
                One action at a time
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}