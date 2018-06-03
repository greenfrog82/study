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

\>'A', 'a', 'X', '5'

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

^\<word\> 형식으로 \<word\>로 시작하는 문장과 매치.

[ex_3.py](./ex_3.py)
```python
re.search(r'^Eat cake', 'Eat cake').group() # Eat cake
```

### $

\<word\>$ 형식으로 \<word\>로 끝나는 문장과 매치.

[ex_3.py](./ex_3.py)
```python
re.search(r'cake$', 'Eat cake').group() # cake
```

### []

대괄호안에 매치하고자 하는 문자들을 정의 해주면, 해당 문자들을 or 연산으로 매치한다.  

[ex_3.py](./ex_3.py)
```python
re.search(r'[abc]pple', 'apple').group() # apple
re.search(r'[abc]pple', 'bpple').group() # bpple
re.search(r'[abc]pple', 'cpple').group() # cpple
```

앞선 예제와 달리, 대괄호안에 매치될 문자의 범위들을 정의할 수 있다.  
예를들어, [a-zA-Z0-9]라고 하면 소문자 알파벳 or 대문자 알파멧 or 숫자들 중 하나를 매치한다.  

[ex_3.py](./ex_3.py)
```python
re.search(r'[a-zA-Z0-9]', 'abc').group() # a
re.search(r'[a-zA-Z0-9]', '_@b').group() # b
```

대괄호에 포함된 문자의 가장 앞에 ^을 사용하면 뒤에 나열된 문자들을 제외하고 매치된다. 

[ex_3.py](./ex_3.py)
```python
re.search(r'Number : [^567]', 'Number : 3').group() # Number : 3
re.search(r'Number : [5^67]', 'Number : ^').group() # Number : ^
re.search(r'Number : [^567]', 'Number : 6') # None
```

### \

백슬레쉬 뒤에 문자가 오는 경우, 해당 문자가 이스케이프 문자라면 이스케이프 문자로 해석된다.  
하지만, 백슬레시 뒤의 문자가 이스케이프 문자가 아니라면 백슬레쉬 자체로 해석된다.   

[ex_3.py](./ex_3.py)
```python
matched_str = re.search(r'Back\\stail', 'Back\stail').group()
matched_str = re.search(r'Back\stail', 'Back tail').group()
```

## Repetitions

정규표현식은 특정 패턴이 반복되는지 확인하는 방법을 제공한다.  

### +

\<word\>+ 와 같은 형식으로 사용하여 \<word\>가 **하나 또는 그 이상** 존재하는지 확인한다. 

[ex_4.py](./ex_4.py)
```python
re.search(r'Co+kie', 'Cookie').group() # Cookie
re.search(r'Co+kie', 'Cokie').group() # Cokie
re.search(r'Co+kie', 'Coooooookie').group() # Coooooookie
re.search(r'Co+kie', 'Ckie') # None
```

### *

\<word\>* 와 같은 형식으로 사용하여 \<word\>가 **없거나 그 이상** 존재하는지 확인한다.  
+와의 차이점은 +는 **반드시 하나 이상 \<word\>가 존재**해야하지만, *는 \<work\>가 **없어도** 된다. 

[ex_4.py](./ex_4.py)
```python
re.search(r'Ca*o*kie', 'Caokie').group() # Caokie
re.search(r'Co*kie', 'Cooooookie').group() # Cooooookie
re.search(r'Co*kie', 'Ckie').group() # Ckie
```

### ?

\<word\>? 와 같은 형식으로 사용하여 \<word\>가 **없거나 오직 하나만** 존재하는지 확인한다.  

[ex_4.py](./ex_4.py)
```python
re.search(r'Colou?r', 'Color').group() # Color
re.search(r'Colou?r', 'Colour').group() # Colour
re.search(r'Colou?r', 'Colouur') # None
```

### {}

앞서 소개되었던 방법들은 반복되어 있는 패턴을 찾는 방법이 정해져있다.  
예를들어, +는 하나 또는 그 이상, *는 없거나 그 이상 그리고 ?는 없거나 하나와 매치 된다.  
만약, 정확히 몇번 반복, 최소한 몇번 반복 그리고 최소, 최대 몇번 반복과 같이 반복을 몇시하고 싶을 때 {}를 사용한다. 

#### {x}

\<word\>{x}와 같은 형식으로 사용하여, \<word\>가 정확히 x번 반복되는 패턴과 매치된다. 

