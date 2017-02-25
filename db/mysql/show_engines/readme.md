# MySQL에서 제공하는 Storage Engine 조회하기

> MySQL version 5.7

MySQL은 데이터를 저장하고 관리하기 위한 여러가지 Storage Engine을 제공한다. 그러면, MySQL이 제공하는 Storage Engine이 어떤 것들이 있고, default storage engine이 무엇인지 확인하는 방법은 무엇일까?

다음 두 가지 방법이 있다. 

```sql
SHOW ENGINES;
```

```sql
SELECT * FROM INFORMATION_SCHEMA.ENGINES;
```

위 두 쿼리의 결과는 다음과 같다. 
MySQL version 5.7이 제공하는 Storage Engine의 종류는 다음과 같으며 InnoDB가 default storag engine 인것을 알 수 있다. 

![storage engines](./show_engines.png)

## 참조

* [14.7.5.16 SHOW ENGINES Syntax](https://dev.mysql.com/doc/refman/5.7/en/show-engines.html)