/**
 * 多入口文件
 */
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 1. 多个文件打包到一起，实现多个文件打包
module.exports = {
  // 写成数组的方式就可以打出多入口文件，不过这里打包后的文件都合成了一个
  entry: ['.src/pageA.js', './src/pageB.js'],
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
  },
}

// 2. 真正实现多入口和多出口需要写成对象的方式
module.exports = {
  entry: {
    index: './src/pageA.js',
    login: './src/pageB.js',
  },
  output: {
    // [name] 可以将出口文件与入口文件一一对应
    filename: '[name].js', // 打包后生成 index.js 和 login.js 文件
    path: resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['index'], // 对应关系,index.js对应的是index.html
    }),
    new HtmlWebpackPlugin({
      template: './src/login.html',
      filename: 'login.html',
      chunks: ['login'], // 对应关系,login.js对应的是login.html
    }),
  ],
}
