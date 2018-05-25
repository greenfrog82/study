# [8Kyu Convert number to reversed array of digits](https://www.codewars.com/kata/convert-number-to-reversed-array-of-digits)

Given a random number:

* C#: long;
* C++: unsigned long;

You have to return the digits of this number within an array in reverse order.

#### Example:

```
348597 => [7,9,5,8,4,3]
```

## My Solution

```python
def digitize(n):
    return [int(num) for num in str(n)[::-1]]
```

## Other Solution

```python
def digitize(n):
    return map(int, str(n)[::-1])
```
