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
            value: [
              "default-src 'self'", // restricts everything to the same origin by default
              "script-src 'self' 'unsafe-inline'", // allow scripts from same origin, inline allowed if necessary
              "style-src 'self' 'unsafe-inline' https://www.googletagmanager.com", // allow styles from same origin, inline allowed if necessary
              "connect-src 'self' *", // allow fetching data from any origin
              "frame-ancestors 'self' https://network.ethena.fi http://localhost", // restricts embedding to the same origin
              "img-src 'self' data: *", // allow images from same origin and data URIs
              "font-src 'self' *", // allow fonts from same origin
              "object-src 'none'", // block plugins like Flash
            ].join("; "),
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
