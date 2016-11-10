const _promise = (param) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(param) {
        resolve('Success');
      } else {
        resolve('Failure');
      }
    }, 10);
  });
};

//_promise(true)
_promise(false)
.then(
  (msg) => {
    console.log('-- resolve : ', msg);
  },
  (msg) => {
  console.log('-- reject : ', msg);
  }
);

for(let i=0; i<10; i++) {
  console.log('Operation ...' + i);
}
