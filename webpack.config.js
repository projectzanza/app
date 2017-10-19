const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const environmentConfig = {
  'local': 'local.js',
  'production': 'production.js',
  'development': 'development.js',
};
const NODE_ENV = process.env.NODE_ENV || 'local';

module.exports = env => {

  return {
    context: __dirname + '/src',

    entry: [
      './app/main.jsx'
    ],

    output: {
      filename: 'bundle.js',
      sourceMapFilename: '[file].map',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/'
    },

    devtool: 'inline-source-map',

    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      alias: {
        jquery: path.resolve(__dirname, 'jquery-stub.js'),
        Config: path.resolve(__dirname, 'src', 'app', 'config', environmentConfig[NODE_ENV]),
      }
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
            emitWarning: true,
            fix: true
          }
        },
        {
          test: /\.scss$/,
          include: /src/,
          loader: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.css$/,
          loader: "style-loader!css-loader"
        },
        {
          test: /\.png$/,
          loader: 'url-loader?limit=100000'
        },
        {
          test: /\.jpg$/,
          loader: 'file-loader'
        },
        {
          test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader?limit=10000&mimetype=application/font-woff'
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'file-loader'
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
        }
      ]
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({ template: './app/index.html' }),
      new CopyWebpackPlugin([{ from: 'assets', to: 'assets' }]),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': `'${process.env.NODE_ENV}'`
        }
      })
    ],

    devServer: {
      hot: true,
      host: '0.0.0.0',
      port: '8080',
      historyApiFallback: true,
    },
  }
};
