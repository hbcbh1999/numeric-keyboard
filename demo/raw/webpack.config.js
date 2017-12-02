const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  entry: "./app.js",
  output: {
    filename: 'app.js'
  },
  resolve: {
    alias: {
      'vue-numeric-keyboard': path.resolve(__dirname, '../../lib/raw')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader!stylus-loader'
      },
      {
        test: /\.woff$/,
        exclude: /node_modules/,
        loader: 'url-loader'
      }
    ]
  },
  devtool: 'eval',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.template.html'
    })
  ]
}
