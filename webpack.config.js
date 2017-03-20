var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname + '/src',

  entry: [
    './app/main.jsx'
  ],

  output: {
    filename: 'bundle.js',
    sourceMapFilename: '[file].map',
    path: path.resolve(__dirname, 'dist')
  },

  devtool: 'inline-source-map',

  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot-loader', 'babel-loader'],
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitWarning: true
        }
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ template: './app/index.html' })
  ],

  devServer: {
    hot: true,
    host: '0.0.0.0',
    port: '8080',
    historyApiFallback: true,
  },
};
