/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  reactStrictMode: false,
  env: {
    AWS_S3_ACCESS_KEY: 'AKIAQKKL3HGVTD3BMLPE',
    AWS_S3_SECRET_ACCESS_KEY: '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',
    AWS_S3_REGION: 'us-east-1',
    AWS_S3_BUCKET_NAME: 'ejy-blog-images',
  },
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
