# Docker 기본 명령어 정리

## Docker Hub에서 Image 다운로드 받기

필요한 이미지를 다운로드하기 위해서는 Docker Hub에서 이미지를 검색한 후 다음 명령을 통해 다운로드 한다.

#### 명령

```
$ docker pull <package name>
```

위 명령을 통해 mint linux를 설치해보자.

```
$ docker pull vcatechnology/linux-min
```

#### 실행 결과

```bash
greenfrog@greenfrogui-MacBook-Pro ~/develop/study (master) $ docker pull vcatechnology/linux-mint
Using default tag: latest
latest: Pulling from vcatechnology/linux-mint
d54efb8db41d: Already exists
f8b845f45a87: Already exists
e8db7bf7c39f: Already exists
9654c40e9079: Already exists
6d9ef359eaaa: Already exists
478025eb0391: Pull complete
5a24f0b37218: Pull complete
d57479091c12: Pull complete
8632e3367933: Pull complete
21bc71aeba9d: Pull complete
63ac58f9e603: Pull complete
76cdcd2315be: Pull complete
ac2deae08a59: Pull complete
Digest: sha256:5fee7b4393c4a20ad3794aa6b9fd422a67c2e56a349346d21ad5d1a63b6f9b09
Status: Downloaded newer image for vcatechnology/linux-mint:latest
```

## Image 확인하기

#### 명령

```
$ docker images
```

#### 실행 결과

```bash
greenfrog@greenfrogui-MacBook-Pro ~/develop/study (master) $ docker images
REPOSITORY               TAG                 IMAGE ID            CREATED             SIZE
mysql                    latest              9546ca122d3a        6 days ago          407 MB
identidock               latest              ef26e9689836        9 days ago          698 MB
test/cowsay-dockerfile   latest              c22962607e40        10 days ago         128 MB
python                   3.4                 c588c14f484e        2 weeks ago         685 MB
node                     latest              fe34ff26547c        2 weeks ago         666 MB
redis                    latest              83d6014ac5c8        2 weeks ago         184 MB
debian                   wheezy              69e388a5985c        2 weeks ago         85.3 MB
debian                   latest              8cedef9d7368        2 weeks ago         123 MB
ubuntu                   latest              0ef2e08ed3fa        5 weeks ago         130 MB
```

## Image 실행하기

docker의 이미지는 용도에 따라서 실행하는 방법이 다양하다. 여기서는 간단한 내용만 살펴보자.

* 쉘 커맨드로 실행하기
* Background로 실행하기
* 다른 Container와 link해서 실행하기
* Volume을 이용해서 Host의 데이터 공유하기

### 쉘 커맨드로 실행하기

#### 명령

다음 명령은 container와 terminal을 통해서 interaction을 할 수 있는 실행방법으로 위 명령을 통해 Image를 실행시키면 Image의 /bin/bash 실행과 함께 container의 terminal이 실행된다.

참고로 --name 옵션은 실행 된 Container를 구분하기 쉽게 하기 위한것으로 필수 옵션은 아니다. 따라서, 다음 설명부터는 빼고 설명하도록 한다.

```
$ docker run -it --name <container name> <image name> /bin/bash
```

위 명령을 통해 ubuntu Image를 실행시켜보자.

#### 실행 결과

```bash
greenfrog@greenfrogui-MacBook-Pro ~/develop/study (master) $ docker run -it --name ubuntu_test_by_greenfrog ubuntu /bin/bash
root@a235cb9f8dba:/# ls -a
.  ..  .dockerenv  bin  boot  dev  etc  home  lib  lib64  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
root@a235cb9f8dba:/# exit
```

### Background로 실행하기

#### 명령

다음 명령을 사용하면 container를 background로 실행시킬 수 있으며, docker로 실행하는 거의 대부분의 image들은 다음 명령을 통해 실행 될 것이다.

```
$ docker run -d <image name>
```

위 명령을 통해 redis image를 실행시켜보자.

#### 실행 결과

```bash
greenfrog@greenfrogui-MacBook-Pro ~/develop/study (master) $ docker run --name redis_test_by_greenfrog -d redis
759136ef29b4166b2119b6795a5662738dc20c7cc426df6c96e25169522ddc66

greenfrog@greenfrogui-MacBook-Pro ~/develop/study (master) $ docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS               NAMES
759136ef29b4        redis               "docker-entrypoint..."   7 days ago          Up 37 seconds       6379/tcp            redis_test_by_greenfrog
```

### 다른 container와 link하여 실행하기

#### 명령

다음 명령을 사용하면 다른 container와 link를 할 수 있는데 link를 한다는 것은 네트워크를 통해 다른 container가 제공하는 서비스를 이용하는 것을 이야기한다.
예를들어, 앞서 background로 실행시켜 놓은 redis에 접근하여 데이터에 액세스 하기 위해서는 클라이언트 프로그램이 필요한데, 이를 호스트 컴퓨터에 설치할 수 도 있겠지만, 그렇게 하지 않고 또 다른 redis image를 실행시킬 때 이미 background로 실행시켜 놓은 redis와 link 시킨 후 해당 container에서 redis에 액세스하는 방법을 사용할 수 있다.

다음 명령을 통해 기존 container와 link된 container를 생성할 수 있다.

```
$ docker run --link <target container name or id>:<host name> <image name> /bin/bash
```

위 명령을 통해 redis-cli를 실행하여 redis에 데이터를 쓰고 읽어보자.

#### 실행 결과

