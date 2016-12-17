/* jshint -W097 */
/*jslint node: true */
'use strict';

const connect = require('./lib/connector').connect;

const Filter = require('./lib/schema').Filter;
const User = require('./lib/schema').User;

connect(() => {
  Filter.findOne().then(foundFilter => {
    console.log('1. Success to read the filter.', foundFilter);
    foundFilter.users[0].key = 'greenfrog';
    return foundFilter.save();
  }).then(savedFilter => {
    console.log('2. Success to save the filter.', savedFilter);
    return User.findOne({key: savedFilter.users[0].key});
  }).then(readUser => {
    console.log('3. Success to read the user.', readUser);
  }).catch(err => {
    console.error(`[ERROR HANDLER] ${err.stack}`);
  });
});
