const isGithubPages = process.env.GITHUB_PAGES === 'true'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: isGithubPages ? '/pages' : '',
  assetPrefix: isGithubPages ? '/pages/' : '',
  images: {
    unoptimized: isGithubPages
  }
}

module.exports = nextConfig