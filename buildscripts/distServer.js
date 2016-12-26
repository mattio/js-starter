// Configures web server that will serve up the files in the dist directory.
// Note that these are the results of the Webpack build, so static files only.
// This is not for production use -- just to confirm that the results work locally.
import express from 'express';
import path from 'path';
import open from 'open';
import compression from 'compression';

/* eslint-disable no-console */

const port = 3000; // Pick something different if you need to.
const server = express();

// Enable GZip so you can see what the file sizes will be like on a prod box.
server.use(compression());

// Tell Express to serve static files from the dist directory.
server.use(express.static('dist'));

// Any requests to the root are handled by this function.
server.get('/', function(request, response) {
  // __dirname is a special Node variable for the current directory.
  response.sendFile(path.join(__dirname, '../dist/index.html'));
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
