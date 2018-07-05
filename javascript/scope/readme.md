# Scope of Javascript

자바스크립트의 Scope에 대해서 알아보자. 

## Global Scope

브라우저의 경우 windows 객체에 Node.js의 경우 global 객체의 scope로 여기에 선언되는 변수, 함수 등은 모든 Scop에서 접근 가능하다. 

## Local Scope

Global Scope 하위에 function 또는 block 등으로 쌓여있는 Scope으로 해당 범위를 벗어나면 해당 변수가 가리키는 메모리 영역에 접근할 수 없다.  

### Function Scope vs Block Scope

#### Function Scope

자바스크립의 기본 Scope으로 function을 생성할 때 생성되는 Scope이다. 

```javascript
function iHaveScope() {
  // local function scope
  function iHaveNestedScope() {
    // nested local function scope
  }
}
```

#### Block Scope

JavaScript의 statement나 {}을 사용할 때 생성되는 Scope이다. 

```javascript
var a = {} // empty object literal
{ var a } // undefined object in a block scope
if (3 == '3') {
  // block scope for the if statement
}
for (var i=0; i<10; i++) {
  // block scope for the for statement
}
```

### var vs let

#### var

**var**는 **function Scope**을 지원하는 키워드로 다음과 같은 특징을 가지고 있다. 

* var이 function 안에 정의 되어있을 때는 function 외부에서는 접근하지 못함. 
* statement 또는 {} 안에 정의 되어있을 때는 외부에서 접근가능. 

#### let, const

**let**과 **const**는 **block Scope**을 지원하는 키워드로 다음과 같은 특징을 가지고 있다. 

* var과 동일하게 function 안에 정의 되어있는 변수가 function 외부에서는 접근하지 못함. 
* var과 달리 statement 또는 {} 안에 정의 되어있을 때는 외부에서 접근 불가.

## Lexical Scope

Inner function이 outer function의 scope에 접근할 수 있는 것.
이를 이용해 Closure를 만들거나, Arrow Function을 이용해서 this 참조문제를 해결할 수 있다. 



## Referecne

* [Closures, Lexical Scoping And Scope chain In JavaScript (ES5)](https://medium.com/@kamalkokne/closures-lexical-scoping-and-scope-chain-in-javascript-es5-56c38d7ba1a8)
* [JavaScript: Learn & Understand Scope](https://codeburst.io/javascript-learn-understand-scope-f53d6592c726)
* [JavaScript: Arrow Functions for Beginners](https://codeburst.io/javascript-arrow-functions-for-beginners-926947fc0cdc)
* [Function scopes and block scopes in JavaScript]()