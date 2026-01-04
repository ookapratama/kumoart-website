import HomePageContent from "@/components/Home/HomePageContent";
import { getAllProductsServer } from "@/lib/products.server";
import { getActiveEventsServer } from "@/lib/events.server";

export default function HomePage() {
  const allProducts = getAllProductsServer();
  const featuredProducts = allProducts.filter((p) => p.isFeatured).slice(0, 6);
  const activeEvents = getActiveEventsServer();

  return (
    <HomePageContent
      featuredProducts={featuredProducts}
      activeEvents={activeEvents}
    />
  );
}
