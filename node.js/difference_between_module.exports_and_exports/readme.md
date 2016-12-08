# module.exports와 exports의 차이점

module.exports와 exports의 관계를 코드로 나타내면 다음과 같이 나타낼 수 있다.

```javascript
var module = {
	exports: {}
};

var exports = module.exports;

return module.exports;
```

결국, exports는 module의 exports 객체를 참조하고 있는 변수이고 module.exports를 통해 프로퍼티를 추가하던 exports를 통해 프로퍼티를 추가하던 결국 module객체의 exports 객체를 반환하게 된다.

이때 **주의할 점**은 exports의 객체를 아예 다른 객체로 바꿔서 외부로 노출시키고자 할 때는 반드시 module.exports에 할당해줘야한다는 것이다.
예를들어, 다음과 같이 printName이라는 함수 또는 Printer라는 객체를 반환하고자 한다고 하자. 이때, 이들을 exports에 할당해버리면 module.exports에 할당한것이 아니므로 정상적으로 원하는 함수 또는 객체가 외부로 전달되지 않는다.

```javascript
exports = function printName(name) {
  console.log(name);
}
// or
exports = class Printer {
  constructor(name) {
    this.name = name;
  }
  print() {
    console.log(this.name);
  }
}
```

이를 옳바르게 처리하려면 다음과 같이해야한다.

```javascript
module.exports = function printName(name) {
  console.log(name);
}
// or
module.exports = class Printer {
  constructor(name) {
    this.name = name;
  }
  print() {
    console.log(this.name);
  }
}
```


## 참조

* [[NodeJS] module.exports와 exports의 차이점](http://programmingsummaries.tistory.com/340)
