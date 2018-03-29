# About Array.prototype.some method

some() 메소드는 특정 배열에서 테스트를 함수의 조건을 만족하는 요소가 최소한 하나가 존재하는지 확인하기 위해 사용된다. 

## Syntax

some() 메소드의 형식은 다음과 같다. 

```javascript
arr.some(callback[, thisArgs])
```

### Parameter

* callback : 해당 배열의 요소를 검사하기 위한 조건을 구현한 함수이다. 해당 함수는 다음 세가지 argument를 전달받는다. 
  * currentValue : 순회 중 배열의 현재 인덱스에 대응하는 값
  * index(Optional) : 순회 중 배열의 현재 인덱스
  * array(Optional) : some 메소드가 호출 된 배열 
* thisArg(Optional) : callback 함수의 this로 전달되는 값 

### Return Value

* true : callback 함수에 정의 된 조건을 만족할 때
* false : callback 함수에 정의 된 조건을 불만족 할 때

## Example

다음 예제코드를 보자. 

```javascript
let arr = [1, 2, 3, 4, 5];

let isExist = arr.some(element => 0 === element % 2);

console.log(`is exist? : ${isExist}`);
```

## Description

some 메소드는 callback함수의 리턴값이 true일때까지 배열의 요소를 순회한다. 만약, callback함수의 리턴값이 true이면 배열의 순회를 즉시 중단하고 true를 리턴하며, callback함수가 배열의 순회를 마칠때까지 true를 리턴하지 않으면 false를 리턴한다. callback함수는 오직 배열에 존재하는 요소에 대해서만 호출된다.  


## Reference

* [Array.prototype.some()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)