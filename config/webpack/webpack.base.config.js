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
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
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
        }, {
          loader: 'postcss-loader',
          options: {
            config: {
              path: path.resolve(__dirname, '../postcss.config.js')
            }
          }
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
      api: path.join(__dirname, '../../src/api'),
      components: path.join(__dirname, '../../components'),
      utils: path.join(__dirname, '../../utils')
    }
  }
};