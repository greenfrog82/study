/* jshint -W097 */
/*jslint node: true */
'use strict';

const moment = require('moment');

const begin = new Date('2016-12-01 12:13:02');
const end = new Date('2016-12-03 12:00:00');

const diff = moment(end).diff(moment(begin));
const duration = moment.duration(diff);

const hour24s = (duration.days() - 1) * 24; // 시작 날짜와 끝 날짜의 사이 시간
const beginHour = moment(begin).minute();
console.log(beginHour);

// http://stackoverflow.com/questions/23795522/how-to-enumerate-dates-between-two-dates-in-moment
var enumerateDaysBetweenDates = function(startDate, endDate) {
    var dates = [];

    var currDate = startDate.clone().startOf('day');
    var lastDate = endDate.clone().startOf('day');

    while(currDate.add('days', 1).diff(lastDate) < 0) {
        console.log(currDate.toDate());
        dates.push(currDate.clone().toDate());
    }

    return dates;
};

console.log(enumerateDaysBetweenDates(moment(begin), moment(end)));


// console.log(duration.days());

// http://stackoverflow.com/questions/25150570/get-hours-difference-between-two-dates-in-moment-js

// console.log(moment.duration(diff)._data);
// console.log(diff);

// console.log(moment.duration(diff).months());
// console.log(moment.duration(diff).hours());

// const data = moment.duration(diff)._data;

// console.log(data);
// console.log(data.keys);
//
// data.keys.forEach(key => {
//   console.log(key + ' - ' + data[key]);
// })




function getDuration(beginDate, endDate) {
  const diff = moment(endDate).diff(moment(beginDate));
  const duration = moment.duration(diff);

  let date;

  if(0 < duration.years()) {
    date = `${duration.years()}.${duration.months()}.${duration.days()} ${duration.hours()}:${duration.minutes()}:${duration.seconds()}`;
  } else if(0 < duration.months()) {
    date = `${duration.months()}.${duration.days()} ${duration.hours()}:${duration.minutes()}:${duration.seconds()}`;
  } else if(0 < duration.days()) {
    date = `${duration.days()} ${duration.hours()}:${duration.minutes()}:${duration.seconds()}`;
  } else if(0 < duration.hours()) {
    date = `${duration.hours()}:${duration.minutes()}:${duration.seconds()}`;
  } else if(0 < duration.minutes()) {
    date = `${duration.minutes()}:${duration.seconds()}`;
  }

  return {
    years: duration.years(),
    months: duration.months(),
    days: duration.days(),
    hours: duration.hours(),
    minutes: duration.minutes(),
    seconds: duration.seconds(),
    milliseconds: duration.milliseconds(),
    format: date
  };
}

// console.log(getDuration(birth, now));
