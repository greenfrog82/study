/* jshint -W097 */
/*jslint node: true */
'use strict';

const mdf = require('moment-duration-format');
const getDaysOfElapse = require('./lib/dateHelper').getDaysOfElapse;

const begin = new Date('2016-12-01 12:13:02');
const end = new Date('2016-12-10 12:00:00');

console.log(getDaysOfElapse(begin, end));
