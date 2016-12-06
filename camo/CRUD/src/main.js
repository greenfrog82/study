/* jshint -W097 */
/*jslint node: true */
'use strict';

const os = require('os');
const connect = require('camo').connect;
const Document = require('camo').Document;
const EmbeddedDocument = require('camo').EmbeddedDocument;

let database;
// const uri = 'nedb:///Users/scott/data/animals';
// const uri = `nedb:///${os.homedir()}/pidotech/license/repository.db`;
const uri = 'nedb:///users/greenfrog/pidotech/license/reposadfasdfasfasdfsitory.db';

connect(uri)
.then(
  function(db) {
    database = db;
    console.log('Success to connect into nedb.');

    class Money extends EmbeddedDocument {
        constructor() {
            super();

            this.value = {
                type: Number,
                choices: [1, 5, 10, 20, 50, 100]
            };

            this.currency = {
                type: String,
                default: 'usd'
            };
        }
    }

    class Wallet extends Document {
        constructor() {
            super();
            this.contents = [Money];
        }
    }

    const wallet = Wallet.create();
    wallet.contents.push(Money.create());
    wallet.contents[0].value = 5;
    wallet.contents.push(Money.create());
    wallet.contents[1].value = 100;

    wallet.save()
    .then(
      result => {
        console.log('Success to save into db.', result._id);

        Wallet.findOne({_id: result._id})
        .then(
          wallet => {
            console.log('Success to find from db.', wallet);
          },
          err => {
            console.log('Fail to find from db.', err);
          })
        .catch(err => {
          console.log('ERROR HANDLER IN Wallet.findOne', err);
        });
      },
      err => {
        console.log('Fail to save into db.', err);
      }
    )
    .catch(err => {
      console.log('ERROR HANDLER : ', err.toString());
    });

  },
  function(err) {
    console.error('Fail to connect nedb.', err);
  }
)
.catch(ex => {
  console.error(`ERROR HANDLER : ${ex.toString()}`);
});
