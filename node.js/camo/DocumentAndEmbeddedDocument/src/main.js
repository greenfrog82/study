/* jshint -W097 */
/*jslint node: true */
'use strict';

const os = require('os');
const connect = require('camo').connect;
const Game = require('./schema').Game;
const User = require('./schema').User;

const uri = 'nedb://./db';

connect(uri).then(
  db => {
    console.log('Success to connect into nedb.');

    const fifa = Game.create({
      title: 'FIFA',
      user: {
        name: 'greenfrog',
        age: 35
      }
    });

    fifa.save().then(
      savedDoc => {
        console.log('Success to save document to DB.', savedDoc);
      }
    ).catch(err => {
      console.error(`INNER ERROR HANDLER : ${err.stack}`);
    });
    // const user = User.create({
    //   name: 'greenfrog',
    //   age: 35
    // });
    //
    // user.save().then(
    //   savedUser => {
    //     const fifa = Game.create({
    //       title: 'FIFA',
    //       user: savedUser
    //     });
    //
    //     fifa.save().then(
    //       savedDoc => {
    //         console.log('Success to save document to DB.', savedDoc);
    //       }
    //     ).catch(err => {
    //       console.error(`INNER ERROR HANDLER : ${err.stack}`);
    //     });
    //   }
    // );
  }
).catch(err => {
  console.error(`ERROR HANDLER : ${err.stack}`);
});
