const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.config.js');
const fs = require('fs');{{#vconsole-webpack-plugin}}
const vConsolePlugin = require('vconsole-webpack-plugin');{{/vconsole-webpack-plugin}}

fs.open('./src/config/env.js', 'w', function (err, fd) {
  const buf = 'export default "development";';
  fs.write(fd, buf, 0, buf.length, 0, function (err, written, buffer) {});
});

module.exports = merge(webpackBaseConfig, {
  // devtool: '#source-map',
  output: {
    publicPath: '/dist/',
  },
  plugins: [
    // 在项目处生成一个html供localhost访问
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: path.resolve(__dirname, './src/template/index.html'),
      inject: true, //scripte插入到body底部
      // minify: false,  //压缩 {...} | false
      // hash: true, //是否生成hash值，默认false
    }){{#vconsole-webpack-plugin}},
    new vConsolePlugin({
      enable: true // 开启vconsole调试工具，发布代码前记得改回 false
    }),{{/vconsole-webpack-plugin}}
  ]
});