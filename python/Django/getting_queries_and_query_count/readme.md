# How to get query statement and count of queries

Django ORM을 사용하다 보면 내가 현재 작성한 코드가 몇번 Evaluation되는지 알고 싶을 때가 있고 ORM으로 작성한 쿼리가 어떻게 작성되어 Evaluation되는지 알고 싶을 때가 있다.

이를 확인하는 방법은 [Django debug toolbar](https://django-debug-toolbar.readthedocs.io/en/stable/)를 사용할 수 있겠지만, 이를 사용하지 않고 코드를통해 확인 할 수 있는 방법을 알아보도록 한다. 

#### Requirement

* Ubuntu Linux version 14.04
* Mac macOS High Sierra 10.13.1 (17B1003)
    * Docker for mac 
    * Docker CE 17.09.1-ce-mac42 (21090)
    * MySQL ver 14.14 Distrib 5.7.20, for Linux (x86_64) using  EditLine wrapper]
* Python 2.7
* Django 1.11.5

## How to get query information from ORM

우선, ORM을 통해 작성 된 쿼리와 해당 쿼리가 Evaluation되는 횟수를 확인하기 위해서는 다음 모듈을 사용한다. 

```python
from django.db import connection
```

## Getting query statement written by ORM

connection 모듈의 queries 속성을 사용하면 현재 ORM을 통해 Evaluation된 Query문들을 확인할 수 있다. 

```python
from django.db import connection

Model.objects.count()
print connection.queries
```

## Getting evaluation count 

앞서 Evaluation된 Query문들의 개수를 확인하면 Evalution된 쿼리의 개수를 확인 할 수 있다.

```python
from django.db. import connection

Model.objects.count()
print len(connection.quries)
```

## Reference

* [Get SQL query count during a Django shell session](https://stackoverflow.com/questions/19556139/get-sql-query-count-during-a-django-shell-session)
