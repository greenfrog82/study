# Document와 EmbeddedDocument에 대해서

[mongoose](http://mongoosejs.com/)를 사용하는 경우, [Schema](http://mongoosejs.com/docs/guide.html)를 정의할 때 다음과 같이 내부 객체를 정의할 수 있다.

```javascript
// mongoose의 경우 ..
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Game = new Schema({
  title:  String,
  user: {
    name: String,
    age: Number
  }
});
```

이렇게 사용하던 습관이 있다보니 [Camo](https://github.com/scottwrobinson/camo)를 사용할 때도 위와 같은 방식으로 내부 객체를 정의하였다.

```javascript
class Game extends Document {
    constructor() {
      super();
      this.schema({
        title: String,
        user: {
          name: String,
          age: Number
        }
      });
    }
}
```

그리고 이를 통해 [Document](https://github.com/scottwrobinson/camo#declaring-your-document)를 생성하고 저장해보면 다음과 같은 오류가 발생한다.

```javascript
const fifa = Game.create({
  title: 'FIFA',
  user: {
    name: 'greenfrog',
    age: 35
  }
});

fifa.save().then(savedDoc => {
  console.log('Success to save document to DB.', savedDoc);
}).catch(err => {
  console.error(`ERROR HANDLER : ${err.stack}`);
});
```
```
ERROR HANDLER : Error: Unsupported type: function String() { [native code] }
    at isType (D:\develop\study\node.js\camo\EmbeddedDocument\node_modules\camo\lib\validate.js:79:15)
    at isValidType (D:\develop\study\node.js\camo\EmbeddedDocument\node_modules\camo\lib\validate.js:121:12)
    at D:\develop\study\node.js\camo\EmbeddedDocument\node_modules\camo\lib\base-document.js:178:18
    at Array.forEach (native)
    at _Game.validate (D:\develop\study\node.js\camo\EmbeddedDocument\node_modules\camo\lib\base-document.js:160:30)
    at D:\develop\study\node.js\camo\EmbeddedDocument\node_modules\camo\lib\document.js:68:18
    at process._tickCallback (node.js:369:9)
    at Function.Module.runMain (module.js:443:11)
    at startup (node.js:139:18)
    at node.js:974:3
```

이는 내부 객체를 생성할 때, [Document](https://github.com/scottwrobinson/camo#declaring-your-document) 또는 [EmbeddedDocument](https://github.com/scottwrobinson/camo#embedded-documents) 클래스를 사용하지 않았기 때문이다.

그런데, 내부 객체를 생성할 때 [Document](https://github.com/scottwrobinson/camo#declaring-your-document) 또는 [EmbeddedDocument](https://github.com/scottwrobinson/camo#embedded-documents) 클래스 중 무엇을 사용해야할까?

[Document](https://github.com/scottwrobinson/camo#declaring-your-document)의 경우 별도의 db를 구성하는 클래스로서 이를 통해서는 내부객체를 생성할 수 없고 해당 db의 [Document](https://github.com/scottwrobinson/camo#declaring-your-document)를 참조만 할 수 있다.

다음과 같이 내부객체를 User [Document](https://github.com/scottwrobinson/camo#declaring-your-document)를 통해서 정의하자.

```javascript
class User extends Document {
  constructor() {
    super();
    this.schema({
      name: String,
      age: Number
    });
  }
}

class Game extends Document {
    constructor() {
      super();
      this.schema({
        title: String,
        user: User
      });
    }
}
```

그리고 다음과 같이 코드를 작성하고 실행해보자.

```javascript
const fifa = Game.create({
  title: 'FIFA',
  user: {
    name: 'greenfrog',
    age: 35
  }
});

fifa.save().then(savedDoc => {
  console.log('Success to save document to DB.', savedDoc);
}).catch(err => {
  console.error(`ERROR HANDLER : ${err.stack}`);
});
```
그러면 다음과 같은 오류 메시지가 발생한다.

```
오류!!

ERROR HANDLER : ValidationError: Value assigned to game.user should be _User, got object
    at D:\develop\study\node.js\camo\EmbeddedDocument\node_modules\camo\lib\base-document.js:196:23
    at Array.forEach (native)
    at _Game.validate (D:\develop\study\node.js\camo\EmbeddedDocument\node_modules\camo\lib\base-document.js:160:30)
    at D:\develop\study\node.js\camo\EmbeddedDocument\node_modules\camo\lib\document.js:68:18
    at process._tickCallback (node.js:369:9)
    at Function.Module.runMain (module.js:443:11)
    at startup (node.js:139:18)
    at node.js:974:3
```

앞서 설명한바와 같이 [Document](https://github.com/scottwrobinson/camo#declaring-your-document 는 별도의 db의 [Document](https://github.com/scottwrobinson/camo#declaring-your-document 를 나타내므로 이를 통해 내부객체를 표현할 수 없기 때문에 발생하는 문제이다. 즉, [Document](https://github.com/scottwrobinson/camo#declaring-your-document 를 사용하면 외부 db의 특정 [Document](https://github.com/scottwrobinson/camo#declaring-your-document 를 참조하기 위해서만 사용가능하다. 옳바른 사용은 다음과 같다.

[Document 예제코드](./src/ex_document.js)
```javascript
const user = User.create({
  name: 'greenfrog',
  age: 35
});

user.save().then(savedUser => {
  const fifa = Game.create({
    title: 'FIFA',
    user: savedUser
  });

  return fifa.save();
}).then(savedDoc => {
  console.log('Success to save document to DB.', savedDoc);
}).catch(err => {
  console.error(`ERROR HANDLER : ${err.stack}`);
});
```

결국, 처음으로 돌아가서 mongoose에서 처럼 내부객체의 정의하기 위해서는 [EmbeddedDocument](https://github.com/scottwrobinson/camo#embedded-documents) 를 사용해야한다. 이를 사용하는 방법은 다음과 같으며, 의도했던데로 잘 동작한다.

[EmbddedDocument 예제코드](./src/ex_embeddedDocument.js)
```javascript
class User extends EmbeddedDocument {
  constructor() {
    super();
    this.schema({
      name: String,
      age: Number
    });
  }
}

class Game extends Document {
    constructor() {
      super();
      this.schema({
        title: String,
        user: User
      });
    }
}

const fifa = Game.create({
  title: 'FIFA',
  user: {
    name: 'greenfrog',
    age: 35
  }
});

fifa.save().then(savedDoc => {
  console.log('Success to save document to DB.', savedDoc);
}).catch(err => {
  console.error(`INNER ERROR HANDLER : ${err.stack}`);
});
```

## 참조

* [Camo](https://github.com/scottwrobinson/camo)
