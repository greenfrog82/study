# Dictionary에서 데이터를 가져오는 두 가지 방법과 주의사항

파이썬의 Dictionary에서 key에 해당하는 value를 가져오는 방법은 다음 두가지이다. 

* dictionary['key']
* dictionary.get('key')

위 두 가지 방법 모두 key에 해당하는 value를 가져오지만 조금씩 다른 특성이 있다. 이에 대해서 알아보도록 하자.

**[주의]**

Python에서는 JavaScript에서와 같이 dictionary.key 와 같은 방식으로 value를 얻어오는 방법은 존재하지 않는다.

[dictionary_key.py](./dictionary_key.py)

```python
sample = {
    'name': 'greenfrog',
    'age': 36
}

print(sample.name)
```

[Result]

```
Traceback (most recent call last):
  File "d:\develop\study\python\Basic\dictionary\get_value\src\dictionary_key.py", line 6, in <module>
    print(sample.name)
AttributeError: 'dict' object has no attribute 'name'
```

## dictionary['key']

dictionary변수에 []안에 key값을 문자열로 전달하는 방식이다. 

이때, 반드시 []안에 key값을 문자열로 전달하여야 하고, 반드시 옳바른 key값을 전달해야한다. 이 두 조건이 만족하지 않으면 **에러**를 발생시킨다.

다음 코드를 실행시키면, sample dictionary에 'test'에 해당하는 key가 존재하지 않으므로 'KeyError'를 발생시킨다.

[dictionary_squared_blacket.py](./dictionary_squared_blacket.py)

```python
sample = {
    'name': 'greenfrog',
    'age': 36
}

# 잘못 사용한 예.
print(sample['test'])
```

**[결과]**
```
Traceback (most recent call last):
  File "d:\develop\study\python\Basic\dictionary\get_value\src\dictionary_squared_blacket.py", line 7, in <module>
    print(sample['test'])
KeyError: 'test'
```

따라서, 이 방법을 사용하는 경우 예외처리를 적절히 해주지 않으면 프로그램이 예기치 않게 죽어버릴 수 있으므로 주의해야한다. 

다음은 위 예제에서 예외처리를 추가한 코드이다. 

[dictionary_squared_blacket.py](./dictionary_squared_blacket.py)

```python
try:
    print(sample['test'])
except KeyError:
    print("There is no value of '%s' key." % 'test')
```

## dictionary.get('key')

dictionary의 get 메소드에 key값을 전달해서 value를 얻어오는 방식이다. []사용하는 방식과 달리 dictionary에 존재하지 않는 key값을 전달했을 경우 KeyError를 발생하지 않고 get 메소드의 두번째 인자인 default인자에 설정된 기본값을 반환해준다.
만약, default 파라메터의 값을 설정해주지 않으면 기본으로 None이 설정되어 호출된다. 

예를들어, 다음 코드와 같이 dictionary의 get 메소드의 첫번째 인자로 'test'를 전달하고 두번째 인자를 생략하면 None이 전달되어 메소드가 호출되고 sample dictionary에는 'test' key가 존재하지 않으므로 None을 반환한다. 

[dictionary_get.py](/dictionary_get.py)

```python
sample = {
    'name': 'greenfrog',
    'age': 36
}

print(sample.get('test'))
```

**[결과]**
```
None
```

위 예제에서 get 메소드의 두번째 인자로 "There is no value of 'test' key."를 전달하면 두번째 인자의 값이 출력된다.

[dictionary_get.py](/dictionary_get.py)
```python
sample = {
    'name': 'greenfrog',
    'age': 36
}

value = sample.get('test', ("There is no value of '%s' key." % 'test'))
print(value)
```

**결과**
```
There is no value of 'test' key.
```

따라서, get 메소드를 사용하는 경우 전달받은 key에 대한 value가 존재하지 않는지 반환값을 통해 반드시 확인해야한다. 또는 문제가 생기지 않을 default값을 설정해주는 방법을 사용한다. 

## 참조

* [Python Dictionary](https://www.tutorialspoint.com/python/python_dictionary.htm)
* [Python dictionary get() Method](https://www.tutorialspoint.com/python/dictionary_get.htm)