/* jshint -W097 */
/*jslint node: true */
'use strict';

const moment = require('moment');
const getStartEndTimeAndGapElapseTime = require('./lib/dateHelper').getStartEndTimeAndGapElapseTime;

const begin = new Date('2016-12-01 01:00:00');
const end = new Date('2016-12-10 12:00:00');

const result = getStartEndTimeAndGapElapseTime(begin, end);
console.log(result);
