
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import Gallery from "@/components/home/Gallery";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Features />
      <UpcomingEvents />
      <Gallery />
    </main>
  );
}