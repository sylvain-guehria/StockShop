/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['.'],
  },
  poweredByHeader: false,
  trailingSlash: true,
  basePath: '',
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      'assets.vercel.com',
      'images.unsplash.com',
      'firebasestorage.googleapis.com',
    ],
  },
  async redirects() {
    return [
      {
        source: '/dashboard/',
        destination: '/dashboard/inventories/',
        permanent: true,
      },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);
