var path = require('path');
var VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  resolve: {
    alias: {
      ROOT: path.resolve(__dirname, 'src/frontend/'),
      COMMON: path.resolve(__dirname, 'src/frontend/common/')
    }
  },
  entry: {
    all: path.resolve(__dirname, 'src/frontend/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'public/js/'),
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
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
  node: {
    fs: 'empty'
  }
};
