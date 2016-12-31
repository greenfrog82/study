# [Function.prototype.call()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)과 [Function.prototype.apply()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)에 대해서

각각 두 함수는 함수 내부에서 참조하는 this를 함수를 호출하는 쪽에서 파라메터로 전달할 수 있도록 한다. 이를 통해서 정적 타입 언어에서는 구현할 수 없는 좀 더 유연한 방식의 코딩이 가능해지는데 [Function.prototype.call()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)과 [Function.prototype.apply()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)에서 내부적으로 참조하는 this의 속성과 동일한 속성을 갖고 있다면 어떠한 객체든 해당 함수에서 처리가 가능해진다.

예를들면, 다음과 같이 이름과 나이를 출력하는 함수가 있다고 가정하자. 이 함수는 다음과 같이 정의되어 있다.

[ex_1.js](./src/ex_1.js)
```javascript
function printer() {
  console.log(`My name is ${this.name} and ${this.age} years old.`);
}
```

여기에, 사람을 나타내는 person객체와 동물을 나타내는 animal객체가 각각 다음과 같이 정의되어 있다고 하자.

```javascript
const person = {
  name: 'greenfrog',
  age: '35'
};

const animal = {
  name: 'lion',
  age: 1000
};
```

이를 다음과 같이 [Function.prototype.call()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)을 이용해서 호출하면 printer 함수에서 사용하는 this객체가 각각 person과 animal이 되고 각각의 객체가 모두 name과 age 프로퍼티를 가지고 있으므로 정상적으로 이름과 나이를 출력한다.

```javascript
printer.call(person);
printer.call(animal);
```

위 코드에서 printer.call호출부를 printer.apply로 변경해도 동일한 결과를 출력하게 되는데, 그러면 [Function.prototype.call()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)과 [Function.prototype.apply()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)의 차이점은 무엇일까? 이 둘의 유일한 차이점은 this 파라메터 이외의 파라메터를 각각 받느냐 아니면 배열로 받느냐의 차이이다.
[Function.prototype.call()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)는 this 파라메터 이외의 파라메터를 각각 전달받으며, [Function.prototype.apply()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)는 배열로 전달받는다.

전달해야하는 파라메터가 고정되어 있다면 [Function.prototype.call()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)을 통해 호출하면 될 것이고, 유동적이라면 [Function.prototype.apply()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)를 호출하면 될 것이다.

다음 예제를 참고하자. Math.max 메소드의 경우 주어진 값에 대해서 최대값을 반환해 준다. 이 경우 주어진 값이 개수는 유동적이므로 [Function.prototype.apply()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)를 통해 메소드를 사용하는 것이 적합해 보인다.

[ex_2.js](./src/ex_2.js)
```javascript
const values = [5, 6, 2, 3, 7];
console.log(Math.max.apply(null, values));
```


## 참조

* [[속깊은 자바스크립트 강좌] 함수를 호출하는 방법과 THIS의 이해](http://unikys.tistory.com/306)
* [MDN - Function.prototype.call()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
* [MDN - Function.prototype.apply()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
