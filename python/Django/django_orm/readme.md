# How to serialize QuerySet to XML

Django의 QuerySet을 통해 XML을 생성하는 방법에 대해서 설명한다. 

## Migrating Model

Model 클래스를 정의하거나 수정했으면 DB에 Migration해주어야한다. 
이를 위해서는 다음 명령을 차례로 수행한다. 

```sh
$ ./manage.py makemigrations <app_name>
$ ./manage.py migrate <app_name>
```

## Test

Test 클래스 작성 후 테스트를 위해서는 다음 명령을 수행한다. 

```sh
# Run all the tests in the <app_name>.tests module
$ ./manage.py test <app_name>.tests

# Run all the tests found within the '<app_name>' package
$ ./manage.py test <app_name>

# Run just one test case
$ ./manage.py test <app_name>.tests.<test_class>

# Run just one test method
$ ./manage.py test <app_name>.tests.<test_class>.<test_method>
```


## Reference 

* [Django models](https://tutorial.djangogirls.org/en/django_models/)
* [Writing and running tests](https://docs.djangoproject.com/en/1.11/topics/testing/overview/#running-tests)
