/* jshint -W097 */
/*jslint node: true */
'use strict';

const fs = require('fs');

fs.writeFile("c:/g_test.txt", "Hey there!", err => {
  if(err) {
    console.error(err);
    return 1;
  }

  console.log("The file was saved!");
  return 0;
});
