# [ModelFroms](https://docs.djangoproject.com/en/dev/topics/forms/modelforms/#topics-forms-modelforms)의 save 메소드의 commit 파라메터에 대해서

save 메소드는 ModelForms에 맵핑 된 DB 데이터를 저장하고 ORM 오브젝트를 생성하여 반환하는 역할을 한다. 이때, save 메소드에 옵션을 줄 수가 있는데 이것이 commit 파라메터이다.

이 파라메터의 기본값은 True로 설정되며, 이 경우 ModelForms에 맵핑 된 DB 데이터를 저장하고 ORM 오브젝트를 생성하여 반환한다.

만약, 해당 파라메터가 False로 설정된다면, ModelForms에 맵핑 된 DB 데이터에 대한 ORM 오브젝트만을 생성하여 반환하고 DB에 데이터를 저장하지는 않는다.

따라서, 특정 ORM 오브젝트를 DB에 바로 저장하고자 할 때는 commit=True 옵션을 주고, ORM 오브젝트를 생성한 후 비즈니스 로직 단에서 이에 대한 업데이트를 수행 한 후 저장할 때는 commit=False 옵션을 주면 될 것이다. 

## 예제

```python
# Create a form instance with POST data.
>>> f = AuthorForm(request.POST)

# Create, but don't save the new author instance.
>>> new_author = f.save(commit=False)

# Modify the author in some way.
>>> new_author.some_field = 'some_value'

# Save the new instance.
>>> new_author.save()
```

## 참조

* [The save () method in ModelForms](https://docs.djangoproject.com/en/dev/topics/forms/modelforms/#the-save-method)
