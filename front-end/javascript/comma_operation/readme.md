# Comma Operator

jQuery 코드를 분석하다가 merge 메소드의 return문이 다음과 같이 comma로 연결되어있는 것을 봤다.  
처음보는 문법이라 확인해보았다.  

```javascript
merge: function(a, b) {
    for (var c = +b.length, d = 0, e = a.length; d < c; d++)
        a[e++] = b[d];
        return a.length = e,
        a
    },
```

## Description

먼저, 위 return문에서 사용 된 문법은 Comma Operator라고 한다.   
Comma Operator는 comma로 분리 된 각각의 명령이 왼쪽부터 오른쪽으로 하나씩 수행되고 마지막으로 수행 된 명령의 결과가 리턴되는 문법을 말한다.   
따라서, 다양한 명령을 한 라인으로 표현하고 싶을 떄 언제든지 Comma Operator를 사용할 수 있으며 주로 for loop에서 다양한 파라메터를 제공하고 싶을 떄 사용된다.   

## Examples

다음 예제를 보자.  
다음 예제를 실행시키면 각각 2와 3을 리턴한다.   
앞서 Command Operator에 대해서 설명한 바와 같이 왼쪽에서 오른쪽으로 명령을 실행시키면서 마지막 수행 된 명령의 결과를 반환하는 것을 알 수 있다. 

```javascript
var x = 1;

x = (x++, x)

console.log('(x++, x) = ', x);
// expected output: 2

x = (2, 3);

console.log('(2, 3) = ', x);
// expected output: 3
```

**실행 결과**

```sh
(x++, x) =  2
(2, 3) =  3
```

이때 한가지 주의할 사항이 있다.   
다음 예제의 경우 명령의 결과를 변수에 대입하고 있는데 괄호를 없애면 왼쪽의 명령 또는 상수가 바로 변수에 대입된다는 것이다.   
그 이유는 [operator precedence and associativity](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence) 때문으로, 앞선 에제에서는 괄호를 통해 괄호 안에 있는 comma operator가 연산의 우선권을 가졌지만, 괄호가 지워진 상태에서는 comma operator 보다 대입 연산이 우선권을 갖기 때문이다. 

```javascript
var x = 1;

x = x++, x;

console.log('x++, x = ', x);
// expected output: 1

x = 2, 3;

console.log('2, 3 = ', x);
// expected output: 2
```

**실행 결과**

```sh
x++, x =  1
2, 3 =  2
```

위와 같은 이유로 return문에서는 괄호 없이 comma operator를 사용하여도 의도한대로 동작이 잘 되는 것을 확인 할 수 있다.  
다음 예제를 확인하자.

```javascript
function test() {
    var x = 0;
    return x = 1, x = 2;
}

res = test();
// expected output: 2
```

**실행 결과**

```sh
res =  2
```





## Reference

* [Comma operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comma_Operator)
* [return statement with multiple comma separated values [duplicate]](https://stackoverflow.com/questions/10284536/return-statement-with-multiple-comma-separated-values)