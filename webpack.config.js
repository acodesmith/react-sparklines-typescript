var path = require("path");

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
