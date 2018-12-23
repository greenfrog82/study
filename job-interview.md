# Developer job interview

## 전산 기초

### 자료구조

* [Time Complexity](https://wiki.python.org/moin/TimeComplexity)
* Hash
    * 데이터 검색 시 시간 복잡도
        * key 충돌이 없는 경우: O(1)
        * key 충돌이 있는 경우: O(n)
    * 데이터 삽입 시 시간 복잡도 
        * key 충돌이 없는 경우: O(1)
        * key 충돌이 있는 경우: O(n)

### 알고리즘

* Binary Search
* Quick Sort

## 웹 기초 

* [URL Encoding에 대해서 설명하시오.](./web/url_encoding.md)

## Python

* mutable과 immutable sequence를 각각 나열하시오.
    * mutable sequence : list, bytearray, array.array, collections.deque, and memoryview
    * immutable sequence : tuple, str, and bytes
* iterator vs generator

## Django

### General

* Web Server에서부터 Django로 request가 들어와서 response가 나가는 과정을 설명하시오.

### TDD

* TestCase와 TransactionTestCase의 차이점을 설명하시오.

### ORM

* [ORM으로 데이터가 존재하는지 확인하는 방법을 설명하시오.](../TIL_Python/Django/how_to_django/queryset_cache.md)
    * 데이터의 존재여부만 확인하는 경우.
    * 데이터의 존재여부를 확인한 후 해당 쿼리 결과를 사용하는 경우.
* 다음의 relation field의 경우 Table schema가 어떻게 만들어지는 설명하시오.
    * ForeignKey
    * OneToOne
    * ManyToMany
    
## JavaScript

* 다음 코드가 어떻게 동작할지 설명하시오. (대답했다면, 이벤트 루프와 연결지어서 답변 받을것)
    ```javascript
    console.log('Hi');
    setTimeout(function() {
        console.log('callback');
    }, 0);
    console.log('Bye');
    ```
* [Attribute vs Property](https://github.com/greenfrog82/TIL_JavaScript/tree/master/javascript/attr_vs_props)
* [Function.prototype.call()과 Function.prototype.apply()에 대해서 설명하시오.](https://github.com/greenfrog82/study/tree/master/javascript/apply%2Ccall)
* [Number vs parseInt](https://github.com/greenfrog82/study/tree/master/javascript/convert_from_string_to_number)
* [Scope](https://github.com/greenfrog82/study/tree/master/javascript/scope)
    * Function Scope vs Block Scope
    * Lexical Scope
* class vs Prototype class
* SPA 를 작성하는 방식에 대해서 아는 대로 설명.
    * 전통적인 링크, form submit 방식.
    * AJAX 방식.
    * hash(#) 이용하는 방식.
    * pjax 방식.
    * [참고](https://poiemaweb.com/js-spa)

## DB

### General

* [Join에 대해서 설명할 하시오.](./db/mysql/join/readme.md)
* Union
    * Union vs Union All
    * Union을 어떤 경우 활용하였는지 설명하시오. 

### MySQL

* 각각의 Engine들에 대해서 설명하시오.
* 트랜잭션이 많이 사용되 때 InnoDB를 사용해야하는 이유에 대해서 설명하시오.
    * MyISAM을 사용할 수 없는 이유는?
    * TokuDB를 사용할 수 없는 이유는?

## [RESTful Architecture](design/restful/readme.md)

* 서버 scale out관점에서 RESTful Architecture의 가장 중요한 특징이 무엇이며 왜 그렇게 생각하는지 설명하시오.
    * Steateless에 대해서 설명하는지 확인.
    * 이를 설명했다면, 이를 구현하기 위한 방법에 대해서 설명요구. 
* HATEOAS(Hypermedia as the engine of application state)에 대해서 설명하시오. 

## Windows 개발자

* [SOLID 원칙에 대해서 설명하시오.](http://www.nextree.co.kr/p6960/) 
* Design Pattern
    * Template Method Pattern
    * Decorator Pattern
    * State Pattern
* [C/C++의 Pointer와 Reference의 차이점.](https://github.com/greenfrog82/study/tree/master/cpp/pointer_and_reference)
* IPC 방식에 대해서 아는대로 설명하시오. 
* Windows에서 Process와 Thread의 차이점에 대해서 설명하시오. 
* UI Thread와 Worker Thread의 차이점. 
    * Worker Thread에서 데이터를 처리한 후 화면을 어떻게 갱신할 수 있는지?
* Singleton에 대해서 설명하시오.
    * [Double Checked Locking](https://en.wikipedia.org/wiki/Double-checked_locking)에 대해서 설명하시오.
* Message Loop에 대해서 설명하시오. 

## Coding Test

* [배열에서 중복된 원소 찾기](https://github.com/greenfrog82/DailyCoding/tree/master/etc/find_a_duplicated_value)
* [덧셈의 합에 대응하는 중복되지 않는 배열 원소 구하기](https://github.com/greenfrog82/DailyCoding/tree/master/etc/find_numbers_of_sum_equals_with_param)
