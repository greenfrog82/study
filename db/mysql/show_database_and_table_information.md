# 데이터베이스와 테이블 정보 얻어오기

## 개요

1. 데이터베이스 정보를 얻어오는 방법을 알아보자.
2. 데이터베이스를 사용하는 방법에 대해서 알아보자.
3. 현재 선택 된 데이터베이스가 무엇인지 확인하는 방법을 알아보자. 
4. 특정 데이터베이스에 존재하는 테이블 목록을 얻어오는 방법을 알아보자.
5. 특정 테이블의 스키마 정보를 얻어오는 방법에 대해서 알아보자. 

## 데이터베이스 정보 얻어오기 

```
mysql > show databases;
```

위 명령을 수행하면 다음과 같이 현재 mysql server에 존재하는 데이터베이스 목록이 출력된다. 

```
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
+--------------------+
3 rows in set (0.00 sec)
```

## 데이터베이스 선택하기

mysql을 통해 작업을 수행하기 위해서는 특정 데이터베이스를 선택해야한다. 이는 다음 명령을 통해 가능하다. 

```
mysql > use <database name>;
```

앞서 출력했던 데이터베이스 목록 중 mysql을 선택해보자. 

```
mysql > use mysql;
```

위 명령을 수행하면 다음과 같이 데이터베이스가 선택된다. 

```
mysql> use mysql
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
```

## 현재 선택 된 데이터베이스 확인하기

작업을 하다보면 현재 작업 중인 데이터베이스가 무엇인지 확인 할 필요가 있다. 이럴 땐 다음 명령을 사용한다. 

```
mysql > select database();
```

앞서 'mysql' 데이터베이스를 선택한 상태에서 위 명령을 수행하면 다음과 같이 'mysql' 데이터베이스를 사용하고 있다는 메시지를 받게 될 것이다. 

```
+------------+
| database() |
+------------+
| mysql      |
+------------+
1 row in set (0.00 sec)
```

## 특정 데이터베이스에 속하는 테이블 목록 확인하기 

이제 데이터베이스를 선택했으니 어떤 테이블들이 존재하는지 다음 명령을 통해 확인하자.

```
mysql > show tables;
```

'mysql' 데이터베이스를 선택한 상태에서 위 명령을 수행하면 다음과 같은 테이블 목록을 확인할 수 있다. 
```
+---------------------------+
| Tables_in_mysql           |
+---------------------------+
| columns_priv              |
| db                        |
| event                     |
| func                      |
| general_log               |
| help_category             |
| help_keyword              |
| help_relation             |
| help_topic                |
| host                      |
| ndb_binlog_index          |
| plugin                    |
| proc                      |
| procs_priv                |
| proxies_priv              |
| servers                   |
| slow_log                  |
| tables_priv               |
| time_zone                 |
| time_zone_leap_second     |
| time_zone_name            |
| time_zone_transition      |
| time_zone_transition_type |
| user                      |
+---------------------------+
```

## 특정 테이블의 스키마 정보 확인하기 

다음 명령을 통해 특정 테이블의 스키마 정보를 확인할 수 있다. 

```
mysql > describe <table name>
```

앞서 출력한 테이블 목록 중 'db' 테이블의 스키마 정보를 확인해보자. 

```
mysql > describe db;
```

결과는 다음과 같다. 

```
+-----------------------+---------------+------+-----+---------+-------+
| Field                 | Type          | Null | Key | Default | Extra |
+-----------------------+---------------+------+-----+---------+-------+
| Host                  | char(60)      | NO   | PRI |         |       |
| Db                    | char(64)      | NO   | PRI |         |       |
| User                  | char(16)      | NO   | PRI |         |       |
| Select_priv           | enum('N','Y') | NO   |     | N       |       |
| Insert_priv           | enum('N','Y') | NO   |     | N       |       |
| Update_priv           | enum('N','Y') | NO   |     | N       |       |
| Delete_priv           | enum('N','Y') | NO   |     | N       |       |
| Create_priv           | enum('N','Y') | NO   |     | N       |       |
| Drop_priv             | enum('N','Y') | NO   |     | N       |       |
| Grant_priv            | enum('N','Y') | NO   |     | N       |       |
| References_priv       | enum('N','Y') | NO   |     | N       |       |
| Index_priv            | enum('N','Y') | NO   |     | N       |       |
| Alter_priv            | enum('N','Y') | NO   |     | N       |       |
| Create_tmp_table_priv | enum('N','Y') | NO   |     | N       |       |
| Lock_tables_priv      | enum('N','Y') | NO   |     | N       |       |
| Create_view_priv      | enum('N','Y') | NO   |     | N       |       |
| Show_view_priv        | enum('N','Y') | NO   |     | N       |       |
| Create_routine_priv   | enum('N','Y') | NO   |     | N       |       |
| Alter_routine_priv    | enum('N','Y') | NO   |     | N       |       |
| Execute_priv          | enum('N','Y') | NO   |     | N       |       |
| Event_priv            | enum('N','Y') | NO   |     | N       |       |
| Trigger_priv          | enum('N','Y') | NO   |     | N       |       |
+-----------------------+---------------+------+-----+---------+-------+
```

## 참고

* [4.4 Getting Information About Databases and Tables](http://www.w3resource.com/mysql/string-functions/mysql-length-function.php)
