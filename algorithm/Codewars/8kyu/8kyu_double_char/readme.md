# [8kyu Double Char](https://www.codewars.com/kata/double-char)

Given a string, you have to return a string in which each character (case-sensitive) is repeated once.

```
double_char("String") ==> "SSttrriinngg"

double_char("Hello World") ==> "HHeelllloo  WWoorrlldd"

double_char("1234!_ ") ==> "11223344!!__  "
```

Good Luck!

## My Solution

```python
def double_char(s):
    return ''.join(ch*2 for ch in s)
```

