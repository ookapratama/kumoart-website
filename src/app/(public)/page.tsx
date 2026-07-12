import HomePageContent from "@/components/Home/HomePageContent";
import { getFeaturedProducts } from "@/lib/products.server";
import { getAllEvents } from "@/lib/events.server";

export const revalidate = 3600;

export default async function HomePage() {
  const [featuredProducts, activeEvents] = await Promise.all([
    getFeaturedProducts(),
    getAllEvents(),
  ]);

  return (
    <HomePageContent
      featuredProducts={featuredProducts}
      activeEvents={activeEvents}
    />
  );
}
