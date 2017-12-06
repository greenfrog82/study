# Utility Command

Docker를 사용하면서 유용하게 사용할 수 있는 Utility Command를 소개한다. 

## Deleting <none> images

Docker-Compose를 통해 Image를 빌드할 때, 에러가 나는 경우 다음과 같이 <none> 이미지가 생성되는 경우가 있다. 

```
REPOSITORY                  TAG                 IMAGE ID            CREATED             SIZE
django_dev                  1.0.0               2aaa3d7952c0        2 hours ago         717MB
celery_sdy                  0.0.1               627b319a4ff1        2 weeks ago         569MB
<none>                      <none>              29ad8368ff54        2 weeks ago         569MB
<none>                      <none>              ba08ee4b2e0c        2 weeks ago         522MB
<none>                      <none>              a7e4ca2721ad        3 weeks ago         560MB
<none>                      <none>              ed7737fe2d40        3 weeks ago         560MB
<none>                      <none>              f54faf9d5f51        3 weeks ago         562MB
ubuntu                      17.10               79dbcfa8f169        4 weeks ago         93.8MB
algorithm                   1.0.0               69f738b802cc        6 weeks ago         603MB
django_in_apache_mod_wsgi   1.0.0               69f738b802cc        6 weeks ago         603MB
ubuntu                      16.04               ccc7a11d65b1        3 months ago        120MB
```

<none> 이미지가 한두개 일때는 문제가 되지 않지만 관리를 소홀히하는 사이 위와 같이 여러개가 생성되어 있으면 지우는 것도 일이다. 
이러한 경우 다음 명령을 통해 한꺼번에 정리를 할 수 있다. 

> $ docker rmi $(docker images | grep none | tr -s " " | cut -d " " -f3)

다음은 위 명령을 통해 앞서 확인했던 <none> 이미지들을 한번에 삭제한것이다. 

```bash
greenfrog@greenfrogui-MacBook-Pro ~/develop/study (master) $ docker rmi $(sudo docker images | grep none | tr -s " " | cut -d " " -f3)
Deleted: sha256:29ad8368ff5456d33416c33734542faf9432e494a5f550ab9635ed256c126d8c
Deleted: sha256:255ed57244ec24b7fcf2bfa213d1541d29bcb62e231b2c91d6924fe5ed5aaf60
Deleted: sha256:a7e4ca2721ad5808374a991bd0fe9ab03b64613c7d95e5f8ae007c72adee145b
Deleted: sha256:4bf4dd97ff446fb84d46961fcac1f05ecc1219d5ff80be9a798dc387d8247d71
Deleted: sha256:ed7737fe2d408f24eec5e077366076bda4dacaab7f7f427a71d2d4285afe7159
Deleted: sha256:44990379079cbe33bbf8c0e2af689830ef3a0db839f71cbef0927386b1a3b71b
Deleted: sha256:f54faf9d5f51221a45f5c0b4bb0394bccfc13d26c673065860e0fc38d4e5cd8b
Deleted: sha256:4459a7b8456acfc0b328e5a239f1cab19b2d075f11da8fc6ae25537c1caa277d
```

이 명령의 경우 ~/.bash_profile (리눅스의 경우 ~/.bashrc) 파일에 alias로 작성해서 사용하면 편리하다. 

```sh
alias dk_rmi_none='sudo docker rmi $(sudo docker images | grep none | tr -s " " | cut -d " " -f3)
```

## Deleting specific containers 

Container 목록을 중 특정 상태 또는 특정 제목등이 들어가는 Container들을 삭제할 때 하나하나 지우는 것은 역시 번거로운 작업이 될 것이다. 
이러한 경우 다음 명령을 통해 삭제하고자 하는 Container들을 모두 검색해서 한번에 삭제할 수 있다.

> $ docker rm $(docker ps -a | grep <keyword> | tr -s " " | cut -d " " -f1)

