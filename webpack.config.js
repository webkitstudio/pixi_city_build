var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var UglyWebpackPlugin = require('webpack-uglify-js-plugin');
var merge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

const common = {
  entry: './src/js/engine/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }],
    rules: [{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        use: 'css-loader'
      })
    }]
  },
  plugins: [
    new ExtractTextPlugin('index.css'),
    new HtmlWebpackPlugin(),
    new CopyWebpackPlugin([{
      from: 'assets',
      to: 'assets'
    }], {
      ignore: [
        '*.DS_Store'
      ]
    })
  ]
};

const dev = {
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist')
  },
};

const prod = {
  plugins: [
    new UglyWebpackPlugin({
      cacheFolder: path.resolve(__dirname, 'dist/cached_uglify/'),
      debug: false,
      minimize: true,
      sourceMap: false,
      output: {
        comments: false
      },
      compressor: {
        warnings: false
      }
    })
  ]
}

module.exports = merge(common, dev);
