const path = require('path');

module.exports = {
  devtool : 'inline-source-map',
  entry   : './dev/src/index.ts',
  module  : {
    rules : [
      {
        test : /\.tsx?$/,
        use  : 'ts-loader'
      }
    ]
  },
  output  : {
    filename      : 'index.js',
    library       : 'svgWrapText',
    libraryTarget : 'var',
    path          : path.resolve(__dirname, 'dist')
  },
  resolve : {
    extensions : [
      '.tsx',
      '.ts',
      '.js'
    ]
  }
};
