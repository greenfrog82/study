# How to use switch in Python

Python에는 switch-case문이 없는데 dictionary와 함수를 이용하면 이를 흉내낼 수 있다.  

다음은 if문을 통해 구현한 사칙연산 함수이다. 

[ex.py](./ex.py))
```python
def calc_if(operator, x, y):
    if operator == 'add':
        return x + y
    elif operator == 'sub':
        return x - y
    elif operator == 'mul':
        return x * y
    elif operator == 'div':
        return x / y
    else:
        return None
```

위 코드를 switch-case 형태로 수정해보자. 

[ex.py](./ex.py)
```python
def cala_dict(operator, x, y):
    return {
        'add': lambda: x + y,
        'sub': lambda: x - y,
        'mul': lambda: x * y,
        'div': lambda: x / y
    }.get(operator, lambda: None)
```