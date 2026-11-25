import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Scope framing protection to all non-embed routes
        source: '/((?!embed).*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Content-Security-Policy', value: "frame-ancestors 'self'" },
        ],
      },
      {
        // Permit external iframe embedding ONLY on the dedicated /embed/* widget routes
        source: '/embed/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: 'frame-ancestors *' },
        ],
      },
    ];
  },
};

export default nextConfig;
