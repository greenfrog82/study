/* jshint -W097 */
/*jslint node: true */
'use strict';

const os = require('os');
const connect = require('camo').connect;
const Document = require('camo').Document;
const EmbeddedDocument = require('camo').EmbeddedDocument;

class User extends EmbeddedDocument {
  constructor() {
    super();
    this.schema({
      name: String,
      age: Number
    });
  }
}

class Game extends Document {
    constructor() {
      super();
      this.schema({
        title: String,
        user: User
      });
    }
}

const uri = 'nedb://./db';

connect(uri).then(db => {
  console.log('Success to connect into nedb.');

  const fifa = Game.create({
    title: 'FIFA',
    user: {
      name: 'greenfrog',
      age: 35
    }
  });

  return fifa.save();
}).then(
  savedGame => {
  console.log('Success to save document to DB.', savedGame);
}).catch(err => {
  console.error(`ERROR HANDLER : ${err.stack}`);
});
