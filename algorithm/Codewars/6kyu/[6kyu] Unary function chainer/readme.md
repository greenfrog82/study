# [6kyu] Unary function chainer

### Description

Your task is to write a higher order function for chaining together a list of unary functions. In other words, it should return a function that does a left fold on the given functions.

chained([a,b,c,d])(input)
Should yield the same result as

d(c(b(a(input))))

### My Solution

```javascript
function chained(functions) {
  return function(arg) {

    var recvFunc = function(arg) {
      if(0 >= functions.length) {
        return arg;
      }
      return recvFunc(functions.shift()(arg));
    };
    return recvFunc(arg);
  };
}
```

아 .. 위 코드로 'RUN EXAMPLES'는 통과하는데 'RUN SUITE'은 통과를 못한다. 문제를 잘못 푼것은 아닌것 같아서, 'RUN SUITE'으로 전달되는 파라미터들을 디버깅해봤는데 아무래도 테스트 코드들이 잘못된것 같아 관련 내용을 문제 출제자에게 전달했다. 내가 잘못 푼것인지 .. 아니면 문제가 잘못된것인지 .. 기다려보자 .. ㅠㅠ

### Others Solutions

```javascript
```

```javascript
```
