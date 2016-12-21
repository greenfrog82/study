# [nedb-session-store](https://www.npmjs.com/package/nedb-session-store)를 통해 저장 된 세션 정보 액세스하기

Node.js를 통해 서버를 개발하면서 서버의 특정 자원을 소비하고 있는 클라이언트가 알 수 없는 오류로 인해 죽어버렸을 때, 이러한 클라이언트를 확인하기 위해서 세션을 사용하였다.

서버로부터 특정 자원을 획득해서 사용 중인 클라이언트는 정해진 시간마다 서버에 접근하여 세션 정보를 갱신하고 세션 만료 시간을 연장하도록 하였는데, 만약 알 수 없는 이유로 클라이언트가 세션 정보를 갱신하지 못하면 해당 클라이언트의 세션은 만료되고 이를 통해 문제의 클라이언트를 확인하였다.

일단, 서버에서 파일 DB를 사용하는 것이 적절치는 않다고 생각되지만 여러가지 사정으로 파일 DB를 사용하게 되었고 파일 DB로는 [NeDB](https://github.com/louischatriot/nedb)를 사용하였다. 따라서 세션 정보도 이 파일 DB에 저장하였는데 [nedb-session-store](https://www.npmjs.com/package/nedb-session-store)를 사용하였다. [nedb-session-store](https://www.npmjs.com/package/nedb-session-store)는 기본적으로 [NeDB](https://github.com/louischatriot/nedb)를 이용해서 세션 정보를 파일 DB에 저장하는데, 문제의 클라이언트를 확인하기 위해 이 파일 DB에 접근해야했다.

[nedb-session-store](https://www.npmjs.com/package/nedb-session-store)가 [NeDB](https://github.com/louischatriot/nedb)을 사용하기 때문에 [NeDB](https://github.com/louischatriot/nedb)에서 파일 DB를 액세스하는 예제를 통해 쉽게 세션 정보를 읽어올 수 있었다.

[nedb-session-store](https://www.npmjs.com/package/nedb-session-store)를 통해 저장 된 session 정보에 접근하는 코드는 다음과 같다.

```javascript
const path = require('path');
const DataStore = require('nedb');

const db = new DataStore({ filename: path.join(__dirname, '../data/session_store.db')});

db.loadDatabase(err => {
  if(err) {
    console.error(err.stack);
    return;
  }

  db.find({'session.key': 'greenfrog'}, function (err, docs) {
    console.log(docs);
  });
});
```

## 참조

* [NeDB](https://github.com/louischatriot/nedb)
* [nedb-session-store](https://www.npmjs.com/package/nedb-session-store)
