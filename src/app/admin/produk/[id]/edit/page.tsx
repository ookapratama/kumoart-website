import { getProductById } from "@/lib/products";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import ProductForm from "@/components/admin/ProductForm";

export const metadata: Metadata = { title: "Edit Produk — Admin Kumoart" };

export default async function EditProdukPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) notFound();

  return (
    <div className="form-page">
      <div className="page-header">
        <div>
          <div className="breadcrumb">
            <Link href="/admin/produk">Produk</Link>
            <span>/</span>
            <span>Edit</span>
          </div>
          <h1 className="page-title">Edit Produk</h1>
          <p className="page-subtitle">{product.name}</p>
        </div>
      </div>
      <ProductForm mode="edit" product={product} />
    </div>
  );
}
