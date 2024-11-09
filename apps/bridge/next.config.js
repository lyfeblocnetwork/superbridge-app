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
              "default-src 'self'",
              // "script-src 'self' data: 'wasm-unsafe-eval'",
              // SOMETHING IN script-src BLOCKING GOOGLE TAG MANAGER
              // MAYBE NEED THE NONCE THING FOR GTM
              "script-src 'self' data: 'unsafe-eval' 'unsafe-inline' 'wasm-unsafe-eval'",
              "style-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
              // NEEDS TO HAVE DOMAINS OFF ALL SERVICES AND RPCs IN connect-src
              // I JUST PASTED A FEW AND SOME RANDOS HERE FROM A UNISWAP EXAMPLE
              "connect-src 'self' blob: data: https://*.superbridge.app https://pulse.walletconnect.org https://*.publicnode.com https://*.merkle.io https://*.llamarpc.com https://*.alchemy.com https://*.arbitrum.io https://*.base.org/ https://*.coinbase.com https://*.coingecko.com/ https://*.coinmarketcap.com/ https://*.drpc.org/ https://*.gemini.com https://*.googleapis.com https://*.infura.io https://*.nodereal.io https://*.optimism.io https://*.quiknode.pro https://*.twnodes.com https://*.uniswap.org https://*.walletconnect.com https://*.zerion.io https://alfajores-forno.celo-testnet.org https://api.avax.network/ext/bc/C/rpc https://api.moonpay.com/ https://api.opensea.io https://bsc-dataseed1.binance.org/ https://bsc-dataseed1.bnbchain.org https://buy.moonpay.com/ https://cdn.center.app/ https://celo-org.github.io https://cloudflare-eth.com https://ethereum-optimism.github.io/ https://forno.celo.org/ https://gateway.ipfs.io/ https://hardbin.com/ https://i.seadn.io/ https://images-country.meld.io https://invalid.rpki.cloudflare.com/ https://ipfs.io/ https://ipv4-check-perf.radar.cloudflare.com https://ipv6-check-perf.radar.cloudflare.com/ https://lh3.googleusercontent.com/ https://mainnet.base.org/ https://o1037921.ingest.sentry.io https://browser-intake-datadoghq.com https://openseauserdata.com/ https://performance.radar.cloudflare.com/ https://polygon-rpc.com/ https://raw.githubusercontent.com https://raw.seadn.io/ https://rpc-mainnet.maticvigil.com https://rpc-mumbai.maticvigil.com https://rpc.ankr.com https://rpc.blast.io/ https://rpc.degen.tips https://rpc.goerli.mudit.blog/ https://rpc.mevblocker.io/ https://rpc.scroll.io/ https://rpc.sepolia.org/ https://rpc.zora.energy/ https://sockjs-us3.pusher.com/ https://sparrow.cloudflare.com/ https://statsigapi.net https://trustwallet.com https://uniswap.org https://us-central1-uniswap-mobile.cloudfunctions.net/ https://valid.rpki.cloudflare.com https://vercel.com https://vercel.live/ https://wallet.crypto.com https://web3.1inch.io https://mainnet.era.zksync.io/ wss://*.uniswap.org wss://relay.walletconnect.com wss://relay.walletconnect.org wss://ws-us3.pusher.com/ wss://www.walletlink.org",
              "frame-src 'self' https://*.ethena.fi http://localhost",
              // IF A ROLLIE THEN THEY CAN HOST ON A SPECIAL DOMAIN THEN SELF WILL WORK FOR ANY
              // DISABLE PASTING IN SUPERBRIDGE AS A WIDGET FOR RANDOS
              "frame-ancestors 'self' https://*.ethena.fi http://localhost",
              "img-src * blob: data:",
              "font-src 'self' https://superbridge-fonts.vercel.app",
              "worker-src 'self' blob:",
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
