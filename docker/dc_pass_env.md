# How to pass environment variable into docker container in docker-compose

go-lang을 공부할 일이 있어서 docker에 go-lang 개발환경을 구축하였다. 
go-lang의 설치는 우분투 배포 repository를 사용하지 않고 [Getting Started](https://golang.org/doc/install?download=go1.9.2.linux-amd64.tar.gz) Page에서 go-lang을 다운로드 받은 후 안내하고 있는 가이드대로 직접 설치하였다. 

다음은 go-lang의 설치 가이드를 발췌한 내용이다. 

> Download the archive and extract it into /usr/local, creating a Go tree in /usr/local/go. For example:
>
>tar -C /usr/local -xzf go1.9.2.linux-amd64.tar.gz
(Typically these commands must be run as root or through sudo.)
>
>Add /usr/local/go/bin to the PATH environment variable. You can do this by adding this line to your /etc/profile (for a system-wide installation) or $HOME/.profile:
>
>export PATH=$PATH:/usr/local/go/bin

위 내용을 보면 마지막에 go-lang의 bin 경로를 환경변수 PATH에 설정해주는 내용이 있다. 

따라서, docker-compose에서 환경변수를 설정하여 container에 전달하는 방법이 필요했다. 이에 대해서 알아보자.

## To set environment value into the docker conitaner

docker-compose.yml의 service를 정의하는 key들중 중에 환경변수를 전달하기 위한 'environment' key가 존재한다. 이를 통해 환경변수를 설정하여 전달할 수 있는데 위 문제를 해결하기 위해 다음과 같이하였다. 

```yml
environment:
  - PATH=$PATH:/usr/local/go/bin
```

목록 형태로 여러개의 환경변수를 정의하여 전달할 수 있다.

## Reference

* [Environment variables in Compose](https://docs.docker.com/compose/environment-variables/)