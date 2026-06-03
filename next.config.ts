import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Allow dynamic server-side rendering for API routes
  serverExternalPackages: ["xlsx"],
};

export default nextConfig;
