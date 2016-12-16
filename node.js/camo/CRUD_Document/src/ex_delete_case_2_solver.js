/* jshint -W097 */
/*jslint node: true */
'use strict';

const connect = require('./lib/connector').connect;

const Filter = require('./lib/schema').Filter;
const User = require('./lib/schema').User;

const remove = require('./lib/arrHelper').remove;

connect(() => {
  const targetKey = 'f';
  Filter.findOne().then(readFilter => {
    console.log('Success to read the filter.', readFilter);
    remove(readFilter.users, targetKey);
    readFilter.save().then(savedFilter => {
      console.log('Success to save the filter.', savedFilter);
    }).catch(err => {
      console.error(`[FILTER][SAVE][ERROR HANDLER] ${err.stack}`);
    });
    // 다음 코드가 있고 없음에 따라 동작 순서가 달라짐 ...
    // return targetKey;
  }).then(() => {
    User.deleteOne({key: targetKey}).then(count => {
      console.log('Success to delete the user.', count);
    }).catch(err => {
      console.error(`[USER][DELETE][ERROR HANDLER] ${err.stack}`);
    });
  }).catch(err => {
    console.error(`[FILTER][READ][ERROR HANDLER] ${err.stack}`);
  });
});
