/** @type {import('next').NextConfig} */
const withMDX = require('@next/mdx')({
  extension: /\\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  transpilePackages: ['framer-motion'],
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  async headers() {
    return [
      {
        source: '/:path*.(mp4|mov|webm|avi|mkv)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Accept-Ranges',
            value: 'bytes',
          },
        ],
      },
    ];
  },
};

module.exports = withMDX(nextConfig);
