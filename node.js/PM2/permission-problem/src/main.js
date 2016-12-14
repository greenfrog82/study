const spawn = require('child_process').spawn;

const child = spawn('node', ['./src/child_program.js'], {
  detached: true
});

child.stdout.on('data', data => {
  console.log(`stdout : ${data}`);
});

child.stderr.on('data', data => {
  console.log(`stderr : ${data}`);
});

child.on('close', code => {
  if(0 !== code) {
    console.error(`Fail : ${code}`);
  } else {
    console.error(`Success : ${code}`);
  }
});
