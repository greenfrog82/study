/* jshint -W097 */
/*jslint node: true */
'use strict';

function pascalsTriangle(n) {
  let offset = 0;
  let cursor = 0;

  const ret = [];

  for(let i=0; i<n; i++) {
    for(let j=0; j<=i; j++) {
      if(0 === j || j === i) {
        ret.push(1);
      } else {
        ret.push(ret[cursor] + ret[cursor + 1]);
        cursor++;
      }
    }
    offset += i;
    cursor = offset;
  }
  return ret;
}
console.log(pascalsTriangle(4));
console.assert(pascalsTriangle(4) === [1,1,1,1,2,1,1,3,3,1]);
