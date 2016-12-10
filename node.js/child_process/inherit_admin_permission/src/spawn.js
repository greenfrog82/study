/* jshint -W097 */
/*jslint node: true */
'use strict';

const spawn = require('child_process').spawn;

const testCode = spawn('node', ['./src/test_code.js']);

testCode.stdout.on('data', data => {
  console.log(`stdout : ${data}`);
});

testCode.stderr.on('data', data => {
  console.log(`stderr : ${data}`);
});

testCode.on('close', code => {
  if(0 !== code) {
    console.error(`Fail : ${code}`);
  } else {
    console.error(`Success : ${code}`);
  }
});
