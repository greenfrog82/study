# How to use docker command without sudo

Linux에서 Docker를 설치하면 sudo를 사용해야하는데 여간 불편한게 아니다. 
따라서, sudo를 사용하지 않고 Docker를 사용하는 방법과 주의사항에 대해서 알아본다. 

#### Requirement

* Ubuntu Linux 16.04
* Docker version 17.12.0-ce, build c97c6d6
* docker-compose version 1.18.0, build 8dd22a9

## The reason why you must use docker command with sudo

sudo명령을 사용하지 않고 docker 명령을 사용하면 다음과 같은 에러 메시지가 출력된다. 

> Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get http://%2Fvar%2Frun%2Fdocker.sock/v1.35/images/json: dial unix /var/run/docker.sock: connect: permission denied

Docker daemon이 socket에 연결하려고 하는데 권한 문제로 연결이 거절된 상황이다. 

관련해서 Docker 공식 문서 [Manage Docker as a non-root user](https://docs.docker.com/engine/installation/linux/linux-postinstall/)의 내용을 보면 다음과 같은 내용이 나온다.  

> The docker daemon binds to a Unix socket instead of a TCP port. By default that Unix socket is owned by the user root and other users can only access it using sudo. The docker daemon always runs as the root user.

위 내용 따르면, Docker를 사용하기 위해서 sudo 명령을 통해 docker command를 사용하고 있는 사용자가 root권한으로 docker 명령을 실행시켜주어야한다. 

## Using docker command without sudo 

다시 Docker 공식 문서 [Manage Docker as a non-root user](https://docs.docker.com/engine/installation/linux/linux-postinstall/)의 다음 내용을 살펴보자. 

>If you don’t want to use sudo when you use the docker command, create a Unix group called docker and add users to it. When the docker daemon starts, it makes the ownership of the Unix socket read/writable by the docker group.

문서 내용을 보면 docker daemon이 실행 될 때, 'docker' group이 존재하는 경우, 'docker' group으로 Unix socket에 대한 ownership을 만들기 때문에 docker를 사용하는 사용자들을 'docker' group에 등록해두면 sudo 명령 없이 docker command를 사용할 수 있다고 한다. 

따라서 다음과 같은 순서로 작업을 하면 sudo 명령 없이 docker command를 사용할 수 있다. 

1. docker group이 존재하지 않으면 docker 다음 명령을 통해 docker group을 생성한다. 
   > $ sudo groupadd docker  
   
   docker group의 존재여부는 다음 명령을 통해 알 수 있다. 
   > $ cut -d: -f1 /etc/group | grep docker

2. docker group에 사용자를 추가한다.
   > $ sudo usermod -aG docker $USER

3. Log out 한 후 다시 Log in하면 끝. 
   [Manage Docker as a non-root user](https://docs.docker.com/engine/installation/linux/linux-postinstall/)문서를 보면 몇가지 문제가 있어서 더 내용을 소개하고 있지만 나는 여기까지해서 정상적으로 목적을 이루었다. 

## Consideration

앞서 docker command를 사용하기 위해 docker group을 생성했는데, 이렇게 되면 docker group이 root와 같은 권한을 부여받는다고 한다. 이러한 경우 다음과 같은 security issue를 고려해야한다. 

[Docker Daemon Attack Surface](https://docs.docker.com/engine/security/security/#docker-daemon-attack-surface)

## Reference

* [Manage Docker as a non-root user](https://docs.docker.com/engine/installation/linux/linux-postinstall/)
* [How can I use docker without sudo?](https://askubuntu.com/questions/477551/how-can-i-use-docker-without-sudo)