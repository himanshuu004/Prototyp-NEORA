/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    remotePatterns: [],
  },
  // Skip static optimization for pages that require Clerk
  output: 'standalone',
}

module.exports = nextConfig

