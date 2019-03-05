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

* Binary Search O(logn)
* Quick Sort O(nlogn)

## 운영체제

* IPC 방식에 대해서 아는대로 설명하시오. 
* Process와 Thread의 차이점에 대해서 설명하시오.
    * Memory 공유 부분
* Thread
    * Race Condition이 무엇인가?
    * Critical Section이 무엇인가?
        * 배타적 접근(한번에 하나의 쓰레드만 접근)이 요구되는 공유 리소스 
        * 메모리 구조를 4단계(코드, 데이터, 힙, 스택)으로 나뉘다고 할 때, 어떤 영역이 공유 리소스가 되는가? (데이터와 힙)
        * 크리티컬 섹션에 대한 lock을 수행하지 않았을 경우, 발생하는 문제를 설명해보시오. 
    * Live Lock과 Dead Lock이 무엇인가?
    * 스케쥴러에 대해서
        * Round Robin
            * 우선순위 스케쥴링 알고리즘에 동일한 우선순위를 갖은 프로세스에 대해서 Time-Slice를 적용한것.
            * 라운드 로빈 방식에서 스케쥴러가 동작하는 경우는 언제인가?
                * 타임 슬라이스 마다
                * 프로세스의 생성과 소멸
                * 프로세스가 I/O 작업 중이거나 블록(sleep)되어 있을 때
        

## 웹 기초 

* [URL Encoding에 대해서 설명하시오.](./web/url_encoding.md)

## 보안

* CSRF에 대해서 설명하시오. 
* CORS에 대해서 설명하시오. 

## Design

* 모바일, 테블릿, 데스크탑 앱을 운영하는 백엔드 서비스 개발 시
    * 서비스 개발을 어떤 기준으로 할 것인가?
        * 모바일, 테블릿, 데스크탑 마다 보여주는 정보의 양, 그리고 트래픽등을 고려해서 시스템을 설계할 수 있는지 확인
* API 서비스 개발 중 CPU Intensive한 작업을 요하는 경우가 있다.
    * 이러한 경우 어떤 문제가 발생할 수 있는가?
        * API 서비스가 처리할 수 있는 요청의 수가 떨어질 것임.
        * CPU 연산이 많아짐에 따라 응답속도가 느려질 수 있음.
    * 이 문제를 어떻게 해결 할 것인가?
        * Celery와 같은 형태의 Async 처리
        * Celery같은 것을 사용하는 경우 Job Queue에 ORM객체를 넣어서 처리하는것이 좋은가? 아니면 ID를 전달해서 처리하는것이 좋은가? 그 이유는?
* API 서비스 연동 시 time-out에 대해서 고려를 해야하는데, 이를 고려해야하는 이유가 무엇인가?
    * 클라이언트 요청을 더 많이 소화하기 위한 내용이 고려된 대답 필요.
    * time-out을 고려했다면, 
        * DB를 다른 request가 최대한 활용하게 하려면 어떻게 해야할까? (close connection)
        * 클라이언트 요청은 여전히 못받고 있을텐데 이에 대한 대응방안이 있는가?
            * 응답을 반드시 받아야하는 경우는 특별한 방법이 없어보임.
            * 하지만 응답을 바로 받지 않는다면, Async로 처리가능. 

## Python

* mutable과 immutable sequence를 각각 나열하시오.
    * mutable sequence : list, bytearray, array.array, collections.deque, and memoryview
    * immutable sequence : tuple, str, and bytes
* dunder method가 무엇이며, 왜 필요한지에 대해서 설명하시오.
* context manager에 대해서 설명하시오.
    * 언제 사용하였는지?
    * 어떻게 구현되는지?
* iterator vs generator
    * yield에 대해서
* list가 있는데 tuple이 존재하는 이유? 
    * list는 mutable, tuple은 immutable
    * list는 homogeneous 아이템들을 저장하고, tuple은 heterogeneous 아이템들을 저장한다. 
    * list는 hashable하지 않기 때문에 dictionary나 set에서 사용될 수 없지만, tuple은 hashable하기 때문에 사용될 수 있다.
