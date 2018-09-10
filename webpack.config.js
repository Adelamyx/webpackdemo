const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const uglifyPlugin = require('uglifyjs-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const purifyCssPlugin = require('purifycss-webpack');

console.log(11, encodeURIComponent(process.env.type));

if (process.env.type === 'build') {
  var website = {
    publicPath: ''
  }
} else {
  var website = {
    publicPath: 'http://localhost:8011/'
  }
}

  // var website = {
  //   publicPath: 'http://localhost:8011/'
  // }

module.exports = {
  // devtool: '#cheap-module-eval-source-map',
  // 入口文件配置项
  entry: {
    entry: './src/entry.js',
  },
  // 出口文件配置项目
  output: {
    // 打包路径
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: website.publicPath,
  },
  // 模块
  module: {
    rules: [
      {
        test: /\.css$/,
        use: extractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: "postcss-loader"
            }
          ]
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 400,
          outputPath: 'images/'
        }
      },
      {
        test: /\.(htm|html)$/i,
        use:[ 'html-withimg-loader']
      },
      {
        test: /\.less$/,
        use: extractTextPlugin.extract({
          use: [
            {
              loader: "css-loader" // translates CSS into CommonJS,
            },
            {
              loader: "less-loader" // compiles Less to CSS
            },
          ],
          fallback: "style-loader",
        })
      },
      {
        test: /\.scss/,
        use: extractTextPlugin.extract({
          use: [
            {
              loader: "css-loader" // translates CSS into CommonJS,
            },
            {
              loader: "sass-loader" // compiles Less to CSS
            },
          ],
          fallback: "style-loader",
        })
      },
      {
        test: /\.(jsx|js)$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: /node_modules/
      }
    ]
  },
  // 插件
  plugins: [
    // new uglifyPlugin(),
    new htmlWebpackPlugin({
      minify: false,
      hash: true,
      template: './src/index.html'
    }),
    new extractTextPlugin('css/index.css'),
    new purifyCssPlugin({
      paths: glob.sync(path.join(__dirname, 'src/*.html')),
    })
  ],
  // 配置webpack开发服务功能
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    host: 'localhost',
    // 服务端压缩是否开启
    compress: true,
    port: 8011,
  }
}
