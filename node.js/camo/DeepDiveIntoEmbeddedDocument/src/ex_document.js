/* jshint -W097 */
/*jslint node: true */
'use strict';

const os = require('os');
const connect = require('camo').connect;
const Document = require('camo').Document;
const EmbeddedDocument = require('camo').EmbeddedDocument;

class User extends Document {
  constructor() {
    super();
    this.schema({
      name: String,
      age: Number
    });
  }

  static collectionName() {
    return 'user';
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

    static collectionName() {
      return 'game';
    }
}

const uri = 'nedb://./db';

connect(uri).then(
  db => {
    console.log('Success to connect into nedb.');

    const user = User.create({
      name: 'greenfrog',
      age: 35
    });

    user.save().then(
      savedUser => {
        const fifa = Game.create({
          title: 'FIFA',
          user: savedUser
        });

        fifa.save().then(
          savedDoc => {
            console.log('Success to save document to DB.', savedDoc);
          }
        ).catch(err => {
          console.error(`INNER ERROR HANDLER : ${err.stack}`);
        });
      }
    );
  }
).catch(err => {
  console.error(`ERROR HANDLER : ${err.stack}`);
});
