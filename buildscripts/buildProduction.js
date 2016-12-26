// Production build script.
/* eslint-disable no-console */

import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
import chalk from 'chalk';

// Babel and other libraries (React?) will look for this to trigger their own production optimizations
process.env.NODE_ENV = 'production';

console.log(chalk.blue("Generating minified production build. This will take a moment...."));

webpack(webpackConfig).run((error, stats) => {
  if(error) {
    console.log(chalk.red(error));
    return 1;
  }

  // Displaying some stats about the build process.
  const jsonStats = stats.toJson();
  if(jsonStats.hasErrors) {
    return jsonStats.errors.map(error => console.log(chalk.red(error)));
  }
  if(jsonStats.hasWarnings) {
    console.log(chalk.yellow('Webpack generated the following warnings.'));
    jsonStats.warnings.map(warning => console.log(chalk.yellow(warning)));
  }
  console.log(`Webpack stats: ${stats}`);
  // If we get here the build succeeded.
  console.log(chalk.green('Production build complete. Check the directory defined in the config.'));

  return 0;
});
