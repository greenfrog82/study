/* jshint -W097 */
/*jslint node: true */
'use strict';

function pigIt(str){
  return str.split(' ').map(word => {
    const result = /(^.?)(.*)/.exec(word);
    return `${result[2]}${result[1]}ay`;
  }).join(' ');
}

console.assert(pigIt('Pig latin is cool') === 'igPay atinlay siay oolcay');
