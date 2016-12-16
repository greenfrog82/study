/* jshint -W097 */
/*jslint node: true */
'use strict';

const connect = require('./lib/connector').connect;

const Filter = require('./lib/schema').Filter;
const User = require('./lib/schema').User;

connect(() => {
  Filter.findOne().then(readFilter => {
    console.log('1. Success to read the filter.', readFilter);
    readFilter.users.splice(0, 1);
    return readFilter.save();
  }).then(savedFilter => {
    console.log('2. Success to save the filter.', savedFilter);
  }).catch(err => {
    console.error(`[ERROR HANDLER] ${err.stack}`);
  });
});
