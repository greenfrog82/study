const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const NedbStore = require('nedb-session-store')(session);

const app = express();

app.use(session({
    secret: '@#!@)($)*@#$)(#@$)(!@$*)',
    cookie: {
      httpOnly: true,
      maxAge: 180000,
      secure: false
    },
    store: new NedbStore({
      filename: './session_store.db',
      defaultExpiry: 3000
    }),
    saveUninitialized: false,
    resave: false
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use((req, res, next) => {
  console.log('------------ Test Middleware..', req.session.id);
  console.log(req.session);
  console.log('------------------------------');
  next();
});
app.post('/login',function(req,res){
    // when user login set the key to redis.
    req.session.key=req.body.email;
    req.session.dirty = false;
    res.end('log-in');
});

app.post('/session',function(req,res){
    // when user login set the key to redis.
    req.session.dirty = !req.session.dirty;
    res.end(`${req.session.dirty}`);
});

app.get('/logout',function(req,res){
    req.session.destroy(function(err){
        if(err){
            res.end(`${err.toString()} ${err.stack}`);
        } else {
            res.end('log-out!');
        }
    });
});

app.listen(3000,function(){
    console.log("App Started on PORT 3000");
});
