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
};

export default nextConfig;
