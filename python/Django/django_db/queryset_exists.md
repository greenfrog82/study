# [exists()](https://docs.djangoproject.com/en/2.1/ref/models/querysets/#django.db.models.query.QuerySet.exists)

```python
>>> qs = Article.objects.all()
>>> if qs:
...     print('test')
...
...
test
>>> connection.queries[-1]
{'sql': 'SELECT "app_model_article"."id", "app_model_article"."content", "app_model_article"."created_date", "app_model_article"."updated_date" FROM "app_mo
del_article"', 'time': '0.000'}
```

```python
>>> qs = Article.objects.all()
>>> if qs.exists():
...     print('success')
...
...
success
>>> connection.queries[-1]
{'sql': 'SELECT (1) AS "a" FROM "app_model_article"  LIMIT 1', 'time': '0.000'}
```