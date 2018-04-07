var path = require('path');

module.exports = {
  resolve: {
    alias: {
      ROOT: path.resolve(__dirname, 'src/frontend/')
    }
  },
  entry: path.resolve(__dirname, 'src/frontend/index.js'),
  output: {
    filename: 'public/javascripts/all.js'
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
  node: {
    fs: 'empty'
  }
};
