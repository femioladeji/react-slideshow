const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const paths = {
  DIST: path.resolve(__dirname, "public"),
  JS: path.resolve(__dirname, "docs"),
  SRC: path.resolve(__dirname, "docs")
};

// Webpack configuration
module.exports = {
  mode: process.env.NODE_ENV,
  entry: path.join(paths.JS, "index.js"),
  output: {
    path: paths.DIST,
    filename: "app.bundle.js"
  },

  /* plugins */
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(paths.SRC, "index.html")
    }),
    new ExtractTextPlugin("style.bundle.css"),
    new CopyPlugin({
      patterns: [{ from: "docs/assets", to: "assets" }]
    })
  ],

  /* modules */
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/react"]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          use: "css-loader"
        })
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      }
    ]
  },

  resolve: {
    extensions: [".js", ".jsx"]
  },

  /*server */
  devServer: {
    contentBase: paths.SRC,
    publicPath: "/",
    historyApiFallback: true
  }
};
