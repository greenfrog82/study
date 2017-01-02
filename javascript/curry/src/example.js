/* jshint -W097 */
/*jslint node: true */
'use strict';

function logger(prefix, msg) {
  console.log(`[${prefix}] ${msg}`);
}

function curry(fn) {
  const arity = fn.length;
  return (function resolver() {
    const memory = Array.prototype.slice.call(arguments);
    return function() {
      const local = memory.slice();
      Array.prototype.push.apply(local, arguments);
      const next = local.length >= arity? fn: resolver;
      return next.apply(null, local);
    };
  }());
}

const curriedLogger = curry(logger);

const debugLogger = curriedLogger('DEBUG');
const infoLogger = curriedLogger('INFO');

debugLogger('This is logger for debug.');
infoLogger('This is logger for info.');
