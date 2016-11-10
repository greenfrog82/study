const _promise = param => {
  return new Promise((resolve, reject) => {
    setTimeout(() =>{
      if(param) {
        resolve('Success');
      } else {
        reject('Failure');
      }
    }, 10);
  });
};

_promise(true)
.then(JSON.parse)
.catch((err) => {
  console.log('First Error Handler', err);
  JSON.parse('test');
})
.then(() => {
  console.log('Hi~');
})
.catch((err) => {
  console.log('Second Error Handler', err);
});

for(let i=0; i<100000; i++) {
  console.log('Operation ...' + i);
}
