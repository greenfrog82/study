# Self-Contained Token

Self-Contained Token은 서버에서 발급되어 클라이언트에서 관리되는 형태의 Token으로 하나의 개념이다.   
여기에는 사용자 이름, 이메일 주소, 권한등과 같은 정보들이 서버로부터 암호화 되어 클라이언트로 전달된다.   

앞서 이야기한것과 같이 Self-Contained Token은 하나의 개념이므로 이를 구현한 구현체를 두고 이야기하는것이 좋을 것이다. 
본 문서에서는 Self-Contained Token을 소개하기 위해 이 개념의 구현체 중 가장 유명한 JWT를 사용하기로한다.  

## What is the JWT?

JWT는 JSON Web Token의 약자로 크라이언트와 서버간의 데이터 셋을 안전한 방법으로 표현하기 위한 [RFC 7519](https://tools.ietf.org/html/rfc7519)에 정의 되어 있는 JSON Object이다. 이 토큰은 Header, payload 그리고 signiture로 구성되어 있다. 

> header.payload.signature

### Header

JWT의 Header에는 JWT가 담고 있는 정보를 어떤 방식으로 서명(또는 암호화)하고 있는지에 대한 정보가 담겨있다.  
Header는 JSON object로 다음과 같은 형식으로 되어있다. 

```javascript
{
    "typ": "JWT",
    "alg": "HS256"
}
```

* **typ** : 해당 토큰의 타입으로 JWT라는 것을 명시한다. 
* **alg** : JWT를 서명할 때 사용하기 위한 알고리즘이 명시되어있다. JWT을 validation할 때, secret key와 여기에 명시된 알고리즘을 이용한다. 

Header는 **Base64Url**로 인코드 된다. 


### Payload

JWT가 담고 있는 정보로 Standard field(claims)과 Custom field(claims)구성된다.   
각각 field는 JWT가 담고 있는 정보의 속성이다. 

```javascript
{
    "userId": "greenfrog82",
    "exp": 1300819380
}
```

* Standard Field(Claims) : JWT의 표준 속성으로 [RFC 7510 - Section-4.1](https://tools.ietf.org/html/rfc7519#section-4.1)에 열거되어 있다. 
* Custom Field(Claims) : 사용자가 JWT에 임의로 작성한 속성이다. 앞선 Payload에 대한 정의에서 'userId'가 이에 해당한다. 

Payload **Base64Url**로 인코딩으로 인코드 된다. 


### Signature

Header와 Payload 그리고 Secret Key를 통해 서명되는 부분이다. 이때 서명을 위한 알고리즘 Header.alg에 명시되어 있는것이 사용된다. 
다음은 HMAC SHA256 algorithm으로 서명이되는 pseudo code이다. 

```python
HMACSHA256(
    base64UrlEncode(header) + "." +
    base64UrlEncode(payload),
    secret)
```

서명은 JWT의 데이터가 위변조 되었는지를 확인하기 위해서 사용된다. 

### To create JWT

앞서 설명한 3가지의 콤포넌트들(Header, Payload, Signature)를 header.playlod.signature 구조로 결합하면 JWT가 된다. 

```
// JWT Token
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJiMDhmODZhZi0zNWRhLTQ4ZjItOGZhYi1jZWYzOTA0NjYwYmQifQ.-xN_h82PHVTCMA9vdoHrcZxH-x5mb11y1537t3rGzcM
```

[클릭](https://jwt.io/)

## How does JWT protect out data?

앞서 살펴본 바와 같이 JWT를 생성할 때, Header나 Payload의 데이터를 기본적으로 암호화를 하지 않는다. 이 부분을 이해하는 것이 아주 중요한데, JWT는 기본적으로 해당 데이터가 인증 된 소스로부터 전달 되었는지를 확인하기 위한 용도이기 때문에 암호화를 하지 않는다.  
따라서, JWT에는 **보안에 민감한 정보는 담지 말아야한다.**

일반적으로, Header와 Payload를 암호화할 수 있지만 JWT에 담길만한 데이터를 생각해보면 다음과 같고, 이러한 데이터들은 보안에 민감하지 않기 때문에 크게 문제가 될 것 같지 않다. 

* user id
* authorization info
* expired date

## To verify the JWT

앞서 서버로부터 생성 된 JWT는 HS256 알고리즘을 사용하여 서명되었고, 이 서명을 생성하고 검증할 수 있는 secret key는 Authentication과 API Server만이 가지고 있다.  
secret key의 경우 API 서버가 셋업 될 때 Authentication Server로 부터 받아서 설정해두어야한다.  

API Server는 secret key를 가지고 있기 때문에 클라이언트로부터 전달 된 JWT를 포함한 request가 인증이 되었는지 안되었는지 알 수 있고 이를 통해 API 호출의 허용여부를 결정한다.  

## Why sould we use JWT in your applicaiton?

JWT에 대해서 알아보았으니 이번에는 이것을 왜 사용해야하는지 알아보자.  
결국 JWT의 사용 이유를 알게되는 것은 Restful Architecture의 Statelessness 가이드 라인을 이해하는 것이된다.  

예를들어, Session 방식과 Self-Contained Token 방식의 인증 절차를 비교해보자. 

## Session 

![auth_with_session.png](./auth_with_session.png)

### Structure

1. Auth Server with Session store(Redis)
2. API Server

### Process

1. 클라이언트의 Auth Server로 인증 요청. 
2. Auth Server는 인증 후 사용자 정보를 Session Store에 캐쉬하고 Session Key를 클라이언트에 응답. 
3. 클라이언트가 API Server에 API 호출 요청 with Session Key.
4. API Server는 해당 요청이 Auth 되었는지 Auth Server에 확인 요청 with Session Key.
5. Auth API 서버에서는 해당 Session Key에 맵핑 되는 클라이언트 정보가 있는지 Session Store 확인 후 이에 대해서 Resource API 서버로 응답.
6. Auth API 서버에서 로그인 된 사용자로 확인 된 경우 API 호출에 대한 응답을 주고 그렇지 않은 경우 인증이 안되었다는 내용 응답.  

## Self-Contained Token

![auth_with_jwt.png](./auth_with_jwt.png)

### Structure

1. Auth API Server with JWT
2. API Server

### Process

1. 클라이언트의 Auth Server로 인증 요청. 
2. Auth API Server는 인증 후 사용자의 인증 정보를 JWT에 담아서 클라이언트로 응답. 
3. 클라이언트가 API 요청 with JWT.
4. API 서버에서는 JWT를 통해 인증 여부 확인 인증 되어 잇으면 API 호출에 대한 응답을 주고 그렇지 않은 경우 인증이 안되었다는 내용 응답. 

## Difference between session and self-contained token

앞서 설명 된 내용을 보면 **Session**을 사용하는 경우 Auth API Server 이외에 인증 클라이언트의 인증 정보를 보관하기 위해 Session Store를 사용하고 있다.  
하지만, **Self-Contained Token**의 경우 클라이언트의 인증 정보를 보관하기 위한 별도의 물리적 서버를 갖지 않고 Token에 인증 정보를 저장하고 있다.  
이는 그 동안 일반적으로 사용되어 오던 클라이언트 정보를 관리하는 고전적인 방법과도 차이를 주는데, **Session**을 사용하는 고전적인 방법은 인증 정보 이외에도 클라이언트의 정보를 Session Store에 기록한다. 이렇게 되면 수많은 클라이언트의 요청을 처리해야하는 경우 서버의 물리적 용량 문제도 있고 Session Store의 운영이 강건하게 되도록 하기 위해 Sentinal 설정과 같은 부가적인 설정과 운영이 필수적이다.  

하지만, **Self-Contained Token**의 경우 클라이언트의 정보를 모두 Token에 담아 클라이언트로 전달하고 이를 사용하기 때문에 클라이언트의 정보를 관리하기 위한 별도의 서버가 필요치 않다.  
이 대목이 **Restful Architecure**의 **Steatelessness** 원칙이 존재하는 이유이다.  
결국 클라이언트의 상태를 관리하는 별도 서버의 존재가 없어짐으로서 좀 더 유연하게 scale-out이 가능해지는데 이유는 다음과 같다.  

예를들어, **Session**방식으로 클라이언트와 서버를 구성하게 되면 요청을 모두 처리할 수 없어 서버를 증설해야할 때 클라이언트 정보를 저장하고 있는 서버와의 의존관계가 생기게 된다. 따라서 해당 서버가 설치 될 때 클라이언트 정보를 저장해야하는 서버와의 의존관계가 항상 고려되어야하고 클라이언트 정보를 관리하는 서버의 증설 및 관리에 대한 고민이 함께 수반되어야한다.  

하지만, **Self-Contained Token**을 사용하는 경우라면? 서버만 하나 새롭게 올려주면 된다. 

## Conclusion

Restful Architecture를 구현하기 위해선 **Statelessness** 제약은 필수이고, JWT는 이를 쉽고 안전하게 구현할 수 있도록 도와준다.  
JWT에 대해서 잘 모를때는 사용자 정보를 Token에 담아 교환한다고 하니 막연히 보안상 위험해 보이기도 했지만 실제로는 그런 위험 역시 없어보인다.  
만약 여러분이 Restful Architecture를 통한 API 서버의 설계를 고려하고 있다면 선택이 아닌 필수가 아닐까 싶다. 

## Reference

* [Introduction to JSON Web Tokens](https://jwt.io/introduction/)
* [What Is HMAC And How Does It Secure File Transfers?](https://www.jscape.com/blog/what-is-hmac-and-how-does-it-secure-file-transfers)
* []If a JWT token is self contained with all the user information, why do we need a token store in an authorization server?](https://www.quora.com/If-a-JWT-token-is-self-contained-with-all-the-user-information-why-do-we-need-a-token-store-in-an-authorization-server)
* [Steps to building authentication and authorization for RESTful APIs](https://www.moesif.com/blog/technical/restful-apis/Authorization-on-RESTful-APIs/)
* [5 Easy Steps to understanding JSON Web Tokens(JWT)](https://medium.com/vandium-software/5-easy-steps-to-understanding-json-web-tokens-jwt-1164c0adfcec)
* [JSON Web Token Tutorial with Example in Python](https://blog.apcelent.com/json-web-token-tutorial-with-example-in-python.html)