// const process = require('child_process').exec;
// const spawn = require('child_process').spawn;
const os = require('os');

console.log('OS : ', os.platform());

const port = 19982;
const serverName = 'escape greenfrog 2016';

function OpenFirewallForWindows(serverName, port) {
  if('win32' !== os.platform()) {
    return;
  }

  const name = `name=\"${serverName}:${port}\"`;
  const localPort = `localport=${port}`;

  // const cmd = `netsh advfirewall firewall add rule name=\"${serverName}:${port}\" dir=in action=allow protocol=TCP localport=${port}`;
  // require('child_process').execFile(
  //     'netsh',
  //     [
  //       'advfirewall',
  //       'firewall',
  //       'add',
  //       'rule',
  //       name,
  //       'dir=in',
  //       'action=allow',
  //       'protocol=TCP',
  //       localPort
  //     ],
  //     (err, stdout, stderr) => {
  //       if(err) {
  //         console.error('ERROR : ', err);
  //         return;
  //       }
  //       console.log('STDOUT : ', stdout);
  //       console.log('STDERR : ', stderr);
  //     });

  const cmd = 'copy /?';

  require('child_process').execFile(
      'copy',
      ['/?'],
      (err, stdout, stderr) => {
        if(err) {
          console.error('ERROR : ', err);
          return;
        }
        console.log('STDOUT : ', stdout);
        console.log('STDERR : ', stderr);
      });
}

OpenFirewallForWindows(serverName, port);

//
// OpenFirewallForWindows(serverName, port);
// // netstat.stdout.on('data', data => {
// //   console.log(`stdout: ${data}`);
// // });
// //
// // netstat.stderr.on('data', data => {
// //   console.log(`stderr: ${data}`);
// // });
// //
// // netstat.on('close', code => {
// //   console.log(`child process exited with code ${code}`);
// // });
