/* jshint -W097 */
/*jslint node: true */
'use strict';

const str = '100.12%';

console.log(Number(str));       // NaN
console.log(parseInt(str));     // 100
console.log(parseFloat(str));   // 100.12
