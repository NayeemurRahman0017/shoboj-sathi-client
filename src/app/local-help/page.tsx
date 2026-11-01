import Link from "next/link";
import { ArrowRight, MapPin, CalendarDays } from "lucide-react";

const areas = [
  {
    name: "Mirpur",
    description:
      "Donation drives and community support programs for families in the Mirpur area.",
    category: "Donation",
  },
  {
    name: "Dhanmondi",
    description:
      "Clean-up drives and environmental activities around Dhanmondi's streets and parks.",
    category: "Environment",
  },
  {
    name: "Uttara",
    description:
      "Free health camps and medical volunteer opportunities across Uttara.",
    category: "Healthcare",
  },
  {
    name: "Mohammadpur",
    description:
      "Food distribution and relief programs for families in need in Mohammadpur.",
    category: "Food Support",
  },
  {
    name: "Savar",
    description:
      "Tree plantation campaigns and green initiatives around Savar.",
    category: "Environment",
  },
  {
    name: "Gazipur",
    description:
      "Education support and learning programs for children in Gazipur.",
    category: "Education",
  },
];

export default function LocalHelpPage() {
  return (
    <main className="min-h-screen px-5 py-16 sm:px-8 lg:px-16">
      <div className="container mx-auto px-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
            Help Locally
          </p>

          <h1 className="text-3xl font-bold text-foreground sm:text-5xl">
            Find Opportunities in Your Neighborhood
          </h1>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-muted-foreground">
            Change starts close to home. Explore volunteering opportunities in
            your own area and support the people next door.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area) => (
            <div
              key={area.name}
              className="group flex flex-col rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
                  <MapPin size={24} />
                </div>

                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">
                  {area.category}
                </span>
              </div>

              <h2 className="mt-5 text-xl font-bold text-foreground">
                {area.name}
              </h2>

              <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">
                {area.description}
              </p>

              <Link
                href="/events"
                className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition hover:opacity-90"
              >
                <CalendarDays size={16} />
                View Events
                <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      </div>
      </div>
    </main>
  );
}