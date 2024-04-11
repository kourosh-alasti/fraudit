/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
        port: "",
      },
    ],
  },
  async rewrites() {
    return [
      // ReWrite API Request to Express
      {
        source: "/api/v1/:path*",
        destination: "http://localhost:3333/api/v1/:path*",
      },
    ];
  },
  // async redirects() {
  //   return [
  //     // Redirect to /login
  //     // If Cookie is not set
  //     {
  //       source: "/",
  //       missing: [{ type: "cookie", key: "access_token" }],
  //       permanent: true,
  //       destination: "/auth/login",
  //     },
  //     {
  //       source: "/login",
  //       permanent: true,
  //       destination: "/auth/login",
  //     },
  //     {
  //       source: "/register",
  //       permanent: true,
  //       destination: "/auth/register",
  //     },
  //   ];
  // },
};

export default nextConfig;
