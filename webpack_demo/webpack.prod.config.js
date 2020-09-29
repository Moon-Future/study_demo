const { resolve } = require('path')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

const config = merge(baseConfig, {
  mode: 'development',
  output: {
    filename: '[name]_[contenthash].js',
    path: resolve(__dirname, 'dist')
  },
})
module.exports = config
