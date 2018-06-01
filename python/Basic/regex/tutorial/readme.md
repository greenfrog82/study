# About the regular expression with Python

정규표현식은 주어진 문자열에 특정 패턴이 존재하는지 여부를 확인하는데 사용된다. 
Data Science에서 문서를 분석하기 위한 전제조건이 되며, 일반적인 어플리케이션을 개발한다고 하더라도 사용자의 입력을 validation하는 경우 그리고 특정 파일을 파싱해서 데이터를 찾거나 변경, 삭제등을 할 때 사용된다.  

본 문서에서는 Python의 re pakcage를 통해 다음 항목들을 공부해본다. 

* Basic Characters: Ordinary Characters
* Wild Card Characters: Special Characters
* Repetitions
* Groups and Grouping using 정규표현식s
* Greedy vs Non-Greedy Matching
* re Python Library
* search() versus match()

**주의**

정규표현식에 대한 설명에 들어가기 앞서 본문에서 **문자**라는 표현을 쓸 것인데, 이는 특별한 언급이 없다면 일반적인 문자, 숫자, 기호 그리고 tab, space, newline등을 모두 포함하는 의미로 사용된다. 

## Basic Characters: Ordinary Characters

정규표현식에서 기본적인 패턴들은 **일반 문자**를 통해 쉽게 처리할 수 있다.   
정규표현식에서 **일반 문자**는 문자 자신과 패턴이 일대일 매칭되며 특별한 의미를 갖지 않는다. **일반 문자**를 예를들면 다음과 같다.  

>'A', 'a', 'X', '5'

정규표현식에서 **일반 문자** 단순한 패턴 매칭에서 사용될 수 있다.  

[ex_1.py](./ex_1.py)
```python
import re

pattern = r"Cookie"
sequence = "Cookie"
if re.match(pattern, sequence):
    print("Match!")
else: 
    print("Not a match!")
```
**Result**
```
Match!
```

**match** 함수는 특정 문자열에 패턴에 매칭되는지 확인 한 후 매칭되는 경우 **match object**를 반환하고 매칭되지 않는 경우 **None**을 반환한다. 해당 함수의 좀 더 자세한 내용은 문서 후반에 다시 다루도록 한다. 

앞선 예제에서 정규식을 만들 때, **r** 키워드를 문자열 앞에 사용하였다. 
이를 *raw string literal*이라고 한다.  
문자열을 해석하는 방법을 바꾸는데, 이러한 문자열은 작성 된 그대로 해석된다.  

예를들어, 문자 '\'는 **r** 키워드가 접두 되었을 때 이스케이프 문자가 아닌 그저 백 슬레쉬이다. 때때로 문장에 이스케이프 목적으로 백 슬레쉬가 있고 이를 무효화하기 위해서 사용된다.  
말이 어려운데 다음 예제를 보면 바로 이해될 것이다. 

[ex_2.py](./ex_2.py)
```python
str = '\test'
print(str) # Expected result is '    est'

str = r'\test'
print(str) # Expected result is '\test'
```
**Result**
```
	est
\test
```

## Wild Card Characters: Special Characters

정규표현식에서 **와일드카드 문자**는 일반 문자와 달리 문자 자신과 패턴이 일대일 매칭되지 않고 특별한 의미를 갖는다.  
일반적으로 많이 쓰이는 **와일드카드 문자**는 다음과 같다.  


### .

newline 문자를 제외한 하나의 문자와 매치.

[ex_3.py](./ex_3.py)
```python
re.search(r'Co.k.e', 'Cookie').group() # Cookie
re.search(r'a.b.c.d.e', 'a1b c@d\te').group() # a1b c@d	e
re.search(r'.', '\n') # None
```

### \w

하나의 문자, 숫자 또는 _(underscore)와 매치. 

[ex_3.py](./ex_3.py)
```python
re.search(r'Co\wk\we', 'Cookie').group() # Cookie
re.search(r'\w\w\w', 'a1_').group() # a1_
re.search(r'\w', '@') # None
re.search(r'\w', '\n') # None 
```

### \W

\w(하나의 문자, 숫자 또는 underscore)를 제외한 하나의 문자와 매치. 

[ex_3.py](./ex_3.py)
```python
re.search(r'C\Wk\We', 'C@k\te').group() # C@k	e
re.search(r'\W', 'a') # None
re.search(r'\W', '0') # None
re.search(r'\W', '_') # None
```

### \s

하나의 space, tab, return, newline과 같은 whitespace와 매치.

[ex_3.py](./ex_3.py)
```python
re.search(r'a\sb\sc\sd\n', 'a b\tc\rd\n').group() # a b	c
re.search(r'\s', 'a') # None 
re.search(r'\s', '1') # None 
re.search(r'\s', '@') # None
```

### \S 

\s를 제외한 하나의 문자와 매치.

[ex_3.py](./ex_3.py)
```python
re.search(r'\S\S\S\S', 'a1@_').group() # a1@_
re.search(r'\S', ' ') # None
re.search(r'\S', '\t') # None
re.search(r'\S', '\r') # None
re.search(r'\S', '\n') # None
```

### \t, \n, \r

* \t : 탭과 매치
* \n : newline과 매치
* \r : return과 매치

### \d

0-9(0부터 9)까지의 하나의 숫자와 매치. 

[ex_3.py](./ex_3.py)
```python
re.search(r'C\d\dkie', 'C00kie').group() # C00kie
```

### ^






## Reference
* [Python Regular Expression Tutorial](https://www.datacamp.com/community/tutorials/python-regular-expression-tutorial?utm_source=adwords_ppc&utm_campaignid=1001535064&utm_adgroupid=48949243189&utm_device=c&utm_keyword=&utm_matchtype=b&utm_network=g&utm_adpostion=1t1&utm_creative=236326164852&utm_targetid=dsa-379899700955&utm_loc_interest_ms=&utm_loc_physical_ms=1009871&gclid=EAIaIQobChMI05-YzZez2wIVECQrCh1PHg9jEAAYASAAEgK77fD_BwE)



