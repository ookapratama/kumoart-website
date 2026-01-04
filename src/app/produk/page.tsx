import ProductPageContent from "@/components/Product/ProductPageContent";
import { getAllProductsServer } from "@/lib/products.server";

export default function ProdukPage() {
  const allProducts = getAllProductsServer();

  return <ProductPageContent initialProducts={allProducts} />;
}
