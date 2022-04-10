const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const paths = {
  DIST: path.resolve(__dirname, "public"),
  JS: path.resolve(__dirname, "docs"),
  SRC: path.resolve(__dirname, "docs")
};

// Webpack configuration
module.exports = {
  entry: path.join(paths.JS, "index.js"),
  output: {
    path: paths.DIST,
    filename: "app.bundle.js",
    publicPath: "/",
  },
  /* plugins */
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(paths.SRC, "index.html")
    }),
    new MiniCssExtractPlugin({ filename: "style.bundle.css" }),
    new CopyPlugin({
      patterns: [{ from: "docs/assets/images", to: "assets/images" }]
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
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      },
    ]
  },

  resolve: {
    extensions: [".js", ".jsx"]
  },

  devServer: {
    historyApiFallback: true,
    port: 8081,
  }
};
