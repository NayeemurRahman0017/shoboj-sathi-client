import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  Users,
} from "lucide-react";

const events = [
  {
    id: "1",
    title: "Winter Clothes Distribution",
    category: "Community Support",
    date: "November 05, 2026",
    location: "Mirpur 10, Dhaka",
    volunteers: 24,
    image: "/images/events/winter-clothes.jpg",
  },
  {
    id: "2",
    title: "Community Clean-up Campaign",
    category: "Environment",
    date: "November 08, 2026",
    location: "Dhanmondi, Dhaka",
    volunteers: 18,
    image: "/images/events/cleanup.jpg",
  },
  {
    id: "3",
    title: "Free Health Awareness Camp",
    category: "Healthcare",
    date: "November 12, 2026",
    location: "Uttara, Dhaka",
    volunteers: 30,
    image: "/images/events/health-camp.jpg",
  },
  {
    id: "4",
    title: "Food Distribution for Families",
    category: "Food Support",
    date: "November 15, 2026",
    location: "Mohammadpur, Dhaka",
    volunteers: 20,
    image: "/images/events/food-distribution.jpg",
  },
  {
    id: "5",
    title: "Plant Trees, Save Nature",
    category: "Environment",
    date: "November 18, 2026",
    location: "Ramna, Dhaka",
    volunteers: 35,
    image: "/images/events/tree-plantation.jpg",
  },
  {
    id: "6",
    title: "Free Education for Children",
    category: "Education",
    date: "November 22, 2026",
    location: "Bashundhara, Dhaka",
    volunteers: 15,
    image: "/images/events/education.jpg",
  },
];

export default function UpcomingEvents() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Section Heading */}
        <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <span className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-primary">
              Make a Difference
            </span>

            <h2 className="mt-5 text-3xl font-bold text-foreground sm:text-4xl">
              Upcoming <span className="text-primary">Events</span>
            </h2>

            <p className="mt-4 max-w-xl leading-7 text-muted-foreground">
              Explore upcoming opportunities and join hands with people
              who want to make a positive impact.
            </p>
          </div>

          <Link
            href="/events"
            className="inline-flex w-fit items-center gap-2 font-semibold text-primary transition hover:gap-3"
          >
            View All Events
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Event Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <article
              key={event.id}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Event Image */}
              <div className="relative h-56 overflow-hidden bg-secondary">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                <span className="absolute left-4 top-4 rounded-full bg-card/90 px-3 py-1.5 text-xs font-semibold text-primary backdrop-blur">
                  {event.category}
                </span>
              </div>

              {/* Event Information */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                  {event.title}
                </h3>

                <div className="mt-5 space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CalendarDays size={17} className="text-primary" />
                    {event.date}
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin size={17} className="text-primary" />
                    {event.location}
                  </div>

                  <div className="flex items-center gap-2">
                    <Users size={17} className="text-primary" />
                    {event.volunteers} volunteers joined
                  </div>
                </div>

                <Link
                  href={`/events/${event.id}`}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-primary/30 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
                >
                  View Details
                  <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}