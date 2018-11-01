const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: ['./src/main.js']
  },
  output: {
    path: path.resolve(__dirname, '../../dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|build)/,
        use: {
          loader: 'babel-loader'
        }
      }, {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[name]_[local]_[hash:base64:3]'
          }
        }, {
          loader: 'sass-loader'
        }]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({ // 定义环境变量
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './public/index.html',
      inject: 'body',
      minify: {
        caseSensitive: false,
        collapseBooleanAttributes: true,
        collapseWhitespace: true
      },
      hash: true,
      chunks: 'app'
    })
  ],
  resolve: {
    alias: {
      components: path.join(__dirname, '../../components'),
      actions: path.join(__dirname, '../../src/actions'),
      utils: path.join(__dirname, '../../utils')
    }
  }
};