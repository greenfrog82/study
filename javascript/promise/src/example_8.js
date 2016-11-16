import fs from 'fs';

// 1번 then에서 비동기 함수를 호출 할 경우 Promise가 아닌 비동기 함수를 호출하려면 Promise로 감싸줘야한다. 
new Promise((resolve, reject) => {
  console.log('---------------- 1.');
  resolve('success');
}).then(
  (msg) => {
    console.log('--- 1. then : ', msg);
    return new Promise((resolve) => {
      fs.mkdir('./test', err => {
         if(err && 'EEXIST' !== err.code) {
           console.log('----------- 2.');
           throw err;
         }
         console.log('----------- 3.');
         msg = 'still success';
        // return msg;
        resolve(msg);
      });
    });
  },
  (msg) => {
    console.log('--- 1. reject : ', msg);
  }
).then(
  (msg) => {
    console.log('--- 2. then : ', msg);
  },
  (msg) => {
    console.log('--- 2. reject : ', msg);
  }
).catch((err) => {
  const msg = err.toString();
  console.log(`---- ${msg}`);
});

console.log('------------- Test Code is Ended.');
