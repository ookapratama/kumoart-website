import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image configuration
  images: {
    // Untuk static export, gunakan unoptimized images
    unoptimized: true,
  },

  // Trailing slash for static hosting compatibility
  trailingSlash: true,
};

export default nextConfig;
