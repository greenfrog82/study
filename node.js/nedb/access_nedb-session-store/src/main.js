/* jshint -W097 */
/*jslint node: true */
'use strict';

const path = require('path');
const DataStore = require('nedb');

const db = new DataStore({ filename: path.join(__dirname, '../data/session_store.db')});

db.loadDatabase(err => {
  if(err) {
    console.error(err.stack);
    return;
  }

  db.find({'session.key': 'greenfrog'}, function (err, docs) {
    console.log(docs);
  });
});
