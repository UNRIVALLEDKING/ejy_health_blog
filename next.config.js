/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  reactStrictMode: false,

  // images: {
  //   remotePatterns: [
  //     // {
  //     //   protocol: 'https',
  //     //   hostname: 'files.catbox.moe',
  //     // },
  //     {
  //       protocol: 'https',
  //       hostname: 'ejy-blog-images.s3.amazonaws.com',
  //     },
  //   ],
  // },

  images: {
    domains: ['localhost', 'ejy-blog-images.s3.amazonaws.com'],
  },
};

module.exports = nextConfig;
