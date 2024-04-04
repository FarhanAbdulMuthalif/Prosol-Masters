/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.1.5",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
