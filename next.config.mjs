await import("./lib/env.mjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/cms?tab=overview',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
