const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Usecdn = require('./plugins/usecdn')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: '[name]_[contenthash:4].js',
    path: path.resolve(__dirname, 'dist')
  },
  externals: {
    vue: 'Vue'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // cdn: {
      //   js: [
      //     'https://cdn.bootcdn.net/ajax/libs/jquery/1.10.0/jquery.js',
      //     'https://cdn.bootcdn.net/ajax/libs/vue/0.10.0/vue.js'
      //   ],
      //   css: [
      //     'https://cdn.bootcdn.net/ajax/libs/animate.css/2.0/animate.css'
      //   ]
      // }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
    // new Usecdn()
  ]
}