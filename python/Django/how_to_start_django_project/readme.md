# How to start Django project

Django의 프로젝트를 시작하는 방법에 대해서 알아보자.
대부분의 Django Tutorial의 Python의 [virtualenv](https://virtualenv.pypa.io/en/stable/)환경을 통해 Django 환경을 구축하는 것을 권장하지만, 본 문서의 경우 Docker를 사용하므로 이 부분은 설명하지 않는다. 

#### Requirement

* Ubuntu Linux version 17.10
* Mac macOS High Sierra 10.13.1 (17B1003)
    * Docker for mac 
    * Docker CE 17.09.1-ce-mac42 (21090)
    * MySQL ver 14.14 Distrib 5.7.20, for Linux (x86_64) using  EditLine wrapper
* Python 2.7
* Django 1.11.5

## Creating Django Project

다음 명령을 통해 Django Project를 생성한다. 

>$ django-admin startproject <project name> .

예를들어, study_django라는 이름으로 Django Project를 생성해보자. 

```bash
$ djang-admin startproject study_django .
```



## Reference

* [Your first Django project!
](https://tutorial.djangogirls.org/en/django_start_project/)