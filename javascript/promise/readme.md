# Promise

## 개념

개념 정리는 [[Javascript] 바보들을 위한 Promise 강의 - 도대체 Promise는 어떻게 쓰는거야?](http://programmingsummaries.tistory.com/325)에 잘 정리되어 있으므로 이를 보면 될 것이다.

example_1 ~ example_4는 위 문서의 내용을 공부하고 예제들을 코딩해 본 것이다.

좀 더 자세한 내용과 통찰을 얻고 싶으면, [[자바스크립트] Promise 이해하기](http://yubylab.tistory.com/entry/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-Promise-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0)를 읽어보자.

## 체이닝

체이닝은 [Promise.prototype.then()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) 또는 [Promise.prototype.catch()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch)가 [Promise](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise)를 반환하는 특성을 이용해서 앞선 [Promise](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise)의 동작이 끝나면 [Promise.prototype.then()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)에서 제공하는 resolve 또는 reject 함수를 호출하게 되고 이때 반환되는 값이 자동으로 다음에 제공되는 [Promise.prototype.then()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) 함수의 resolve 함수로 랩핑되어 호출되는 것을 말한다.

```javascript
const _promise = (x, y) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(x + y);
    }, 1000);
  });
};

_promise(100, 100)
.then(result => {
  // 여기서 반환된 값은 다음 .then함수의 resolve 콜백함수로 랩핑되어 Promise 객체에 전달되어 실행된다.
  return result * 2;  
})
.then(result => {
  console.log('Result is', result);
});

```

## 예외처리

Promise를 사용할 때, Promise의 executor에서 에러를 throw하는 경우 catch handler가 존재할 때, reject handler가 존재하는 경우와 그렇지 않은 경우 어떻게 동작하게 될까?
우선, reject handler가 존재하는 경우 Promise의 executor에서 에러를 throw하게 되면 catch handler가 에러를 잡아서 처리하지 않고 reject handler가 에러를 잡아서 처리한다.

```javascript
new Promise((resolve, reject) => {
  throw new Error("I'm Error.");
}).then(
  param => {
    console.log('Success to execute Promise!');
  },
  err => {
    console.log(`Fail to execute Promise! ${err.stack}`);
  }
).catch(
  err => {
    console.log(`ERROR HANDLER : ${err.stack}`);
  }
);
```

하지만, reject handler가 존재하지 않는 경우에는 catch handler가 에러를 잡아서 처리한다.

```javascript
new Promise((resolve, reject) => {
  throw new Error("I'm Error.");
}).then(
  param => {
    console.log('Success to execute Promise!');
  }
).catch(
  err => {
    console.log(`ERROR HANDLER : ${err.stack}`);
  }
);
```

[example_13](./src/example_13.js)

## [주의] Promise는 Thread가 아니다!!

[Promise](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise)는 비동기 처리를 가독성있게 코딩하 수 있도록 도와주는 패턴이지 Thread가 아니다. 다시 말해서 CPU를 동작시키지 않는 IO처리를 비동기로 처리할 때 가독성 있게 비동기 코드를 짜도록 도와주는 도구인것이다.

[[Javascript] 바보들을 위한 Promise 강의 - 도대체 Promise는 어떻게 쓰는거야?](http://programmingsummaries.tistory.com/325)의 예제를 보면 [Promise](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise)의 실행함수 안에서 setTimeout 함수를 사용한 것을 볼 수 있는데 이는 예제에서 비동기 처리를 흉내내기 위함이다. 다시말하면 해당 실행함수가 호출 되었을 때 타이머가 발생하기 전에는 다른 코드가 실행될 수 있다. 그리고 이것이 비동기 처리를 사용하는 이유이기도하다.

다음 exmaple_1.js를 보자. 아래 예제를 실행시켜보면 [Promise](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise)의 실행 함수 안에서 타이머 설정을 10밀리세컨드로 줬기 때문에 굉장히 빨리 동작하게 될 것임에도 불구하고 [Promise](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise)의 실행 함수 전에 for문이 동작하고 있으므로 [Promise](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise)의 실행 함수는 for문의 동작이 완료 될 때까지 동작하지 않는다.

```javascript
const _promise = param => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(param) {
        resolve('Success');
      } else {
        resolve('Failure');
      }
    }, 10);
  });
};

//_promise(true)
_promise(false)
.then(
  (msg) => {
    console.log('-- resolve : ', msg);
  },
  (msg) => {
  console.log('-- reject : ', msg);
  }
);

for(let i=0; i<100000; i++) {
  console.log('Operation ...' + i);
}
```

이러한 내용을 이해한다면 [Promise](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise)의 실행함수에서 동기함수를 사용하는 것은 비동기 처리가 되지 않아 다른 코드들이 블락될 수 있다는 것을 알 수 있을 것이다.

다음 example_6.js 코드를 보자. [Promise](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise)의 실행함수 안에서 반복문을 10만번 수행하도록 하여 동기함수를 흉내내었다. 그리고 [Promise](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise)의 실행함수를 실행 시킨 후 10밀리세컨드 후에 반복문이 실행되도록 하였다. 원래 비동기 처리를 했다면 10밀리세컨드 후에 반복문이 동작해야하지만 [Promise](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise)의 실행함수는 동기처리되어 있으므로 해당 함수가 다 끝난 후에야 반복문이 실행 될 것이다.

```javascript
const _promise = param => {
  return new Promise((resolve, reject) => {
      if(param) {
        resolve('Success');
      } else {
        reject('Failure');
      }
  });
};

_promise(true)
.then(
  (msg) => {
    console.log('-- resolve : ', msg);
    for(let i=0; i<100000; i++) {
      console.log('Promise ...' + i);
    }
  },
  (msg) => {
  console.log('-- reject : ', msg);
  }
);

setTimeout(() => {
  for(let i=0; i<100000; i++) {
    console.log('Operation ...' + i);
  }
}, 10);
```

따라서, [Promise](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise)는 비동기 처리를 위한 코드를 가독성있게 작성하기 위해서 사용해야하며, 이것이 쓰레드와 같이 실행흐름을 분리하는 것이 아니라는 것에 주의해야한다.


### 작성 중 ... 아직 공부해야할 내용이 많다 ...


## 참조

* [[Javascript] 바보들을 위한 Promise 강의 - 도대체 Promise는 어떻게 쓰는거야?](http://programmingsummaries.tistory.com/325)
* [Promise](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise)
* [How to Chain JavaScript Promises – Intro Tutorial to JavaScript Promises](https://html5hive.org/how-to-chain-javascript-promises/)
* [[자바스크립트] Promise 이해하기](http://yubylab.tistory.com/entry/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-Promise-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0)
