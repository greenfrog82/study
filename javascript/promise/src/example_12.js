import fs from 'fs';

new Promise((resolve) => {
  const msg = 'Good!';
  console.log('----- 1.', msg);
  resolve(msg);
}).then(ErrorTester
).then(
  (msg) => {
    console.log('----- 3.', msg);
    return msg;
  },(err) => {
    throw err;
  }
).catch(err => {
  console.log('----- ERROR HANDLER : ', err);
});

// Problem 1. Promise안의 비동기 함수에서 throw new Error를 하면 에러 발생. 원인이 무엇인가? 일단 해결은 reject를 쓰는걸로 근데 에러가 발생하는 원인은 알아야겠다!
function ErrorTester(msg) {
  return new Promise((resolve, reject) => {
    try {
      fs.mkdir('./test', err => {
        //  if(err && 'EEXIST' !== err.code) {
        if(err) {
           console.log('----------- 3.');
           reject(err);
         }
       });

        // throw new Error('test');

        //  resolve('success');

    } catch(e) {
       console.log('try - catch :', e);
    }

    console.log('-------------- 5.');
  });
}
//
// import fs from 'fs';
//
// // new Promise((resolve) => {
// //   first(resolve);
// // })
// Promise.resolve(first())
// .then(second)
// .then(third)
// .catch(err => {
//   cosnole.log('--- ERROR HANDLER :', err.toString());
// });
//
// // function first(resolve) {
// //   const msg = 'Good!';
// //   console.log('----- 1.', msg);
// //   resolve(msg);
// // }
//
// function first() {
//   return new Promise((resolve) => {
//     const msg = 'Good!';
//     console.log('----- 1.', msg);
//     resolve(msg);
//   });
// }
// function second(msg) {
//   console.log('----- 2.', msg);
//   return new Promise((resolve) => {
//     fs.mkdir('./test', err => {
//        if(err && 'EEXIST' !== err.code) {
//          console.log('----------- 3.');
//          throw err;
//        }
//
//        throw new Error('test');
//       //  console.log('----------- 4.');
//       //  resolve('success');
//     });
//     console.log('----------- 5.');
//   });
// }
//
// function third(msg) {
//   console.log('----- 6.', msg);
//   return msg;
// }
//
// console.log('---- End.');
