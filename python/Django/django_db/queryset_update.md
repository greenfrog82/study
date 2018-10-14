# [update()](https://docs.djangoproject.com/en/1.11/ref/models/querysets/#update)

특정 필드의 갱신을 위한 SQL udpate query를 실행 한 후 처리 된 레코드 수를 반환한다.   

일반적인 사용방법은 다음과 같다.   
다음 예제는 content가 'b'인 Article을 찾아서 'c'로 갱신한다.  

```python
>> Article.objects.filter(content='b').update(content='c')
1
```

`update()`를 통해 여러개의 필드도 수정 가능하다. 
다음 예제는 x가 1인 좌표를 찾아서 x와 y 좌표의 값을 100으로 바꾼다.  

```python
>>> Point.objects.filter(x=1).update(x=100, y=100)
2
```

`update()`메소드는 즉시 적용되고, 갱신되는 QuerySet의 유일한 제약은 모델의 메인 테이블의 컬럼만 갱신된다는 것이다.  
예를들어 다음과 같이 ForeignKey와 같이 relation이 있는 테이블은 갱신할 수 없다.  

```python
>>> Entry.objects.update(blog__name='foo') # Won't work!
```

하지만 filter 메소드를 통해 related filed의 QuerySet을 반환한 후 update()메소드 호출은 가능하다.  

```python
>>> Entry.objects.filter(blog__id=1).update(comments_on=True)
```

`update()`메소드는 모델의 특정 동작(calling overrided save() method)가 필요하지 않는 경우 모델을 갱신할 수 있는 가장 효과적인 방법이다.  
만약, 다음과 같은 형태로 `save()`메소드를 통해 업데이트하게 되면 모델의 인스턴스를 메모리에 올려야해서 비효율적이다. 

```python
>>> article = Article.objects.get(content='a')
>>> article.content = 'melong'
>>> article.save()
```

`update()`메소드는 또한 위와같이 데이터를 읽어오고 `save()` 메소드를 호출하는 사이에 DB에서 발생하는 race condition 방지한다.  

실제로 `update()`메소드와 `save()`메소드를 호출할 때 발생하는 쿼리를 확인해보면 `save()`메소드는 `select`와 `update` 쿼리가 두번 나가는 것을 확인 할 수 있고, `update()`메소드는 `update` 쿼리가 하나만 나간것을 알 수 있다.   
한가지 주목할 부분은 각각 나간 `update`쿼리 부분인데 `save()`는 DateTimeFiled들에 대한 변경도 발생한 것을 알 수 있다.  

```python
>>> article = Article.objects.get(content='melong')
>>> article.content = 'greenfrog'
>>> article.save()
>>> connection.queries
[{'time': '0.003', 'sql': 'SELECT "app_model_article"."id", "app_model_article"."content", "app_model_article"."created_date", "app_model_article"."updated_date" FROM "app_model_article" WHERE "app_model_article"."content" = \'melong\''}, {'time': '0.000', 'sql': 'BEGIN'}, {'time': '0.011', 'sql': 'UPDATE "app_model_article" SET "content" = \'greenfrog\', "created_date" = \'2018-10-14 12:36:29.225341\', "updated_date" = \'2018-10-14 13:57:10.597828\' WHERE "app_model_article"."id" = 19'}]
>>>
>>> {'time': '0.000', 'sql': 'BEGIN'}, {'time': '0.011', 'sql': 'UPDATE "app_model_article" SET "content" = \'melong\' WHERE "app_model_article"."content" = \'greenfrog\''}
```

마지막으로, `update()`메소드는 SQL 레벨의 업데이트만 수행한다. 따라서 ORM Model의 `save()`메소드나 `pre_save`, `post_save` signal등을 호출하지 않는다. 
만약 여러 레코드의 데이터를 호출 할 때, `Model.save()`호출이 필요하다면, 다음과 같이 해야한다. 

```python
>>> qs = Article.objects.filter(content='c')
>>> for article in qs:
...     article.content = 'melong'
...     article.save()
```
