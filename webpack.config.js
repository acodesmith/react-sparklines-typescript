const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    index: ["./index.ts"],
  },
  output: {
    path: path.join(__dirname, "build"),
    publicPath: "/",
    filename: "[name].js",
    library: "ReactSparklinesTypescript",
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
      },
    ],
  },
  plugins: [
      new webpack.optimize.UglifyJsPlugin({
          minimize: true,
          sourceMap: true,
          include: /\.min\.js$/,
      })
  ],
  externals: {
    react: {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react",
    },
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
