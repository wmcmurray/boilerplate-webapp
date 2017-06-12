var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  resolve: {
    alias: {
      ROOT: path.resolve(__dirname, 'app/frontend/')
    }
  },
  entry: './app/frontend/index.js',
  output: {
    filename: 'app/public/javascripts/all.js'
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
    new ExtractTextPlugin('app/public/stylesheets/all.css')
  ],
  node: {
    fs: 'empty'
  }
};
