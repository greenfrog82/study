/* jshint -W097 */
/*jslint node: true */
'use strict';

const mdf = require('moment-duration-format');
const getElapse = require('./lib/dateHelper').getElapse;

const begin = new Date('2016-12-01 12:13:02');
const end = new Date('2016-12-10 12:00:00');

console.log(getElapse(begin, end).format('YYYY-MM-DD hh:mm:ss', {trim:false}));


// const d2 = require('./dateHelper').d2;
//

//
// const diff = moment(end).diff(moment(begin));
// const duration = moment.duration(diff);
//
// const hour24s = (duration.days() - 1) * 24; // 시작 날짜와 끝 날짜의 사이 시간
// const beginHour = moment(begin).hour();
// console.log(beginHour);
//
// // http://stackoverflow.com/questions/23795522/how-to-enumerate-dates-between-two-dates-in-moment
// var enumerateDaysBetweenDates = function(startDate, endDate) {
//     var dates = [];
//
//     var currDate = startDate.clone().startOf('day');
//     var lastDate = endDate.clone().startOf('day');
//
//     while(currDate.add(1, 'days').diff(lastDate) < 0) {
//         console.log(currDate.toDate());
//         dates.push(currDate.clone().toDate().toLocaleString());
//     }
//
//     return dates;
// };
//
// console.log(enumerateDaysBetweenDates(moment(begin), moment(end)));


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
