# How to Layout Django Projects

Djagno 2.x 버전에서의 Django Project 구조

```bash
.
|-- manage.py
|-- my_app
|   |-- __init__.py
|   |-- admin.py
|   |-- apps.py
|   |-- migrations
|   |   `-- __init__.py
|   |-- models.py
|   |-- tests.py
|   `-- views.py
`-- mysite
    |-- __init__.py
    |-- __pycache__
    |   |-- __init__.cpython-35.pyc
    |   `-- settings.cpython-35.pyc
    |-- settings.py
    |-- urls.py
    `-- wsgi.py`
```

책에서 추천하는 Django Project 구조

```
<repository_root>/
    <django_project_root>/
        <configuration_root>/>
```

### Top Level: repository_root

repository_root는 프로젝트의 실질적인 root directory로 django_project_root이외에도 readme.md, requirements.txt, .gitignore 그리고 배포를 위해 요구되는 파일들이 존재한다. 

**CHECK**

우리같은 경우 책과같이 repository_root 경로가 분리되어 있다. 하지만, 일부 배포에 필요한 파일들이 django_project_root에 있는듯 책과는 형태가 좀 차이가 있는듯하다. 
-- 우리같은 경우 fablic 파일이 프로젝트 경로에 존재하고 doc이나 배포파일등은 어디서 관리하는지 보이지 않는다.

**Info**

pip-env는 npm과 같이 패키지를 사용하게 해준다.  
pip-env을 사용할 때도 repository_root가 분리되어 있을 때 

### Second Level: django_project_root

django-admin.py startproject를 통해 생성되는 실제 Djandgo Project 경로

### Third Level: configuration_root

django-admin.py startproject를 통해 생성되었던 경로로 settings.py, urls.py, wsgi.py 등의 파일들을 포함하고 있다.  
위 프로젝트 디렉토리 구조에서 다음 부분이 이에 해당.

```bash
`-- mysite
    |-- __init__.py
    |-- __pycache__
    |   |-- __init__.cpython-35.pyc
    |   `-- settings.cpython-35.pyc
    |-- settings.py
    |-- urls.py
    `-- wsgi.py`
```

## 3.3 Sample Project Layout

repository_root경로의 존재에 대해서는 전적으로 동의.

**CHECK**

* django_project_root 경로의 templates/ 경로의 의미는 알겠는, 이렇게 templates 파일을 관리하는 경우가 있는가?
  * 공통 템플릿 사용 시
