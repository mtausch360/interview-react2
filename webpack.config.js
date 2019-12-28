const webpack = require('webpack');
const path = require('path');

const HtmlWebPackPlugin = require('html-webpack-plugin')

const BUILD_DIR = path.resolve(__dirname, 'dist');
const APP_DIR = path.resolve(__dirname, 'app');

const DEV_SERVER_PORT = 8000;

const config = {
  mode: 'development',

  entry: APP_DIR + '/index.jsx',

  output: {
    filename:'bundle.js',
    path: BUILD_DIR
  },

  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        include: APP_DIR,
        exclude: '/node_modules',
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      }
    ],  
  },

  plugins: [
    new HtmlWebPackPlugin({
      title: "development"
    })
  ],
  
  devServer: {
      //serves files structure from here, gives proper HTML
      contentBase: APP_DIR,
      port: DEV_SERVER_PORT,

    }
}

module.exports = config
