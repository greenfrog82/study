/* jshint -W097 */
/*jslint node: true */
'use strict';

const connect = require('./lib/connector').connect;

const Filter = require('./lib/schema').Filter;
const User = require('./lib/schema').User;

connect(() => {
  // User.find().then(readUsers => {
  //   readUsers.forEach(user => {
  //     console.log(`${user._id} : ${user.key}`);
  //   });
  // }).catch(err => {
  //   console.error(`[USER][ERROR HANDLER] ${err.stack}`);
  // });

  Filter.findOne().then(readFilter => {
    console.log(readFilter);
  }).catch(err => {
    console.error(`[USER][ERROR HANDLER] ${err.stack}`);
  });
});
