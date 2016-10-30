# Options

[express-session](https://github.com/expressjs/session)의 [Options](https://github.com/expressjs/session#options) 내용을 번역하여 정리한다.

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

_작성 중 ... _

> TODO
* touch가 무엇인지?
* rolling
  * 세션만료 카운트 다운
  * 세션 식별자 쿠키
  * 주의 내용되로라면 초기화 되지 않은 세션을 포함한 응답에대한 세션은 사라질 것이므로 클라이언트가 접속하면 session-id가 변해있을 것이다 확인하자.
* saveUninitialized
  * 초기화 되지 않은 세션에 대해서 ..
  * saveUninitialized를 false로 설정하면 redis에 초기화 되지 않은 세션이 정말 저장되지 않는지 확인
  * 클라이언트에서 세션이 포함되지 않은 요청이 가능한지 ..
