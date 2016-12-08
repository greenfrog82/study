/* jshint -W097 */
/* jshint node: true */
'use strict';

const exec = require('child_process').exec;
const os = require('os');

module.exports = (serverName, port, cb) => {
  if('win32' !== os.platform()) {
    return;
  }
  const cmd = `netsh advfirewall firewall add rule name=\"${serverName}:${port}\" dir=in action=allow protocol=TCP localport=${port}`;
  exec(cmd, (err, stdout, stderr) => {
    if(err) {
      cb(`exec error: ${err}`);
      return;
    }
    cb(`* stdout: ${stdout}\n* stderr: ${stderr}`);
  });
};
