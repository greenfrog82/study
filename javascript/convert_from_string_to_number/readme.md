# 문자열을 숫자로 바꾸기

자바스크립트에서 문자열을 숫자로 바꿔주는 함수는 다음과 같다.

* [Number](http://www.w3schools.com/jsref/jsref_number.asp)
* [parseInt](http://www.w3schools.com/jsref/jsref_parseint.asp)
* [parseFloat](http://www.w3schools.com/jsref/jsref_parsefloat.asp)

[Number](http://www.w3schools.com/jsref/jsref_number.asp)는 정수와 실수 형식을 모두 변환할 수 있지만, 나머지 함수는 정수와 실수에 대해서 나뉘어져있다. 다음 예제를 실행해보자.

```
[참고]

엄밀히 말하면 자바스크립트에는 정수형 자료형과 실수형 자료형이 따로 존재하지 않는다. 자바스크립트는 Number형 자료형만이 존재하고 이를 통해 정수형과 실수형을 표현한다.
```

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

## Unary Plus Operator

위 방법 이외에도, String 자료형 앞에 + 연산자를 붙여서 Number형으로 형변환을 할 수 있다.

[ex3.js](./ex3.js)

```javascript

let str = '100';
console.log(`+str : ${typeof +str}, ${+str}`);       // 100

str = '100.12';
console.log(`+str : ${typeof +str}, ${+str}`);       // 100.12

str = '100.12%';
console.log(`+str : ${typeof +str}, ${+str}`);       // NaN
```

결과는 Number함수와 동일하며, Number 함수의 축약형으로 사용할 수 있을 것 같다. (Number함수의 축약형이라는 공식 문서는 찾지 못했다.)

# 참조

* [JavaScript Number() Function](http://www.w3schools.com/jsref/jsref_number.asp)
* [JavaScript parseInt() Function](http://www.w3schools.com/jsref/jsref_parseint.asp)
* [JavaScript parseFloat() Function](http://www.w3schools.com/jsref/jsref_parsefloat.asp)
* 모던 웹을 위한 JavaScript jQuery 입문 / 한빛미디어
* [Converting Strings to Number in Javascript: Pitfalls](https://coderwall.com/p/5tlhmw/converting-strings-to-number-in-javascript-pitfalls)
* [Unary Plus Operator Shorthand for Converting a String to a Number in Javascript](http://niki4810.github.io/blog/2013/08/20/unary-plus-operator-shorthand-for-converting-string-to-number-in-javascript/)
* [JavaScript adding a string to a number](http://stackoverflow.com/questions/16522648/javascript-adding-a-string-to-a-number)
* []
