# Options

[express-session](https://github.com/expressjs/session)의 [Options](https://github.com/expressjs/session#options) 내용을 번역하여 정리한다.

### resave

여러분이 사용하는 세션 저장소(session store)에 따라 이 옵션은 필요할 수도 있다. <br />
그러나, 클라이언트에서 두 개의 병렬 요청(prallel requests)을 여러분의 서버로 보내고 하나의 요청에서 수정한 세션의 내용은 다른 요청이 세션의 내용을 수정하지 않더라도 다른 요청이 끝날 때 아마도 덮어써지는 경합(race conditions)을 만들어낼 수 도 있다. - 이러한 동작 역시 여러분이 사용 중인 세션 저장소에 의존한다. -

이 옵션의 기본값은 `true`이지만 이 기본값은 다음 버전에서는 없어질 것이다. 이 옵션을 설정하는 것에 대해서 연구하고 여러분의 사용환경(use-case)에서 적절한 설정을 선택하길 바란다. 일반적으로 여러분은 `false`로 셋팅하길 원할 것이다.

그러면 여러분의 세션 저장소에서 이 옵션이 필요한지 어떻게 알 수 있을까? 가장 좋은 방법은 여러분이 사용하고 있는 세션 저장소가 `touch`를 구현하고 있는지 확인해보는 것이다. 만약 이를 구현하고 있으면 여러분은 `resave:false`로 설정해도 좋다. 만약 `touch`를 구현하고 있지 않다면 여러분의 세션 저장소는 저장된 세션에 대해서 만료 날짜를 설정해 둘것이다. 이때 여러분은 `resave:true`로 설정해야 할 것으로 생각된다.


> **주석**

> 위 내용을 번역하면서 일단, 내가 사용한고 있는 [connect-redis](https://github.com/tj/connect-redis)에서 touch를 구현하고 있는지 확인해보았다.

>[connect-redis의 History.md](https://github.com/tj/connect-redis/blob/master/History.md)를 확인해보니 [2.3.0/2015-04-28](https://github.com/tj/connect-redis/blob/master/History.md#230--2015-04-28)버전에서 touch에 대한 구현이 된것을 확인 할 수 있다. 이 부분에 대한 패치에 대한 논의는 [#142](https://github.com/tj/connect-redis/issues/142)를 참고하자.



_작성 중 ... _
