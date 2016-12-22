import express from 'express';
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import bodyParser from 'body-parser';
import path from 'path';


const redisStore = connectRedis(session);
const client  = redis.createClient();
const app = express();

let maxAge;

app.use((req, res, next) => {
  maxAge = (!req.session)? 3600000: req.session.cookie.maxAge;
  next();
});
app.use(session({
    secret: '@#!@)($)*@#$)(#@$)(!@$*)',
    cookie: {
      httpOnly: true,
      maxAge: maxAge,
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use((req, res, next) => {
  console.log('------------ Test Middleware..', req.session.id);
  console.log(req.session);
  console.log('------------------------------');
  next();
});
app.use('/', express.static(path.join(__dirname, '/../../dist')));
app.post('/login', (req,res) => {
  req.session.key=req.body.key;
  req.session.dirty = true;
  res.end(`session.key : ${req.session.key}`);
});

app.get('/resource', (req, res) => {
  // 자원을 획득한 클라이언트의 경우 maxAge 속성을 30분으로 수정한다.
  req.session.cookie.maxAge = 1800000;
  res.end(`session : ${JSON.stringify(req.session)}`);
});

app.put('/keepalive', (req, res) => {
  // 해당 url이 호출되면 세션 정보를 갱신해서 세션이 만료되지 않도록한다.
  req.session.dirty = !req.session.dirty;
  res.end(`session : ${JSON.stringify(req.session)}`);
});

app.get('/logout', (req,res) => {
  req.session.destroy(function(err){
      if(err){
          console.log(err);
      } else {
          res.redirect('/');
      }
  });
});

app.listen(3000,function(){
  console.log("App Started on PORT 3000");
});
