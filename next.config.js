/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    forceSwcTransforms: true, // Force SWC for specific features like next/font
  },
  webpack: (config, { isServer }) => {
    // Add a rule to handle modern JavaScript syntax (optional, only if needed)
    config.module.rules.push({
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    });

    return config;
  },
};

module.exports = nextConfig;