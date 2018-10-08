# else clause in for-loop

`Python 2.7`

파이썬에서 for-loop을 사용할 때 `else`절을 사용할 수 있다. `else`절은 for-loop이 `break`를 통해 끝나지 않은 경우 호출된다.  

## Example : for-loop with else

[ex_else.py](./ex_else.py)
```python
>>> for i in xrange(3):
...     print i
... else:
...     print 'This loop is successfully completed.'
...
0
1
2
This loop is successfully completed.
```

## Example : for-loop with break

```python
>>> for i in xrange(3):
...     if 1 < i:
...         print 'This loop is breaked.'
...         break
...     print i
... else:
...     print 'This loop is successfully completed.'
...
0
1
This loop is breaked.
```