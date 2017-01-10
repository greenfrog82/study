# 파이썬에서 파일 및 디렉토리 구분하기

파이썬에서 전달받은 문자열이 파일인지 디렉토리인지 구분하기 위해서는 os모듈에 있는 path 클래스의 isfile과 isdir 메소드를 사용해야한다.

isfile 메소드는 파일여부를 판단하고 isdir 메소드는 디렉토리 여부를 판단한다.

```python
import os


def check(item):
    print(item + ' is ' + (os.path.isfile(item) and 'file.' or 'not file.'))
    print(item + ' is ' + (os.path.isdir(item) and 'directory.' or 'not directory.'))

file = './example.py'
check(file)

folder = './../src'
check(folder)

```
## 참조

[[Python 파이썬] 파일인지 디렉토리인지 여부 판단 함수; is File or Dir](http://mwultong.blogspot.com/2007/04/python-is-file-or-dir.html)
