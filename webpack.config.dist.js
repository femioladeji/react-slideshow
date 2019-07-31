var webpack = require("webpack");
var path = require("path");

module.exports = {
  mode: "production",

  entry: "./src/lib/index",

  output: {
    library: "react-slideshow-image",
    libraryTarget: "umd",
    path: path.join(__dirname, "dist"),
    filename: "react-slideshow-image.min.js"
  },

  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  resolve: {
    extensions: [".js", ".jsx"]
  },

  externals: {
    react: {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react"
    },
    "react-dom": {
      root: "ReactDOM",
      commonjs2: "react-dom",
      commonjs: "react-dom",
      amd: "react-dom"
    }
  },

  node: {
    Buffer: false
  },

  devtool: "source-map",

  performance: {
    hints: "warning"
  },

  plugins: []
};