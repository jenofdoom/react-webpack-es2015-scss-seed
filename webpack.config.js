const autoprefixer = require('autoprefixer')
const childProcess = require('child_process')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')

const sassLoaders = [
  'css-loader',
  'postcss-loader',
  'sass-loader?includePaths[]=' + path.resolve(__dirname, './src')
]

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist')
}

// config that is shared between all types of build
const common = {
  context: PATHS.src,

  entry: {
    javascript: './index.js'
  },

  output: {
    filename: 'app.js'
    // don't need a path for default config
  },

  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('app.css'),
    new HtmlWebpackPlugin({
      template: 'index.html',
      hash: true
    })
  ],

  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ],

  // set up resolve so don't have to qualify paths with ./ within src
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss'],
    root: [PATHS.src]
  }
}

// build config from common plus custom config according to event trigger
var config

switch (process.env.npm_lifecycle_event) {
  case 'build':
    config = merge(common, {
      devtool: 'cheap-module-source-map',

      output: {
        path: PATHS.dist
      },

      plugins: [
        new webpack.DefinePlugin({
          'process.env': {NODE_ENV: JSON.stringify('production')},
          __VERSION__: childProcess.execSync('git rev-parse --short HEAD').toString()
        }),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false,
            screw_ie8: true // don't try and support IE6->8
          }
        })
      ]
    })
    break
  default:
    config = merge(common, {
      devtool: 'cheap-module-eval-source-map',

      plugins: [
        new webpack.DefinePlugin({
          'process.env': {NODE_ENV: JSON.stringify('development')}
        })
      ]
    })
}

module.exports = config
