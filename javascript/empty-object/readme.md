# Empty Object 확인하기

전달받은 객체가 빈 객체인지 확인하기 위해서는 다음과 같이 체크한다.

[ex_1.js](./src/ex_1.js)
```javascript
const obj = {};

if(obj.constructor === Object && Object.keys(obj).length === 0) {
  console.log('The obj is empty.');
} else {
  console.log('The obj is not empty.');
}
```

이때, obj.constructor === Object라는 코드가 있는데, 다음 예제를 보자.

[ex_2.js](./src/ex_2.js)
```javascript
const string = 'test';

console.log(Object.keys(string));
console.log(Object.keys(string).length);
console.log(String);
```

위 코드를 실행하면 다음과 같은 결과가 출력된다. 즉, 자바스크립트에서 Primitive타입으로 취급되는 문자열의 경우도 Object.keys()를 통해 문자열의 Key 배열을 정상적으로 반환한다. 따라서, Object.key() 메소드만으로는 해당 변수가 빈 객체인지 올바르게 판단할 수 있가 없다. 결국, 해당 변수의 타입이 Object객체인지 확인하기 위해서 obj.constructor === Object라는 코드를 추가적으로 사용한것이다.

```
[ '0', '1', '2', '3' ]
4
[Function: String]
```

그러면 Object타입의 경우는 어떻게 출력되는지 확인해보자. 다음 예제를 보자.

[ex_3.js](./src/ex_3.js)
```javascript
const obj = {};

console.log(obj.constructor);
console.log(Object);
```

위 코드를 실행하면 다음과 같은 결과가 출력된다.

```
[Function: Object]
[Function: Object]
```

결국, 위 예제를 통해 빈 객체인지 확인하기 위해서는 다음과 같이 검사해야함을 알 수 있다.

```javascript
obj.constructor === Object && Object.keys(obj).length === 0
```

## 참조

* [How do I test for an empty JavaScript object?](http://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object)
