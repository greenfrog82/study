const _promise = (x, y) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(x + y);
    }, 1000);
  });
};

_promise(100, 100)
.then(result => {
  return result * 2;
})
.then(result => {
  console.log('Result is', result);
});
