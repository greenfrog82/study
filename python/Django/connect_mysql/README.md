# How to access mysql on host from Django application on docker container

Docker Container에서 동작 중인 Django application이 Host PC에 설치되어 있는 MySQL DB에 접속하는 방법에 대해서 설명한다.
이때, Ubuntu Linux에서의 Docker Container와 Mac에서의 Docker Container에서 접속하는 방법에 차이가 있는데 이에 대해서도 설명한다. 

#### Requirement

* Ubuntu Linux version 14.04
* Mac macOS High Sierra 10.13.1 (17B1003)
    * Docker for mac 
    * Docker CE 17.09.1-ce-mac42 (21090)
    * MySQL ver 14.14 Distrib 5.7.20, for Linux (x86_64) using  EditLine wrapper
    
## Django의 DB 설정

본 문서에서 사용 될 settings.py 파일의 DATABASES 설정은 다음과 같으며, 결국 'HOST'키에 어떤 값을 입력해주어야 하는지에 대해서 알아본다.

```python
DATABASES = {
    'default': {
        'NAME': 'household_account',
        'ENGINE':'django.db.backends.mysql',
        'USER':'root',
        'PASSWORD':'1234',
        'HOST': ??,
        'PORT':'3306'
    }
```

## Ubuntu Linux 

Django applicaiton을 담고 있는 Docker Container의 네트워크 모드에 따라서 Host PC의 MySQL Server에 접속하는 방법이 달라진다. 

### bridge mode

bridge mode를 사용하는 경우 ifconfig를 통해 출력되는 network interface들 중에서 docker0의 IP를 사용하면 된다.
docker0는 docker bridge interface의 이름인데, bridge interface가 Local PC의 127.0.0.1 IP를 가리키고 있기 때문이다. 

예를들어 ifconfg 명령을 통해 docker0의 값이 다음과 같이 출력된다면,

```sh
docker0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default
    link/ether 56:84:7a:fe:97:99 brd ff:ff:ff:ff:ff:ff
    inet 172.17.42.1/16 scope global docker0
       valid_lft forever preferred_lft forever
    inet6 fe80::5484:7aff:fefe:9799/64 scope link
       valid_lft forever preferred_lft forever
```

'HOST' 키의 값으로 172.17.42.1을 입력해주면 된다. 
다음과 같다.

```python
'HOST':'172.17.42.1' 
```

### host mode

host mode를 사용하는 경우 Docker Container는 Host PC의 Network Stack을 그대로 사용하기 때문에 127.0.0.1을 그대로 사용하면 된다. 
다음과 같다.

```python
'HOST':'127.0.0.1'
```

## Mac 

Mac에서 Docker를 사용할 때는 나는 Docker For Mac을 사용하고 있다. Docker For Mac의 경우 Hypervisor를 통해 리눅스 커널 가상머신을 올리고 그 위헤서 Docker Container가 동작하는 구조이기 때문에 앞서 Linux에서 사용한 방법을 통해 Host PC에 설치 된 MySQL Server에 접속할 수 없다. 

이를 해결하는 방법은 [Networking features in Docker for Mac](https://docs.docker.com/docker-for-mac/networking/) 사이트에 다음과 같이 소개되어 있다.

>I WANT TO CONNECT FROM A CONTAINER TO A SERVICE ON THE HOST
The Mac has a changing IP address (or none if you have no network access). From 17.06 onwards our recommendation is to connect to the special Mac-only DNS name docker.for.mac.localhost which will resolve to the internal IP address used by the host.

결국 해결 방법은 다음과 같다.

```python
'HOST':'docker.for.mac.localhost'
```

## Reference

* [From inside of a Docker container, how do I connect to the localhost of the machine?](https://stackoverflow.com/questions/24319662/from-inside-of-a-docker-container-how-do-i-connect-to-the-localhost-of-the-mach)
* [Networking features in Docker for Mac](https://docs.docker.com/docker-for-mac/networking/)