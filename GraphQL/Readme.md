# About GraphQL

**GraphQL**은 쿼리를 통해 데이터를 가져오기 위한 API 서비스 또는 런타임을 위한 쿼리 언어로서 다음과 같은 특징을 갖는다. 

* Ask for what you need, get exactly that
* Get many resources in a single request
* Describe what’s possible with a type system
* Move faster with powerful developer tools
* Evolve your API without versions

## GraphQL vs REST

### GET

**데이터를 가져오는 관점**에서 GraphQL은 FE와 BE 모두에 다음의 편의를 제공한다.  

* Ask for what you need, get exactly that
* Get many resources in a single request

FE는 GraphQL의 Query를 이해하고 있다면 가져와야하는 데이터의 모델들과 API End-Point만 알고 있다면 BE와 별도의 의사소통 없이 자신이 필요한 데이터만을 가져올 수 있다.
BE의 경우 역시 API End-Point를 하나 개발해둔다면 비즈니스 로직의 변경이 필요하지 않는 한 해당 API End-Point를 사용하는 클라이언트의 요구를 맞춰주기 위한 별도의 의사소통이나 작업이 필요하지 않다. 

하지만, 이러한 편의를 이용하기 위해서는 당연히 GraphQL을 알아야한다.  
FE의 경우 GraphQL을 통해 Query를 하는 방법에 대해서 공부를 하고 BE의 경우 GraphQL을 통해 API End-Point를 개발하는 방법을 알아야한다. 

아직 복잡한 로직을 코딩해보지 않았지만, BE를 통해 API End-Point를 작성하는 방법은 그렇게 어렵지 않았다. 
FE 역시 조금만 익숙해지면 자신이 원하는 데이터를 가져오는 것이 어렵지 않았다.  

그러면, REST를 통해서는 이러한 것들을 할 수 없을까? 하는 의문을 갖을 수 있다. 

예를들어, GraphQL이 내세우는 장점 중 하나인 **ask for what you need, get exactly that**의 경우 API End-Point를 개발할 때 클라이언트로 전달받은 필드 값을 통해 이에 맵핑되는 데이터만을 응답하도록 구현하면 얼마든지 이러한 처리를 할 수 있다. 
하지만, 이러한 방법은 이를 미리 고려해서 구현을 해주어야하며 표준이 없다. 특정 필드만을 요청하는 Query String의 Key를 fieds로 할 수도 있고, properties 또는 attributes 등으로도 할 수 있다. 또한 Where절을 처리하고 싶은 경우 역시 GraphQL은 이미 관련 기능을 제공하지만 REST는 우리가 이를 고려하여 구현을 해주어야한다.  

또한, GraphQL의 경우 하나의 API End-Point를 통해 Single 및 List 데이터를 모두 응답 받을 수 있지만 REST의 경우는 일반적으로는 API End-Poin분리해줘야하며 그렇지 않은 경우 역시 이를 고려한 구현이 필요하다. 


## Reference

* [GraphQL](https://graphql.org/)
* [Introduction to GraphQL](https://graphql.org/learn/)
* [The Fullstack Tutorial for GraphQL](https://www.howtographql.com/)
