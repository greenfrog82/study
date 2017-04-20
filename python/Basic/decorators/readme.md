# Decorator

Python의 Decorator는 Strong Type언어를 통한 OOP에 익숙한 개발자의 경우 Design Pattern의 Decorator Pattern을 생각하면 이와 아주 흡사하다. OOP의 Decorator Pattern을 Function 레벨로 이동시킨 것이기 때문이다.

우선, 아주 간단한 예제를 통해 Python의 Decorator를 경험해보자.

## 간단한 예제

[ex_basic.py](./ex_basic.py)
```python
def sample_decorator(func):
    def wrapper(*args, **kwargs):
        print 'Begin decorator'
        func()
        print 'End decorator'
    return wrapper

def test_func():
    print 'tester'

test_decorator = sample_decorator(test_func)
test_decorator()
```

위 예제는 Python의 Decorator를 설명하기 위한 아주 간단한 예제이다. 예제에서 보는 바와 같이 test_func 함수에 기능을 확장하기 위해서 해당 함수를 wrapping하는 것을 Decorator라고 한다.

위 예제에서는 test_func을 Decorator로 wrapping하기 위해서 sample_decorator에 test_func을 인자로 전달하였지만, 사용방법이 좀 번거로워 보인다. 때문에 Python에서는 Decorator를 통해 특정 함수를 쉽게 wrapping하는 문법을 제공하는데 '@'기호를 사용하는 것이다.

다음 예제는 위 예제를 '@'기호를 통해 wrapping하도록 수정한것이다.

[ex_basic.py](./ex_basic.py)
```python
@sample_decorator
def test_func():
    print 'tester'

test_func()
```

## functools.wraps()




## 참조

* [Primer on Python Decorators](https://realpython.com/blog/python/primer-on-python-decorators/)
* [What does functools.wraps do?](http://stackoverflow.com/questions/308999/what-does-functools-wraps-do)