[ex_4.py](./ex_4.py)
```python
re.search(r'\d{3}', '123').group()
re.search(r'\d{2}', '123').group()
re.search(r'\d{2}_id', '123_id').group()
re.search(r'table_\d{2}_id', 'table_123_id')
```

#### {x,}

\<word\>{x,}와 같은 형식으로 사용하여, \<word\>가 최소한 x번 반복되는 패턴과 매치된다. 

[ex_4.py](./ex_4.py)
```python
re.search(r'\d{3,}', '123').group() # 123
re.search(r'\d{3,}', '12') # None
re.search(r'\d{3,}', '1234567').group() # 1234567
```

#### {x,y}

\<word\>{x,y}와 같은 형식으로 사용하여, \<word\>가 최소 x번, 최대 y번 반복되는 패턴과 매치된다. 

[ex_4.py](./ex_4.py)
```python
re.search(r'\d{3,5}', '123').group()
re.search(r'\d{3,5}', '12')
re.search(r'\d{3,5}', '1234567').group()
```

## Groups and Grouping using Regular Expressions

예를들어, 여러분이 이메일 주소에 대해서 유효성 검사를 한다고 가정하자. 이때, 사용자 이름과 호스트 이름을 분리해서 검사하고 싶다.  
이러한 경우, 정규표현식의 **Group** 기능은 아주 유용하다.  

**Group**은 (\<word\>)과 같이 그룹핑하고자 문자를 ()로 감싸주면 된다.  

[ex_5.py](./ex_5.py)
```python
match_obj = re.search(r'([\w\.-]+)@([\w\.-]+)', 'test@test.com')

print("All matched words : ", match_obj.group()) # test@test.com

for idx, group in enumerate(match_obj.groups()):
    # Group 0 : test
    # Group 1 : test.com
    print('Group %d : %s' % (idx, group))
```

## Greedy vs Non-Greedy Matching

특정 문자가 가능한 최대한으로 매치될 때, 이를 **Greedy Match**라고 한다. 
이러한 **Greedy Match**를 일으키는 정규표현식은 앞서 **Repetitions**에서 소개했더냐 +와 *이다. 

예를들어, 다음과 같은 코드가 있다고 할 때 어떤 식으로 매치가 일어날까?

[ex_6.py](./ex_6.py)
```python
heading = r'<H1>HEADER</H1>'

matched_str = re.match(r'<.*>', heading).group()
print(r"re.match(r'<.*>', '<H1>HEADER</H1>') : ", matched_str)
```

위 코드의 실행 결과는 다음과 같다.  
당연한 결과다. 정규표현식으로 넘겼던 r'<.*>'는 문자열의 최초 '^'와 매칭된 후 '.*'을 통해 어떤 문자들 '>'을 만나기 전까지 반복으로 매치되는 패턴을 찾을 것이기 때문이다.  
이런식으로 이런 매칭이 **Greedy Match**이다. 

```
<H1>HEADER</H1>
```

그렇다면, '<H1>'만을 매치하고자 할 때는 어떻게 해야할까?  
이럴 때 사용하는 것이 **Non-Greedy Match**이다. 
**Non-Greedy Match**는 \<Greedy Match\>?\<word\> 와 같은 형식으로 사용한다.  

다음 예제를 보자.

[ex_6.py](./ex_6.py)
```python
matched_str = re.match(r'<.*?>', heading).group()
print(r"re.match(r'<.*?>', '<H1>HEADER</H1>') : ", matched_str)
```

위 코드의 실행 결과는 다음과 같다.   
딱 우리가 원했던 결과이다. **Non-Greedy Match**는 **Greedy Match**되는 문자 다음에 ?\<word\>를 써서 \<word\>가 매치되는 순간 매치를 완료한다.

```
<H1>
```

## Reference
* [Python Regular Expression Tutorial](https://www.datacamp.com/community/tutorials/python-regular-expression-tutorial?utm_source=adwords_ppc&utm_campaignid=1001535064&utm_adgroupid=48949243189&utm_device=c&utm_keyword=&utm_matchtype=b&utm_network=g&utm_adpostion=1t1&utm_creative=236326164852&utm_targetid=dsa-379899700955&utm_loc_interest_ms=&utm_loc_physical_ms=1009871&gclid=EAIaIQobChMI05-YzZez2wIVECQrCh1PHg9jEAAYASAAEgK77fD_BwE)



