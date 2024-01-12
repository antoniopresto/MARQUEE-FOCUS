/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  compiler: {
    styledComponents: {
      displayName: true,
      fileName: true,
    },
  },
  eslint: {
    // Disabling on production builds because we're running checks on PRs via GitHub Actions.
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
