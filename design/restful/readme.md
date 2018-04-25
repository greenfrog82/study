# Restful Architecture

## What is the RESTful Architecture?

REST는 **RE**presentational **S**tate **T**ransfer의 약자이다.  
이는 distributed hypermediay system을 위한 아키텍처인데, Roy Fielding이 2000년도에 자신의 [논문](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm)을 통해 처음으로 세상에 알려졌다.  

Roy Fielding이 자신의 논문을 통해 REST를 소개한 이유는 그 동안 네트워크 상에 존재하는 Resource(여기서 Resource는 static file, 데이터 베이스의 데이터 등을 포함한다.)에 접근하기 위해서 HTTP의 기능 일부만을 사용하거나, RPC, CORBA, SOAP, COM+ 등의 기술을 사용하고 있었는데 이러한 것이 Resource를 훌륭하게 다룰 수 있는 HTTP의 기능을 충분히 활용하고 있지 못하는 부분에 대해서 안타까움을 느꼈기 때문이다. 

앞서 배경 설명이 길었는데, REST를 간단히 정의하면 다음과 같다. 

>HTTP 프로토콜을 통해 네트워크 상의 Resource에 일관된 방법으로 접근할 수 있는 scaleable한 아키텍처

REST는 아킽텍처이기 때문에 이를 구현하기 위한 6가지의 가이드 라인을 가지고 있다.  
이러한 가이드 라인은 다섯가지 반드시 지켜야 하는 것과 한가지 선택적인 가이드로 구성되어 있다.  
이는 다음과 같다. 

1. Client-Server
2. Stateless
3. Cacheable
4. Uniform Interface
5. Layerd System
6. Code on Demand (Optional)



## Reference

* [Stateless Authentication with api rest](https://kaleidos.net/blog/295/stateless-authentication-with-api-rest/)
* [REST API 이해와 설계 - #1 개념 잡기](http://bcho.tistory.com/953)
* [REST API 이해와 설계 - #2 디자인 가이드](http://bcho.tistory.com/954)
* [REST API 이해와 설계 - #3 보안 가이드](http://bcho.tistory.com/955)
* [RESTful API 설계 - REST 이론에서 문서화까지](https://speakerdeck.com/leewin12/rest-api-seolgye)
* [16. RESTful이란?](http://blog.sonim1.com/105)
* [Statelessness](https://restfulapi.net/statelessness/)