import fs from 'fs';

// http://yubylab.tistory.com/entry/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-Promise-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0

function myPromise() {
  Promise.resolve().then(() => {
    // Puzzle #1
    // return new Promise((resolve) => {
    // Puzzle #2
    new Promise(() => {
      fs.mkdir('./test', err => {
         if(err && 'EEXIST' !== err.code) {
           console.log('----------- 2.');
           throw err;
         }
         console.log('----------- 3.');
        //  resolve('success');
      });
    });
  }).then((msg) => {
    console.log('----------- 4.', msg);
  }).catch();
}

myPromise();

console.log('------------- Test Code is Ended.');
