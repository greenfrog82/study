# netstat

`netstat`는 네트워크 상태를 보여주는 보여주는 툴이다.  
여기서는 이 툴에 대한 내용과 활용하는 방법에 대해서 다룬다. 

## Options

`netstat`의 옵션에 대해서 설명한다.

### -a

기본적으로 netstat는 서버 프로세스에 의해 사용되는 소켓 정보는 출력하지 않지만, 이 옵션을 통하면 모든 소켓의 상태를 출력한다.  

예를들어, 현재 로컬 개발환경에 MySQL, Memcached, RabbitMQ, Redis가 동작하고 있다. 이때 `-a` 옵션 없이 이들은 찾아보자.   
아무것도 검색되지 않는것을 알 수 있다. 

```bash
$ netstat -np tcp | grep 3306 # mysql
$
$ netstat -np tcp | grep 11211 # memcached
$
$ netstat -np tcp | grep 5672 # rabbitmq
$
$ netstat -np tcp | grep 6379 # redis
$
```

이번에는 `-a`옵션을 사용해서 각각 서버들을 검색해보자.  
서버의 소켓정보가 출력되는것을 확인할 수 있다. 

```bash
$ netstat -anp tcp | grep 3306
tcp46      0      0  *.3306                 *.*                    LISTEN
$ netstat -anp tcp | grep 11211
tcp6       0      0  ::1.11211              *.*                    LISTEN
tcp4       0      0  *.11211                *.*                    LISTEN
$ netstat -anp tcp | grep 5672
tcp6       0      0  ::1.5672               *.*                    LISTEN
tcp4       0      0  *.5672                 *.*                    LISTEN
tcp6       0      0  ::1.15672              *.*                    LISTEN
tcp4       0      0  *.15672                *.*                    LISTEN
$ netstat -anp tcp | grep 6379
tcp6       0      0  ::1.6379               *.*                    LISTEN
tcp4       0      0  *.6379                 *.*                    LISTEN
```

### -n

`netstat`는 소켓의 이름이 있다면 주소와 포트를 숫자로 표시하지 않고 이름으로 표시한다.  

예를들어, MySQL을 `-n`옵션을 사용하지 않고 찾아보자.   
다음과 같이 MySQL의 주소와 포트가 **숫자**로 표시되지 않고 **이름**으로 표시되는 것을 확인 할 수 있다. 

```bash
$ netstat -ap tcp | grep mysql
tcp46      0      0  *.mysql                *.*                    LISTEN
```

이번에는 `-n`옵션을 사용해보자.   
다음과 같이 MySQL의 주소와 포트가 **숫자**로 표시되는것을 확인 할 수 있다.   

```bash
netstat -anp tcp | grep 3306
tcp46      0      0  *.3306                 *.*                    LISTEN
```

## How to find process using specific port

`netstat`을 통해 특정 포트를 사용하는 `pid`를 찾는 방법에 대해서 알아보자.   
우선, 이는 다음 명령을 통해 찾을 수 있다.   

>$ netstat -vanp [tcp or udp] | grep [PORT]

예를들어, tcp로 8080포트를 사용하는 `pid`를 찾아보자.  
실제로 이 명령은 다음과 같이 컬럼명을 출력해주지는 않는다. 설명을 위해 문서에서만 표시를 해둔것이다. 따라서 `pid`가 출력되는 위치를 알아두자. 

```bash
$ netstat -vanp tcp | grep 8080
Proto Recv-Q Send-Q  Local Address          Foreign Address        (state)     rhiwat shiwat    pid   epid  state    options
tcp4       0      0  *.8080                 *.*                    LISTEN      131072 131072  41657      0 0x0000 0x00000006
```

이렇게 확인한 `pid`를 통해 많은 일을 할 수 있지만, 해당 프로세스를 죽여보자.  
해당 프로세스를 죽이고 다시 검사해보면 해당 포트가 닫힌것을 확인할 수 있다.  

```bash
$ kill -9 41657
$ netstat -vanp tcp | grep 8080
$
```




# Reference

* [Find (and kill) process locking port 3000 on Mac](https://stackoverflow.com/questions/3855127/find-and-kill-process-locking-port-3000-on-mac)