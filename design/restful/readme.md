# Restful Architecture

## What is the RESTful Architecture?

REST는 **RE**presentational **S**tate **T**ransfer의 약자이다.  
이는 distributed hypermediay system을 위한 아키텍처인데, Roy Fielding이 2000년도에 자신의 [논문](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm)을 통해 처음으로 세상에 알려졌다.  

Roy Fielding이 자신의 논문을 통해 REST를 소개한 이유는 그 동안 네트워크 상에 존재하는 Resource(여기서 Resource는 static file, 데이터 베이스의 데이터 등을 포함한다.)에 접근하기 위해서 HTTP의 기능 일부만을 사용하거나, RPC, CORBA, SOAP, COM+ 등의 기술을 사용하고 있었는데 이러한 것이 Resource를 훌륭하게 다룰 수 있는 HTTP의 기능을 충분히 활용하고 있지 못하는 부분에 대해서 안타까움을 느꼈기 때문이다. 

앞서 배경 설명이 길었는데, REST를 간단히 정의하면 다음과 같다. 

>HTTP 프로토콜을 통해 네트워크 상의 Resource에 일관된 방법으로 접근할 수 있는 scaleable한 아키텍처인데 이때 중요한것은 다음에 소개할 구현 가이드라인 중 Optional 항목 이외의 나머지 다섯가지 가이드라인을 준수해야한다는 것이다. 

## Guiding Principles of REST

REST는 아키텍처이기 때문에 이를 구현하기 위한 6가지의 가이드 라인을 가지고 있다.  
이러한 가이드 라인은 다섯가지 반드시 지켜야 하는 것과 한가지 선택적인 가이드로 구성되어 있다.  
이는 다음과 같다. 

1. Client-Server
2. Stateless
3. Cacheable
4. Uniform Interface
5. Layerd System
6. Code on Demand (Optional)

### 1. Client-Server

REST 아키텍처는 기본적으로 서버, 클라이언트 구조를 가지는데 Client-Server 가이드 라인에서는 클라이언트와 서버가 갖는 책임에 대해서 이야기한다.  
REST가 세상에 알려지기 전 Web개발의 형태를 보면 서버는 API를 제공하고 클라이언트의 상태(로그인 정보, 세션 정보 등등)의 상태를 관리하여 클라이언트의 요청을 처리하고 DB에 저장하는 책임을 갖고 있었다. 
그리고 클라이언트의 경우 제공하는 API를 통해 필요한 정보를 CRUD하였다.  
하지만 이러한 경우 서버에서 클라이언트의 상태를 관리하기 위한 별도의 방법과 시스템 그리고 저장소를 고려해야하고 클라이언트 상태 정보에 기반하여 API를 작성했기 때문에 코드가 복잡해지고 이에 따른 관리가 복잡해지는 문제가 있었다. 1년 365일 장애없이 동작하고 있어야하는 서버의 역할을 고려하면 이것은 단순한 문제가 아니다. 

따라서, REST에서는 서버와 클라이언트의 책임을 다음과 같이 나누었다.  

* 서버 : API를 제공한다. 
* 클라이언트 : 로그인 정보, 세션 정보등의 클라이언트 의존적인 일체의 상태 정보를 직접 관리하고 서버의 API 사용하여 업무를 처리한다. 

### 2. Statelessness

REST는 **Statelessness** 가이드라인을 통해 **1. Client-Server**와 **3. Cacheable**이 가능하기 때문에 REST의 6가지 가이드라인 중 **가장 중요한 가이드라인** 이라고 할 수 있다. 

Stateless를 간단히 이야기하면 기존 서버에서 관리되어 오던 클라이언트의 상태정보에 대한 관리를 클라이언트가 책임지도록 하는것이다. 여기서 상태정보는 인증 및 인가 정보도 포함된다. 
따라서, 클라이언트는 자신의 상태를 직접 관리하면서 서버의 API를 호출할 때 필요한 상태정보를 함께 실어 요청을 보내야한다. 

#### what kind of things include into state at REST?

여기서 이야기하는 상태는 다음과 같다. 

* 클라이언트의 이전 요청과 현재 요청이 상호작용하기 위한 데이터
* 클라이언트의 인증/인가 정보
* 기타 클라이언트의 정보 일체

#### Advantages of Statelessness

**Statelessness** 가이드라인을 지키면 다음과 같은 이점이 있다. 

