var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); // plugin para que los estilos tengan salida .css en vez de .js

var basePath = __dirname;

module.exports = {
  entry: {
    app: './students.js',
    appStyles: [
      './mystyles.css',
    ],
    vendor: [
      'jquery',
    ],
  },
  output: {
    path: path.join(basePath, 'dist'),
    filename: '[chunkhash].[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: {
            loader: 'css-loader',
          },
        }),
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
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
    }),
    new ExtractTextPlugin({
      filename: '[chunkhash].[name].css', // la salida esta vez será un archivo css
      disable: false,
      allChunks: true,  // para que incluya todos los css anidados (@import)
    }),
  ],
};
