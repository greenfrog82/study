/* jshint -W097 */
/*jslint node: true */
'use strict';

const connect = require('./lib/connector').connect;

const Filter = require('./lib/schema').Filter;
const User = require('./lib/schema').User;

connect(() => {
  User.deleteOne({key: 'a'}).then(count => {
    console.log('1. Success to delete the user.', count);
    return Filter.findOne();
  }).then(readFilter => {
    console.log('2. Success to read the filter.', readFilter);
  }).catch(err => {
    console.error(`[ERROR HANDLER] ${err.stack}`);
  });
});
