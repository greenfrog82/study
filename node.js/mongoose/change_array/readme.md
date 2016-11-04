# 배열 요소 값 갱신하기

## 문제

Document의 Key들 중 배열 타입을 갖는 Key의 Value를 수정하였을 때, CallBack함수에서는 성공한 것처럼 동작하지만 실제 DB에는 반영이 안되는 현상.

```javascript
User.findOne({name: 'modulus admin'}, function (err, userObj) {
  if (err) {
    console.log(err);
  } else if (userObj) {
    console.log('Found:', userObj);

    // 다음과 같이 roles이라는 배열의 0번쨰 요소의 값을 'Administrator'로 변경 시도.
    userObj.roles[0] = 'Administrator';
    userObj.save(function (err, savedUserObj) {
      if (err) {
        console.log(err);
      } else {
        // 에러 없이 saveUserObj로 위 변경사항이 적용된 내용이 출력 됨.
        // 하지만 DB에는 변경사항이 반영 안되어 있음.
        console.log('Updated', savedUserObj);
      }
    });
  } else {
    console.log('User not found!');
  }
});
```

## 원인

[FAQ](http://mongoosejs.com/docs/faq.html)에 첫번째로 나와 같은 문제와 답이있다. 다음과 같다.

### FAQ

**Q.** Why don't my changes to arrays get saved when I update an element directly?

```javascript
doc.array[3] = 'changed';
doc.save();
```
**A.** Mongoose doesn't create getters/setters for array indexes; without them mongoose never gets notified of the change and so doesn't know to persist the new value. The work-around is to use [MongooseArray#set](http://mongoosejs.com/docs/api.html#types_array_MongooseArray.set) available in **Mongoose >= 3.2.0**.
```javascript
// 3.2.0
doc.array.set(3, 'changed');
doc.save();

// if running a version less than 3.2.0, you must mark the array modified before saving.
doc.array[3] = 'changed';
doc.markModified('array');
doc.save();
```

## 해결

내가 겪은 문제 중 배열 처리하는 다음 코드를

```javascript
userObj.roles[0] = 'Administrator';
```

다음과 같이 수정하니 해결됐다.
```javascript
userObj.roles.set(0, 'Administrator');
```
## 참조

[Model.save() doesn't save embedded arrays](https://github.com/Automattic/mongoose/issues/1204)
[FAQ](http://mongoosejs.com/docs/faq.html)
[MongooseArray.set()](http://mongoosejs.com/docs/api.html#types_array_MongooseArray.set)
