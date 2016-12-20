/* jshint -W097 */
/*jslint node: true */
'use strict';

const mdf = require('moment-duration-format');
const getElapse = require('./lib/dateHelper').getElapse;

const begin = new Date('2016-12-01 12:13:02');
const end = new Date('2016-12-10 12:00:00');

console.log(getElapse(begin, end).format('YYYY-MM-DD hh:mm:ss', {trim:false}));
