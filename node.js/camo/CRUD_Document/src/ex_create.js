/* jshint -W097 */
/*jslint node: true */
'use strict';

const connect = require('./lib/connector').connect;

const Filter = require('./lib/schema').Filter;
const User = require('./lib/schema').User;

connect(() => {
  const user = User.create({key: 'f'});
  user.save().then(savedUser => {
    console.log('Success to save the user.', savedUser);

    Filter.findOne().then(foundFilter => {
      if(!foundFilter) {
        foundFilter = Filter.create();
      }

      console.log('Success to read the filter.', foundFilter);

      foundFilter.users.push(user);

      foundFilter.save().then(savedFilter => {
          console.log('Success to save the filter.', savedFilter);
      }).catch(err => {
        console.error(`[FILTER][SAVE][ERROR HANDLER] ${err.stack}`);
      });
    }).catch(err => {
      console.error(`[FILTER][READ][ERROR HANDLER] ${err.stack}`);
    });
  }).catch(err => {
    console.error(`[USER][ERROR HANDLER] ${err.stack}`);
  });
});
