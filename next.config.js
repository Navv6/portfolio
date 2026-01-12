/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === 'development'

const nextConfig = {
  output: 'export',
  basePath: isDev ? '' : '/portfolio',
  assetPrefix: isDev ? '' : '/portfolio/',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig