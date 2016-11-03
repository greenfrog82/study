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
    secret: 'ssshhhhh',
    // create new redis store.
    store: new redisStore({ host: 'localhost', port: 6379}),
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
app.use('/', express.static(path.join(__dirname, '/../../dist')));
app.post('/login',function(req,res){
    // when user login set the key to redis.
    req.session.key=req.body.email;
    res.end('done');
});

app.get('/logout',function(req,res){
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
