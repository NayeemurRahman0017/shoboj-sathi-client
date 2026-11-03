"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  MapPin,
  CalendarDays,
  ArrowRight,
  Search,
  Leaf,
  Users,
  CloudOff,
} from "lucide-react";

import { apiFetch, FALLBACK_EVENT_IMAGE, ApiError } from "@/lib/api";

interface EventItem {
  _id: string;
  title: string;
  description: string;
  location: string;
  category: string;
  date: string;
  image?: string;
  joinCount?: number;
}

interface EventsResponse {
  events: EventItem[];
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export default function UpcomingEvents() {
  const [upcomingEvents, setUpcomingEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Events");

  useEffect(() => {
    let active = true;

    async function loadEvents() {
      try {
        // MongoDB .limit(6) is applied on the API for the home page
        const data = await apiFetch<EventsResponse>("/events?limit=6");

        if (active) {
          setUpcomingEvents(data.events || []);
          setLoadError("");
        }
      } catch (error) {
        if (active) {
          setLoadError(
            error instanceof ApiError
              ? error.message
              : "Unable to load events right now."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadEvents();

    return () => {
      active = false;
    };
  }, []);

  const categories = useMemo(() => {
    const found = new Set(
      upcomingEvents.map((event) => event.category).filter(Boolean)
    );

    return ["All Events", ...Array.from(found)];
  }, [upcomingEvents]);

  const filteredEvents = useMemo(() => {
    return upcomingEvents.filter((event) => {
      const matchesCategory =
        selectedCategory === "All Events" ||
        event.category === selectedCategory;

      const search = searchTerm.toLowerCase();

      const matchesSearch =
        event.title.toLowerCase().includes(search) ||
        event.location.toLowerCase().includes(search) ||
        event.description.toLowerCase().includes(search);

      return matchesCategory && matchesSearch;
    });
  }, [upcomingEvents, selectedCategory, searchTerm]);

  return (
    <section className="min-h-screen bg-background">
      <div className="relative overflow-hidden bg-[#174d36] px-5 py-20 text-white sm:py-24">
        <div className="absolute -right-20 -top-32 h-96 w-96 rounded-full border-50 border-white/5" />
        <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full border-50 border-white/5" />

        <div className="relative z-10 mx-auto max-w-7xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-emerald-100">
            <Leaf size={16} />
            Make a Difference Together
          </div>

          <h2 className="text-4xl font-bold sm:text-5xl">
            Upcoming Events
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-emerald-100">
            Discover meaningful community events, connect with volunteers,
            and become a part of something bigger.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-emerald-100">
            <span className="flex items-center gap-2">
              <CalendarDays size={17} />
              Upcoming Activities
            </span>

            <span className="flex items-center gap-2">
              <Users size={17} />
              Community Volunteers
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
              Find Your Purpose
            </p>

            <h2 className="text-3xl font-bold text-foreground">
              Explore Events
            </h2>

            <p className="mt-2 text-muted-foreground">
              Find an event and make a positive impact.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <CalendarDays size={17} className="text-primary" />
            {loading ? "—" : upcomingEvents.length} Upcoming Events
          </div>
        </div>

        <div className="mb-10 flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search events..."
              className="h-12 w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`shrink-0 rounded-full px-4 py-2.5 text-xs font-semibold transition sm:text-sm ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-primary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-96 animate-pulse rounded-2xl bg-secondary"
              />
            ))}
          </div>
        ) : loadError ? (
          <div className="rounded-2xl border border-dashed border-border py-20 text-center">
            <CloudOff className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />

            <h3 className="text-xl font-bold text-foreground">
              Could Not Load Events
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              {loadError}
            </p>
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <article
                key={event._id}
                className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/5"
              >
                <div className="relative h-56 overflow-hidden bg-secondary">
                  <Image
                    src={event.image?.trim() || FALLBACK_EVENT_IMAGE}
                    alt={event.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-primary shadow-sm">
                    {event.category}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="mb-3 line-clamp-1 text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                    {event.title}
                  </h3>

                  <p className="mb-5 line-clamp-2 min-h-12 text-sm leading-6 text-muted-foreground">
                    {event.description}
                  </p>

                  <div className="space-y-3 border-b border-border pb-5">
                    <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <MapPin size={17} className="shrink-0 text-primary" />
                      {event.location}
                    </div>

                    <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <CalendarDays
                        size={17}
                        className="shrink-0 text-primary"
                      />
                      {formatDate(event.date)}
                    </div>

                    <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <Users size={17} className="shrink-0 text-primary" />
                      {event.joinCount || 0} Volunteers Joined
                    </div>
                  </div>

                  <Link
                    href={`/events/${event._id}`}
                    className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-bold text-primary-foreground transition hover:opacity-90"
                  >
                    View Event
                    <ArrowRight size={17} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border py-20 text-center">
            <CalendarDays className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />

            <h3 className="text-xl font-bold text-foreground">
              No Upcoming Events
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              No events match your search or selected category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
