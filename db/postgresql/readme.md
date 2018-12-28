# Transaction Isolation Level

## How to know my transaction isolation level

Postgresql의 command에서 다음 명령을 통해 현재 설정 된 Transaction Isolation Level을 확인할 수 있다. 

```sql
psql> SHOW default_transaction_isolation;   
read commited
```

사실 위 명령은 `SHOW ALL`명령을 통해 확인할 수 있는 속성 중 하나이다. 

```sql
SHOW ALL;  
transaction_deferrable              | off                                                          | Whether to defer a read-only serializable transaction until it can be executed with no possible serialization failures.  
transaction_isolation               | read committed                                               | Sets the current transaction's isolation level.  
transaction_read_only               | off                                                          | Sets the current transaction's read-only status.  
```

# Reference

* [13.2. Transaction Isolation](https://www.postgresql.org/docs/11/transaction-iso.html)