* config/의 경우 일반적으로 django-admin.py를 통해 프로젝트를 생성하면, 프로젝트 명과 동일하게 경로가 생성되는데 이 이름을 이런식으로 바꿔서 사용하라는건가? 아니면 프로젝트 생성 시 해당 이름을 정해줄 수 있는건가? 
  이건 보니까 뒤에 [cookiecutter-django](https://github.com/pydanny/cookiecutter-django)와 같이 django-admin의 startproject를 customize해서 
  경로명을 저런식으로 처리하는 것 같음.
  config/ rename 시켜서 configuration 경로를 명시적으로

## 3.4 What About the Virtualenv?

앞서 소개했던 프로젝트 디렉토리에서 Virtualenv에 대한 디렉토리가 보이지 않는데 이는 의도된것이다.  
모든 Python Project의 virtualenv들이 관리될 수 있도록 경로가 분리되는 것이 좋다.  

```bash
˜/repository_projects/django_project/
˜/.envs/django_project/
```

or virtualenvwrapper를 사용하고 있다면,

```bash
˜/repository_projects/django_project/
˜/.virtualenvs/django_project/
```

virtualenv 경로를 VCS에서 관리할 필요가 없는데 이는 *requirements.txt*파일에 해당 환경에서 사용 될 라이브러리들이 명시되어 있기 때문이다. 따라서 *requirements.txt*만 VCS에서 관리되면 된다.  

**CHECK**

우리 virtualenv의 경우 이러한 형태로 관리되고 있는지 확인해볼 것.
우리 virtualenv는 책과 같이 분리되어있음.

* pyenv를 관련 내용 확인 해보자.
  * 장점과 단점
  * 일단 장점은 여러버전의 Python을 사용할 수 있다. 
  * 운영적인 관점에 서버가 죽을 수 있다는 가정을 운영한다면 virtualenv같은 세세한 설정은 필요없을 수 있다.
* PYthon3.4과 Python3.6가 뭔지 모르는 문제가 있다. 이러한 문제로 충돌이라고 생각된다.


### TIP: Listing Current Dependencies

내가 사용하고 있는 virtualenv에서 사용되고 있는 라이브러리들의 version을 확인하고 싶으면 다음 명령을 사용하자.

```bash
$ pip freeze --local
```

## 3.5 Going Beyond startproject

startproject를 통해 Django Project를 생성하면 현업에서 프로젝트를 관리하기가 복잡해진다고 해서 [Cookiecutter](https://cookiecutter.readthedocs.io/en/latest/)를 소개하고 있다.  

**CHECK**

어떤면에서 Django의 default 프로젝트 구조가 복잡해진다는거지?

### 3.5.2 Our Favorite Project Template

[cookiecutter-django](https://github.com/pydanny/cookiecutter-django)를 통해 Django Project를 생성하려면 [Cookiecutter](https://cookiecutter.readthedocs.io/en/latest/installation.html)가 설치되어 있어야한다.  
다음 명령을 통해 `Cookiecutter`를 설치하도록 하자. 

```bash
$ brew install cookiecutter
or
$ apt-get install cookiecutter
```

이제 `cookiecutter-django`을 통해 프로젝트를 생성해보자. 

```bash
$ cookiecutter https://github.com/pydanny/cookiecutter-django
Cloning into 'cookiecutter-django'...
remote: Enumerating objects: 7, done.
remote: Counting objects: 100% (7/7), done.
remote: Compressing objects: 100% (7/7), done.
remote: Total 13055 (delta 0), reused 0 (delta 0), pack-reused 13048
Receiving objects: 100% (13055/13055), 3.83 MiB | 2.00 MiB/s, done.
Resolving deltas: 100% (8285/8285), done.
Checking connectivity... done.
project_name [My Awesome Project]: cookiecutter-django-icecream
project_slug [cookiecutter_django_icecream]:
description [Behold My Awesome Project!]:
author_name [Daniel Roy Greenfeld]:
domain_name [example.com]:
email [daniel-roy-greenfeld@example.com]:
version [0.1.0]:
Select open_source_license:
1 - MIT
2 - BSD
3 - GPLv3
4 - Apache Software License 2.0
5 - Not open source
Choose from 1, 2, 3, 4, 5 [1]:
timezone [UTC]:
windows [n]:
use_pycharm [n]: yes
use_docker [n]: yes
Select postgresql_version:
1 - 10.4
2 - 10.3
3 - 10.2
4 - 10.1
5 - 9.6
6 - 9.5
7 - 9.4
8 - 9.3
Choose from 1, 2, 3, 4, 5, 6, 7, 8 [1]: 5
Select js_task_runner:
1 - None
2 - Gulp
Choose from 1, 2 [1]:
custom_bootstrap_compilation [n]:
use_compressor [n]:
use_celery [n]:
use_mailhog [n]:
use_sentry [n]:
use_whitenoise [n]:
use_heroku [n]:
use_travisci [n]:
keep_local_envs_in_vcs [y]:
debug [n]:
Traceback (most recent call last):
  File "/usr/bin/cookiecutter", line 9, in <module>
    load_entry_point('cookiecutter==1.3.0', 'console_scripts', 'cookiecutter')()
  File "/usr/local/lib/python2.7/dist-packages/click/core.py", line 722, in __call__
    return self.main(*args, **kwargs)
  File "/usr/local/lib/python2.7/dist-packages/click/core.py", line 697, in main
    rv = self.invoke(ctx)
  File "/usr/local/lib/python2.7/dist-packages/click/core.py", line 895, in invoke
    return ctx.invoke(self.callback, **ctx.params)
  File "/usr/local/lib/python2.7/dist-packages/click/core.py", line 535, in invoke
    return callback(*args, **kwargs)
  File "/usr/lib/python2.7/dist-packages/cookiecutter/cli.py", line 100, in main
    config_file=user_config
  File "/usr/lib/python2.7/dist-packages/cookiecutter/main.py", line 140, in cookiecutter
    output_dir=output_dir
  File "/usr/lib/python2.7/dist-packages/cookiecutter/generate.py", line 327, in generate_files
    generate_file(project_dir, infile, context, env)
  File "/usr/lib/python2.7/dist-packages/cookiecutter/generate.py", line 167, in generate_file
    tmpl = env.get_template(infile_fwd_slashes)
  File "/usr/local/lib/python2.7/dist-packages/jinja2/environment.py", line 830, in get_template
    return self._load_template(name, self.make_globals(globals))
  File "/usr/local/lib/python2.7/dist-packages/jinja2/environment.py", line 804, in _load_template
    template = self.loader.load(self, name, globals)
  File "/usr/local/lib/python2.7/dist-packages/jinja2/loaders.py", line 125, in load
    code = environment.compile(source, name, filename)
  File "/usr/local/lib/python2.7/dist-packages/jinja2/environment.py", line 591, in compile
    self.handle_exception(exc_info, source_hint=source_hint)
  File "/usr/local/lib/python2.7/dist-packages/jinja2/environment.py", line 780, in handle_exception
    reraise(exc_type, exc_value, tb)
  File "./LICENSE", line 3, in template
jinja2.exceptions.TemplateSyntaxError: Encountered unknown tag 'now'. Jinja was looking for the following tags: 'elif' or 'else' or 'endif'. The innermost block that needs to be closed is 'if'.
  File "./LICENSE", line 3
    Copyright (c) {% now 'utc', '%Y' %}, {{ cookiecutter.author_name }}
```

에러가 왜 발생했는지는 좀 확인해봐야할 것 같고, 위 명령을 통해 다음과 같이 프로젝트가 생성되었다.   

```bash
cookiecutter_django_icecream/
|-- CONTRIBUTORS.txt
|-- COPYING
|-- README.rst
|-- compose
|-- config
|-- cookiecutter_django_icecream
|-- docs
|-- local.yml
|-- locale
|-- manage.py
|-- production.yml
|-- requirements
|-- runtime.txt
`-- utility
```

## 3.6 Summary

프로젝트의 레이아웃은 프로젝트의 규모와 성격에 따라 달라질 수 있다. 어떤 프로젝트 레이아웃을 선택했던간에 중요한것은 이것이 명확하게 문서화되는것이다.

## TODO

* 금일 스터디 내용 정리
* pyenv 관련 내용 정리

# Reference

* [Cookiecutter](https://cookiecutter.readthedocs.io/en/latest/)
* [cookiecutter-django](https://github.com/pydanny/cookiecutter-django)