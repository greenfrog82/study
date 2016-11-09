// 방

var numbers = [];

for(var i=0; i<10000000; i++) {
  numbers.push({a:i, b:i+1, c:i*1});
}

var start = new Date();
numbers = [];
// numbers.length = 0;
//numbers.splice(0, numbers.legnth);
// while(numbers.length) {
//   numbers.pop();
// }
var stop = new Date();
console.log('Elapse : ', stop - start);
