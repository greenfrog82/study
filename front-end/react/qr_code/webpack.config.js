const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Output management'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    inline: true,
    port: 7777,
    contentBase: __dirname + '/dist/'
  },
  module: {
    rules: [
      {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
              cacheDirectory: true,
              presets: ['react']
          }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
         test: /\.(png|svg|jpg|gif)$/,
         use: [
           'file-loader'
         ]
       }
    ],
    // loaders: [
    //   {
    //       test: /\.js$/,
    //       loader: 'babel-loader',
    //       exclude: /node_modules/,
    //       query: {
    //           cacheDirectory: true,
    //           presets: ['react']
    //       }
    //   }
    // ]
  }
};
