// /* jshint -W097 */
// /* jshint node: true */
// 'use strict';
//
// import axios from 'axios';
//
// console.log('Begin');
//
// axios.defaults.baseURL = 'http://charon:4000';
//
// axios.post(
//   '/api/userAuth/login',
//   {
//     uuid: "a",
//     dummy: "dummy"
//   },
//   {
//     maxRedirects: 0
//   }).then(res => {
//     console.log('---------- response');
//     console.log(res.status);
//     console.log(res.data);
//   }).catch(ex => {
//     console.log('------- catch');
//     //console.error(ex.toString());
//     // console.log(ex.response['headers']['']);
//     //console.log(ex.response['headers']['set-cookie'][0]);
//     console.log(ex.response['headers']['set-cookie'][0]);
//
//     if(302 === ex.response.status) {
//       axios.get(`http://charon:4000${ex.response.headers.location}`)
//       .then(res => {
//         console.log(res.status);
//         console.log(res.data);
//       }).catch(ex => {
//         console.log('------- catch');
//         console.error(ex.toString());
//       });
//     }
//   });
//
// // axios.post(
// //   'http://charon:4000/api/user',
// //   {
// //   	"id":"NAVER",
// //   	"desc":"NAVER",
// //   	"uuid":"a",
// //   	"createAt":"2016/11/08 11:19:47.297"
// //   }).then(res => {
// //     console.log('---------- response');
// //     console.log(res.status);
// //     console.log(res.data);
// //   }).catch(ex => {
// //     console.log('------- catch');
// //     console.error(ex.toString());
// //   });
//
//
// // axios.get('http://localhost:4000/')
// //   .then(res => {
// //     console.log('---------- response');
// //     console.log(res.status);
// //     console.log(res.data);
// //   }).catch(ex => {
// //     console.log('------- catch');
// //     console.error(ex.toString());
// //   });
//
// console.log('End');

const template = {
  name: 'greenfrog',
  age: 35
};


const obj = Object.assign({job:'programmer'}, template);
console.log(obj);
