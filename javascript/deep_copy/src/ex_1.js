/* jshint -W097 */
/*jslint node: true */
'use strict';

const uc = {
  bir:{
    iki:{uc:3}
  },
  t: new Date(2011, 1, 20, 10,20),
  reg: /test/ig,
  b: false
};

const clonedUc = deepCopy(uc);

clonedUc.bir.iki = {
  name: 'greenfrog'
};

console.log('uc :', uc);
console.log('clonedUc :', clonedUc);


function deepCopy(o) {
    var copy = o,k;

    if (o && typeof o === 'object') {
        copy = Object.prototype.toString.call(o) === '[object Array]' ? [] : {};
        for (k in o) {
            copy[k] = deepCopy(o[k]);
        }
    }

    return copy;
}
