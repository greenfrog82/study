# [next(iterator[, default])](https://docs.python.org/2/library/functions.html#next)

`next()`는 전달받은 `iterator`의 다음 아이템을 반환한다. 만약 `default` 파라메터가 설정되어 있다면, `iterator`가 모든 아이템을 반환했을 때 설정 된 `default` 파라메터를 반환하고 그렇지 않으면 `StopIteration`예외를 발생시킨다.  

New in version 2.6.

## Example

`default`파라메터를 전달하지 않은 경우 예제를보자.  
`iterator`가 모든 아이템을 반환하면 `StopIteration`예외를 발생시킨다.  

```python
>>> it = (i for i in range(3))
>>> next(it)
0
>>> next(it)
1
>>> next(it)
2
>>> next(it)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
StopIteration
```

`default`파라메터에 `None`을 전달해보자.  
`iterator`가 모든 아이템을 반환하면 `None`을 반환한다.   

```python
>>> it = (i for i in range(3))
>>> next(it, None)
0
>>> next(it, None)
1
>>> next(it, None)
2
>>> next(it, None)
>>>
```