const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  //  可选，如果打包路径不是 dist 可在此修改
  devServer: {
    contentBase: './dist',
    host: 'localhost', // 默认是localhost
    port: 3000, // 端口
    open: true, // 自动打开浏览器
    hot: true, // 开启热更新
  },
  entry: {
    index: './src/index.js',
  },
  output: {
    filename: '[name].[hash:4].js',
    path: resolve(__dirname, 'dist'),
  },
  resolve: {
    // 别名
    alias: {
      $: './src/jquery.js',
      '@': './src',
    },
    // 省略后缀
    extensions: ['.js', '.json', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.css$/, // 解析css
        // use: ['style-loader', 'css-loader', 'sass-loader'], // 从左向右解析
        // 使用 mini-css-extract-plugin 后，就不用 style-loader
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      // {
      //   test: /\.(png|jpg|gif)$/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: '[name].[hash].[ext]', // ext 图片后缀
      //         outputPath: 'images/',
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[hash].[ext]', // ext 图片后缀
              outputPath: 'images/',
              limit: 8192, // 小于8k的图片自动转成base64格式，并且不会存在实体图片
              esModule: false,
            },
          },
        ],
      },
      // 字体图标和 svg 图片
      {
        test: /\.(eot|ttf|woff|svg)$/,
        use: 'file-loader', // 或者 url-loader
      },
      // 处理打包html中引入的img图片
      {
        test: /\.(htm|html)$/,
        use: 'html-withimg-loader',
      },
      // 转义ES6
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          // 配置选项里的presets
          // 包含ES6还有之后的版本和那些仅仅是草案的内容
          options: {
            presets: ['@babel/preset-env'],
          },
        },
        include: /src/, // 只转化src目录下的js
        exclude: /node_modules/, // 排除掉node_modules，优化打包速度
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      hash: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css', // 多入口文件时，[name] 和 output [name] 一样，单入口文件，若不设置固定名，则默认为 main.css
      chunkFilename: '[id].css',
    }),
    new CleanWebpackPlugin(),
    // 热更新，热更新不是刷新
    new webpack.HotModuleReplacementPlugin(),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: true,
        },
      }),
    ],
  },
}
