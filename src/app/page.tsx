import HomePageContent from "@/components/Home/HomePageContent";
import { getFeaturedProducts } from "@/lib/products.server";
import { getActiveEvents } from "@/lib/events.server";

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
