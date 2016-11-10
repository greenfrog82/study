const _promise = param => {
  return new Promise((resolve, reject) => {
      if(param) {
        resolve('Success');
      } else {
        reject('Failure');
      }
  });
};

_promise(true)
.then(
  (msg) => {
    console.log('-- resolve : ', msg);
    for(let i=0; i<100000; i++) {
      console.log('Promise ...' + i);
    }
  },
  (msg) => {
  console.log('-- reject : ', msg);
  }
);

setTimeout(() => {
  for(let i=0; i<100000; i++) {
    console.log('Operation ...' + i);
  }
}, 10);
