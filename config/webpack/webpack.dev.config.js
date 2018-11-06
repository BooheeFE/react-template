const webpack = require('webpack');

module.exports = {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    publicPath: '/',
    inline: true,
    hot: true,
    host: '0.0.0.0',
    historyApiFallback: true,
    open: 'Google Chrome',
    port: process.env.PORT || 3000
  }
};