import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import type { Metadata } from "next";
import ProductActions from "@/components/admin/ProductActions";

export const metadata: Metadata = { title: "Manajemen Produk — Admin Kumoart" };

export default async function AdminProdukPage() {
  const supabase = await createClient();
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <div className="error-state">Gagal memuat data produk.</div>;
  }

  return (
    <div className="list-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Produk</h1>
          <p className="page-subtitle">
            {products?.length ?? 0} produk terdaftar
          </p>
        </div>
        <Link href="/admin/produk/baru" className="btn-primary">
          + Tambah Produk
        </Link>
      </div>

      <div className="table-card">
        {!products || products.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🛍️</div>
            <p>Belum ada produk. Tambahkan produk pertama!</p>
            <Link href="/admin/produk/baru" className="btn-primary">
              + Tambah Produk
            </Link>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Gambar</th>
                  <th>Nama Produk</th>
                  <th>Kategori</th>
                  <th>Harga</th>
                  <th>Stok</th>
                  <th>Status</th>
                  <th>Featured</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="table-img">
                        {product.image_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="table-img-img"
                          />
                        ) : (
                          <div className="table-img-placeholder">🛍️</div>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="table-name">{product.name}</div>
                      <div className="table-slug">/{product.slug}</div>
                    </td>
                    <td>
                      <span className="tag">{product.category ?? "—"}</span>
                    </td>
                    <td className="table-price">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(product.price)}
                    </td>
                    <td className="table-center">{product.stock}</td>
                    <td>
                      <span
                        className={`badge ${product.is_active ? "badge-green" : "badge-gray"}`}
                      >
                        {product.is_active ? "Aktif" : "Nonaktif"}
                      </span>
                    </td>
                    <td className="table-center">
                      <span
                        className={`badge ${product.is_featured ? "badge-amber" : "badge-gray"}`}
                      >
                        {product.is_featured ? "⭐ Ya" : "—"}
                      </span>
                    </td>
                    <td>
                      <ProductActions
                        productId={product.id}
                        productName={product.name}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
