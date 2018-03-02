# How to get latest date in specific period

다음과 같은 데이터가 있다고 가정할 때, 가장 최근 결과를 가져오는 Query를 작성해보자. 

```
+----+---------------------+--------------+--------+
| id | curr                | target_group | target |
+----+---------------------+--------------+--------+
|  1 | 2016-01-05 05:30:21 | A            | A.a    |
|  2 | 2016-01-05 05:30:21 | A            | A.b    |
|  3 | 2016-01-05 05:30:21 | A            | A.c    |
|  4 | 2018-01-05 05:30:21 | B            | B.a    |
|  5 | 2018-01-05 05:30:21 | B            | B.b    |
|  6 | 2018-01-05 05:30:21 | B            | B.c    |
|  7 | 2017-01-05 05:30:21 | C            | C.a    |
|  8 | 2017-01-05 05:30:21 | C            | C.b    |
|  9 | 2017-01-05 05:30:21 | C            | C.c    |
+----+---------------------+--------------+--------+
```

원하는 결과는 다음과 같다. 

```
+----+---------------------+--------------+--------+
| id | curr                | target_group | target |
+----+---------------------+--------------+--------+
|  4 | 2018-01-05 05:30:21 | B            | B.a    |
|  5 | 2018-01-05 05:30:21 | B            | B.b    |
|  6 | 2018-01-05 05:30:21 | B            | B.c    |
+----+---------------------+--------------+--------+
```

## Prepare sample data 

먼저, 다음 쿼리를 통해 위 테스트 데이터를 생성하도록 하자. 

```sql
create table tb_test (
	id int(10) unsigned not null auto_increment primary key,
    curr datetime not null,
	target_group varchar(30) not null,
    target varchar(30) not null
);

insert into tb_test (curr, target_group, target) value ('2016-01-05 05:30:21', 'A', 'A.a');
insert into tb_test (curr, target_group, target) value ('2016-01-05 05:30:21', 'A', 'A.b');
insert into tb_test (curr, target_group, target) value ('2016-01-05 05:30:21', 'A', 'A.c');

insert into tb_test (curr, target_group, target) value ('2018-01-05 05:30:21', 'B', 'B.a');
insert into tb_test (curr, target_group, target) value ('2018-01-05 05:30:21', 'B', 'B.b');
insert into tb_test (curr, target_group, target) value ('2018-01-05 05:30:21', 'B', 'B.c');

insert into tb_test (curr, target_group, target) value ('2017-01-05 05:30:21', 'C', 'C.a');
insert into tb_test (curr, target_group, target) value ('2017-01-05 05:30:21', 'C', 'C.b');
insert into tb_test (curr, target_group, target) value ('2017-01-05 05:30:21', 'C', 'C.c');
```

## Query 

가장 최근 결과를 가져오기 위해서는 위 테이블에서 최신 날짜의 데이터를 구한 후 이 날짜에 해당하는 데이터를 조회하면 된다.  
이를 만족하는 쿼리는 다음 두 가지 정도일 것이다. 

### Method 1

```sql
select * from tb_test where curr = (
	select max(curr) from tb_test
)
```

### Method 2

```sql
select 
	a.id,
    a.curr,
    a.target_group,
    a.target
from tb_test as a inner join (
	select max(curr) as curr from tb_test
) as b
	on a.curr = b.curr
```