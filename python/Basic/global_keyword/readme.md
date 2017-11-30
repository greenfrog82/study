# global 키워드에 대해서

global 키워드를 이용하면 전역 변수를 생성하거나, 전역변수의 값을 수정할 수 있다. 비록, 전역변수를 사용하는 것이 좋은 코딩 습관은 아니지만 ..

예를들어, 다음코드를 보자. g_number라는 전역변수를 정의한 후 change_g_number 함수를 통해 전역변수 g_number의 값을 2로 변경하기 위한 의도로 작성 된 예제이다. 의도한데로 잘 동작할까?

```python
g_number = 1

def change_g_number():
  g_number = 2

change_g_number()

print('g_number : ', g_number)
```

다음은 위 코드의 실행 결과이다.

```
g_number :  1
```

왜 위와 같은 결과가 나타났을까? 사실, 앞서 선언했던 **change_g_number 함수 안에서 사용 된 변수 g_number는 지역변수**이다. 이 부분에 주의해야한다. **파이썬은 함수 안에서 값이 할당 된 변수는 모두 지역변수로 처리한다.**

위 예제를 **global** 키워드를 사용해서 다음과 같이 수정하면 의도했던데로 동작한다.

```python
g_number = 1

def change_g_number():
    global g_number
    g_number = 2

change_g_number()

print 'g_number : ', g_number
```

다음은 위 코드의 실행 결과이다.

```
g_number : 2
```

### 결론

**global** 키워드를 사용하면 위와 같이 function scope에서 전역 변수를 생성하거나 변경할 수 있지만, 이러한 방법이 있다라는 정도만 알고 있고 실제 코드에서는 사용하는 일이 없어야 할 것 같다. 

## 참조

* [In Python what is a global statement?](https://stackoverflow.com/questions/13881395/in-python-what-is-a-global-statement)
* [Use of “global” keyword in Python](https://stackoverflow.com/questions/4693120/use-of-global-keyword-in-python)
* [7.12. The global statement](https://docs.python.org/3/reference/simple_stmts.html#the-global-statement)
