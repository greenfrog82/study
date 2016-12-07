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
const uri = 'nedb://c:/users/greenfrog/nedb-repo';  // drive를 작성하기 위해t서는 nedb:// 여기까지만, 대부분 리눅스 기준이라 /users가 붙어서 nedb:/// 이렇게 3개로 보이는거임 ... @.@

connect(uri)
.then(
  function(db) {
    database = db;
    console.log('Success to connect into nedb.');

    class Dummy extends EmbeddedDocument {
      constructor() {
        super();
        this.name = String;
      }
    }

    class Movie extends Document {
        constructor() {
            super();

            this.title = String;
            this.rating = {
                type: String,
                choices: ['G', 'PG', 'PG-13', 'R']
            };
            this.releaseDate = Date;
            this.hasCreditCookie = Boolean;
            this.contents = [Dummy];
        }

        static collectionName() {
            return 'movies';
        }
    }

    var thor = Movie.create({
      title: 'Thor',
      rating: 'PG-13',
      releaseDate: new Date(2011, 4, 2),
      hasCreditCookie: true,
      contents : [Dummy.create({name:'1'}), Dummy.create({name:'2'})]
    });

    thor.save().then(function(t) {
        console.log(thor);

        // // Update 'Thor' to have a rating of 'R'
        // Movie.findOneAndUpdate({ _id: thor._id }, { rating: 'R' })
        // .then(movies => {
        //     console.log(movies);
        // });

        Movie.findOneAndUpdate({_id: t._id}, {title: 'test'})
        .then(movie => {
          console.log(movie);
        })
        .catch(err => {
          console.log('ERROR HANDLER : ', err);
        });
    });


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

  },
  function(err) {
    console.error('Fail to connect nedb.', err);
  }
)
.catch(ex => {
  console.error(`ERROR HANDLER : ${ex.toString()}`);
});
