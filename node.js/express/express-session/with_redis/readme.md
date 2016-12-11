# express-session과 Redis를 이용한 세션 유지하는 예제 코드

```javascript
import express from 'express';
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import bodyParser from 'body-parser';
import path from 'path';


const redisStore = connectRedis(session);
const client  = redis.createClient();
const app = express();

app.use(session({
    secret: '@#!@)($)*@#$)(#@$)(!@$*)',
    cookie: {
      httpOnly: true,
      maxAge: 60000,
      secure: false
    },
    // create new redis store.
    store: new redisStore({ host: 'localhost', port: 6379}),
    saveUninitialized: false,
    resave: false
}));
```
## 이슈

### Redis의 설정을 잘못했을 경우 이에 대한 예외처리를 하는 방법

Redis를 세션 저장소로 사용할 경우, Redis에 대한 설정을 서버의 설정 파일로부터 읽어오는 경우를 가정하자. 이때 서버 관리자가 Redis에 대한 잘못된 설정을 서버 설정파일에 입력하였다. 서버가 기동되었을 때 이에 대한 예외처리를 어떻게 할 수 있을까?

Redis에 대한 설정이 잘못되면 [express-session](https://github.com/expressjs/session) 라이브러리는 req.session 속성을 설정하지 않으므로 req.session은 undefined가 된다. 따라서 이를 검사하는 미들웨어를 설정해서 req.session이 undefined일때 이에 대한 에외처리를 해주면 된다.

```javascript
app.use(session({store: new RedisStore(), secret: '123456'}));
app.use(function (req, res, next) {
  if (req.session) {
    next();  
  } else {
    // handle session unavailable here
    res.status(500).end('Fail to initialize redis server. Please check the redis server.');  
  }
});
```


## 참조

* [Using Redis to handle Session in Noden.js](https://codeforgeek.com/2015/07/using-redis-to-handle-session-in-node-js/)
* [Report specific error if Redis isn't running](https://github.com/tj/connect-redis/issues/72)
* [Handling sessions when redis is unavailable](https://github.com/tj/connect-redis/issues/116)
