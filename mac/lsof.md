# lsof

`lsof`명령은 특정 프로세스가 열어놓은 파일의 목록을 출력해준다.  
여기서는 `lsof`명령에 대한 내용과 활용하는 방법에 대해서 알아본다.  

## How to find process using specific port

`netstat`을 통해 특정 포트를 사용하는 `pid`를 찾는 방법에 대해서 알아보자.   
우선, 이는 다음 명령을 통해 찾을 수 있다.   

>$ sudo lsof -i tcp:[PORT]

예를들어, tcp로 3306포트(MySQL)를 사용하는 `pid`를 찾아보자.  

```bash
$ sudo lsof -i tcp:3306
Password:
COMMAND PID   USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
mysqld  107 _mysql   32u  IPv6 0x4d61071f5ca0ffad      0t0  TCP *:mysql (LISTEN)
```

# Reference

* [Linux lsof Command Tutorial for Beginners (10 Examples)](https://www.howtoforge.com/linux-lsof-command/)