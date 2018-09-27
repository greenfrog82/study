# Django Custom Management Commands

`python3` `Django2.x`

Django는 `django-admin.py` 또는 `manage.py`를 통해 다양한 Django의 command line 툴(Django Management Commands)들을 사용할 수 있다.  
이러한 Management Command들은 Terminal의 command line 또는 Cron Job에 등록하여 Django application과 interaction을 할 때 편리함을 제공한다.  
더 좋은 것은 이러한 Management Command를 개발자가 개발해서 사용할 수 있는데 이를 `Django Custom Management Command(이하 CC)`라고 한다. 

이와 같이 CC를 작성하였을 때, **일반적인 Python Script를 작성할 때와의 차이점 또는 이점은 Django의 기능과 Django Applicaiton에 정의 된 모델, 클래스, 함수 등 모든 리소스를 사용할 수 있다는 것이다.**  

이러한 CC는 app directory의 **management/commands** 경로에 위치한다.  

```
mysite                                  <-- Project directory
|-- core                                <-- App directory
|   |-- __init__.py
|   |-- admin.py
|   |-- apps.py
|   |-- management
|   |   `-- commands
|   |       `-- my_custom_command.py    <-- Django Custom Management Command
|   |-- migrations
|   |   `-- __init__.py
|   |-- models.py
|   |-- tests.py
|   `-- views.py
|-- manage.py
`-- mysite
    |-- __init__.py
    |-- settings.py
    |-- urls.py
    `-- wsgi.py
```

CC는 다음 명령을 통해 실행 할 수 있다. 

>$ python3 manage.py <custom command name>

위 명령을 통해 앞서 작성한 CC를 실행해 보면 다음과 같다.  

>$ python3 manage.py my_custom_command

## Basic Example

현재 시간을 출력하는 간단한 CC를 작성해보자.  

[What time is it?](./mysite/core/management/commands/what_time_is_it.py)
```python
from django.core.management.base import BaseCommand
from django.utils import timezone


class Command(BaseCommand):
    help = 'Displays current time'

    def handle(self, *args, **kwargs):
        time = timezone.now().strftime('%X')
        self.stdout.write("It's now %s" % time)
```

다음은 위 CC의 실행 결과이다. 

```bash
$ python3 manage.py what_time_is_it
It's now 00:12:35
```

CC는 앞서 예제를 통해 본 것과 같이 `django.core.management.base 모듈`의 `BaseCommand`를 상속해서 작성되며, `handle`메소드를 override해서 CC의 동작을 정의한다.  
`help`변수를 정의한 경우 다음 명령을 실행시키면 해당 CC에 대한 도움말이 출력된다. 

```bash
$ python3 manage.py help what_time_is_it
usage: manage.py what_time_is_it [-h] [--version] [-v {0,1,2,3}]
                                 [--settings SETTINGS]
                                 [--pythonpath PYTHONPATH] [--traceback]
                                 [--no-color]

Displays current time <-- help 변수에 정의 된 해당 CC에 대한 도움말.

optional arguments:
  -h, --help            show this help message and exit
  --version             show program's version number and exit
  -v {0,1,2,3}, --verbosity {0,1,2,3}
                        Verbosity level; 0=minimal output, 1=normal output,
                        2=verbose output, 3=very verbose output
  --settings SETTINGS   The Python path to a settings module, e.g.
                        "myproject.settings.main". If this isn't provided, the
                        DJANGO_SETTINGS_MODULE environment variable will be
                        used.
  --pythonpath PYTHONPATH
                        A directory to add to the Python path, e.g.
                        "/home/djangoprojects/myproject".
  --traceback           Raise on CommandError exceptions
  --no-color            Don't colorize the command output.
```

## Handling Command Line Arguments

Django는 CC에서 command line arguments를 다루기 위해 [argparse](https://docs.python.org/3/library/argparse.html) Python standard libarary를 사용하며, `BaseCommand`의 `add_arguments`메소드 정의해야한다.


### Positional Arguments

다음 예제는 `total`이라는 argument를 전달받아 전달받은 수 만큼 임의의 사용자를 생성하는 예제이다.  

[create user with positional arguments](./mysite/core/management/commands/create_users.py)
```python
from django.contrib.auth.models import User
from django.core.management.base import BaseCommand
from django.utils.crypto import get_random_string


class Command(BaseCommand):
    help = 'Create random users'

    def add_arguments(self, parser):
        parser.add_argument('total', type=int, help='Indicates the number of users to be created')

    def handle(self, *args, **kwargs):
        total = kwargs['total']
        for i in range(total):
            User.objects.create_user(username=get_random_string(), email='', password='123')
```

`Positional Arguments`는 앞선 예제와 같이 `add_arguments`메소드를 정의하고 `parser.add_argument`를 통해 정의된다.   
`Positional Arguments`는 CC를 실행 시키기 위한 **필수** 입력 argument이다. 따라서, 실행을 위해서는 반드시 입력을 해주어야한다.   
다음과 같이 CC를 실행 시킬 때 `Positional Arguments`를 전달하지 않으면 CC의 실행이 멈추고 이를 전달하라는 메시지를 출력한다.   

```bash
$ python3 manage.py create_users
usage: manage.py create_users [-h] [--version] [-v {0,1,2,3}]
                              [--settings SETTINGS] [--pythonpath PYTHONPATH]
                              [--traceback] [--no-color]
                              total
manage.py create_users: error: the following arguments are required: total
```

다음은 `Positional Arguments`를 정상적으로 전달하여 CC를 실행시킨 결과이다.   
`total` argument로 전달한 수 만큼 임의의 사용자를 생성한 것을 알 수 있다.  

```bash
python3 manage.py shell
Python 3.5.2 (default, Nov 23 2017, 16:37:01)
[GCC 5.4.0 20160609] on linux
Type "help", "copyright", "credits" or "license" for more information.
(InteractiveConsole)
>>> from django.contrib.auth.models import User
>>> User.objects.all()
<QuerySet [<User: LAARbZrDSLWy>, <User: qLFRYV5Ijjxt>, <User: Jl78LjE1sa7n>]>
```


















# Reference

* [How to Create Custom Django Management Commands](https://simpleisbetterthancomplex.com/tutorial/2018/08/27/how-to-create-custom-django-management-commands.html)