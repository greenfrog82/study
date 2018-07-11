# [PEP 448 - Additional Unpacking Generalizations](https://www.python.org/dev/peps/pep-0448/)

Python 3.5버전 이전까지는 **\* iterable unpacking operator**h와 ** \*\* dictionary unpacking operator**의 경우 function의 argument로 밖에 사용할 수 없었다.  
사실 JavaScript의 ES6의 경우 **Object spread operator**의 사용의 제한을 두지 않으므로서 코드를 좀 더 간편하게 작성하게 하고 가독성을 높였다.  

Python 역시 3.5버전에서 **\* iterable unpacking operator**h와 ** \*\* dictionary unpacking operator**의 사용을 function의 argument로 제한하던 제약을 풀어 어디서든 사용할 수 있게 하였다.  

## How to concatenate dictionary and iterable in previous python 3.5

Python 3.5버전 이전에서 dictionary와 iterable를 각각 연결하기 위해서는 다음과 같은 과정을 거쳤다. 

[previous_python_3_5.py](./src/previous_python_3_5.py)
```python
# In case of dictionary
origin_dict = {'a':1, 'b':2}
origin_dict.update({'c':3})

# in case of list
arr = [1, 2, 3]
arr += [4]

from itertools import chain

new_arr = list(chain(arr, [5, 6]))
```

습관적으로 위 코드를 사용해 왔다면 큰 불편함을 못느낄 수 있겠지만 그 동안 function의 argument에서만 사용할 수 있던 **\* iterable unpacking operator**h와 ** \*\* dictionary unpacking operator**을 위 상황에서 사용할 수 있다면 코드가 좀 더 간결해진다. 

## How to using dictionary and iterable unpacking operator

그럼 위 코드를 **dictionary and iterable unpacking operator**로 변경해보자. 

[using_unpacking.py](./src/using_unpacking.py)
```python
# In case of dictionary
origin_dict = {'a':1, 'b':2}
new_dict = {**origin_dict, 'c':3})

# In case of list
arr = [1, 2, 3]
new_arr = [*arr, 4]
```

앞서 말한 것과 달리 별로 간결해 보이지 않는다. 이제 여러개의 dictionary와 여러개의 iterable을 연결해보자.  

[using_unpacking.py](./src/using_unpacking.py)
```python
# In case of dictnionary
dict_1 = {'a':1, 'b':2}
dict_2 = {'d':4, 'e':5}
new_dict = {**dict_1, 'd':4, **dict_2})

# In case of list
arr_1 = [1, 2, 3]
arr_2 = [5, 6, 7]
new_arr = [*arr_1, 4, *arr_2]
```

위와 같이 여러개의 dictionary와 여러개의 iterable을 연결하는 경우 좀 더 직관적으로 코드가 표현됨을 알 수 있다. 

## Reference

* [PEP 448 - Additional Unpacking Generalizations](https://www.python.org/dev/peps/pep-0448/)
* [Is there a Object spread operator in python 2.7x like in Javascript?](https://stackoverflow.com/questions/47875815/is-there-a-object-spread-operator-in-python-2-7x-like-in-javascript)
* [Python Function Unpacking](https://caisbalderas.com/blog/python-function-unpacking-args-and-kwargs/)
