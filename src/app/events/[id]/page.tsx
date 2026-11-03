"use client";

import { useCallback, useEffect, useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  CalendarDays,
  MapPin,
  Users,
  ArrowLeft,
  HeartHandshake,
  CheckCircle2,
  CloudOff,
  Loader2,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import {
  apiFetch,
  ApiError,
  FALLBACK_EVENT_IMAGE,
} from "@/lib/api";

interface EventDetails {
  _id: string;
  title: string;
  description: string;
  category: string;
  image?: string;
  location: string;
  date: string;
  userEmail?: string;
  creatorName?: string;
  joinCount?: number;
  joined?: boolean;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

function EventDetailsLoading() {
  return (
    <main className="min-h-screen px-5 py-12 sm:px-8 lg:px-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="h-72 animate-pulse rounded-3xl bg-secondary sm:h-105" />
            <div className="mt-8 h-10 w-3/4 animate-pulse rounded-lg bg-secondary" />
            <div className="mt-4 h-5 animate-pulse rounded-lg bg-secondary" />
            <div className="mt-3 h-5 w-5/6 animate-pulse rounded-lg bg-secondary" />
          </div>

          <div className="h-96 animate-pulse rounded-3xl bg-secondary" />
        </div>
      </div>
    </main>
  );
}

function EventDetailsContent() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const eventId = params?.id;

  const { data: session, isPending } = authClient.useSession();

  const [event, setEvent] = useState<EventDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [joinLoading, setJoinLoading] = useState(false);

  const loadEvent = useCallback(async () => {
    if (!eventId) return;

    try {
      setLoading(true);
      setNotFound(false);

      const data = await apiFetch<{ event: EventDetails }>(
        `/events/${eventId}`,
        {},
        "optional"
      );

      setEvent(data.event);
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        setNotFound(true);
      } else {
        setNotFound(true);
      }
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    loadEvent();
  }, [loadEvent]);

  async function handleJoin() {
    if (!session?.user) {
      router.push(`/login?callbackURL=/events/${eventId}`);
      return;
    }

    if (!event || joinLoading) return;

    setJoinLoading(true);

    try {
      await apiFetch(`/events/${eventId}/join`, { method: "POST" }, "required");

      toast.success("You have joined the event!");

      setEvent((previous) =>
        previous ? { ...previous, joined: true, joinCount: (previous.joinCount || 0) + 1 } : previous
      );
    } catch (error) {
      toast.error(
        error instanceof ApiError
          ? error.message
          : "Unable to join the event. Please try again."
      );
    } finally {
      setJoinLoading(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen px-5 py-12 sm:px-8 lg:px-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="h-72 animate-pulse rounded-3xl bg-secondary sm:h-105" />
              <div className="mt-8 h-10 w-3/4 animate-pulse rounded-lg bg-secondary" />
              <div className="mt-4 h-5 animate-pulse rounded-lg bg-secondary" />
              <div className="mt-3 h-5 w-5/6 animate-pulse rounded-lg bg-secondary" />
            </div>

            <div className="h-96 animate-pulse rounded-3xl bg-secondary" />
          </div>
        </div>
      </main>
    );
  }

  if (notFound || !event) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-5 py-16">
        <div className="rounded-2xl border border-dashed border-border px-6 py-16 text-center">
          <CloudOff className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />

          <h1 className="text-2xl font-bold text-foreground">
            Event Not Found
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            This event does not exist or may have been removed.
          </p>

          <Link
            href="/events"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#174d36] px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 dark:bg-emerald-700 dark:hover:bg-emerald-600"
          >
            <ArrowLeft size={17} />
            Back to Events
          </Link>
        </div>
      </main>
    );
  }

  const hasJoined = !!event.joined;
  const isPendingCheck = isPending || loading;

  return (
    <main className="min-h-screen px-5 py-12 sm:px-8 lg:px-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/events"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-emerald-700 transition hover:text-emerald-900 dark:text-emerald-400"
          >
            <ArrowLeft size={18} />
            Back to Events
          </Link>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="relative h-72 overflow-hidden rounded-3xl bg-secondary sm:h-105">
                <Image
                  src={event.image?.trim() || FALLBACK_EVENT_IMAGE}
                  alt={event.title}
                  fill
                  priority
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                />

                <span className="absolute left-5 top-5 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">
                  {event.category}
                </span>
              </div>

              <div className="mt-8">
                <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
                  {event.title}
                </h1>

                <p className="mt-4 leading-7 text-muted-foreground">
                  {event.description}
                </p>

                <div className="mt-10">
                  <h2 className="text-2xl font-bold text-foreground">
                    About This Event
                  </h2>

                  <p className="mt-4 whitespace-pre-line leading-8 text-muted-foreground">
                    {event.description}
                  </p>
                </div>

                <div className="mt-10">
                  <h2 className="text-2xl font-bold text-foreground">
                    Event Organizer
                  </h2>

                  <p className="mt-3 text-muted-foreground">
                    {event.creatorName || event.userEmail || "ShobujShathi Community"}
                  </p>
                </div>
              </div>
            </div>

            <aside>
              <div className="sticky top-24 rounded-3xl border border-border bg-card p-6 shadow-sm">
                <h2 className="text-xl font-bold text-foreground">
                  Event Information
                </h2>

                <div className="mt-7 space-y-6">
                  <div className="flex gap-4">
                    <CalendarDays className="shrink-0 text-emerald-600" />
                    <div>
                      <p className="font-semibold text-foreground">Date</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {formatDate(event.date)}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <MapPin className="shrink-0 text-emerald-600" />
                    <div>
                      <p className="font-semibold text-foreground">Location</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {event.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Users className="shrink-0 text-emerald-600" />
                    <div>
                      <p className="font-semibold text-foreground">
                        Volunteers
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {event.joinCount || 0} joined so far
                      </p>
                    </div>
                  </div>
                </div>

                {isPendingCheck ? (
                  <button
                    disabled
                    className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3.5 font-semibold text-white opacity-70"
                  >
                    <Loader2 size={20} className="animate-spin" />
                    Loading...
                  </button>
                ) : hasJoined ? (
                  <button
                    type="button"
                    disabled
                    className="mt-8 flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 font-semibold text-white"
                  >
                    <CheckCircle2 size={20} />
                    You Have Joined
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleJoin}
                    disabled={joinLoading}
                    className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3.5 font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {joinLoading ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <HeartHandshake size={20} />
                    )}
                    {joinLoading
                      ? "Joining..."
                      : session?.user
                        ? "Join Event"
                        : "Login to Join"}
                  </button>
                )}

                <p className="mt-3 text-center text-xs text-muted-foreground">
                  {session?.user
                    ? "You can leave this event anytime from Joined Events."
                    : "You must be logged in to join this event."}
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function EventDetailsPage() {
  return (
    <Suspense fallback={<EventDetailsLoading />}>
      <EventDetailsContent />
    </Suspense>
  );
}
