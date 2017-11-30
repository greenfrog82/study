# 실행 중인 컨테이너에 접속하기

docker로 작업을 하다보면 실행 중인 컨테이너의 shell로 접속해서 작업을 해야하는 경우가 있다.

이러한 경우는 종료 된 컨테이너를 재시작 한 경우나, 컨테이너가 background로 실행되고 있을 때이다. 그렇다면, 어떻게 실행 중인 컨테이너의 shell에 접속할 수 있을까?

이 경우 다음 두 가지 명령을 통해 이를 수행할 수 있지만, 차이점이 존재한다.

* attach
* exec

## attach

이 명령은 현재 background로 실행 중인 컨테이너에 attach하는 명령으로 해당 컨테이너의 출력 내용등을 확인할 때 주로 사용되는데, **현재 실행 중인 컨테이너가 shell로 실행 중인 경우에 shell로 attach가 된다.**

attach를 사용하는 경우는 실행 중인 컨테이너에 별도의 shell이나 process를 실행시키는 방법이 아니기 때문에 오직 현재 실행 중인 컨테이너의 process로 attach가 된다. 때문에 현재 실행 중인 컨테이너가 shell로 실행 중이 아니라면 shell로 attach하는 것은 불가능하다.

또한, 현재 실행 중인 컨테이너의 process로 attach하는 것이기 때문에 Ctrl+c와 같은 명려으로 종료를 하는 경우 컨테이너도 함께 종료되게 되므로 종료 목적이 아니라면 Ctrl+p, Ctrl+q를 통해 detach해야한다.

다음과 같은 방식으로 attach를 수행한다.

```bash
$ docker attach <container id> or <container name>
```

## exec

이 명령은 현재 background로 실행 중인 컨테이너에 새로운 process를 실행하게 해주는 명령이다. 때문에 attach와 달리 현재 실행 중인 컨테이너가 shell로 실행중이지 않더라도 컨테이너에 shell을 실행시킬 수 있다. 때문에 실행 중인 컨테이너가 shell로 실행 중이지 않은 경우 exec 명령을 통해 해당 컨테이너에 shell을 실행 시킬 수 있다.

또한, attach와 달리 새로운 process를 실행시키는 방식이므로 Ctrl+c를 통해 빠져나와도 컨테이너가 종료되거나 하지 않는다.

다음과 같은 방식으로 shell을 실행시킨다.

```bash
$ docker exec -it <container id> or <container name> /bin/bash
```

## 참조

* [difference between docker attach and docker exec](http://stackoverflow.com/questions/30960686/difference-between-docker-attach-and-docker-exec)
* [How to restart container using container-id?](http://stackoverflow.com/questions/41539857/how-to-restart-container-using-container-id)
