/* jshint -W097 */
/*jslint node: true */
'use strict';

const connect = require('./lib/connector').connect;

const Filter = require('./lib/schema').Filter;
const User = require('./lib/schema').User;

const remove = require('./lib/arrHelper').remove;

connect(() => {
  const targetKey = 'a';
  Filter.findOne().then(readFilter => {
    console.log('1. Success to read the filter.', readFilter);
    if(!remove(readFilter.users, targetKey)) {
      throw Error('There is no targetKey.', targetKey);
    }
    return readFilter.save();
  }).then((savedFilter) => {
    console.log('2. Success to save the filter.', savedFilter);
    return User.deleteOne({key: targetKey});
  }).then((count) => {
    console.log('3. Success to delete the user.', count);
  }).catch(err => {
    console.error(`[ERROR HANDLER] ${err.stack}`);
  });
});
