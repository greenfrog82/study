# Python Encoding Problem

다음 코드를 그대로 실행시켜보자. 

```python
str = '한글'
```

그러면 다음과 같은 오류 메시지가 발생한다. 

```
File "src/main.py", line 1
SyntaxError: Non-ASCII character '\xed' in file src/main.py on line 1, but no encoding declared; see http://python.org/dev/peps/pep-0263/ for details
```

## Reason

위와 같은 문제는 Python Interpeter가 Python 파일을 파싱할 때 **Latin-1 based encoding "unicode-escape"** 인코딩을 사용하기 때문이다.  
따라서, 영어권 국가의 언어가 아닌 언어들은 정상적으로 처리를 하지 못한다. 

## Solution

위 문제는 [PEP 263 - Defining Python Source Code Encodings](https://www.python.org/dev/peps/pep-0263/)을 통해 해결되었으며, 해결 방법은 다음과 같다. 

Python 소스 파일 상단에 다음과 같은 형식의 주석을 통해 인코딩 방식을 명시해 주면 Python Interpreter가 Python 소스 파일을 Parsing할 때 해당 인코딩을 이용하기 때문에 이러한 문제를 해결할 수 있다. 

인코딩 방식을 명시해주는 주석은 다음과 같다. 

```python
# -*- encoding: <encoding name> -*-
```

앞선 문제를 UTF-8로 인코딩해서 출력해보면 다음과 같다. 

```python
# -*- encoding: utf-8 -*-
str = '한글'
print str
```

출력 결과 역시 기대한바와 같다. 

```
# python main.py
한글
```

## Reference

* [PEP 263 - Defining Python Source Code Encodings](https://www.python.org/dev/peps/pep-0263/)