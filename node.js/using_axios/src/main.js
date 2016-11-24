/* jshint -W097 */
/* jshint node: true */
'use strict';

import axios from 'axios';

console.log('Begin');

axios.defaults.baseURL = 'http://localhost:4000';

axios.post(
  '/api/userAuth/login',
  {
    uuid: "a",
    dummy: "dummy"
  },
  {
    maxRedirects: 0
  }).then(res => {
    console.log('---------- response');
    console.log(res.status);
    console.log(res.data);
  }).catch(ex => {
    console.log('------- catch');
    //console.error(ex.toString());
    console.log(ex.response);

    if(302 === ex.response.status) {
      axios.get(`http://localhost:4000${ex.response.headers.location}`)
      .then(res => {
        console.log('---------- response');
        console.log(res.status);
        console.log(res.data);
      }).catch(ex => {
        console.log('------- catch');
        console.error(ex.toString());
      });
    }
  });

// axios.post(
//   'http://192.168.0.50:4000/api/user',
//   {
//   	"id":"NAVER",
//   	"desc":"NAVER",
//   	"uuid":"b",
//   	"createAt":"2016/11/08 11:19:47.297"
//   }).then(res => {
//     console.log('---------- response');
//     console.log(res.status);
//     console.log(res.data);
//   }).catch(ex => {
//     console.log('------- catch');
//     console.error(ex.toString());
//   });


// axios.get('http://localhost:4000/')
//   .then(res => {
//     console.log('---------- response');
//     console.log(res.status);
//     console.log(res.data);
//   }).catch(ex => {
//     console.log('------- catch');
//     console.error(ex.toString());
//   });

console.log('End');
