/* jshint -W097 */
/*jslint node: true */
'use strict';

const obj = {};
// const obj = { name: 'greenfrog' };

if(obj.constructor === Object && Object.keys(obj).length === 0) {
  console.log('The obj is empty.');
} else {
  console.log('The obj is not empty.');
}
