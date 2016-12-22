import path from 'path';

// Simple setup demonstrated.

export default {
  // We want to see some debug info.
  debug: true,
  // Tells Webpack to generate sourcemaps. Check the docs for options. Add `debugger` where needed.
  devtool: 'inline-source-map',
  // Will display list of all files being bundled.
  noInfo: false,
  // Enry point for the application. Use node package and variable
  // to define the full path. Note no file extension used.
  entry: [
    path.resolve(__dirname, 'src/index')
  ],
  // Our target environment.
  target: 'web',
  // Where dev bundled should be place.
  // With dev settings, this will be in memory only.
  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  // Optional plugins, like hot reloading, linting styles, etc.
  plugins: [],
  // Webpack loaders: file types we want Webpack to handle.
  // Here we're handling JS and CSS. Allows you to import CSS in JS modules.
  // There are alternate syntaxes to define this.
  // Cory House has another example in his React course. There's another PS course, too.
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loaders: ['style','css']}
    ]
  }
}
