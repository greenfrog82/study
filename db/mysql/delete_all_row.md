# 테이블의 모든 데이터 삭제하기

테이블의 모든 데이터를 삭제하는 방법은 다음 두가지가 있다.

```sql
DELETE FROM <TABLE NAME>
```

```sql
TRUNCATE TABLE <TABLE NAME>
```

이 두가지 방법에는 각각 성능상의 차이가 있다. 결론부터 이야기하자면 **TRUNCATE 명령을 사용하는 것이 성능상으로 더 좋다.**
DELETE 명령의 경우 데이터를 삭제할 떄 **각각 ROW에 대해서 명령을 실행한다.** 즉, 10개의 데이터가 있다고 하면 10번 DELETE 명령이 실행되는 것이다. 하지만, TRUNCATE 명령의 경우 **한번에 모든 ROW를 삭제한다.**
따라서, 테이블의 모든 데이터를 삭제할 떄는 **TRUNCATE**명령을 사용하는 것이 좋은 방법일 것이다. 

## 참조

* [How to delete all rows in a MySQL or Oracle table](http://notes.jerzygangi.com/how-to-delete-all-rows-in-a-mysql-or-oracle-table/)
