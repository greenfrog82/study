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
또한 **반드시 전달되는 순서를 지켜주어야한다**.  
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

앞선 예제에 실행 결과를 화면에 출력하는 `Positional Arguments` `print`를 추가해 보자.  

[create user with positional arguments](./mysite/core/management/commands/create_users.py)
```python
from django.contrib.auth.models import User
from django.core.management.base import BaseCommand
from django.utils.crypto import get_random_string


class Command(BaseCommand):
    help = 'Create random users'

    def add_arguments(self, parser):
        parser.add_argument('total', type=int, help='Indicates the number of users to be created')
        parser.add_argument('print', type=bool, help='Indicates print result of execution')

    def handle(self, *args, **kwargs):
        total = kwargs['total']
        print_result = kwargs['print']

        for i in range(total):
            User.objects.create_user(username=get_random_string(), email='', password='123')

        if print_result:
            self.stdout.write(str(User.objects.all().order_by('-id')[:total][::-1]))
```

이제 `Positional Arguments`의 순서를 바꿔서 전달해보자.  
다음과 같이 에러가 발생한다.

```bash
$ python3 manage.py create_users True 3
usage: manage.py create_users [-h] [--version] [-v {0,1,2,3}]
                              [--settings SETTINGS] [--pythonpath PYTHONPATH]
                              [--traceback] [--no-color]
                              total print
manage.py create_users: error: argument total: invalid int value: 'True'
```

다음은 `Positional Arguments`를 정상적으로 전달했을 때의 실행결과이다. 

```bash
$ python3 manage.py create_users 3 True
[<User: fllheo8DCEgv>, <User: ijUA1p5qoG7P>, <User: NAtD3utwg5hK>]
```

### Optional Arguments 

다음은 예제는 사용자 생성 시 임의의 사용자 이름에 prefix를 더하기 위해 `Optional Arguments`를 사용한다.  

[create user with positional arguments](./mysite/core/management/commands/create_users.py)
```python
from django.contrib.auth.models import User
from django.core.management.base import BaseCommand
from django.utils.crypto import get_random_string


class Command(BaseCommand):
    help = 'Create random users'

    def add_arguments(self, parser):
        parser.add_argument('total', type=int, help='Indicates the number of users to be created')
        parser.add_argument('print', type=bool, help='Indicates print result of execution')

        # Optional argument
        parser.add_argument('-p', '--prefix', type=str, help='Define a username prefix')

    def handle(self, *args, **kwargs):
        total = kwargs['total']
        print_result = kwargs['print']

        # Optional argument
        prefix = kwargs['prefix']

        for i in range(total):
            if prefix:
                username = '{prefix}_{random_string}'.format(prefix=prefix, random_string=get_random_string())
            else:
                username = get_random_string()

            User.objects.create_user(username=username, email='', password='123')

        if print_result:
            self.stdout.write(str(User.objects.all().order_by('-id')[:total][::-1]))
```

`Optional Arguments`는 말 그대로 전달 유무는 사용자 선택이며, 순서 역시 중요하지 않다.  
다음과 같이 `Optional Arguments`를 전달하지 않거나, `Positional Arguments`의 앞, 중간, 뒤 어디에 위치하여도 잘 동작한다.

```bash
$ python3 manage.py create_users 5 True
[<User: PSQ9z4HUMi2e>, <User: jTlTQdbLVS4L>, <User: OBBwfEMaSbE0>, <User: MHyRbNnhwwpw>, <User: CFchR0ess5Ho>]

$ python3 manage.py create_users 3 True --prefix custom_user
[<User: custom_user_T5z97id9TmRy>, <User: custom_user_XHqqFZVFmw8M>, <User: custom_user_1wl1ZjIiMNCH>]

$ python3 manage.py create_users --prefix melong 3 True
[<User: melong_sMfxxPmcrjFf>, <User: melong_mcKqtcid8cat>, <User: melong_IazKPBGEmB4K>]

$ python3 manage.py create_users 3 --prefix hoho True
[<User: hoho_8F9ptAqZYt6j>, <User: hoho_nCNeosIlHazs>, <User: hoho_C6i2aTiTD5sO>]
```

앞의 예제에서 `Optional Arguments`를 생성할 때 '-p'와 '--prefix'를 parser.add_argument의 각각 첫번째, 두번째 인자로 전달하였다. 첫번째 인자는 축약형이고 두번째 인자는 옵션의 전체 이름을 나타낸다.  
따라서 앞서의 실행을 다음과 같이 작성해도 동일하게 동작한다.   

