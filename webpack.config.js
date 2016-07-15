const path = require('path')

module.exports = {
  context: path.join(__dirname, './src'),

  entry: {
    javascript: './index.js',
    html: './index.html'
  },

  output: {
    filename: 'app.js'
    // don't need a path because this config only used by devserver
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel-loader']
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      }
    ]
  }
}
