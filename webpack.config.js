const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/js/App.js',
  output: {
    path: __dirname + '/dist/js',
    filename: 'app.js'
  },
  module: {
    loaders:[
       {
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      },
      test: /\.js$/,
      exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new UglifyJSPlugin()
  ]
}
