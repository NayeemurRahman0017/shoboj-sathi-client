"use client";

import { useMemo, useState } from "react";
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
} from "lucide-react";

interface Event {
id: number;
title: string;
description: string;
category: string;
image: string;
location: string;
date: string;
}

const initialEvents: Event[] = [
{
id: 1,
title: "Winter Clothes Distribution",
description:
"Distribute warm clothes among underprivileged families during winter.",
category: "Donation",
image: "/images/events/Winter%20Clothes%20Distribution.png",
location: "Mirpur 10, Dhaka",
date: "2026-11-15",
},
{
id: 2,
title: "Community Cleanup Campaign",
description:
"Bring volunteers together to clean public spaces and create a healthier environment.",
category: "Cleanup",
image: "/images/gallery/Community%20Cleanup.png",
location: "Dhanmondi, Dhaka",
date: "2026-11-18",
},
{
id: 3,
title: "Tree Plantation Program",
description:
"Plant trees and encourage local people to protect the environment.",
category: "Plantation",
image: "/images/gallery/Tree%20Plantation.png",
location: "Savar, Dhaka",
date: "2026-12-05",
},
];

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
"w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100";

export default function ManageEventsPage() {
const [events, setEvents] = useState<Event[]>(initialEvents);
const [search, setSearch] = useState("");
const [editingEvent, setEditingEvent] = useState<Event | null>(null);
const [deletingEvent, setDeletingEvent] = useState<Event | null>(null);

const filteredEvents = useMemo(() => {
return events.filter((event) =>
`${event.title} ${event.location} ${event.category}`
.toLowerCase()
.includes(search.toLowerCase())
);
}, [events, search]);

function handleEditSubmit(e: React.FormEvent<HTMLFormElement>) {
e.preventDefault();


if (!editingEvent) return;

if (editingEvent.date <= getLocalDateString()) {
  toast.error("Please select a future event date.");
  return;
}

setEvents((previous) =>
  previous.map((event) =>
    event.id === editingEvent.id ? editingEvent : event
  )
);

setEditingEvent(null);
toast.success("Event updated successfully!");


}

function handleDelete() {
if (!deletingEvent) return;


setEvents((previous) =>
  previous.filter((event) => event.id !== deletingEvent.id)
);

setDeletingEvent(null);
toast.success("Event deleted successfully!");


}

return ( <main className="min-h-screen bg-[#faf9f5] px-4 py-10 sm:px-6 lg:py-14"> <div className="mx-auto max-w-6xl"> <Link
       href="/"
       className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-emerald-700"
     > <ArrowLeft size={17} />
Back to Home </Link>

```
    {/* Heading */}
    <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div>
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800">
          <Leaf size={16} />
          Your Contributions
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-[#174d36] sm:text-4xl">
          Manage Events
        </h1>

        <p className="mt-3 text-sm leading-7 text-gray-500 sm:text-base">
          Keep track of your events and manage your community activities.
        </p>
      </div>

      <Link
        href="/create-event"
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#174d36] px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
      >
        <Plus size={18} />
        Create New Event
      </Link>
    </div>

    {/* Stats */}
    <div className="mb-7 rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
      <p className="text-sm font-medium text-emerald-800">
        Total Events Created
      </p>
      <p className="mt-2 text-3xl font-bold text-[#174d36]">
        {events.length}
      </p>
    </div>

    {/* Search */}
    <div className="mb-7 flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm sm:max-w-md">
      <Search size={19} className="shrink-0 text-gray-400" />
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search your events..."
        className="w-full bg-transparent text-sm outline-none"
      />
    </div>

    {/* Event List */}
    {filteredEvents.length > 0 ? (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredEvents.map((event) => (
          <article
            key={event.id}
            className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="relative h-52 w-full bg-emerald-50">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
                unoptimized
              />
              <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-emerald-800 shadow-sm">
                {event.category}
              </span>
            </div>

            <div className="p-5">
              <h2 className="line-clamp-1 text-xl font-bold text-[#174d36]">
                {event.title}
              </h2>

              <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-6 text-gray-500">
                {event.description}
              </p>

              <div className="mt-5 space-y-3 border-t border-gray-100 pt-4 text-sm text-gray-500">
                <p className="flex items-center gap-2">
                  <CalendarDays size={17} className="text-emerald-700" />
                  {formatDate(event.date)}
                </p>

                <p className="flex items-center gap-2">
                  <MapPin size={17} className="text-emerald-700" />
                  {event.location}
                </p>
              </div>

              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => setEditingEvent({ ...event })}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-emerald-200 py-2.5 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50"
                >
                  <Pencil size={16} />
                  Edit
                </button>

                <button
                  onClick={() => setDeletingEvent(event)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
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
      <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
        <Leaf size={40} className="mx-auto text-emerald-600" />
        <h3 className="mt-4 text-xl font-bold text-[#174d36]">
          No Events Found
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          {search
            ? "Try searching with a different keyword."
            : "You haven't created any events yet."}
        </p>
        {!search && (
          <Link
            href="/create-event"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#174d36] px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
          >
            <Plus size={17} />
            Create Your First Event
          </Link>
        )}
      </div>
    )}
  </div>

  {/* Edit Modal */}
  {editingEvent && (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
      <div className="my-auto w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#174d36]">
              Update Event
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Edit your event information.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setEditingEvent(null)}
            aria-label="Close edit form"
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
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
            <label className="mb-2 block text-sm font-semibold text-gray-700">
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
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Category
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
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Image URL
            </label>
            <input
              type="url"
              value={editingEvent.image}
              onChange={(e) =>
                setEditingEvent({
                  ...editingEvent,
                  image: e.target.value,
                })
              }
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
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
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Event Date
            </label>
            <input
              type="date"
              min={getLocalDateString()}
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
          </div>

          <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setEditingEvent(null)}
              className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-[#174d36] px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )}

  {/* Delete Confirmation */}
  {deletingEvent && (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-7 text-center shadow-xl">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
          <Trash2 size={25} />
        </div>

        <h2 className="mt-4 text-xl font-bold text-gray-800">
          Delete This Event?
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-gray-700">
            {deletingEvent.title}
          </span>
          ?
        </p>

        <div className="mt-7 flex gap-3">
          <button
            onClick={() => setDeletingEvent(null)}
            className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="flex-1 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white hover:bg-red-700"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  )}
</main>


);
}

function getLocalDateString() {
const date = new Date();
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, "0");
const day = String(date.getDate()).padStart(2, "0");

return `${year}-${month}-${day}`;
}

function formatDate(date: string) {
return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
day: "numeric",
month: "long",
year: "numeric",
});
}
