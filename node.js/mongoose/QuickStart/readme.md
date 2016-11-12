# [Getting Started](http://mongoosejs.com/docs/index.html)

본 문서는 [mongoose](http://mongoosejs.com/index.html)공식 사이트의 [Getting Started](http://mongoosejs.com/docs/index.html)를 번역하였다.

### Getting Started

이 문서를 시작하기 전에 먼저, [MongoDB](https://www.mongodb.com/download-center#community)와 [Node.js](https://nodejs.org/en/)가 설치되어 있어야한다.

그 다음 명령 프롬프트에서 npm을 이용하여 Mongoose를 설치하여라.

```
$ npm install mongoose
```

이제, 우리는 솜털이 보송보송한 새끼 고양이를 좋아하고 MongDB에서 만나는 모든 고양이를 기록하고 싶다고 하자. 이를 위해서 우리가 먼저 해야하는 것은 mongoose를 프로젝트에 포함시키고 지역적으로 실행되고 있는 MongoDB의 인스턴스의 test 데이터베이스에 접속하는 것이다.

```javascript
// getting-started.js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
```

위 코드를 통해 우리는 localhost에서 동작중인 test 데이터베이스에 대한 비동기 연결을 호출하였다. 따라서 연결이 성공했는지 또는 에러가 발생했는지에 대한 콜백함수를 등록하고 통지를 받을 필요가 있다.

```javascript
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});
```

test 데이터베이스와 연결이 맺어지면 콜백함수가 호출 될 것이다. 설명을 간결하게 하기 위해서 아래부터 설명하는 코드들은 이 콜백함수 안에 있다고 가정하자.

Mongoose를 사용하면 모든 것은 Schema로부터 파생된다. 고양이(kittens)를 정의하고 이에 대한 참조를 획득하자.

```javascript
var kittySchema = mongoose.Schema({
  name: String
});
```
지금까지 그런데로 잘 진행되었다. 우리는 String타입의 name속성을 하나 갖는 스키마를 정의하였다. 다음 단계는 이 스키마를 컴파일하여 [모델](http://mongoosejs.com/docs/models.html)을 얻는것이다.

```javascript
var Kitten = mongoose.model('Kitten', kittySchema);
```

모델은 우리가 생성하는 도큐멘트를 갖는 클래스이다. 이 예제의 경우, 각 도큐멘트는 스키마(kittySchema)에 정의 된 속성과 행동을 가지는 고양이(kitten)가 될 것이다. 방금 밖에서 만난 작은 고양이를 표현하는 도큐멘트를 생성하자.

```javascript
var silence = new Kitten({name: 'Silence'});
sonoel.log(silence); // 'Silence'
```
고양이들은 야옹할 수 있다. 그러니 어떻게 'speak'라는 기능을 도큐먼트에 추가하는지 보자.

```javascript
// 주의: 메소드는 mongoose.model()을 통해서 스키마를 컴파일 하기 전에 스키마에 정의되어야한다.
kittyShcema.methods.speak = function() {
  var greeting = this.name?
    "meow name is " + this.name:
    "I don't have a name";
  console.log(greeting);
}

var Kitten = mongoose.model('Kitten', kittySchema);
```

스키마의 methods 프로퍼티에 추가 된 함수들은 모델의 프로퍼티로 컴파일되고 각각 도큐멘트 객체에 노출된다.

```javascript
var fluffy = new Kitten({name: 'fluffy'});
fluffy.speak(); // "meow name is fluffy"
```

우리는 말하는 고양이들을 가졌다! 그러나 아직까지 어떤것도 MongoDB에 저장하지 않았다. 각 도큐멘트들은 [save](http://mongoosejs.com/docs/api.html#model_Model-save) 메소드를 호출해서 데이터베이스에 저장될 수 있다. 만약 어떤 에러가 발생한다면, 콜백함수의 첫번째 인자로 에러가 전달된다.

```javascript
fluffy.save(function(err, fluffy) {
  if(err) return console.error(err);
  fluffy.speak();
})
```

시간이 지나서, 그 동안 우리가 본 모든 고양이를 표시하고 싶다고 하자. 우리는 Kitten [모델](http://mongoosejs.com/docs/models.html)을 통해서 모든 고양이 도규먼트를 접근할 수 있다.

```javascript
Kitten.find(function(err, kittens) {
  if(err) retrun console.error(err);
  console.log(kittens);
})
```

그저, console에 데이터베이스에 있는 모든 고양이를 출력하였다. 만약 우리가 고양이들의 이름을 통해서 필터링하고자 한다면, Mongoose는 MongoDB의 풍부한 [쿼리](http://mongoosejs.com/docs/queries.html) 문법을 제공한다.

```javascript
Kitten.find({name: /^fluff/}, callback);
```

위 코드는 모든 도큐먼트 중에서 이름이 'Fluff'로 시작하는 고양이들을 찾아 콜백함수에 배열형태로 반환한다.

### 축하합니다.

이것으로 Qucik Start는 끝났다. 우리는 스키마를 생성했고, 사용자 도큐먼트 메소드를 정의했으며, Mongoose를 이용해서 MongoDB에 고양이를 저장하고 쿼리했다. 좀 더 많은 내용을 알고자 한다면 [가이드](http://mongoosejs.com/docs/guide.html) 또는 [API 문서](http://mongoosejs.com/docs/api.html)를 참고하자.












## 참조

* [Getting Started](http://mongoosejs.com/docs/index.html)
