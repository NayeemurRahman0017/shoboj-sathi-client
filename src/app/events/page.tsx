import Image from "next/image";
import Link from "next/link";

const events = [
  {
    id: "winter-clothes",
    title: "Winter Clothes Distribution",
    description:
      "Help us distribute warm clothes to underprivileged people during winter.",
    date: "November 05, 2026",
    location: "Mirpur 10, Dhaka",
    category: "Community Support",
    image: "/images/events/Winter%20Clothes%20Distribution.png",
  },
  {
    id: "community-cleanup",
    title: "Community Cleanup Drive",
    description:
      "Join our volunteers to make local streets and public spaces cleaner.",
    date: "November 08, 2026",
    location: "Dhanmondi, Dhaka",
    category: "Environment",
    image: "/images/gallery/Community%20Cleanup.png",
  },
  {
    id: "free-health-camp",
    title: "Free Health Camp",
    description:
      "Support a free health checkup campaign for people in need.",
    date: "November 12, 2026",
    location: "Mohammadpur, Dhaka",
    category: "Healthcare",
    image: "/images/events/Healthcare%20Camp.png",
  },
  {
    id: "food-distribution",
    title: "Food Distribution Program",
    description:
      "Help provide nutritious meals to disadvantaged families.",
    date: "November 15, 2026",
    location: "Uttara, Dhaka",
    category: "Food Support",
    image: "/images/events/Food%20Distribution.png",
  },
  {
    id: "tree-plantation",
    title: "Tree Plantation Campaign",
    description:
      "Plant trees and contribute to a greener and healthier environment.",
    date: "November 20, 2026",
    location: "Ramna Park, Dhaka",
    category: "Environment",
    image: "/images/gallery/Tree%20Plantation.png",
  },
  {
    id: "education-support",
    title: "Education for Everyone",
    description:
      "Support educational activities for children from underprivileged families.",
    date: "November 25, 2026",
    location: "Mirpur, Dhaka",
    category: "Education",
    image: "/images/events/Education%20Support.png",
  },
];

export default function EventsPage() {
  return (
    <main className="min-h-screen px-5 py-16 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Page Heading */}
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

        {/* Events Grid */}
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <article
              key={event.id}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Event Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />

                <span className="absolute left-4 top-4 rounded-full bg-emerald-600 px-4 py-1.5 text-xs font-semibold text-white">
                  {event.category}
                </span>
              </div>

              {/* Event Information */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-foreground">
                  {event.title}
                </h2>

                <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
                  {event.description}
                </p>

                <div className="mt-5 space-y-2 text-sm text-muted-foreground">
                  <p>
                    <span className="font-semibold text-foreground">
                      Date:
                    </span>{" "}
                    {event.date}
                  </p>

                  <p>
                    <span className="font-semibold text-foreground">
                      Location:
                    </span>{" "}
                    {event.location}
                  </p>
                </div>

                <Link
                  href={`/events/${event.id}`}
                  className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
                >
                  View Details
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}