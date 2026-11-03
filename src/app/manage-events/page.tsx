"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import Image from "next/image";
import {
ArrowLeft,
CalendarDays,
MapPin,
Plus,
Search,
Pencil,
Trash2,
X,
Leaf,
Loader2,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import {
apiFetch,
ApiError,
FALLBACK_EVENT_IMAGE,
} from "@/lib/api";

interface Event {
_id: string;
title: string;
description: string;
category: string;
image: string;
location: string;
date: string;
joinCount?: number;
}

const categories = [
"Cleanup",
"Plantation",
"Donation",
"Healthcare",
"Education",
"Food Distribution",
"Other",
];

const inputClass =
"w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 dark:border-white/15 dark:bg-[#101b16] dark:text-white";

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

export default function ManageEventsPage() {
const { data: session, isPending } = authClient.useSession();

const [events, setEvents] = useState<Event[]>([]);
const [loading, setLoading] = useState(true);
const [loadError, setLoadError] = useState("");
const [search, setSearch] = useState("");
const [editingEvent, setEditingEvent] = useState<Event | null>(null);
const [deletingEvent, setDeletingEvent] = useState<Event | null>(null);
const [saving, setSaving] = useState(false);
const [deleting, setDeleting] = useState(false);
const [minDate, setMinDate] = useState("");

// Set minimum date after hydration
useEffect(() => {
const timer = window.setTimeout(() => {
setMinDate(getLocalDateString());
}, 0);


return () => window.clearTimeout(timer);


}, []);

// Load user's events
useEffect(() => {
if (isPending || !session?.user) return;


let active = true;

async function loadMyEvents() {
  try {
    const data = await apiFetch<{ events: Event[] }>(
      "/events/mine",
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
          : "Unable to load your events."
      );
    }
  } finally {
    if (active) {
      setLoading(false);
    }
  }
}

loadMyEvents();

return () => {
  active = false;
};


}, [session, isPending]);

const isLoading = isPending || (!!session?.user && loading);

const displayError =
!isPending && !session?.user
? "Please log in to manage your events."
: loadError;

const filteredEvents = useMemo(() => {
return events.filter((event) =>
`${event.title} ${event.location} ${event.category}`
.toLowerCase()
.includes(search.toLowerCase())
);
}, [events, search]);

async function handleEditSubmit(e: React.FormEvent<HTMLFormElement>) {
e.preventDefault();


if (!editingEvent || saving) return;

if (!editingEvent.title.trim()) {
  toast.error("Please enter an event title.");
  return;
}

if (!editingEvent.description.trim()) {
  toast.error("Please enter an event description.");
  return;
}

if (!editingEvent.category) {
  toast.error("Please select an event category.");
  return;
}

if (editingEvent.image.trim()) {
  try {
    const imageUrl = new URL(editingEvent.image.trim());

    if (!["http:", "https:"].includes(imageUrl.protocol)) {
      toast.error("Please enter a valid image URL.");
      return;
    }
  } catch {
    toast.error("Please enter a valid image URL.");
    return;
  }
}

if (!editingEvent.location.trim()) {
  toast.error("Please enter the event location.");
  return;
}

if (!editingEvent.date || editingEvent.date <= getLocalDateString()) {
  toast.error("Please select a future event date.");
  return;
}

setSaving(true);

try {
  await apiFetch(
    `/events/${editingEvent._id}`,
    {
      method: "PUT",
      body: JSON.stringify(editingEvent),
    },
    "required"
  );

  setEvents((previous) =>
    previous.map((event) =>
      event._id === editingEvent._id ? editingEvent : event
    )
  );

  setEditingEvent(null);
  toast.success("Event updated successfully!");
} catch (error) {
  toast.error(
    error instanceof ApiError
      ? error.message
      : "Failed to update event!"
  );
} finally {
  setSaving(false);
}


}

async function handleDelete() {
if (!deletingEvent || deleting) return;


setDeleting(true);

try {
  await apiFetch(
    `/events/${deletingEvent._id}`,
    { method: "DELETE" },
    "required"
  );

  setEvents((previous) =>
    previous.filter((event) => event._id !== deletingEvent._id)
  );

  setDeletingEvent(null);
  toast.success("Event deleted successfully!");
} catch (error) {
  toast.error(
    error instanceof ApiError
      ? error.message
      : "Failed to delete event!"
  );
  setDeletingEvent(null);
} finally {
  setDeleting(false);
}


}

return ( <main className="min-h-screen bg-[#faf9f5] px-4 py-10 sm:px-6 lg:py-14 dark:bg-[#101b16]"> <div className="container mx-auto px-4"> <div className="mx-auto max-w-6xl"> <Link
         href="/"
         className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-emerald-700 dark:text-gray-400"
       > <ArrowLeft size={17} />
Back to Home </Link>


      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
            <Leaf size={16} />
            Your Contributions
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-[#174d36] sm:text-4xl dark:text-emerald-300">
            Manage Events
          </h1>

          <p className="mt-3 text-sm leading-7 text-gray-500 sm:text-base dark:text-gray-400">
            Keep track of your events and manage your community activities.
          </p>
        </div>

        <Link
          href="/create-event"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#174d36] dark:bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 dark:hover:bg-emerald-600"
        >
          <Plus size={18} />
          Create New Event
        </Link>
      </div>

      <div className="mb-7 rounded-2xl border border-emerald-100 bg-emerald-50 p-6 dark:border-emerald-900/40 dark:bg-emerald-900/20">
        <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
          Total Events Created
        </p>
        <p className="mt-2 text-3xl font-bold text-[#174d36] dark:text-emerald-300">
          {isLoading ? "—" : events.length}
        </p>
      </div>

      <div className="mb-7 flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm sm:max-w-md dark:border-white/10 dark:bg-[#17251d]">
        <Search size={19} className="shrink-0 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search your events..."
          className="w-full bg-transparent text-sm outline-none text-gray-800 placeholder:text-gray-400 dark:text-white"
        />
      </div>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-96 animate-pulse rounded-2xl bg-gray-200 dark:bg-white/10"
            />
          ))}
        </div>
      ) : displayError ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center dark:border-white/10 dark:bg-[#17251d]">
          <Leaf size={40} className="mx-auto text-emerald-600" />
          <h3 className="mt-4 text-xl font-bold text-[#174d36] dark:text-emerald-300">
            Unable to Load Events
          </h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {displayError}
          </p>
          {!session?.user && (
            <Link
              href="/login"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#174d36] dark:bg-emerald-700 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800 dark:hover:bg-emerald-600"
            >
              Login
            </Link>
          )}
        </div>
      ) : filteredEvents.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredEvents.map((event) => (
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
              </div>

              <div className="p-5">
                <h2 className="line-clamp-1 text-xl font-bold text-[#174d36] dark:text-emerald-300">
                  {event.title}
                </h2>

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
                </div>

                <div className="mt-5 flex gap-3">
                  <button
                    onClick={() => setEditingEvent({ ...event })}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-emerald-200 py-2.5 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50 dark:border-emerald-900/50 dark:text-emerald-300 dark:hover:bg-emerald-900/20"
                  >
                    <Pencil size={16} />
                    Edit
                  </button>

                  <button
                    onClick={() => setDeletingEvent(event)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-900/20"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center dark:border-white/10 dark:bg-[#17251d]">
          <Leaf size={40} className="mx-auto text-emerald-600" />
          <h3 className="mt-4 text-xl font-bold text-[#174d36] dark:text-emerald-300">
            No Events Found
          </h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {search
              ? "Try searching with a different keyword."
              : "You haven't created any events yet."}
          </p>
          {!search && (
            <Link
              href="/create-event"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#174d36] dark:bg-emerald-700 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800 dark:hover:bg-emerald-600"
            >
              <Plus size={17} />
              Create Your First Event
            </Link>
          )}
        </div>
      )}
    </div>
  </div>

  {editingEvent && (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
      <div className="my-auto w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl sm:p-8 dark:bg-[#17251d]">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#174d36] dark:text-emerald-300">
              Update Event
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Edit your event information.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setEditingEvent(null)}
            aria-label="Close edit form"
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200">
              Event Title
            </label>
            <input
              value={editingEvent.title}
              onChange={(e) =>
                setEditingEvent({
                  ...editingEvent,
                  title: e.target.value,
                })
              }
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200">
              Description
            </label>
            <textarea
              value={editingEvent.description}
              onChange={(e) =>
                setEditingEvent({
                  ...editingEvent,
                  description: e.target.value,
                })
              }
              rows={3}
              className={`${inputClass} resize-none`}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200">
              Event Category
            </label>
            <select
              value={editingEvent.category}
              onChange={(e) =>
                setEditingEvent({
                  ...editingEvent,
                  category: e.target.value,
                })
              }
              className={inputClass}
              required
            >
              <option value="">Select an event category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200">
              Thumbnail Image URL
            </label>
            <input
              type="url"
              value={editingEvent.image || ""}
              onChange={(e) =>
                setEditingEvent({
                  ...editingEvent,
                  image: e.target.value,
                })
              }
              placeholder="https://example.com/event-image.jpg"
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200">
              Location
            </label>
            <input
              value={editingEvent.location}
              onChange={(e) =>
                setEditingEvent({
                  ...editingEvent,
                  location: e.target.value,
                })
              }
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200">
              Event Date
            </label>
            <input
              type="date"
              min={minDate || undefined}
              value={editingEvent.date}
              onChange={(e) =>
                setEditingEvent({
                  ...editingEvent,
                  date: e.target.value,
                })
              }
              className={inputClass}
              required
            />
            <p className="mt-2 text-xs text-gray-400">
              Only future dates are allowed.
            </p>
          </div>

          <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setEditingEvent(null)}
              className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/5"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#174d36] dark:bg-emerald-700 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800 dark:hover:bg-emerald-600 disabled:opacity-60"
            >
              {saving && <Loader2 size={16} className="animate-spin" />}
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )}

  {deletingEvent && (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-7 text-center shadow-xl dark:bg-[#17251d]">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600 dark:bg-red-900/30">
          <Trash2 size={25} />
        </div>

        <h2 className="mt-4 text-xl font-bold text-gray-800 dark:text-white">
          Delete This Event?
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-gray-700 dark:text-gray-200">
            {deletingEvent.title}
          </span>
          ? This cannot be undone.
        </p>

        <div className="mt-7 flex gap-3">
          <button
            onClick={() => setDeletingEvent(null)}
            className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/5"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
          >
            {deleting && <Loader2 size={16} className="animate-spin" />}
            {deleting ? "Deleting..." : "Yes, Delete"}
          </button>
        </div>
      </div>
    </div>
  )}
</main>


);
}
