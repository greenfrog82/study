# 특정 기간 사이의 날짜를 무작위로 구하기

start에 입력 된 날짜부터 end에 입력 된 날짜 전까지 시간을 무작위로 구해준다.

```javascript
function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
```
# 참조

* [Elegant method to generate array of random dates within two dates](http://stackoverflow.com/questions/9035627/elegant-method-to-generate-array-of-random-dates-within-two-dates)
