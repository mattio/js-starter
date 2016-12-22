// Just something simple to get started.
import { expect } from 'chai';
import jsdom from 'jsdom';
import fs from 'fs';

describe('Our first test', () => {
  it('should pass', () => {
    expect(true).to.equal(true);
  });
});

describe('index.html', () => {
  // Note the usage of `done` because JSDOM is asynchronous.
  it('should say hello', (done) => {
    const index = fs.readFileSync('./src/index.html', 'utf-8');
    // You can provide an array of JS files here if needed. No fetch calls! Use isomorphic-fetch.
    jsdom.env(index, function(error, window) {
      const h1 = window.document.getElementsByTagName('h1')[0];
      expect(h1.innerHTML).to.equal('Hello World');
      done();
      window.close();
    });

  });
});
