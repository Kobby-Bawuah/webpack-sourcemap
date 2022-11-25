const SentryPlugin = require("@sentry/webpack-plugin");
const SentryWebpackPlugin = require("@sentry/webpack-plugin");
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const AssetsManifestPlugin = require('webpack-assets-manifest');
const TerserPlugin = require('terser-webpack-plugin');
const SentryCliPlugin = require('@sentry/webpack-plugin');

module.exports = {
  // ... other config above ...
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    chunkFilename: '[name].bundle.js',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        // Transpiles ES6-8 into ES5
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      }
    ]
  },
  resolve: {
    extensions: [
      '*',
      '.js',
    ],
  },
  devtool: 'source-map',
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    new AssetsManifestPlugin(),
    new SentryCliPlugin({
      org: "kemi",
      project: "react-test",
      include: path.resolve(__dirnamem, './dist'),
      ignoreFile: '.sentrycliignore',
      ignore: ['node_modules', 'webpack.config.js'],
      release: 'SDK-rangers@1.0.1',
      validate: true,
      authToken: process.env.SENTRY_AUTH_TOKEN,
      urlPrefix: '~/static/js'
    }),
    // new SentryPlugin({
    //   release: process.env.RELEASE,
    //   include: "./dist",
    //   org: "kemi",
    //   project: "react-test",
    // }),
    // new SentryWebpackPlugin({
    //   // sentry-cli configuration - can also be done directly through sentry-cli
    //   // see https://docs.sentry.io/product/cli/configuration/ for details
    //   authToken: process.env.SENTRY_AUTH_TOKEN,
    //   org: "kemi",
    //   project: "react-test",
    //   release: "SDK-rangers@1.0.0",

    //   // other SentryWebpackPlugin configuration
    //   include: ".",
    //   ignore: ["node_modules", "webpack.config.js"],
    
  ],
  
};