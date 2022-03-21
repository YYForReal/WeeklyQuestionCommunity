'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}



module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      //  {
      //    test: /\.css$/,
      //     use: ExtractTextPlugin.extract({
      //         fallback: "style-loader",
      //         use: "css-loader"
      //     })
      //   },  
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      // {
      //   test: /\.css$/,
      //   loader: ExtractTextPlugin.extract({
      //     use: 'css-loader',
      //     fallback: 'vue-style-loader'
      //   })
      // },

      // {     //处理js中引入的css
      //   test: /\.css$/,
      //   loader: ExtractTextPlugin.extract({
      //       use: [
      //           {
      //               loader: 'css-loader'
      //           }
      //       ]
      //   })
      // },
      // {
      //     test: /\.vue$/,
      //     loader: 'vue-loader',
      //     options: {loaders:{
      //         css: ExtractTextPlugin.extract({
      //             use: 'css-loader',
      //             fallback: 'vue-style-loader'
      //         })
      //     }}
      // },

      {
        test: /\.js$/,
        // loader: 'babel-loader',
        use:{
          loader: 'babel-loader',
          options: {
              presets: ['es2015']
          }
        },
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use:[
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: utils.assetsPath('img/[name].[hash:7].[ext]')
            }    
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  // cdn引入第三方库，故排除import内容
  // 键是npm下载的对象，值是它引入的对象
  externals:{
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'vuex':'Vuex',
    'ElementUI': 'ELEMENT',
    'axios': 'axios',
    'dompurify':'DomPurify',
    'marked':'marked',
    'mavon-editor':'MavonEditor',
  },
  // plugins: [ //这个不添加allChunks参数的话，不会抽离chunk的css
  //   new ExtractTextPlugin("style.css")
  // ]
}
