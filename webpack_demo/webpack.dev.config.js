const { resolve } = require('path')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')
const webpack = require('webpack')

module.exports = merge(baseConfig, {
  mode: 'development',
  output: {
    filename: '[name]_[hash].js',
    path: resolve(__dirname, 'dist')
  },
  devServer: {
    port: 3000,
    hot: true
  },
  plugins: [
    // 热更新，热更新不是刷新
    new webpack.HotModuleReplacementPlugin()
  ]
})
