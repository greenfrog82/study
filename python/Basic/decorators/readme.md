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
    """This is a test function for decorator."""
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
    """This is a test function for decorator."""
    print 'tester'

test_func()
```

## [functools.wraps](https://docs.python.org/2/library/functools.html#functools.wraps)

앞선 예제에서 다음과 같이 test_func 함수의 metadata 중 함수 이름과 docstring을 출력해보자.

[ex_wraps.py](./ex_wraps.py)
```python
def sample_decorator(func):
    def wrapper(*args, **kwargs):
        print 'Begin decorator'
        func()
        print 'End decorator'
    return wrapper

@sample_decorator
def test_func():
    """This is a test function for decorator."""
    print 'tester'

print test_func.__name__
print test_func.__doc__
```

위 예제의 실행 결과는 다음과 같다.

```
wrapper
None
```

위 결과를 예상했던 그렇지 않았던간에 이는 당연한 결과이다. test_func 함수는 sample_decorator의 wrapper 내장 함수에 의해 wrapping되고 sample_decorator는 wrapper 내장 함수를 반환학 때문에 wrapper 내장함수의 이름과 docstring(wrapper 내장함수는 docstring이 존재하지 않으므로 None이 출력되었다.)이 출력된 것이다.

위 문제는 어떻게 보면 사소한것으로 보일지 모르지만, [pydoc](https://docs.python.org/2/library/pydoc.html)과 같이 function의 metadata를 이용하는 툴을 사용하는 경우 잘못된 결과를 얻을 수 있기 때문에 Decorator를 사용할 때는 반드시 주의해야한다.

위 문제를 해결하기 위해서는 [functools.wraps](https://docs.python.org/2/library/functools.html#functools.wraps)라는 Decorator를 사용한다. [functools.wraps](https://docs.python.org/2/library/functools.html#functools.wraps)는 특정 함수를 wrapping하는 함수의 metadata를 특정함수의 것으로 바꿔주는 역할을 한다.

위 예제를 정상적으로 동작하도록 수정하면 다음과 같다.

[ex_wraps.py](./ex_wraps.py)
```python
from functools import wraps

def sample_decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print 'Begin decorator'
        func()
        print 'End decorator'
    return wrapper

@sample_decorator
def test_func():
    """This is a test function for decorator."""
    print 'tester'

print test_func.__name__
print test_func.__doc_
```

위 예제의 실행결과는 다음과 같다.

```
test_func
This is a test function for decorator.
```

## Decorator에 인자 전달하기

인자를 전달받는 Decorator를 구현하는 방법은 아주 간단하다. 그저 wrapper 함수를 내부함수로 하는 함수를 하나 더 정의해주면 되기 때문이다.
다음 예제를 보면 바로 이해가 될 것이다.

[ex_decorator_args.py](./ex_decorator_args.py)
```python
from functools import wraps

def sample_decorator(msg):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            print 'Begin decorator'
            print 'Message : %s' % msg
            func(*args, **kwargs)
            print 'End decorator'
        return wrapper
    return decorator

@sample_decorator('This decorator is test for decorator which is accepted to pass arguments.')
def test():
    print 'tester'

test()
```

위 예제의 실행 결과는 다음과 같다.

```
Begin decorator
Message : This decorator is test for decorator which is accepted to pass arguments.
tester
End decorator
```

## Decorator 중첩 사용하기

마지막으로, Decorator를 중첩 사용하는 방법은 wrapped되는 함수에 Decorator를 호출되는 순서에 따라 선언해주면되는데, 호출 순서는 위에서부터이다.

역시 아주 간단하므로 다음 예제르 보자.

[ex_be_piled_up_one_on_another.py](ex_be_piled_up_one_on_another.py)
```python
from functools import wraps

def decorator_1(func):
    @wraps(func)
    def wrapper_1(*args, **kwargs):
        print 'Begin decorator_1'
        func(*args, **kwargs)
        print 'End decorator_1'
    return wrapper_1

def decorator_2(func):
    @wraps(func)
    def wrapper_2(*args, **kwargs):
        print 'Begin decorator_2'
        func(*args, **kwargs)
        print 'End decorator_2'
    return wrapper_2

@decorator_1
@decorator_2
def test():
    print 'I am test function of python.'


test()
```

위 예제의 실행 결과는 다음과 같다.

```
Begin decorator_1
Begin decorator_2
I am test function of python.
End decorator_2
End decorator_1
```

## 참조

* [Primer on Python Decorators](https://realpython.com/blog/python/primer-on-python-decorators/)
* [What does functools.wraps do?](http://stackoverflow.com/questions/308999/what-does-functools-wraps-do)
