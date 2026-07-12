import Link from "next/link";
import DeleteAction from "@/components/admin/shared/delete-action";
import { deleteProduct } from "@/lib/actions/products";
import { getAllProductsAdmin } from "@/lib/products.server";
import { formatPrice } from "@/lib/products";

import type { Metadata } from "next";

export const metadata: Metadata = { title: "Manajemen Produk — Admin Kumoart" };

export default async function AdminProdukPage() {
  const products = await getAllProductsAdmin();

  return (
    <div className="list-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Produk</h1>
          <p className="page-subtitle">{products.length} produk terdaftar</p>
        </div>
        <Link href="/admin/produk/baru" className="btn-primary">
          + Tambah Produk
        </Link>
      </div>

      <div className="table-card">
        {products.length === 0 ? (
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
                    <td data-label="Gambar">
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
                    <td data-label="Nama Produk">
                      <div className="table-name">{product.name}</div>
                      <div className="table-slug">/{product.slug}</div>
                    </td>
                    <td data-label="Kategori">
                      <span className="tag">{product.category ?? "—"}</span>
                    </td>
                    <td data-label="Harga" className="table-price">
                      {formatPrice(product.price)}
                    </td>
                    <td data-label="Stok" className="table-center">
                      {product.stock}
                    </td>
                    <td data-label="Status">
                      <span
                        className={`badge ${product.is_active ? "badge-green" : "badge-gray"}`}
                      >
                        {product.is_active ? "Aktif" : "Nonaktif"}
                      </span>
                    </td>
                    <td data-label="Featured" className="table-center">
                      <span
                        className={`badge ${product.is_featured ? "badge-amber" : "badge-gray"}`}
                      >
                        {product.is_featured ? "⭐ Ya" : "—"}
                      </span>
                    </td>
                    <td data-label="Aksi">
                      <DeleteAction
                        id={product.id}
                        name={product.name}
                        editHref={`/admin/produk/${product.id}/edit`}
                        action={deleteProduct}
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
