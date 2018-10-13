# [Operators that return new QuerySets](https://docs.djangoproject.com/en/2.1/ref/models/querysets/#operators-that-return-new-querysets)

동일한 모델의 QuerySet을 통해서는 AND(&)와 OR(|) 연산이 가능하다.  

## AND (&)

두개의 QuerySet을 SQL의 `AND` 연산으로 연결한다.  

### Example

다음 예제를 보자. 두개의 QuerySet을 `AND` 연산을한다.  
해당 연산의 실행 결과를 쿼리롤 확인해보면 **WHERE절에서 AND 연산을 하고 있는것을 알 수 있다.**

```python
>>> qs_a = Point.objects.filter(x=1)
>>> qs_b = Point.objects.filter(y=1)
>>> qs_a & qs_b
<QuerySet [<Point: Point object (1)>]>
>>> connection.queries[len(connection.queries)-1]
{'time': '0.007', 'sql': 'SELECT "app_model_point"."id", "app_model_point"."x", "app_model_point"."y" FROM "app_model_point" WHERE ("app_model_point"."x" = 1 AND "app_model_point"."y" = 1)  LIMIT 21'}
```

위 코드는 다음과 같이 `filter`를 ','로 연결한것과 같다.   
다음예제를 통해 `filter`를 통해 위와 같은 처리가 되는지 확인해보자.  

```python
>>> Point.objects.filter(x=1, y=1)
<QuerySet [<Point: Point object (1)>]>
>>> connection.queries[len(connection.queries)-1]
{'time': '0.005', 'sql': 'SELECT "app_model_point"."id", "app_model_point"."x", "app_model_point"."y" FROM "app_model_point" WHERE ("app_model_point"."x" = 1 AND "app_model_point"."y" = 1)  LIMIT 21'}
```

마지막으로 위 두 코드는 `django.db.Q`로도 동일하게 처리된다.   

```python
>>> from django.db.models import Q
>>> Point.objects.filter(Q(x=1) & Q(y=1))
<QuerySet [<Point: Point object (1)>]>
>>> connection.queries[len(connection.queries)-1]
{'time': '0.004', 'sql': 'SELECT "app_model_point"."id", "app_model_point"."x", "app_model_point"."y" FROM "app_model_point" WHERE ("app_model_point"."x" = 1 AND "app_model_point"."y" = 1)  LIMIT 21'}
```

## OR (|)

두개의 QuerySet을 SQL의 `OR` 연산으로 연결한다.  

### Example

다음 예제를 보자. 두개의 QuerySet을 `OR` 연산을한다.  
해당 연산의 실행 결과를 쿼리롤 확인해보면 **WHERE절에서 OR 연산을 하고 있는것을 알 수 있다.**

```python
>>> qs_a = Point.objects.filter(x=1)
>>> qs_b = Point.objects.filter(y=2)
>>> qs_a | qs_b
<QuerySet [<Point: Point object (1)>, <Point: Point object (2)>]>
>>> connection.queries[len(connection.queries)-1]
{'time': '0.007', 'sql': 'SELECT "app_model_point"."id", "app_model_point"."x", "app_model_point"."y" FROM "app_model_point" WHERE ("app_model_point"."x" = 1 OR "app_model_point"."y" = 2)  LIMIT 21'}
```

앞서 `AND(&)` 연산자와는 달리 `filter`에서 `OR`를 처리할 수는 없고 `Q`를 통해 위와 같은 코드를 만들 수 있다.  

```python
>>> Point.objects.filter(Q(x=1) | Q(y=2))
<QuerySet [<Point: Point object (1)>, <Point: Point object (2)>]>
>>> connection.queries[len(connection.queries)-1]
{'time': '0.005', 'sql': 'SELECT "app_model_point"."id", "app_model_point"."x", "app_model_point"."y" FROM "app_model_point" WHERE ("app_model_point"."x" = 1 OR "app_model_point"."y" = 2)  LIMIT 21'}
```