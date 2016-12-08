# Node.js에서 netsh을 이용해서 윈도우 기본 방화벽의 포트 개방하기

Netsh은 현재 동작 중인 컴퓨터의 네트워크 설정을 확인하거나 변경할 수 있는 윈도우 커맨드 라인 스크립트 도구이다. 이를 이용하면 방화벽의 포트 역시 개방할 수 있다.

Node.js에서 netsh을 이용하여 윈도우 기본 방화벽의 포트를 개방해보았다.

코드는 다음과 같다.

```javascript

const os = require('os');
const exec = require('child_process').exec;

function openPort(serverName, port, cb) {
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
```

윈도우 기본 방화벽의 포트를 개방하는 행위는 시스템을 변경하는 행위이므로 반드시 관리자 권한이 필요하다. 따라서 이 코드는 반드시 관리자 권한으로 실행되어야한다. 따라서, 테스트 코드를 실행할 수 있는 배치 스크립트(run-as-admin.cmd)를 만들어 두었다. 이 배치 스크립트를 실행하면 관리자 권한으로의 승격을 물어보도록 되어있다.

## 참조

* [Open TCP Port 80 in Windows Firewall Using Netsh](https://wiki.mcneel.com/zoo/zoo5netsh)
* [Top 10: Windows Firewall Netsh Commands](http://windowsitpro.com/windows-server/top-10-windows-firewall-netsh-commands)
* [Using Netsh](https://technet.microsoft.com/en-us/library/bb490939.aspx)
