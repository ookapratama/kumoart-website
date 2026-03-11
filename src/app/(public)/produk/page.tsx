import ProductPageContent from "@/components/Product/ProductPageContent";
import { getAllProducts } from "@/lib/products.server";

export default async function ProdukPage() {
  const allProducts = await getAllProducts();

  return <ProductPageContent initialProducts={allProducts} />;
}
