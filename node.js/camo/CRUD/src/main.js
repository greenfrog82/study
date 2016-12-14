/* jshint -W097 */
/*jslint node: true */
'use strict';

const os = require('os');
const connect = require('camo').connect;
const Document = require('camo').Document;
const EmbeddedDocument = require('camo').EmbeddedDocument;
// Using anonymous class ..
const create = require('./util').create;
const updateByTitle = require('./util').updateByTitle;
const readByTitle = require('./util').readByTitle;
const readAll = require('./util').readAll;
const deleteByTitle = require('./util').deleteByTitle;
const deleteAll = require('./util').deleteAll;
const readAllByTitle = require('./util').readAllByTitle;
const readAndDelete = require('./util').readAndDelete;

// const uri = 'nedb:///Users/scott/data/animals';
// const uri = `nedb:///${os.homedir()}/pidotech/license/repository.db`;
// const uri = 'nedb://c:/users/greenfrog/nedb-repo';  // drive를 작성하기 위해t서는 nedb:// 여기까지만, 대부분 리눅스 기준이라 /users가 붙어서 nedb:/// 이렇게 3개로 보이는거임 ... @.@
const uri = 'nedb://./db';

connect(uri).then(
  db => {
    console.log('Success to connect into nedb.');
    // _create();
    // _update();
    // _updateThereIsNo();
    // _readByTitle();
    // _readAll();
    // _readAllByTitle();
    // _readThereIsNoTitle();
    // _deleteByTitle();
    //  _deleteThereIsNoTitle();
    // _deleteAll();
    _readAndDelete();
  },
  err => {
    console.error('Fail to connect to nedb.', err);
  }
).catch(ex => {
  console.error(`ERROR HANDLER : ${ex.toString()}`);
});

function _create() {
  create({
    title: '토르',
    rating: '15',
    releaseDate: new Date(2011, 4, 2),
    hasCreditCookie: true
    // hasCreditCookie: 'true' // 이 코드의 주석을 풀면 Promise의 reject handler가(reject handler가 없는 경우는 catch handler가) 호출되는 것을 확인할 수 있다.)
  });
  create({
    title: '레옹',
    rating: '19',
    releaseDate: new Date(2011, 4, 2),
    hasCreditCookie: true
    // hasCreditCookie: 'true' // 이 코드의 주석을 풀면 Promise의 reject handler가(reject handler가 없는 경우는 catch handler가) 호출되는 것을 확인할 수 있다.)
  });
  create({
    title: '뽀로로',
    rating: 'ALL',
    releaseDate: new Date(2011, 4, 2),
    hasCreditCookie: true
    // hasCreditCookie: 'true' // 이 코드의 주석을 풀면 Promise의 reject handler가(reject handler가 없는 경우는 catch handler가) 호출되는 것을 확인할 수 있다.)
  });
}

function _update() {
  updateByTitle('뽀로로', '19');
}

function _updateThereIsNo() {
  updateByTitle('호고곡', '19');
}

function _readByTitle() {
  readByTitle('뽀로로');
}

function _readAll() {
  readAll();
}

function _readThereIsNoTitle() {
  readByTitle('없는거');
}


function _readAllByTitle() {
  readAllByTitle('토르');
}

function _deleteByTitle() {
  deleteByTitle('뽀로로');
}

function _deleteThereIsNoTitle() {
  deleteByTitle('없는거');
}

function _deleteAll() {
  deleteAll();
}

function _readAndDelete() {
  readAndDelete('뽀로로');
}
