const path = require("path")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const webpack = require("webpack")

const DEV_MODE = process.env.NODE_ENV !== "production"

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: "./main.js",
  devServer: {
    overlay: true,
  },
  module: {
    rules: [
      {
        test: /\.(sc|sa|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { hmr: process.env.NODE_ENV === "development" },
          },
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /.(jpg|jpeg|png|svg)$/,
        loader: "url-loader",
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: DEV_MODE ? "[name].css" : "[name].[hash].css",
      chunkFilename: DEV_MODE ? "[id].css" : "[id].[hash].css",
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
}
