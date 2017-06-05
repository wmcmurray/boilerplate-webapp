var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
  entry: './webapp/frontend/index.js',
  output: {
    filename: 'webapp/public/javascripts/all.js'
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
        loaders: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("webapp/public/stylesheets/all.css")
  ],
  node: {
    fs: "empty"
  }
};
