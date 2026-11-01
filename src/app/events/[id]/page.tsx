import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import {
  CalendarDays,
  MapPin,
  Clock,
  Users,
  ArrowLeft,
  HeartHandshake,
} from "lucide-react";

const events = [
  {
    id: "winter-clothes",
    title: "Winter Clothes Distribution",
    description:
      "Help us distribute warm clothes to underprivileged people during winter.",
    fullDescription:
      "Winter can be extremely difficult for people living in poverty. Many families struggle to afford warm clothing. Through this initiative, we aim to collect and distribute warm clothes, blankets, and essential winter items to people who need them most. Join our volunteers and help make this winter warmer for everyone.",
    date: "November 05, 2026",
    time: "09:00 AM - 01:00 PM",
    location: "Mirpur 10, Dhaka",
    category: "Community Support",
    image: "/images/events/Winter%20Clothes%20Distribution.png",
    organizer: "ShobujShathi Community Team",
    volunteers: 25,
    requiredVolunteers: 40,
  },
  {
    id: "community-cleanup",
    title: "Community Cleanup Drive",
    description:
      "Join our volunteers to make local streets and public spaces cleaner.",
    fullDescription:
      "A clean environment creates a healthier community. Volunteers will work together to clean public spaces, collect waste, and raise awareness about responsible waste management.",
    date: "November 08, 2026",
    time: "08:00 AM - 11:00 AM",
    location: "Dhanmondi, Dhaka",
    category: "Environment",
    image: "/images/gallery/Community%20Cleanup.png",
    organizer: "Green Community Team",
    volunteers: 18,
    requiredVolunteers: 30,
  },
  {
    id: "free-health-camp",
    title: "Free Health Camp",
    description:
      "Support a free health checkup campaign for people in need.",
    fullDescription:
      "Our free health camp aims to provide basic health checkups and awareness to underserved communities. Volunteers will help organize registrations and support healthcare professionals.",
    date: "November 12, 2026",
    time: "09:00 AM - 02:00 PM",
    location: "Mohammadpur, Dhaka",
    category: "Healthcare",
    image: "/images/events/Healthcare%20Camp.png",
    organizer: "Healthcare Volunteer Team",
    volunteers: 20,
    requiredVolunteers: 35,
  },
  {
    id: "food-distribution",
    title: "Food Distribution Program",
    description:
      "Help provide nutritious meals to disadvantaged families.",
    fullDescription:
      "Food is a basic human need. This initiative brings volunteers together to prepare and distribute nutritious food packages to families facing food insecurity.",
    date: "November 15, 2026",
    time: "10:00 AM - 01:00 PM",
    location: "Uttara, Dhaka",
    category: "Food Support",
    image: "/images/events/Food%20Distribution.png",
    organizer: "Food Support Team",
    volunteers: 15,
    requiredVolunteers: 30,
  },
  {
    id: "tree-plantation",
    title: "Tree Plantation Campaign",
    description:
      "Plant trees and contribute to a greener and healthier environment.",
    fullDescription:
      "Trees are essential for a healthy planet. Join our campaign to plant trees in public spaces and encourage people to protect the environment.",
    date: "November 20, 2026",
    time: "08:00 AM - 12:00 PM",
    location: "Ramna Park, Dhaka",
    category: "Environment",
    image: "/images/gallery/Tree%20Plantation.png",
    organizer: "Green Community Team",
    volunteers: 28,
    requiredVolunteers: 50,
  },
  {
    id: "education-support",
    title: "Education for Everyone",
    description:
      "Support educational activities for children from underprivileged families.",
    fullDescription:
      "Every child deserves access to quality education. Volunteers will help organize learning activities, distribute educational materials, and encourage children to continue their studies.",
    date: "November 25, 2026",
    time: "10:00 AM - 01:00 PM",
    location: "Mirpur, Dhaka",
    category: "Education",
    image: "/images/events/Education%20Support.png",
    organizer: "Education Support Team",
    volunteers: 12,
    requiredVolunteers: 25,
  },
];

type Props = {
  params: Promise<{ id: string }>;
};

async function EventDetailsContent({ params }: Props) {
  const { id } = await params;

  const event = events.find((item) => item.id === id);

  if (!event) {
    notFound();
  }

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
            <div className="relative h-72 overflow-hidden rounded-3xl sm:h-105">
              <Image
                src={event.image}
                alt={event.title}
                fill
                priority
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

                <p className="mt-4 leading-8 text-muted-foreground">
                  {event.fullDescription}
                </p>
              </div>

              <div className="mt-10">
                <h2 className="text-2xl font-bold text-foreground">
                  Event Organizer
                </h2>

                <p className="mt-3 text-muted-foreground">
                  {event.organizer}
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
                      {event.date}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Clock className="shrink-0 text-emerald-600" />
                  <div>
                    <p className="font-semibold text-foreground">Time</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {event.time}
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
                      {event.volunteers} / {event.requiredVolunteers} joined
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-7">
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Volunteer Progress
                  </span>

                  <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                    {Math.round(
                      (event.volunteers / event.requiredVolunteers) * 100,
                    )}
                    %
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-emerald-600"
                    style={{
                      width: `${
                        (event.volunteers / event.requiredVolunteers) * 100
                      }%`,
                    }}
                  />
                </div>
              </div>

              <button
                disabled
                className="mt-8 flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3.5 font-semibold text-white opacity-70"
              >
                <HeartHandshake size={20} />
                Join Event
              </button>

              <p className="mt-3 text-center text-xs text-muted-foreground">
                Event registration will be available after authentication.
              </p>
            </div>
          </aside>
        </div>
      </div>
      </div>
    </main>
  );
}

function EventDetailsLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-muted-foreground">Loading event details...</p>
    </div>
  );
}

export default function EventDetailsPage({ params }: Props) {
  return (
    <Suspense fallback={<EventDetailsLoading />}>
      <EventDetailsContent params={params} />
    </Suspense>
  );
}