"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import {
  CalendarDays,
  MapPin,
  Users,
  Leaf,
  Search,
  CalendarCheck,
  XCircle,
  Loader2,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import {
  apiFetch,
  ApiError,
  FALLBACK_EVENT_IMAGE,
} from "@/lib/api";

interface JoinedEvent {
  _id: string;
  title: string;
  description: string;
  category: string;
  image?: string;
  location: string;
  date: string;
  joinCount?: number;
}

function getLocalDateString() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);

  const monthName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return `${monthName[month - 1]} ${day}, ${year}`;
}

export default function JoinedEventsPage() {
  const { data: session, isPending } = authClient.useSession();

  const [search, setSearch] = useState("");
  const [events, setEvents] = useState<JoinedEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [today, setToday] = useState("");
  const [eventToCancel, setEventToCancel] = useState<string | null>(null);
  const [cancelLoading, setCancelLoading] = useState(false);

  // Set today's date after hydration
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setToday(getLocalDateString());
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  // Load joined events
  useEffect(() => {
    if (isPending || !session?.user) return;

    let active = true;

    async function loadJoinedEvents() {
      try {
        const data = await apiFetch<{ events: JoinedEvent[] }>(
          "/events/joined",
          {},
          "required"
        );

        if (active) {
          setEvents(data.events || []);
          setLoadError("");
        }
      } catch (error) {
        if (active) {
          setLoadError(
            error instanceof ApiError
              ? error.message
              : "Unable to load your joined events."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadJoinedEvents();

    return () => {
      active = false;
    };
  }, [session, isPending]);

  const isLoading = isPending || (!!session?.user && loading);

  const displayError = !isPending && !session?.user
    ? "Please log in to see your joined events."
    : loadError;

  const upcomingCount = useMemo(() => {
    if (!today) return 0;

    return events.filter((event) => event.date >= today).length;
  }, [events, today]);

  const sortedEvents = useMemo(() => {
    return [...events]
      .filter((event) =>
        `${event.title} ${event.location} ${event.category}`
          .toLowerCase()
          .includes(search.toLowerCase())
      )
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [search, events]);

  async function handleCancel() {
    if (!eventToCancel || cancelLoading) return;

    setCancelLoading(true);

    try {
      await apiFetch(
        `/events/${eventToCancel}/join`,
        { method: "DELETE" },
        "required"
      );

      setEvents((previousEvents) =>
        previousEvents.filter((event) => event._id !== eventToCancel)
      );

      setEventToCancel(null);
      toast.success("You have left the event.");
    } catch (error) {
      toast.error(
        error instanceof ApiError
          ? error.message
          : "Unable to cancel. Please try again."
      );
      setEventToCancel(null);
    } finally {
      setCancelLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#faf9f5] px-4 py-10 sm:px-6 lg:py-14 dark:bg-[#101b16]">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="mb-9">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
              <Leaf size={16} />
              Your Community Activities
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-[#174d36] sm:text-4xl dark:text-emerald-300">
              My Joined Events
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base dark:text-gray-400">
              Keep track of the events you have joined and get ready to make a
              positive difference in your community.
            </p>
          </div>

          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-4 rounded-2xl border border-emerald-100 bg-emerald-50 p-5 dark:border-emerald-900/40 dark:bg-emerald-900/20">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-emerald-700 dark:bg-[#17251d] dark:text-emerald-400">
                <CalendarCheck size={24} />
              </div>

              <div>
                <p className="text-sm text-emerald-800 dark:text-emerald-300">
                  Total Joined Events
                </p>
                <p className="mt-1 text-2xl font-bold text-[#174d36] dark:text-emerald-300">
                  {isLoading ? "—" : events.length}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-amber-100 bg-amber-50 p-5 dark:border-amber-900/40 dark:bg-amber-900/20">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-amber-600 dark:bg-[#2a2417] dark:text-amber-400">
                <Users size={24} />
              </div>

              <div>
                <p className="text-sm text-amber-800 dark:text-amber-300">
                  Upcoming Activities
                </p>
                <p className="mt-1 text-2xl font-bold text-gray-800 dark:text-amber-100">
                  {isLoading || !today ? "—" : upcomingCount}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-7 flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm sm:max-w-md dark:border-white/10 dark:bg-[#17251d]">
            <Search size={19} className="shrink-0 text-gray-400" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search joined events..."
              className="w-full bg-transparent text-sm outline-none text-gray-800 placeholder:text-gray-400 dark:text-white"
            />
          </div>

          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="h-104 animate-pulse rounded-2xl bg-gray-200 dark:bg-white/10"
                />
              ))}
            </div>
          ) : displayError ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center dark:border-white/10 dark:bg-[#17251d]">
              <XCircle size={42} className="mx-auto text-emerald-600" />

              <h3 className="mt-4 text-xl font-bold text-[#174d36] dark:text-emerald-300">
                Unable to Load Events
              </h3>

              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {displayError}
              </p>

              {!session?.user && (
                <Link
                  href="/login"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#174d36] dark:bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 dark:hover:bg-emerald-600"
                >
                  Login
                </Link>
              )}
            </div>
          ) : sortedEvents.length > 0 ? (
            <>
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#174d36] dark:text-emerald-300">
                  Your Activities
                </h2>

                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {sortedEvents.length} events
                </span>
              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {sortedEvents.map((event) => (
                  <article
                    key={event._id}
                    className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-[#17251d]"
                  >
                    <div className="relative h-52 w-full bg-emerald-50 dark:bg-[#101b16]">
                      <Image
                        src={event.image?.trim() || FALLBACK_EVENT_IMAGE}
                        alt={event.title}
                        fill
                        unoptimized
                        className="object-cover"
                      />

                      <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-emerald-800 shadow-sm dark:bg-[#17251d] dark:text-emerald-300">
                        {event.category}
                      </span>

                      <span className="absolute right-4 top-4 rounded-full bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white shadow-sm">
                        Joined
                      </span>
                    </div>

                    <div className="p-5">
                      <h3 className="line-clamp-1 text-xl font-bold text-[#174d36] dark:text-emerald-300">
                        {event.title}
                      </h3>

                      <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-6 text-gray-500 dark:text-gray-400">
                        {event.description}
                      </p>

                      <div className="mt-5 space-y-3 border-t border-gray-100 pt-4 text-sm text-gray-500 dark:border-white/10 dark:text-gray-400">
                        <p className="flex items-center gap-2">
                          <CalendarDays
                            size={17}
                            className="text-emerald-700 dark:text-emerald-400"
                          />
                          {formatDate(event.date)}
                        </p>

                        <p className="flex items-center gap-2">
                          <MapPin
                            size={17}
                            className="text-emerald-700 dark:text-emerald-400"
                          />
                          {event.location}
                        </p>

                        <p className="flex items-center gap-2">
                          <Users
                            size={17}
                            className="text-emerald-700 dark:text-emerald-400"
                          />
                          <span>{event.joinCount || 0} Volunteers Joined</span>
                        </p>
                      </div>

                      <div className="mt-5 grid grid-cols-2 gap-3">
                        <Link
                          href={`/events/${event._id}`}
                          className="flex items-center justify-center rounded-xl bg-[#174d36] dark:bg-emerald-700 px-3 py-3 text-center text-sm font-semibold text-white transition hover:bg-emerald-800 dark:hover:bg-emerald-600"
                        >
                          View Details
                        </Link>

                        <button
                          type="button"
                          onClick={() => setEventToCancel(event._id)}
                          className="flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100 dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-400"
                        >
                          <XCircle size={17} />
                          Cancel
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center dark:border-white/10 dark:bg-[#17251d]">
              <CalendarCheck
                size={42}
                className="mx-auto text-emerald-600"
              />

              <h3 className="mt-4 text-xl font-bold text-[#174d36] dark:text-emerald-300">
                No Joined Events Found
              </h3>

              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {search
                  ? "Try searching with a different keyword."
                  : "You haven't joined any events yet. Explore events and get involved!"}
              </p>

              <Link
                href="/events"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#174d36] dark:bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 dark:hover:bg-emerald-600"
              >
                Explore Events
              </Link>
            </div>
          )}
        </div>
      </div>

      {eventToCancel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-[#17251d]">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30">
              <XCircle size={30} />
            </div>

            <h2 className="mt-4 text-center text-xl font-bold text-[#174d36] dark:text-emerald-300">
              Cancel Participation?
            </h2>

            <p className="mt-3 text-center text-sm leading-6 text-gray-500 dark:text-gray-400">
              Are you sure you want to cancel your participation in this
              event? You can join again later if registration is available.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setEventToCancel(null)}
                className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/5"
              >
                Keep Event
              </button>

              <button
                type="button"
                onClick={handleCancel}
                disabled={cancelLoading}
                className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
              >
                {cancelLoading && (
                  <Loader2 size={16} className="animate-spin" />
                )}
                {cancelLoading ? "Leaving..." : "Yes, Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}