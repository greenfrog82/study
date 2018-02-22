# About patch problem

몇일 전에 친한 형이 테스트 코드를 작성하다 Mocking을 하였는데, 문제가 있었다고 했다. 그리고 문제를 해결한 후 우리에게 해결해보라고 문제로 내주었다.   
오늘은 이 문제가 무엇이고 어떻게 해결해야하는지 알아보도록 한다. 

## Problem

우선 폴더구조는 다음과 같다. 

```sh
src
|-- a.py
|-- b.py
`-- test.py
```

각 모듈에 작성된 코드는 다음과 같다. 

```python
# a.py

def get_zipcode():
    return 'xxx-xxx'
```
```python
# b.py

from a import get_zipcode

def test_target():
    return get_zipcode()
```
```python
# test.py

import unittest
from mock import patch
from b import test_target

class MockTest(unittest.TestCase):
    @patch('a.get_zipcode') 
    def test(self, mm):
        mm.return_value = ''        
        self.assertEqual(test_target(), '') 

if __name__ == '__main__':
    unittest.main()
```

위 코드들을 실행시켜 보기 전에 문제를 찾을수 있는가? 나는 아무리 살펴보아도 문제를 찾지 못했다. 
이제 실행해보면 다음과 같이 assert가 발생한다. 

```sh
F
======================================================================
FAIL: test (__main__.MockTest)
----------------------------------------------------------------------
Traceback (most recent call last):
  File "/usr/local/lib/python2.7/dist-packages/mock/mock.py", line 1305, in patched
    return func(*args, **keywargs)
  File "test.py", line 10, in test
    self.assertEqual(test_target(), '')
AssertionError: 'xxx-xxx' != ''

----------------------------------------------------------------------
Ran 1 test in 0.003s

FAILED (failures=1)
```

분명히 patch decorator를 통해 a모듈의 get_zipcode 함수를 patch하여 return_value를 빈문자열로 할당하였는데, 위 결과를 보면 get_zipcode함수가 여전히 'xxx-xxx'를 반환하였다. 왜 이런 문제가 발생하는 것일까? 

## Solution

위 문제를 해결하기 위해서는 **mock**모듈의 **patch** decorator가 어떻게 동작하는지 알고 있어야한다. 다음 링크를 보면 동작원리에 대해서 알 수 있다. 

[26.5.3.9. Where to patch](https://docs.python.org/3/library/unittest.mock.html#where-to-patch)

위 내용을 간추리면 다음과 같다.  
**patch** decorator는 테스트하고자 하는 함수가 Mocking하고자 하는 함수를 import하는 방식에 따라 함수를 Mocking한다.
따라서 이번 문제에서 Mocking하고자 하는 test_target 함수의 모듈이 from a import get_zipcode로 get_zipcode를 사용하고 있으므로 다음과 같이 patch를 해야 정상적으로 Mocking을 할 수 있다. 

```python
import unittest
from mock import patch
from b import test_target

class MockTest(unittest.TestCase):
    @patch('b.get_zipcode') # Solution
    def test(self, mm):
        mm.return_value = ''        
        self.assertEqual(test_target(), '') 

if __name__ == '__main__':
    unittest.main()
````

위 코드를 실행시키면 다음과 같이 정상적으로 실행되는것을 알 수 있다. 

```sh
.
----------------------------------------------------------------------
Ran 1 test in 0.000s

OK
```

## Consideration

앞서 **Solution**에서도 이야기헀지만, **patch** decorator는 테스트하고자 하는 함수가 Mocking하고자하는 함수를 import하는 방식에 따라 Mocking하는 방식을 달리해야한다. 

앞선 문제에서 b 모듈이 a 모듈의 get_zipcode 함수를 import하는 방식을 다음과 같이 달리한다면, Mocking하는 방법 역시 다음과 같이 달라져야한다. 

```python
# b.py

import get_zipcode

def test_target():
    return a.get_zipcode() 
```
```python
# test.py

import unittest
from mock import patch
from b import test_target

class MockTest(unittest.TestCase):
    @patch('a.get_zipcode') # Solution
    def test(self, mm):
        mm.return_value = ''        
        self.assertEqual(test_target(), '') 

if __name__ == '__main__':
    unittest.main()
```

위 코드를 실행시키면 정상적으로 잘 동작함을 알 수 있다. 

## Reference

* [Python Mocking a function from an imported module](https://stackoverflow.com/questions/16134281/python-mocking-a-function-from-an-imported-module)
* [26.5.3.9. Where to patch](https://docs.python.org/3/library/unittest.mock.html#where-to-patch)