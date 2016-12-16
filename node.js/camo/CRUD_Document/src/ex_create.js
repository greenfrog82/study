/* jshint -W097 */
/*jslint node: true */
'use strict';

const connect = require('./lib/connector').connect;

const Filter = require('./lib/schema').Filter;
const User = require('./lib/schema').User;

connect(() => {
  const user = User.create({key: 'a'});
  user.save().then(savedUser => {
    console.log('1. Success to save the user.', savedUser);
    return Filter.findOne();
  }).then(foundFilter => {
    if(!foundFilter) {
      foundFilter = Filter.create();
    }
    console.log('2. Success to read the filter.', foundFilter);
    foundFilter.users.push(user);

    return foundFilter.save();
  }).then(savedFilter => {
    console.log('3. Success to save the filter.', savedFilter);
  }).catch(err => {
    console.error(`[ERROR HANDLER] ${err.stack}`);
  });
});
