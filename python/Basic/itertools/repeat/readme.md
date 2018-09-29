# [itertools.repeat(object[, times])](https://docs.python.org/3/library/itertools.html#itertools.repeat)

`Python3`

parameter로 전달받은 object를 무한히 반환하는 iterator를 반환한다. 
만약 times 파라메터가 전달되었다면, times로 전달 된 수 만큼 object를 반환하는 iterator를 반한한다. 

일반적으로 map()이나 zip()함수에서 변하지 않는 파라메터를 전달히기 위해 주로 사용된다.  

itertools.repeat는 대략 다음과 같이 구현되어 있다. 

```python
def repeat(object, times=None):
    # repeat(10, 3) --> 10 10 10
    if times is None:
        while True:
            yield object
    else:
        for i in range(times):
            yield object
```

## Basic Example

repeat을 사용하는 가장 간단한 예제를 확인해보자.   
아래와 같이 itertools.repeat 함수에 반복을 워하는 값을 전달하면 해당 값을 무한이 반복하는 iterator를 반환한다. 

[ex_1.py](./ex_1.py)
```python
from itertools import repeat

it = repeat(10)

print(next(it))
print(next(it))

...

print(next(it))
```

위 예제를 실행해보면 무한이 10을 반환하는 것을 확인 할 수 있다.

```bash
10
10

...

10
```

이번에는 `times` 파라메터를 전달해서 특정 횟수만 특정 값을 반환하도록 해보자. 

[ex_2.py](./ex_2.py)
```python
from itertools import repeat

it = repeat(10, 3)

for i in it:
    print(i)
```

위 예제의 실행 결과는 다음과 같이 3번만 10을 반복한다.  

```bash
10
10
10
```

## Advanced Example

`itertools.repeat`을 `map`, `zip`과 함께 사용해보자.  

다음 예제는 `map`을 통해 0 ~ 9까지의 값을 반환하는 iterator를 전달하고 `itertools.repeat`을 통해 2을 반환하는 iterator를 전달하여 pow 함수를 통해 각 값이 2제곱된 iterator를 반환한다.  

```python
from itertools import repeat

lst = list(map(pow, range(10), repeat(2)))

print(lst)
```

실행결과는 다음과 같다. 

```bash
[0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
```