const path = require("path");
const Dotenv = require("dotenv");
const Webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");

const fs = require("fs");
require("dotenv").config();

// module.exports = (env) => {

// const rootPath = path.join(__dirname);
const isProduction = process.env.MODE === "production";
console.log(isProduction);
// const envPath = isProduction ? `${rootPath}.${env.MODE}` : `${rootPath}/.env`;
// const fileEnv = Dotenv.config({ path: envPath }).parsed;
// const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
// 	prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
// 	return prev;
// }, {});

// console.log(env);
// console.log(envKeys);

// return {
module.exports = {
  resolve: {
    // extensions: ['.ts', '.tsx', '.js', '.jsx'],
    extensions: [".js", ".jsx"],
  },

  entry: {
    app: "./src/index.js",
  },

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    publicPath: "/",
  },

  performance: {
    hints: false,
  },

  plugins: [
    // new Webpack.DefinePlugin(envKeys),
    // new Webpack.ProvidePlugin({
    // 	process: 'process/browser'
    // }),
    new HtmlWebpackPlugin({
      filename: "./index.html",
      template: path.resolve(__dirname, "./index.html"),
      // favicon: './static/logo.png',
    }),
    // new CopyWebpackPlugin({
    //     patterns: [{ from: 'static' }],
    // }),
    isProduction && new MiniCSSExtractPlugin(),
  ].filter(Boolean),

  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                ["@babel/preset-react", { runtime: "automatic" }],
              ],
              plugins: ["@babel/plugin-transform-runtime"],
            },
          },
          // {
          //     loader: 'ts-loader',
          // }
        ],
      },
      {
        test: /\.s?css$/i,
        use: [
          isProduction ? MiniCSSExtractPlugin.loader : "style-loader",
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|mp3)$/i,
        type: "assets",
      },
    ],
  },
};
// }
