# 특정 소켓을 사용하는 프로세스 강제 종료 시키기

## fuser에 대해서

fuser는 파일 시스템 또는 소켓을 이용하는 프로세스를 찾는 커맨드 라인 툴이다.

## 개발 환경
Ubuntu 14.04
PyCharm 2016.3.2
Python 3.4
Django 1.10.5

## 상황

Django 튜토리얼 따라 하던 중 Pycharm의 'Run Manage.py as Task' 화면이 닫히는 바람에 다시 해당 화면을 열고 runserver명령을 날렸더니 다음과 같은 에러가 발생하였다.

> Error: That port is already is use.

## 해결

따라서, 이 문제를 해결하기 위해 fuser를 통해 8000번 포트(Django 튜토리얼을 통해 개발 중인 웹 어플리케이션의 서버 포트)를 사용하는 프로세스를 강제 종료 시켰다.

> sudo fuser -k 8000/tcp

## 참조

* [fuser(1) - Linux man page](https://linux.die.net/man/1/fuser)
* [Error: That port is already in use.](http://stackoverflow.com/questions/20239232/error-that-port-is-already-in-use)
