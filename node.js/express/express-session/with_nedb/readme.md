# express-session과 nedb를 이용한 세션 유지하는 예제 코드

```javascript
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
```
**주의**

위와 같이 코드를 작성하면 session_store.db에 같은 session id가 계속적으로 추가되는 것을 확인 할 수 있다. 이는 성능적인 이유에서 이렇게 개발되어 있다고 [nedb-session-store autoCompactInterval](https://www.npmjs.com/package/nedb-session-store#autocompactinterval)에서 밝히고 있다. 만약 이게 싫으면 [autoCompactInterval](https://www.npmjs.com/package/nedb-session-store#autocompactinterval)옵션을 셋팅해줘야하는데 기본값이 '하루'로 되어있으므로 특별히 셋팅해줄 필요는 없을 것 같다.

## 참조

* [nedb-session-store](https://www.npmjs.com/package/nedb-session-store)