```bash
greenfrog@greenfrogui-MacBook-Pro ~/develop/study (master) $ docker run -it --name g_redis_client --link redis_test_by_greenfrog:redis redis /bin/bash
root@59fc71375a97:/data# redis-cli -h redis -p 6379
redis:6379> set "test" 100
OK
redis:6379> get "test"
"100"
```

#### Volume을 이용해서 Host의 데이터 공유하기

volume을 이용하면 host의 데이터를 실시간으로 공유할 수 있다. 이 기능은 container에서 돌아가고 있는 DB이 데이터를 host로 백업하거나, 소프트웨어를 개발하는 경우 소스코드는 개발툴이 접근할 수 있는 host에 두고 이를 개발환경이 존재하는 container와 공유하는 방법으로 활용할 수 있다.

다음 명령을 통해 volume을 사용할 수 있다.

```
$ docker run -w <working path of container> -v <path of host>:<working path of container>
```

위 명령에서 -w 옵션은 해당 컨테이너의 working directory를 지정하는 것인데, 리눅스 파일 시스템의 어떤 경로든 가능하며 만약 지정한 경로가 존재하지 않으면 생성해준다.
-v 옵션이 바로 volume을 지정하는 옵션인데, <path of host>는 container와 공유할 경로를 입력하면 되며, <working path of container>는 앞서 지정한 working directory를 container에서 접근하기 위한 경로를 지정하는 것인데 -w로 지정했던 경로와 같은 경로를 지정해주면된다.

예를들어, host의 'node_test'라는 경로에 다음과 같은 파일들이 존재한다고 하자.

```bash
greenfrog@greenfrogui-MacBook-Pro ~/develop/docker_temp/node_test $ ll
total 8
drwxr-xr-x   4 greenfrog  staff   136  4  7 23:43 .
drwxr-xr-x   5 greenfrog  staff   170  4  7 23:28 ..
-rw-r--r--@  1 greenfrog  staff    70  4  7 23:41 example.js
drwxr-xr-x  46 greenfrog  staff  1564  4  7 23:43 node_modules
```

위 경로를 volume을 통해 container와 연결해보자.

```bash
greenfrog@greenfrogui-MacBook-Pro ~/develop/docker_temp/node_test $ docker run -it -w /app -v "$(pwd)":/app node /bin/bash
```

위 명령을 수행한 후 container에서 /app 경로에 가보면 host와 동일한 파일들이 존재하는 것을 확인 할 수 있으며, host에서 해당 경로의 파일들을 수정하면 container에 바로 반영이 되며 반대의 경우도 마찬가지이다.

이를 통해 개발 툴과 소스는 host에 두고 개발환경은 docker에 구축한다거나, mysql과 같은 container의 데이터를 host로 백업하는 등으로 응용이 가능하다.

## 실행 중인 container 중지하기

다음 명령을 통해 현재 실행 중인 container를 중지시킬 수 있다.

```bash
docker stop <container id> or <container name>
```

## 중지 된 container 다시 시작 시키기

다음 명령을 통해 중지 된 container를 다시 시작 시킬 수 있다.

```bash
docker start <container id> or <container name>
```

## 실행 중인 container 재시작하기

다음 명령을 통해 현재 실행 중인 container를 재시작 시킬 수 있는데, stop 명령 후 start 명령을 하는 것과 같은 효과이다.

```bash
docker restart <container id> or <container name>
```

## Container 삭제하기

#### 기본적인 방법

container를 삭제하는 가장 기본적인 방법은 다음 명령을 사용하는 것이다.
-v 옵션은 현재 docker가 관리중이냐 volume도 함꼐 삭제하는데, 단 다른 container가 참조하고 있지 않는 volume이어야한다.  

```bash
$ docker rm -v <container id> or <container name>
```

위 명령을 사용할떄 주의할 점은 반드시 container가 종료된 상태여야한다는 것이다. 만약, 현재 실행 중인 상태의 container를 삭제하려고 하면 다음과 같은 메시지가 출력되고 삭제는 되지 않는다.

```
Error response from daemon: You cannot remove a running container cb51fb423f6e322a7481a696de0b583c89768dbb8cf827a3d927e7587b20379d. Stop the container before attempting removal or use -f
```

단, 위 메시지에 나온 것과 같이 -f 옵션을 사용하면 실행 중인 container 역시 삭제 가능하다.

#### 현재 실행 중인 모든 container 삭제하기

다음 명령을 통해 현재 실행 중인 모든 container를 삭제할 수 있다.
실행 중인 container를 삭제해야하기 떄문에 -f 옵션을 사용했으며, 현재 실행 중인 모든 container의 아이디들을 얻기 위해 sub-command에서 ps -q 옵션을 사용하였다.
ps는 현재 실행 중인 container 만을 출력하고, -q 옵션은 해당 container의 id만을 출력해준다.

```bash
docker rm -vf $(docker ps -q)
```

#### 현재 종료 된 모든 container 삭제하기

다음 명령을 통해 현재 종료 된 모든 container를 삭제할 수 있다.
sub-command를 통해 종료 된 모든 container의 id를 추출해 낸 후 rm 명령을 통해 삭제한다. sub-command에서 종료 된 container를 찾기 위해서 -f 옵션을 통해 status가 exited인 상태의 container만을 필터링했다.

```bash
docker rm -v $(docker ps -aq -f status=exited)
```

#### 현재 실행 중이거나 종료 된 모든 container 삭제하기

다음 명령을 통해 모든 container를 삭제할 수 있다.
sub-command를 통해 모든 container의 id를 검색한 후 rm 명령을 통해 삭제하였다.

```bash
docker rm -vf $(docker ps -aq)
```

## 참조

* Using Docker O'RELLY
