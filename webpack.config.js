const path = require("path");

module.exports = {
  entry: "./src/",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js"
  },

  // devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "src"),
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
