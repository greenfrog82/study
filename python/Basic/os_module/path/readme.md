# os.path 


## os.path.**splitext**(path)

`Python 2.7.13`

파일명과 확장자를 분리해준다. 파일명과 확장자를 나누는 기준은 `path`파라메터로 전달 된 문자열에 포함 된  `.`이다.  

예를들어, `path`파라메터로 전달 된 문자열이 'filename.txt'라면 `filename`은 파일명이고 `.ext`는 확장자이다. 주의할 것은 확장자명에는 `.`이 포함된다는 것이다. 
만약 `path`로 전달 된 문자열에 `.`이 포함되어 있지 않다면, 파일명만 있고 확장자는 없는 상태가 된다. 

### Parameter

path(string) : 경로를 나타내는 문자열 

### Return

(파일명, 확장자명)으로 구성 된 튜플을 반환한다.
확장명이 존재하지 않는 경우 (파일명, '')형태로 반환한다. 

### Exemple

```python
import os

print 'filename.ext :', os.path.splitext('filename.ext')
print 'filename..ext : ', os.path.splitext('filename..ext')
print 'filename :', os.path.splitext('filename')
print 'filename. :', os.path.splitext('filename.')
print '.filename.ext :', os.path.splitext('.filename.ext')
print 'file.name.ext :', os.path.splitext('file.name.ext')
print '/filename.ext :', os.path.splitext('/filename.ext')
print '/usr/local/filename.ext :', os.path.slitext('/usr/local/filename.ext')
print '123123.123 :', os.path.splitext('123123.123')
print '!@@!#-234._)((** :', os.path.splitext('!@@!#-234._)((**')
```

### Result

```
filename.ext : ('filename', '.ext')
filename..ext :  ('filename.', '.ext')
filename : ('filename', '')
filename. : ('filename', '.')
.filename.ext : ('.filename', '.ext')
/filename.ext : ('/filename', '.ext')
file.name.ext : ('file.name', '.ext')
/usr/local/filename.ext : ('/usr/local/filename', '.ext')
123123.123 : ('123123', '.123')
!@@!#-234._)((** : ('!@@!#-234', '._)((**')
```





