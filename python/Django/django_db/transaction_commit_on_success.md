# How to work overlapped commit_on_success

다음과 같이 @commit_on_success를 데코레이터로 사용하고 내부적으로 context_manager를 통해 commit_on_success를 한번 더 사용하고 있다고 가정하자.  
예상되는 동작은 무엇인가? context_manager의 외부 트랜잭션 scope과 context_manage 내부 트랜잭션 scope이 독립적으로 수행될까? 아니면 conntext_manage 같은 트랜잭션 scope으로 동작할까?
이를 확인하기 위해서 context_manager의 외부 트랜잭션 scope에 break point를 찍고 Django shell에서 모델을 추적해보기로하자. 

```python
class Command(BaseCommand):
    @transaction.commit_on_success
    def handle(self, *args, **options):
        TestModel.objects.create(name='a', age=1)
        import pdb; pdb.set_trace()

        with transaction.commit_on_success():
            TestModel.objects.create(name='b', age=2)
            n = 1

        n = 2
            
```

위 커맨드를 실행시키고, break point에서 Django Shell을 통해 모델을 확인했을 때의 결과이다.  
예상하겠지만 **당연히 commit이 일어나지 않아 데이터가 없다.**

```python
-> with transaction.commit_on_success():

>>> TestModel.objects.all()
[]
```

이번에는 코드를 진행시켜서 context manager 내부의 n = 1까지 진행한 후 모델을 확인해보자.  
**역시 commit이 일어나지 않아 데이터가 없다.**

```python
-> with transaction.commit_on_success():
(Pdb) n
-> TestModel.objects.create(name='b', age=2)
(Pdb) n

>>> TestModel.objects.all()
[]
```

이번에는 코드를 더 진행시켜서 n = 3까지 진행한 후 모델을 확인해보자.   
이번에는 context manager를 빠져나오면서 commit_on_success가 `commit`을 발생시켰을 것이다. 이때 관건은 context manager 내부의 트랜잭션만 `commit`되냐 아니면 외부까지 함께 되냐인데 ... 
결과는 외부에 있는 트랜잭션까지 `commit` 되었음을 알 수 있다. 

```python
(Pdb) n
-> n = 2

>>> TestModel.objects.all()
[<TestModel: TestModel object>, <TestModel: TestModel object>]
>>> TestModel.objects.all()[0].name
u'a'
>>> TestModel.objects.all()[1].name
u'b'
```

이를 알기 위해서 commit_on_success에서 트랜잭션이 열리는 시점과 해당 트랜잭션이 commit 시점을 알 필요가 있다.  
앞서 코드에 주석을 통해 이를 설명하겠다.  

```python
class Command(BaseCommand):
    @transaction.commit_on_success
    def handle(self, *args, **options):
        # name=a 트랜잭션 열림
        TestModel.objects.create(name='a', age=1)
        import pdb; pdb.set_trace()

        with transaction.commit_on_success():
            # name=a 트랜잭션이 열려있는 상태에서 name=b 포함 (추가로 여는것 아님!)
            TestModel.objects.create(name='b', age=2)
            n = 1

        # context manager의 transaction.commit_on_success 에서 트랜잭션이 발생하지 않았으므로 트랜잭션 commit
        # name=a에서 연 트랜잭션에 name=b도 포함되므로 모두 commit!!

        n = 2
```

앞서 설명한 것과 같은 이유로 context manager의 내부에서 Exception이 발생하면 context manager 외부의 코드까지 `rollback`되어 버린다. 
다음 예제를 통해 정말 `rollback`되는지 확이해보자.  

```python
class Command(BaseCommand):
    @transaction.commit_on_success
    def handle(self, *args, **options):
        TestModel.objects.create(name='a', age=1)
        import pdb; pdb.set_trace()

        try:
            with transaction.commit_on_success():
                TestModel.objects.create(name='b', age=2)
                raise Exception
                n = 1
        except Exception:
            n = 2

        n = 3
```

다음은 실행 결과이다.

