/* jshint -W097 */
/*jslint node: true */
'use strict';

const snail = function(array) {
  let direction = 'right';
  const ret = [];

  const printItem = () => {
    console.log(`ret : ${ret}`);
    switch(direction) {
      case 'right': {
        direction = 'down';
        array.shift().forEach(item => {
          ret.push(item);
        });
        break;
      }
      case 'down': {
        direction = 'left';
        array.forEach(item => {
          ret.push(item.pop());
        });
        break;
      }
      case 'left': {
        direction = 'up';
        const arr = array.pop();
        while(arr.length) {
          ret.push(arr.pop());
        }
        break;
      }
      case 'up': {
        direction = 'right';
        for(let i=array.length-1; i>=0; i--) {
          ret.push(array[i].shift());
        }
        break;
      }
    }
    return (0 === array.length)? ret: printItem();
  };
  return printItem(direction);
};

const array1 = [[1,2,3],
                [4,5,6],
                [7,8,9]];

const array2 = [[1,2,3,4],
                [5,6,7,8],
                [9,10,11,12],
                [13,14,15,16]];

console.log(snail(array1));
console.log(snail(array2));

var sum = [0, 1, 2, 3].reduce(function(a, b) {
  console.log(`a : ${a}`);
  console.log(`b : ${b}`);
  
  return a + b;
}, 0);
