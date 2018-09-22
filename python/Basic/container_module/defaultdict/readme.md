# defaultdict

`Python 2.7.14`

>class collections.defaultdict([default_factory[, ...]])

defaultdict는 [dict](https://docs.python.org/2.7/library/stdtypes.html#dict)의 서브클래스로 value가 설정되지 않은 key에 접근할 때 default_factory를 통해 default value를 할당하는 것 이외의 나머지 기능들은 [dict](https://docs.python.org/2.7/library/stdtypes.html#dict)와 동일하다.  

`default_factory`로는 클래스와 함수가 전달 될 수 있다.
`default_factory`를 전달하지 않는 경우 default값은 `None`이다. 

# __missing__(key)

__missing__()는 dict의 __getitem__()이 호출될 때 해당 key가 존재하지 않는 경우 호출되며, default_factory를 호출하여 default value를 해당 key에 할당한다. 

하지만 **default_factory**가 None일 경우, **KeyError** exception이 발생하며 변경되지 않고 전파된다.  

# Example

## default_factory

앞서 `default_factory`로 클래스와 함수를 전달 할 수 있다고 했다.  
각각 클래스와 함수를 만들어서 `default_factory`로 전달 한 후 어떻게 동작하는지 살펴보자.  

[ex_default_factory.py](./ex_default_factory.py)
```python
from collections import defaultdict

class default_factory_by_class(object):
    @property
    def factory_name(self):
        return self._name

    @factory_name.setter
    def factory_name(self, value):
        self.name = value


dd = defaultdict(default_factory_by_class)
dd['a'].name = 100
print dd['a'].name # print 100


def default_factory_by_function():
    return 'default_factory_by_function'

dd = defaultdict(default_factory_by_function)
print dd['a'] # print default_factory_by_function

## Example of Python Doc

[8.3.3.1. defaultdict Examples](https://docs.python.org/2.7/library/collections.html#defaultdict-examples)의 예제를 소개한다. 

defaultdict는 특정 그룹에 속한 데이터를 만들어낼 때 굉장히 편리하다. 
다음 에제를 보자. 

[ex_list.py](./ex_list_py)
```python
from collections import defaultdict

s = [('yellow', 1), ('blue', 2), ('yellow', 3), ('blue', 4), ('red', 1)]
d = defaultdict(list)

for k, v in s:
    d[k].append(v)

print d.items()  # [('blue', [2, 4]), ('red', [1]), ('yellow', [1, 3])]
```

위 예제는 [dict.setdefault()](https://docs.python.org/2.7/library/stdtypes.html#dict.setdefault)를 통해 동일하게 처리할 수 있지만 `defaultdict`를 사용하는것이 더 간결하고 빠르다.  
다음은 앞선 예제를 [dict.setdefault()](https://docs.python.org/2.7/library/stdtypes.html#dict.setdefault)를 통해 처리한 예제이다. 

[ex_list_with_dict_setdefault.py](./ex_list_with_dict_setdefault.py)
```python
from collections import defaultdict

s = [('yellow', 1), ('blue', 2), ('yellow', 3), ('blue', 4), ('red', 1)]
d = {}

for k, v in s:
    d.setdefault(k, []).append(v)

print d.items()  # [('blue', [2, 4]), ('red', [1]), ('yellow', [1, 3])]
```

default_factory에 int를 전달하면 iterable 데이터에서 특정 값이 몇 번 반복해서 존재하느지 확인 할 때 굉장히 유용한다.
다음 예제를 보자. 

[ex_int.py](./ex_int.py)
```python
from collections import defaultdict

s = 'mississippi'
d = defaultdict(int) 

for k in s:
    d[k] += 1

print d.items()  # [('i', 4), ('p', 2), ('s', 4), ('m', 1)]
```

default_factory에 set을 전달하면 특정 그룹에 속하는 데이터의 집합을 구할 수 있다. 

[ex_set.py](./ex_set.py)
```python
from collections import defaultdict

s = [('red', 1), ('blue', 2), ('red', 3), ('blue', 4), ('red', 1), ('blue', 4)]
d = defaultdict(set)

for k, v in s:
    d[k].add(v)

print d.items() # [('blue', set([2, 4])), ('red', set([1, 3]))] 
```


# Reference

* [Python defaultdict() 사용하기](https://dongyeopblog.wordpress.com/2016/04/08/python-defaultdict-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0/)
* [8.3.3. defaultdict objects](https://docs.python.org/2.7/library/collections.html#defaultdict-objects)