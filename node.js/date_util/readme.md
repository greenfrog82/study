# 날짜 관련 유틸리티 함수 모음

## 경과시간 출력하기

```javascript
/* ---------------------------------------------------
두 날짜 사이의 경과 시간을 반환
+ parameter(s)
  - beginDate : Date 시작날짜
  - endDate   : Date 끝 날짜
+ return
  - moment.js의 duration객체
------------------------------------------------------ */
exports.getElapse = (beginDate, endDate) => {
  return moment.duration(moment(endDate).diff(moment(beginDate)));
};
```

[ex_getElapse.js](./src/ex_getElapse.js)
```javascript
const mdf = require('moment-duration-format');
const getElapse = require('./lib/dateHelper').getElapse;

const begin = new Date('2016-12-01 12:13:02');
const end = new Date('2016-12-10 12:00:00');

console.log(getElapse(begin, end).format('YYYY-MM-DD hh:mm:ss', {trim:false}));
```

## 시작 날짜와 마지막 날짜 사이의 날짜 출력하기

```javascript
/* ---------------------------------------------------
두 날짜 사이의 날짜 목록 반환
(http://stackoverflow.com/questions/23795522/how-to-enumerate-dates-between-two-dates-in-moment)

+ parameter(s)
  - beginDate : Date 시작날짜
  - endDate   : Date 끝 날짜
+ return
  - 두 날짜 사이의 Date객체 배열

------------------------------------------------------ */
exports.getDaysOfElapse = (beginDate, endDate) => {
  const dates = [];

  const currDate = moment(beginDate).startOf('day');
  const lastDate = moment(endDate).startOf('day');

  while(currDate.add(1, 'days').diff(lastDate) < 0) {
    dates.push(currDate.clone().toDate());
  }
  return dates;
};
```
[ex_getDaysByElpase.js](./src/ex_getDaysByElpase.js)
```javascript
const mdf = require('moment-duration-format');
const getDaysOfElapse = require('./lib/dateHelper').getDaysOfElapse;

const begin = new Date('2016-12-01 12:13:02');
const end = new Date('2016-12-10 12:00:00');

console.log(getDaysOfElapse(begin, end));
```

## 분과 초를 제외한, 시작 날짜와 마지막 날짜의 경과시간과 사이의 경과 시간 출력하기

```javascript
/* ---------------------------------------------------
분과 초를 제외한, 시작 날짜와 마지막 날짜의 시간과 경과 시간을 반환

+ parameter(s)
  - beginDate : Date 시작날짜
  - endDate   : Date 끝 날짜
+ return
  분과 초를 제외한, 시작 날짜와 마지막 날짜의 시간과 경과 시간을 반환
------------------------------------------------------ */
exports.getStartEndTimeAndGapElapseTime = (beginDate, endDate) => {
  const beginStartOfDay = moment(beginDate).startOf('day');
  const endStartOfDay = moment(endDate).startOf('day');

  const diff = moment(endStartOfDay).diff(moment(beginStartOfDay));
  const duration = moment.duration(diff);

  // const hour24s = (duration.days() - 1) * 24; // 시작 날짜와 끝 날짜의 사이 시간
  const beginHour = 24 - moment(beginDate).hour();
  const endHour = moment(endDate).hour();

  return {
    begin: beginHour,
    end: endHour,
    gap: (duration.days() - 1) * 24
  };
};
```
[ex_getDaysByElpase.js](./src/ex_getDaysByElpase.js)
```javascript
const moment = require('moment');
const getStartEndTimeAndGapElapseTime = require('./lib/dateHelper').getStartEndTimeAndGapElapseTime;

const begin = new Date('2016-12-01 12:00:00');
const end = new Date('2016-12-10 12:00:00');

const result = getStartEndTimeAndGapElapseTime(begin, end);
console.log(result);
```
# 참조

* [MDN - Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
* [Moment.js](http://momentjs.com/)
* [moment-duration-format](https://github.com/jsmreese/moment-duration-format)
* [tackoverflow - How to enumerate dates between two dates in Moment](http://stackoverflow.com/questions/23795522/how-to-enumerate-dates-between-two-dates-in-moment)
