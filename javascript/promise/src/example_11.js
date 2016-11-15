// new Promise((resolve) => {
//   const msg = 'Good!';
//   console.log('----- 1.', msg);
//   resolve(msg);
// }).then(
//   (msg) => {
//     console.log('----- 2.', msg);
//     return msg;
//   }
// ).then(
//   (msg) => {
//     console.log('----- 3.', msg);
//     return msg;
//   }
// );

import fs from 'fs';

// new Promise((resolve) => {
//   first(resolve);
// })
Promise.resolve(first())
.then(second)
.then(third);

// function first(resolve) {
//   const msg = 'Good!';
//   console.log('----- 1.', msg);
//   resolve(msg);
// }

function first() {
  return new Promise((resolve) => {
    const msg = 'Good!';
    console.log('----- 1.', msg);
    resolve(msg);
  });
}
function second(msg) {
  console.log('----- 2.', msg);
  return new Promise((resolve) => {
    fs.mkdir('./test', err => {
       if(err && 'EEXIST' !== err.code) {
         console.log('----------- 3.');
         throw err;
       }
       console.log('----------- 4.');
       resolve('success');
    });
    console.log('----------- 5.');
  });
}

function third(msg) {
  console.log('----- 6.', msg);
  return msg;
}

console.log('---- End.');
