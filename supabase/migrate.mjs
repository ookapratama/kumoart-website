/**
 * KUMOART - Migration Script
 * Migrasi data dari file .md (content/products & content/events) ke Supabase
 *
 * Cara pakai:
 *   1. Pastikan .env.local sudah berisi SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY
 *   2. Jalankan: node supabase/migrate.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";

// --- Setup path ---
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

// --- Load .env.local manually ---
function loadEnv() {
  const envPath = path.join(root, ".env.local");
  if (!fs.existsSync(envPath)) {
    console.error("❌ File .env.local tidak ditemukan!");
    process.exit(1);
  }
  const lines = fs.readFileSync(envPath, "utf8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const [key, ...rest] = trimmed.split("=");
    process.env[key.trim()] = rest.join("=").trim();
  }
}

// --- Parse frontmatter sederhana ---
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: "" };
  const frontmatter = match[1];
  const body = match[2] || "";
  const data = {};
  for (const line of frontmatter.split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();
    // Handle boolean
    if (value === "true") value = true;
    else if (value === "false") value = false;
    // Handle number
    else if (!isNaN(value) && value !== "") value = Number(value);
    // Handle array (simple: "- item" format — skip for now, handled separately)
    data[key] = value;
  }
  return { data, content: body.trim() };
}

// --- Baca terms dari .md event (array format) ---
function parseTermsFromContent(frontmatterStr) {
  const termsMatch = frontmatterStr.match(/terms:\n([\s\S]*?)(?=\n\w|$)/);
  if (!termsMatch) return [];
  const termsLines = termsMatch[1].split("\n");
  return termsLines
    .filter((l) => l.trim().startsWith("-"))
    .map((l) =>
      l
        .replace(/^\s*-\s*/, "")
        .replace(/^["']|["']$/g, "")
        .trim(),
    )
    .filter(Boolean);
}

async function main() {
  loadEnv();

  const supabaseUrl =
    process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error(
      "❌ SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY harus diisi di .env.local",
    );
    console.error("   Cari di: Supabase Dashboard > Settings > API");
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);
  console.log("✅ Terhubung ke Supabase");

  // ========================
  // MIGRASI PRODUCTS
  // ========================
  console.log("\n📦 Memulai migrasi Products...");
  const productsDir = path.join(root, "content/products");

  if (!fs.existsSync(productsDir)) {
    console.warn("⚠️  Folder content/products tidak ditemukan, skip.");
  } else {
    const files = fs.readdirSync(productsDir).filter((f) => f.endsWith(".md"));
    let successCount = 0;
    let skipCount = 0;

    for (const file of files) {
      const fullPath = path.join(productsDir, file);
      const raw = fs.readFileSync(fullPath, "utf8");
      const { data, content } = parseFrontmatter(raw);

      const product = {
        slug: data.slug || file.replace(".md", ""),
        name: data.name || "Produk Tanpa Nama",
        description: data.description || null,
        price: Number(data.price) || 0,
        category: data.category || null,
        image_url: data.image || null,
        is_featured: Boolean(data.isFeatured),
        is_active: data.isActive !== false, // default true
        stock: Number(data.stock) || 0,
        content: content || null,
      };

      const { error } = await supabase
        .from("products")
        .upsert(product, { onConflict: "slug" });

      if (error) {
        console.error(
          `  ❌ Gagal migrasi produk "${product.name}":`,
          error.message,
        );
        skipCount++;
      } else {
        console.log(`  ✅ ${product.name}`);
        successCount++;
      }
    }
    console.log(`\n  Produk: ${successCount} berhasil, ${skipCount} gagal`);
  }

  // ========================
  // MIGRASI EVENTS
  // ========================
  console.log("\n📅 Memulai migrasi Events...");
  const eventsDir = path.join(root, "content/events");

  if (!fs.existsSync(eventsDir)) {
    console.warn("⚠️  Folder content/events tidak ditemukan, skip.");
  } else {
    const files = fs.readdirSync(eventsDir).filter((f) => f.endsWith(".md"));
    let successCount = 0;
    let skipCount = 0;

    for (const file of files) {
      const fullPath = path.join(eventsDir, file);
      const raw = fs.readFileSync(fullPath, "utf8");

      // Parse terms secara khusus karena format array YAML
      const frontmatterMatch = raw.match(/^---\n([\s\S]*?)\n---/);
      const frontmatterStr = frontmatterMatch ? frontmatterMatch[1] : "";
      const terms = parseTermsFromContent(frontmatterStr);

      const { data, content } = parseFrontmatter(raw);

      const event = {
        slug: data.slug || file.replace(".md", ""),
        title: data.title || "Event Tanpa Judul",
        description: data.description || null,
        start_date: data.startDate || new Date().toISOString().split("T")[0],
        end_date: data.endDate || new Date().toISOString().split("T")[0],
        image_url: data.image || null,
        is_active: Boolean(data.isActive),
        discount: data.discount ? Number(data.discount) : null,
        price: Number(data.price) || 0,
        location: data.location || null,
        quota: data.quota ? Number(data.quota) : null,
        terms: terms,
        content: content || null,
      };

      const { error } = await supabase
        .from("events")
        .upsert(event, { onConflict: "slug" });

      if (error) {
        console.error(
          `  ❌ Gagal migrasi event "${event.title}":`,
          error.message,
        );
        skipCount++;
      } else {
        console.log(`  ✅ ${event.title}`);
        successCount++;
      }
    }
    console.log(`\n  Events: ${successCount} berhasil, ${skipCount} gagal`);
  }

  console.log("\n🎉 Migrasi selesai!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
