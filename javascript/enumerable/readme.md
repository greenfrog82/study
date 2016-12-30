# enumerable 프로퍼티 속성

enumerable 프로퍼티 속성은 for문과 같이 루프를 통해서 해당 프로퍼티에 액세스 할 수 있는지 여부를 설정하는 속성이다.

다음 예제를 보자. name과 age라는 프로퍼티를 갖는 객체를 정의하고 for문을 통해서 해당 객체의 프로퍼티와 값을 출력하였다.

[ex_1.js](./src/ex_1.js)
```javascript
const obj = {
  name: 'greenfrog',
  age: 35
};

for(let key in obj) {
  console.log(`${key}:${obj[key]}`);
}
```

하지만, [MDN - Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 메소드를 통해 프로퍼티의 속성을 정의할 때 enumerable 속성의 기본값은 false로 설정된다고 나와있는데 위 예제의 경우는 for문을 통해 name과 age 프로퍼티 모두 출력되었으므로 [MDN - Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 메소드를 사용하여 프로퍼티를 정의하지 않는 경우 enumerable 속성은 true로 설정된다고 추측할 수 있다.

이를 확인해보자. 다시 예제 [ex_1.js](./src/ex_1.js)에 다음 코드를 추가하여 각 프로퍼티의 속성을 확인해보았다.

```javascript
console.log(`Attribute of name : ${JSON.stringify(Object.getOwnPropertyDescriptor(obj, 'name'))}`);
console.log(`Attribute of name : ${JSON.stringify(Object.getOwnPropertyDescriptor(obj, 'age'))}`);
```
결과는 다음과 같이 enumerable 속성의 값이 true로 설정되어 있는것을 확인 할 수 있다. 이 결과를 통해 **[MDN - Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 메소드를 통해 프로퍼티의 속성을 정의하지 않는 경우 enumerable 속성은 true로 설정 됨을 알 수 있다.**

```
Attribute of name : {"value":"greenfrog","writable":true,"enumerable":true,"configurable":true}
Attribute of name : {"value":35,"writable":true,"enumerable":true,"configurable":true}
```

그렇다면, [MDN - Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 메소드를 통해 enumerable 속성을 다뤄보자. 다음 예제와 같이 name 프로퍼티에는 enumerable 속성을 true로 하고, age 프로퍼티의 enumerable 속성은 생략해보자. age 프로퍼티의 enumerable 속성은 기본값인 false가 설정될 것이다.

[ex_2.js]('./src/ex_2.js')
```javascript
const obj = {};

Object.defineProperties(obj, {
  name: {
    value: 'greenfrog',
    enumerable: true
  },
  age: {
    value: 35
  }
});

for(let key in obj) {
  console.log(`${key}:${obj[key]}`);
}
```

결과는 예상한데로 name:greenfrog만 출력되고 age는 출력되지 않는다. 좀 더 확실히 하기 위해서 다음 코드를 추가하여 각각 프로퍼티에 설정 된 속성을 확인해보자.

```javascript
console.log(`Attribute of name : ${JSON.stringify(Object.getOwnPropertyDescriptor(obj, 'name'))}`);
console.log(`Attribute of name : ${JSON.stringify(Object.getOwnPropertyDescriptor(obj, 'age'))}`);
```

결과는 다음과 같다.

```
Attribute of name : {"value":"greenfrog","writable":false,"enumerable":true,"configurable":false}
Attribute of name : {"value":35,"writable":false,"enumerable":false,"configurable":false}
```

## 참조

* [JavaScript: Property Attributes: Writable, Enumerable, Configurable](http://xahlee.info/js/javascript_property_attributes.html)
* [MDN - Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
