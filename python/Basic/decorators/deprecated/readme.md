## deprecated decorator

유지보수 업무를 하다보면 이미 제공되어 널리 사용되고 있는 API에 문제가 있어서 사용자들에게 해당 API의 삭제를 알리고 다른 API로의 유도가 필요한 경우가 있다.

C#이나 Java와 같은 언어를 사용하는 경우 @Obsolete나 @deprecated 같은 annotation을 API에 붙여줄 수 가 있다. 이를 사용하면 해당 API의 호출은 가능하지만 compile시 해당 API의 사용을 권장하지 않는다던가, 다른 API를 사용하라는 메시지를 출력해 줄 수 있다.

물론, Open API와 같은 경우는 네트워크를 통해 해당 API를 호출하기 때문에 이러한 이점을 볼 수 없겠지만 적어도 라이브러리와 같이 Application에서 직접 API를 호출하는 경우는 유용하게 사용할 수 있다.

따라서, 이러한 feature는 python에서도 사용하기 위해서 찾아보았지만, 몇몇 검색되는 코듣들은 있지만 공식적인 라이브러리는 없는것 같아 python에서 사용할만한 deprecated 모듈을 하나 작성해보고자 한다.

[deprecated.py](./src/deprecated.py)
```python
import warnings
from functools import wraps

def deprecated(msg=None):
    def _deprecated(func):
        """
        This is a decorator which can be used to mark functions
        as deprecated. It will result in a warning being emmitted
        when the function is used.
        """
        @wraps(func)
        def wrapper(*args, **kwargs):
            warnings.simplefilter('always', DeprecationWarning)#turn off filter

            warning_msg = None

            if msg is None:
                warning_msg = "Call to deprecated function {}.".format(func.__name__)
            else:
                warning_msg = "Call to deprecated function {}.\n{}.".format(func.__name__, msg)

            warnings.warn(warning_msg, category=DeprecationWarning, stacklevel=2)

            warnings.simplefilter('default', DeprecationWarning) #reset filter

            return func(*args, **kwargs)
        return wrapper
    return _deprecated
```

위 모듈을 사용해보자. 다음 예제를 확인하기 바란다.

```python
@deprecated()
def some_old_function(x, y):
    return x + y

class SomeClass:
    @deprecated('You do not use this method anymore')
    def some_old_method(self, x, y):
        return x + y


some_old_function(1, 2)

obj = SomeClass()
obj.some_old_method(1, 2)

print SomeClass.some_old_method.__name__
```

출력 결과는 다음과 같으며, DeprecationWarning이 발생하더라도 프로그램이 실행되는데는 아무 문제 없음을 알 수 있다.

```bash
/Users/greenfrog/develop/study/python/Basic/decorators/deprecated/src/deprecated.py:47: DeprecationWarning: Call to deprecated function some_old_function.
  some_old_function(1, 2)
/Users/greenfrog/develop/study/python/Basic/decorators/deprecated/src/deprecated.py:50: DeprecationWarning: Call to deprecated function some_old_method.
You do not use this method anymore.
  obj.some_old_method(1, 2)
some_old_method
[Finished in 0.044s]
```

## 참조

* [@DEPRECATED (PYTHON RECIPE)](http://code.activestate.com/recipes/391367-deprecated/)
