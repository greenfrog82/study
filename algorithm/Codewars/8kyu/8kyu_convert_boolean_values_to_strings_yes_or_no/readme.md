# [8Kyu Convert boolean values to strings 'Yes' or 'No'.](https://www.codewars.com/kata/convert-boolean-values-to-strings-yes-or-no)

Complete the method that takes a boolean value and return a "Yes" string for true, or a "No" string for false.

## My Solution

```python
def bool_to_word(boolean):
     return 'Yes' if True == boolean else 'No'
```

## Other Solution

```python
def bool_to_word(boolean):
    return ['No', 'Yes'][boolean]
```
