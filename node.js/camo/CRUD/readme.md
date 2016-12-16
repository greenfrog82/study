# [Camo](https://github.com/scottwrobinson/camo)를 이용한 CRUD 예제

## 개요

[Camo](https://github.com/scottwrobinson/camo)는 [NeDB](https://github.com/louischatriot/nedb)와 [MongoDB](https://www.mongodb.com/)를 위한 ODM툴이다.

Camo와 [NeDB](https://github.com/louischatriot/nedb)를 이용해서 C.R.U.D하는 작업의 예제를 작성해보았다.

## Create

```javascript
Movie.create(movie).save().then(
  savedRes => {
    console.log(`[CREATE] Success to save successfully. ${JSON.stringify(savedRes)}`);
  }).catch(err => {
    console.log(`[CREATE] ERROR HANDLER : ${err}`);
  });
```

## Read

### 특정 값을 통해서 읽기

```javascript
Movie.findOne({title: title}).then(
  foundMovie => {
    if(foundMovie) {
      console.log(`[READ BY TITLE] Success to read by ${foundMovie.title}. ${JSON.stringify(foundMovie)}`);
    } else {
      console.log(`[READ BY TITLE] There is no movie which you find.`);
    }
  }).catch(err => {
    console.log('[READ BY TITLE] ERROR HANDLER : ', err);
  });
```
### 특정 값을 모두 읽기

```javascript
Movie.find({title: title}).then(
  foundMovies => {
    console.log('[READ ALL BY TITLE] Success to read all.');

    if(0 < foundMovies) {
      foundMovies.forEach(movie => {
        console.log(movie);
      });
    } else {
      console.log('[READ ALL BY TITLE] There are no movies');
    }
  }).catch(err => {
    console.log('[READ ALL BY TITLE] ERROR HANDLER : ', err);
  });
```
### 모든 값 읽기

```javascript
Movie.find({}).then(
  foundMovies => {
    console.log('[READ ALL] Success to read all.');

    if(0 < foundMovies.length) {
      foundMovies.forEach(movie => {
        console.log(movie);
      });
    } else {
      console.log('[READ ALL] There are no movies.');
    }
  }).catch(err => {
    console.log('[READ ALL] ERROR HANDLER : ', err);
  });
```
## Update

```javascript
Movie.findOneAndUpdate({title: title}, {rating: rating}).then(
  foundMovie => {
    if(foundMovie) {
      console.log(`[UPDATE BY TITLE] Success to find and update by ${foundMovie.title}. ${JSON.stringify(foundMovie)}`);
    } else {
      console.log('[UPDATE BY TITLE] There is no movie.');
    }
  }).catch(err => {
    console.log('[UPDATE BY TITLE] ERROR HANDLER : ', err);
  });
```
## Delete

### 특정 값 지우기

```javascript
Movie.deleteOne({title:title}).then(
  count => {
    console.log(`[DELETE BY TITLE] Success to delete by title. ${count}`);
  }).catch(err => {
    console.log('[DELETE BY TITLE] ERROR HANDLER : ', err);
  });
```
### 모두 지우기

```javascript
Movie.deleteMany({}).then(
  count => {
    console.log(`[DELETE BY TITLE] Success to delete all. ${count}`);
  }).catch(err => {
    console.log('[DELETE BY TITLE] ERROR HANDLER : ', err);
  });
```

### 특정값을 읽어서 처리한 후 삭제하기

findOneAndDelete 메소드를 통해 처리해보려고 했지만, 이 기능이 내가 생각한것 처럼 특정 값을 반환해주지 않아 아래와 같이 관련 기능을 작성하였다.

```javascript
Movie.findOne({title:title}).then(foundMovie => {
  if(foundMovie) {
    console.log('[READ AND DELETE] Success to find movie. So try to delete this.', foundMovie.title);
    return foundMovie.delete();
  }
  console.log('[READ AND DELETE] There is no movie.');
  return 0;
}).then(count => {
  console.log('Success to delete found movie.', count);
}).catch(err => {
  console.error('ERROR HANDLER : ', err);
});
```

## 주의

* **검색 시**
  스칼라 값을 찾을 때 값이 존재하지 않으면 null을 반환하고, 배열값을 찾을 때 값이 존재하지 않으면 빈 배열을 반환한다.
* **삭제 시**
  삭제를 했을 경우에는 삭제한 데이터의 수를 반환하고, 삭제하지 못했을 때는 0을 반환한다.


## 참조

* [Camo](https://github.com/scottwrobinson/camo)
* [Example](./src/main.js)
