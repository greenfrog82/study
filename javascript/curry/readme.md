# Curring

커링이란 여러개의 인자를 받는 함수를 하나의 인자를 받는 함수로 쪼개는 Functional Programming 기법을 이야기한다. 커링 기법을 이용하면 여러개의 인자 중 고정 시켜둬야 하는 인자를 미리 전달하여 이를 참조하는 함수를 만들어두고 매번 변경되는 인자만을 전달해서 필요한 결과를 얻어낼 수 있다.

예를들어, 메시지를 출력할 때 특정 Prefix를 붙이고자 한다고 하자. 이를 커링을 사용하면 다음과 같이 구현할 수 있다.

```javascript
function logger(prefix, msg) {
  console.log(`[${prefix}] ${msg}`);
}

function curry(fn) {
  const arity = fn.length;
  return (function resolver() {
    const memory = Array.prototype.slice.call(arguments);
    return function() {
      const local = memory.slice();
      Array.prototype.push.apply(local, arguments);
      const next = local.length >= arity? fn: resolver;
      return next.apply(null, local);
    };
  }());
}

const curriedLogger = curry(logger);

const debugLogger = curriedLogger('DEBUG');
const infoLogger = curriedLogger('INFO');

debugLogger('This is logger for debug.');
infoLogger('This is logger for info.');
```

출력 결과는 다음과 같다.

```
[DEBUG] This is logger for debug.
[INFO] This is logger for info.
```


## 참조

* [[개발] Currying in JavaScript](https://medium.com/@jinro4/%EA%B0%9C%EB%B0%9C-currying-in-javascript-e7ccdd7862e0#.pozmls8av)
* [JavaScript 특징의 이해 - JS의 중심 Function 살펴보기(2)](http://blog.nundefined.com/22)
* [(번역)자바스크립트에서의 커링](http://shiren.github.io/2015-08-03-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%97%90%EC%84%9C%EC%9D%98-%EC%BB%A4%EB%A7%81/)
