# [Camo](https://github.com/scottwrobinson/camo)를 이용한 CRUD 예제

## 개요

[Camo](https://github.com/scottwrobinson/camo)는 [NeDB](https://github.com/louischatriot/nedb)와 [MongoDB](https://www.mongodb.com/)를 위한 ODM툴이다.

Camo와 [NeDB](https://github.com/louischatriot/nedb)를 이용해서 C.R.U.D하는 작업의 예제를 작성해보았다.

## Create

```javascript
Movie.create(movie).save().then(
  savedRes => {
    console.log(`[CREATE] Success to save successfully. ${JSON.stringify(savedRes)}`);
  }
).catch(err => {
  console.log(`[CREATE] ERROR HANDLER : ${err}`);
});
```

## Read

### 특정 값을 통해서 읽기

```javascript
Movie.findOne({title: title}).then(
  foundMovie => {
    console.log(`[READ BY TITLE] Success to read by ${foundMovie.title}. ${JSON.stringify(foundMovie)}`);
  }
).catch(err => {
  console.log('[READ BY TITLE] ERROR HANDLER : ', err);
});
```

### 특정 값을 모두 읽기

```javascript
Movie.find({title: title}).then(
  foundMovies => {
    console.log(`[READ ALL BY TITLE] Success to read all.`);
    foundMovies.forEach(movie => {
      console.log(movie);
    });
  }
).catch(err => {
  console.log('[READ ALL BY TITLE] ERROR HANDLER : ', err);
});
```

**[주의]**
특정 값을 통해 읽기를 할 때 존재하지 않는 값이면 에러가 던져진다.


### 모든 값 읽기

```javascript
Movie.find({}).then(
  foundMovies => {
    console.log(`[READ ALL] Success to read all.`);
    foundMovies.forEach(movie => {
      console.log(movie);
    });
  }
).catch(err => {
  console.log('[READ ALL] ERROR HANDLER : ', err);
});
```

## Update

```javascript
Movie.findOneAndUpdate({title: title}, {rating: rating}).then(
  foundMovie => {
    console.log(`[UPDATE BY TITLE] Success to find and update by ${foundMovie.title}. ${JSON.stringify(foundMovie)}`);
  }
).catch(err => {
  console.log('[UPDATE BY TITLE] ERROR HANDLER : ', err);
});
```

**[주의]**
특정 값을 찾을 때 존재하지 않는 값이면 에러가 던져진다.

## Delete

### 특정 값 지우기

```javascript
Movie.deleteOne({title:title}).then(
  count => {
    console.log(`[DELETE BY TITLE] Success to delete by title. ${count}`);
  }
).catch(err => {
  console.log('[DELETE BY TITLE] ERROR HANDLER : ', err);
});
```
**[주의]**
Read, Update와 달리 특정 값이 존재하지 않으면 에러를 던지는 것이 아니라 count가 0으로 전달된다.

### 모두 지우기

```javascript
Movie.deleteMany({}).then(
  count => {
    console.log(`[DELETE BY TITLE] Success to delete all. ${count}`);
  }
).catch(err => {
  console.log('[DELETE BY TITLE] ERROR HANDLER : ', err);
});
```

## 참조

* [Camo](https://github.com/scottwrobinson/camo)
* [Example](./src/main.js)