위 명령에서 <keyword>에 삭제하고자하는 Container의 이름 또는 상태등을 입력해주면 된다. 
예를들어 다음 Container 목록에서 Exited 상태의 Container를 위 명령을 통해 한번에 삭제해보자. 

```bash
greenfrog@greenfrogui-MacBook-Pro ~/develop/study (master) $ docker ps -a
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                     PORTS                                        NAMES
47e2a33809ef        django_dev:1.0.0    "/bin/bash"              2 hours ago         Up 2 hours                 0.0.0.0:80->80/tcp, 0.0.0.0:8080->8080/tcp   django_django_in_amw_1
c962054c1e3a        034b59093b17        "/bin/sh -c 'pip i..."   3 hours ago         Exited (2) 3 hours ago                                                  hungry_lamarr
5e379e8b8b25        2110d45dff5f        "/bin/sh -c 'apt-g..."   4 hours ago         Exited (100) 4 hours ago                                                pedantic_raman
49883bae8dcb        2110d45dff5f        "/bin/sh -c 'apt-g..."   4 hours ago         Exited (100) 4 hours ago                                                hardcore_ptolemy
055113dd542d        celery_sdy:0.0.1    "/bin/bash"              2 weeks ago         Exited (0) 4 days ago                                                   celerywithdjango_celery_sdy_1
c6ccb91c8d1b        ba08ee4b2e0c        "/bin/sh -c 'pip i..."   2 weeks ago         Exited (1) 2 weeks ago                                                  affectionate_blackwell
fcb8035403c6        dedea898cd86        "/bin/sh -c 'pip i..."   2 weeks ago         Exited (1) 2 weeks ago                                                  vigilant_noether
6fcc1492d88a        2110d45dff5f        "/bin/sh -c 'apt-g..."   3 weeks ago         Exited (100) 3 weeks ago                                                modest_mcclintock
f005edede1dc        2110d45dff5f        "/bin/sh -c 'apt-g..."   3 weeks ago         Exited (100) 3 weeks ago                                                sharp_noether
cbd67ef695d1        ccc7a11d65b1        "/bin/sh -c 'apt-g..."   3 weeks ago         Exited (100) 3 weeks ago                                                unruffled_payne
cf1a3932c263        2110d45dff5f        "/bin/sh -c 'apt-g..."   3 weeks ago         Exited (100) 3 weeks ago                                                awesome_nightingale
dcc326bbd976        2110d45dff5f        "/bin/sh -c 'apt-g..."   3 weeks ago         Exited (100) 3 weeks ago                                                elegant_poitras
```

다음과 같이 <keyword>에 Exited를 입력하고 명령을 실행하였다. 

```bash
greenfrog@greenfrogui-MacBook-Pro ~/develop/study (master) $ docker rm $(docker ps -a | grep Exited | tr -s " " | cut -d " " -f1)
c962054c1e3a
5e379e8b8b25
49883bae8dcb
055113dd542d
c6ccb91c8d1b
fcb8035403c6
6fcc1492d88a
f005edede1dc
cbd67ef695d1
cf1a3932c263
dcc326bbd976
greenfrog@greenfrogui-MacBook-Pro ~/develop/study (master) $ docker ps -a
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS                                        NAMES
47e2a33809ef        django_dev:1.0.0    "/bin/bash"         3 hours ago         Up 3 hours          0.0.0.0:80->80/tcp, 0.0.0.0:8080->8080/tcp   django_django_in_amw_1
```

이 명령 역시 ~/.bash_profile (리눅스의 경우 ~/.bashrc) 파일에 작성해서 사용하면 편리하다. 
하지만 이 명령의 경우 <keyword>에 대한 parameter를 전달받아야 하므로 함수로 작성해서 사용하도록 하자.

```sh
dk_rm() {
    docker rm $(sudo docker ps -a | grep "$1" | tr -s " " | cut -d " " -f1)
}
```
