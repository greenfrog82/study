# for loop에서 dictionary 사용하기

## 개요

파이썬의 dictionary를 for loop를 통해 순회하는 방법을 알아본다. 

데이터는 다음과 같다.

```python
sample = {
    'name': 'greenfrog',
    'age': 36,
    'job': 'programmer'
}
```

## 방법 1

첫번째 방법은 dictionary의 key를 통해 순회하는 방법이다. 

```python
for key in sample:
    value = sample[key]
    print('sample[' + key + '] = ' + str(value))
```

## 방법 2

두번째 방법은 dictionary의 key, value 쌍을 통해 순회하는 방법이다. 
이 방법은 Python 2와 Python 3가 사용하는 dictionary의 member함수가 다르다. 

## Python 2

```python
for key, value in sample.iteritems():
    print(key + ' : ' + str(value))
```

## Python 3

```python
for key, value in sample.item():
    print(key + ' : ' + str(value))
```

Python 3에서는 iteritems() 메소드가 items() 메소드로 대체 되었다고 한다. 둘 다 이터레이터를 반환하며 이를 이용해서 for loop를 순회 할 때 해당 dictionary에 대해서 아이템의 추가, 삭제를 수행하면 runtime 에러가 발생한다. 

Python 2에서도 items() 메소드를 사용할 수 있는데, 이 메소드는 iteritems() 메소드나 Python3의 items()메소드와 달리 이터레이터를 반환하는 것이 아니라 (key, value) 쌍의 튜플을 반환한다. 따라서, (key, value)쌍을 갖는 튜플을 새로 생성하므로 별도의 메모리 공간을 사용한다.

## 참조

* [Iterating over dictionaries using for loops in Python](http://stackoverflow.com/questions/3294889/iterating-over-dictionaries-using-for-loops-in-python)
* [What is difference between dic.iters() and dic.iteritems()?](http://stackoverflow.com/questions/10458437/what-is-the-difference-between-dict-items-and-dict-iteritems)