const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: {
    pageA: './src/page/pageA/pageA.js',
    pageB: './src/page/pageB/pageB.js',
    pageC: './src/page/pageC/pageC.js'
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(css|sass)$/,
        use: ['style-loaedr', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          name: '[name]_[hash].[ext]',
          limit: 8192,
          esModule: false
        }
      },
      {
        test: /\.(eot|ttf|woff|svg)$/,
        loader: 'file-loader'
      },
      {
        test: /\.(htm|html)$/,
        use: 'html-withimg-loader',
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
        include: '/src/',
        exclude: '/node_modules/'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/page/pageA/pageA.html',
      filename: 'pageA.html',
      chunks: ['pageA'],
      hash: true
    }),
    new HtmlWebpackPlugin({
      template: './src/page/pageB/pageB.html',
      filename: 'pageB.html',
      chunks: ['pageB'],
      hash: true
    }),
    new HtmlWebpackPlugin({
      template: './src/page/pageC/pageC.html',
      filename: 'pageC.html',
      chunks: ['pageC'],
      hash: true
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          name: 'jquery',
          chunks: 'all',
          minChunks: 2
        }
      }
    }
  }
}