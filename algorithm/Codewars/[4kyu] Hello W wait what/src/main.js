// http://www.codewars.com/kata/hello-w-dot-dot-dot-wait-what/train/javascript
/* jshint -W097 */
/*jslint node: true */
// 'use strict';

const os = require(`os`);

var helloWorld = function () {
  const HelloWorld = null;
  const items = arguments.callee.toString().split(os.EOL);
  return `${items[1].slice(8, 13)} ${items[1].slice(13, 18)}!`;
};

console.log(helloWorld());

// console.assert(helloWorld() === 'Hello World!');
