# type() vs isinstance()

파이썬에서 해당 변수의 타입을 검사하는 방법은 type 함수를 사용하거나 isinstance 함수를 사용하는 것이다.
이들에는 각각 차이점이 있는데 다음 예제를 보자.

dictionary를 상속받는 MyDict라는 클래스를 하나 정의하였다. 이를 type 함수를 통해 타입 검사를 해보자.

```python
class MyDict(dict):
    """A normal dict, that is always created with an "initial" key"""
    def __init__(self):
        self["initial"] = "some data"

d = MyDict()
print 'd = MyDict()'
print 'type(d) == dict : ', type(d) == dict    # False
print 'type(d) == MyDict : ', type(d) == MyDict  # True
print ''

d = dict()
print 'd = dict()'
print 'type(d) == dict : ', type(d) == dict    # True
print 'type(d) == MyDict : ', type(d) == MyDict  # False
print ''
```

결과는 다음과 같다.
MyDict가 dictionary를 상속하고 있지만, dictionary 타입으로는 인식을 못한다. dictionary 타입을 인자로 받는 함수가 dictionary 타입을 검사하여 동작을 한다면, MyDict로 생성한 변수는 dictionary의 기능을 수행할 수 있음에도 불구하고 정상적으로 동작하지 않을 것이다.

```
d = MyDict()
type(d) == dict :  False
type(d) == MyDict :  True

d = dict()
type(d) == dict :  True
type(d) == MyDict :  False
```

그렇다면, isinstance 함수를 통해서 위 예제의 타입 검사를 해보면 어떻게 될까? type 함수를 사용해서 타입 검사를 하던 코드를 isinstance 함수를 사용하도록 수정해보자.

```python
d = MyDict()
print 'd = MyDict()'
print 'isinstance(d, MyDict) : ', isinstance(d, MyDict)  # True
print 'isinstance(d, dict) : ', isinstance(d, dict)  # True
print ''

d = dict()
print 'd = dict()'
print 'isinstance(d, MyDict) : ', isinstance(d, MyDict) # False
print 'isinstance(d, dict) : ', isinstance(d, dict) # True
```

결과는 다음과 같다. type 함수와 달리 isinstance 함수를 사용하면 MyDict 역시 dictionary 타입으로 인지를 한다.

```
d = MyDict()
isinstance(d, MyDict) :  True
isinstance(d, dict) :  True

d = dict()
isinstance(d, MyDict) :  False
isinstance(d, dict) :  True
```

## 결론

따라서, 파이썬에서 일반적인 경우 타입 검사를 할 때는 type 함수를 사용하는 것 보다는 isinstance 함수를 사용하는 것이 적절해보인다.
하지만, 무조건 type 함수의 사용을 지양해야할까? type 함수의 경우는 해당 변수에 할당 된 객체의 타입을 특정 타입으로 특정한다. 따라서 MyDict에 dictionary가 가지고 있지 않은 특수한 기능을 추가하고 이를 사용하는 함수가 있다면 isinstacne 보다는 type 함수를 사용하는 경우가 더 적절할 것이다.

## 참조

* [Using type() to compare types](https://docs.quantifiedcode.com/python-anti-patterns/readability/do_not_compare_types_use_isinstance.html)
* [type() vs isinstance()](https://blog.duraffort.fr/post/2016/05/03/type-vs-isinstance/)
