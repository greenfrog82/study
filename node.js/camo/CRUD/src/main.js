/* jshint -W097 */
/*jslint node: true */
'use strict';

const os = require('os');
const connect = require('camo').connect;
const Document = require('camo').Document;
const EmbeddedDocument = require('camo').EmbeddedDocument;
// Using anonymous class ..
const Movie = require('./schema').Movie;

let database;
// const uri = 'nedb:///Users/scott/data/animals';
// const uri = `nedb:///${os.homedir()}/pidotech/license/repository.db`;
// const uri = 'nedb://c:/users/greenfrog/nedb-repo';  // drive를 작성하기 위해t서는 nedb:// 여기까지만, 대부분 리눅스 기준이라 /users가 붙어서 nedb:/// 이렇게 3개로 보이는거임 ... @.@
const uri = 'nedb://./db';

connect(uri)
.then(
  db => {
    database = db;
    console.log('Success to connect into nedb.');

    var thor = Movie.create({
      title: 'Thor',
      rating: 'PG-13',
      releaseDate: new Date(2011, 4, 2),
      hasCreditCookie: true
      // hasCreditCookie: 'true', // 이 코드의 주석을 풀면 Promise의 reject 메소드가 호출되는 것을 확인할 수 있다.
    });

    thor.save()
      .then(
        savedRes => {
          console.log(`Success to save successfully. ${JSON.stringify(savedRes)}`);

          Movie.findOneAndUpdate({_id: savedRes._id}, {title: 'test'})
            .then(
              movie => {
                console.log(`Success to find and update about ${savedRes._id}. ${JSON.stringify(movie)}`);
              },
              err => {
                console.log(`Fail to find and update about ${savedRes._id}. ${err} ${err.stack}`);
              }
            )
            .catch(err => {
              console.log('[Move.findOneAndUpdate] ERROR HANDLER : ', err);
            });
        },
        err => {
          console.log(`Fail to save. ${err} ${err.stack}`);
        }
      )
      .catch(err => {
        console.log(`[thor.save] ERROR HANDLER : ${err}`);
      });
    },
    //
    //
    // // Money를 EmbeddedDocument가 아닌 Document로 해도 되지만 별도의 db 파일이 생성 된다. 따라서 내부적으로만 사용 할 객체의 경우 EmbeddedDocument가 맞다.
    // class Money extends EmbeddedDocument {
    //     constructor() {
    //         super();
    //
    //         this.value = {
    //             type: Number,
    //             choices: [1, 5, 10, 20, 50, 100]
    //         };
    //
    //         this.currency = {
    //             type: String,
    //             default: 'usd'
    //         };
    //     }
    // }
    //
    // class Wallet extends Document {
    //     constructor() {
    //         super();
    //         this.contents = [Money];
    //     }
    // }
    //
    // const wallet = Wallet.create();
    // wallet.contents.push(Money.create({value:5}));
    // // wallet.contents[0].value = 5;
    // wallet.contents.push(Money.create({value:100}));
    // // wallet.contents[1].value = 100;
    //
    // wallet.save()
    // .then(
    //   result => {
    //     console.log('Success to save into db.', result._id);
    //
    //     Wallet.findOneAndUpdate({_id: result._id}, {contents: null})
    //     .then(
    //       wallet => {
    //         console.log('Success to findOneAndUpdate from db.', wallet.contents);
    //       },
    //       err => {
    //         console.log('Fail to findOneAndUpdate from db.', err);
    //       }
    //     )
    //     .catch(err => {
    //       console.log('ERROR HANDLER in Wallet.findONeAndUpdate', err);
    //     });
    //
    //     // Wallet.findOne({_id: result._id})
    //     // .then(
    //     //   wallet => {
    //     //     console.log('Success to find from db.', wallet._id);
    //     //
    //     //     Wallet.findOneAndUpdate({_id: result._id}, {contents: null})
    //     //     .then(
    //     //       wallet => {
    //     //         console.log('Success to findOneAndUpdate from db.', wallet.contents);
    //     //       },
    //     //       err => {
    //     //         console.log('Fail to findOneAndUpdate from db.', err);
    //     //       }
    //     //     )
    //     //     .catch(err => {
    //     //       console.log('ERROR HANDLER in Wallet.findONeAndUpdate', err);
    //     //     });
    //     //   },
    //     //   err => {
    //     //     console.log('Fail to find from db.', err);
    //     //   })
    //     // .catch(err => {
    //     //   console.log('ERROR HANDLER IN Wallet.findOne', err);
    //     // });
    //   },
    //   err => {
    //     console.log('Fail to save into db.', err);
    //   }
    // )
    // .catch(err => {
    //   console.log('ERROR HANDLER : ', err.toString());
    // });

  err => {
    console.error('Fail to connect to nedb.', err);
  }
)
.catch(ex => {
  console.error(`ERROR HANDLER : ${ex.toString()}`);
});
