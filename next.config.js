/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/a/:opportunityId',
        destination: '/assessment/:opportunityId',
      },
    ];
  },
};

module.exports = nextConfig;
