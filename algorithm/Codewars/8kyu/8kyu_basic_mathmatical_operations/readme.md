# [8Kyu Basic Mathmatical Operations](https://www.codewars.com/kata/basic-mathematical-operations)

Your task is to create a function that does four basic mathematical operations.

The function should take three arguments - operation(string/char), value1(number), value2(number).
The function should return result of numbers after applying the chosen operation.

#### Examples:

```python
basic_op('+', 4, 7)         # Output: 11
basic_op('-', 15, 18)       # Output: -3
basic_op('*', 5, 5)         # Output: 25
basic_op('/', 49, 7)        # Output: 7
```

## My Solution

```python
def basic_op(operator, value1, value2):
    return eval('%d%s%d' % (value1, operator, value2))
```

## Other Solution

```python
def basic_op(op, a, b):
    return {'+': a+b, '-': a-b, '*': a*b, '/':a/b}.get(op)
```