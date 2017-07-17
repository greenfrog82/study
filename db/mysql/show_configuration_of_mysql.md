# MySQL의 환경 설정값 조회하기

MySQL 환경 설정값을 조회하는 방법은 다음과 같다.

```sql
mysql> show variables
```

위 명령을 사용하면 다음과 같이 MySQL의 환경 설정 값들이 출력된다.  

```sql
mysql> show variables like 'auto%';
+--------------------------+-------+
| Variable_name            | Value |
+--------------------------+-------+
| auto_increment_increment | 1     |
| auto_increment_offset    | 1     |
| autocommit               | ON    |

...

507 rows in set (0.00 sec)
```

그러면, 특정 환경 설정값을 조회하려면 어떻게 해야할까? 다음과 같이 like 문을 사용하면 된다.

```sql
mysql> show variables like <environment variable name>
```

다음은 relay로 시작하는 환경 변수들의 값을 출력하고있다.

```sql
mysql> show variables like 'relay%';
+---------------------------+---------------------------------------------------------------+
| Variable_name             | Value                                                         |
+---------------------------+---------------------------------------------------------------+
| relay_log                 |                                                               |
| relay_log_basename        | /usr/local/mysql/data/greenfrogui-MacBook-Pro-relay-bin       |
| relay_log_index           | /usr/local/mysql/data/greenfrogui-MacBook-Pro-relay-bin.index |
| relay_log_info_file       | relay-log.info                                                |
| relay_log_info_repository | FILE                                                          |
| relay_log_purge           | ON                                                            |
| relay_log_recovery        | OFF                                                           |
| relay_log_space_limit     | 0                                                             |
+---------------------------+---------------------------------------------------------------+
8 rows in set (0.00 sec)
```

## 참조

* [mysql command for showing current configuration variables](https://stackoverflow.com/questions/1493722/mysql-command-for-showing-current-configuration-variables)
