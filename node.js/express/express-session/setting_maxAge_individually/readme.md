# express-session에서 각 사용자별 maxAge 설정하기

지난번 커밋했던 [nedb-session-store를 통해 저장 된 세션 정보 액세스하기]('./../../../nedb/access_nedb-session-store')에 다음과 같은 내용이 있었다.

```
Node.js를 통해 서버를 개발하면서 서버의 특정 자원을 소비하고 있는 클라이언트가 알 수 없는 오류로 인해 죽어버렸을 때, 이러한 클라이언트를 확인하기 위해서 세션을 사용하였다.

서버로부터 특정 자원을 획득해서 사용 중인 클라이언트는 정해진 시간마다 서버에 접근하여 세션 정보를 갱신하고 세션 만료 시간을 연장하도록 하였는데, 만약 알 수 없는 이유로 클라이언트가 세션 정보를 갱신하지 못하면 해당 클라이언트의 세션은 만료되고 이를 통해 문제의 클라이언트를 확인하였다.
```

이때, 서버에는 기본적으로 다음과 같이 세션의 만료시간을 계산할 때 사용하는 [maxAge](https://github.com/expressjs/session#cookiemaxage)라는 속성에 값이 설정되어있다.

```javascript
const DEFFAULT_MAXAGE = 60000;
const RESOURCE_MAXAGE = 30000;

app.use(session({
    secret: '@#!@)($)*@#$)(#@$)(!@$*)',
    cookie: {
      httpOnly: true,
      maxAge: DEFFAULT_MAXAGE,
      secure: false
    },
    // create new redis store.
    store: new redisStore({ host: 'localhost', port: 6379}),
    saveUninitialized: false,
    resave: false
}));
```

예를들어, 서버의 특정 자원을 소비하는 클라이언트의 경우 이미 설정되어 있는 [maxAge](https://github.com/expressjs/session#cookiemaxage)값과 다른값을 설정해줘야한다면 어떻게 해야할까?
특정 클라이언트가 서버의 자원을 획득했을 때, 다음과 같이 이를 구분할 수 있는  플래그를 셋팅해준다.

```javascript
app.get('/resource', (req, res) => {
  // 클라이언트에서 자원 획득
  req.session.isResource = true;
  res.end(`${req.originalUrl} - session : ${JSON.stringify(req.session)}`);
});

app.delete('/resource', (req, res) => {
  // 클라이언트에서 자원 반납
  req.session.isResource = false;
  res.end(`${req.originalUrl} - session : ${JSON.stringify(req.session)}`);
});
```

그리고 세션 설정 이후 미들웨어에서 다음과 같이 [maxAge](https://github.com/expressjs/session#cookiemaxage)값을 다시 설정해주면된다.

```javascript
app.use((req, res, next) => {
  // key값을 'greenfrog'로 갖는 연결의 경우 maxAge를 30분으로 설정한다.
  // maxAge의 기본값이 1시간이었으므로 30분으로 수정되는 경우 세션의 값이 수정되었으므로
  // 세션의 만료시간이 초기화된다.
  console.log('session.maxAge :', req.session.cookie.maxAge);
  if(!req.session.cookie) {
    return next();
  }
  req.session.cookie.maxAge = (req.session.isResource)? RESOURCE_MAXAGE: DEFFAULT_MAXAGE;
  next();
});
```

## 참조

* [Example](./src/main.js)
