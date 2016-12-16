/* jshint -W097 */
/*jslint node: true */
'use strict';

const connect = require('./lib/connector').connect;

const Filter = require('./lib/schema').Filter;
const User = require('./lib/schema').User;

connect(() => {
  Filter.findOne().then(readFilter => {
    readFilter.users.splice(0, 1);
    readFilter.save().then(savedFilter => {

    }).catch(err => {
      console.error(`[FILTER][SAVE][ERROR HANDLER] ${err.stack}`);
    });
  }).catch(err => {
    console.error(`[FILTER][READ][ERROR HANDLER] ${err.stack}`);
  });
});
