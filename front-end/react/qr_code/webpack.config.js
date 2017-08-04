const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
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
