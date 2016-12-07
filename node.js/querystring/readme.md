# Express.js에서 쿼리스트링 사용하기

req객체(Http Request)의 query속성을 통해서 GET메소드의 쿼리 스트링에 접근할 수 있다. 만약, 쿼리 스트링이 존재하지 않으면 {} (빈 객체)가 반환된다.

다음은 Express의 [API](http://expressjs.com/en/api.html)문서에 나와있는 [req.query](http://expressjs.com/en/api.html#req.query)의 사용 예제이다.


```javascript
// GET /search?q=tobi+ferret
req.query.q
// => "tobi ferret"

// GET /shoes?order=desc&shoe[color]=blue&shoe[type]=converse
req.query.order
// => "desc"

req.query.shoe.color
// => "blue"

req.query.shoe.type
// => "converse"
```

## 참조

* [How to get GET (query string) variables in Express.js on Node.js?](http://stackoverflow.com/questions/6912584/how-to-get-get-query-string-variables-in-express-js-on-node-js)
* [req.query](http://expressjs.com/en/api.html#req.query)
