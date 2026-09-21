/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/meekhaasa",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
