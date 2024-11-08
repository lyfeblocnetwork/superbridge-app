/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ethereum-optimism.github.io",
        port: "",
        pathname: "/data/**",
      },
    ],
  },
  optimizeFonts: false,
  experimental: {
    optimizeCss: true,
    bundlePagesExternals: true,
  },

  async redirects() {
    return [
      {
        source: "/blog",
        destination:
          "https://mirror.xyz/0xfb18aAc9D6ABbDD00fd59dD15d03a49428A3fe22",
        permanent: true,
      },
      {
        source: "/docs",
        destination: "https://docs.superbridge.app",
        permanent: true,
      },
      {
        source: "/register",
        destination: "https://about.superbridge.app/rollies",
        permanent: true,
      },
      {
        source: "/rollies",
        destination: "https://about.superbridge.app/rollies",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/(.*)", // Apply to all routes
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src *; script-src 'self'; style-src 'self'; connect-src *; frame-ancestors 'self' https://network.ethena.fi http://localhost;",
          },
        ],
      },
    ];
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
module.exports = withBundleAnalyzer(config);
