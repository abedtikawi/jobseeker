import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sabbar-prod-uploaded-files.s3.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
