/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // ReWrite API Request to Express
      {
        source: "/api/v1/:path*",
        destination: "http://localhost:3333/api/v1/:path*",
      },
    ];
  },
};

export default nextConfig;
