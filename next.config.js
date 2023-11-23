/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/board",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    const BASE_API_URL = process.env.BASE_API_URL || "http://localhost:3000";
    return [
      {
        source: "/api/:path*",
        destination: `${BASE_API_URL}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
