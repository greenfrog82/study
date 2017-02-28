# 문자열과 Collection이 비어있는지 확인하는 방법에 대해서


파이썬에서는 다음 항목들을 'False'로 인지한다. 

* None
* False
* zero of any numeric type, for example, 0, 0.0, 0j.
* any empty sequence, for example, '', (), [].
* any empty mapping, for example, {}.
* instances of user-defined classes, if the class defines a __bool__() or __len__() method, when that method returns the integer zero or bool value False.

따라서, 위 내용을 이용하면 간결한 방법으로 문자열과 Collection이 비어있는지 확인할 수 있다.

형식은 다음과 같다. 

```python
not <문자열> 또는 <Collection>
```

## 빈 문자열인지 확인하는 방법

[empty_string.py]('./src/empty_string.py')
```python
sample = ''

if not sample:
    print('sample is empty.')

if sample:
    print('sample is not empty.')
```

## 빈 리스트인지 확인하는 방법

[empty_list.py]('./src/empty_list.py')
```python
sample = []

if not sample:
    print('sample is empty.')

sample = [1]

if sample:
    print('sample is not empty.')
```

## 빈 튜플인지 확인하는 방법

[empty_tuple.py]('./src/empty_tuple.py')
```python
sample = ()

if not sample:
    print('sample is empty.')

sample = (1)

if sample:
    print('sample is not empty.')
```

## 빈 딕셔너리인지 확인하는 방법

[empty_dictionary.py]('./src/empty_dictionary.py')
```python
sample = {}

if not sample:
    print('sample is empty.')

sample = {'name':'greenfrog'}

if sample:
    print('sample is not empty.')
```

## 참조

* [Most elegant way to check if the string is empty in Python?](http://stackoverflow.com/questions/9573244/most-elegant-way-to-check-if-the-string-is-empty-in-python)
* [Python: Checking if a 'Dictionary' is empty doesn't seem to work](http://stackoverflow.com/questions/23177439/python-checking-if-a-dictionary-is-empty-doesnt-seem-to-work)
* [Python: Best way to check if list is empty without not?](http://stackoverflow.com/questions/16021096/python-best-way-to-check-if-list-is-empty-without-not)
* [Best way to check if a list is empty](http://stackoverflow.com/questions/53513/best-way-to-check-if-a-list-is-empty)
* [Python 2.x, 5.1. Truth Value Testing](https://docs.python.org/2/library/stdtypes.html#truth-value-testing)
* [Python 3.x, 4.1. Truth Value Testing](https://docs.python.org/3/library/stdtypes.html#truth-value-testing)
