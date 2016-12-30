/* jshint -W097 */
/*jslint node: true */
'use strict';

const obj = {
  name: 'greenfrog',
  age: 35
};

for(let key in obj) {
  console.log(`${key}:${obj[key]}`);
}

console.log(`Attribute of name : ${JSON.stringify(Object.getOwnPropertyDescriptor(obj, 'name'))}`);
console.log(`Attribute of name : ${JSON.stringify(Object.getOwnPropertyDescriptor(obj, 'age'))}`);
