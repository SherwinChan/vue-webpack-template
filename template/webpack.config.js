const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

//muse-ui组件库
const museUiThemePath = path.join(
  __dirname,
  'node_modules',
  'muse-ui',
  'src/styles/themes/variables/default.less'
)

module.exports = {
  entry: {
    // main: path.resolve(__dirname, './src/main.js'),
    main: path.resolve(__dirname, './src/main.js'),
    vendors: path.resolve(__dirname, './src/vendors.js')
  },
  output: {
    path: path.resolve(__dirname, './dist'), //输出文件路径
    publicPath: '/dist/', //文件资源路径
    filename: '[name].js?v=[hash]',
    chunkFilename: '[id]-chunk.js?v=[hash]'
  },
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {

            less: ExtractTextPlugin.extract({
              use: ['css-loader?minimize', 'postcss-loader', {
                loader: 'less-loader',
                options: {
                  // muse-ui组件库
                  globalVars: {
                    museUiTheme: `'${museUiThemePath}'`,
                  }
                }
              }],
              fallback: 'style-loader'
            }),

            sass: ExtractTextPlugin.extract({
              use: ['css-loader?minimize', 'postcss-loader', 'sass-loader'],
              fallback: 'style-loader'
            }),

            css: ExtractTextPlugin.extract({
              use: ['css-loader', 'postcss-loader'],
              fallback: 'style-loader'
            })
          }
        }
      },

      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },

      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader?minimize', 'postcss-loader'],
          fallback: 'style-loader'
        })
      },

      {
        test: /\.less/,
        use: ExtractTextPlugin.extract({
          use: ['postcss-loader', 'less-loader'],
          fallback: 'style-loader'
        })
      },

      {
        test: /\.sass/,
        use: ExtractTextPlugin.extract({
          use: ['postcss-loader', 'sass-loader'],
          fallback: 'style-loader'
        })
      },

      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader?limit=8192'
      },

      {
        test: /\.(html|tpl)$/,
        loader: 'html-loader'
      },

      {
        // iview组件库
        test: /iview.src.*?js$/,
        loader: 'babel-loader'
      },
      {
        // muse-ui组件库        
        test: /muse-ui.src.*?js$/,
        loader: 'babel-loader'
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue': 'vue/dist/vue.esm.js',
      '@': path.join(__dirname, "./src"),
      '@images': path.join(__dirname, "./src/assets/images"),
      '@components': path.join(__dirname, "./src/components"),
      'muse-components': 'muse-ui/src', //muse-ui组件库
    }
  },
  plugins: [
    //开启模块串联
    new webpack.optimize.ModuleConcatenationPlugin(),
    // 抽离css
    new ExtractTextPlugin({
      filename: '[name].css?v=[contenthash]',
      allChunks: true
    }),
    // 抽离js
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: 'vendors.js'
    }),
    // html生成
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './src/template/index.html'),
      inject: true, //scripte插入到body底部
      // minify: false,  //压缩 {...} | false
      // hash: true, //是否生成hash值，默认false
    }),
    // vue-router的mode为history有用
    new CopyWebpackPlugin([{
      // copy一份.htaccess到打包目录
      from: path.resolve(__dirname, './src/template/.htaccess'),
    }]),

  ],
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  // devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  console.log('webpack production 压缩')
  // module.exports.devtool = '#source-map'
  // module.exports.output.publicPath = '/admin/', //文件资源路径  
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
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
      })
    ])
}