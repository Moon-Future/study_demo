/**
 * 多入口文件
 */
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    pageA: './src/pageA.js',
    pageB: './src/pageB.js',
  },
  output: {
    // [name] 可以将出口文件与入口文件一一对应
    filename: '[name].[hash:4].js', // 打包后生成 index.js 和 login.js 文件
    path: resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/pageA.html',
      filename: 'pageA.html',
      chunks: ['pageA'],
      hash: true,
    }),
    new HtmlWebpackPlugin({
      template: './src/pageB.html',
      filename: 'pageB.html',
      chunks: ['pageB'],
      hash: true,
    }),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          name: 'common',
          chunks: 'all',
          minSize: 30,
          minChunks: 2,
          priority: 1, //优先级
        },
      },
    },
  },
}

/*
  aoptimization =  {
    splitChunks: {
      chunks: 'async', // 必须三选一：'initial' | 'all'(推荐) | 'async'(默认)
      minSize: 30000, // 模块的最小体积，大于此才抽离,
      minChunks: 1, // 当前公共模块出现的最少次数
      maxAsyncRequests: 5, // 按需加载的最大并行请求数
      maxInitialRequests: 3, // 一个入口最大并行请求数
      automaticNameDelimiter: '~', // 文件名的连接符
      name: true, // 打包后的名称，可接受 function
      cacheGroup: {
        // 这里开始设置缓存的 chunks
        priority: 0, // 缓存组优先级
        vendor: {
          // key
          chunks: '',
          test: '', // 正则规则验证，如果符合就提取 chunk
          name: 'vendor', // 要缓存的分割出来的 chunk 名称
          minSize: 30000,
          minChunks: 1,
          enforce: true,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          reuseExistingChunk: true, // 设置是否重用该 chunk
        },
      },
    },
  }
*/
