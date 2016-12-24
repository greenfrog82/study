# 사용자 요청 시 요청 된 완전 경로(url) 구하기

[예제](./src/main)
```javascript
app.use((req, res, next) => {
  const protocol = req.protocol;        // http 또는 https등의 프로토콜
  const host = req.get('host');         // 도메인 명
  const originalUrl = req.originalUrl;  // 프로토콜과 :// 그리고 도메인명을 제외한 경로

  const fullUrl = `${protocol}://${host}${originalUrl}`;

  // ...
});
```

req.originalUrl 속성의 경우 url의 Query string도 전부 출력해준다.

## 참조

* [stackoverflow - How to get the full url in Express?](http://stackoverflow.com/questions/10183291/how-to-get-the-full-url-in-express)
* [Express 4.x API](http://expressjs.com/en/api.html)
