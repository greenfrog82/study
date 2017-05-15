/* jshint -W097 */
/*jslint node: true */
'use strict';

let str = '100';

console.log(`+str : ${typeof +str}, ${+str}`);       // 100

str = '100.12';

console.log(`+str : ${typeof +str}, ${+str}`);       // 100.12

str = '100.12%';

console.log(`+str : ${typeof +str}, ${+str}`);       // NaN
