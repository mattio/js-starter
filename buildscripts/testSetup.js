// This isn't transpiled so it must use CommonJS and ES5.

// Register Babel to transpile tests before they are run.
require('babel-register');

// Disable Webpack features that Mocha doesn't understand.
// Mocha won't understand importing a CSS file in a module.
require.extensions['css'] = function() {};
