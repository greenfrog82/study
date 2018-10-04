[Packages](https://docs.python-guide.org/writing/structure/#packages)

`Python 2.7`

파이썬은 굉장히 직관적인 패키지 시스템을 가지고 있는데, 디렉토리에 `__init__.py`만 명시하면 패키지로 인지한다.  
패키지경로 안의 모듈들은 일반적인 모듈과 같은 방식으로 import되지만, `__init__.py`는 패키지 전체의 공통 된 정의를 여기에 모으기 위한 기능 역시 가지고 있다.  

다시 말해서, `__init__.py`는 다음 두가지 기능을 포함하고 있다.   

* 파이썬이 해당 디렉토리를 패키지로 인식하게 한다.   
* 해당 패키지의 공통 된 정의를 모은다.  

/pack 디렉토리에 modu.py파일이 있고 `import pack.modu`를 통해 modu 모듈을 import했다고 하자. 그러면 pack 모듈의 트리구조 상 모든 상위 `__init__.py`를 찾아서 실행시키고(변수, 함수, 클래스등을 정의하고 실행코드들을 실행시킨다.), pack 모듈의 `__init__.py`을 실행시킨다. 이후 modu.py가 실행되어 자신이 가지고 있던 변수, 함수, 클래스등을 정의하고 실행코드들을 실행시키고 pack.modu이라는 이름을 pack.__init__.py와 pack.modu.py에 접근할 수 있다.  

이때 주의해야하는것은 `__init__.py`에 너무 많은 코드들이 작성될 경우 일반적으로 나타나는 이슈가 있다. 패키지 안에 서브 패키지가 있고 다시 해당 서브 패키지 안에 서브 패키지가 존재하는 것과 같이 패키지의 복잡도가 증가할 때, 특정 패키지의 하나의 모듈만을 import했지만 모든 상위 패키지의 `__init__.py`가 함께 import되는 것이다.  
**따라서, 만약 패키지의 모듈들과 서브 패키지의 모듈들이 공유해야하는 어떤 코드들이 존재하지 않는한 `__init__.py` 파일은 비워놓는 것이 일반적이고 좋은 방법이다.**  

마지막으로 사용하고자 하는 패키지의 깊이기 깊을 때 편리한 문법이 있다. 예를들어 다음과 같이 깊이가 깊은 모듈을 import한다고 가정하자. 

```python
import very.deep.module

very.deep.module.xxxx
very.deep,module.yyyy
...
```

위와 같은 경우 very.deep.module에 정의 된 것들에 접근하기 위해서는 매번 very.deep.module을 작성해주어야한다. 하지만, 다음과 같이 `as`를 통해 별명을 할당해두면 훨씬 간결해진다.  

```python
import very.deep.module as mod

mod.xxxx
mod.yyyy
...
```

## Example

위 내용을 테스트하기 위해 다음과 같은 패캐지구조를 만들어보았다.  

```bash
├── main.py
├── modu
│   ├── __init__.py
│   ├── __init__.pyc
│   ├── hoho.py
│   ├── hoho.pyc
│   └── modu_sub
│       ├── __init__.py
│       ├── __init__.pyc
│       ├── foo.py
│       ├── foo.pyc
│       ├── foo2.py
│       └── foo2.pyc
└── sub.py
```

앞서 설명 된 내용을 확인하기 위해 각각 패키지는 자신의 패키지명을 출력하도록 하였고, 각 패키지의 모듈들은 모듈 이름을 출력한다.  
main.py와 sub.py는 각각 해당 모듈들을 호출할 것이다.   

[main.py](./src/main.py)
```python
from modu.modu_sub.foo import perform as _foo
from modu.modu_sub.foo2 import perform3 as _foo2
from modu.hoho import perform as _hoho

print '-------------- main'

_foo()
_foo2()
_hoho()
```

[sub.py](./src/sub.py)
```python
from modu.modu_sub.foo import perform as _foo
from modu.hoho import perform as _hoho

print '-------------- sub'

_foo()
_hoho()
```

### Expected Result

위 테스트를 실행시키면, main.py와 sub.py에서 의도하지 않은 동작인 \_\_init\_\_.py의 print문이 호출될 것이다.  

### Result

예상과 같이 \_\_init\_\_.py의 print문이 호출된 것을 확인 할 수 있다.

```bash
$ python main.py
modu package
modu.modu_sub package
-------------- main
foo module
foo module3
hoho module
 $ python sub.py
modu package
modu.modu_sub package
-------------- sub
foo module
hoho module
```