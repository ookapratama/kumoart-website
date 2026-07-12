import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Gambar produk/event dihosting di Supabase Storage
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },

  // URL publik yang sudah beredar memakai trailing slash
  trailingSlash: true,

  experimental: {
    serverActions: {
      // Upload gambar (hasil kompresi max ~800KB) lewat Server Action
      bodySizeLimit: "2mb",
    },
  },
};

export default nextConfig;
