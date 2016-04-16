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
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel', // 'babel-loader' is also a legal name to reference
      query: {
        presets: ['es2015']
      }
    },
    {
      // Rewrite the file so that it exports the window global.
      test: __dirname + '/node_modules/recorderjs/src/recorder.js',
      loader: 'babel'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css'],
    modulesDirectories: [
      'node_modules'
    ],
    alias: {
      // Make it so that 'require' finds the right file.
      "Recorder": __dirname+"/node_modules/recorderjs/src/recorder.js"
    }
  }
};
