# strip, lstrip, rstrip 

`Python 2.7`

## strip([chars])

전달 된 `chars`인자로 전달 된 문자열을 기준으로 문자열의 앞뒤에 붙은 문자들이 삭제된 문자열을 반환한다.  

**Note**
`chars`로 전달 된 문자열을 기준으로 할 때 

### Parameter(s)

* `chars(option)` : 문자열 앞뒤에 붙은 문자열 중 삭제하고자 하는 문자열

### Return

전달 된 `chars`인자에 전달 된 문자열을 기준으로 문자열의 앞뒤에 붙은 문자들이 삭제된 문자열을 반환한다. 만약 `chars`인자가 전달되지 않는다면 문자열 앞뒤에 붙은 `공백`문자들이 삭제된 문자열을 반환한다.  
**원본 문자열은 변경되지 않는다.**

### Example

[ex_strip.py](./ex_strip.py)
```python
>>> string = ' xoxo love xoxo   '
>>> '|%s|' % string.strip()
|xoxo love xoxo|
>>> '|%s|' % string.strip(' xoxoe')
|lov|
>>> '|%s|' % string.strip('sti')
| xoxo love xoxo   |
>>> string = 'android is awesome'
>>> '|%s|' % string.strip('an')
|droid is awesome|
```

## lstrip([chars])

전달 된 `chars`인자로 전달 된 문자열을 기준으로 원본문자열의 좌측에 문자들이 삭제된 문자열을 반환하는 것을 제외하면 앞서 설명한 `strip()`과 동일하다.   

### Example

[ex_lstrip.py](./ex_strip.py)
```python
>>> random_string = '    this is good '
>>> random_string.lstrip()
'this is good '
>>> random_string.lstrip('sti')
'    this is good '
>>> random_string.lstrip('s ti')
'his is good '
>>> website = 'https://www.programiz.com/'
>>> website.lstrip('htps:/.')
'www.programiz.com/'
```

## rstrip([chars])

전달 된 `chars`인자로 전달 된 문자열을 기준으로 원본문자열의 우측에 문자들이 삭제된 문자열을 반환하는 것을 제외하면 앞서 설명한 `strip()`과 동일하다.  

### Example

[ex_rstrip.py](./ex_rstrip.py)
```python
random_string = '  this is good'
>>> random_string.rstrip()
'  this is good'
>>> random_string.rstrip('si oo')
'  this is good'
>>> random_string.rstrip('sid oo')
'  this is g'
>>> website = 'www.programiz.com/'
>>> website.rstrip('m/.')
'www.programiz.co'
```

# Reference

* [strip()](https://www.programiz.com/python-programming/methods/string/strip)
* [lstrip()](https://www.programiz.com/python-programming/methods/string/lstrip)
* [rstrip()](https://www.programiz.com/python-programming/methods/string/rstrip)