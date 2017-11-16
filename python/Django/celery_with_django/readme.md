# Django에서 celery 사용하기

## Celery Architecture

## Issues

### ImportError: cannot import name _uuid_generate_random

Celery 관련 예제 프로젝트를 [Asynchronous Tasks With Django and Celery](https://realpython.com/blog/python/asynchronous-tasks-with-django-and-celery/)에서 가져와서 개발환경을 구축하였다. 

Django Application을 실행하기 위해 runserver 실행 시 다음과 같은 오류가 발생하였다.

```bash
root@96c9f352f129:/develop# python manage.py runserver 0:7777
Traceback (most recent call last):
  File "manage.py", line 10, in <module>
    execute_from_command_line(sys.argv)
  File "/usr/local/lib/python2.7/dist-packages/django/core/management/__init__.py", line 338, in execute_from_command_line
    utility.execute()
  File "/usr/local/lib/python2.7/dist-packages/django/core/management/__init__.py", line 303, in execute
    settings.INSTALLED_APPS
  File "/usr/local/lib/python2.7/dist-packages/django/conf/__init__.py", line 48, in __getattr__
    self._setup(name)
  File "/usr/local/lib/python2.7/dist-packages/django/conf/__init__.py", line 44, in _setup
    self._wrapped = Settings(settings_module)
  File "/usr/local/lib/python2.7/dist-packages/django/conf/__init__.py", line 92, in __init__
    mod = importlib.import_module(self.SETTINGS_MODULE)
  File "/usr/lib/python2.7/importlib/__init__.py", line 37, in import_module
    __import__(name)
  File "/develop/picha/__init__.py", line 5, in <module>
    from .celery import app as celery_app
  File "/develop/picha/celery.py", line 3, in <module>
    from celery import Celery
  File "/usr/local/lib/python2.7/dist-packages/celery/__init__.py", line 130, in <module>
    from celery import five
  File "/usr/local/lib/python2.7/dist-packages/celery/five.py", line 149, in <module>
    from kombu.utils.compat import OrderedDict  # noqa
  File "/usr/local/lib/python2.7/dist-packages/kombu/utils/__init__.py", line 19, in <module>
    from uuid import UUID, uuid4 as _uuid4, _uuid_generate_random
ImportError: cannot import name _uuid_generate_random
```

해당 문제를 해결하는 방법은 StackOverflow의 [Cannot import name _uuid_generate_random in heroku django](https://stackoverflow.com/questions/34198538/cannot-import-name-uuid-generate-random-in-heroku-django)에 따라 Kombu 라이브러리의 버전을 3.0.30으로 변경해주면 된다. 

## Reference

* [Asynchronous Tasks With Django and Celery](https://realpython.com/blog/python/asynchronous-tasks-with-django-and-celery/)