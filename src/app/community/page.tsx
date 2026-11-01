import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users, HeartHandshake, Leaf } from "lucide-react";

const communityImages = [
  {
    src: "/images/gallery/Volunteer%20Team.png",
    title: "Volunteer Team",
    category: "Community Support",
  },
  {
    src: "/images/gallery/Community%20Cleanup.png",
    title: "Community Cleanup",
    category: "Environment",
  },
  {
    src: "/images/gallery/Park%20Cleanup.png",
    title: "Park Cleanup",
    category: "Environment",
  },
];

const values = [
  {
    icon: Users,
    title: "Everyone is Welcome",
    description:
      "Regardless of age, background, or experience — there is a place for you in our community.",
  },
  {
    icon: HeartHandshake,
    title: "Teamwork First",
    description:
      "We achieve more together. Every volunteer supports and uplifts the rest of the team.",
  },
  {
    icon: Leaf,
    title: "Rooted Locally",
    description:
      "We start with our own neighborhoods and grow into a movement that reaches further.",
  },
];

export default function CommunityPage() {
  return (
    <main className="min-h-screen px-5 py-16 sm:px-8 lg:px-16">
      <div className="container mx-auto px-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
            Our Community
          </p>

          <h1 className="text-3xl font-bold text-foreground sm:text-5xl">
            Connect with People Who Care
          </h1>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-muted-foreground">
            Meet passionate volunteers, share your skills, and build lasting
            friendships while creating positive change together.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {communityImages.map((item) => (
            <div
              key={item.title}
              className="group relative h-72 overflow-hidden rounded-2xl border border-border"
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

              <div className="absolute bottom-0 left-0 p-6">
                <span className="mb-2 inline-block rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white">
                  {item.category}
                </span>

                <h2 className="text-xl font-bold text-white">{item.title}</h2>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <div
                key={value.title}
                className="rounded-2xl border border-border bg-card p-7"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
                  <Icon size={24} />
                </div>

                <h3 className="mt-5 text-lg font-bold text-foreground">
                  {value.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-14 rounded-3xl bg-emerald-800 px-6 py-12 text-center text-white">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Ready to Meet Your Community?
          </h2>

          <p className="mx-auto mt-3 max-w-xl leading-7 text-emerald-100">
            Join an event and start building connections that last.
          </p>

          <Link
            href="/events"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-emerald-800 transition hover:bg-emerald-50"
          >
            Join an Event
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
      </div>
    </main>
  );
}