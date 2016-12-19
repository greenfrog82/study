/* jshint -W097 */
/*jslint node: true */
'use strict';

const os = require('os');
const connect = require('camo').connect;
const Document = require('camo').Document;
const EmbeddedDocument = require('camo').EmbeddedDocument;

class HistoryUser extends EmbeddedDocument {
  constructor() {
    super();
    this.schema({
      // issue information
      date: { type:Date, default:new Date() }, // 라이선스를 발급받은 날짜
      isRejected: { type:Boolean, default:false }, // 라이선스 발급여부 (발급:true / 미발급:false)
      user: User // 발급 이력에 대한 사용자
    });
  }
}

class HistoryFeature extends EmbeddedDocument {
  constructor() {
    super();
    this.schema({
      // Feature
      key: String,
      users: [HistoryUser]
    });
  }
}

class History extends Document {
  constructor() {
    super();
    this.schema({
      installKey: String,
      features: [HistoryFeature]
    });
  }
}

class User extends EmbeddedDocument {
  constructor() {
    super();
    this.schema({
      uuid: String
    });
  }
}

class Comment extends EmbeddedDocument {
  constructor() {
    super();
    this.schema({
      name: String,
      message: String
    });
  }
}

class Post extends Document {
  constructor() {
    super();
    this.schema({
      title: String,
      content: String,
      writer: String,
      likes: Number,
      date: Date
    });
  }
}

const uri = 'nedb://./db';

connect(uri).then(
  db => {
    console.log('Success to connect into nedb.');
    // // createSample();
    //
    // // History.find({installKey: 'key-0'}).then(foundHistory => {
    // History.find({installKey: 'key-0'}).then(foundHistory => {
    //   console.log(foundHistory);
    // }).catch(err => {
    //   console.error(err.stack);
    // });

    // createContents();


    // return Post.find(
    //   {
    //    date: {$gt: new Date('1981.01.01'), $lt: new Date('2017.01.01')},
    //    writer: 'dandoo'
    //   }
    // );
  }).then(found => {
    console.log(found);
  }).catch(ex => {
    console.error(`ERROR HANDLER : ${ex.toString()}`);
  });

function createContents() {
  let post = Post.create({
    title: "article04",
    content: "content04",
    writer: "dandoo2",
    likes: 0,
    date: new Date('2012.05.09'),
    comments: []
  });

  post.save().then(savedDoc => {
    console.log('savedDoc :', savedDoc);
  }).catch(err => {
    console.error('[ERROR] ', err.stack);
  });

  // post = Post.create({
  //   title: "article02",
  //   content: "content02",
  //   writer: "Alpha",
  //   likes: 23,
  //   comments: [
  //     {
  //       name: "Bravo",
  //       message: "Hey Man!"
  //     }
  //   ]
  // });
  //
  // post.save().then(savedDoc => {
  //   console.log('savedDoc :', savedDoc);
  // }).catch(err => {
  //   console.error('[ERROR] ', err.stack);
  // });
  //
  // post = Post.create(  {
  //   title: "article03",
  //   content: "content03",
  //   writer: "Bravo",
  //   likes: 40,
  //   comments: [
  //     {
  //       name: "Charlie",
  //       message: "Hey Man!"
  //     },
  //     {
  //       name: "Delta",
  //       message: "Hey Man!"
  //     }
  //   ]
  // });
  //
  // post.save().then(savedDoc => {
  //   console.log('savedDoc :', savedDoc);
  // }).catch(err => {
  //   console.error('[ERROR] ', err.stack);
  // });
  //
  // post = Post.create(  {
  //   title: "article03",
  //   content: "content03",
  //   writer: "bBravo",
  //   likes: 50,
  //   comments: [
  //     {
  //       name: "Charlie",
  //       message: "Hey Man!"
  //     },
  //     {
  //       name: "Delta",
  //       message: "Hey Man!"
  //     }
  //   ]
  // });
  //
  // post.save().then(savedDoc => {
  //   console.log('savedDoc :', savedDoc);
  // }).catch(err => {
  //   console.error('[ERROR] ', err.stack);
  // });
}

function createSample() {
  let history = History.create([
    {
      installKey: 'key-0',
      features: [
        {
          key: 'feature-0',
          users: [
            {
              date: new Date(),
              isRejected: true,
              user: {
                uuid: 'user-0'
              }
            },
            {
              date: new Date(),
              isRejected: false,
              user: {
                uuid: 'user-1'
              }
            }
          ]
        },
        {
          key: 'feature-1',
          users: [
            {
              date: new Date(),
              isRejected: true,
              user: {
                uuid: 'user-0'
              }
            },
            {
              date: new Date(),
              isRejected: false,
              user: {
                uuid: 'user-1'
              }
            }
          ]
        }
      ]
    },
  ]);

  history.save().then(savedHistory => {
    console.log('1. Success to saved');
  }).catch(err => {
    console.error(err.stack);
  });

  history = History.create([
    {
      installKey: 'key-1',
      features: [
        {
          key: 'feature-0',
          users: [
            {
              date: new Date(),
              isRejected: false,
              user: {
                uuid: 'user-0'
              }
            },
            {
              date: new Date(),
              isRejected: false,
              user: {
                uuid: 'user-1'
              }
            }
          ]
        },
        {
          key: 'feature-1',
          users: [
            {
              date: new Date(),
              isRejected: true,
              user: {
                uuid: 'user-0'
              }
            },
            {
              date: new Date(),
              isRejected: true,
              user: {
                uuid: 'user-1'
              }
            }
          ]
        }
      ]
    },
  ]);

  history.save().then(savedHistory => {
    console.log('2. Success to saved');
  }).catch(err => {
    console.error(err.stack);
  });

  history = History.create([
    {
      installKey: 'key-2',
      features: [
        {
          key: 'feature-0',
          users: [
            {
              date: new Date(),
              isRejected: false,
              user: {
                uuid: 'user-0'
              }
            },
            {
              date: new Date(),
              isRejected: false,
              user: {
                uuid: 'user-1'
              }
            }
          ]
        },
        {
          key: 'feature-1',
          users: [
            {
              date: new Date(),
              isRejected: true,
              user: {
                uuid: 'user-0'
              }
            },
            {
              date: new Date(),
              isRejected: true,
              user: {
                uuid: 'user-1'
              }
            }
          ]
        }
      ]
    },
  ]);

  history.save().then(savedHistory => {
    console.log('3. Success to saved');
  }).catch(err => {
    console.error(err.stack);
  });
}
