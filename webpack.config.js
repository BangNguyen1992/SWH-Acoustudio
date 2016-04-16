var webpack = require("webpack");

module.exports = {
  context: __dirname + "/app",
  entry: "./index.js",
  output: {
    path: __dirname + "/app",
    filename: "bundle.js"
  },
  watch: true,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      'window.jQuery': 'jquery'
    })
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel', // 'babel-loader' is also a legal name to reference
      query: {
        presets: ['es2015']
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css'],
    modulesDirectories: [
      'node_modules'
    ]
  }
};