* @staticmethod와 @classmethod의 차이점에 대해서
* MRO(Method Resolution Order)에 대해서
* __str__(고객)과 __repr__(개발)의 차이점에 대해서
* ListComp의 scope 이슈 
    * 2.x
        ```python
        In [1]: x = 'test'

        In [2]: [x for x in range(10)]
        Out[2]: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

        In [3]: x
        Out[3]: 9
        ```
    * 3.x 
       ```python
       In [1]: x = 'test'

       In [2]: [x for x in range(10)]
       Out[2]: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

       In [3]: x
       Out[3]: 'test'
       ```
* 함수의 디폴트 인자에 함수를 전달하는 경우 문제점
   ```python
    >>> def perform(num, arr=[1,2,3]):
    ...     arr.append(num)
    ...     return arr

    >>> perform(10)
    [1, 2, 3, 10]


    >>> perform(12)
    [1, 2, 3, 10, 12]
    ```

## Django

### General

* Web Server에서부터 Django로 request가 들어와서 response가 나가는 과정을 설명하시오.

### TDD

* TestCase와 TransactionTestCase의 차이점을 설명하시오.
* TDD개발 방식에 대해서 설명하시오.

### ORM

* [ORM으로 데이터가 존재하는지 확인하는 방법을 설명하시오.](../TIL_Python/Django/how_to_django/queryset_cache.md)
    * 데이터의 존재여부만 확인하는 경우.
    * 데이터의 존재여부를 확인한 후 해당 쿼리 결과를 사용하는 경우.
* 다음의 relation field의 경우 Table schema가 어떻게 만들어지는 설명하시오.
    * ForeignKey
    * OneToOne
    * ManyToMany
* select_for_update()
* ForeignKey.on_delete은 무엇을 하기위해 사용되는지 설명하시오.
* N+1 Query Problem이 무엇인지 설명하시오.
    * 해결 방법은?
    * select_related vs prefetch_related에 대해서 설명하시오.
* class Meta에 대해서 설명하시오.
    * abstract = True의 의미가 무엇인가?
    * abstract = True를 한 모델을 상속하는 것과 일반 모델을 상속하는 것의 차이가 무엇인가?

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
* Closure 에 대해서 설명하시오.
    * Curry에 대해서 설명하시오.
    * Memoization에 대해서 설명하시오.
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
* Transaction Isolation Level에 대해서 설명하시오.
    * 표준 SQL에 있는 Isolation Level을 설명하시오.
    * read committed와 repeatable read는 각각 언제 사용할 수 있는지 설명하시오.

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

## Git 

* 소스코드가 이미 origin에 올라가있는 상태에서 rebase를 하면 안되는 이유에 대해서?

## OOP

* 다형성에 대해서 설명하시오. 
* [SOLID 원칙에 대해서 설명하시오.](http://www.nextree.co.kr/p6960/) 
* Extens와 Composite 중에 객체간 결합도를 낮출 수 있는 방법이 무엇이며 왜 그런지 설명하시오.
* Design Pattern
    * Template Method Pattern
    * Decorator Pattern
    * State Pattern
* Singleton에 대해서 설명하시오.
    * https://jeong-pro.tistory.com/86
    * [Double Checked Locking](https://en.wikipedia.org/wiki/Double-checked_locking)에 대해서 설명하시오.

## Windows 개발자

* [C/C++의 Pointer와 Reference의 차이점.](https://github.com/greenfrog82/study/tree/master/cpp/pointer_and_reference)
* Windows에서 Process와 Thread의 차이점에 대해서 설명하시오. 
* UI Thread와 Worker Thread의 차이점. 
    * Worker Thread에서 데이터를 처리한 후 화면을 어떻게 갱신할 수 있는지?
* Message Loop에 대해서 설명하시오. 

## Coding Test

* [배열에서 중복된 원소 찾기](https://github.com/greenfrog82/DailyCoding/tree/master/etc/find_a_duplicated_value)
* [덧셈의 합에 대응하는 중복되지 않는 배열 원소 구하기](https://github.com/greenfrog82/DailyCoding/tree/master/etc/find_numbers_of_sum_equals_with_param)
* [What's up next](https://www.codewars.com/kata/whats-up-next/train/python)


# Reference

* [이직일기](http://raccoonyy.github.io/diary-of-changing-job/)
* https://code.i-harness.com/ko-kr/q/213a1
