# Transaction

Django 1.4.22와 2.1 버전에서의 Transaction에 대한 내용을 정리한다.  

## [Transaction at Django 1.4.22](https://django.readthedocs.io/en/1.4.X/topics/db/transactions.html?highlight=autocommit#module-django.db.transaction)

### Django's default transaction behavior 

Django는 기본적으로 `auto commit`모드로 동작한다.   
`auto commit`모드란 Model객체의 `save()`, `delete()`메소드를 호출할 때 즉시 `commit`을 해버리는 것을 말한다 .  
`auto commit`모드에서 암묵적으로 `rollback`을 하는 방법은 없다.   

### Tying transactions to HTTP requests(request-based transaction)

HTTP request에서 트랜잭션을 다루는 추천되는 방법은 `request`와 `response` 사이클을 `django.middleware.transaction.TransactionMiddleware`을 통해 트랜잭션으로 묶는것이다.  
`request`와 `response` 사이클을 하나의 트랜잭션으로 묶게되면, `request`가 `TrasactionMiddleware`을 통과하게 되면 트랜잭션이 시작된다. 그리고 `response`가 아무문제 없이 `TransactionMiddleware`을 통과했을때 `commit`을 하게되고, `exception`이 발생한다면 `rollback`하게 된다.   

위 동작을 실행시키기 위해서는 다음과 같이 `django.middleware.transaction.TransactionMiddleware`을 `settings.py`파일의 MIDDLEWARE_CLASSES에 추가해주면 된다.   

```python
MIDDLEWARE_CLASSES = (
    'django.middleware.cache.UpdateCacheMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.transaction.TransactionMiddleware',
    'django.middleware.cache.FetchFromCacheMiddleware',
)
```

