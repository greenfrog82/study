# [8Kyu Remove String Spaces](https://www.codewars.com/kata/remove-string-spaces/train/python)

Simple, remove the spaces from the string, then return the resultant string.

## My Solution

```python
import re
def no_space(x):
    return re.sub(r'\s+', '', x)
```
```python
def no_space(x):
    return x.replace(' ', '')
```