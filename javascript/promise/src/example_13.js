// Promise안에서 throw를 했을 때, reject 함수가 있는 경우 reject함수가 호출되는지 아니면 catch가 호출되는지 확인하기 위한 예제.

/* jshint -W097 */
/*jslint node: true */
'use strict';

let sum = 0;

new Promise((resolve, reject) => {
  throw new Error("I'm Error.");
}).then(
  param => {
    console.log('Success to execute Promise!');
  },
  err => {
    console.log(`Fail to execute Promise! ${err.stack}`);
  }
).catch(
  err => {
    console.log(`ERROR HANDLER : ${err.stack}`);
  }
);
