import HomePageContent from "@/components/Home/HomePageContent";
import { getFeaturedProducts } from "@/lib/products";
import { getActiveEvents } from "@/lib/events";

export default async function HomePage() {
  const [featuredProducts, activeEvents] = await Promise.all([
    getFeaturedProducts(),
    getActiveEvents(),
  ]);

  return (
    <HomePageContent
      featuredProducts={featuredProducts}
      activeEvents={activeEvents}
    />
  );
}
