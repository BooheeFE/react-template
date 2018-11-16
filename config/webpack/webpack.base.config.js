const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AutoDllPlugin = require('autodll-webpack-plugin');
const HappyPack = require('happypack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    app: ['./src/main']
  },
  output: {
    path: path.resolve(__dirname, '../../dist'),
    filename: '[name].[hash].js',
    publicPath: './'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|dist)/,
        use: 'happypack/loader?id=jsx'
      }, {
        test: /\.scss$/,
        exclude: /(node_modules)/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'happypack/loader?id=styles'
        ]
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
      chunks: 'app'
    }),
    new AutoDllPlugin({
      inject: true, // will inject the DLL bundle to index.html
      debug: true,
      filename: '[name].[chunkhash].js',
      path: './dll',
      entry: {
        vendor: [
          'react',
          'react-dom',
          'react-router-dom',
          'redux',
          'react-redux',
          'redux-actions',
          'axios'
        ]
      }
    }),
    new HappyPack({
      id: 'jsx',
      threads: 4,
      loaders: [{
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }]
    }),
    new HappyPack({
      id: 'styles',
      threads: 2,
      loaders: [{
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
    })
  ],
  resolve: {
    alias: {
      acitons: path.join(__dirname, '../../src/redux/acitons'),
      api: path.join(__dirname, '../../src/api'),
      components: path.join(__dirname, '../../components'),
      pConfig: path.join(__dirname, '../../config/project'),
      utils: path.join(__dirname, '../../utils')
    },
    extensions: ['.js', '.jsx', '.json']
  }
};