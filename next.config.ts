import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The pricing page was replaced by the services page. A 301 (rather
      // than the 308 that `permanent: true` sends) is what the brief asked
      // for, and is understood by every client.
      { source: "/pricing", destination: "/services", statusCode: 301 },
    ];
  },
};

export default nextConfig;
