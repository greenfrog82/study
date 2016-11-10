const _promise = param => {
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

_promise(true)
.then(JSON.parse)
.catch((err) => {
  console.log('-- Error handler :', err);
})
.then((text) => {
  console.log(text);
});

for(let i=0; i<100000; i++) {
  console.log('Operation ...' + i);
}
