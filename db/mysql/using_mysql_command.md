# Mac, 쉘에서 MySQL 사용하기 

## MySQL 실행 준비하기

Mac의 쉘에서 MySQL을 사용하려고 하는데, 다음과 같이 mysql 명령을 찾지 못한다.

```bash
$ mysql
-bash: mysql: command not found
```

이 경우 mysql의 설치 경로를 환경변수에 설정해줘야한다. 일반적으로 mysql은 /usr/local/mysql에 설치되어있다.
다음과 같이 .bash_profile 파일에 환경변수에 mysql경로를 입력해주자.

```bash  
$ vi ~/.bash_profile

# Setting path
export PATH=$PATH:/usr/local/mysql/bin
```

위와 같이 입력을 마쳤으면 다음 명령을 통해 .bash_profile을 적용해주자.

```bash
$ source ~/.bash_profile
```

## MySQL 쉘에서 실행하기

MySQL을 쉘에서 실행시키는 명령은 다음과 같다.

```bash
$ mysql -u <username> -p
```

위 설정을 마무리했으면 다음 명령을 통해 MySQL을 쉘에서 실행시켜보자.

```bash
$ mysql -u root -p
Enter password:
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 9
Server version: 5.7.18 MySQL Community Server (GPL)

Copyright (c) 2000, 2017, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql>
```

정상적으로 잘 동작한다.

## 참조

* [can't access mysql from command line mac](https://stackoverflow.com/questions/8195418/cant-access-mysql-from-command-line-mac)
* [Adding JDK Path in Mac OS X, Linux, or Windows](https://cloudlink.soasta.com/t5/CloudTest-Knowledge-Base/Adding-JDK-Path-in-Mac-OS-X-Linux-or-Windows/ta-p/43867)
* [How to connect to MySQL from the command line](https://www.a2hosting.com/kb/developer-corner/mysql/connect-to-mysql-from-the-command-line)
