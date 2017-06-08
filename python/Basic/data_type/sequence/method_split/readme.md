# split method

## Description

string data type의 method로써 string data type의 문자들을 인자로 전달받은 sep의 문자를 기준으로 분리하여 list로 반환한다.

## Syntax

```python
string.split(sep, num)
```

### Parameters

* **sep** - 문자를 분리하기 위한 구분자로 기본값은 모든 공백이다.
* **num** (option) - sep를 통해서 문자를 분리하는데, 첫번째로 분리된 문자 이외에 나머지 문자를 몇개로 분리할 것인지 설정한다.

### Return Value

전달받은 인자를 통해 분리된 문자의 list.

## Example

```python
str = '123  test 123 test'

print 'str.split() -> ', str.split()
print "str.split(' ') -> ", str.split(' ')
print "str.split(' ', 2) -> ", str.split(' ', 2)
```

### Result

```
1. str.split() ->  ['123', 'test', '123', 'test']
2. str.split(' ') ->  ['123', '', 'test', '123', 'test']
3. str.split(' ', 2) ->  ['123', '', 'test 123 test']
```

다음은 각 결과에 대한 설명이다.

1. 아무런 인자를 전달하지 않았으므로, 모든 공백을 구분자로 문자를 분리한다. 따라서, str 변수에는 tab과 space가 공백으로 이루어져있는데 이들을 모두 공백으로 간주하고 문자를 분리한 결과를 출력하였다.
2. space를 구분자로 전달하였다. 따라서 tab의 경우 space로 분리하고 남은 값은 문자가 없으므로 ''로 분리되었다.
3. space를 구분자로 전달하고, 첫번째로 분리된 문자 이외에 분리할 문자를 2개로 설정하였으므로 '123'이외에 나머지 문자는 2개로 분리하였다.

## 참조

* [Python String split() method](https://www.tutorialspoint.com/python/string_split.htm)