```python
-> try:
(Pdb) n
-> with transaction.commit_on_success():
(Pdb) n
-> TestModel.objects.create(name='b', age=2)
(Pdb) n
-> raise Exception
(Pdb) n
Exception: Exception()
-> raise Exception
(Pdb) n
-> except Exception:
(Pdb) n
-> n = 2
(Pdb) n
-> n = 3
(Pdb) n
--Return--
(Pdb) c

>>> TestModel.objects.all()
[]
```

마지막으로 한가지만 더 테스트 해보자. 위 에제에서 context manager의 예외가 처리 된 후 다시 정상적으로 데이터를 생성한 해보자.   
앞서 두개의 쿼리는 `rollback`이 되고 마지막 쿼리는 새로운 트랜잭션이 열리면서 문제가 없었으므로 `commit` 된다.   

```python
class Command(BaseCommand):
    @transaction.commit_on_success
    def handle(self, *args, **options):
        TestModel.objects.create(name='a', age=1)
        import pdb; pdb.set_trace()

        try:
            with transaction.commit_on_success():
                TestModel.objects.create(name='b', age=2)
                raise Exception
                n = 1
        except Exception:
            n = 2

        TestModel.objects.create(name='c', age=3)
        n = 3
```

다음은 위 코드의 실행결과이다. 예상대로 마지막 쿼리만 `commit`되었다.   

```python
>>> TestModel.objects.all()
[<TestModel: TestModel object>]
>>> TestModel.objects.all()[0].name
u'c'
```

## Caution

앞서 봤던것과 같이 transaction.commit_on_sucess를 데코레디터와 context_manager 조합으로 사용할 때 주의점이 있다. 
코드를 다음과 같이 고쳐보자. 
transaction.commit_on_success를 데코레이터로 사용한다는 것은 일반적을 해당 함수가 끝날때 이상이 없었으면 해당 트랜잭션은 `commit` 시키고 예외가 발생하면 `rollback` 시키기 위함이다.   
그러면 다음 코드는 의도한데로 동작할까? 

```python
class Command(BaseCommand):
    @transaction.commit_on_success
    def handle(self, *args, **options):
        TestModel.objects.create(name='a', age=1)

        with transaction.commit_on_success():
            TestModel.objects.create(name='b', age=2)

        TestModel.objects.create(name='c', age=3)
        raise Exception
```

다음은 실행 결과이다. 모든 쿼리가 `rollback`될 것을 예상했다면 잘못 생각했다. 첫번째 두번째 쿼리는 context manager에서 `commit`을 수행하므로 `commit`되었고 마지막 쿼리만 `rollback`되었다. 

```python
./devmanage.py trans
Traceback (most recent call last):
  File "./devmanage.py", line 26, in <module>
    execute_manager(settings)
  File "/Users/a201808045/.virtualenv/yogiyo/lib/python2.7/site-packages/django/core/management/__init__.py", line 459, in execute_manager
    utility.execute()
  File "/Users/a201808045/.virtualenv/yogiyo/lib/python2.7/site-packages/django/core/management/__init__.py", line 382, in execute
    self.fetch_command(subcommand).run_from_argv(self.argv)
  File "/Users/a201808045/.virtualenv/yogiyo/lib/python2.7/site-packages/django/core/management/base.py", line 196, in run_from_argv
    self.execute(*args, **options.__dict__)
  File "/Users/a201808045/.virtualenv/yogiyo/lib/python2.7/site-packages/django/core/management/base.py", line 232, in execute
    output = self.handle(*args, **options)
  File "/Users/a201808045/.virtualenv/yogiyo/lib/python2.7/site-packages/django/db/transaction.py", line 224, in inner
    return func(*args, **kwargs)
  File "/Users/a201808045/workspace/Yogiyo_Web/dowant/../dowant/foodfly/management/commands/trans.py", line 16, in handle
    raise Exception
Exception

>>> TestModel.objects.all()
[<TestModel: TestModel object>, <TestModel: TestModel object>]
>>> TestModel.objects.all()[0].name
u'a'
>>> TestModel.objects.all()[1].name
u'b'
```

