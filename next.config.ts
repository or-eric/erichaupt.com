import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Images: Allow Supabase storage
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
  // We'll let Cloudflare handle the build, so we can be a bit more permissive locally if needed
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
