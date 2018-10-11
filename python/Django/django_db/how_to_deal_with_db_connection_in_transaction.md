# How to deal with db connection in DB connection

Django가 DB transaction을 처리할 때, `commit` 또는 `rollback`을 처리했을 때 DB connection을 유지하고 있을까? 아니면 끊어놓을까?  

다음 예제를 통해 이를 확인해보자.  

```python
class Command(BaseCommand):
    def handle(self, *args, **options):
        print '1. ', connection.connection
        TestModel.objects.create(name='a', age=1)

        print '2. ', connection.connection
        with transaction.commit_on_success():
            TestModel.objects.create(name='b', age=2)

        print '3. ', connection.connection
```

위 예제의 실행 결과는 다음과 같다.    
Transaction에서 `commit`을 수행하더라도 연결은 유지하는것을 확인할 수 있다.

```python
1.  None
2.  <connection object at 0x10eaee4f0; dsn: 'dbname=greenfrog host=localhost user=postgres', closed: 0>
3.  <connection object at 0x10eaee4f0; dsn: 'dbname=greenfrog host=localhost user=postgres', closed: 0>
```
