/* eslint-env node */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

const compiler = webpack(config);
const server = new WebpackDevServer(compiler, {
  publicPath: config.output.publicPath,
  contentBase: config.devServer.contentBase,
  hot: true,
  stats: {
    colors: true
  }
});

server.listen(3000, 'localhost',  err  => {
  if (err) {
    throw new Error(err);
  }
  console.log('Listening at localhost:3000'); //eslint-disable-line
});