이때 적용하는 순서는 아주 중요한데, `TransactionMiddleware`는 `view` 뿐만 아니라 `middleware`에도 영향을 주기 때문이다. (이는 middleware가 request와 response를 처리하는 순서를 이해해야하는데  https://django.readthedocs.io/en/1.4.X/topics/http/middleware.html?highlight=middleware#activating-middleware을 참고하기 바란다.)

만약, `SessionMiddleware`를 다음과 같이 `TransactionMiddleware` 뒤에 위치시킨다면, session을 생성하는 부분은 트랙잭션의 `TransactionMiddleware`의 영향을 받는다.   

`CacheMiddleware`, `UpdateCacheMiddleware` 그리고 `FetchFromCacheMiddleware`와 같이 다양한 `cache middleware`들은 `TransactionMiddleware`의 영향을 받지 않는다. 심지어 데이터베이스 캐쉬를 사용하고 있어도 영향을 받지 않는데, Django는 캐쉬를 위한 별도의 커서를 사용하기 때문이다. 

>**Note**
`TransactionMiddleware`는 DATABASES 설정의 'default'key로 설정 된 데이터베이스에 한하여 트랙잭션처리를 해준다. 따라서, 다른 데이터베이스에 트랙잭션을 처리해주고 싶다면 별도의 middleware를 개발해주어야한다.

### Controlling transaction management in Django Custom Command

정규문서에는 `View`를 통해 트랜잭션을 다루는 예들을 소개하고 있지만, 현재 Django Custom Command로 에제를 만다는 것이 실습하기 편한것 같아서 여기서 Django Custom Command를 통해 관련 예들을 살펴본다.  

대부분의 경우 앞서 소개했던 `request-based transaction`을 통해 트랜잭션을 쉽게 다룰 수 있지만, `request` 전체에 트랜잭션을 걸기 때문에 성능상 손해를 많이 보게된다. 따라서 세밀하게 트랜잭션을 다뤄줘야할 필요가 있는데 이러한 경우 `django.db.transaction`클래스를 통해 `per-function` 또는 `per-code-block` 기준으로 트랜잭션을 다룰 수 있다.  

#### Per-Function

함수 레벨의 트랜잭션은 `decorator`를 통해 처리할 수 있다.  
다음 코드의 경우 함수의 호출이 정상적으로 이루어진 경우 `commit`이 이루어지고 exception이 발생한 경우 `rollback`된다.  

```python
from django.db import transaction

@transaction.commit_on_success
def viewfunc(request):
    # ...
    # this code executes inside a transaction
    # ...
```

#### Per-Code-Block

코드 블록 레벨의 트랜잭션은 `context manager`를 통해 처리 할 수 있다. 
다음 코드의 경우 `context manager`로 감싸진 부분은 정상적으로 코드가 실행 되면 `commit`이 이루어지고 exception이 발생한 경우 `rollback`된다. 그리고 `context manager`이외의 코드에서는 Django의 기본 트랜잭션 처리(AUTOCOMMIT)이 이루어진다. 

```python
from django.db import transaction

def viewfunc(request):
    # ...
    # this code executes using default transaction management
    # ...

    with transaction.commit_on_success():
        # ...
        # this code executes inside a transaction
        # ...
```
    
>**Noete**
Django에서 트랜잭션을 다루기 위한 `per-function`과 `per-code-block`방식의 `view`, `function`, `method` 어디에서든 사용가능하다.

Django가 지원하는 각각의 트랜잭션 방법을 알아보기 전에 에제를 만들기 위해 다음과 같은 모델을 정의하자.  

```python
class TransModel(models.Model):
    name = models.CharField(max_length=100)
```

#### autocommit

`autocommit`decorator는 Django의 전역 트랜잭션 설정이 어떻든간에 Django의 `auto-commit`을 수행한다.  
따라서 `save()`, `delete()`등과 같이 `쓰기`동작을 수행하는 경우 즉시 `commit`이 이루어진다.   

다음과 같은 `command`를 정의하고 호출해보자.

```python
class Command(BaseCommand):
    @transaction.autocommit
    def handle(self, *args, **options):
        TransModel.objects.create(name='test')
```

호출 후 Django Shell에서 데이터를 확인해보면 방금 입력한 데이터가 저장된 것을 확인할 수 있다. (테스트를 위해 `TransModel`은 비워놨다.)

```python
>>> TransModel.objects.all()
[<TransModel: TransModel object>]
>>> TransModel.objects.all()[0].name
u'test'
```

이번에는 즉시 `commit`이 되는것이 맞는지 확인하기 위해서 `transaction.rollback`을 호출해보자.  

```python
class Command(BaseCommand):
    @transaction.autocommit
    def handle(self, *args, **options):
        TransModel.objects.create(name='test-rollback')
        transaction.rollback()
```

결과를 확인해보면 모델을 생성하고 저장하는 즉시 `commit`되었기 때문에 `rollback`이 되지 않는것을 확인할 수 있다.  

```python
>>> TransModel.objects.all()
[<TransModel: TransModel object>, <TransModel: TransModel object>]
>>> TransModel.objects.all()[1].name
u'test_rollback'
>>>
```

#### commit_on_success

다음 코드의 경우 함수의 호출이 정상적으로 이루어진 경우 `commit`이 이루어지고 exception이 발생한 경우 `rollback`된다.  

```python
class Command(BaseCommand):
    @transaction.commit_on_success
    def handle(self, *args, **options):
        TransModel.objects.create(name='commit_on_success')
```

결과를 보면 함수 호출의 문제가 없었으므로 정상적으로 `commit`이 된것을 확인 할 수 있다.   

```python
>>> TransModel.objects.all()
[<TransModel: TransModel object>]
>>> TransModel.objects.all()[0].name
u'commit_on_success'
>>>
```

이번에는 에외를 발생시켜서 `rollback`이 이루어지는지 확인해보자.   

```python
class Command(BaseCommand):
    @transaction.commit_on_success
    def handle(self, *args, **options):
        TransModel.objects.create(name='raise exception on commit_on_success')
        raise Exception('test commit_on_success')
```

실행 결과를 확인해보면 다음과 같이 `rollback`이 이루어져 이전에 `commit`헀던 결과만이 출력됨을 알 수 있다. 

```python
>>> TransModel.objects.all()
[<TransModel: TransModel object>]
>>> TransModel.objects.all()[0].name
u'commit_on_success'
```

혹시나해서 다음과 같이 `transaction.rollback`을 호출해 보았다. 

```python
class Command(BaseCommand):
    @transaction.commit_on_success
    def handle(self, *args, **options):
        TransModel.objects.create(name='commit_on_success with transaction.rollback')
        transaction.rollback()
```

이 경우 다음과 같이 `rollback`이 이루어진다.   

```python
>>> TransModel.objects.all()
[<TransModel: TransModel object>]
>>> TransModel.objects.all()[0].name
u'commit_on_success'
>>>
```

#### commit_manually

앞서 다뤘던 방법들과 달리 모든 트랜잭션을 개발자가 직접 다뤄줘야한다.  
만약 DB가 변경되는 행위를 했는데 (ex. save(), delete() 호출 시) `commit` 또는 `rollback`을 호출하지 않으면, `TransactionManagementError` exception이 발생한다.  

앞서 테스트했던 데이터들을 지우고 다음 코드를 실행해보자.   

```python
class Command(BaseCommand):
    @transaction.commit_manually
    def handle(self, *args, **options):
        TransModel.objects.create(name='transaction.commit_manually')
```

명시적으로 `commit`또는 `rollback`을 하고있지 않기 때문에 `TransactionManagementError`가 발생한다.   

```bash
 in leave_transaction_management
    raise TransactionManagementError("Transaction managed block ended with "
django.db.transaction.TransactionManagementError: Transaction managed block ended with pending COMMIT/ROLLBACK
```

`TransactionManagementError`가 발생하면 다음과 같이 데이터가 `commit`되지 않는다.  

```python
>>> TransModel.objects.all()
[]
```

이번에는 위 에제에서 `commit` 함수를 호출해보자.  
여기서 주의할 점은 `commit_manually`를 사용하는 동안은 모든 `commit`과 `rollback`을 개발자가 해주어야하기 때문에 `try-raise-else`를 통해 `commit`과 `rollback`을 제어해주어야한다.  
앞선 예제에서는 `TransactionManagementError`의 발생을 확인하기 위해서 `try-raise-else`를 생략했었다.  

```python
class Command(BaseCommand):
    @transaction.commit_manually
    def handle(self, *args, **options):
        try:
            TransModel.objects.create(name='transaction.commit_manyally')
        raise Exception as e:
            transaction.rollback()
        else:
            transaction.commit()
```

정상적으로 `commit`이 이루어졌음을 알 수 있다.  

```python
>>> TransModel.objects.all()
[<TransModel: TransModel object>]
>>> TransModel.objects.all()[0].name
u'transaction.commit_manually'
>>>
```

이번에는 loop를 돌려 첫번째, 두번째 객체는 `commit`하고 마지막 세번째 객체는 `rollback`해보자. 

```python
class Command(BaseCommand):
    @transaction.commit_manually
    def handle(self, *args, **options):
        for i in xrange(1, 4):
            try:
                if 3 > i:
                    TransModel.objects.create(name=str(i))
                else:
                    raise Exception('rollback test')
            except:
                transaction.rollback()
            else:
                transaction.commit()
```

실행 결과를 보면 첫번째와 두번째 객체는 `commit`을 수행하였으므로 데이터가 저장되었지만 세번째 객체는 `rollback`되어 데이터가 존재하지 않음을 알 수 있다. 

```python
>>> TransModel.objects.all()
[<TransModel: TransModel object>, <TransModel: TransModel object>]
>>> TransModel.objects.all()[0].name
u'1'
>>> TransModel.objects.all()[1].name
u'2'
```

## Requirements for transaction handling

앞선 예제에서 알아 본 것과 같이 트랜잭션은 요청이 끝나기 전에 열기고 닫혀야한다. `autocommit`이나 `commit_on_success`를 사용하는 경우 자동적으로 처리가 된다.   
하지만 `commit_manually`를 사용하고 있는 경우는 개발자가 요청이 끝나기 전에 `commit` 또는 `rollback`을 반드시 호출해주어야한다.  

이미 이와 같은 내용을 언급했음에도 불구하고 다시 강조하는 이유는 `save()`, `delete()`와 같은 `쓰기`작업 이외에도 `읽기`작업에도 동일하게 이루어져야하기 때문이다.

다음 코드를 보자.
`commit_manually`를 사용하고 있고 `읽기`작업만 수행하고 있다. 그리고 `commit`또는 `rollback`을 호출하고 있지 않다.   
이때 `list()`을 통해 `QuerySet`을 evaludation시키고 있는데, 이것을 하지 않으면 실제 DB작업을 하지 않기 때문에 트랜잭션이 열리지 않는다. 

```python
class Command(BaseCommand):
    @transaction.commit_manually
    def handle(self, *args, **options):
        qs = TransModel.objects.all()
        arr = list(qs.values_list())
```

실행 결과는 다음과 같다.

```bash
 in leave_transaction_management
    raise TransactionManagementError("Transaction managed block ended with "
django.db.transaction.TransactionManagementError: Transaction managed block ended with pending COMMIT/ROLLBACK
```

앞서 설명한 것과 같이 `TransactionManageError`를 발생시키지 않기 위해서는 `commit`또는 `rollback`을 명시적으로 호출해서 트랜잭션을 닫아주어야한다.   

```python
    @transaction.commit_manually
    def handle(self, *args, **options):
        try:
            qs = TransModel.objects.all()
            arr = list(qs.values_list())
        raise:
            transaction.rollback()
        else:
            transaction.commit()
```

## SavePoints

`SavePoints`는 트랜잭셔 내부에서 부분적으로 트랜잭션을 다루기 위한 것이다. PostgreSQL 8, Oracle, MySQL(ver 5.0.3 이상, InnoDB engine)가 이를 지원하며, 지원하지 않는 DB를 사용하는 경우 해당 기능은 동작하지 않는다.

`SavePoints`는 `autocommit`의 경우 모든 동작을 즉시 `commit` 해버리기 때문에 사용할 수 없다.   
`SavePoints`는 `commit_on_success`와 `commit_manually`를 사용할 때 유용하며 부분적인 트랜잭션을 수행할 수 있다. 

`SavePoints`는 다음 세가지 메소드를 통해 제어된다. 

>transaction.savepoint(using=None)

`savepoint`를 생성하며 `savepoint ID(sid)`를 반환한다. 이 반환된 `sid`를 통해 해당 `savepoint`에 대한 `commit`과 `rollback`이 이루어진다.   

>transaction.savepoint_commit(sid, using=None)

인자로 전달받은 `sid`가 포함하고 있는 DB operation을 `commit`한다.

>transaction.savepoint_rollback(sid, using=None)

인자로 전달받은 `sid`가 포함하고 있는 DB operation을 `rollback`한다. 

### Example

앞서 `autocommit`모드에서는 `Savepoints`의 동작이 무의미하다고 언급했었다. 
정말 그런지 확인해보자.

```python
class Command(BaseCommand):
    @transaction.autocommit
    def handle(self, *args, **options):
        sid = transaction.savepoint()
        TransModel.objects.create(name='test')
        transaction.savepoint_rollback(sid)
```

앞선 에제에서 `SavePoints`에 대해서 `rollback`을 했지만, `commit`이되어 데이터가 존재하는 것을 확인 할 수 있다. 

```python
>>> TransModel.objects.all()
[<TransModel: TransModel object>]
>>> TransModel.objects.all()[0].name
u'test'
>>>
```

이번에는 `commit_on_success`에서 `SavePoints`를 테스트해보자.  
우선, `SavePoints`를 `commit`하지 않으면 어떻게 될까? 객체를 생성한 후 `commit`을 생략해보자.  

```python
class Command(BaseCommand):
    @transaction.commit_on_success
    def handle(self, *args, **options):
        sid = transaction.savepoint()
        TransModel.objects.create(name='test commit_on_success without savepoint_commit')
```

`commit_on_success`는 해당 함수의 동작이 정상적으로 호출되면 `commit`을 수행하므로 해당 데이터가 저장된 것을 확인 할 수 있다. 

```python
>>> TransModel.objects.all()
[<TransModel: TransModel object>]
>>> TransModel.objects.all()[0].name
u'test commit_on_success without savepoint_commit'
>>>
```

이번에는 `SavePoints` 바깥 트랜잭션에서 데이터를 하나 생성하고, `SavePoints` 안쪽에서 생성한 데이터를  `savepoint_rollback`을 통해서 `rollback`해보자. 

```python
class Command(BaseCommand):
    @transaction.commit_on_success
    def handle(self, *args, **options):
        TransModel.objects.create(name='commit_on_success')
        
        sid = transaction.savepoint()
        TransModel.objects.create(name='test commit_on_success without savepoint_commit')
        transaction.savepoint_rollback(sid)
```

실행결과를 보면 `SavePoints`의 데이터는 `rollback`된 것을 확인할 수 있다. 

```python
>>> TransModel.objects.all()
[<TransModel: TransModel object>]
>>> TransModel.objects.all()[0].name
u'commit_on_success'
>>>
```

`SavePoints`의 바깥 트랜잭션은 `rollback`을 하고, `SavePoints` 안쪽에서 생성한 데이터를 `commit`하면 어떻게 될까?

```python
class Command(BaseCommand):
    @transaction.commit_on_success
    def handle(self, *args, **options):
        TransModel.objects.create(name='commit_on_success')
        
        sid = transaction.savepoint()
        TransModel.objects.create(name='test commit_on_success without savepoint_commit')
        transaction.savepoint_commit(sid)

        raise Exception('commit_on_success raise exception')
```

위 예제를 실행하면 다음과 같이 exception이 발생한다. 앞서 설명한것과 같이 `commit_on_success`는 exception이 발생하면 해당 트랜잭션을 `rollback`시킨다.

```bash
    raise Exception('commit_on_success raise exception')
Exception: commit_on_success raise exception
```

Djagno Shell에서 데이터를 확인해보면 `SavePoints`는 `commit`을 했지만 바깥쪽 트랜잭션이 `rollback`되면 함께 데이터가 `rollback`되는 것을 확인 할 수 있다.  

```python
>>> TransModel.objects.all()
[]
```

>이 부분이 아주 중요한데, `SavePoints`를 `commit`했다 하더라도 실제적인 `commit`은 바깥쪽 트랜잭션에 영향을 받는다. 바깥쪽 트랜잭션에서 `Savepoints`이 `commit`을 해주지 않으며 `commit`이 이루어지지 않는다.  
만약 바깥쪽 트랜잭션에서 `rollback`을 해버린다면 `SavePoints`의 `commit` 역시 모두 `rollback`되어 버린다.

이러한 특징은 `commit_manually`를 통해 좀 더 직관적으로 이해할 수 있다. 다음과 같은 예제를 작성해보자.

첫번째 바깥쪽 트랜잭션에서는 `commit`을 수행하고 `SavePoints`에서도 `commit`을 호출한다.  
두번쨰 바깥쪽 트랜잭션에서는 `commit`을 수행하고 `SavePoints`에서는 `rollback`을 호출한다.  
세번째 바깥쪽 트랜잭션에서는 `rollback`을 수행학 `SavePoints`에서는 `commit`을 호출한다.

```python
class Command(BaseCommand):
    @transaction.commit_manually
    def handle(self, *args, **options):
        TransModel.objects.create(name='First Transaction')

        sid = transaction.savepoint()
        TransModel.objects.create(name='First SavePoints')
        transaction.savepoint_commit(sid)

        transaction.commit()

        TransModel.objects.create(name='Second Transaction')

        sid = transaction.savepoint()
        TransModel.objects.create(name='Second SavePoints')
        transaction.savepoint_rollback(sid)

        transaction.rollback()

        TransModel.objects.create(name='Third Transaction')

        sid = transaction.savepoint()
        TransModel.objects.create(name='Third SavePoints')
        transaction.savepoint_rollback(sid)

        transaction.commit()
```

실행결과를 보면 첫번째 트랜잭션 결과는 `commit`되었고 두번째 트랜잭션은 `rollback`되었으며, 마지막 세번째 트랜잭션은 바깥쪽 트랜잭션은 `commit`되고 안쪽 트랜잭션은 `rollback`된 것을 확인 할 수 있다.

```python
>>> TransModel.objects.all()
[<TransModel: TransModel object>, <TransModel: TransModel object>, <TransModel: TransModel object>]
>>> TransModel.objects.all()[0].name
u'First Transaction'
>>> TransModel.objects.all()[1].name
u'First SavePoints'
>>> TransModel.objects.all()[2].name
u'Third Transaction'
```

