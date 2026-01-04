import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image configuration
  images: {
    // Untuk static export, gunakan unoptimized images
    unoptimized: true,
  },

  // Trailing slash for static hosting compatibility
  trailingSlash: true,

  // Handle /admin route for Decap CMS
  async rewrites() {
    return [
      {
        source: "/admin",
        destination: "/admin/index.html",
      },
      {
        source: "/admin/",
        destination: "/admin/index.html",
      },
    ];
  },
};

export default nextConfig;
