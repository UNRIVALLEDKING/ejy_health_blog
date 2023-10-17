/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'files.catbox.moe',
      },
    ],
  },
};

module.exports = nextConfig;
