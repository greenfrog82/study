# [Camo](https://github.com/scottwrobinson/camo)의 Document 참조에 의한 CRUD 예제

## 개요

[Camo](https://github.com/scottwrobinson/camo)의 Document 참조에 의한 CRUD 방법 및 주의사항을 정리한다.
이를 알아보기 위해 사용되는 스키마는 다음과 같이 Filter가 User를 참조하고 있다.

```javascript
class User extends Document {
  constructor() {
    super();
    this.schema({
      key: String
    });
  }

  static collectionName() {
    return 'users';
  }
}

class Filter extends Document {
  constructor() {
    super();
    this.schema({
      isUse: {type:Boolean, default:false},
      users: [User]
    });
  }

  static collectionName() {
    return 'filters';
  }
}
```

## Create

다음과 같이 **반드시** 참조가 되는 User를 먼저 생성하고  DB에 저장을 해주어야한다. 참조라는것은 DB에 저장 된 Document를 참조하는 것이기 때문이다. User가 저장이 됐으면, User를 참조하는 Filter를 생성 또는 읽어서 참조를 시켜주면 된다.

```javascript
const user = User.create({key: 'b'});
user.save().then(savedUser => {
  console.log('Success to save the user.', savedUser);

  Filter.findOne().then(foundFilter => {
    if(!foundFilter) {
      foundFilter = Filter.create();
    }

    console.log('Success to read the filter.', foundFilter);

    foundFilter.users.push(user);

    foundFilter.save().then(savedFilter => {
        console.log('Success to save the filter.', savedFilter);
    }).catch(err => {
      console.error(`[FILTER][SAVE][ERROR HANDLER] ${err.stack}`);
    });
  }).catch(err => {
    console.error(`[FILTER][READ][ERROR HANDLER] ${err.stack}`);
  });
}).catch(err => {
  console.error(`[USER][ERROR HANDLER] ${err.stack}`);
});
```

위 코드가 실행되면 db경로에 각각 다음과 같이 db파일들이 생성된다.

* filters.db
* users.db

그리고 각 파일의 내용은 다음과 같다.

```javascript
// filters.db
{"isUse":false,"users":["JEYLoO7UdQMUp8MG"],"_id":"YtU3cDel3NKxSfih"}

// users.db
{"key":"a","_id":"JEYLoO7UdQMUp8MG"}
```

만약, User를 생성하고 DB에 저장하지 않은채로 Filter를 생성하거나 읽어서 User를 참조하고 저장하면 어떻게 될까? 다음과 같이 filters.db 파일이 저장되는 것을 확인할 수 있는데, 참조했던 users 속성의 배열값이 null인 것을 확인할 수 있다.

```json
{"isUse":false,"users":[null],"_id":"un50a0w4BGi7Wrgn"}
```

filters.db파일이 위와 같이 저장 된 상태에서 정상적인 절차를 통해 User를 참조하고 저장하면 다음과 같은 에러가 발생하기 때문에 참조하는 절차를 반드시 준수해야한다.

```
[FILTER][SAVE][ERROR HANDLER] ValidationError: Value assigned to filters.users should be [_User], got [,[object Object]]
    at E:\greenfrog\study\node.js\camo\CRUD_Document\node_modules\camo\lib\base-document.js:196:23
    at Array.forEach (native)
    at _Filter.validate (E:\greenfrog\study\node.js\camo\CRUD_Document\node_modules\camo\lib\base-document.js:160:30)
    at E:\greenfrog\study\node.js\camo\CRUD_Document\node_modules\camo\lib\document.js:68:18
```

## Read

읽기는 다음코드를 통해 수행하면된다. 결과로는 앞서 보여주었던 filter.db의 내용이 그대로 출력되는 것이 아니라, 다시 말해서 users속성에 "users":["JEYLoO7UdQMUp8MG"] 값이 출력되는 것이 아닌 참조되는 User Document의 값이 출력된다.

```javascript
Filter.findOne().then(readFilter => {
  console.log(readFilter);
}).catch(err => {
  console.error(`[USER][ERROR HANDLER] ${err.stack}`);
});
```

## Udpate

## Delete

삭제는 다음과 같은 경우를 고려해서 수행해야한다.

* 참조하고 있는 Filter Document에서 User Document의 참조만 삭제하고자하는 경우
* 참조되고 있는 User Document만 삭제하는 경우

### 참조하고 있는 Filter Document에서 User Document의 참조만 삭제하고자하는 경우

```javascript
Filter.findOne().then(readFilter => {
  readFilter.users.splice(0, 1);
  readFilter.save().then(savedFilter => {

  }).catch(err => {
    console.error(`[FILTER][SAVE][ERROR HANDLER] ${err.stack}`);
  });
}).catch(err => {
  console.error(`[FILTER][READ][ERROR HANDLER] ${err.stack}`);
});
```

위 코드를 실행해보면 참조하고 있는 Filter에서 User에 대한 참조만을 삭제할 뿐, 실제 users.db에서 참조되고 있는 User Document가 삭제되지는 않는다.
따라서, **참조되고 있는 User Document도 함께 삭제해야한다면 별도로 삭제코드를 실행시켜주어야한다**.

### 참조되고 있는 User Document만 삭제하는 경우

```javascript
User.deleteOne({key: 'a'}).then(count => {
  console.log('Success to delete the user.', count);
  Filter.findOne().then(readFilter => {
    console.log('Success to read the filter.', readFilter);
  }).catch(err => {
    console.error(`[FILTER][READ][ERROR HANDLER] ${err.stack}`);
  });
}).catch(err => {
  console.error(`[USER][DELETE][ERROR HANDLER] ${err.stack}`);
});
```

위 코드를 실행하면 참조되고 있는 User Docuemnt만을 삭제하고 Filter Document를 읽어서 출력한다. 출력된 결과는 다음과 같다.
결과를 보면 users: [undefined]로 출력되는데, 앞서 Create를 설명할 때, "User를 생성하고 DB에 저장하지 않은채로 Filter를 생성하거나 읽어서 User를 참조하고 저장"하는 경우의 결과와 비슷한것을 확인할 수 있다.

```javascript
_Filter {
  _schema:
   { _id: { type: [Function: String] },
     isUse: { type: [Function: Boolean], default: false },
     users: { type: [Object] } },
  _id: 'YtU3cDel3NKxSfih',
  isUse: false,
  users: [ undefined ] }
```

이 상태에서 Create의 예제를 다시 실행해보면 다음과 같은 결과가 출력된다.

```
[FILTER][SAVE][ERROR HANDLER] ValidationError: Value assigned to filters.users should be [_User], got [,[object Object]]
    at E:\greenfrog\study\node.js\camo\CRUD_Document\node_modules\camo\lib\base-document.js:196:23
    at Array.forEach (native)
    at _Filter.validate (E:\greenfrog\study\node.js\camo\CRUD_Document\node_modules\camo\lib\base-document.js:160:30)
    at E:\greenfrog\study\node.js\camo\CRUD_Document\node_modules\camo\lib\document.js:68:18
```

따라서, **참조되고 있는 User Document를 삭제하는 경우에는 이를 참조하고 있는 모든 Document에서 해당 참조를 모두 삭제해주어야한다**.

## 참조

* [Camo](https://github.com/scottwrobinson/camo)
* Example
  * [Create](./src/ex_create.js)
  * [Read](./src/ex_read.js)
  * [Update](./src/ex_update.js)
  * [Delete](./src/ex_delete.js)
