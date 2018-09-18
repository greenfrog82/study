# Processing Exception

파이썬에서의 예외와 이를 다루는 방법에 대해서 다룬다. 

## try ... except ... else

>else절은 예외가 발생하지 않은 경우 실행되며 반드시 except절 다음에 와야한다.  
일단, 어떻게 동작하는지 살펴보자. 

[try_catch_else](./try_catch_else)

```python
division = 0

try:
    4 / division
except ZeroDivisionError as e:
    print 'ZeroDivisionError'
else:
    print 'There is no error.'
```

위 코드는 division의 값이 0이므로 ZeroDivisionError가 발생할 것이다. 
결과는 예상한데로 다음과 같다.  

```
$ ZeroDivisionError
```

그럼 위 예제에서 division값을 1로 바꾸면? 예외가 발생하지 않으므로 else절이 동작하게 될 것이다.  
결과는 다음과 같다. 

```
$ There is no error.
```

>else절을 사용할 때 finally절은 else절 다음에 와야한다.

다음은 Finally를 적용한 예제이다. 

```python
division = 1

try:
    4 / division
except ZeroDivisionError as e:
    print 'ZeroDivisionError'
else:
    print 'There is no error.'
finally:
    print 'The End'
```

만약 fianlly와 else절의 위치를 바꾼다면? 다음과 같은 결과를 보게 될 것이다. 

```
File "try_catch_else.py", line 9
    else:
       ^
SyntaxError: invalid syntax
```

**try ... except .. else**절의 경우 예외가 발생하지 않는 경우 동작해야 하는 코드를 작성할 때 유용하다고 한다.  
예를들어, 다음코드와 같이 파일 핸들러가 정상적으로 얻어진 경우 동작할 코드를 작성할 때가 이에 해당한다.  

```python
try:
    f = open('foo.txt', 'r')
except FileNotFoundError as e:
    print(str(e))
else:
    data = f.read()
    f.close()
```

아직 이 용법을 잘 사용해 보지 않아서 그런지 모르겠지만 굳이 else절을 써야하는지 아직 잘 모르겠다.  
아마도 대부분의 사람들은 다음 코드가 더 익숙하고 자연스러울 것이다. 

```python
try:
    f = open('foo.txt', 'r')
    data = f.read()
except FileNotFoundError as e:
    print(str(e))
finally:
    if f:
        f.close()
```

Reference

* [05-4 예외 처리](https://wikidocs.net/30)