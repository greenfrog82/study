# About time objects

time object는 하루의 시간을 다룬다. 따라서 표현할 수 있는 최소 시간은 0시 0분 0초이고 최대 시간은 23시 59분 59초가 된다. 

## Class attribute

### time.min

하루의 시간 중 최소시간을 표현한다.  

```python
>>> from datetime import time
>>> time.min
datetime.time(0, 0)
```

### time.max

하루의 시간 중 최대시간을 표현한다.

```python
>>> from datetime import time
>>> time.max
datetime.time(23, 59, 59, 999999)






# Reference

* [datetime](https://docs.python.org/3/library/datetime.html)
