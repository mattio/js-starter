// Configures web server that will serve up the files in the source directory.
import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import webpackConfig from '../webpack.config.dev';

/* eslint-disable no-console */

const port = 3000; // Pick something different if you need to.
const server = express();
const compiler = webpack(webpackConfig);

// Tells Express to use Webpack.
server.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));

// Any requests to the root are handled by this function.
server.get('/', function(request, response) {
  // __dirname is a special Node variable for the current directory.
  response.sendFile(path.join(__dirname, '../src/index.html'));
});

server.get('/users', function(request, response) {
  // Hard coding this for simplicity.
  // You can pretend this is the 'real' API and use JSON Schema for development.
  response.json([
    {"id": 1, "firstName": "Bob", "lastName": "Smith", "email": "bob@example.com"},
    {"id": 2, "firstName": "Tammy", "lastName": "Norton", "email": "tammy@example.com"},
    {"id": 3, "firstName": "Tina", "lastName": "Lee", "email": "tina@example.com"},
  ]);
});

server.listen(port, function(error) {
  if(error) {
    console.log(error);
  }
  else {
    open('http://localhost:' + port);
  }
});

// Now you can start this up via Node using (or in an npm script):
// $ babel-node buildscripts/srcServer.js
