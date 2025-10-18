import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "temp.namastebharatnews.in", // production url
      },
      
      // ✅ IMPROVED CONFIG: Allows all subdomains of youtube.com for images.
      {
        protocol: "https",
        hostname: "*.youtube.com",
      },
      // ⚠️ IMPORTANT: Also include i.ytimg.com as it's a common thumbnail host
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
    ],
    qualities: [75, 90, 100],
    formats: ["image/webp", "image/avif"], // allows HD modern formats
    minimumCacheTTL: 3600, // cache for 1 hour
  },
};

export default nextConfig;
