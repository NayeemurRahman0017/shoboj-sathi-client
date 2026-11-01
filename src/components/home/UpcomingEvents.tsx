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
} from "lucide-react";

const events = [
  {
    id: "winter-clothes",
    title: "Winter Clothes Distribution",
    description:
      "Help underprivileged families stay warm this winter by distributing warm clothes.",
    location: "Mirpur 10, Dhaka",
    category: "Donation",
    date: "2026-11-15",
    time: "09:00 AM",
    image: "/images/events/Winter%20Clothes%20Distribution.png",
    volunteers: 18,
    requiredVolunteers: 30,
  },
  {
    id: "community-cleanup",
    title: "Community Clean-up Drive",
    description:
      "Join us to clean our neighborhood and create a healthier environment.",
    location: "Dhanmondi, Dhaka",
    category: "Environment",
    date: "2026-11-18",
    time: "08:00 AM",
    image: "/images/gallery/Community%20Cleanup.png",
    volunteers: 12,
    requiredVolunteers: 25,
  },
  {
    id: "free-health-camp",
    title: "Free Health Checkup Camp",
    description:
      "Help organize a free health checkup camp for people who need medical support.",
    location: "Uttara, Dhaka",
    category: "Healthcare",
    date: "2026-11-22",
    time: "10:00 AM",
    image: "/images/events/Healthcare%20Camp.png",
    volunteers: 20,
    requiredVolunteers: 35,
  },
  {
    id: "food-distribution",
    title: "Food Distribution Program",
    description:
      "Support families in need by helping distribute essential food packages.",
    location: "Mohammadpur, Dhaka",
    category: "Donation",
    date: "2026-11-25",
    time: "11:00 AM",
    image: "/images/events/Food%20Distribution.png",
    volunteers: 15,
    requiredVolunteers: 30,
  },
  {
    id: "tree-plantation",
    title: "Tree Plantation Campaign",
    description:
      "Plant trees together and contribute to a greener and healthier future.",
    location: "Savar, Dhaka",
    category: "Environment",
    date: "2026-12-05",
    time: "08:30 AM",
    image: "/images/gallery/Tree%20Plantation.png",
    volunteers: 22,
    requiredVolunteers: 40,
  },
  {
    id: "education-support",
    title: "Education Support for Children",
    description:
      "Volunteer to support children's education through learning materials and guidance.",
    location: "Gazipur, Dhaka",
    category: "Education",
    date: "2026-12-12",
    time: "09:30 AM",
    image: "/images/events/Education%20Support.png",
    volunteers: 10,
    requiredVolunteers: 20,
  },
];

const categories = [
  "All Events",
  "Donation",
  "Environment",
  "Healthcare",
  "Education",
];

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export default function UpcomingEvents() {
  const [upcomingEvents, setUpcomingEvents] = useState<typeof events>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Events");

  // Filter expired events after the component mounts.
  useEffect(() => {
    const filterUpcomingEvents = () => {
      const today = new Date();

      const filtered = events.filter((event) => {
        const eventDate = new Date(`${event.date}T23:59:59`);
        return eventDate >= today;
      });

      setUpcomingEvents(filtered);
      setIsMounted(true);
    };

    filterUpcomingEvents();

    // Refresh the list periodically.
    const interval = setInterval(filterUpcomingEvents, 60000);

    return () => clearInterval(interval);
  }, []);

  // Search and category filtering.
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
      {/* Page Header */}
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

      {/* Events Section */}
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        {/* Section Heading */}
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
            {isMounted ? upcomingEvents.length : "—"} Upcoming Events
          </div>
        </div>

        {/* Search & Filter */}
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

        {/* Loading State */}
        {!isMounted ? (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-96 animate-pulse rounded-2xl bg-secondary"
              />
            ))}
          </div>
        ) : filteredEvents.length > 0 ? (
          /* Events Grid */
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <article
                key={event.id}
                className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/5"
              >
                {/* Thumbnail */}
                <div className="relative h-56 overflow-hidden bg-secondary">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-primary shadow-sm">
                    {event.category}
                  </span>
                </div>

                {/* Content */}
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
                      <span className="text-xs">• {event.time}</span>
                    </div>

                    <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <Users size={17} className="shrink-0 text-primary" />
                      {event.volunteers}/{event.requiredVolunteers} Volunteers
                    </div>
                  </div>

                  {/* View Details */}
                  <Link
                    href={`/events/${event.id}`}
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
          /* Empty State */
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