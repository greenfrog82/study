const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use((req, res, next) => {
  const protocol = req.protocol;        // http 또는 https등의 프로토콜
  const host = req.get('host');         // 도메인 명
  const originalUrl = req.originalUrl;  // 프로토콜과 :// 그리고 도메인명을 제외한 경로

  const fullUrl = `${protocol}://${host}${originalUrl}`;
  console.log(`- ${fullUrl}`);
  next();
});

app.post('/login', (req,res) => {
  // when user login set the key to redis.
  req.session.key=req.body.email;
  req.session.dirty = false;
  res.end('log-in');
});

app.post('/session', (req,res) => {
  // when user login set the key to redis.
  req.session.dirty = !req.session.dirty;
  res.end(`${req.session.dirty}`);
});

app.get('/logout', (req,res) => {
  req.session.destroy(err => {
      if(err){
          res.end(`${err.toString()} ${err.stack}`);
      } else {
          res.end('log-out!');
      }
  });
});

app.get('/query', function(req, res) {
  console.log(req.query.name);
  res.end('Good!');
});

app.listen(3000,function(){
  console.log("App Started on PORT 3000");
});
