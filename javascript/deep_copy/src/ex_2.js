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

const clonedUc = JSON.parse(JSON.stringify(uc));

clonedUc.bir.iki = {
  name: 'greenfrog'
};

console.log('uc :', uc);
console.log('clonedUc :', clonedUc);
