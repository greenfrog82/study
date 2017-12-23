# How to show the create table statement of specific table 

테이블을 생성할 떄 다음 명령을 사용한다. 

> CREATE TABLE

그러면 이미 생성 된 테이블에 대해서 생성 될 당시 사용 된 CREATE TABLE 형식을 확인하는 방법은 어떻게 해야하는지 알아본다. 

#### Requirement

* Mysql ver 5.7.18
* Mac macOS High Sierra 10.13.1 (17B1003)

## SHOW CREATE TABLE

다음 명령을 통해 이미 생성 된 테이블에 대해서 생성 될 당시 사용 된 CREATE TABLE의 형식을 알 수 있다. 

> SHOW CREATE TABLE

다음은 SHOW CREATE TABLE 명령을 통해 class 테이블의 CREATE TABLE 형식을 출력한 것이다. 

```sql
mysql> SHOW CREATE TABLE CLASS;
+-------+-----------------------------------------------------------------------------+
| Table | Create Table
+-------+-----------------------------------------------------------------------------+
| CLASS | CREATE TABLE `CLASS` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `professor_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `professor_id` (`professor_id`),
  CONSTRAINT `class_ibfk_1` FOREIGN KEY (`professor_id`) REFERENCES `professor` (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 |
+-------+-----------------------------------------------------------------------------+
```

## Reference

* [SHOW CREATE TABLE](https://dev.mysql.com/doc/refman/5.7/en/show-create-table.html)