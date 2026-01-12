/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/pages',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
