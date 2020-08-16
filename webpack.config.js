const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  resolve: {
    alias: {
      ROOT: path.resolve(__dirname, 'src/frontend/'),
      COMMON: path.resolve(__dirname, 'src/frontend/common/')
    }
  },
  entry: {
    main: path.resolve(__dirname, 'src/frontend/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'public/dist/'),
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: 'style-loader!css-loader!sass-loader'
          }
        }
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.scss$/,
        loaders: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      ignoreOrder: true,
    }),
  ],
  optimization: {
    splitChunks: {
      automaticNameDelimiter: '-',
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
        },
      },
    },
  },
  stats: {
    children: false,
    warnings: false,
    version: true,
    usedExports: false,
    timings: true,
    modules: false,
    hash: false,
    builtAt: false,
  },
  node: {
    fs: 'empty'
  }
};
