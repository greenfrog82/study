# ERROR 1175에 대해서 ..

다음과 같이, professor 테이블에는 테스트용 더미 데이터가 insert되어있다.

```sql
mysql> select * from professor;
+-----+------+--------+-------+
| _id | name | belong | phone |
+-----+------+--------+-------+
|   1 | a    | FOO    | NULL  |
|   2 | a    | FOO    | NULL  |
|   3 | a    | FOO    | NULL  |
|   4 | a    | FOO    | NULL  |
|   5 | a    | FOO    | NULL  |
|   6 | a    | FOO    | NULL  |
|   7 | a    | FOO    | NULL  |
|   8 | a    | FOO    | NULL  |
|   9 | a    | FOO    | NULL  |
|  10 | a    | FOO    | NULL  |
|  11 | a    | FOO    | NULL  |
|  12 | a    | FOO    | NULL  |
|  13 | a    | FOO    | NULL  |
+-----+------+--------+-------+
13 rows in set (0.00 sec)
```

이 데이터를 전부 삭제하기 위해서 delete from 명령을 사용하였더니 다음과 같이 에러메시지가 출력되었다.

```sql
mysql> delete from professor;
ERROR 1175 (HY000): You are using safe update mode and you tried to update a table without a WHERE that uses a KEY column
```

위 메시지는 MySQL의 설정 중 **SQL_SAFE_UPDATES**가 **ON** 상태일 때 출력된다. **SQL_SAFE_UPDATES** 옵션은 테이블에서 데이터를 삭제할 떄 반드시 KEY가 설정 된 컬럼의 값을 where 절에서 지시하도록 한다. **이는 실수로 테이블의 모든 데이터가 삭제되는것을 예방하기 위함이다**.

앞선 상황에서는 professor의 데이터가 모두 테스트를 위한 더미데이터임이 분명하기 때문에 이 데이터를 KEY 컬럼을 통해서 삭제하는것은 번거로운 작업이 될 것이다. 그렇다고 KEY 컬럼이 아닌 'name' 컬럼의 데이터를 where 절에 포함해서 모든 데이터를 삭제할 수도 없다. **SQL_SAFE_UPDATES** 설정은 **반드시 where절에 KEY 컬럼의 값을 지시하도록 강제하기 때문이다**.

이러한 경우, 다음 명령을 통해 **SQL_SAFE_UPDATES** 설정을 **OFF** 시키고 **delete from <table>** 명령을 사용하면 에러 없이 특정 테이블의 모든 데이터를 삭제할 수 있다.

```sql
SET SQL_SAFE_UPDATES=0
```

다음은 위 명령 수행 후 delete from <table> 명령을 수행한 결과이다. professor 테이블의 모든 데이터가 삭제되었음을 확인 할 수 있다.

```sql
mysql> set sql_safe_updates=0;
Query OK, 0 rows affected (0.00 sec)

mysql> delete from professor;
Query OK, 12 rows affected (0.00 sec)

mysql> select * from professor;
Empty set (0.00 sec)
```

**SQL_SAFE_UPDATES** 설정을 다시 **ON**으로 변경하기 위해서는 다음 명령을 사용하면 된다.

```sql
SET SQL_SAFE_UPDATES=1
```

## TRUNCATE TABLE <TABLE NAME> 명령 사용하기

**SQL_SAFE_UPDATES** 설정을 다시 **ON**으로 설정되어있다 하더라도 **TRUNCATE TABLE <TABLE NAME>** 명령을 사용하면 에러 없이 테이블의 모든 데이터를 삭제할 수 있다.

다음은 **SQL_SAFE_UPDATES** 설정이 **ON** 상태일 떄 **TRUNCATE TABLE <TABLE NAME>** 명령을 통해 에러 없이 모든 데이터를 삭제하고 있다.

```sql
mysql> select * from professor;
+-----+------+--------+-------+
| _id | name | belong | phone |
+-----+------+--------+-------+
|  14 | a    | FOO    | NULL  |
|  15 | a    | FOO    | NULL  |
|  16 | a    | FOO    | NULL  |
|  17 | a    | FOO    | NULL  |
|  18 | a    | FOO    | NULL  |
|  19 | a    | FOO    | NULL  |
|  20 | a    | FOO    | NULL  |
|  21 | a    | FOO    | NULL  |
|  22 | a    | FOO    | NULL  |
|  23 | a    | FOO    | NULL  |
|  24 | a    | FOO    | NULL  |
|  25 | a    | FOO    | NULL  |
|  26 | a    | FOO    | NULL  |
+-----+------+--------+-------+
13 rows in set (0.00 sec)

mysql> show variables like 'sql_safe_updates';
+------------------+-------+
| Variable_name    | Value |
+------------------+-------+
| sql_safe_updates | ON    |
+------------------+-------+
1 row in set (0.00 sec)

mysql> truncate table professor;
Query OK, 0 rows affected (0.00 sec)

mysql> select * from professor;
Empty set (0.00 sec)
```



## 참조

* [4.5.1.6.4 Using the --safe-updates Option](https://dev.mysql.com/doc/refman/5.7/en/mysql-tips.html)
* [[Mysql Workbench]UPDATE 쿼리 실행시 Error Code 1175](http://mdj1234.tistory.com/60)
