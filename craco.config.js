// const rewire = require('rewire');
const webpack = require('webpack');
// const defaults = rewire('react-scripts/scripts/start.js');
// const webpackConfig = require('react-scripts/config/webpack.config');

//In order to override the webpack configuration without ejecting the create-react-app
module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          process: require.resolve("process/browser"),
          zlib: require.resolve("browserify-zlib"),
          stream: require.resolve("stream-browserify"),
          util: require.resolve("util"),
          buffer: require.resolve("buffer"),
          asset: require.resolve("assert"),
        },
      },
      plugins: [
        new webpack.ProvidePlugin({
          Buffer: ["buffer", "Buffer"],
          process: "process/browser",
        }),
      ],
    },
  },
};

