# How to find which process listen upon a port

어떤 프로세스가 특정 Port를 열고 있는지 확인하는 방법에 대해서 알아보자.
이를 알아보기 위해서 다음 툴을 사용할 수 있다. 

**netstat** - network connections, routing tables 그리고 네트워크 인터페이스의 통계정보를 표시하기 위한 command-line tool.

**위 명령을 사용할 때는 반드시 root 권한으로 실행되어야한다.**

## Using netstat

다음 명령을 사용하면 현재 열려있는 TCP/UDP의 Port와 PID/프로세스명을 열거한다. 

> $ sudo netstat -tulpn

다음은 위 명령을 통해 현재 시스템에서 열려있는 TCP/UDP Port와 PID/프로세스명을 열거한것이다. 

```sh
netstat -tulp
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp        0      0 0.0.0.0:8000            0.0.0.0:*               LISTEN      66/python
tcp        0      0 127.0.0.11:43269        0.0.0.0:*               LISTEN      -
udp        0      0 127.0.0.11:46504        0.0.0.0:*                           -
```

grep 명령을 함께 사용하면 특정 Port를 열고있는 프로세스를 쉽게 검색할 수 있다. 

> $ sudo netstat -tulpn | grep :8000

```sh
netstat -tulpn | grep :8000
tcp        0      0 0.0.0.0:8000            0.0.0.0:*               LISTEN      66/python
```

## Reference 

* [Linux: Find Out Which Process Is Listening Upon a Port](https://www.cyberciti.biz/faq/what-process-has-open-linux-port/)