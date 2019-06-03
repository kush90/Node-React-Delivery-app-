const HtmlWebPackPlugin = require("html-webpack-plugin");
var path = require("path");
const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});
var SRC_DIR = path.resolve(__dirname, "src");
module.exports = {
    entry: SRC_DIR + "/app/index.js",
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        },
        {
          test: /\.(png|jpg)$/,
          use: {
            loader: "url-loader",
          },
        }
      ]
    },
    devServer: {
      historyApiFallback: true,
    },
    plugins: [htmlPlugin]
  };