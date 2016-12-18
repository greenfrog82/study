# 문자열을 숫자로 바꾸기

자바스크립트에서 문자열을 숫자로 바꿔주는 함수는 다음과 같다.

* [Number](http://www.w3schools.com/jsref/jsref_number.asp)
* [parseInt](http://www.w3schools.com/jsref/jsref_parseint.asp)
* [parseFloat](http://www.w3schools.com/jsref/jsref_parsefloat.asp)

[Number](http://www.w3schools.com/jsref/jsref_number.asp)는 정수와 실수 형식을 모두 변환할 수 있지만, 나머지 함수는 정수와 실수에 대해서 나뉘어져있다. 다음 예제를 실행해보자.

[ex1.js](./src/ex1.js)
```JavaScript
let str = '100';

console.log(Number(str));       // 100
console.log(parseInt(str));     // 100
console.log(parseFloat(str));   // 100
console.log();

str = '100.12';

console.log(Number(str));      // 100.12
console.log(parseInt(str));    // 100
console.log(parseFloat(str));  // 100.12
```
여기서, [Number](http://www.w3schools.com/jsref/jsref_number.asp)와 [parseInt](http://www.w3schools.com/jsref/jsref_parseint.asp), [parseFloat](http://www.w3schools.com/jsref/jsref_parsefloat.asp)의 동작은 조금 다른데 가장 큰 차이점은 다음과 같다.

[ex2.js](./src/ex2.js)
```JavaScript
const str = '100.12%';

console.log(Number(str));       // NaN
console.log(parseInt(str));     // 100
console.log(parseFloat(str));   // 100.12
```

위 예제를 실행시켜보면, [Number](http://www.w3schools.com/jsref/jsref_number.asp)함수를 통해 실행한 코드는 NaN(Not a Number)를 출력하고 나머지 함수들은 각각 100과 100.12를 출력하는 것을 알 수 있다.

[Number](http://www.w3schools.com/jsref/jsref_number.asp)함수는 문자열이 완전히 숫자가 아니면 숫자로 변환을 하지 못하는것에 반해서, [parseInt](http://www.w3schools.com/jsref/jsref_parseint.asp)와 [parseFloat](http://www.w3schools.com/jsref/jsref_parsefloat.asp)함수는 문자열 중 일부 숫자가 있으면 이를 추출하여 숫자로 만들어 반환한다.

# 참조

* [JavaScript Number() Function](http://www.w3schools.com/jsref/jsref_number.asp)
* [JavaScript parseInt() Function](http://www.w3schools.com/jsref/jsref_parseint.asp)
* [JavaScript parseFloat() Function](http://www.w3schools.com/jsref/jsref_parsefloat.asp)
* 모던 웹을 위한 JavaScript jQuery 입문 / 한빛미디어
