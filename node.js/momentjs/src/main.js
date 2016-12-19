/* jshint -W097 */
/*jslint node: true */
'use strict';

const moment = require('moment');

const birth = new Date('2016.12.01')
const now = Date.now();

console.log(moment(birth).format('YYYY.MM.DD hh:mm:ss'));

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
