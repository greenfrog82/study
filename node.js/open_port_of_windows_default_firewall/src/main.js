/* jshint -W097 */
/* jshint node: true */
'use strict';

const openPort = require('./firewall');

openPort('GTS', '3000', (msg) => {
  console.log(msg);
});
