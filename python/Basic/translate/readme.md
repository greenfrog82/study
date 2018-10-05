# str.translate(table[, deletechars])

`str`클래스의 `translate()`메소드는 `string` 모듈의 `maketrans()`함수를 통해 생성 된 `table`인자를 사용해서 변경된 문자열을 반환한다. 선택적으로 `deletechars` 문자열 인자를 전달해서 해당인자가 포함하고 있는 문자들을 삭제한다.

## Parameters

* `table` : string 모듈의 `maketrans()` 헬퍼 함수를 생성된다. 이는 해당 문자열 객체의 내용을 변경하는데 사용된다.
* `deletechars` : 해당 문자열 객체에 해당 인자가 포함하는 문자가 존재한다면 사제된 문자열이 반환된다.

## Return

해당 메소드는 `table`인자와 `deletechars`를 통해 변경 된 문자열이 반환된다.  
**해당 문자열 객체의 원본 데이터는 변경되지 않는다.**

## Example

사실, 해당 메소드가 낯설어서 앞선 설명만으로는 어떻게 동작하는지 알기 어렵다.  
다음 예제들을 통해 하나씩 알아보도록 하자.   

앞서 해당 메소드는 `table`인자를 통해 문자열을 변경한다고 했었다.  
우선 `maketrans()`함수를 통해 `table`인자를 생성해보자.  

```python
from string import maketrans
trans_table = maketrans('aeiou', '12345')
```

앞선 예제를 보면 `maketrans()`함수는 첫번째 인자로 전달된 문자열을 구성하는 문자가 문자열 객체에 존재하면 이에 대응하는 두번째 인자의 문자열의 문자로 치환한다.  
여기서 대응이란 같은 index에 존재하는 문자를 이야기한다.   

이제 완성 된 예제를 보자. 'aeiou'와 '12345'를 `maketrans()`에 전달하여 `table`인자를 생성하여 'greenfrog'문자열의 `translate()`메소드에 전달하였다.  
결과를 보면 'greenfrog'문자열은 `maketrans()`로 전달했던 첫번째 인자의 'e'와 'o' 문자와 동일하다. 
이때 'e'와 'o'에 대응하는 두번째 인자는 '2'와 '4'이므로 `translate()`메소드는 gr22nfr4g를 반환한다.
**원본 문자열을 출력해보면 원본 문자열의 변경은 없음을 알 수 있다.**

[ex_table_only.py](./ex_table_only.py)
```python
>>> from string import maketrans
>>>
>>> trans_table = maketrans('aeiou', '12345')
>>> origin = 'greenfrog'
>>> origin.translate(trans_table)
gr22nfr4g
>>> origin
greenfrog
```

이쯤 되어서 한가지 궁금증이 생긴다. 만약 `maketrans()`함수의 첫번째 인자와 두번째 인자로 전달되는 문자열의 길이가 다르면 어떻게 될까?  
다음 예제의 실행결과를 확인해보자. `ValueError`가 발생하는 것을 확인할 수 있다.   

```python
>>> from string import maketrans
>>> maketrans('abc', '1')
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ValueError: maketrans arguments must have same length
```

이번에는 `translate()`메소드의 optional 인자인 `deletechars`를 전달해보자.  
결과는 다음과 같다. 

```python
>>> from string import maketrans
>>> 
>>> trans_table = maketrans('aeiou', '12345')
>>> origin = 'greenfrog'
>>> origin.translate(trans_table, 'grnfr')
224
>>> origin
greenfrog

# Reference

* [Python String translate() Method
](https://www.tutorialspoint.com/python/string_translate.htm)

