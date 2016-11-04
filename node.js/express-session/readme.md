[express-session](https://github.com/expressjs/session)의 내용을 번역하여 정리한다.

# express-session

# 설치
```
$ npm install express-session
```
# API
```javascript
var session = require('express-session')
```

## session(options)
특정 옵션을 통해서 세션 미들웨어를 생성하라.

**노트** 세션 데이터는 쿠키에 저장되지 않고, 쿠키에는 단지 세션 ID만이 저장된다. 세션 데이터는 서버단에 저장된다.

**노트** 1.5.0버전부터, 이 모듈이 동작하기 위해서 [`cookie-parser` middleware](https://www.npmjs.com/package/cookie-parser)는 더이상 사용되지 않는다. 이제, 이 모듈은 `req/res`에서 직접 쿠키를 읽고 쓴다. 만약, 이 모듈과 `cookie-parser`의 `secret`옵션 값이 서로 다른 경우 `cookie-parser`를 사용하는 것은 문제를 일으킬 수 있다.

**주의** 기본 서버단 세션 저장소는 `MemoryStore`이다. 이것은 의도적으로 제품을 위해서 설계되지 않았다. 대부분의 환경에서 메모리 릭을 발생 시킬것이고, 하나의 프로세스를 넘어 확장되지 않는다. 결국, 디버깅과 개발 환경을 위해서 설계되었다는 말이다.

세션 저장소 목록에 대해서는 ['호환되는 세션 저장소'](https://github.com/expressjs/session#compatible-session-stores)을 환인해라.

## Options

`express-session`은 options 오브젝트에서 다음 프로퍼티들을 사용한다.

#### cookie

세션 ID 쿠키를 위한 설정 오브젝트이다. 기본값은 `{ path: '/', httpOnly: true, secure: false, maxAge: null}`이다. 다음은 이 오브젝트에 설정 될 수 있는 옵션들이다.

#### cookie.domain

`Domain` `Set-Cookie` 속성의 값을 명시한다. 기본값으로는 도메인은 설정되지 않는다. 대부분의 클라이언트들은 오직 현재 도메인에 적용하기 위한 쿠키를 고려할 것이다.

#### cookie.expires

`Expires` `Set-Cookie` 속성의 값이 될 `Date` 오브젝트를 명시한다. 기본값으로는 만료시간이 설정되지 않는다. 대부분의 클라이언트는 "지속되지 않는 쿠키"를 고려할 것이고 웹 브라우저를 닫을 때 쿠키를 삭제할 것이다.

**노트** 만약 `expires`와 `maxAge`를 모두 설정한다면, 그때는 마지막으로 설정 된 옵션이 사용된다.

**노트** `expires`옵션은 직접적으로 설정되지 않아야한다. 대신, 오직 `maxAge`옵션을 사용해야한다.

#### cookie.httpOnly

`HttpOnly` `Set-Cookie` 속성에 대한 `boolean`값을 명시한다. 이 속성이 true로 설정되면 `HttpOnly`속성이 적용되고 false로 설정되면 해제된다.

**노트** 클라이언트가 웹 표준을 잘 지키고 있다면, 클라이언트 단에서 자바스크립트의 `document.cookie`를 통해 쿠키의 내용에 접근 할 수 없기때문에 이 속성을 설정하는것에는 주의가 필요하다.

#### cookie.maxAge

`Expires` `Set-Cookie`속성을 계산할 때 사용하기 위한 `number`(밀리세컨드 단위)를 명시한다. `Expires` `Set-Cookie`속성은 현재 서버의 시간에 `Expires` datetime을 계산하기 위한 `maxAge` 밀리세컨드를 더한 값을 더하여 설정된다. 기본적으로 최대 기간은 설정되지 않는다.

**노트** 만약 `expires`와 `maxAge`를 모두 설정한다면, 그때는 마지막으로 설정 된 옵션이 사용된다.

#### cookie.sameSite

`SameSite` `Set-Cookie`속성을 지정하기 위한 `boolean` 또는 `string`값을 명시한다.

* 엄격한 same site 집행을 위해서 `true`는 `SameSite`속성을 `Strict`로 설정한다.
* `false`는 `SameSite`속성을 설정하지 않는다.
* 느슨한 same site 집행을 위해서 `lax`는 `SameSite`속성을 `Lax`로 설정한다.
* 엄격한 same site 집행을 위해서 `strict`는 `SameSite`속성을 `Strict`로 설정한다.


### resave

비록 요청이 처리되는 동안 세션이 수정되지 않더라도 세션 저장소에 다시 저장되도록 강제한다.
여러분이 사용하는 세션 저장소(session store)에 따라 이 옵션은 필요할 수도 있다. <br />
그러나, 클라이언트에서 두 개의 병렬 요청(prallel requests)을 여러분의 서버로 보내면, 아마 하나의 요청에서 수정한 세션의 내용을 다른 요청이 세션의 내용을 수정하지 않더라도 다른 요청이 끝날 때 덮어써버리는 경합(race conditions)을 만들어낼 수 도 있다. - 이러한 동작 역시 여러분이 사용 중인 세션 저장소에 의존한다. -

이 옵션의 기본값은 `true`이지만 이 기본값은 다음 버전에서는 없어질 것이다. 이 옵션을 설정하는 것에 대해서 연구하고 여러분의 사용환경(use-case)에서 적절한 설정을 선택하길 바란다. 일반적으로 여러분은 `false`로 셋팅하길 원할 것이다.

그러면 여러분의 세션 저장소에서 이 옵션이 필요한지 어떻게 알 수 있을까? 가장 좋은 방법은 여러분이 사용하고 있는 세션 저장소가 `touch`를 구현하고 있는지 확인해보는 것이다. 만약 이를 구현하고 있으면 여러분은 `resave:false`로 설정해도 좋다. 만약 `touch`를 구현하고 있지 않다면 여러분의 세션 저장소는 저장된 세션에 대해서 만료 날짜를 설정해 둘것이다. 이때 여러분은 `resave:true`로 설정해야 할 것으로 생각된다.


> **주석**

> 위 내용을 번역하면서 일단, 내가 사용하고 있는 [connect-redis](https://github.com/tj/connect-redis)에서 touch를 구현하고 있는지 확인해보았다.

>[connect-redis의 History.md](https://github.com/tj/connect-redis/blob/master/History.md)를 확인해보니 [2.3.0/2015-04-28](https://github.com/tj/connect-redis/blob/master/History.md#230--2015-04-28)버전에서 touch에 대한 구현이 된것을 확인 할 수 있다. 이 부분에 대한 패치에 대한 논의는 [#142](https://github.com/tj/connect-redis/issues/142)를 참고하자.

### rolling

모든 응답(response)에 대해서 세션 식별자 쿠키를 설정하도록 강제한다. 세션 만료시간은 원래 설정되어 있던 `maxAge` 속성 값으로 초기화 되고, 세션 만료 카운트 다운(countdown)도 초기화 된다.

이 옵션의 기본값은 `false`이다.

**주의** 이 옵선을 `true`로 설정하고 `saveUninitialized` 옵션을 `false`로 설정했을 때, 초기화 되지 않은 세션을 포함한 응답에 대해서 쿠키는 설정되지 않을 것이다.

### saveUninitialized

초기화 되지 않은 세션이 세션 저장소에 저장되도록 강제한다. 세션은 새로 생성된 후 수정되지 않으면 초기화 되지 않는다. <br/>
이 옵션에 `false`를 설정하는것은 세션 저장소의 사용률을 절약하거나, 쿠키를 설정하기 전에 권한에 대한 정책을 준수하는 등, 로그인 세션을 구현할 때 유용하다. 또한, 클라이언트에서 세션이 포함되지 않은 요청을 여러개의 병렬 요청을 인한 경합(race conditions)에 대해서 도움이 될 것이다.

이 옵션의 기본값은 `true`이지만 이 기본값은 다음 버전에서는 없어질 것이다. 이 옵션을 설정하는 것에 대해서 연구하고 여러분의 사용환경(use-case)에서 적절한 설정을 선택하길 바란다.

**주의** 만약 여러분이 PassportJS와 함께 세션을 사용중이라면, Passport는 사용자가 인증 된 후 사용하기 위해 세션에 빈 Passport 객체를 추가할 것이다. 이러한 로직은 세션이 변경된 것으로 여겨질 것이고 이 옵션을 false로 설정했다 하더라도 세션 저장소에 세션이 저장될 것이다. _이 문제는 PassportJS 0.3.0에서 수정되었다._

>**주석**

>**초기화 되지 않은 세션이란?**

> 앞서 본문에서도 서술되어 있지만, 세션이 생성 된 후 수정이 되지 않으면 초기화 되지 않은 세션이라고 한다. <br />
> 이 내용을 좀 더 풀어보면, saveUninitialized옵션을 `false`로 설정하고 HTTP 클라이언트가 서버에 서비스 요청을 보내고, 해당 서비스가 처리되는 과정에서 세션을 수정하지 않는다면(초기화 되지 않은 세션을 사용한다면) 서비스를 요청 할 때 마다 해당 HTTP 클라이언트의 세션 ID가 변하는 것을 확인 할 수 있다. 하지만 서버로 요청한 서비스가 HTTP 클라이언트의 세션을 수정한다면 세션은 초기화 되고 세션 저장소에 저장되게 된다. 따라서 maxAge에 설정한 시간이 지나지 않는 이상 해당 세션은 유지되고, 요청 된 서비스에서 세션을 수정한다면 세션 만료시간은 세션이 수정 된 시간으로부터 maxAge까지로 초기화 된다.

> 위에 설명한 내용을 이해한다면 자연스럽게 본문의 **주의**에 대한 내용도 이해가 될 것이다. Passport가 세션에 빈 Passport 객체를 추가하므로 세션이 초기화 되고 saveUninitialized옵션이 false로 설정되었더라도 로그인 한 사용자의 세션이 세션 저장소에 저장되는 것이다.

다음과 같이 옵션을 설정했을 때 몇 가지 테스트

```javascript
var sessionOpt = {
  secret: '@#!@)($)*@#$)(#@$)(!@$*)',
  cookie: {
    httpOnly: true,
    maxAge: 60000,
 },
  resave: false,
  saveUninitialized: true
};
```
>**saveUninitialized옵션을 `true`로 설정하면 초기화 되지 않은 세션은 세션 저장소에 저장되는가? (resave=false)**

>* express-session의 내장 저장소(메모리)를 이용하는 경우
>
  초기화 되지 않은 세션이 세션 저장소에 저장되며, 세션의 데이터를 수정하지 않더라도 클라이언트의 요청이 들어오면 세션의 만료시간이 자동으로 연장된다.(**_이에 관한 내용은 resave에 의존하는 것으로 알고있는데 resave 옵션은 false로 되어 있다. 이유가 무엇인가?_**) </br>
  따라서, 세션이 잘 유지된다.

>* Redis 저장소를 이용하는 경우
>
  초기화 되지 않은 세션이 세션 저장소에 저장된다. 하지만, 클라이언트의 요청이 있을때 마다 세션 ID가 계속 변경되는것으로 보아 세션이 유지되지 않고, 매 접속마다 새로운 세션을 생성하고 저장소에 저장된다. 이는 세션을 수정해주어도 마찬가지로 다음 요청 시 새로운 세션이 맺어지므로 세션이 유지되지 않는다 ..


```javascript
var sessionOpt = {
  secret: '@#!@)($)*@#$)(#@$)(!@$*)',
  cookie: {
    httpOnly: true,
    maxAge: 60000,
 },
  resave: false,
  saveUninitialized: false
};
```

>**saveUninitialized옵션을 `false`로 설정하면 초기화 되지 않은 세션은 세션 저장소에 저장되지 않는가? (resave=false)**

>* express-session의 내장 저장소(메모리)를 이용하는 경우
>
  해당 옵션이 `false`로 설정되면 초기화 되지 않은 세션은 세션 저장소에 저장되지 않는다. 따라서 사용자가 요청을 할 때 마다 세션이 새로 생성된다. 이때, 세션을 수정하는 요청을 보내 세션을 수정하면 세션 저장소에 세션이 저장되고 유지되는 것을 확인 할 수 있다.

>* Redis 저장소를 이용하는 경우
>
  초기화 되지 않은 세션은 세션 저장소에 저장되지 않는다. 따라서 사용자의 요청이 있을 때 마다 세션이 새로 생성된다. 하지만 세션을 수정하는 요청을 보내 세션을 수정하면 세션 저장소에는 세션이 저장되지만 다음 요청 때 새로운 세션 ID가 발급된다.

>**이슈!! express-session의 내장 저장소를 이용하면 express-session의 문서에 나온데로 동작을 하지만, Redis 저장소를 붙이면 세션이 유지되지 않는다.**

> Session으로 옵션으로 들어가는 cookie의 secure=true으로 설정하면 위와 같은 문제가 발생한다.  이 부분을 모두 제거하면 정상적으로 처리된다.


>**PassportJS와 함께 사용하면 어떻게 동작하는가?**

>* express-session의 내장 저장소(메모리)를 이용하는 경우
>
  saveUninitialized옵션을 `false`로 설정 한 후 PassportJS를 통해 인증을 받으면 세션에 passport

>* Redis 저장소를 이용하는 경우
>






>

_작성 중 ... _

> TODO
* touch가 무엇인지?
* rolling
  * 세션만료 카운트 다운
  * 세션 식별자 쿠키
  * 주의 내용되로라면 초기화 되지 않은 세션을 포함한 응답에대한 세션은 사라질 것이므로 클라이언트가 접속하면 session-id가 변해있을 것이다 확인하자.
* saveUninitialized
  *클라이언트에서 세션이 포함되지 않은 요청이 가능한지 ..

# Reference

* [Set-Cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie)
* [Cross-site request forgery](https://en.wikipedia.org/wiki/Cross-site_request_forgery)
* [Cross-site scripting](https://en.wikipedia.org/wiki/Cross-site_request_forgery)
