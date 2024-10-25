import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.devtool = false; // Disable source maps
    return config;
  },
};

export default nextConfig;
