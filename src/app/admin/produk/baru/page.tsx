import type { Metadata } from "next";
import Link from "next/link";
import ProductForm from "@/components/admin/ProductForm";

export const metadata: Metadata = { title: "Tambah Produk — Admin Kumoart" };

export default function TambahProdukPage() {
  return (
    <div className="form-page">
      <div className="page-header">
        <div>
          <div className="breadcrumb">
            <Link href="/admin/produk">Produk</Link>
            <span>/</span>
            <span>Tambah Baru</span>
          </div>
          <h1 className="page-title">Tambah Produk Baru</h1>
        </div>
      </div>
      <ProductForm mode="create" />
    </div>
  );
}
