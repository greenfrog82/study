# How to stop and start specific service in docker-compose

다음은 내가 공부를 위해 사용하고 있는 docker container를 실행시키기 위한 docker-compose.yml 파일의 내용이다. 

```docker
version: "3"
services:
  dev:
    build: ./
    image: dev:1.0.0
    stdin_open: true
    tty: true
    environment:
      - PATH=$PATH:/usr/local/go/bin
    ports:
      - 8080:8080
      - 80:80
    volumes:
      - ./:/develop
    working_dir: /develop
```

위 파일의 내용을 보면 'dev'라는 서비스가 정의되어 있는것을 확인할 수 있다.
이를 다음과 같은 경로(~/develop/study)에서 실행시키면 container의 이름은 현재 경로의 디렉토리명 + 서비스명 + _1이 된다. 
다음과 같다.

```sh
greenfrog@greenfrogui-MacBook-Pro ~/develop/study (master) $ docker-compose ps
   Name        Command    State   Ports
---------------------------------------
study_dev_1   /bin/bash   Up
```

그러면 docker-compose의 명령을 통해 현재 실행되어 있는 study_dev_1 container를 중지시켜보자. 

## To stop specific service in docker-compose

처음에는 docker-compose를 통해 실행 된 서비스의 container 이름을 이용하면 될 줄 알고 다음과 같이 명령을 실행했었다. 

그 결과 다음과 같이 study_dev_1이라는 서비스를 찾을 수 없다는 에러메시지가 출력되었다. 

```sh
greenfrog@greenfrogui-MacBook-Pro ~/develop/study (master) $ docker-compose stop study_dev_1
ERROR: No such service: study_dev_1
```

따라서, docker-compose stop 명령에 대한 문서를 확인해보았다. 문서는 해당 명령을 다음과 같이 가이드하고 있다. 

>Usage: stop [options] [SERVICE...]
>
>Options:
>-t, --timeout TIMEOUT      Specify a shutdown timeout in seconds (default: 10).

맞다! ocker-compose stop 명령에서는 container의 이름을 쓰는 것이 아니라 docker-compose.yml에 명시 된 서비스 이름을 사용해야한다. 

다음과 같이 명령을 사용하니 아주 잘 동작했다. 

```sh
greenfrog@greenfrogui-MacBook-Pro ~/develop/study (master) $ docker-compose stop dev
Stopping study_dev_1 ... done
greenfrog@greenfrogui-MacBook-Pro ~/develop/study (master) $ docker-compose ps
   Name        Command    State    Ports
----------------------------------------
study_dev_1   /bin/bash   Exit 0
```

## To start specific service in docker-compose

중지 된 특정 서비스를 시작하는 방법 역시 stop 명령과 동일하다. 다음은 docker-compose start 명령에 대한 문서의 내용이다. 

>Usage: start [SERVICE...]

다음과 같이 명령을 사용해서 중지 되었던 서비스를 다시 시작 시켰다. 

```sh
greenfrog@greenfrogui-MacBook-Pro ~/develop/study (master) $ docker-compose start dev
Starting dev ... done
greenfrog@greenfrogui-MacBook-Pro ~/develop/study (master) $ docker-compose ps
   Name        Command    State   Ports
---------------------------------------
study_dev_1   /bin/bash   Up
```

## Reference

* [docker-compose stop](https://docs.docker.com/compose/reference/stop/)
* [docker-compose start](https://docs.docker.com/compose/reference/start/)