# Utilizing Regex

## Problem 1.

다음과 같은 문장이 있을 때(반드시 한글 포함), 괄호를 없애고 (의 자리에 공백 넣기 

```python
'BHC치킨(강남논현점)' -> 'BHC치킨 강남논현점'
```

### Solution

[solution_1.py](./solution_1.py)
```python
def method_me(str_):
    res = re.search(r'^(.+?)\((.+)\)', str_)
    if not res:
        return str_

    groups = res.groups()
    return u'{} {}'.format(groups[0].strip(), groups[1].strip())

def method_falsetru(str_):
    return re.sub(r'\s*\((.+?)\)', lambda m: ' ' + m.group(1).strip(), str_)
```