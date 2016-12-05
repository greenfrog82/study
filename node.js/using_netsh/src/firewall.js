const process = require('child_process').exec;
const os = require('os');

console.log('OS : ', os.platform());

const port = 19982;
const serverName = 'escape greenfrog 2016';

exports.firewallPortOpenner = function(serverName, port, cb) {
  if('win32' !== os.platform()) {
    return;
  }
  const cmd = `netsh advfirewall firewall add rule name=\"${serverName}:${port}\" dir=in action=allow protocol=TCP localport=${port}`;
  process(cmd, (err, stdout, stderr) => {
    if(err) {
      cb(`exec error: ${err}`);
      return;
    }
    cb(`* stdout: ${stdout}\n* stderr: ${stderr}`);
  });
};



// OpenFirewallForWindows(serverName, port);
// netstat.stdout.on('data', data => {
//   console.log(`stdout: ${data}`);
// });
//
// netstat.stderr.on('data', data => {
//   console.log(`stderr: ${data}`);
// });
//
// netstat.on('close', code => {
//   console.log(`child process exited with code ${code}`);
// });
