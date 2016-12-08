/* jshint -W097 */
/* jshint node: true */
'use strict';

// const printName = require('./component');

const Printer = require('./component');

const printer = new Printer('test');
printer.print();
// printName('test');
