import numeral from 'numeral';
import './index.css'; // Importing CSS thanks to Webpack.

const cost = numeral(1000).format('$0,0.00');

console.log(`Your cost is ${cost} for this course.`); // eslint-disable-line no-console
