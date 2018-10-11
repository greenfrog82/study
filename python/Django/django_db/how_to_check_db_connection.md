# How to check DB connection

## connection method in django.db.connection

Django에서 DB connection을 확인하기 위해서는 `django.db.connection의 connection()`를 사용하면 된다.   

다음 예제를 보자.  
최초 QuerySet을 evaluation 시키지 않았을때는 connection이 닫혀있다. (None 반환)  
이후 QuerySet을 evaluation 시키면 connection을 맺고 관련 정보를 출력하는것을 알 수 있다. 

```python
>>> from django.db import connection
>>> connection.connection
>>> qs = TestModel.objects.filter(name='a')
>>> connection.connection
>>> qs.values()
[{'age': 1, 'id': 35, 'name': u'a'}, {'age': 1, 'id': 40, 'name': u'a'}, {'age': 1, 'id': 42, 'name': u'a'}, {'age': 1, 'id': 44, 'name
': u'a'}, {'age': 1, 'id': 46, 'name': u'a'}, {'age': 1, 'id': 48, 'name': u'a'}, {'age': 1, 'id': 50, 'name': u'a'}]
>>> connection.connection
<connection object at 0x106211ab8; dsn: 'dbname=greenfrog host=localhost user=postgres', closed: 0>
```

이후 다음과 같이 새로운 QuerySet을 evaluation 시켜보아도 동일한 connection을 유지하고 있는 것을 알 수 있다.   

```python
>>> TestModel.objects.filter(name='b')
[<TestModel: TestModel object>, <TestModel: TestModel object>, <TestModel: TestModel object>, <TestModel: TestModel object>, <TestModel
: TestModel object>, <TestModel: TestModel object>]
>>> connection.connection
<connection object at 0x106211ab8; dsn: 'dbname=greenfrog host=localhost user=postgres', closed: 0>
>>>
```

## close_conneciton function in django.db

이미 연결되어 있는 DB connection을 끊기 위해서는 `django.db 모듈의 close_connection()`을 사용하면 된다.  

앞서 작성한 예제에 이어 해당 연결을 끊고 연결을 확인해보자.

```python
>>> from django.db import close_connection
>>> close_connection()
>>> connection.connection
```
