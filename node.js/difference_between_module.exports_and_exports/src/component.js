/* jshint -W097 */
/* jshint node: true */
'use strict';

// exports = function printName(name) {
//   console.log(name);
// };
// // or
module.exports = class Printer {
  constructor(name) {
    this.name = name;
  }
  print() {
    console.log(this.name);
  }
};
