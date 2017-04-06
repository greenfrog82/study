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


## Container 삭제하기




## 참조

* Using Docker O'RELLY
