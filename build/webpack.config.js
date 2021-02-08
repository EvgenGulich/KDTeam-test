// webpack config
const path = require('path');

const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');

const paths = require('./paths');
const helpers = require('./helpers');
// const HtmlWebpackPlugin = require("html-webpack-plugin");

const { NODE_ENV } = process.env;

const isProduction = NODE_ENV === 'production';

module.exports = {
  entry: paths.entry,
  mode: NODE_ENV,
  output: {
    path: paths.dist,
    filename: isProduction ? '[name].min.js' : '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: './',
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: helpers.provideSassResources(),
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|mp4)$/,
        use: {
          loader: 'file-loader',
          options: {
            regExp: /(?<=img)((?:[a-z0-9\-\_\.\/]+\/)|(?:\/))([a-z0-9\-\_\.]+)\.(png|jpg|gif|webp)$/i,
            name: '[name].[ext]',
            outputPath: 'image',
          },
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts',
          },
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        include: /\/src/,
        exclude: /\/node_modules|\/dist/,
        parallel: true,
        terserOptions: {
          cache: true,
        },
      }),
      new OptimizeCssAssetsPlugin({}),
    ],
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000,
  },
  resolve: {
    alias: {
      '@': paths.src,
      '@img': path.resolve(paths.src, 'assets/img'),
      '@design': path.resolve(paths.src, 'assets/scss/main.scss'),
    },
  },
  plugins: [
    new SVGSpritemapPlugin('src/assets/icons/*svg', {
      output: {
        filename: 'image/spritemap.svg',
      },
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: isProduction ? '[name].min.css' : '[name].css',
      chunkFilename: isProduction ? '[id].css' : '[id].css',
    }),
    ...helpers.generateHtmlPlugins(path.resolve(paths.src, 'pages')),
    // new HtmlWebpackPlugin({
    //   filename: "index.html",
    //   template: path.resolve(paths.pages, "index.html"),
  ],
};
