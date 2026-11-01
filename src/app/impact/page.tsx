import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users, CalendarDays, Heart, MapPin } from "lucide-react";

const stats = [
  { icon: Users, value: "500+", label: "Active Volunteers" },
  { icon: CalendarDays, value: "120+", label: "Events Organized" },
  { icon: MapPin, value: "25+", label: "Communities Reached" },
  { icon: Heart, value: "5,000+", label: "Lives Impacted" },
];

const stories = [
  {
    src: "/images/events/Winter%20Clothes%20Distribution.png",
    title: "Warm Winter for 500 Families",
    category: "Donation",
    description:
      "Volunteers collected and distributed blankets and warm clothes so underprivileged families could face the cold with dignity.",
  },
  {
    src: "/images/gallery/Tree%20Plantation.png",
    title: "1,000 New Trees, Greener Dhaka",
    category: "Environment",
    description:
      "Our plantation campaign turned bare ground into green spaces and encouraged locals to protect what they planted.",
  },
  {
    src: "/images/events/Healthcare%20Camp.png",
    title: "Free Health Checkups for 800 People",
    category: "Healthcare",
    description:
      "Medical volunteers offered free screenings and awareness sessions to communities with little access to care.",
  },
];

export default function ImpactPage() {
  return (
    <main className="min-h-screen px-5 py-16 sm:px-8 lg:px-16">
      <div className="container mx-auto px-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
            Our Impact
          </p>

          <h1 className="text-3xl font-bold text-foreground sm:text-5xl">
            Small Actions, Big Results
          </h1>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-muted-foreground">
            Every event, every helping hand, and every hour of your time adds
            up to real change for real people.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-2xl border border-border bg-card p-7 text-center"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
                  <Icon size={24} />
                </div>

                <p className="mt-5 text-3xl font-bold text-primary">
                  {stat.value}
                </p>

                <p className="mt-2 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mb-6 mt-16">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Stories of Change
          </h2>

          <p className="mt-2 text-muted-foreground">
            A few moments where our community made a difference.
          </p>
        </div>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <article
              key={story.title}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={story.src}
                  alt={story.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />

                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-primary shadow-sm">
                  {story.category}
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                  {story.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {story.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 rounded-3xl bg-emerald-800 px-6 py-12 text-center text-white">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Write the Next Story With Us
          </h2>

          <p className="mx-auto mt-3 max-w-xl leading-7 text-emerald-100">
            Pick an upcoming event and turn your time into impact.
          </p>

          <Link
            href="/events"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-emerald-800 transition hover:bg-emerald-50"
          >
            See Upcoming Events
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
      </div>
    </main>
  );
}