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

**django-admin**은 Django의 Project를 생성하고 관리하기 위한 Command-Line 툴이다.
Django는 프로젝트를 생성할 때 **django-admin**을 사용한다. 

>$ django-admin startproject <project name> .

예를들어, study_django라는 이름으로 Django Project를 생성해보자. 

```bash
$ django-admin startproject study_django .
```

다음은 위 명령을 통해 생성한 study_django 프로젝트이다. 

```sh
|-- manage.py
`-- study_django
    |-- __init__.py
    |-- settings.py
    |-- urls.py
    `-- wsgi.py
```

django-admin command line tool(이하 django-admin)을 통해 생성 된 파일들에 대한 설명이다. 

#### manage.py

manage.py 파일은 django-admin의 명령을 위임한다. 하지만 다음 두 가지 설정을 내부적으로 처리해준다. 

1. 해당 프로젝트의 패키지들을 sys.path에 등록해준다. 
2. DJANGO_SETTINGS_MODULE environment에 해당 프로젝트의 settings.py 파일을 등록해준다. 

Django 프로젝트를 통해 서버를 실행시키거나 테스트 코드를 동작시키거나 또는 DB Sync를 하는 등의 작업을 하기 위해서는 위 작업이 선행되어야하는데 manage.py 파일은 이러한 설정을 내부적으로 처리해준다. 

따라서, django-admin의 경우 Django 프로젝트를 생성하는 단계에서 주로 사용되고, 프로젝트가 생성 된 후 django-admin의 명령을 수행할 때는 주로 manage.py를 사용하게 된다. 

예를들어, 다음과 같이 개발한 웹 서비스를 테스트하기 위해 development web server를 띄워야할 경우 django-admin을 사용하면 다음과 같이 해야한다.

```sh
$ django-admin runserver 0:<PORT> --settings=study_django.settings
```

하지만, manage.py를 사용하면 앞서와 같이 setting.py를 설정해주지 않아도 된다. 

```sh
$ django-admin runserver 0:<PORT>
```

단, manage.py의 경우 기본적으로 프로젝트의 settings.py를 DJANGO_SETTINGS_MODULE 환경변수에 설정해서 사용하기 때문에, 다중 설정파일을 관리하는 경우는 django-admin 명령과 --settings 옵션을 사용해야한다. 

#### settings.py

해당 Django 프로젝트를 통해 생성되는 웹 서비스의 설정을 담고 있다. 

다양한 환경을 위한 설정 파일 관리방법에 대해서는 다음 링크를 참조하자.

[How to manage settings.py for multiple environment](https://github.com/greenfrog82/study/tree/master/python/Django/manage_settings_multiple_env#how-to-manage-settingspy-for-multiple-environment)

#### urls.py

해당 Django 프로젝트를 통해 생성된 웹 서비스가 제공하는 서비스와 이를 호출하기 위한 URL의 맵핑정보가 담겨있다. 

#### wsgi.py

Apache 또는 nginx와 같이 WSGI를 지원하는 웹서버와 Django web applicaiton을 연동하기 위한 정보가 담겨있다. 






## Reference

* [Your first Django project!
](https://tutorial.djangogirls.org/en/django_start_project/)
* [django-admin and manage.py](django-admin and manage.py)