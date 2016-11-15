const ret = false;

new Promise((resolve, reject) => {
  if(ret) {
    resolve('success');
  } else {
    reject('fail');
  }
}).then(
  (msg) => {
    console.log(`1. resolve - ${msg}`);
    return msg;
  },
  (msg) => {
    console.log(`1. reject - ${msg}`);
    // return msg;  // 리턴을 하면 Promise.resolve(msg)와 동일한 동작을 함. 따라서 다음 then의 resolve 메소드가 호출된다.

    // 예외를 발생시킬 경우 다음 reject함수에서 잡아서 처리하고, 만약, reject함수들이 없다면 catch로 떨어진다. 만약 catch도 없다면 UnhandledPromiseRejectWarning이 발생한다.(Node.js의 경우)
    throw new Exception(msg);
  }
).then(
  (msg) => {
    console.log(`2. resolve - ${msg}`);
    return msg;
  },
  (msg) => {
    console.log(`2. reject - ${msg}`);
    // return msg;
    // return Promise.reject(msg);
  }
).then(
  (msg) => {
    console.log(`3. resolve - ${msg}`);
    return msg;
  }
  // },
  // (msg) => {
  //   console.log(`3. reject - ${msg}`);
  //   return msg;
  // }
).catch(err => {
  console.log('--- ERROR :', err);
});
