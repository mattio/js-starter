import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

// Simple setup demonstrated.

export default {
  // We want to see some debug info.
  debug: true,
  // Tells Webpack to generate sourcemaps. Check the docs for options. Add `debugger` where needed.
  devtool: 'source-map',
  // Will display list of all files being bundled.
  noInfo: false,
  // main: enry point for the application. Use node package and variable
  // to define the full path. Note no file extension used.
  entry: {
    main: path.resolve(__dirname, 'src/index'),
    vendor: path.resolve(__dirname, 'src/vendor')
  },
  // Our target environment.
  target: 'web',
  // Where the prod bundled should be place.
  // File name no longer hard coded and uses the generated hash name.
  // This is really a formate for each file -- one for main, one for vendor.
  // [name] will be replaced by 'main' or 'vendor' because that's what's in entry above.
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  // Optional plugins, like hot reloading, linting styles, etc.
  plugins: [
    // Generate a separate CSS file using the same name + hash approach as above for cache busting.
    new ExtractTextPlugin('[name].[contenthash].css'),
    // Create an HTML file with a reference to the bundle.
    // There are additional options you can add to minify the HTML itself.
    new HtmlWebpackPlugin({template: 'src/index.html', inject: true}),
    // Eliminate duplicate packages.
    new webpack.optimize.DedupePlugin(),
    // Minify JS files.
    new webpack.optimize.UglifyJsPlugin(),
    // Hash the bundle using MD5 so if the file changes, the hash does, and the cache will be busted.
    new WebpackMd5Hash(),
    // Use CommonsChunkPlugin to create a separate bundle for vendor libs.
    // The name corresponds to the key defined in the entry section above.
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor'})
  ],
  // Webpack loaders: file types we want Webpack to handle.
  // Here we're handling JS and CSS. Allows you to import CSS in JS modules.
  // There are alternate syntaxes to define this.
  // Cory House has another example in his React course. There's another PS course, too.
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      // We don't need the style loader when we're asking for a separate CSS file.
      //{test: /\.css$/, loaders: ['style','css']}
      // Note how we're also asking for a CSS sourcemap.
      {test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap')}
    ]
  }
}
