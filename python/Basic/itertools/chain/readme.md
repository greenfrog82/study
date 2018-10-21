# [itertools.chain(*iterables)](https://docs.python.org/2/library/itertools.html#itertools.chain)

`Python3`

iterable 목록을 하나의 iterator로 반환한다.  

해당 함수의 구현은 대강 다음과 같다. 

[roughly_chain.py](./roughly_chain.py)
```python
def chain(*iterables):
    # chain('ABC', 'DEF') --> A B C D E F
    for it in iterables:
        for element in it:
            yield element
```

해당 함수를 사용은 아주 간단하다. 다음 예제를 확인하자. 

[ex_1.py](./ex_1.py)
```python
from itertools import chain

str_1 = 'abc'
str_2 = 'def'

print(list(chain(str_1, str_2)))
> ['a', 'b', 'c', 'd', 'e', 'f']
```