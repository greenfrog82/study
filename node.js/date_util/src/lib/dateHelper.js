/* jshint -W097 */
/*jslint node: true */
'use strict';

const moment = require('moment');

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

/* ---------------------------------------------------
시작 날짜와 마지막 날짜의 시간과 두 날짜(시작, 마지막) 사이의 날짜와 시간 목록 반환
(http://stackoverflow.com/questions/23795522/how-to-enumerate-dates-between-two-dates-in-moment)

+ parameter(s)
  - beginDate : Date 시작날짜
  - endDate   : Date 끝 날짜
+ return
  - {
    date: Date,
    
  }
------------------------------------------------------ */
exports.getElapseTimeAndDateList
