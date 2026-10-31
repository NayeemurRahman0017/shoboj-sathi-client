"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
ArrowLeft,
CalendarDays,
MapPin,
Users,
Leaf,
Search,
CalendarCheck,
} from "lucide-react";

interface JoinedEvent {
id: string;
title: string;
description: string;
category: string;
image: string;
location: string;
date: string;
time: string;
volunteers: number;
requiredVolunteers: number;
}

const joinedEvents: JoinedEvent[] = [
{
id: "winter-clothes",
title: "Winter Clothes Distribution",
description:
"Help distribute warm clothes among underprivileged families during winter.",
category: "Donation",
image: "/images/events/winter-clothes.jpg",
location: "Mirpur 10, Dhaka",
date: "2026-11-15",
time: "09:00 AM",
volunteers: 24,
requiredVolunteers: 40,
},
{
id: "community-cleanup",
title: "Community Cleanup Campaign",
description:
"Work together to clean public spaces and create a healthier environment.",
category: "Cleanup",
image: "/images/events/cleanup.jpg",
location: "Dhanmondi, Dhaka",
date: "2026-11-18",
time: "08:00 AM",
volunteers: 18,
requiredVolunteers: 30,
},
{
id: "free-health-camp",
title: "Free Community Health Camp",
description:
"Support a free health camp providing basic medical services to local people.",
category: "Healthcare",
image: "/images/events/health-camp.jpg",
location: "Uttara, Dhaka",
date: "2026-11-22",
time: "10:00 AM",
volunteers: 15,
requiredVolunteers: 25,
},
];

export default function JoinedEventsPage() {
const [search, setSearch] = useState("");

const sortedEvents = useMemo(() => {
return [...joinedEvents]
.filter((event) =>
`${event.title} ${event.location} ${event.category}`
.toLowerCase()
.includes(search.toLowerCase())
)
.sort(
(a, b) =>
new Date(a.date).getTime() - new Date(b.date).getTime()
);
}, [search]);

return ( <main className="min-h-screen bg-[#faf9f5] px-4 py-10 sm:px-6 lg:py-14"> <div className="mx-auto max-w-6xl">
{/* Back Navigation */} <Link
       href="/"
       className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-emerald-700"
     > <ArrowLeft size={17} />
Back to Home </Link>


    {/* Page Heading */}
    <div className="mb-9">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800">
        <Leaf size={16} />
        Your Community Activities
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-[#174d36] sm:text-4xl">
        My Joined Events
      </h1>

      <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
        Keep track of the events you have joined and get ready to make a
        positive difference in your community.
      </p>
    </div>

    {/* Summary */}
    <div className="mb-8 grid gap-4 sm:grid-cols-2">
      <div className="flex items-center gap-4 rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-emerald-700">
          <CalendarCheck size={24} />
        </div>

        <div>
          <p className="text-sm text-emerald-800">Total Joined Events</p>
          <p className="mt-1 text-2xl font-bold text-[#174d36]">
            {joinedEvents.length}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 rounded-2xl border border-amber-100 bg-amber-50 p-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-amber-600">
          <Users size={24} />
        </div>

        <div>
          <p className="text-sm text-amber-800">Upcoming Activities</p>
          <p className="mt-1 text-2xl font-bold text-gray-800">
            {joinedEvents.length}
          </p>
        </div>
      </div>
    </div>

    {/* Search */}
    <div className="mb-7 flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm sm:max-w-md">
      <Search size={19} className="shrink-0 text-gray-400" />

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search joined events..."
        className="w-full bg-transparent text-sm outline-none"
      />
    </div>

    {/* Events */}
    {sortedEvents.length > 0 ? (
      <>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#174d36]">
            Your Activities
          </h2>

          <span className="text-sm text-gray-500">
            {sortedEvents.length} events
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {sortedEvents.map((event) => (
            <article
              key={event.id}
              className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              {/* Image */}
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

                <span className="absolute right-4 top-4 rounded-full bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white shadow-sm">
                  Joined
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="line-clamp-1 text-xl font-bold text-[#174d36]">
                  {event.title}
                </h3>

                <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-6 text-gray-500">
                  {event.description}
                </p>

                <div className="mt-5 space-y-3 border-t border-gray-100 pt-4 text-sm text-gray-500">
                  <p className="flex items-center gap-2">
                    <CalendarDays
                      size={17}
                      className="shrink-0 text-emerald-700"
                    />
                    {formatDate(event.date)} · {event.time}
                  </p>

                  <p className="flex items-center gap-2">
                    <MapPin
                      size={17}
                      className="shrink-0 text-emerald-700"
                    />
                    {event.location}
                  </p>

                  <div className="flex items-center gap-2">
                    <Users
                      size={17}
                      className="shrink-0 text-emerald-700"
                    />
                    <span>
                      {event.volunteers}/{event.requiredVolunteers}{" "}
                      Volunteers
                    </span>
                  </div>
                </div>

                {/* Progress */}
                <div className="mt-4">
                  <div className="mb-2 flex justify-between text-xs text-gray-500">
                    <span>Volunteer Progress</span>
                    <span>
                      {Math.round(
                        (event.volunteers / event.requiredVolunteers) *
                          100
                      )}
                      %
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-emerald-600"
                      style={{
                        width: `${Math.min(
                          (event.volunteers / event.requiredVolunteers) *
                            100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                <Link
                  href={`/events/${event.id}`}
                  className="mt-5 flex w-full items-center justify-center rounded-xl bg-[#174d36] px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
                >
                  View Event Details
                </Link>
              </div>
            </article>
          ))}
        </div>
      </>
    ) : (
      <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
        <CalendarCheck
          size={42}
          className="mx-auto text-emerald-600"
        />

        <h3 className="mt-4 text-xl font-bold text-[#174d36]">
          No Joined Events Found
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          {search
            ? "Try searching with a different keyword."
            : "You haven't joined any events yet. Explore events and get involved!"}
        </p>

        <Link
          href="/events"
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#174d36] px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
        >
          Explore Events
        </Link>
      </div>
    )}
  </div>
</main>


);
}

function formatDate(date: string) {
return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
day: "numeric",
month: "long",
year: "numeric",
});
}
