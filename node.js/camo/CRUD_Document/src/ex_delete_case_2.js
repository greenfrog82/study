/* jshint -W097 */
/*jslint node: true */
'use strict';

const connect = require('./lib/connector').connect;

const Filter = require('./lib/schema').Filter;
const User = require('./lib/schema').User;

connect(() => {
  User.deleteOne({key: 'a'}).then(count => {
    console.log('Success to delete the user.', count);
    Filter.findOne().then(readFilter => {
      console.log('Success to read the filter.', readFilter);
    }).catch(err => {
      console.error(`[FILTER][READ][ERROR HANDLER] ${err.stack}`);
    });
  }).catch(err => {
    console.error(`[USER][DELETE][ERROR HANDLER] ${err.stack}`);
  });
});
