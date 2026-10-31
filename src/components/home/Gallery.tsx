import Image from "next/image";
import Link from "next/link";

const galleryImages = [
{
src: "/images/events/winter-clothes.jpg",
title: "Winter Clothes Distribution",
category: "Community Support",
},
{
src: "/images/events/cleanup.jpg",
title: "Community Cleanup",
category: "Environment",
},
{
src: "/images/events/health-camp.jpg",
title: "Free Health Camp",
category: "Healthcare",
},
{
src: "/images/events/food-distribution.jpg",
title: "Food Distribution",
category: "Food Support",
},
{
src: "/images/events/tree-plantation.jpg",
title: "Tree Plantation",
category: "Environment",
},
{
src: "/images/events/education.jpg",
title: "Education for Everyone",
category: "Education",
},
];

export default function Gallery() {
return ( <section className="px-5 py-20 sm:px-8 lg:px-16"> <div className="mx-auto max-w-7xl"> <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"> <div> <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
Moments That Matter </p>

        <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
          Making a Difference Together
        </h2>

        <p className="mt-3 max-w-xl text-muted-foreground">
          Every small action creates a meaningful impact. Explore moments
          from our community activities.
        </p>
      </div>

      <Link
        href="/events"
        className="w-fit rounded-full border border-emerald-700 px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-700 hover:text-white dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-400 dark:hover:text-slate-950"
      >
        Explore Events
      </Link>
    </div>

    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {galleryImages.map((item, index) => (
        <div
          key={item.title}
          className={`group relative h-72 overflow-hidden rounded-2xl ${
            index === 0 || index === 5 ? "lg:col-span-1" : ""
          }`}
        >
          <Image
            src={item.src}
            alt={item.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />

          <div className="absolute bottom-0 left-0 p-6">
            <span className="mb-2 inline-block rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-semibold text-white">
              {item.category}
            </span>

            <h3 className="text-xl font-bold text-white">
              {item.title}
            </h3>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


);
}