```bash
$ python3 manage.py create_users 3 True -p custom_user
[<User: custom_user_r11a658s9h3e>, <User: custom_user_QipEKqZJzUih>, <User: custom_user_b2T89AE3lRVs>]
```

### Flag Arguments

다음 예제는 사용자 생성 시 임의의 사용자를 super user로 생성할지 regular user로 생성할지 판단하기 위해 `Flag Argumetns`를 사용한다.  

[create user with positional arguments](./mysite/core/management/commands/create_users.py)
```python
from django.contrib.auth.models import User
from django.core.management.base import BaseCommand
from django.utils.crypto import get_random_string


class Command(BaseCommand):
    help = 'Create random users'

    def add_arguments(self, parser):
        parser.add_argument('total', type=int, help='Indicates the number of users to be created')
        parser.add_argument('print', type=bool, help='Indicates print result of execution')

        # Optional argument
        parser.add_argument('-p', '--prefix', type=str, help='Define a username prefix')

        # Flag argument
        parser.add_argument('-a', '--admin', action='store_true', help='Create an admin account')

    def handle(self, *args, **kwargs):
        total = kwargs['total']
        print_result = kwargs['print']

        # Optional argument
        prefix = kwargs['prefix']

        # Flag argument
        admin = kwargs['admin']

        for i in range(total):
            if prefix:
                username = '{prefix}_{random_string}'.format(prefix=prefix, random_string=get_random_string())
            else:
                username = get_random_string()

            create_user = User.objects.create_superuser if admin else User.objects.create_user
            create_user(username=username, email='', password='123')

        if print_result:
            self.stdout.write(str(User.objects.all().order_by('-id')[:total][::-1]))
```

`Flag Arguments`는 `Optional Arguments`의 부분집합으로 모든 특성을 상속받으며, boolean 값을 처리하기 위해 사용된다.  
이번 예제에서는 super user를 생성할지 regular user를 생성할지를 결정하기 위해 사용했지만, 앞서 `Positiona Arguments`를 `Flag Arguments`로 변경하면 좀 더 자연스울 것이다.  

다음은 위 예제를 실행시킨 결과이다.  

```bash
$ python3 manage.py create_users 5 True --admin
[<User: nrbRLJB9hb8l>, <User: lZjGRusdycsd>, <User: ozXr9rgWGqDy>, <User: McvjMHsKw5hI>, <User: JLDmxqTu4zdA>]

$ python3 manage.py shell
>>> from django.contrib.auth.models import User
>>> User.objects.get(username='ozXr9rgWGqDy').is_superuser
True    
```

## Arbitrary List of Arguments

이번에는 `Positional Arguments`를 통해 리스트를 전달받을 수 있도록 해보자.  
다음 예제는 특정 사용자의 id 목록을 전달받아 해당 사용자를 지운다.   

```python
from django.contrib.auth.models import User
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = 'Delete users'

    def add_arguments(self, parser):
        parser.add_argument('user_id', nargs='+', type=int, help='User ID')

    def handle(self, *args, **kwargs):
        user_ids = kwargs['user_id']
        
        for user_id in user_ids:
            try:
                user = User.objects.get(pk=user_id)
                user.delete()
                self.stdout.write('User "%s (%s)" deleted with success!' % (user.username, user_id))
            except User.DoesNotExist:
                self.stdout.write('User with id "%s" does not exits.' % user_id)
```

parser.add_argument의 keyword argument인 `nargs`에 `'+'`를 전달하면 리스트를 인자로 받을 수 있다.   

다음은 아이디 하나만 전달하는 경우 여러개의 아이디 목록을 전달하는 경우의 실행결과이다.  

```bash
$ python3 manage.py delete_users 2
User "qLFRYV5Ijjxt (2)" deleted with success!

$ python3 manage.py delete_users 2 3 4
User with id "2" does not exits.
User "Jl78LjE1sa7n (3)" deleted with success!
User "WYERoJF109g4 (4)" deleted with success!
```

## Cron Job

매주 월요일 리포트를 생성하거나 한달에 한번 특정 사이트를 크롤링 하는 등, CC를 일정한 주기에 따라 실행해줘야한다면 **Cron Job**을 이용할 수 있다.  
방법은 아주 간단한데, CC를 crontab에 등록하기만 하면 된다.  

다음은 매일 오전 4시에 my_custom_command를 실행한다. 

```bash
0 4 * * * /home/mysite/venv/bin/python /home/mysite/mysite/manage.py my_custom_command
```

# Reference

* [How to Create Custom Django Management Commands](https://simpleisbetterthancomplex.com/tutorial/2018/08/27/how-to-create-custom-django-management-commands.html)