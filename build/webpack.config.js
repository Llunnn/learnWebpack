const path = require('path')

module.exports = {
  devtool:'eval-source-map',
  
  mode: process.env.NODE_ENV === 'production'
    ? 'production'
    : 'development',

  context: path.resolve(__dirname, '../'),
  entry: {
    index: './src/main.js'
  },

  output:{
    path: process.env.NODE_ENV === 'production'
      ? '/public'
      : '/static',
    filename:'bundle.js'
  },

  devServer: {
    contentBase: './static',
    historyApiFallback: true,
    inline: true
  } ,
  module: {
    rules: [
      {
        test: /\.san$/,
        use: [
          {
            loader: 'san-loader'
          }
        ]
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader'
          },
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          }, {
            loader: 'css-loader'
          }
        ]
      },
    ] 
  },
  resolve: {
    extensions: ['.js', '.san', '.json'],
    alias: {
      san: process.env.NODE_ENV === 'production'
        ? 'san/dist/san.js'
        : 'san/dist/san.dev.js'
    },
  }
}