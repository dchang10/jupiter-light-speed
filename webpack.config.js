const path = require("path");
const webpack = require("webpack");

const PATHS = {
  src: path.join(__dirname, 'src'),
  images: path.join(__dirname, 'src/images'),
}

module.exports = {
  mode: 'development',
  entry: "./src/js/index.js",
  output: {
    publicPath: '',
    path: path.resolve(__dirname, "dist"),
    filename: "main.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
      },
      {
        test: /\.mp3$/i,
        loader: 'file-loader',
        include:PATHS.audio,
        options:{
          path: path.resolve(__dirname, "dist"),
          name: 'audio/[name].[ext]'
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        include:PATHS.images,
        options:{
          path: path.resolve(__dirname, "dist"),
          name: 'images/[name].[ext]'
        }
      },
    ]
  }, 
  plugins: [
    new webpack.ProvidePlugin({
      p5: 'p5'
    })
  ]
};