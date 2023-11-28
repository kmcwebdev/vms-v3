await import("./lib/env.mjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "cdn.kmc.solutions",
        pathname: '/**',
      },
    ],
  },
 
};

export default nextConfig;
