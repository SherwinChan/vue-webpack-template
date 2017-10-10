const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.config.js');
const fs = require('fs');

fs.open('./src/config/env.js', 'w', function (err, fd) {
  const buf = 'export default "production";';
  fs.write(fd, buf, 0, buf.length, 0, function (err, written, buffer) {});
});

module.exports = merge(webpackBaseConfig, {
  output: {
    publicPath: '/admin/', //文件资源路径  
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './src/template/index.html'),
      inject: true, //scripte插入到body底部
      minify: {
        minifyCSS: true,
        minifyJS: true,
        removeComments: true, //去掉注释
        collapseWhitespace: true, //去掉空格
      }, //压缩 {...} | false
      excludeChunks: ['vconsole'], //不包含vconsole模块
      // hash: true, //是否生成hash值，默认false
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      // 最紧凑的输出
      mangle: true,
      beautify: false,
      // 删除所有的注释
      comments: false,
      compress: {
        // 在UglifyJs删除没有用到的代码时不输出警告
        warnings: false,
        // 删除所有的 `console` 语句
        // 还可以兼容ie浏览器
        drop_console: true,
        // // 内嵌定义了但是只用到一次的变量
        collapse_vars: true,
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
  ]
});