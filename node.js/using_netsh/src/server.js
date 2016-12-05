const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const os = require('os');
const exec = require('child_process').exec;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.post('/start',function(req,res){
  if('win32' !== os.platform()) {
    return;
  }
  const serverName = 'GTS';
  const port = 9909;
  const cmd = `netsh advfirewall firewall add rule name=\"${serverName}:${port}\" dir=in action=allow protocol=TCP localport=${port}`;
  exec(cmd, (err, stdout, stderr) => {
    if(err) {
      res.end(`exec error: ${err}`);
      return;
    }
    res.end(`* stdout: ${stdout}\n* stderr: ${stderr}`);
  });
});

app.listen(9909,function(){
    console.log("App Started on PORT 9909");
});
