# Assertion vs Exception

## What is an assertion?

**Assertion**은 발생할 수 없는 상태를 선언하는 방법이다. 만약, 해당 상황이 발생한다면 이는 단순히 버그가 아니라 어플리케이션이 망가지거나 회복 불가능함을 이야기한다.  

## When to use an assertion?

* 파라메터 타입 검사
* 파라메터의 전제 조건 (예를들어, 파라메터 값의 범위)
* 발생하면 안되는 상황 (예를들어, 리스트에 중복 된 요소들 검사 또는 0 제수)
* 발생하기 어렵지만 발생할 수 있는 Corner cases

## What is an exception?

**Exception**은 **Assertion**이랑 비슷한데 다른 의미를 가지고 있다.  
**Excetpion**은 어플리케이션의 정상적인 흐름에 방해가 되는 의도하지 않은 실행흐름에 대한 시그널이다. 따라서, **Exception**은 의도하지 않은 실행흐름을 처리할 수 있는 코드로 시그널을 보내기 위해서 사용되며(예를들어, 파일을 처리할 때 파일 열기에 실패한 경우), **Assert**와 달리 어플리케이션이 망가지거나 회복 불가능한 상태에 놓이는 것이 아니라 계속 진행 가능하도록 회복 시킬 수 있다. 

## When to use an exception?

* 사용자 또는 외부 소스로부터 받은 입력값이 정상적이지 않을 경우 처리(예를들어, 사용자 주소, 전화번호 등 입력 받을 때)
* File not found 또는 Network 에러와 같이 시스템의 에러 처리 시
* API 사용 시?

## Definition of an assertion

Python의 **assert statement**는 다음과 같다. 

```python
assert condition, optional message
```

**assert statement**의 **contidion**은 참, 거짓 평가하며 거짓일 경우 **AssertionError**를 발생시키고 **optional message** 파라메터가 지정되었을 때 해당 메시지도 함께 출력한다.  

[ex_1.py](./ex_1.py)9
```python
# Import math module  
import math  
  
# Define two integer numbers  
x = 2  
y = 4  
  
# If the assertion fails, print this message  
message = "{} is not the square root of {}".format(x, y)  
  
# The condition that we need to assert  
condition = (x == math.sqrt(y))  
  
# Do the assertion  
assert condition, message  
```

위 예제를 실행시키면 루트 4는 2와 같기 때문에 정상적으로 동작한다.  
하지만 x를 4로 고쳐서 실행하면 다음과 같이 **AssertionError**가 발생하는 것을 확인 할 수 있다. 

```
Traceback (most recent call last):
  File "test.py", line 15, in <module>
    assert condition, message  
AssertionError: 4 is not the square root of 4
```

## When does assert statement work?

**assert statement**는 Python Interpreter를 debug mode(일반적으로 python *.py로 실행한 경우)에만 동작한다. 따라서 **-O** 옵션을 사용하여 Python Interpreter를 실행시키면 동작하지 않는다.  
앞서 AssertionError가 발생했던 예제를 **-O**옵션을 통해 다음과 같이 실행해보자. **assert statement**가 동작하지 않으므로 **AssertionError**가 발생하지 않음을 확인 할 수 있다.   

```
python -O ex_1.py
```



## Summary

* Assertion은 언제든지 참인 상태로 그렇지않으면 어플리케이션은 반드시 망가지는 경우이다. 
* Assert statement는 디버깅 툴로 사용되는데 에러가 발생하는 지점에서 프로그램을 중단시키고 AssertionError를 발생시킨다. 
* Assertion은 프로그램의 정확성을 이야기하는 반면, Exception은 프로그램의 강건함을 이야기한다. 

## Reference

* [Difference between assertion and exception in Python](http://www.8bitavenue.com/2018/02/difference-between-assertion-and-exception-in-python/)
* [Python Exception Handling – AssertionError](https://airbrake.io/blog/python-exception-handling/python-assertionerror)
* [Python Assertion Statement](https://www.programiz.com/python-programming/assert-statement)
* [The benefits of programming with assertions (a.k.a. assert statements)](http://pgbovine.net/programming-with-asserts.htm)
* [Sanity check](https://en.wikipedia.org/wiki/Sanity_check)