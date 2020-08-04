const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development', // 'production' | 'development' | 'none'，默认 production
  
  // 入口文件
  entry: resolve(__dirname, 'src/index.js'),
  // 输出文件
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'src/index.html'),
      filename: 'index.html'
    })
  ]
  /*
  entry: {
    a: resolve(__dirname, 'src/a.js'),
    b: resolve(__dirname, 'src/b.js'),
    c: resolve(__dirname, 'src/c.js')
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'js/[name].js'
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'src/a.html'),
      filename: 'a.html',
      chunks: ['a']
    }),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'src/b.html'),
      filename: 'b.html',
      chunks: ['b']
    }),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'src/c.html'),
      filename: 'c.html',
      chunks: ['c']
    })
  ]
  */
}