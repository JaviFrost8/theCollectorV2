import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['image.tmdb.org'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/search',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
