/* jshint -W097 */
/*jslint node: true */
'use strict';

function logger(prefix, msg) {
  console.log(`[${prefix}] ${msg}`);
}

// function curry(fn) {
//   const arity = fn.length;
//   return (function resolver() {
//     const memory = Array.prototype.slice.call(arguments);
//     return function() {
//       const local = memory.slice();
//       Array.prototype.push.apply(local, arguments);
//       const next = local.length >= arity? fn: resolver;
//       return next.apply(null, local);
//     };
//   }());
// }

// 위 curry 함수는 인터넷에서 찾은 내용이고, 아래 함수는 'Javascript: The Good Parts'라는 책의
// 내용을 통해 작성한 함수이다. 
function curry(fn) {
  return function() {
      let args = Array.prototype.slice.apply(arguments);
      return function() {
        return fn.apply(null, args.concat(Array.prototype.slice.apply(arguments)));
      }
  };
}

const curriedLogger = curry(logger);

const debugLogger = curriedLogger('DEBUG');
const infoLogger = curriedLogger('INFO');

debugLogger('This is logger for debug.');
infoLogger('This is logger for info.');
