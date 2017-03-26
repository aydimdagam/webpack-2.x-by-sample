var path = require('path'); // (de node) puedes acceder a los paths del directorio
var HtmlWebpackPlugin = require('html-webpack-plugin');

var basePath = __dirname; // (de node) directorio actual

module.exports = {
  entry: ['./students.js'],
  output: {
    path: path.join(basePath, 'dist'),  //a partir del directorio actual mételo en /dist
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  // For development https://webpack.js.org/configuration/devtool/#for-development
  devtool: 'inline-source-map',
  devServer: {
    port: 8080,
  },
  plugins: [
    //Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html', //Name of file in ./dist/
      template: 'index.html', //Name of template in ./src
			hash: true,
    }),
  ],
};
