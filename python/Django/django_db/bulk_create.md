# [bulk_create(objs, batch_size=None)](https://docs.djangoproject.com/ko/2.1/ref/models/querysets/#bulk-create)

이 메소드는 오브젝트 리스트를 받아서 **한번의 쿼리**로 오브젝트 리스트를 데이터베이스에 insert한다.

다음 예제를 보자.

```python
>>> Article.objects.all()
<QuerySet []>
>>> Article.objects.bulk_create([Article(content='a'), Article(content='b')])
[<Article: Article object (None)>, <Article: Article object (None)>]
>>> from django.db import connection
>>> connection.queries[len(connection.queries)-1]
{'sql': 'INSERT INTO "my_app_article" ("content") SELECT \'a\' UNION ALL SELECT \'b\'', 'time': '0.006'}
>>> for article in Article.objects.all():
...     article.content
...
'a'
'b'
```