1. 서버는 클라이언트의 상태 정보에 의존하지 않기 때문에 쉽게 확장 될 수 있다. 
2. 서버에서 API를 개발할 클라이언트의 상태 정보를 관리하는 코드가 필요없으므로 코드가 덜 복잡해진다. 
3. 캐쉬를 좀 더 쉽도록 한다. 만약 클라이언트의 상태를 서버가 관리를 하고 있는 경우 특정 요청이 이전 요청에 의존관계가 있는지 없는지를 파악해서 캐쉬를 태워야하지만 상태정보를 클라이언트가 서버에 전달하는 구조인 경우는 이러한 상황을 고려하지 않고 캐쉬를 할 수 있다. 

#### How to implement statelessness

이렇게 클라이언트의 상태값을 클라이언트가 관리하게 하기 위해서는 Self-Contained Token을 사용해야하는데 가장 많이 사용되는 것이 JWT(Json Web Token)이다.  
이것의 사용과 구현 방법은 다음 시간에 .. 

### 3. Cacheable

REST는 HTTP 이라는 표준 프로토콜을 그대로 사용하기 때문에 HTTP를 이용하는 기존의 모든 인프라를 그대로 사용할 수 있다.
따라서, HTTP 프로토콜의 캐쉬 기능을 이용해서 캐쉬를 할 수 있다. 
이때 캐쉬 대상은 GET 또는 HEAD와 같은 safe method

캐쉬에 대한 워크 플로우는 다음과 같다.

```
GET /article/1234 HTTP/1.1
   - The resource is not cached yet
   - Send request to the API
   - Store response in cache and return

GET /article/1234 HTTP/1.1
   - The resource is cached
   - Return response from cache

PUT /article/1234 HTTP/1.1
   - Unsafe method, send to API

PURGE /article/1234 HTTP/1.1
   - API sends PURGE method to the cache
   - The resources is removed from the cache

GET /article/1234 HTTP/1.1
   - The resource is not cached yet
   - Send request to the API
   - Store response in cache and return
```

### 4. Uniform Interface

**Uniform Interface**는 직역하면 **일관된 인터페이스**이다. 
이는 API를 설계할 때 웹 표준을 통해 어떤 플랫폼, 언어나 기술에 종속 받지 않고 인터페이싱 할 수 있는 구조를 이야기 한다. 

이러한 구조를 만들 때 다음 4가지 설계 제약을 만족해야한다. 

1. Identification of resources
    서버의 자원에 접근하기 위해서 표준 URI를 사용해라.
2. Manipulation of resources through these representations
    서버의 자원에 접근하기 위해서 HTTP 표준을 사용해야하며, 각 접근에 대한 행위를 정의하기 위해서 HTTP method를 사용해라.
3. Self-descripive messages
    표준 MIME 타입 또는 표준 RDF vocabs를 통해서 메시지를 정의해라. 이를 통해 별도의 정보 없이 메시지만을 통해 API를 이해할 수 있도록 해라.
4. Hypermedia as the engin of applicaiton state(a.k.a. HATEOAS)
    하이퍼 링크와 URI 템플릿을 이용해서 서버의 URI 구조와 분리시켜라. 


예를들어, 우리는 일반적으로 REST API라고 하면 HTTP + JSON을 통해 서버와 클라이언트를 인터페이싱하는데, 앞서 설명한 내용을 모두 준수할 수 있다.  
마찬가지로, HTTP + YAML, HTTP + XML 등도 앞서 설명한 내용을 모두 준수한다. 


## Reference

* [Stateless Authentication with api rest](https://kaleidos.net/blog/295/stateless-authentication-with-api-rest/)
* [REST API 이해와 설계 - #1 개념 잡기](http://bcho.tistory.com/953)
* [REST API 이해와 설계 - #2 디자인 가이드](http://bcho.tistory.com/954)
* [REST API 이해와 설계 - #3 보안 가이드](http://bcho.tistory.com/955)
* [RESTful API 설계 - REST 이론에서 문서화까지](https://speakerdeck.com/leewin12/rest-api-seolgye)
* [16. RESTful이란?](http://blog.sonim1.com/105)
* [Statelessness](https://restfulapi.net/statelessness/)
* [Caching your REST API](http://restcookbook.com/Basics/caching/)
* [What are idempotent and/or safe methods?](http://restcookbook.com/HTTP%20Methods/idempotency/)
* [REST - What exactly is meant by Uniform Interface?](https://stackoverflow.com/questions/25172600/rest-what-exactly-is-meant-by-uniform-interface)