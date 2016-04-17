var webpack = require("webpack");
var debug = process.env.NODE_ENV != "production";

module.exports = {
  context: __dirname + "/app",
  entry: "./index.js",
  output: {
    path: __dirname + "/app",
    filename: "bundle.js"
  },
  watch: true,
  devtool: debug ? 'inline-sourcemap' : null,
  plugins: debug ? [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      'window.jQuery': 'jquery'
    })
  ] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false})
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
      { test: /\.css$/, loader: "style-loader!css-loader" }, {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader'
      },
      { test: /\.swf$/, loader: "file?name=[path][name].[ext]" }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', 'swf'],
    modulesDirectories: [
      'node_modules'
    ],
    alias: {
      // Make it so that 'require' finds the right file.
      "materialize-css-file": __dirname + "/node_modules/materialize-css/dist/css/materialize.css",
      "angular-recorder": __dirname + "/app/lib/angular-audio-recorder.js",
      "wavesurfer": __dirname + "/node_modules/wavesurfer.js/dist/wavesurfer.min.js",
      "recorder-flash": __dirname + "/app/lib/recorder.swf",
    }
  }
};
