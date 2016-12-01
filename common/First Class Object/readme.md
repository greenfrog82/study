# 1급 객체

1급 객체에 대한 핵심적인 사항만을 간단히 정리했으면 자세한 내용은 참조 항목들을 참고하자.

**1급 객체의 조건**

* 변수에 담을 수 있어야한다.
* 함수의 인자로서 전달할 수 있어야한다.
* 함수에서 반환 될 수 있어야한다.

좀 더 엄격한 기준으로 구분을 한다면 다음 두가지 조건을 추가할 수 있다.

* Run-time에 생성될 수 있어야한다.
* 익명(anonymous)로 생성 가능해야한다.

**JavaScript에서 함수가 1급 객체인 이유**

JavaScript에서는 함수도 곧 객체이기 때문.

**1급 객체의 필요성**

고계 함수(high order function)의 사용이 가능해지므로 Interface 기반으로 코딩할 때 보다 코드가 간결해진다.

## 참조

* [1급 객체(First-class citizen)란?](https://medium.com/@lazysoul/functional-programming-%EC%97%90%EC%84%9C-1%EA%B8%89-%EA%B0%9D%EC%B2%B4%EB%9E%80-ba1aeb048059#.88htbzse7)
* [JavaScript의 함수는 1급객체(first class object)이다.](http://bestalign.github.io/2015/10/18/first-class-object/)
* Programming in Scala Second Edition 한국어판
