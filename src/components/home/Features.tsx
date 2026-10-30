import {
  CalendarDays,
  Users,
  HandHeart,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

const features = [
  {
    icon: CalendarDays,
    title: "Discover Events",
    description:
      "Find meaningful community service events happening around your neighborhood.",
    color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
  },
  {
    icon: Users,
    title: "Connect with People",
    description:
      "Meet like-minded individuals who share your passion for helping others.",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
  },
  {
    icon: HandHeart,
    title: "Make an Impact",
    description:
      "Turn your time and effort into meaningful actions that improve lives.",
    color: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
  },
  {
    icon: MapPin,
    title: "Help Locally",
    description:
      "Support people in your own community through local volunteering opportunities.",
    color: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400",
  },
];

export default function Features() {
  return (
    <section className="bg-secondary/40 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="inline-block rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-primary">
            Why ShobujShathi?
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Together, We Can Make
            <span className="text-primary"> a Difference</span>
          </h2>

          <p className="mt-5 leading-7 text-muted-foreground">
            We make it easier to find opportunities, connect with volunteers,
            and create positive change in your community.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${feature.color}`}
                  >
                    <Icon size={27} />
                  </div>

                  <span className="text-sm font-semibold text-muted-foreground/50">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="mt-7 text-xl font-bold text-foreground">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {feature.description}
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-primary">
                  Learn More
                  <ArrowUpRight
                    size={17}
                    className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}