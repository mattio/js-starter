// Mocks data for local development.

/* eslint-disable no-console */

import jsf from 'json-schema-faker';
import { schema } from './mockDataSchema';
import fs from 'fs';
import chalk from 'chalk';

// jsf looks at schema and generates random data.
const json = JSON.stringify(jsf(schema));

fs.writeFile('./src/api/db.json', json, function(error) {
  if(error) {
    return console.log(chalk.red(error));
  }
  else {
    // Take that random data and write it out to a file.
    console.log(chalk.green('Mock data generated.'));
  }
});
