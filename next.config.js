/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    unoptimized: true, // For static export or if you want to disable optimization
  },
}

module.exports = nextConfig

