import express from 'express';
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import bodyParser from 'body-parser';
import path from 'path';

const redisStore = connectRedis(session);
const client  = redis.createClient();
const app = express();

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
app.use(function (req, res, next) {
  if (req.session) {
    next();
  } else {
    res.status(500).end('Fail to initialize redis server. Please check the redis server.');
  }
});
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use((req, res, next) => {
  console.log('------------ Session Printer Middleware..', req.session.id);
  console.log(req.session);
  console.log('------------------------------');
  next();
});
app.use('/', express.static(path.join(__dirname, '/../../dist')));

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

app.put('/keepalive', (req, res) => {
  // 세션을 갱신해서 세션 만료시간을 초기화한다.
  req.session.dirty = !req.session.dirty;
  res.end(`${req.originalUrl} - session : ${JSON.stringify(req.session)}`);
});

app.listen(3000,function(){
  console.log("App Started on PORT 3000");
});
