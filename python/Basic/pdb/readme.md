# pdb를 통해서 파이썬 코드 디버깅하기

파이썬에는 pdb라는 디버깅 모듈을 내장하고 있다. PyCharm과 같은 IDE를 사용중이라면 필요성을 못 느낄 수 있지만, IDE를 사용할 수 없는 경우에는 굉장히 유용할 수 있다.

pdb를 사용하는 방법은 다음과 같이 두 가지 방법이 있다.

1. python -m pdb python_file.py
2. pdb.set_trace

### python -m pdb python_file.py

파이썬 코드를 실행 할 때 command line option으로 **-m pdb**를 주는 방법으로, **해당 파이썬 코드를 디버그 모드로 실행시키며 코드의 첫줄에서 실행을 중단하고 (pdb) 프롬프트를 통해 디버깅을 진행하도록 한다.**


```python
def calc(operator, num1, num2):
    if operator is '+':
        return num1 + num2
    elif operator is '-':
        return num1 - num2
    elif operator is '*':
        return num1 * num2
    else:
        return num1 / num2

num1 = 100
num2 = 5

result = calc('*', num1, num2)

print result
```

예를들어, 위 예제를 디버그 모드로 실행 시키면 다음과 같이 코드의 첫줄에서 실행을 중단하고 (pdb) 프롬프트를 출력하는 것을 확인 할 수 있다.
**일반적으로는 거의 사용하지 않는 방법이 될 것이다.**

```bash
greenfrog@greenfrogui-MacBook-Pro ~/develop/study/python/Basic/pdb/src (master) $ python -m pdb example.py
> /Users/greenfrog/develop/study/python/Basic/pdb/src/example.py(3)<module>()
-> def calc(operator, num1, num2):
(Pdb)
```

### pdb.set_trace()

두번째 방법은 **pdb 모듈을 import한 후 pdb.set_trace()을 통해 디버깅을 하고자 하는 위치에 중단점을 설정하는 방법으로 디버깅을 위한 일반적인 방법이 될 것이다.**

사용법은 다음과 같이 pdb 모듈을 import 한 후 중단점을 설정하고자 하는 위치에 pdb.set_trace() function을 호출하면 된다.

```python
import pdb
pdb.set_trace()
```

pdb.set_trace() function은 중단점을 찍는 역할을 하기 때문에 코드에서 여러군데 사용할 수 있다. 다음 파이썬 코드를 보면 두군데 중단점을 만들어두었다.

```python
import pdb

def calc(operator, num1, num2):
    pdb.set_trace()
    if operator is '+':
        return num1 + num2
    elif operator is '-':
        return num1 - num2
    elif operator is '*':
        return num1 * num2
    else:
        return num1 / num2

pdb.set_trace()

num1 = 100
num2 = 5

result = calc('*', num1, num2)

print result
```

## pdb 프롬프트 명령어 정리

* **h**elp : 도움말을 출력한다.
* **n**ext : 다음 줄로 이동한다.
* print <변수명> : 특정 변수에 대한 값을 출력한다.
* !<변수명> = 값 : 특정 변수에 값을 할당한다.
* **c**ontinue : 다음 중단점으로 이동하거나, 다음 중단점이 없다면 해당 코드가 끝까지 실행된다. 
* **r**eturn : 현재 함수가 반환되기 전까지 실행된다.
* **l**ist : 소스 코드를 출력하고 현재 실행 지점을 화살표로 표시한다.
* **w**here : 콜스택을 출력한다.
* **s**tep : step into (특정 함수의 내부도 진입)
* **j**ump lineno : lineno로 지정한 line으로 이동한다. **하지만 이동한 만큼의 코드들은 실행이 되지 않는다**.
* **b**reak lineno : lineno로 지정한 line에 break point를 지정한다. 이때 반드시 소스코드가 있는 lineno를 지정해줘야한다.


## 참고

* [Python 디버깅 (PDB)](http://pythonstudy.xyz/python/article/505-Python-%EB%94%94%EB%B2%84%EA%B9%85-PDB)
* [26.2. pdb — The Python Debugger](https://docs.python.org/2/library/pdb.html)
