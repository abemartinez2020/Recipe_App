const path = require('path');

module.exports = {
  entry: {
    index: ['core-js', 'regenerator-runtime/runtime', './src/index.js'],
    form: ['core-js', 'regenerator-runtime/runtime', './src/form.js'],
  },

  output: {
    path: path.resolve(__dirname, 'public/scripts'),
    filename: '[name]-bundle.js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env'],
          plugins: ['transform-object-rest-spread'],
        },
      },
    }],
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    publicPath: '/scripts/',
  },
  devtool: 'source-map',
};
