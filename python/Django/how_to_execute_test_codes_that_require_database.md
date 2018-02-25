# How to execute test codes that require database in Django 

Django의 다음 명령을 통해 데이터베이스를 사용하는 테스트 코드를 테스트하면, 실제 데이터베이스를 사용하지 않고 테스트를 위한 빈 데이터베이스를 생성하여 테스트에 사용한다.  
그리고 테스트가 완료되면 테스트의 성공 유무와는 관계없이 테스트 데이터베이스는 삭제된다. 

>$ ./manage.py test 

예를들어, 다음과 같은 데이터베이스 설정이 있다고 가정하자. 

```python
DATABASES = {
    'default': {
        'NAME': 'django_sdy',
        'ENGINE': 'django.db.backends.mysql',
        'USER': 'root',
        'PASSWORD': '1234',
        # 'HOST':'172.17.42.1',
        'HOST': 'docker.for.mac.localhost',
        'PORT': '3306'
    },
    'study': {
        'NAME': 'study',
        'ENGINE': 'django.db.backends.mysql',
        'USER': 'root',
        'PASSWORD': '1234',
        # 'HOST':'172.17.42.1',
        'HOST': 'docker.for.mac.localhost',
        'PORT': '3306'
    }
}
```

이러한 데이터베이스 설정을 갖고 있는 Django application을 앞선 명령을 통해 테스트하면 다음과 같이 결과가 출력된다. 

```sh
$ ./manage.py test 
Creating test database for alias 'default'...
Creating test database for alias 'study'...
System check identified no issues (0 silenced).
.E
======================================================================
ERROR: test_access_study_db (multi_db.tests.TestAccessOtherDB)
----------------------------------------------------------------------
Traceback (most recent call last):
  File "/develop/python/Django/access_other_db_in_custom_query/multi_db/tests.py", line 19, in test_access_study_db
    cursor.execute('select * from professor')
  File "/usr/local/lib/python2.7/dist-packages/django/db/backends/utils.py", line 65, in execute
    return self.cursor.execute(sql, params)
  File "/usr/local/lib/python2.7/dist-packages/django/db/utils.py", line 94, in __exit__
    six.reraise(dj_exc_type, dj_exc_value, traceback)
  File "/usr/local/lib/python2.7/dist-packages/django/db/backends/utils.py", line 63, in execute
    return self.cursor.execute(sql)
  File "/usr/local/lib/python2.7/dist-packages/django/db/backends/mysql/base.py", line 101, in execute
    return self.cursor.execute(query, args)
  File "/usr/local/lib/python2.7/dist-packages/MySQLdb/cursors.py", line 205, in execute
    self.errorhandler(self, exc, value)
  File "/usr/local/lib/python2.7/dist-packages/MySQLdb/connections.py", line 36, in defaulterrorhandler
    raise errorclass, errorvalue
ProgrammingError: (1146, "Table 'test_study.professor' doesn't exist")

----------------------------------------------------------------------
Ran 2 tests in 0.011s

FAILED (errors=1)
Destroying test database for alias 'default'...
Destroying test database for alias 'study'...
```

위 출력결과를 하나하나 살펴보면 최초 다음과 같이 각 데이터베이스에 대한 테스트 데이터베이스를 만드는 것을 알 수 있다. 

```sh
Creating test database for alias 'default'...
Creating test database for alias 'study'...
```

그리고 테스트를 수행하였고, 1개의 테스트를 성공하고 나머지 1개의 테스트를 실패하였다.  
그리고 테스트가 모두 완료 된 후 다음과 같이 테스트 시작 시 생성 되었던 테스트 데이터베이스를 모두 삭제하는 것을 알 수 있다. 

```sh
Destroying test database for alias 'default'...
Destroying test database for alias 'study'...
```

## What is the test_ prefix in django db test?

앞서 살펴보았던 출력 결과에서 다음 에러를 보자.  

```sh
ProgrammingError: (1146, "Table 'test_study.professor' doesn't exist")
```

test_study 데이터베이스에서 professor 테이블을 찾으려다 존재하지 않아서 발생한 에러인데, 앞선 설정을 보면 Django 프로젝트가 가지고 있는 데이터베이스는 'django_sdy'와 'study'뿐이다.  

그렇다면 Django는 왜 'test_study' 데이터베이스에서 'professor' 테이블을 찾으려했을까?

앞서 살펴본 바와 같이 Django는 데이터베이스를 사용하는 테스트를 실행시킬 때, 테스트 데이터베이스를 만든다. 이때 DATABASES 설정에 [TEST.NAME](https://docs.djangoproject.com/en/1.11/ref/settings/#test) 설정을 통해 테스트 데이터베이스의 이름을 설정하지 않으면 기본으로 데이터베이스 이름 앞에 '**test_**'를 붙여서 테스트 데이터베이스를 만든다. 

그러면 다음과 같이 DATABASES 설정에 [TEST.NAME](https://docs.djangoproject.com/en/1.11/ref/settings/#test) 설정을 통해 테스트 데이터베이스의 이름을 설정한 후 테스트해보자. 

```python
'study': {
    'NAME': 'study',
    'ENGINE': 'django.db.backends.mysql',
    'USER': 'root',
    'PASSWORD': '1234',
    # 'HOST':'172.17.42.1',
    'HOST': 'docker.for.mac.localhost',
    'PORT': '3306',
    'TEST': {
        'NAME': 'study_test',
    },
}
```

다음 테스트 결과를 보면 의도한대로 테스트데이터베이스 이름이 'study_test'로 출력되는 것을 확인 할 수 있다.

```sh
ProgrammingError: (1146, "Table 'study_test.professor' doesn't exist")
```

## Reference

* [The test database](https://docs.djangoproject.com/en/1.11/topics/testing/overview/#the-test-database_)
* [TEST.NAME](https://docs.djangoproject.com/en/1.11/ref/settings/#test)