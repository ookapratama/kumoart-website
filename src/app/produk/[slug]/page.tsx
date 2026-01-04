import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ProductDetail from "@/components/Product/ProductDetail";
import ProductList from "@/components/Product/ProductList";
import Breadcrumbs from "@/components/UI/Breadcrumbs";
import { formatPrice } from "@/lib/products";
import {
  getProductBySlugServer as getProductBySlug,
  getAllProductSlugsServer as getAllProductSlugs,
  getAllProductsServer as getAllProducts,
} from "@/lib/products.server";
import { config } from "@/lib/config";
import { translations } from "@/lib/translations";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static paths for SSG
export async function generateStaticParams() {
  const slugs = getAllProductSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Produk Tidak Ditemukan",
      description: "Produk yang Anda cari tidak tersedia.",
    };
  }

  const title = `${product.name} - ${product.category}`;
  const description = `${product.description} Harga: ${formatPrice(
    product.price
  )}. Pesan langsung via WhatsApp!`;
  const productUrl = `${config.site.url}/produk/${product.slug}`;

  return {
    title,
    description,

    // Keywords spesifik produk
    keywords: [
      product.name.toLowerCase(),
      product.category.toLowerCase(),
      "rajut",
      "handmade",
      "beli",
      "pesan",
      config.brand.name.toLowerCase(),
    ],

    // Canonical URL
    alternates: {
      canonical: `/produk/${product.slug}`,
    },

    // Open Graph untuk sharing
    openGraph: {
      type: "website",
      title: `${product.name} | ${config.brand.name}`,
      description,
      url: productUrl,
      siteName: config.brand.fullName,
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
      locale: "id_ID",
    },

    // Twitter Card
    twitter: {
      card: "summary_large_image",
      title: `${product.name} - ${formatPrice(product.price)}`,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Get related products (same category, excluding current)
  const allProducts = getAllProducts();
  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  // JSON-LD Schema untuk Product
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `${config.site.url}${product.image}`,
    brand: {
      "@type": "Brand",
      name: config.brand.name,
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "IDR",
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: config.brand.fullName,
      },
    },
    category: product.category,
  };

  return (
    <>
      {/* JSON-LD Schema untuk Product */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <div className="py-12 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs with Translation Support */}
          <Breadcrumbs
            items={[
              {
                label: translations.id["breadcrumb.products"],
                href: "/produk",
              },
              { label: product.name },
            ]}
          />

          {/* H1 - SEO Important */}
          <h1 className="sr-only">
            {product.name} - {product.category} | {config.brand.name}
          </h1>

          {/* Product Detail */}
          <ProductDetail product={product} />

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section
              className="mt-16"
              aria-labelledby="related-products-heading"
            >
              <h2
                id="related-products-heading"
                className="text-2xl font-bold text-gray-900 mb-6"
              >
                PRODUK SERUPA
              </h2>
              <ProductList products={relatedProducts} />
            </section>
          )}

          {/* Back Link */}
          <div className="mt-12 text-center">
            <Link
              href="/produk"
              className="inline-flex items-center text-rose-600 hover:text-rose-700 font-semibold transition-colors"
            >
              <svg
                className="mr-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              KEMBALI KE KATALOG
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
