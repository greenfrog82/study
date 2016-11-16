import fs from 'fs';

// 체인에서 첫번째 프로미스 객체는 resolve를 호출 하는 시점에 then의 resolve 함수가 호출된다. 당연한 이야기이다.
// 만약, resolve 함수를 호출하지 않으면 프로그램은 종료된다.
new Promise((resolve, reject) => {
  console.log('---------------- 1.');
  let msg;
  fs.mkdir('./test', err => {
     if(err && 'EEXIST' !== err.code) {
       console.log('----------- 2.');
       throw err;
     }
     console.log('----------- 3.');
     msg = 'success';
     resolve(msg);
  });
  console.log('----------- End.');
  //  resolve(msg);
}).then(
  (msg) => {
    console.log('--- then : ', msg);
  },
  (msg) => {
    console.log('-- reject : ', msg);
  }
).catch((err) => {
  const msg = err.toString();
  console.log(`---- ${msg}`);
});

console.log('------------- Test Code is Ended.');
