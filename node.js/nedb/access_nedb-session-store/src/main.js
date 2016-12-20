/* jshint -W097 */
/*jslint node: true */
'use strict';

// const DataStore = require('nedb');
// const db = new DataStore({ filename: './../data/session_store.db'});
//
// db.loadDatabase(err => {
//   if(err) {
//     console.error(err.stack);
//     return;
//   }
//   console.log(db);
// });


var obj = { a: 'test' };
var copy = Object.assign({}, obj);

copy.a = 'a';
console.log(copy); // { a: 100 }
console.log(obj); // { a: 1 }

var str = "Apple, Banana, Kiwi";
var res = str.substr(7, 6);

console.log('str : ', str);
console.log('res : ', res);
