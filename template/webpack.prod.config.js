const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.config.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const fs = require('fs');

fs.open('./src/config/env.js', 'w', function (err, fd) {
  const buf = 'export default "production";';
  fs.write(fd, buf, 0, buf.length, 0, function (err, written, buffer) {});
});

module.exports = merge(webpackBaseConfig, {
  output: {
    publicPath: '/app/', //文件资源路径  
  },
  plugins: [
    // new CleanWebpackPlugin(['dist/*']),
    // new CleanWebpackPlugin(['dist/prod/*']),    
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
        removeAttributeQuotes: true, //删除属性引号
      }, //压缩 {...} | false
      excludeChunks: ['eruda'], //不包含eruda模块
      // hash: true, //是否生成hash值，默认false
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      mangle: true, //混淆，最紧凑的输出
      beautify: false,
      comments: false, //删除所有的注释
      compress: {
        sequences: true, //连续声明变量，用逗号隔开来。
        booleans: true, //优化布尔运算
        loops: true, //当do、while 、 for循环的判断条件可以确定是，对其进行优化。
        unused: true, //干掉没有被引用的函数和变量。（除非设置"keep_assign"，否则变量的简单直接赋值也不算被引用。）
        warnings: false, //当删除没有用处的代码时，不显示警告
        drop_console: true, //删除所有的 `console` 语句
        collapse_vars: true, //当 var 和 const 单独使用时尽量合并, 内嵌定义了但是只用到一次的变量
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
  ]
});