/* jshint -W097 */
/*jslint node: true */
'use strict';

const exec = require('child_process').exec;

exec('node ./src/test_code.js', (err, stdout, stderr) => {
  if (err) {
    console.error(err.toString() + ' : ' + err.stack);
    return 1;
  }

  console.log(`* stdout : ${stdout}`);
  console.log(`* stderr : ${stderr}`);
});
