/* jshint -W097 */
/*jslint node: true */
'use strict';

let str = '100';

console.log(Number(str));       // 100
console.log(parseInt(str));     // 100
console.log(parseFloat(str));   // 100
console.log();

str = '100.12';

console.log(Number(str));      // 100.12
console.log(parseInt(str));    // 100
console.log(parseFloat(str));  // 100.12
