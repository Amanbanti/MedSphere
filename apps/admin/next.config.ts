import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@medsphere/ui', '@medsphere/sdk'],
  reactStrictMode: true,
};

export default nextConfig;
