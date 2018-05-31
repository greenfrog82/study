# Self-Contained Token

Self-Contained Token은 서버에서 발급되어 클라이언트에서 관리되는 형태의 Token으로 하나의 개념이다.   
여기에는 사용자 이름, 이메일 주소, 권한등과 같은 정보들이 서버로부터 암호화 되어 클라이언트로 전달된다.   

앞서 이야기한것과 같이 Self-Contained Token은 하나의 개념이므로 이를 구현한 구현체를 두고 이야기하는것이 좋을 것이다. 
본 문서에서는 Self-Contained Token을 소개하기 위해 이 개념의 구현체 중 가장 유명한 JWT를 사용하기로한다.  

## What is the JWT?

JWT는 JSON Web Token의 약자로 크라이언트와 서버간의 데이터 셋을 안전한 방법으로 표현하기 위한 [RFC 7519](https://tools.ietf.org/html/rfc7519)에 정의 되어 있는 JSON Object이다. 이 토큰은 Header, payload 그리고 signiture로 구성되어 있다. 


Restful Architecture에서 가장 핵심적인 부분은 Statelessness이다.  
이를 위해서는 클라이언트의 상태를 Redis와 같은 Cache 서버를 Back-End단에 두어 관리해서는 안된다. 

예를들어, Session 방식과 Self-Contained Token 방식의 인증 절차를 비교해보자. 

## Session 

### Structure

1. API Gateway
2. Auth API Server with Redis
3. Resource API Server

### Process

1. 클라이언트의 ID/PW를 API Gateway로 요청.
2. API Gateway에서는 Auth API Server로 해당 ID/PW 요청.
3. Auth API Server는 인증 후 사용자 정보를 Redis에 캐쉬하고 Session Key를 클라이언트에 응답. 
4. 클라이언트가 API 요청 with Session Key.
5. Resource API서버는 해당 요청이 Auth 되었는지 Auth API 서버에 확인 요청 with Session Key.
6. Auth API 서버에서는 해당 Session Key에 맵핑 되는 클라이언트 정보가 있는지 Redis 확인 후 이에 대해서 Resource API 서버로 응답.
7. Auth API 서버에서 로그인 된 사용자로 확인 된 경우 API 호출에 대한 응답을 주고 그렇지 않은 경우 인증이 안되었다는 내용 응답.  

## Self-Contained Token

### Structure

1. API Gateway
2. Auth API Server with JWT
3. Resource API Server

### Process

1. 클라이언트의 ID/PW를 API Gateway로 요청.
2. API Gateway에서는 Auth API Server로 해당 ID/PW 요청.
3. Auth API Server는 인증 후 사용자의 인증 정보를 JWT에 담아서 클라이언트로 응답. 
4. 클라이언트가 API 요청 with JWT.
5. Resource API서버는 JWT를 통해 인증 여부 확인 인증 되어 잇으면 API 호출에 대한 응답을 주고 그렇지 않은 경우 인증이 안되었다는 내용 응답. 

## Difference between session and self-contained token

앞서 설명 된 내용을 보면 **Session**을 사용하는 경우 Auth API Server 이외에 인증 클라이언트의 인증 정보를 보관하기 위해 Redis를 사용하고 있다.  
하지만, **Self-Contained Token**의 경우 클라이언트의 인증 정보를 보관하기 위한 별도의 물리적 서버를 갖지 않고 Token에 인증 정보를 저장하고 있다.  
이는 일반적인 클라이언트 정보를 관리하는 고전적인 방법과도 차이를 주는데, **Session**을 사용하는 고전적인 방법은 인증 정보 이외에도 클라이언트의 정보를 Redis에 기록한다. 이렇게 되면 수많은 클라이언트의 요청을 처리해야하는 경우 서버의 물리적 용량 문제도 있고 Redis의 운영이 강건하게 되도록 하기 위해 Sentinal 설정과 같은 부가적인 설정과 운영이 필수적이다.  

하지만, **Self-Contained Token**의 경우 클라이언트의 정보를 모두 Token에 담아 클라이언트로 전달하고 이를 사용하기 때문에 클라이언트의 정보를 관리하기 위한 별도의 서버가 필요치 않다.  
이 대목이 **Restful Architecure**의 **Steatelessness** 원칙이 존재하는 이유이다.  
결국 클라이언트의 상태를 관리하는 별도 서버의 존재가 없어짐으로서 좀 더 유연하게 scale-out이 가능해지는데 이유는 다음과 같다.  

예를들어, **Session**방식으로 클라이언트와 서버를 구성하게 되면 요청을 모두 처리할 수 없어 서버를 증서해야할 때 클라이언트 정보를 저장하고 있는 서버와의 의존관계가 생기게 된다. 따라서 해당 서버가 설치 될 때 클라이언트 정보를 저장해야하는 서버와의 의존관계가 항상 고려되어야하고 클라이언트 정보를 관리하는 서버의 증설 및 관리에 대한 고민이 함께 수반되어야한다.  

하지만, **Self-Contained Token**을 사용하는 경우라면? 서버만 하나 새롭게 올려주면 된다. 


## Conclusion




## Reference

* [JWT](https://jwt.io)
* [What Is HMAC And How Does It Secure File Transfers?](https://www.jscape.com/blog/what-is-hmac-and-how-does-it-secure-file-transfers)
* []If a JWT token is self contained with all the user information, why do we need a token store in an authorization server?](https://www.quora.com/If-a-JWT-token-is-self-contained-with-all-the-user-information-why-do-we-need-a-token-store-in-an-authorization-server)
* [Steps to building authentication and authorization for RESTful APIs](https://www.moesif.com/blog/technical/restful-apis/Authorization-on-RESTful-APIs/)
* [5 Easy Steps to understanding JSON Web Tokens(JWT)](https://medium.com/vandium-software/5-easy-steps-to-understanding-json-web-tokens-jwt-1164c0adfcec)
* [JSON Web Token Tutorial with Example in Python](https://blog.apcelent.com/json-web-token-tutorial-with-example-in-python.html)