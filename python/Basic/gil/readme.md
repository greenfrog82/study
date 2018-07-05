# [What is the Python Global Interpreter Lock(GIL)](https://realpython.com/python-gil/)

## What problem did the GIL solve for Python?

파이썬은 **메모리 관리**를 위해서 **레퍼런스 카운트**를 사용한다.

[./src/ex_1.py](ex_1.py)
```python
import sys

a = []
b = a
print(sys.getrefcount(a)) # 3
print(sys.getrefcount(b)) # 3
```

그런데 문제는 여러개의 스레드가 이러한 레퍼런스 카운트를 동시에 증감 시키려는 race condition이 발생했을 때, 레퍼런스 카운트에 대한 보호가 필요한 것이다.  
이르 위해서 일반적으로 **lock**을 통해 레퍼런스 카운트를 보호할 수 있다.  
하지만 **lock**을 통한 문제 해결은 **Dead lock** 또는 성능 이슈를 가져올 수 있다.  

따라서, 파이썬은 **GIL**을 통해서 **레퍼런스 카운트에 대한 보호**와 **Dead lock** 그리고 **성능** 이슈를 해결하지만, **GIL**은 파이썬 프로그램을 **싱글 스레드** 기반에서 동작하게 한다. 

Ruby와 같이 인터프리터를 사용하는 다른 언어들이 모두 **GIL**을 이용해서 이러한 이슈들을 해결하지는 않는다. 다른 언어들은 **스레드 safety한 메모리 관리**를 위해서 GIL을 사용하지 않고 레퍼런스 카운트 이외에 **garbase colleciton**과 같은 방법을 사용한다.

## Why was the GIL chosen as the solution?

