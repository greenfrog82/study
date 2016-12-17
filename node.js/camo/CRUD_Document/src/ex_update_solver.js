/* jshint -W097 */
/*jslint node: true */
'use strict';

const connect = require('./lib/connector').connect;

const Filter = require('./lib/schema').Filter;
const User = require('./lib/schema').User;

connect(() => {
  Filter.findOne().then(foundFilter => {
    console.log(`1. Success to read the filter. ${foundFilter._id}`);
    return User.findOne({key:foundFilter.users[0].key});
  }).then(foundUser => {
    console.log(`2. Success to read the user. ${foundUser._id} : ${foundUser.key}`);
    foundUser.key = 'greenfrog';
    return foundUser.save();
  }).then(savedUser => {
    console.log(`3. Success to save the user. ${savedUser._id} : ${savedUser.key}`);
    return Filter.findOne();
  }).then(foundFilter => {
    console.log(`4. Success to read the filter. ${foundFilter._id}`);
    console.log(`Result : ${foundFilter.users[0].key}`);
  }).catch(err => {
    console.error(`[ERROR HANDLER] ${err.stack}`);
  });
});
