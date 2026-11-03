"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, CloudOff, Loader2 } from "lucide-react";

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

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadEvents() {
      try {
        const data = await apiFetch<{ events: EventItem[] }>("/events");

        if (active) {
          setEvents(data.events || []);
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

  return (
    <main className="min-h-screen px-5 py-16 sm:px-8 lg:px-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
              Make an Impact
            </p>

            <h1 className="text-3xl font-bold text-foreground sm:text-5xl">
              Upcoming Events
            </h1>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-muted-foreground">
              Discover meaningful community events, connect with volunteers,
              and become part of positive social change.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-[27rem] animate-pulse rounded-2xl bg-secondary"
                />
              ))}
            </div>
          ) : loadError ? (
            <div className="rounded-2xl border border-dashed border-border py-20 text-center">
              <CloudOff className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />

              <h2 className="text-xl font-bold text-foreground">
                Could Not Load Events
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                {loadError}
              </p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#174d36] px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 dark:bg-emerald-700 dark:hover:bg-emerald-600"
              >
                <Loader2 size={17} />
                Try Again
              </button>
            </div>
          ) : events.length > 0 ? (
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <article
                  key={event._id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-56 overflow-hidden bg-secondary">
                    <Image
                      src={event.image?.trim() || FALLBACK_EVENT_IMAGE}
                      alt={event.title}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />

                    <span className="absolute left-4 top-4 rounded-full bg-emerald-600 px-4 py-1.5 text-xs font-semibold text-white">
                      {event.category}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="text-xl font-bold text-foreground">
                      {event.title}
                    </h2>

                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
                      {event.description}
                    </p>

                    <div className="mt-5 space-y-2 text-sm text-muted-foreground">
                      <p className="flex items-center gap-2">
                        <CalendarDays
                          size={16}
                          className="shrink-0 text-emerald-600"
                        />
                        {formatDate(event.date)}
                      </p>

                      <p className="flex items-center gap-2">
                        <MapPin
                          size={16}
                          className="shrink-0 text-emerald-600"
                        />
                        {event.location}
                      </p>
                    </div>

                    <Link
                      href={`/events/${event._id}`}
                      className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
                    >
                      View Event
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border py-20 text-center">
              <CalendarDays className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />

              <h2 className="text-xl font-bold text-foreground">
                No Upcoming Events
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                There are no upcoming events right now. Please check back
                soon.
              </p>

              <Link
                href="/create-event"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#174d36] px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 dark:bg-emerald-700 dark:hover:bg-emerald-600"
              >
                Create an Event
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
