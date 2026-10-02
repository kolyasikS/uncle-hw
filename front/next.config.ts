import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "standalone",
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  env: {
    NEXT_AUTH_COOKIE_NAME: process.env.NEXT_AUTH_COOKIE_NAME,
    NEXT_AUTH_VERIFY_PATH: process.env.NEXT_AUTH_VERIFY_PATH,
    NEXT_SERVER_USER_SERVICE_API_URL:
      process.env.NEXT_SERVER_USER_SERVICE_API_URL,
  },
};

export default nextConfig;
