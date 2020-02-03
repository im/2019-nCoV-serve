var webpack = require('webpack');

module.exports = {
  mode: 'development',
  plugins: [new webpack.DefinePlugin({ 'global.GENTLY': false })],
  node: {
    __dirname: true
  }
};
