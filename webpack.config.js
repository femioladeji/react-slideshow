const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const paths = {
  DIST: path.resolve(__dirname, 'public'),
  JS: path.resolve(__dirname, 'src'),
  SRC: path.resolve(__dirname, 'src'),
};

// Webpack configuration
module.exports = {
  mode: 'production',
  entry: path.join(paths.JS, 'index.js'),
  output: {
    path: paths.DIST,
    filename: 'app.bundle.js'
  },

  /* plugins */
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(paths.SRC, 'index.html'),
    }),
    new ExtractTextPlugin('style.bundle.css')
  ],

  /* modules */
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/react']
            }
          }
        ],
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          use: 'css-loader',
        }),
      }
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  /*server */
  devServer: {
    contentBase: paths.SRC,
    publicPath: '/',
    historyApiFallback: true,
  },
};
