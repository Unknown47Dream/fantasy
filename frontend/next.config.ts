import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["t.me"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "ALLOWALL",
          },
        ],
      },
    ];
  },
  env: {
    NEXT_PUBLIC_BOT_USERNAME: process.env.TELEGRAM_BOT_USERNAME || "YourBotUsername",
    NEXT_PUBLIC_APP_NAME: process.env.TELEGRAM_APP_NAME || "app",
  },
};

export default nextConfig;
