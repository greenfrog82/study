const _promise1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('First Promise Completed.');
      resolve('1');
    }, Math.random() * 20000 + 1000);
  });
};

const _promise2 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Second Promise Completed.');
      resolve('2');
    }, Math.random() * 10000 + 1000);
  });
};

Promise.all([_promise1(), _promise2()]).then(values => {
  console.log('values :', values);
});
