# 모듈에 대해서

## 개요

파이썬 역시 Node.js나 C#, Java 등과 같이 모듈 시스템을 가지고 있다. 이에 대해서 알아보자.

## 패키지

다른 언어들과 마찬가지로 패키지는 파이썬 모듈들을 그룹지어주고 마치 파일 시스템의 디렉토리처럼 계층 구조를 갖는다. 
예를들어, 다음과 같은 파이썬 프로젝트가 있다면 *.py로 된 파일들은 모듈이 되고 나머지 디렉토리들은 패키지가 된다. 

```
game/
    __init__.py
    sound/
        __init__.py
        echo.py
        volume.py
    graphic/
        __init__.py
        render.py
    main.py 
```

여기서 __init__.py 파일은 해당 디렉토리가 패키지임을 알려주는 역할을 하며, 특정 패키지의 모듈을 '*'을 통해 import할때 import 시킬 모듈의 목록을 지정하는 역할도 한다. 
파이썬 3.3버전부터는 __init__.py를 정의하지 않아도 해당 폴더를 패키지로 인식한다고 하는데, 지금 내가 테스트하고 있는 파이썬 버전이 3.6이고 각 폴더에 __init__.py를 정의하지 않고 테스트를 하고 있는데 잘 동작한다.


## import 

위와 같은 파이썬 프로젝트가 있다고 가정할 때, main.py 파일을 엔트리 포인트라고 하고 echo.py 모듈과 render.py 모듈을 import하면 다음코드와 같다.

### [방법 1](./src/game/import_1.py)
```python
from graphic import render

render.test_render()
```
### [방법 2](./src/game/import_2.py)
```python
from graphic.render import test_render

test_render
```

만약, graphic.render에 정의 된 함수가 여러개인 경우 여러개의 함수를 한꺼번에 import하고자 한다면 다음과 같이하면 된다. 
```python
from graphic.render import test_render, test_render2

test_render()
test_render2() 
```

### [방법 3](./src/game/import_3.py)
```python
import graphic.render

graphic.render.test_render()
```

방법 3의 경우 주의해야할 것이 있는데 다음과 같이 사용하고자 한다면 오류가 발생한다. 

```python
import graphic.render.test_render

test_render()
```
이 방법의 경우 render 패키지의 test_render함수를 import하고 있는데 from ... import ... 문법이 아니면 해당 모듈의 함수를 곧바로 import 할 수 없기 때문에 오류가 발생한다.

```python
import graphic

graphic.render.test_render()
```
이 방법의 경우 import문이 단독으로 쓰이는 경우 해당 경로의 모듈만을 import하기 때문에 하위 경로의 모듈은 알지 못한다. 따라서 오류가 발생한다. 

## __all__

__all__은 __init__.py에 사용하는 변수로서 여기에 지정한 모듈들은 from ... import * 형식으로 모듈들을 import할 수 있다.

sound 패키지에 다음과 같이 echo.py 모듈만을 __all__ 변수에 할당해놓자.

```python
# __init__.py

__all__ = ['echo']
```

그리고 다음과 같이 import를하면 정상적으로 동작한다.

```python
from sound import *

echo.test_echo()
```

하지만, 다음과 같이 같이 코드를 작성하면 __all__에는 echo.py 모듈만 정의되어 있으므로 오류가 발생한다.

```python
from sound import *

echo.test_echo()
volume.up()
```
오류 내용은 다음과 같다. 

```
Traceback (most recent call last):
  File "d:\develop\study\python\Basic\module\src\game\import_4.py", line 4, in <module>
    volume.up()
NameError: name 'volume' is not defined
```

### relative

Python 2.5버전부터 지원되는 기능으로 모듈을 import 할 때, 상대경로를 통해서 참조할 수 있다. 상대경로는 일반적으로 디렉토리에서 사용하는 .과 ..을 사용하고 / 또는 \는 사용하지 않는다. 

* 현재 경로 : .
* 부모 경로 : ..

예를들어 echo.py 모듈에서 render.py 모듈을 참조한다고 하자. 이때 상대경로를 이용하면 다음과 같이 import문을 작성할 수 있다. 

```python
from ..graphic.render import test_render

def test_echo():
    print('echo test')
    test_render()
```

## 참조

* [점프 투 파이썬 - 패키지](https://wikidocs.net/1418)